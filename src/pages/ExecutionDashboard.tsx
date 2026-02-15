import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Task, TaskGraph, SubagentResult, ReasoningTrace } from '../api/types';

// Generate a short run ID
function generateRunId(): string {
  return "0x" + Math.random().toString(16).slice(2, 6).toUpperCase();
}

// Status type
type ExecutionStatus = "idle" | "decomposing" | "executing" | "validating" | "synthesizing" | "complete" | "error";

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
  onNewQuery: () => void;
  onExport: () => void;
}

function ExecutionHeader({ runId, status, onNewQuery, onExport }: ExecutionHeaderProps) {
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
          <span className="flex items-center gap-1.5" style={{ color: isRunning ? '#4F46E5' : '#0F766E' }}>
            {isRunning && (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-trace-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-trace-blue"></span>
                </span>
                <span>STATUS: {status.toUpperCase()}</span>
              </>
            )}
            {!isRunning && <span>STATUS: {status.toUpperCase()}</span>}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onNewQuery}
          className="flex items-center justify-center h-8 px-4 bg-surface hover:bg-paper border border-neutral-200 text-ink text-xs font-bold font-mono tracking-wide uppercase transition-colors"
        >
          New Query
        </button>
        <button
          onClick={onExport}
          className="flex items-center justify-center h-8 px-4 bg-ink text-surface hover:bg-neutral-800 text-xs font-bold font-mono tracking-wide uppercase transition-colors shadow-hard"
        >
          Export Report
        </button>
      </div>
    </header>
  );
}

// Task Tree Item Component
interface TaskTreeItemProps {
  task: ExtendedTask;
  isSelected: boolean;
  onClick: () => void;
}

