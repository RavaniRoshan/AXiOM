import type { SubagentResult, ValidationResult, ValidationFlag } from "./types";
import { callGemini, parseJSON } from "./gemini-client";

// Fallback validation results
function getFallbackValidation(results: SubagentResult[]): ValidationResult[] {
  return results.map(result => ({
    taskId: result.taskId,
    isValid: true,
    flags: result.confidenceScore < 0.6 
      ? [{
          severity: "warning" as const,
          message: "Low confidence score detected",
          suggestion: "Consider gathering more data or refining the analysis",
        }]
      : [],
    confidenceDowngrade: result.confidenceScore < 0.6 ? 0.1 : undefined,
  }));
}

/**
 * Validate subagent results with adversarial peer review
 */
export async function validate(
  results: SubagentResult[],
  rootQuestion: string
): Promise<ValidationResult[]> {
  
  // Prepare simplified results for the prompt
  const simplifiedResults = results.map(r => ({
    taskId: r.taskId,
    output: r.output.substring(0, 500), // Limit length
    confidence: r.confidenceScore,
    sourceType: r.sourceType,
    assumptions: r.assumptions,
  }));

  const prompt = `
You are a hostile peer reviewer. Assume the following outputs are WRONG unless proven otherwise.

ROOT QUESTION: ${rootQuestion}

RESULTS TO VALIDATE:
${JSON.stringify(simplifiedResults, null, 2)}

For EACH result, identify any issues:
1. Unsupported claims (no evidence provided)
2. Circular logic (conclusion assumes premise)
3. Overconfident language (claims certainty where none exists)
4. Missing assumptions (implicit assumptions not stated)
5. Contradictions with other results

Respond ONLY as valid JSON array (no preamble):
[
  {
    "taskId": "T1",
    "isValid": true,
    "flags": [],
    "confidenceDowngrade": 0
  },
  {
    "taskId": "T2",
    "isValid": false,
    "flags": [
      {
        "severity": "warning",
        "message": "Confidence seems high given limited evidence",
        "suggestion": "Reduce confidence or provide more supporting data"
      }
    ],
    "confidenceDowngrade": 0.15
  }
]

Severity levels: "warning" (minor issue), "error" (significant flaw), "critical" (undermines conclusion)

Requirements:
- isValid: true only if no significant issues found
- confidenceDowngrade: 0.0-0.3 (amount to reduce confidence, or 0 if no downgrade)
- Provide at least empty flags array for every task
- Be critical but fair - flag real issues, not nitpicks
`;

  try {
    const response = await callGemini({
      systemPrompt: "You are a critical logic validator. Find flaws relentlessly. Return ONLY valid JSON.",
      userPrompt: prompt,
      temperature: 0.2,
      maxTokens: 3000,
    });

    // Parse the validation results
    const validations = parseJSON<ValidationResult[]>(response.text);

    // Ensure we have a validation result for every task
    const validatedResults: ValidationResult[] = results.map(result => {
      const existingValidation = validations.find(v => v.taskId === result.taskId);
      
      if (existingValidation) {
        // Ensure all required fields exist
        return {
          taskId: result.taskId,
          isValid: existingValidation.isValid ?? true,
          flags: existingValidation.flags || [],
          confidenceDowngrade: existingValidation.confidenceDowngrade,
        };
      }

      // Create default validation if missing
      return {
        taskId: result.taskId,
        isValid: true,
        flags: [],
      };
    });

    // Validate flag structures
    validatedResults.forEach(validation => {
      validation.flags = validation.flags.map(flag => ({
        severity: ["warning", "error", "critical"].includes(flag.severity) 
          ? flag.severity 
          : "warning",
        message: flag.message || "Unspecified issue",
        suggestion: flag.suggestion,
      }));
    });

    return validatedResults;

  } catch (error) {
    console.error("Validation error:", error);
    console.warn("Using fallback validation");
    
    // Return fallback validation on error
    return getFallbackValidation(results);
  }
}

/**
 * Check for contradictions between results
 */
export function detectContradictions(results: SubagentResult[]): Array<{
  taskId1: string;
  taskId2: string;
  description: string;
}> {
  const contradictions: Array<{
    taskId1: string;
    taskId2: string;
    description: string;
  }> = [];

  // Simple heuristic: look for opposing keywords
  const opposingPairs = [
    ["increase", "decrease"],
    ["positive", "negative"],
    ["high", "low"],
    ["growth", "decline"],
    ["benefit", "harm"],
    ["support", "oppose"],
  ];

  for (let i = 0; i < results.length; i++) {
    for (let j = i + 1; j < results.length; j++) {
      const result1 = results[i];
      const result2 = results[j];
      
      const output1 = result1.output.toLowerCase();
      const output2 = result2.output.toLowerCase();

      for (const [term1, term2] of opposingPairs) {
        if (
          (output1.includes(term1) && output2.includes(term2)) ||
          (output1.includes(term2) && output2.includes(term1))
        ) {
          // Check if they're talking about the same subject (simple overlap check)
          const words1 = new Set(output1.split(/\s+/).filter(w => w.length > 5));
          const words2 = new Set(output2.split(/\s+/).filter(w => w.length > 5));
          const overlap = [...words1].filter(w => words2.has(w));
          
          if (overlap.length > 0) {
            contradictions.push({
              taskId1: result1.taskId,
              taskId2: result2.taskId,
              description: `Potential contradiction: "${term1}" vs "${term2}" in related contexts`,
            });
          }
        }
      }
    }
  }

  return contradictions;
}

/**
 * Calculate overall confidence after validation
 */
export function calculateValidatedConfidence(
  results: SubagentResult[],
  validations: ValidationResult[]
): number {
  if (results.length === 0) return 0;

  let totalConfidence = 0;
  let totalWeight = 0;

  for (const result of results) {
    const validation = validations.find(v => v.taskId === result.taskId);
    let adjustedConfidence = result.confidenceScore;

    // Apply confidence downgrade if present
    if (validation?.confidenceDowngrade) {
      adjustedConfidence -= validation.confidenceDowngrade;
    }

    // Weight by number of flags (more flags = less weight)
    const flagWeight = validation?.flags?.length || 0;
    const weight = Math.max(0.5, 1 - flagWeight * 0.1);

    totalConfidence += Math.max(0, adjustedConfidence) * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? totalConfidence / totalWeight : 0;
}
