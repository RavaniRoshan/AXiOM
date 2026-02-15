import type { 
  ResearchReport, 
  SubagentResult, 
  TaskGraph, 
  ValidationResult,
  Task 
} from "./types";
import { decompose } from "./decompose";
import { executeSubagent } from "./execute-subagent";
import { validate } from "./validate";
import { synthesize } from "./synthesize";
import { generateRunId } from "./gemini-client";

// Execution status type
export type ExecutionStatus = 
  | "idle" 
  | "decomposing" 
  | "executing" 
  | "validating" 
  | "synthesizing" 
  | "complete" 
  | "error";

// Progress update interface
export interface ExecutionUpdate {
  status: ExecutionStatus;
  progress: number;
  message?: string;
  taskGraph?: TaskGraph;
  currentTask?: string;
  completedTasks?: string[];
  manuscript?: string;
  report?: ResearchReport;
  error?: string;
}

// Progress callback type
export type ProgressCallback = (update: ExecutionUpdate) => void;

// Execution options
export interface ExecutionOptions {
  question: string;
  context?: string;
  onProgress?: ProgressCallback;
  enableParallelExecution?: boolean;
}

/**
 * Execute a single task with progress tracking
 */
async function executeTaskWithTracking(
  task: Task,
  context: string,
  onProgress?: ProgressCallback,
  completedTasks: string[] = []
): Promise<SubagentResult> {
  if (onProgress) {
    onProgress({
      status: "executing",
      progress: 0.2 + (completedTasks.length * 0.5),
      message: `Executing task ${task.id}: ${task.title}`,
      currentTask: task.id,
      completedTasks: [...completedTasks],
    });
  }

  const result = await executeSubagent(
    task.id,
    task.description,
    context,
    task.estimatedTokens
  );

  // Add title to result for reference
  result.title = task.title;

  return result;
}

/**
 * Execute tasks respecting dependencies
 */
async function executeTasksInOrder(
  tasks: Task[],
  context: string,
  onProgress?: ProgressCallback
): Promise<Record<string, SubagentResult>> {
  const results: Record<string, SubagentResult> = {};
  const completedTasks: string[] = [];
  const pendingTasks = new Map(tasks.map(t => [t.id, t]));

  async function executeTask(taskId: string): Promise<void> {
    const task = pendingTasks.get(taskId);
    if (!task || completedTasks.includes(taskId)) return;

    // Execute dependencies first
    for (const depId of task.dependencies) {
      if (!completedTasks.includes(depId)) {
        await executeTask(depId);
      }
    }

    // Execute this task
    const result = await executeTaskWithTracking(
      task,
      context,
      onProgress,
      completedTasks
    );

    results[taskId] = result;
    completedTasks.push(taskId);
  }

  // Execute all tasks
  await Promise.all(tasks.map(t => executeTask(t.id)));

  return results;
}

/**
 * Main research execution orchestrator
 * Coordinates: decompose → execute → validate → synthesize
 */
