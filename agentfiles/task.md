# AXIOM-ONE: Development Task Breakdown

**Status:** Ready for execution  
**Build Window:** 16–24 hours (focused)  
**Target:** Functional research engine (MVP, not marketing site)  

---

## Context: The Gap

Your current repo:
- ✅ React + Vite scaffold (fast rebuild)
- ✅ Design system defined (stitch/ folder)
- ❌ **No task decomposition logic**
- ❌ **No subagent execution pipeline**
- ❌ **No validation/reasoning UI**
- ❌ **Landing page instead of research interface**

**Critical Truth:** A marketing site is not AXIOM-ONE. You're shipping a *thinking engine*, not vibes.

---

## Phase 1: Scaffold the Core UI (2–3 hours)

### 1.1 Delete or Archive Current Landing Page

**Action:**
- Rename `src/LandingPage.tsx` → `src/pages/archived/LandingPage.backup.tsx`
- Replace `src/App.tsx` with a router that loads the research interface
- Create: `src/pages/QueryInput.tsx`, `src/pages/ExecutionDashboard.tsx`, `src/pages/ReportView.tsx`

**Why:** The landing page is marketing. AXIOM-ONE is an execution engine. These are mutually exclusive.

### 1.2 Create QueryInput.tsx (The Thesis Statement Page)

**File:** `src/pages/QueryInput.tsx`

**Design Reference:** `stitch/the_thesis_statement_(input)_1/code.html`