function TaskTreeItem({ task, isSelected, onClick }: TaskTreeItemProps) {
  const statusColor = {
    PENDING: "bg-neutral-100 text-neutral-700",
    EXECUTING: "bg-trace-blue text-white",
    COMPLETE: "bg-teal-success text-white",
    FAILED: "bg-error-red text-white",
  }[task.status];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 border border-neutral-200 transition-colors ${
        isSelected ? "bg-paper border-ink" : "hover:bg-paper"
      }`}
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
            className="bg-ink h-full transition-all duration-300"
            style={{ width: `${task.progress * 100}%` }}
          />
        </div>
      )}
    </button>
  );
}

// Task Tree Sidebar Component
interface TaskTreeSidebarProps {
  tasks: ExtendedTask[];
  selectedTaskId: string | null;
  onSelectTask: (taskId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

function TaskTreeSidebar({ tasks, selectedTaskId, onSelectTask, isOpen, onClose }: TaskTreeSidebarProps) {
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
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {tasks.map((task) => (
              <TaskTreeItem
                key={task.id}
                task={task}
                isSelected={selectedTaskId === task.id}
                onClick={() => onSelectTask(task.id)}
              />
            ))}
          </div>
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
}

function ManuscriptPanel({ manuscript, confidence, assumptions, onInspect, question }: ManuscriptPanelProps) {
  return (
    <article className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 border-b border-neutral-200 bg-surface shrink-0">
        <h2 className="font-serif text-xl md:text-3xl text-ink truncate pr-4">{question}</h2>
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
          {manuscript ? (
            <div 
              className="font-serif leading-relaxed text-ink prose prose-sm"
              dangerouslySetInnerHTML={{ __html: manuscript }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400">
              <div className="w-16 h-16 border-2 border-neutral-200 border-t-ink rounded-full animate-spin mb-4"></div>
              <p className="font-mono text-sm">SYNTHESIZING MANUSCRIPT...</p>
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

// Mock task generation for demo
function generateMockTasks(): ExtendedTask[] {
  return [
    {
      id: "T1",
      title: "Define Core Concepts",
      description: "Identify and define key terminology and foundational concepts",
      dependencies: [],
      priority: "high",
      estimatedTokens: 2000,
      status: "COMPLETE",
      progress: 1,
      output: "Core concepts defined: Supply chain resilience, Critical materials, Geopolitical dependencies",
      confidence: 0.94
    },
    {
      id: "T2",
      title: "Analyze Historical Data",
      description: "Review past supply chain disruptions and their impacts",
      dependencies: ["T1"],
      priority: "high",
      estimatedTokens: 3000,
      status: "COMPLETE",
      progress: 1,
      output: "Historical analysis complete: 2011 tsunami, 2020 pandemic, 2022 chip shortage",
      confidence: 0.91
    },
    {
      id: "T3",
      title: "Evaluate Current Constraints",
      description: "Assess present-day supply chain vulnerabilities",
      dependencies: ["T1", "T2"],
      priority: "high",
      estimatedTokens: 2500,
      status: "EXECUTING",
      progress: 0.65,
    },
    {
      id: "T4",
      title: "Project Future Scenarios",
      description: "Model potential outcomes based on current trends",
      dependencies: ["T3"],
      priority: "medium",
      estimatedTokens: 3500,
      status: "PENDING",
      progress: 0,
    },
    {
      id: "T5",
      title: "Synthesize Recommendations",
      description: "Formulate actionable insights and strategic recommendations",
      dependencies: ["T3", "T4"],
      priority: "high",
      estimatedTokens: 2000,
      status: "PENDING",
      progress: 0,
    },
  ];
}

// Mock trace generation
function generateMockTrace(taskId: string): ReasoningTrace[] {
  return [
    {
      timestamp: new Date(Date.now() - 30000).toISOString(),
      type: "THOUGHT",
      content: `Beginning analysis for ${taskId}: Initializing context window with task parameters and dependency results.`
    },
    {
      timestamp: new Date(Date.now() - 25000).toISOString(),
      type: "ACTION",
      content: "Searching knowledge base for relevant precedents and data sources..."
    },
    {
      timestamp: new Date(Date.now() - 20000).toISOString(),
      type: "THOUGHT",
      content: "Identified 3 primary sources with high relevance. Proceeding to cross-reference findings."
    },
    {
      timestamp: new Date(Date.now() - 15000).toISOString(),
      type: "VALIDATE",
      content: "Source credibility check: PASS. All sources peer-reviewed or from authoritative institutions."
    },
    {
      timestamp: new Date(Date.now() - 10000).toISOString(),
      type: "ACTION",
      content: "Synthesizing findings into structured output format..."
    },
    {
      timestamp: new Date(Date.now() - 5000).toISOString(),
      type: "VALIDATE",
      content: "Confidence assessment: p=0.94. Assumptions clearly documented."
    }
  ];
}

// Main ExecutionDashboard Component
export default function ExecutionDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const question = (location.state as { question?: string } | null)?.question || "Untitled Research Query";

  // State
  const [runId] = useState(generateRunId());
  const [status, setStatus] = useState<ExecutionStatus>("idle");
  const [tasks, setTasks] = useState<ExtendedTask[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [manuscript, setManuscript] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [assumptions, setAssumptions] = useState<string[]>([]);
  const [traces, setTraces] = useState<Record<string, ReasoningTrace[]>>({});
  const [isTraceModalOpen, setIsTraceModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize with mock data for demo
  useEffect(() => {
    setStatus("decomposing");
    
    // Simulate decomposition
    setTimeout(() => {
      const mockTasks = generateMockTasks();
      setTasks(mockTasks);
      setStatus("executing");
      
      // Generate mock traces for completed tasks
      const mockTraces: Record<string, ReasoningTrace[]> = {};
      mockTasks.forEach(task => {
        if (task.status === "COMPLETE") {
          mockTraces[task.id] = generateMockTrace(task.id);
        }
      });
      setTraces(mockTraces);

      // Select first task by default
      if (mockTasks.length > 0) {
        setSelectedTaskId(mockTasks[0].id);
      }

      // Simulate progress
      setTimeout(() => {
        setStatus("validating");
        setTimeout(() => {
          setStatus("synthesizing");
          setConfidence(0.923);
          setAssumptions([
            "Historical supply chain disruption patterns remain relevant for future predictions",
            "Geopolitical tensions will continue to impact material sourcing",
            "Technology adoption rates follow previously observed S-curves"
          ]);
          setManuscript(`
            <h1>Supply Chain Analysis: Strategic Overview</h1>
            <p>Based on comprehensive analysis of historical data and current market conditions, this report examines critical vulnerabilities in global supply chains with particular emphasis on technology sector dependencies.</p>
            
            <h2>Key Findings</h2>
            <p>Our analysis reveals three primary vulnerability clusters: geographic concentration of manufacturing (p=0.94), single-source dependencies for critical components (p=0.91), and insufficient inventory buffers (p=0.87). These findings align with established risk management frameworks while highlighting emerging challenges unique to the current geopolitical landscape.</p>
            
            <h2>Historical Context</h2>
            <p>The 2011 tsunami in Japan demonstrated how localized events cascade through global supply networks. Similarly, the 2020 pandemic exposed fragility in just-in-time manufacturing systems. Current data suggests these vulnerabilities persist despite industry acknowledgment.</p>
            
            <h2>Recommendations</h2>
            <p>Diversification of supplier networks remains the most effective mitigation strategy, though implementation costs must be weighed against risk reduction benefits. Organizations should prioritize multi-sourcing for components with extended lead times and limited alternative suppliers.</p>
          `);
          setTimeout(() => {
            setStatus("complete");
          }, 1500);
        }, 2000);
      }, 3000);
    }, 1500);
  }, []);

  const handleNewQuery = () => {
    navigate("/");
  };

  const handleExport = () => {
    const reportData = {
      runId,
      question,
      manuscript,
      confidence,
      assumptions,
      tasks,
      timestamp: new Date().toISOString()
    };
    navigator.clipboard.writeText(JSON.stringify(reportData, null, 2));
    alert("Report copied to clipboard!");
  };

  const handleInspectLogic = () => {
    if (selectedTaskId) {
      setIsTraceModalOpen(true);
    }
  };

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    // Close sidebar on mobile after selection
    setIsSidebarOpen(false);
  };

  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  return (
    <div className="h-screen bg-paper flex flex-col overflow-hidden">
      <ExecutionHeader 
        runId={runId} 
        status={status} 
        onNewQuery={handleNewQuery} 
        onExport={handleExport} 
      />
      
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
        />
        
        <ManuscriptPanel
          manuscript={manuscript}
          confidence={confidence}
          assumptions={assumptions}
          onInspect={handleInspectLogic}
          question={question}
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
