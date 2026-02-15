# AXIOM-ONE: Build Sprint Checklist (24-Hour Lock-In)

**You have three companion documents:**
1. **TASK.md** — Detailed technical breakdown (how to build each piece)
2. **PRODUCTION_PLAN.md** — Strategic context + Claude Code prompt
3. **DESIGN_REFERENCE.md** — Component specs + Tailwind patterns

**This document:** Quick checklist + git workflow.

---

## Pre-Build (Now)

- [ ] Read TASK.md completely (understand the plan)
- [ ] Read PRODUCTION_PLAN.md (understand the why)
- [ ] Skim DESIGN_REFERENCE.md (visual reference)
- [ ] Navigate to your AXiOM repo
- [ ] Create a feature branch: `git checkout -b feature/core-engine`
- [ ] Ensure Gemini API keys are configured in `.env`

---

## Phase 1: Types & Scaffold (45 min)

### Create Core Types
- [ ] Create `src/api/types.ts` with all interfaces from TASK.md section 2.2
  - ResearchQuery, TaskGraph, Task
  - SubagentResult, ReasoningTrace
  - ValidationResult, ResearchReport
  - Validation flags, source references

**Commit:** `git commit -m "Phase 1: Core type definitions"`

### Scaffold UI Routes
- [ ] Create `src/pages/QueryInput.tsx` (empty/stub)
- [ ] Create `src/pages/ExecutionDashboard.tsx` (empty/stub)
- [ ] Create `src/pages/ReportView.tsx` (empty/stub)
- [ ] Update `src/App.tsx` with React Router:
  ```tsx
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<QueryInput />} />
      <Route path="/dashboard" element={<ExecutionDashboard />} />
      <Route path="/report" element={<ReportView />} />
    </Routes>
  </BrowserRouter>
  ```

**Commit:** `git commit -m "Phase 1: Route scaffolding"`

### Archive Old Landing Page
- [ ] Move `src/LandingPage.tsx` to `src/pages/archived/LandingPage.backup.tsx`
- [ ] Delete landing page imports from old App.tsx

**Commit:** `git commit -m "Phase 1: Archive marketing landing page"`

---

## Phase 2: Build QueryInput UI (60 min)

### Component Structure (from DESIGN_REFERENCE.md)
- [ ] Implement `QueryInputHero` component
  - Full-height hero section
  - Large serif "AXIOM-ONE" title
  - Monospace tagline
  - Research question textarea input
  - "INITIALIZE_AUDIT" button

- [ ] Implement `FeatureCards` component
  - 3 feature cards (bento layout)
  - Adversarial Trace
  - Living Manuscripts
  - Zero-Hallucination Protocol

- [ ] Implement phase flow section
  - 3-phase process visualization
  - Thesis → Adversarial → Synthesis

