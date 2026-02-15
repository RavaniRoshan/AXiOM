// Input
export interface ResearchQuery {
  question: string;
  context?: string;
}

// Task Decomposition Output
export interface Task {
  id: string;
  title: string;
  description: string;
  dependencies: string[];
  priority: "high" | "medium" | "low";
  estimatedTokens: number;
}

export interface TaskGraph {
  runId: string;
  rootQuestion: string;
  tasks: Task[];
  estimatedSteps: number;
}

// Reasoning Trace
export interface ReasoningTrace {
  timestamp: string;
  type: "THOUGHT" | "ACTION" | "VALIDATE" | "ERROR";
  content: string;
}

// Subagent Execution Output
export interface SubagentResult {
  taskId: string;
  title?: string;
  output: string;
  assumptions: string[];
  confidenceScore: number;
  sourceType: "factual" | "inferred" | "reasoned";
  executionTime: number;
  trace: ReasoningTrace[];
}

// Validation Output
export interface ValidationFlag {
  severity: "warning" | "error" | "critical";
  message: string;
  suggestion?: string;
}

export interface ValidationResult {
  taskId: string;
  isValid: boolean;
  flags: ValidationFlag[];
  confidenceDowngrade?: number;
}

// Source reference for manuscript citations
export interface SourceReference {
  id: string;
  label?: string;
}

// Final Synthesis
export interface ResearchReport {
  runId: string;
  question: string;
  manuscript: string;
  assumptions: string[];
  confidenceScore: number;
  sources: SourceReference[];
  executionTime: number;
  tasks: Record<string, SubagentResult>;
  validationResults: ValidationResult[];
}
