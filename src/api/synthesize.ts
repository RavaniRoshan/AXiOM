import type { ResearchReport, SubagentResult, TaskGraph, ValidationResult, SourceReference } from "./types";
import { callGemini, parseJSON } from "./gemini-client";
import { calculateValidatedConfidence } from "./validate";

/**
 * Extract source references from manuscript text
 */
export function extractSourceReferences(manuscript: string): SourceReference[] {
  const references: SourceReference[] = [];
  const citationPattern = /\[(\d+)\]/g;
  const matches = manuscript.matchAll(citationPattern);
  
  const seen = new Set<string>();
  for (const match of matches) {
    const id = match[1];
    if (!seen.has(id)) {
      seen.add(id);
      references.push({
        id: `REF-${id}`,
        label: `Source [${id}]`,
      });
    }
  }

  return references;
}

// Fallback manuscript generator
function getFallbackManuscript(
  question: string,
  results: SubagentResult[],
  assumptions: string[]
): string {
  const taskOutputs = results.map(r => 
    `<h3>${r.taskId}: ${r.title || 'Task Analysis'}</h3>
    <p>${r.output}</p>
    <p><em>Confidence: ${(r.confidenceScore * 100).toFixed(0)}% | Source: ${r.sourceType}</em></p>`
  ).join('\n');

  return `
<h1>Research Report: ${question}</h1>

<h2>Executive Summary</h2>
<p>This report presents findings from a multi-stage analysis of "${question}". The research was conducted through a series of specialized subagent analyses, each focusing on distinct aspects of the inquiry.</p>

<h2>Methodology</h2>
<p>The analysis employed a decomposed approach, breaking the research question into ${results.length} atomic tasks. Each task was executed by an isolated subagent with specific domain focus. Results were validated through adversarial peer review before synthesis.</p>

<h2>Key Findings</h2>
${taskOutputs}

<h2>Conclusions</h2>
<p>The synthesized findings suggest a nuanced understanding of the research question. While confidence varies across individual components (range: ${Math.min(...results.map(r => r.confidenceScore)).toFixed(2)} - ${Math.max(...results.map(r => r.confidenceScore)).toFixed(2)}), the overall coherence of the analysis supports the primary conclusions.</p>

<h2>What Could Be Wrong</h2>
<p>Several limitations should be noted: (1) Analysis relies on reasoning rather than primary data collection, (2) Temporal factors may shift conclusions, (3) Additional domain expertise could reveal overlooked factors.</p>
`;
}

/**
 * Synthesize validated results into final research report
 */
export async function synthesize(
  runId: string,
  rootQuestion: string,
  validatedResults: SubagentResult[],
  taskGraph: TaskGraph,
  validationResults?: ValidationResult[]
): Promise<ResearchReport> {
  const startTime = Date.now();
  
  // Collect all assumptions from all results
  const allAssumptions = validatedResults.flatMap(r => r.assumptions);
  const uniqueAssumptions = [...new Set(allAssumptions)].slice(0, 10); // Max 10 assumptions

  // Prepare simplified results for the prompt
  const simplifiedResults = validatedResults.map(r => ({
    taskId: r.taskId,
    output: r.output.substring(0, 400),
    confidence: r.confidenceScore,
    sourceType: r.sourceType,
  }));

  const prompt = `
You are writing an academic research report. Synthesize the following findings into a coherent manuscript.

QUESTION: ${rootQuestion}

VALIDATED FINDINGS:
${JSON.stringify(simplifiedResults, null, 2)}

Write a structured manuscript that:
1. Answers the question directly in the introduction
2. Incorporates findings with confidence levels
3. Lists all critical assumptions
4. Includes a "What Could Be Wrong" section
5. Uses HTML formatting (h1, h2, h3, p, ul, li, em, strong)

Respond ONLY as valid JSON:
{
  "manuscript": "<h1>Title</h1>...",
  "assumptions": ["assumption 1", "assumption 2"],
  "overallConfidence": 0.89
}

Requirements:
- Manuscript should be 300-500 words
- Use proper HTML tags for structure
- Include confidence markers where relevant
- Be objective and academic in tone
- Acknowledge limitations explicitly
`;

  try {
    const response = await callGemini({
      systemPrompt: "You are an academic researcher writing a formal report. Return ONLY valid JSON with HTML-formatted manuscript.",
      userPrompt: prompt,
      temperature: 0.3,
      maxTokens: 4000,
    });

    // Parse the synthesis result
    const parsed = parseJSON<{
      manuscript: string;
      assumptions: string[];
      overallConfidence: number;
    }>(response.text);

    // Combine assumptions from parsed results and collected assumptions
    const combinedAssumptions = [...new Set([
      ...parsed.assumptions,
      ...uniqueAssumptions,
    ])].slice(0, 10);

    // Calculate overall confidence
    let overallConfidence = parsed.overallConfidence;
    if (!overallConfidence || overallConfidence <= 0) {
      overallConfidence = calculateValidatedConfidence(
        validatedResults,
        validationResults || []
      );
    }

    // Validate confidence is in valid range
    overallConfidence = Math.max(0, Math.min(1, overallConfidence));

    // Create tasks record
    const tasksRecord: Record<string, SubagentResult> = {};
    validatedResults.forEach(result => {
      tasksRecord[result.taskId] = result;
    });

    return {
      runId,
      question: rootQuestion,
      manuscript: parsed.manuscript,
      assumptions: combinedAssumptions,
      confidenceScore: overallConfidence,
      sources: extractSourceReferences(parsed.manuscript),
      executionTime: Date.now() - startTime,
      tasks: tasksRecord,
      validationResults: validationResults || [],
    };

  } catch (error) {
    console.error("Synthesis error:", error);
    console.warn("Using fallback manuscript generation");

    // Calculate confidence without validation
    const overallConfidence = calculateValidatedConfidence(validatedResults, []);

    // Create tasks record
    const tasksRecord: Record<string, SubagentResult> = {};
    validatedResults.forEach(result => {
      tasksRecord[result.taskId] = result;
    });

    // Return fallback report
    return {
      runId,
      question: rootQuestion,
      manuscript: getFallbackManuscript(rootQuestion, validatedResults, uniqueAssumptions),
      assumptions: uniqueAssumptions.slice(0, 6),
      confidenceScore: overallConfidence,
      sources: [],
      executionTime: Date.now() - startTime,
      tasks: tasksRecord,
      validationResults: validationResults || [],
    };
  }
}

/**
 * Format manuscript as markdown for export
 */
export function formatManuscriptAsMarkdown(report: ResearchReport): string {
  const tasksSection = Object.entries(report.tasks)
    .map(([taskId, result]) => `
### ${taskId}: ${result.title || 'Task Analysis'}

${result.output}

- **Confidence:** ${(result.confidenceScore * 100).toFixed(1)}%
- **Source Type:** ${result.sourceType}
- **Execution Time:** ${result.executionTime}ms
`)
    .join('\n---\n');

  return `# ${report.question}

**Run ID:** ${report.runId}  
**Generated:** ${new Date().toLocaleString()}  
**Overall Confidence:** ${(report.confidenceScore * 100).toFixed(1)}%

---

## Manuscript

${report.manuscript}

---

## Key Assumptions

${report.assumptions.map(a => `- ${a}`).join('\n')}

---

## Task Details

${tasksSection}

---

*Generated by AXIOM-ONE Research Engine*
`;
}
