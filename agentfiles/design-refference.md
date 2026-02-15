# AXIOM-ONE: Design Reference & Component Mapping

**Purpose:** Translate stitch/ HTML mockups into React components with exact Tailwind classes.

**How to use this:** When building a component, find it in this doc, copy the structure, adapt the data binding.

---

## Color & Font Tokens

```tailwind
/* Tailwind Config Extension */
theme: {
  extend: {
    colors: {
      'paper': '#F9F8F4',
      'ink': '#111111',
      'surface': '#FFFFFF',
      'border-std': '#E5E5E5',
      'teal-success': '#0F766E',
      'error-red': '#B91C1C',
      'trace-blue': '#4F46E5',
      'muted': '#888888',
    },
    fontFamily: {
      'serif': ['Newsreader', 'serif'],
      'sans': ['Inter', 'sans-serif'],
      'mono': ['JetBrains Mono', 'monospace'],
    },
    boxShadow: {
      'hard': '4px 4px 0px rgba(0,0,0,0.1)',
    }
  }
}
```

---

## Screen 1: QueryInput.tsx (The Thesis Statement)

**Design Reference:** `stitch/the_thesis_statement_(input)_1/code.html`

**Layout Structure:**
```
<body> (full height, paper bg)
  ├─ System status indicators (top-left, top-right, bottom-left)
  ├─ <header> (80vh centered hero)
  │  └─ Centered content:
  │     ├─ H1 "AXIOM-ONE" (180px serif italic)
  │     ├─ Tagline (mono, caps, 12px)
  │     └─ Button "INITIALIZE_AUDIT"
  ├─ <section> (grid cards showcasing features)
  │  └─ Bento layout (3-column on desktop)
  │     ├─ Card: Adversarial Trace
  │     ├─ Card: Living Manuscripts
  │     └─ Card: Zero-Hallucination Protocol
  ├─ <section> (The Rational Path - 3 phase flow)
  │  └─ Horizontal flow:
  │     ├─ Phase 01: Thesis Formulation
  │     ├─ Arrow divider
  │     ├─ Phase 02: Adversarial Trace
  │     ├─ Arrow divider
  │     └─ Phase 03: Manuscript Synthesis
  └─ <footer>
```

### Component: QueryInputHero

```jsx
export function QueryInputHero({ onSubmit, isLoading, error }) {
  const [input, setInput] = useState("");

  return (
    <header className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-5xl w-full">
        {/* Title */}
        <h1 className="font-serif text-[120px] md:text-[180px] leading-[0.9] tracking-tighter mb-8 italic">
          AXIOM-ONE
        </h1>

        {/* Tagline */}
        <p className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase opacity-60 mb-12">
          // DECENTRALIZED_LOGIC // ABSOLUTE_TRACEABILITY
        </p>

        {/* Input Form */}
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(input);
        }} className="mb-12">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your research question..."
            className="w-full max-w-2xl px-6 py-4 bg-surface border border-border-std font-serif text-2xl text-ink placeholder:text-neutral-400 focus:outline-none focus:border-ink mb-6"
            minLength={20}
            maxLength={2000}
            rows={4}
          />

          {error && (
            <p className="text-error-red font-mono text-sm mb-6">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || input.length < 20}
            className="bg-ink text-paper px-10 py-5 font-mono text-sm font-bold tracking-widest flex items-center gap-4 mx-auto hover:bg-neutral-800 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "INITIALIZING..." : "INITIALIZE_AUDIT"}
            {!isLoading && (
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            )}
          </button>
        </form>
      </div>
    </header>
  );
}
```

### Component: FeatureCards

