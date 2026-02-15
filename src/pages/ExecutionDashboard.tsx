import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Task, TaskGraph, SubagentResult, ReasoningTrace, ResearchReport } from '../api/types';
import { runResearchExecution, type ExecutionUpdate, type ExecutionStatus } from '../api/orchestrator';
import { formatManuscriptAsMarkdown } from '../api/synthesize';

// Extended task with progress
interface ExtendedTask extends Task {
  status: "PENDING" | "EXECUTING" | "COMPLETE" | "FAILED";
  progress: number;
  output?: string;
  confidence?: number;
}

// Logo Icon Component
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
    </svg>
  );
}

// Execution Header Component
interface ExecutionHeaderProps {
  runId: string;
  status: ExecutionStatus;
  error?: string | null;
  onNewQuery: () => void;
  onExport: () => void;
  onRetry?: () => void;
  onCancel?: () => void;
  progress: number;
}

function ExecutionHeader({ runId, status, error, onNewQuery, onExport, onRetry, onCancel, progress }: ExecutionHeaderProps) {
  const isRunning = status !== "complete" && status !== "error" && status !== "idle";

  return (
    <header className="h-14 border-b border-border-std bg-surface flex items-center justify-between px-6 shrink-0 z-20">
      <div className="flex items-center gap-4">
        <LogoIcon className="size-5 text-ink" />
        <h1 className="font-serif font-semibold text-lg tracking-tight">AXIOM-ONE</h1>
        <div className="h-4 w-px bg-neutral-200 mx-2"></div>
        <div className="font-mono text-xs text-neutral-500 flex items-center gap-3">
          <span>RUN_ID: {runId}</span>
          <span className="text-neutral-200">|</span>
          <span className="flex items-center gap-1.5" style={{ color: error ? '#B91C1C' : isRunning ? '#4F46E5' : '#0F766E' }}>
            {isRunning && (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-trace-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-trace-blue"></span>
                </span>
                <span>STATUS: {status.toUpperCase()}</span>
              </>
            )}
            {!isRunning && <span>STATUS: {error ? 'ERROR' : status.toUpperCase()}</span>}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {isRunning && onCancel && (
          <button
            onClick={onCancel}
            className="flex items-center justify-center h-8 px-4 bg-error-red/10 text-error-red border border-error-red hover:bg-error-red hover:text-white text-xs font-bold font-mono tracking-wide uppercase transition-colors"
          >
            Cancel
          </button>
        )}
        {error && onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center justify-center h-8 px-4 bg-error-red text-white hover:bg-red-700 text-xs font-bold font-mono tracking-wide uppercase transition-colors"
          >
            Retry
          </button>
        )}
        <button
          onClick={onNewQuery}
          className="flex items-center justify-center h-8 px-4 bg-surface hover:bg-paper border border-neutral-200 text-ink text-xs font-bold font-mono tracking-wide uppercase transition-colors"
        >
          New Query
        </button>
        <button
          onClick={onExport}
          disabled={status !== "complete"}
          className="flex items-center justify-center h-8 px-4 bg-ink text-surface hover:bg-neutral-800 disabled:opacity-50 text-xs font-bold font-mono tracking-wide uppercase transition-colors shadow-hard"
        >
          Export Report
        </button>
      </div>
    </header>
  );
}

// Progress Bar Component
function ProgressBar({ progress, status }: { progress: number; status: ExecutionStatus }) {
  const isRunning = status === "executing" || status === "decomposing" || status === "validating" || status === "synthesizing";
  
  return (
    <div className="w-full bg-neutral-100 h-1 mt-0">
      <div 
        className={`h-full transition-all duration-500 ease-out ${
          isRunning ? 'bg-trace-blue' : status === "complete" ? 'bg-teal-success' : status === "error" ? 'bg-error-red' : 'bg-neutral-300'
        }`}
        style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }}
      />
    </div>
  );
}