**Requirements:**
- Full-height centered hero section
- Large serif title "AXIOM-ONE" (180px italic)
- Monospace tagline: "// DECENTRALIZED_LOGIC // ABSOLUTE_TRACEABILITY"
- Single textarea input: "Enter your research question"
- Big button: "INITIALIZE_AUDIT" → triggers task decomposition
- Color scheme: paper (#F9F8F4), ink (#111111), teal success (#0F766E)
- Custom fonts: Newsreader (serif), Inter (sans), JetBrains Mono (mono)

**Acceptance Criteria:**
- Input field captures user research question (min 20 chars, max 2000)
- Form submission wired to backend `/api/decompose` endpoint
- Loading state shows spinner + "INITIALIZING_AUDIT..."
- Error states display in red (#B91C1C)
- On success: route to ExecutionDashboard with decomposition results

**Code Quality:**
- Use Tailwind core utilities only (no custom CSS)
- Proper TypeScript types
- No external component libraries (use HTML + Tailwind)
- Accessibility: ARIA labels, keyboard navigation

---

### 1.3 Create ExecutionDashboard.tsx (The Living Document Page)

**File:** `src/pages/ExecutionDashboard.tsx`

**Design Reference:** `stitch/the_living_document_(active)_1/code.html`

**Layout:**
```
[Header: AXIOM-ONE | RUN_ID | STATUS]
├─ Left Sidebar (320px): Task Tree
├─ Main (Rest): Task Outputs + Manuscript Draft
└─ Optional Right Panel: Adversarial Trace (Modal)
```

**Components:**

#### 1.3.1 Header
- Logo + "AXIOM-ONE"
- RUN_ID (generated UUID, shortened to 0x????)
- Status badge: "SYNTHESIZING" (pulsing blue) / "COMPLETE" (teal)
- Buttons: "New Query" | "Export Report"

#### 1.3.2 Sidebar: Task Tree
- Title: "The Syllabus"
- Subtitle: "Hierarchical Task Decomposition"
- Renders tasks from decomposition output (JSON)
  - Task ID (T1, T2, T3...)
  - Title (e.g., "Define Core Concepts")
  - Status indicator: PENDING | EXECUTING | COMPLETE | FAILED
  - Progress bar
- Click task → expand details, show subagent output
- Collapsible tree structure (parent → subtasks)

#### 1.3.3 Main Panel: Manuscript Draft
- Live rendering of synthesis output
- Header: "Gallium Oxide Supply Chains" (or user's query)
- Content updates in real-time as subagents complete
- Styled as academic paper (serif headers, justified paragraphs)
- Reasoning footnotes appear as [1], [2], [3] (hover → show trace)
- Assumptions block at bottom (explicit, bulleted)
- Confidence score at top-right: "Confidence: 94.2%"

#### 1.3.4 Right Modal: Adversarial Trace (Collapsed by Default)
- Click "Inspect Logic" → slide-over opens on right (50% width)
- Shows raw subagent reasoning chain
- Timeline log: [14:02:01.050] THOUGHT | ACTION | VALIDATE
- Color-coded: THOUGHT (blue) | ACTION (gray) | VALIDATE (teal) | ERROR (red)
- Copy button, close button
- Scrollable, monospace font

**Data Flow:**
```
useState({
  runId: "0x829",
  status: "EXECUTING",
  tasks: [
    { id: "T1", title: "...", status: "COMPLETE", output: {}, confidence: 0.95 },
    { id: "T2", title: "...", status: "EXECUTING", output: {}, confidence: null },
  ],
  manuscript: "Live HTML/Markdown",
  traces: { "T1": [...], "T2": [...] }
})
```

**Acceptance Criteria:**
- Renders task tree correctly from JSON
- Manuscript updates live (use WebSocket or polling)
- Click task → sidebar expands with details
- Adversarial trace modal opens/closes
- Confidence scores display correctly
- Responsive: sidebar collapses on mobile

---

### 1.4 Create ReportView.tsx (The Final Manuscript Page)

**File:** `src/pages/ReportView.tsx`

**Design Reference:** `stitch/the_final_manuscript_(report)/code.html`

**Requirements:**
- Static, polished report view (read-only)
- Full manuscript with resolved references
- Assumptions section
- Confidence metadata
- Export buttons: PDF, Markdown, JSON
- Navigation: back to dashboard or new query

**Minimal MVP:** Just display the final output. Export to PDF via library (pdfkit or similar).

---

## Phase 2: Backend Task Decomposition (2–3 hours)

### 2.1 Refactor API Structure

**Current:** `api/gemini.ts` (monolithic)

**Target:**
```
api/
├── decompose.ts       (Task decomposer)
├── execute-subagent.ts (Subagent executor)
├── validate.ts        (Reasoning validator)
├── synthesize.ts      (Final synthesis)
└── types.ts           (Shared schemas)
```

**Technology:**
- Keep Gemini API (you have keys)
- Use Gemini 2.0 Flash Thinking for reasoning
- Structured outputs (JSON schema validation)

---

### 2.2 Implement `api/types.ts`

**Define these TypeScript types:**

```typescript
// Input
interface ResearchQuery {
  question: string;
  context?: string;
}

// Task Decomposition Output
interface TaskGraph {
  runId: string;
  rootQuestion: string;
  tasks: Task[];
  estimatedSteps: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  dependencies: string[]; // e.g., ["T1", "T2"]
  priority: "high" | "medium" | "low";
  estimatedTokens: number;
}

// Subagent Execution Output
interface SubagentResult {
  taskId: string;
  output: string; // Final distilled result
  assumptions: string[];
  confidenceScore: number; // 0.0–1.0
  sourceType: "factual" | "inferred" | "reasoned";
  executionTime: number; // ms
  trace: ReasoningTrace[];
}

// Reasoning Trace
interface ReasoningTrace {
  timestamp: string;
  type: "THOUGHT" | "ACTION" | "VALIDATE" | "ERROR";
  content: string;
}

// Validation Output
interface ValidationResult {
  taskId: string;
  isValid: boolean;
  flags: ValidationFlag[];
  confidenceDowngrade?: number; // e.g., 0.95 → 0.87
}

interface ValidationFlag {
  severity: "warning" | "error" | "critical";
  message: string;
  suggestion?: string;
}

// Final Synthesis
interface ResearchReport {
  runId: string;
  question: string;
  manuscript: string; // Markdown/HTML
  assumptions: string[];
  confidenceScore: number;
  sources: SourceReference[];
  executionTime: number;
  tasks: {
    [taskId: string]: SubagentResult;
  };
  validationResults: ValidationResult[];
}
```

---

### 2.3 Implement `api/decompose.ts`

**Endpoint:** `POST /api/decompose`

**Input:**
```json
{
  "question": "Analyze the impact of lithium supply constraints on EV adoption by 2030."
}
```

**Implementation:**

```typescript
export async function decompose(query: ResearchQuery): Promise<TaskGraph> {
  const prompt = `
    You are a research decomposition expert. Given this research question:
    
    "${query.question}"
    
    Break it into 4-7 atomic tasks. For each task:
    1. Define a clear objective (1 sentence)
    2. List hard dependencies (other tasks that must complete first)
    3. Estimate token budget needed
    
    Respond ONLY as valid JSON (no preamble):
    {
      "tasks": [
        {
          "id": "T1",
          "title": "Define Core Concepts",
          "description": "...",
          "dependencies": [],
          "priority": "high",
          "estimatedTokens": 2000
        }
      ]
    }
  `;

  const response = await geminiCall({
    model: "gemini-2.0-flash-thinking-exp-01-21",
    systemPrompt: "You are a research strategist. Your output is ONLY valid JSON.",
    userPrompt: prompt,
    temperature: 0,
    maxTokens: 4000,
  });

  const taskGraph = JSON.parse(response);
  
  // Validate structure
  if (!Array.isArray(taskGraph.tasks)) {
    throw new Error("Decomposition failed: no tasks returned");
  }

  return {
    runId: generateRunId(),
    rootQuestion: query.question,
    tasks: taskGraph.tasks,
    estimatedSteps: taskGraph.tasks.length,
  };
}
```

**Error Handling:**
- If response is not valid JSON → retry 2x
- If no tasks returned → throw error
- If circular dependencies detected → throw error

**Response:** Return `TaskGraph` + HTTP 200

**Acceptance Criteria:**
- Takes research question
- Returns 4-7 tasks (JSON)
- Each task has id, title, description, dependencies, priority
- No circular dependencies
- Deterministic (same input → same output structure, may vary details)

---

### 2.4 Implement `api/execute-subagent.ts`

**Endpoint:** `POST /api/execute-subagent`

**Input:**
```json
{
  "runId": "0x829",
  "taskId": "T1",
  "taskDescription": "Analyze lithium supply constraints",
  "context": "Global EV market context...",
  "tokenBudget": 8000
}
```

**Implementation:**

```typescript
export async function executeSubagent(
  taskId: string,
  description: string,
  context: string,
  tokenBudget: number
): Promise<SubagentResult> {
  const prompt = `
    You are a research agent. Execute this task with rigor.
    
    TASK: ${description}
    CONTEXT: ${context}
    TOKEN_BUDGET: ${tokenBudget}
    
    Your output MUST include:
    1. Final distilled answer (clear, short, sourced)
    2. Assumptions you made
    3. Confidence (0.0–1.0) in your answer
    
    Be honest about uncertainty. If unsure, say so.
    
    Respond as JSON:
    {
      "output": "...",
      "assumptions": ["...", "..."],
      "confidence": 0.87,
      "sourceType": "factual|inferred|reasoned"
    }
  `;

  const startTime = Date.now();
  
  const response = await geminiCall({
    model: "gemini-2.0-flash-thinking-exp-01-21",
    systemPrompt: "You are a diligent research agent. Answer thoroughly.",
    userPrompt: prompt,
    temperature: 0.3, // Low temp for consistency
    maxTokens: tokenBudget,
    returnThinkingProcess: true, // Get reasoning trace
  });

  const parsed = JSON.parse(response.text);
  const traces = parseThinkingProcess(response.thinking);

  return {
    taskId,
    output: parsed.output,
    assumptions: parsed.assumptions,
    confidenceScore: parsed.confidence,
    sourceType: parsed.sourceType,
    executionTime: Date.now() - startTime,
    trace: traces,
  };
}
```

**Key Detail:** 
- Use Gemini's extended thinking to get reasoning traces
- Parse `response.thinking` into timeline entries
- Return both final output AND reasoning chain

**Acceptance Criteria:**
- Executes task in isolation (fresh context window)
- Returns structured SubagentResult
- Includes assumptions and confidence
- Captures reasoning trace
- Timeout after `tokenBudget` reached

---

### 2.5 Implement `api/validate.ts`

**Endpoint:** `POST /api/validate`

**Input:**
```json
{
  "results": [
    { "taskId": "T1", "output": "...", "confidence": 0.95 },
    { "taskId": "T2", "output": "...", "confidence": 0.87 }
  ],
  "rootQuestion": "..."
}
```

**Implementation:**

```typescript
export async function validate(
  results: SubagentResult[],
  rootQuestion: string
): Promise<ValidationResult[]> {
  const prompt = `
    You are a hostile peer reviewer. Assume the following outputs are WRONG unless proven otherwise.
    
    ROOT QUESTION: ${rootQuestion}
    
    RESULTS TO VALIDATE:
    ${JSON.stringify(results, null, 2)}
    
    For EACH result, identify:
    1. Unsupported claims
    2. Circular logic
    3. Overconfident language
    4. Missing assumptions
    5. Contradictions with other results
    
    Respond as JSON array:
    [
      {
        "taskId": "T1",
        "isValid": false,
        "flags": [
          {
            "severity": "error",
            "message": "Source citation missing for claim about lithium deposits",
            "suggestion": "Add explicit source verification"
          }
        ],
        "confidenceDowngrade": 0.08
      }
    ]
  `;

  const response = await geminiCall({
    model: "gemini-2.0-flash-thinking-exp-01-21",
    systemPrompt: "You are a critical logic validator. Find flaws relentlessly.",
    userPrompt: prompt,
    temperature: 0.2,
    maxTokens: 3000,
  });

  return JSON.parse(response);
}
```

**Logic:**
- Cross-check for contradictions
- Flag overconfident language
- Downgrade confidence scores if issues found
- Return list of ValidationResults

**Acceptance Criteria:**
- Identifies logical flaws
- Flags unsupported claims
- Suggests corrections
- Outputs structured validation array

---

### 2.6 Implement `api/synthesize.ts`

**Endpoint:** `POST /api/synthesize`

**Input:**
```json
{
  "runId": "0x829",
  "rootQuestion": "...",
  "validatedResults": [{ "taskId": "T1", "output": "...", "confidence": 0.93 }],
  "taskGraph": { "tasks": [...] }
}
```

**Implementation:**

```typescript
export async function synthesize(
  runId: string,
  rootQuestion: string,
  validatedResults: SubagentResult[],
  taskGraph: TaskGraph
): Promise<ResearchReport> {
  const prompt = `
    You are writing an academic research report.
    
    QUESTION: ${rootQuestion}
    
    VALIDATED FINDINGS:
    ${JSON.stringify(validatedResults, null, 2)}
    
    Write a structured manuscript that:
    1. Answers the question directly
    2. Incorporates findings with confidence levels
    3. Lists all assumptions
    4. Marks sources with [1], [2], [3] etc.
    5. Includes "What Could Be Wrong" section
    
    Use Markdown. Be concise but complete.
    
    Respond as JSON:
    {
      "manuscript": "# Title\n\n...",
      "assumptions": ["...", "..."],
      "overallConfidence": 0.89
    }
  `;

  const response = await geminiCall({
    model: "gemini-2.0-flash-thinking-exp-01-21",
    userPrompt: prompt,
    temperature: 0.3,
    maxTokens: 4000,
  });

  const parsed = JSON.parse(response);

  return {
    runId,
    question: rootQuestion,
    manuscript: parsed.manuscript,
    assumptions: parsed.assumptions,
    confidenceScore: parsed.overallConfidence,
    sources: extractSourceReferences(parsed.manuscript),
    executionTime: 0, // Track actual time in orchestrator
    tasks: {}, // Populated by orchestrator
    validationResults: [],
  };
}
```

**Acceptance Criteria:**
- Merges validated results into cohesive output
- Explicit assumptions section
- Confidence score visible
- Manuscript is polished, readable
- Sources tracked

---

## Phase 3: Wire Backend to Frontend (2 hours)

### 3.1 Create Main Orchestrator: `src/api/orchestrator.ts`

**This is the engine.** It calls all backend functions in sequence.

```typescript
export async function runResearchExecution(
  question: string,
  onProgress: (update: ExecutionUpdate) => void
): Promise<ResearchReport> {
  
  // Step 1: Decompose
  onProgress({ status: "decomposing", progress: 0.1 });
  const taskGraph = await decompose({ question });
  
  // Step 2: Execute subagents (parallel where possible)
  onProgress({ status: "executing", progress: 0.2, taskGraph });
  const subagentResults = await Promise.all(
    taskGraph.tasks.map(task =>
      executeSubagent(task.id, task.description, question, task.estimatedTokens)
    )
  );
  
  // Step 3: Validate
  onProgress({ status: "validating", progress: 0.7 });
  const validationResults = await validate(subagentResults, question);
  
  // Step 4: Synthesize
  onProgress({ status: "synthesizing", progress: 0.9 });
  const report = await synthesize(
    taskGraph.runId,
    question,
    subagentResults,
    taskGraph
  );
  
  onProgress({ status: "complete", progress: 1.0, report });
  return report;
}
```

### 3.2 Connect QueryInput → ExecutionDashboard

In `QueryInput.tsx`:

```typescript
const handleSubmit = async (question: string) => {
  setLoading(true);
  
  try {
    const results = await fetch("/api/decompose", {
      method: "POST",
      body: JSON.stringify({ question }),
    }).then(r => r.json());
    
    navigate("/dashboard", { state: { taskGraph: results } });
  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};
```

### 3.3 Connect ExecutionDashboard → Orchestrator

In `ExecutionDashboard.tsx`:

```typescript
useEffect(() => {
  runResearchExecution(question, (update) => {
    setRunState(prev => ({
      ...prev,
      status: update.status,
      progress: update.progress,
      taskGraph: update.taskGraph || prev.taskGraph,
      manuscript: update.report?.manuscript || prev.manuscript,
    }));
  });
}, [question]);
```

---

## Phase 4: Frontend Polish (1–2 hours)

### 4.1 Styling & Design System

**Constraints:**
- Paper theme: bg #F9F8F4, text #111111
- Teal accent: #0F766E (success, validation)
- Red error: #B91C1C
- Fonts: Newsreader (serif), Inter (sans), JetBrains Mono (mono)
- Shadows: `4px 4px 0px rgba(0,0,0,0.1)` (hard shadow)
- Border: `1px solid #E5E5E5`

**Apply globally in `index.css`:**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&display=swap');

:root {
  --color-paper: #F9F8F4;
  --color-ink: #111111;
  --color-surface: #FFFFFF;
  --color-teal: #0F766E;
  --color-error: #B91C1C;
  --font-serif: 'Newsreader', serif;
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --shadow-hard: 4px 4px 0px rgba(0,0,0,0.1);
  --border: 1px solid #E5E5E5;
}

body {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
}
```

### 4.2 Responsive Layout

- Sidebar collapses to drawer on mobile
- Manuscript takes full width on small screens
- Trace modal fixed on desktop, full-screen on mobile

---

## Phase 5: Testing & Cleanup (1 hour)

### 5.1 Manual Testing Checklist

- [ ] Submit query → task decomposition works
- [ ] Task tree renders correctly
- [ ] Subagent execution shows progress
- [ ] Confidence scores display
- [ ] Adversarial trace modal opens/closes
- [ ] Final report is readable
- [ ] Export buttons work (or stub out)
- [ ] No console errors
- [ ] Responsive on mobile

### 5.2 Error Paths

- [ ] Empty input → validation error
- [ ] API timeout → show "Request failed, retry?"
- [ ] Circular dependency in tasks → graceful failure message
- [ ] Decomposition returns invalid JSON → retry 2x, then error

---

## Non-Negotiable Rules

1. **No localStorage.** Use React state only.
2. **No custom CSS in components.** Tailwind only.
3. **Strict typing.** TypeScript everywhere.
4. **No console logs in production.** Debug mode only.
5. **No libraries beyond what's installed.** (React, React Router, Tailwind, axios/fetch)
6. **Assumption traceability.** Every claim must show its source confidence.
7. **Token budgets enforced.** Subagents respect their budget or fail loudly.
8. **Reasoning is first-class.** Traces are stored and inspectable, not discarded.

---

## Gotchas & Edge Cases

### Problem: Gemini API returns non-JSON
**Solution:** Parse attempts fail → retry with stricter prompt → if 2 retries fail, return error to user with raw response for debugging.

### Problem: Task dependencies form a cycle
**Solution:** Detect in decompose phase. Reject. Return error.

### Problem: Subagent confidence is too low (< 0.6)
**Solution:** Flag in validation. Downgrade overall confidence. Surface in report: "This finding is uncertain (p=0.52). See assumptions."

### Problem: Manuscripts grow too large
**Solution:** Limit to 5,000 tokens. Truncate gracefully. Offer full version as download.

### Problem: "SYNTHESIZING..." takes 30+ seconds
**Solution:** Add time estimates to UI. Show step (1/4 tasks, 2/4 tasks, 3/4, ...). Timeout after 5 min, surface partial results.

---

## Build Order (Linear, No Parallelization)

1. **Types** (15 min) — Define all interfaces
2. **QueryInput** (30 min) — UI component
3. **ExecutionDashboard** (60 min) — Main interface
4. **Decompose endpoint** (30 min) — Backend
5. **Subagent executor** (30 min) — Backend
6. **Validate endpoint** (30 min) — Backend
7. **Synthesize endpoint** (30 min) — Backend
8. **Orchestrator** (30 min) — Glue layer
9. **Wiring & state sync** (30 min) — Connect frontend + backend
10. **Styling & polish** (60 min) — Design system enforcement
11. **Testing & error paths** (60 min) — Robustness

**Total:** ~6–7 hours of focused coding.

---

## Success Criteria (MVP Lock)

✅ User enters research question  
✅ System decomposes into tasks (JSON visible)  
✅ Subagents execute tasks in sequence or parallel  
✅ Validation layer flags logical flaws  
✅ Synthesis produces readable manuscript  
✅ Confidence scores displayed throughout  
✅ Assumptions explicit  
✅ Reasoning traces inspectable  
✅ Zero hallucinations without cross-checks  
✅ Report exportable (or clipboard copy)  

**Do NOT ship:**
- Multi-user collaboration
- Long-term memory
- Self-improving loops
- Complex file uploads
- Streaming (batch only)

---

## Useful Code Snippets

### Generate Run ID
```typescript
function generateRunId(): string {
  return "0x" + Math.random().toString(16).slice(2, 6).toUpperCase();
}
```

### Parse Gemini Thinking
```typescript
function parseThinkingProcess(thinking: string): ReasoningTrace[] {
  const lines = thinking.split('\n');
  return lines.map((line, i) => ({
    timestamp: new Date().toISOString(),
    type: detectType(line),
    content: line.trim(),
  }));
}
```

### Validate JSON Response
```typescript
function parseJSON(text: string, retries = 0): object {
  try {
    return JSON.parse(text);
  } catch {
    if (retries < 2) {
      return parseJSON(text.replace(/[\n\r]/g, ''), retries + 1);
    }
    throw new Error("Failed to parse response as JSON");
  }
}
```

---

**Lock this document. This is the execution blueprint.**