```jsx
export function FeatureCards() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: Adversarial Trace */}
        <div className="md:col-span-7 bg-surface border border-border-std p-6 shadow-hard flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-2">
              Protocol_01
            </span>
            <h3 className="font-serif text-3xl mb-4">Adversarial Trace</h3>
            <p className="font-sans text-neutral-600 max-w-md leading-relaxed">
              Expose the raw subagent logic and peer validation logs for radical transparency in every reasoning step.
            </p>
          </div>

          <div className="mt-8 bg-neutral-50 p-4 border border-border-std font-mono text-[11px] leading-relaxed">
            <div className="flex gap-2 text-trace-blue mb-1">
              <span>THOUGHT:</span>
              <span className="text-neutral-500">I need to verify the lithography supply chain timeline...</span>
            </div>
            <div className="flex gap-2 text-ink">
              <span className="opacity-40">&gt;</span>
              <span>search_tool("ASML 2026 production roadmap")</span>
            </div>
            <div className="flex gap-2 text-teal-success mt-1">
              <span>VALIDATE:</span>
              <span className="text-neutral-500">Source verified. Confidence p=0.98.</span>
            </div>
          </div>
        </div>

        {/* Card 2: Living Manuscripts */}
        <div className="md:col-span-5 bg-surface border border-border-std p-6 shadow-hard flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-2">
            Interface_02
          </span>
          <h3 className="font-serif text-3xl mb-4">Living Manuscripts</h3>
          <p className="font-sans text-neutral-600 leading-relaxed mb-6">
            Watch your research evolve as a dynamic paper with continuous synthesis.
          </p>
          <div className="flex-grow border-l border-neutral-200 pl-4 py-2 space-y-4">
            <div className="h-2 w-3/4 bg-neutral-200 animate-pulse"></div>
            <div className="h-2 w-full bg-neutral-100"></div>
            <div className="h-2 w-5/6 bg-neutral-100"></div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-4 bg-ink animate-pulse"></span>
              <span className="font-mono text-[10px] text-neutral-400">SYNTHESIZING...</span>
            </div>
          </div>
        </div>

        {/* Card 3: Zero-Hallucination Protocol */}
        <div className="md:col-span-12 bg-surface border border-border-std p-6 md:p-10 shadow-hard flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-success text-paper">
                <span className="material-symbols-outlined text-lg">check</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-teal-success">
                VERIFIED_LOGIC
              </span>
            </div>
            <h3 className="font-serif text-4xl mb-4">Zero-Hallucination Protocol</h3>
            <p className="font-sans text-neutral-600 text-lg leading-relaxed">
              A research-grade engine that prioritizes epistemic accuracy over conversational fluency, treating every query as an academic thesis.
            </p>
          </div>
          <div className="flex flex-col gap-2 font-mono text-[11px] w-full md:w-auto">
            <div className="border border-border-std p-3 bg-paper flex justify-between gap-12">
              <span className="text-neutral-400">CROSS_REF_COUNT</span>
              <span>1,240</span>
            </div>
            <div className="border border-border-std p-3 bg-paper flex justify-between gap-12">
              <span className="text-neutral-400">LOGICAL_CONSISTENCY</span>
              <span className="text-teal-success">99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Screen 2: ExecutionDashboard.tsx (The Living Document)

**Design Reference:** `stitch/the_living_document_(active)_1/code.html`

**Layout Structure:**
```
<body> (flex column, full height)
  ├─ <header> (h-14, sticky)
  │  ├─ Left: Logo + Title + RUN_ID + Status
  │  └─ Right: "New Query" | "Export Report" buttons
  ├─ <main> (flex-1, overflow hidden)
  │  ├─ <aside> (w-[320px], left sidebar)
  │  │  ├─ Sidebar header: "The Syllabus"
  │  │  └─ Task tree (scrollable)
  │  └─ <article> (flex-1, main content)
  │     ├─ Manuscript panel (prose)
  │     ├─ Assumptions block (bottom)
  │     └─ (Optional) Confidence badge (top-right)
  └─ <TraceModal> (right side, 50% width, overlay)
