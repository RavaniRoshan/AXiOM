import type { ResearchQuery, TaskGraph, Task } from "./types";
import { callGemini, parseJSON, generateRunId, detectCircularDependencies } from "./gemini-client";

// Fallback tasks for when API fails
function getFallbackTasks(question: string): Task[] {
  return [
    {
      id: "T1",
      title: "Define Core Concepts",
      description: `Identify and define key terminology and foundational concepts related to: ${question}`,
      dependencies: [],
      priority: "high",
      estimatedTokens: 2000,
    },
    {
      id: "T2",
      title: "Analyze Historical Context",
      description: `Review historical data and precedents relevant to: ${question}`,
      dependencies: ["T1"],
      priority: "high",
      estimatedTokens: 2500,
    },
    {
      id: "T3",
      title: "Evaluate Current State",
      description: `Assess present-day conditions and factors impacting: ${question}`,
      dependencies: ["T1"],
      priority: "high",
      estimatedTokens: 2500,
    },
    {
      id: "T4",
      title: "Identify Key Stakeholders",
      description: `Map out primary actors, organizations, and entities involved in: ${question}`,
      dependencies: ["T1"],
      priority: "medium",
      estimatedTokens: 2000,
    },
    {
      id: "T5",
      title: "Synthesize Findings",
      description: `Integrate all research into coherent conclusions addressing: ${question}`,
      dependencies: ["T2", "T3", "T4"],
      priority: "high",
      estimatedTokens: 3000,
    },
  ];
}

/**
 * Decompose a research question into atomic tasks
 */
export async function decompose(query: ResearchQuery): Promise<TaskGraph> {
  const prompt = `
You are a research decomposition expert. Given this research question:

"${query.question}"

Break it into 4-7 atomic tasks. For each task:
1. Define a clear objective (1 sentence)
2. List hard dependencies (other tasks that must complete first)
3. Estimate token budget needed (1000-4000)
4. Assign priority (high/medium/low)

Respond ONLY as valid JSON (no preamble, no markdown code blocks):
{
  "tasks": [
    {
      "id": "T1",
      "title": "Task Title",
      "description": "Clear objective statement",
      "dependencies": [],
      "priority": "high",
      "estimatedTokens": 2000
    }
  ]
}

Requirements:
- Task IDs must be sequential (T1, T2, T3, etc.)
- First tasks should have no dependencies
- Dependencies must reference existing task IDs
- Total 4-7 tasks maximum
`;

  try {
    const response = await callGemini({
      systemPrompt: "You are a research strategist. Your output is ONLY valid JSON. Never add markdown formatting or explanations.",
      userPrompt: prompt,
      temperature: 0,
      maxTokens: 4000,
    });

    // Parse the response
    const parsed = parseJSON<{ tasks: Task[] }>(response.text);

    // Validate structure
    if (!Array.isArray(parsed.tasks) || parsed.tasks.length === 0) {
      throw new Error("Decomposition failed: no tasks returned");
    }

    if (parsed.tasks.length < 4 || parsed.tasks.length > 7) {
      console.warn(`Unexpected task count: ${parsed.tasks.length}, using anyway`);
    }

    // Validate each task has required fields
    for (const task of parsed.tasks) {
      if (!task.id || !task.title || !task.description) {
        throw new Error(`Task missing required fields: ${JSON.stringify(task)}`);
      }
      // Ensure dependencies is an array
      if (!Array.isArray(task.dependencies)) {
        task.dependencies = [];
      }
      // Ensure priority is valid
      if (!["high", "medium", "low"].includes(task.priority)) {
        task.priority = "medium";
      }
      // Ensure estimatedTokens is reasonable
      if (!task.estimatedTokens || task.estimatedTokens < 500) {
        task.estimatedTokens = 2000;
      }
    }

    // Check for circular dependencies
    if (detectCircularDependencies(parsed.tasks)) {
      throw new Error("Circular dependency detected in task graph");
    }

    // Validate all dependencies exist
    const taskIds = new Set(parsed.tasks.map(t => t.id));
    for (const task of parsed.tasks) {
      for (const depId of task.dependencies) {
        if (!taskIds.has(depId)) {
          throw new Error(`Task ${task.id} has invalid dependency: ${depId}`);
        }
      }
    }

    return {
      runId: generateRunId(),
      rootQuestion: query.question,
      tasks: parsed.tasks,
      estimatedSteps: parsed.tasks.length,
    };

  } catch (error) {
    console.error("Decomposition error:", error);
    console.warn("Using fallback task generation");

    // Return fallback tasks on error
    const fallbackTasks = getFallbackTasks(query.question);
    return {
      runId: generateRunId(),
      rootQuestion: query.question,
      tasks: fallbackTasks,
      estimatedSteps: fallbackTasks.length,
    };
  }
}