### Styling Checklist
- [ ] Paper theme colors applied (#F9F8F4 bg, #111111 text)
- [ ] All fonts loaded (Newsreader, Inter, JetBrains Mono)
- [ ] Tailwind shadows applied correctly (4px 4px 0px)
- [ ] Responsive (hero shrinks on mobile)
- [ ] No custom CSS (Tailwind only)

### Interactivity
- [ ] Input validation (min 20 chars)
- [ ] Submit button triggers `onSubmit` callback
- [ ] Loading state ("INITIALIZING...")
- [ ] Error display for validation failures

**Commit:** `git commit -m "Phase 2: QueryInput UI complete"`

---

## Phase 3: Build ExecutionDashboard UI (90 min)

### Component: ExecutionHeader
- [ ] Logo + "AXIOM-ONE" title
- [ ] RUN_ID display
- [ ] Status badge (animated if running)
- [ ] "New Query" button
- [ ] "Export Report" button

### Component: TaskTreeSidebar
- [ ] "The Syllabus" header
- [ ] Task list with:
  - Task ID (T1, T2, T3)
  - Task title
  - Status badge (PENDING, EXECUTING, COMPLETE, FAILED)
  - Progress bar (if executing)
- [ ] Click task → highlight selected
- [ ] Scrollable

### Component: ManuscriptPanel
- [ ] Header with confidence score (top-right)
- [ ] "Inspect Logic" button (opens trace modal)
- [ ] Rendered manuscript content (Markdown or HTML)
- [ ] Assumptions section (bottom)
  - Bulleted list
  - Gray background

### Component: TraceModal
- [ ] Slide-over modal (50% width on desktop)
- [ ] Close button (X in top-right)
- [ ] Task ID display
- [ ] Scrollable trace timeline
- [ ] Each trace entry:
  - Timestamp
  - Type badge (THOUGHT, ACTION, VALIDATE, ERROR)
  - Content text
  - Color-coded by type

### State Management
- [ ] useState for runId, status, tasks, manuscript, confidence, traces
- [ ] useEffect to listen for updates (WebSocket or polling)

**Commit:** `git commit -m "Phase 3: ExecutionDashboard UI complete"`

---

## Phase 4: Build Backend APIs (120 min)

### Create API Utilities: `src/api/decompose.ts`
- [ ] Function: `decompose(query: ResearchQuery): Promise<TaskGraph>`
- [ ] Calls Gemini with task decomposition prompt
- [ ] Returns tasks array (4-7 tasks)
- [ ] Validate no circular dependencies
- [ ] Error handling (retry 2x if JSON fails)

**Commit:** `git commit -m "Phase 4.1: Decompose endpoint"`

### Create API Utilities: `src/api/execute-subagent.ts`
- [ ] Function: `executeSubagent(taskId, description, context, tokenBudget)`
- [ ] Calls Gemini with extended thinking enabled
- [ ] Returns structured SubagentResult
- [ ] Parse thinking process into trace entries
- [ ] Includes: output, assumptions, confidence, sourceType, trace

**Commit:** `git commit -m "Phase 4.2: Subagent executor"`

### Create API Utilities: `src/api/validate.ts`
- [ ] Function: `validate(results, rootQuestion): Promise<ValidationResult[]>`
- [ ] Calls Gemini as adversarial reviewer
- [ ] Checks for contradictions, unsupported claims, overconfidence
- [ ] Returns array of ValidationResults with flags
- [ ] Optional confidence downgrade recommendations

**Commit:** `git commit -m "Phase 4.3: Validation endpoint"`

### Create API Utilities: `src/api/synthesize.ts`
- [ ] Function: `synthesize(runId, question, results, taskGraph): Promise<ResearchReport>`
- [ ] Calls Gemini to merge validated results into manuscript
- [ ] Returns structured ResearchReport
- [ ] Includes: manuscript (Markdown), assumptions, overallConfidence

**Commit:** `git commit -m "Phase 4.4: Synthesis endpoint"`

### Create Orchestrator: `src/api/orchestrator.ts`
- [ ] Function: `runResearchExecution(question, onProgress)`
- [ ] Call decompose → execute → validate → synthesize in sequence
- [ ] Fire progress callbacks after each step
- [ ] Return final ResearchReport

**Commit:** `git commit -m "Phase 4.5: Main orchestrator"`

---

## Phase 5: Wire Frontend to Backend (60 min)

### Connect QueryInput → Orchestrator
- [ ] On form submit:
  - Call decompose API
  - Get task graph
  - Navigate to `/dashboard` with task graph state

### Connect ExecutionDashboard → Orchestrator
- [ ] useEffect hook runs orchestrator on mount
- [ ] Progress callback updates local state
- [ ] Render task tree from state
- [ ] Render manuscript as it updates
- [ ] Show trace modal when requested

### Connect ReportView
- [ ] Route `/report` receives final report
- [ ] Display manuscript, confidence, assumptions
- [ ] Export button (stub: copy to clipboard, or PDF)
- [ ] "New Query" button routes back to home

**Commit:** `git commit -m "Phase 5: Full integration wired"`

---

## Phase 6: Styling & Polish (60 min)

### Design System Colors
- [ ] Update `src/index.css` with CSS variables
- [ ] `--color-paper: #F9F8F4`
- [ ] `--color-ink: #111111`
- [ ] `--color-surface: #FFFFFF`
- [ ] `--color-teal: #0F766E`
- [ ] `--color-error: #B91C1C`
- [ ] `--color-trace: #4F46E5`

### Tailwind Config
- [ ] Add color extensions to tailwind.config.ts
- [ ] Add custom shadow (hard: 4px 4px 0px)
- [ ] Add font families

### Component Styling
- [ ] Verify all cards have shadow-hard
- [ ] All borders use border-border-std
- [ ] All headers are serif font
- [ ] All body text is sans font
- [ ] All code/technical text is mono font
- [ ] Buttons follow btn-primary / btn-secondary classes

### Responsive
- [ ] Mobile: sidebar collapses or hidden
- [ ] Mobile: trace modal full-screen
- [ ] Tablet: adjust spacing/layout
- [ ] Desktop: matches design specs

**Commit:** `git commit -m "Phase 6: Design system + polish"`

---

## Phase 7: Testing & Error Handling (60 min)

### Manual Testing Checklist
- [ ] **Happy path:** Enter question → see tasks → see execution → see report
- [ ] **Input validation:** Empty input → error message
- [ ] **API errors:** Gemini fails → retry or show error
- [ ] **State sync:** Task completion updates UI in real-time
- [ ] **Task details:** Click task in sidebar → expand details
- [ ] **Trace modal:** Click "Inspect Logic" → modal opens
- [ ] **Confidence:** Displayed throughout (decomposition, execution, validation, final)
- [ ] **Assumptions:** Listed in sidebar and final report
- [ ] **Export:** Button copies report or downloads PDF
- [ ] **New Query:** "New Query" button resets and goes back to input

### Error Paths
- [ ] Empty query input → validation error
- [ ] Decomposition returns non-JSON → retry 2x, then error
- [ ] Subagent timeout → show "Request timed out, partial results available"
- [ ] Validation flags everything → display with warning badge
- [ ] Network down → graceful error message

### Browser Console
- [ ] No errors logged
- [ ] No warnings (except Tailwind if any)
- [ ] No `console.log()` statements in production code

**Commit:** `git commit -m "Phase 7: Testing + error handling"`

---

## Phase 8: Cleanup & Final Review (30 min)

### Code Quality
- [ ] No TypeScript errors (`npm run build`)
- [ ] All types properly defined
- [ ] No `any` types
- [ ] Consistent naming (camelCase for functions, PascalCase for components)

### Unused Code
- [ ] Remove old LandingPage code if still present
- [ ] Remove debug logging
- [ ] Remove commented-out code

### Git Hygiene
- [ ] All changes committed
- [ ] Branch is clean (no staged/unstaged changes)

### Final Commit
- [ ] `git commit -m "Phase 8: Final cleanup"`
- [ ] `git push origin feature/core-engine`

---

## Success Verification

Run through this checklist **one more time** before considering it "done":

### Input Page ✅
- [ ] Hero layout matches stitch spec
- [ ] Input accepts research question
- [ ] Feature cards display correctly
- [ ] Button click submits

### Execution Dashboard ✅
- [ ] Header shows run ID + status
- [ ] Sidebar displays task tree
- [ ] Main panel shows manuscript
- [ ] Confidence displayed prominently
- [ ] Trace modal opens/closes
- [ ] All status badges color-coded

### Backend ✅
- [ ] Decompose returns tasks
- [ ] Subagent execution returns results
- [ ] Validation checks results
- [ ] Synthesis produces manuscript
- [ ] No hallucinations without cross-check
- [ ] Confidence scores tracked

### Report View ✅
- [ ] Displays final manuscript
- [ ] Shows all assumptions
- [ ] Confidence visible
- [ ] Export button works
- [ ] "New Query" resets

### Design ✅
- [ ] Paper theme colors throughout
- [ ] Correct fonts (serif, sans, mono)
- [ ] Hard shadows on cards
- [ ] Responsive on mobile/tablet/desktop
- [ ] Borders are consistent

### Performance ✅
- [ ] No console errors
- [ ] React DevTools shows no warnings
- [ ] Page loads < 3 seconds
- [ ] API calls don't timeout

---

## Deploy / Handoff

Once all ✅:

1. Merge to main: `git checkout main && git merge feature/core-engine`
2. Tag release: `git tag -a v0.1.0 -m "AXIOM-ONE MVP"`
3. Push: `git push origin main && git push origin --tags`
4. Deploy (Vercel/wherever you deploy)

---

## What NOT to Do

❌ **Don't ship:**
- Multi-user features
- Database persistence
- Self-improving loops
- Complex analytics
- Streaming responses (batch only)
- File uploads

❌ **Don't change:**
- Color scheme
- Font choices
- Core architecture (decompose → execute → validate → synthesize)
- Token budgets for subagents
- Confidence tracking approach

❌ **Don't optimize:**
- Speed (correctness first)
- Code size (clarity first)
- Features (scope lock)

---

## You're Done When:

1. All phases complete (1-8)
2. All success metrics pass
3. Code committed and pushed
4. No console errors
5. Deployment successful

**Total Time:** ~6-8 hours of focused work + 2-4 hours of debugging/iteration.

**Lock this checklist. Execute it linearly.**