// Task Tree Item Component
interface TaskTreeItemProps {
  task: ExtendedTask;
  isSelected: boolean;
  onClick: () => void;
  showOutput?: boolean;
}

function TaskTreeItem({ task, isSelected, onClick, showOutput }: TaskTreeItemProps) {
  const statusColor = {
    PENDING: "bg-neutral-100 text-neutral-700",
    EXECUTING: "bg-trace-blue text-white",
    COMPLETE: "bg-teal-success text-white",
    FAILED: "bg-error-red text-white",
  }[task.status];

  return (
    <div className={`border border-neutral-200 transition-all ${
      isSelected ? "bg-paper border-ink shadow-sm" : "hover:bg-paper"
    }`}>
      <button
        onClick={onClick}
        className="w-full text-left p-3"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs font-bold text-ink">{task.id}</span>
          <span className={`px-2 py-1 text-[10px] font-mono font-bold rounded ${statusColor}`}>
            {task.status}
          </span>
        </div>
        <h4 className="font-sans text-sm font-medium text-ink mb-2">{task.title}</h4>
        {(task.status === "EXECUTING" || task.status === "COMPLETE") && (
          <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-ink h-full transition-all duration-500 ease-out"
              style={{ width: `${task.progress * 100}%` }}
            />
          </div>
        )}
      </button>
      
      {/* Live Output Display */}
      {showOutput && task.output && (
        <div className="px-3 pb-3 border-t border-neutral-100 mt-2">
          <p className="font-sans text-xs text-neutral-600 mt-2 line-clamp-3">{task.output}</p>
          {task.confidence && (
            <div className="mt-2 flex items-center gap-2">
              <span className="font-mono text-[10px] text-neutral-400">Confidence:</span>
              <span className={`font-mono text-[10px] font-bold ${
                task.confidence >= 0.8 ? 'text-teal-success' : 
                task.confidence >= 0.6 ? 'text-trace-blue' : 'text-error-red'
              }`}>
                {(task.confidence * 100).toFixed(0)}%
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Task Tree Sidebar Component
interface TaskTreeSidebarProps {
  tasks: ExtendedTask[];
  selectedTaskId: string | null;
  onSelectTask: (taskId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  status: ExecutionStatus;
}

function TaskTreeSidebar({ tasks, selectedTaskId, onSelectTask, isOpen, onClose, status }: TaskTreeSidebarProps) {
  const completedCount = tasks.filter(t => t.status === "COMPLETE").length;
  const executingCount = tasks.filter(t => t.status === "EXECUTING").length;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={onClose}
        />
      )}
      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 fixed md:relative w-[280px] md:w-[320px] h-full bg-surface border-r border-neutral-200 flex flex-col shrink-0 z-40`}>
        <div className="p-6 border-b border-neutral-200 bg-surface">
          <h2 className="font-serif font-semibold text-xl mb-1 text-ink">The Syllabus</h2>
          <p className="font-sans text-xs text-neutral-500">Hierarchical Task Decomposition</p>
          {tasks.length > 0 && (
            <div className="mt-3 flex items-center gap-3 text-xs">
              <span className="font-mono text-neutral-400">
                {completedCount}/{tasks.length} Complete
              </span>
              {executingCount > 0 && (
                <span className="font-mono text-trace-blue animate-pulse">
                  {executingCount} Executing
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {tasks.map((task) => (
            <TaskTreeItem
              key={task.id}
              task={task}
              isSelected={selectedTaskId === task.id}
              onClick={() => onSelectTask(task.id)}
              showOutput={selectedTaskId === task.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
}

// Manuscript Panel Component
interface ManuscriptPanelProps {
  manuscript: string;
  confidence: number;
  assumptions: string[];
  onInspect: () => void;
  question: string;
  isLoading: boolean;
  currentMessage?: string;
}

function ManuscriptPanel({ manuscript, confidence, assumptions, onInspect, question, isLoading, currentMessage }: ManuscriptPanelProps) {
  return (
    <article className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 border-b border-neutral-200 bg-surface shrink-0">
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-xl md:text-3xl text-ink truncate pr-4">{question}</h2>
          {currentMessage && isLoading && (
            <p className="font-mono text-xs text-trace-blue mt-1 animate-pulse">{currentMessage}</p>
          )}
        </div>
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="font-mono text-xs text-neutral-500">CONFIDENCE</div>
            <div className="font-mono text-xl md:text-2xl font-bold text-ink">
              {(confidence * 100).toFixed(1)}%
            </div>
          </div>
          <button
            onClick={onInspect}
            className="px-3 md:px-4 py-2 border border-border-std font-mono text-xs uppercase hover:bg-paper transition-colors"
          >
            Inspect Logic
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-none">
          {isLoading && !manuscript ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400">
              <div className="w-16 h-16 border-2 border-neutral-200 border-t-ink rounded-full animate-spin mb-4"></div>
              <p className="font-mono text-sm">{currentMessage || 'INITIALIZING...'}</p>
            </div>
          ) : manuscript ? (
            <div 
              className="font-serif leading-relaxed text-ink prose prose-sm"
              dangerouslySetInnerHTML={{ __html: manuscript }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400">
              <p className="font-mono text-sm">Waiting for execution to begin...</p>
            </div>
          )}
        </div>
      </div>
      {assumptions.length > 0 && (
        <div className="border-t border-neutral-200 bg-neutral-50 p-4 md:p-8 shrink-0">
          <h3 className="font-serif text-lg font-semibold text-ink mb-4">Key Assumptions</h3>
          <ul className="space-y-2">
            {assumptions.map((assumption, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-trace-blue font-bold">•</span>
                <span className="font-sans text-sm text-neutral-700">{assumption}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

// Trace Entry Component
interface TraceEntryProps {
  entry: ReasoningTrace;
}

function TraceEntry({ entry }: TraceEntryProps) {
  const typeStyles = {
    THOUGHT: { label: "THOUGHT", bg: "bg-trace-blue/10", textColor: "text-trace-blue" },
    ACTION: { label: "ACTION", bg: "bg-neutral-100", textColor: "text-neutral-700" },
    VALIDATE: { label: "VALIDATE", bg: "bg-teal-success/10", textColor: "text-teal-success" },
    ERROR: { label: "ERROR", bg: "bg-error-red/10", textColor: "text-error-red" },
  }[entry.type];

  const timestamp = new Date(entry.timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3
  });

  return (
    <div className="relative pl-6 border-l border-border-std group">
      <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-white border border-border-std rotate-45 group-hover:border-trace-blue transition-colors"></div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-neutral-400">[{timestamp}]</span>
          <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${typeStyles.bg} ${typeStyles.textColor}`}>
            {typeStyles.label}
          </span>
        </div>
        <p className="font-mono text-[13px] text-ink leading-relaxed">
          {entry.content}
        </p>
      </div>
    </div>
  );
}

// Trace Modal Component
interface TraceModalProps {
  taskId: string | null;
  taskTitle: string;
  trace: ReasoningTrace[];
  onClose: () => void;
  isOpen: boolean;
}

function TraceModal({ taskId, taskTitle, trace, onClose, isOpen }: TraceModalProps) {
  if (!isOpen || !taskId) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full md:w-1/2 lg:w-1/2 bg-paper border-l border-ink shadow-hard flex flex-col z-50">
        <div className="shrink-0 p-6 border-b border-border-std bg-paper">
          <div className="flex items-start justify-between mb-2">
            <div className="min-w-0 pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-trace-blue uppercase tracking-wide">Trace_Mode::Active</span>
                <span className="w-1.5 h-1.5 rounded-full bg-trace-blue animate-pulse"></span>
              </div>
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-ink leading-tight truncate">
                Subagent ID: {taskId}
              </h2>
              <p className="font-sans text-sm text-neutral-500 mt-1 truncate">{taskTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 h-8 w-8 border border-border-std hover:bg-error-red hover:border-error-red hover:text-white transition-colors flex items-center justify-center"
              aria-label="Close trace modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {trace.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400">
              <p className="font-mono text-sm">No trace data available</p>
            </div>
          ) : (
            trace.map((entry, idx) => (
              <TraceEntry key={idx} entry={entry} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

// Error Display Component
interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-error-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-ink mb-4">Execution Error</h3>
        <p className="font-sans text-neutral-600 mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-ink text-paper font-mono text-sm font-bold hover:bg-neutral-800 transition-colors shadow-hard"
        >
          Retry Execution
        </button>
      </div>
    </div>
  );
}

// Main ExecutionDashboard Component
export default function ExecutionDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { question, taskGraph } = location.state as { 
    question: string; 
    taskGraph: TaskGraph;
  } || {};

  // State
  const [runId, setRunId] = useState<string>(taskGraph?.runId || "0x0000");
  const [status, setStatus] = useState<ExecutionStatus>("idle");
  const [tasks, setTasks] = useState<ExtendedTask[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [manuscript, setManuscript] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [assumptions, setAssumptions] = useState<string[]>([]);
  const [traces, setTraces] = useState<Record<string, ReasoningTrace[]>>({});
  const [isTraceModalOpen, setIsTraceModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [executionReport, setExecutionReport] = useState<ResearchReport | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  
  // Abort controller ref
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMounted = useRef(true);

  // Redirect if no task graph
  useEffect(() => {
    if (!taskGraph) {
      navigate('/');
      return;
    }

    // Initialize tasks from taskGraph
    const initialTasks: ExtendedTask[] = taskGraph.tasks.map(t => ({
      ...t,
      status: "PENDING",
      progress: 0,
    }));
    setTasks(initialTasks);
    setRunId(taskGraph.runId);

    // Start execution immediately
    startExecution();

    return () => {
      isMounted.current = false;
      // Abort any ongoing execution
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [taskGraph, navigate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close modal
      if (e.key === 'Escape' && isTraceModalOpen) {
        setIsTraceModalOpen(false);
      }
      
      // Arrow keys to navigate tasks
      if (tasks.length > 0) {
        const currentIndex = selectedTaskId ? tasks.findIndex(t => t.id === selectedTaskId) : -1;
        
        if (e.key === 'ArrowDown' && currentIndex < tasks.length - 1) {
          setSelectedTaskId(tasks[currentIndex + 1]?.id || tasks[0]?.id);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
          setSelectedTaskId(tasks[currentIndex - 1]?.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTraceModalOpen, tasks, selectedTaskId]);

  // Start the research execution
  const startExecution = useCallback(async () => {
    if (!question || !taskGraph) return;

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    setError(null);
    setStatus("decomposing");
    setCurrentMessage("Initializing research execution...");

    try {
      await runResearchExecution({
        question,
        abortSignal: abortControllerRef.current.signal,
        onProgress: (update: ExecutionUpdate) => {
          if (!isMounted.current) return;

          // Update status
          setStatus(update.status);
          setCurrentMessage(update.message || "");
          if (update.progress !== undefined) {
            setProgress(update.progress);
          }

          // Update tasks based on progress
          if (update.currentTask) {
            setTasks(prev => prev.map(task => {
              if (update.currentTask === task.id) {
                return { 
                  ...task, 
                  status: "EXECUTING", 
                  progress: 0.5,
                  // @ts-ignore
                  output: update.partialResult?.output || task.output
                };
              }
              if (update.completedTasks?.includes(task.id)) {
                return { 
                  ...task, 
                  status: "COMPLETE", 
                  progress: 1,
                  // @ts-ignore
                  output: update.partialResult?.output || task.output,
                  // @ts-ignore
                  confidence: update.partialResult?.confidenceScore || task.confidence
                };
              }
              return task;
            }));
          }

          // Update manuscript when available
          if (update.manuscript) {
            setManuscript(update.manuscript);
          }

          // On completion, store report and navigate
          if (update.status === "complete" && update.report) {
            setExecutionReport(update.report);
            setManuscript(update.report.manuscript);
            setConfidence(update.report.confidenceScore);
            setAssumptions(update.report.assumptions);
            
            // Store traces from all tasks
            const allTraces: Record<string, ReasoningTrace[]> = {};
            Object.values(update.report.tasks).forEach((result: SubagentResult) => {
              allTraces[result.taskId] = result.trace;
            });
            setTraces(allTraces);

            // Navigate to report after a short delay
            setTimeout(() => {
              if (isMounted.current) {
                navigate('/report', { state: { report: update.report } });
              }
            }, 2000);
          }
        }
      });
    } catch (err) {
      if (!isMounted.current) return;
      
      const errorMessage = err instanceof Error ? err.message : "Execution failed";
      
      // Check if it was aborted
      if (errorMessage.includes("cancelled") || errorMessage.includes("aborted")) {
        setError("Execution cancelled by user");
      } else {
        setError(errorMessage);
      }
      setStatus("error");
    }
  }, [question, taskGraph, navigate]);

  const handleCancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const handleNewQuery = () => {
    navigate("/");
  };

  const handleExport = () => {
    if (!executionReport) return;
    
    const markdown = formatManuscriptAsMarkdown(executionReport);
    navigator.clipboard.writeText(markdown);
    alert("Report copied to clipboard as Markdown!");
  };

  const handleInspectLogic = () => {
    if (selectedTaskId) {
      setIsTraceModalOpen(true);
    }
  };

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsSidebarOpen(false);
  };

  const handleRetry = () => {
    // Reset state and retry
    setTasks(prev => prev.map(t => ({ ...t, status: "PENDING", progress: 0, output: undefined })));
    setManuscript("");
    setConfidence(0);
    setAssumptions([]);
    setTraces({});
    setError(null);
    setProgress(0);
    startExecution();
  };

  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  // Show error display if there's an error
  if (error) {
    return (
      <div className="h-screen bg-paper flex flex-col overflow-hidden">
        <ExecutionHeader 
          runId={runId} 
          status={status}
          error={error}
          progress={progress}
          onNewQuery={handleNewQuery} 
          onExport={handleExport}
          onRetry={handleRetry}
        />
        <ErrorDisplay error={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-paper flex flex-col overflow-hidden">
      <ExecutionHeader 
        runId={runId} 
        status={status}
        progress={progress}
        onNewQuery={handleNewQuery} 
        onExport={handleExport}
        onRetry={handleRetry}
        onCancel={status !== "complete" && status !== "error" ? handleCancel : undefined}
      />
      
      <ProgressBar progress={progress} status={status} />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden absolute bottom-4 left-4 z-30 bg-ink text-paper p-3 rounded-full shadow-hard"
          aria-label="Open task list"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <TaskTreeSidebar
          tasks={tasks}
          selectedTaskId={selectedTaskId}
          onSelectTask={handleSelectTask}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          status={status}
        />
        
        <ManuscriptPanel
          manuscript={manuscript}
          confidence={confidence}
          assumptions={assumptions}
          onInspect={handleInspectLogic}
          question={question || "Untitled Research Query"}
          isLoading={status === "synthesizing" || status === "executing" || status === "decomposing" || status === "validating"}
          currentMessage={currentMessage}
        />
      </main>

      <TraceModal
        taskId={selectedTaskId}
        taskTitle={selectedTask?.title || ""}
        trace={selectedTaskId ? traces[selectedTaskId] || [] : []}
        isOpen={isTraceModalOpen}
        onClose={() => setIsTraceModalOpen(false)}
      />
    </div>
  );
}