```

### Component: ExecutionHeader

```jsx
export function ExecutionHeader({ runId, status, onNewQuery, onExport }) {
  const isRunning = status !== "complete" && status !== "error";

  return (
    <header className="h-14 border-b border-border-std bg-surface flex items-center justify-between px-6 shrink-0 z-20">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="size-5 text-ink">
          <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </div>

        <h1 className="font-serif font-semibold text-lg tracking-tight">AXIOM-ONE</h1>

        <div className="h-4 w-px bg-neutral-200 mx-2"></div>

        {/* Run ID + Status */}
        <div className="font-mono text-xs text-neutral-500 flex items-center gap-3">
          <span>RUN_ID: {runId}</span>
          <span className="text-neutral-200">|</span>

          <span className="flex items-center gap-1.5" style={{
            color: isRunning ? '#4F46E5' : '#0F766E'
          }}>
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

      {/* Action Buttons */}
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
```

### Component: TaskTreeSidebar

```jsx
export function TaskTreeSidebar({ tasks, onSelectTask, selectedTaskId }) {
  return (
    <aside className="w-[320px] bg-surface border-r border-neutral-200 flex flex-col shrink-0 z-10">
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
  );
}

function TaskTreeItem({ task, isSelected, onClick }) {
  const statusColor = {
    PENDING: "bg-neutral-100",
    EXECUTING: "bg-trace-blue text-white",
    COMPLETE: "bg-teal-success text-white",
    FAILED: "bg-error-red text-white",
  }[task.status] || "bg-neutral-100";

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

      {task.status === "EXECUTING" || task.status === "COMPLETE" ? (
        <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-ink h-full transition-all"
            style={{ width: task.progress ? `${task.progress * 100}%` : "0%" }}
          />
        </div>
      ) : null}
    </button>
  );
}
```

### Component: ManuscriptPanel

```jsx
export function ManuscriptPanel({ manuscript, confidence, assumptions, onInspect }) {
  return (
    <article className="flex-1 flex flex-col overflow-hidden">
      {/* Header with Confidence */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-200 bg-surface shrink-0">
        <h2 className="font-serif text-3xl text-ink">Research Findings</h2>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-mono text-xs text-neutral-500">CONFIDENCE</div>
            <div className="font-mono text-2xl font-bold text-ink">
              {(confidence * 100).toFixed(1)}%
            </div>
          </div>
          <button
            onClick={onInspect}
            className="px-4 py-2 border border-border-std font-mono text-xs uppercase hover:bg-paper transition-colors"
          >
            Inspect Logic
          </button>
        </div>
      </div>

      {/* Manuscript Content */}
      <div className="flex-1 overflow-y-auto p-8 prose prose-sm max-w-none">
        <div
          dangerouslySetInnerHTML={{ __html: manuscript }}
          className="font-serif leading-relaxed text-ink"
        />
      </div>

      {/* Assumptions Section */}
      <div className="border-t border-neutral-200 bg-neutral-50 p-8 shrink-0">
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
    </article>
  );
}
```

---

## Screen 3: TraceModal.tsx (Adversarial Trace Inspection)

**Design Reference:** `stitch/the_adversarial_trace_(inspection)/code.html`

**Layout:** Slide-over modal taking 50% of width on desktop, full screen on mobile

### Component: TraceModal

```jsx
export function TraceModal({ taskId, trace, onClose, isOpen }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-1/2 md:w-full lg:w-1/2 bg-paper border-l border-ink shadow-hard-lg flex flex-col z-50">
        {/* Header */}
        <div className="shrink-0 p-6 border-b border-border-std bg-paper">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-trace-blue uppercase tracking-wide">
                  Trace_Mode::Active
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-trace-blue animate-pulse"></span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-ink leading-tight">
                Subagent ID: {taskId}
              </h2>
              <p className="font-sans text-sm text-muted mt-1">Task execution timeline</p>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 border border-border-std hover:bg-error-red hover:border-error-red hover:text-white transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {trace.map((entry, idx) => (
            <TraceEntry key={idx} entry={entry} />
          ))}
        </div>
      </div>
    </>
  );
}

function TraceEntry({ entry }) {
  const typeStyles = {
    THOUGHT: { label: "THOUGHT", bg: "bg-trace-blue/10", textColor: "text-trace-blue" },
    ACTION: { label: "ACTION", bg: "bg-neutral-100", textColor: "text-neutral-700" },
    VALIDATE: { label: "VALIDATE", bg: "bg-teal-success/10", textColor: "text-teal-success" },
    ERROR: { label: "ERROR", bg: "bg-error-red/10", textColor: "text-error-red" },
  }[entry.type];

  return (
    <div className="relative pl-6 border-l border-border-std group">
      <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-white border border-border-std rotate-45 group-hover:border-trace-blue transition-colors"></div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">[{entry.timestamp}]</span>
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
```

---

## Screen 4: ReportView.tsx (The Final Manuscript)

**Design Reference:** `stitch/the_final_manuscript_(report)/code.html`

**Simple structure:** Static, polished report view.

### Component: ReportView

```jsx
export function ReportView({ report, onExport, onNewQuery }) {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="border-b border-border-std bg-surface px-8 py-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-ink mb-1">{report.question}</h1>
            <p className="font-mono text-xs text-neutral-500">
              RUN_ID: {report.runId} | Generated {new Date(report.timestamp).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onExport}
              className="px-4 py-2 bg-ink text-paper font-mono text-xs font-bold hover:bg-neutral-800 transition-colors shadow-hard"
            >
              Export PDF
            </button>
            <button
              onClick={onNewQuery}
              className="px-4 py-2 border border-border-std font-mono text-xs font-bold hover:bg-paper transition-colors"
            >
              New Query
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        {/* Metadata Section */}
        <div className="grid grid-cols-3 gap-6 mb-12 pb-12 border-b border-border-std">
          <div>
            <span className="font-mono text-xs text-neutral-500 uppercase block mb-2">Confidence</span>
            <div className="font-serif text-4xl font-bold text-ink">
              {(report.confidenceScore * 100).toFixed(1)}%
            </div>
          </div>
          <div>
            <span className="font-mono text-xs text-neutral-500 uppercase block mb-2">Execution Time</span>
            <div className="font-serif text-4xl font-bold text-ink">
              {(report.executionTime / 1000).toFixed(1)}s
            </div>
          </div>
          <div>
            <span className="font-mono text-xs text-neutral-500 uppercase block mb-2">Tasks Completed</span>
            <div className="font-serif text-4xl font-bold text-ink">
              {Object.keys(report.tasks).length}
            </div>
          </div>
        </div>

        {/* Manuscript */}
        <article className="prose prose-lg max-w-none font-serif mb-12">
          <div dangerouslySetInnerHTML={{ __html: report.manuscript }} />
        </article>

        {/* Assumptions */}
        <section className="bg-neutral-50 border border-border-std p-8 mb-12">
          <h2 className="font-serif text-2xl text-ink mb-6">Key Assumptions</h2>
          <ul className="space-y-3">
            {report.assumptions.map((assumption, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-trace-blue font-bold">•</span>
                <span className="font-sans text-neutral-700">{assumption}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Task Details (Collapsible) */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-ink mb-6">Task Execution Summary</h2>
          <div className="space-y-4">
            {Object.entries(report.tasks).map(([taskId, result]) => (
              <details key={taskId} className="border border-border-std p-4 bg-surface group">
                <summary className="cursor-pointer flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-ink">{taskId}</span>
                  <span className="font-mono text-xs text-neutral-500">
                    Confidence: {(result.confidenceScore * 100).toFixed(0)}%
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-border-std">
                  <p className="font-sans text-sm text-neutral-700 mb-3">{result.output}</p>
                  <div className="text-xs text-neutral-600">
                    <p className="mb-2"><strong>Type:</strong> {result.sourceType}</p>
                    <p><strong>Assumptions:</strong> {result.assumptions.join(", ")}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-std bg-surface py-12 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-xs text-neutral-500">
            AXIOM-ONE | Research Execution Engine | v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
```

---

## Utility Classes (Apply Everywhere)

```tailwind
/* Typography */
.heading-hero {
  @apply font-serif text-[120px] md:text-[180px] leading-[0.9] tracking-tighter italic;
}

.heading-lg {
  @apply font-serif text-3xl md:text-4xl font-semibold text-ink;
}

.heading-md {
  @apply font-serif text-2xl text-ink;
}

.text-mono-sm {
  @apply font-mono text-xs tracking-widest uppercase text-neutral-500;
}

.text-muted {
  @apply font-sans text-sm text-neutral-600;
}

/* Cards & Containers */
.card-std {
  @apply bg-surface border border-border-std p-6 shadow-hard;
}

.card-soft {
  @apply bg-surface border border-border-std p-6;
}

/* Buttons */
.btn-primary {
  @apply bg-ink text-paper px-6 py-3 font-mono font-bold text-sm hover:bg-neutral-800 transition-colors shadow-hard;
}

.btn-secondary {
  @apply bg-surface text-ink border border-border-std px-6 py-3 font-mono font-bold text-sm hover:bg-paper transition-colors;
}

.btn-sm {
  @apply h-8 px-3 font-mono text-xs font-bold uppercase;
}

/* Status Badges */
.badge-pending {
  @apply bg-neutral-100 text-neutral-700;
}

.badge-executing {
  @apply bg-trace-blue text-white;
}

.badge-complete {
  @apply bg-teal-success text-white;
}

.badge-error {
  @apply bg-error-red text-white;
}
```

---

## Responsive Behavior

### Mobile (< 768px)
- Sidebar collapses to drawer (or hidden)
- Manuscript takes full width
- Trace modal is full-screen
- Hero text shrinks to 120px
- Cards stack vertically (1 column)

### Tablet (768px - 1024px)
- Sidebar 280px (narrower)
- Manuscript content adjusted
- Features grid becomes 2 columns
- Hero text 140px

### Desktop (> 1024px)
- Sidebar 320px (full spec)
- All layouts as designed
- Hero text 180px
- Trace modal 50% width

---

## Color Reference Map

```
Paper Theme (Light, Brutalist):
┌─────────────────────────────────┐
│ AXIOM-ONE Title                 │ ← ink (#111111) on paper (#F9F8F4)
├─────────────────────────────────┤
│ ✓ Status: COMPLETE              │ ← teal (#0F766E) text
│ ⚠ Warning: Low confidence       │ ← error red (#B91C1C)
│ → Action: Inspect Logic         │ ← trace blue (#4F46E5)
└─────────────────────────────────┘ ← border (#E5E5E5)
     ↓ shadow: 4px 4px 0px rgba(0,0,0,0.1)
```

---

## Gotchas (Things That Break Design)

❌ **Don't do:**
- Dark mode (this is light brutalist)
- Rounded corners (this is square, hard edges)
- Thick shadows (max 4px 4px)
- Non-serif headers (headers = Newsreader)
- Multiple fonts per component (pick one family)
- Serif body text (body = Inter sans)
- Blue accents (primary = ink black, accents = teal)

✅ **Do:**
- Hard shadows on cards
- Strict spacing (6, 8, 12, 16, 24, 32)
- All caps for labels
- Monospace for technical content
- Paper background everywhere
- Bordered containers (always border-std)
- Nested hierarchy (big serif titles, small mono labels)

---

**This guide is the source of truth for visual consistency. Use it.**