export async function runResearchExecution(
  options: ExecutionOptions
): Promise<ResearchReport> {
  const { question, context = "", onProgress, enableParallelExecution = true } = options;
  const startTime = Date.now();

  try {
    // Step 1: Decompose
    if (onProgress) {
      onProgress({
        status: "decomposing",
        progress: 0.1,
        message: "Breaking down research question into atomic tasks...",
      });
    }

    const taskGraph = await decompose({ question, context });

    if (onProgress) {
      onProgress({
        status: "decomposing",
        progress: 0.2,
        message: `Decomposed into ${taskGraph.tasks.length} tasks`,
        taskGraph,
      });
    }

    // Step 2: Execute subagents
    if (onProgress) {
      onProgress({
        status: "executing",
        progress: 0.25,
        message: "Executing research tasks...",
        taskGraph,
      });
    }

    const taskResults = await executeTasksInOrder(
      taskGraph.tasks,
      question,
      onProgress
    );

    const subagentResults = Object.values(taskResults);

    if (onProgress) {
      onProgress({
        status: "executing",
        progress: 0.7,
        message: `Completed ${subagentResults.length} tasks`,
        taskGraph,
        completedTasks: subagentResults.map(r => r.taskId),
      });
    }

    // Step 3: Validate
    if (onProgress) {
      onProgress({
        status: "validating",
        progress: 0.75,
        message: "Running adversarial validation...",
      });
    }

    const validationResults = await validate(subagentResults, question);

    // Check for critical validation failures
    const criticalIssues = validationResults.flatMap(v => 
      v.flags.filter(f => f.severity === "critical")
    );

    if (criticalIssues.length > 0 && onProgress) {
      onProgress({
        status: "validating",
        progress: 0.8,
        message: `Found ${criticalIssues.length} critical issues`,
      });
    }

    if (onProgress) {
      onProgress({
        status: "validating",
        progress: 0.85,
        message: "Validation complete",
      });
    }

    // Step 4: Synthesize
    if (onProgress) {
      onProgress({
        status: "synthesizing",
        progress: 0.9,
        message: "Synthesizing final manuscript...",
      });
    }

    const report = await synthesize(
      taskGraph.runId,
      question,
      subagentResults,
      taskGraph,
      validationResults
    );

    // Add execution time
    report.executionTime = Date.now() - startTime;

    if (onProgress) {
      onProgress({
        status: "complete",
        progress: 1.0,
        message: "Research complete!",
        report,
        manuscript: report.manuscript,
      });
    }

    return report;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Research execution error:", error);

    if (onProgress) {
      onProgress({
        status: "error",
        progress: 0,
        message: `Error: ${errorMessage}`,
        error: errorMessage,
      });
    }

    // Return a minimal error report
    return {
      runId: generateRunId(),
      question,
      manuscript: `<h1>Error</h1><p>Research execution failed: ${errorMessage}</p>`,
      assumptions: [],
      confidenceScore: 0,
      sources: [],
      executionTime: Date.now() - startTime,
      tasks: {},
      validationResults: [],
    };
  }
}

/**
 * Resume a partially completed research execution
 * (For future use with persistence)
 */
export async function resumeResearchExecution(
  partialTaskGraph: TaskGraph,
  completedResults: Record<string, SubagentResult>,
  options: Omit<ExecutionOptions, 'question'> & { question: string }
): Promise<ResearchReport> {
  const { question, onProgress } = options;
  const startTime = Date.now();

  // Identify remaining tasks
  const remainingTasks = partialTaskGraph.tasks.filter(
    t => !completedResults[t.id]
  );

  if (remainingTasks.length === 0) {
    // All tasks complete, skip to validation and synthesis
    const subagentResults = Object.values(completedResults);
    const validationResults = await validate(subagentResults, question);
    
    return synthesize(
      partialTaskGraph.runId,
      question,
      subagentResults,
      partialTaskGraph,
      validationResults
    );
  }

  // Execute remaining tasks
  const newResults = await executeTasksInOrder(
    remainingTasks,
    question,
    onProgress
  );

  // Merge results
  const allResults = { ...completedResults, ...newResults };
  const subagentResults = Object.values(allResults);

  // Validate and synthesize
  const validationResults = await validate(subagentResults, question);
  const report = await synthesize(
    partialTaskGraph.runId,
    question,
    subagentResults,
    partialTaskGraph,
    validationResults
  );

  report.executionTime = Date.now() - startTime;
  return report;
}

/**
 * Get execution progress estimate
 */
export function getExecutionProgress(
  status: ExecutionStatus,
  completedTasks: number,
  totalTasks: number
): number {
  const statusProgress: Record<ExecutionStatus, number> = {
    idle: 0,
    decomposing: 0.1,
    executing: 0.2 + (completedTasks / totalTasks) * 0.5,
    validating: 0.75,
    synthesizing: 0.9,
    complete: 1.0,
    error: 0,
  };

  return statusProgress[status] || 0;
}
