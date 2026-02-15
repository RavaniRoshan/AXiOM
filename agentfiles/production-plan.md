# AXIOM-ONE: Production Plan & Claude Code Execution Prompt

**Document Status:** Lock-in Phase  
**Audience:** Roshan (product owner) + Claude Code (executor)  
**Timeline:** 24-hour sprint to functional MVP  

---

## Executive Context (Why This Matters)

You built a **marketing landing page** for AXIOM-ONE. That's not AXIOM-ONE.

AXIOM-ONE is a **research execution engine.** It should:
- Break complex questions into atomic tasks
- Execute those tasks via isolated agents
- Validate reasoning under adversarial scrutiny
- Surface assumptions, confidence, and reasoning traces
- Produce structured, inspectable research reports

**What exists today:**
- ✅ React scaffold (Vite, Tailwind)
- ✅ Gemini API stub
- ✅ High-fidelity design system (stitch/ folder)
- ❌ Zero actual reasoning pipeline
- ❌ Marketing site instead of product

**The Gap:** You have the design and infrastructure, but no engine. That's what the next 24 hours fixes.

---

## Why This Matters (For You, The Builder)

1. **You'll learn subagent architecture by building it.** Not reading about it.
2. **You'll see the difference between UI fluff and functional core.** The design specs become obvious.
3. **You'll have a working system that earns trust from researchers, engineers, investors.** Because it *shows its work*.
4. **You'll compound a crucial skill:** building systems that prioritize correctness over impressiveness.

The engineers and researchers you want to impress don't care about animations. They care about epistemic rigor. This build teaches you that.

---

## What's Being Delivered (Concrete)

### 1. TASK.md (Technical Blueprint)
- 5 phases of development
- Exact file structure
- Code samples for every critical function
- Non-negotiable rules
- Testing checklist
- Success criteria

**Where to find it:** `/home/claude/TASK.md`

### 2. This Document (Production Plan + Claude Code Prompt)
- Strategic context
- Why each decision matters
- The exact prompt to give Claude Code

### 3. Stitch Files (Design Reference)
- 4 high-fidelity HTML mockups
- Design system (colors, fonts, shadows, spacing)
- Exact layouts for all core screens
- Located in: `stitch/`

---

## Architecture Decision: Why This Design

### Why Decompose?
- One giant LLM call = context collapse + hallucinations
- Smaller, focused tasks = higher confidence, better cross-checking
- Users see the "work," not just the answer

### Why Subagents?
- Each task gets a fresh context window
- Failures die inside the agent (noise doesn't propagate)
- Parallel execution possible (not implemented in MVP, but architecture supports it)
- Isolation == epistemic integrity

### Why Validation?
- LLMs are overconfident. Validation forces reality-checking.
- Contradictions surface before synthesis
- Confidence scores downgrade when issues found
- Zero-hallucination protocol (everything is challenged)

### Why Synthesis?
- Merge validated results into coherent narrative
- Track assumptions at final output
- Map confidence through entire chain
- Produce something exportable (report, PDF, JSON)

---

## The MVP Scope (What Ships, What Doesn't)

### ✅ Shipping
- Task decomposition (query → tasks JSON)
- Subagent execution (task → validated output)
- Validation layer (flags logical flaws)
- Synthesis (results → manuscript)
- UI for all 4 phases (input, dashboard, trace, report)
- Confidence tracking throughout
- Assumption transparency
- Export functionality (stub: copy-to-clipboard)

### ❌ Not Shipping
- Multi-user collaboration
- Persistent memory (database)
- Real-time collaboration
- Self-improving loops
- Streaming responses (batch only)
- File uploads
- API documentation
- Advanced analytics

**Why this scope?** 
- Shipping scope is defensible and shippable in 24 hours
- Non-shipping scope is distraction (can't compound infinitely)
- Focus = ruthless prioritization

---

## Design System Lock (No Deviations)

Use these colors, fonts, shadows everywhere:

```
COLORS:
  Paper (bg):        #F9F8F4
  Ink (text):        #111111
  Surface (cards):   #FFFFFF
  Teal (success):    #0F766E
  Error:             #B91C1C
  Border:            #E5E5E5
  Trace (blue):      #4F46E5

FONTS:
  Serif (headers):   Newsreader
  Sans (body):       Inter
  Mono (code):       JetBrains Mono

SHADOWS:
  Hard:              4px 4px 0px rgba(0,0,0,0.1)
  
SPACING:
  Border:            1px solid #E5E5E5
  Gap/padding:       Use 6, 8, 12, 16, 24, 32 (Tailwind scale)
```

**Non-negotiable:** No dark mode. No electric blue landing page colors. This is the paper-ink brutalist design.

---

## Directory Structure (Lock This)

After build, your repo looks like:

```
AXiOM/
├── src/
│   ├── pages/
│   │   ├── QueryInput.tsx        (Hero + Input)
│   │   ├── ExecutionDashboard.tsx (Main interface)
│   │   ├── ReportView.tsx        (Final output)
│   │   └── archived/
│   │       └── LandingPage.backup.tsx
│   ├── components/
│   │   ├── TaskTree.tsx          (Sidebar)
│   │   ├── ManuscriptPanel.tsx   (Main content)
│   │   ├── TraceModal.tsx        (Adversarial inspection)
│   │   └── ConfidenceIndicator.tsx
│   ├── api/
│   │   ├── orchestrator.ts       (Main engine)
│   │   ├── decompose.ts
│   │   ├── execute-subagent.ts
│   │   ├── validate.ts
│   │   ├── synthesize.ts
│   │   └── types.ts
│   ├── App.tsx                   (Router)
│   ├── index.css                 (Design tokens)
│   └── main.tsx
├── api/
│   ├── gemini.ts                 (Shared API client)
│   └── (old files archived or deleted)
├── stitch/                       (Design reference)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

---

## The Critical Dependencies (Understand These First)

### Design References
- **QueryInput screen:** `stitch/the_thesis_statement_(input)_1/code.html`
- **Dashboard screen:** `stitch/the_living_document_(active)_1/code.html`
- **Trace inspection:** `stitch/the_adversarial_trace_(inspection)/code.html`
- **Report screen:** `stitch/the_final_manuscript_(report)/code.html`

These are not approximate. They are exact specifications. Use them as reference for HTML structure, CSS classes, layout order.

### Backend Dependencies
- `api/types.ts` must be built first (all other modules depend on it)
- `decompose.ts` must work before wiring to frontend
- Subagent executor must be bulletproof (longest execution time)
- Validation must be comprehensive (most important for rigor)

### Frontend Dependencies
- `QueryInput.tsx` is entry point
- `ExecutionDashboard.tsx` is complex; build in stages
- `TraceModal.tsx` can be stubbed initially, fleshed later

---

## Risk Assessment & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Gemini decomposition returns non-JSON | High | Blocking | Retry 2x with stricter prompt + fallback error |
| Subagent execution times out | Medium | Degradation | Enforce token budgets + timeout 5min |
| Validation flags every result | Medium | Frustration | Be more charitable; flag only critical issues |
| UI state gets out of sync | Medium | Confusing | Use React context + clear state shape |
| Design colors change between comps | Low | Rework | Lock colors now (done above) |
| Manuscript grows > 5k tokens | Low | Slowness | Truncate gracefully + offer full download |

---

## Testing Strategy (Minimal but Real)

### Smoke Test
```bash
# Step 1: Can I submit a query?
Input: "What is the impact of supply chain disruptions on semiconductor manufacturing?"
Expected: Task decomposition returns 5-7 tasks in JSON

# Step 2: Can tasks execute?
Expected: Each task returns output + confidence + assumptions

# Step 3: Does validation work?
Expected: Validator flags contradictions or overconfidence

# Step 4: Does synthesis work?
Expected: Manuscript is readable, assumptions listed, confidence visible

# Step 5: Can I see the traces?
Expected: Click "Inspect Logic" → adversarial trace modal opens with timeline
```

### Error Cases
```bash
# Empty query
Expected: Validation error "Query too short"

# Impossible question
Input: "Define consciousness"
Expected: System admits uncertainty, shows confidence < 0.7

# Circular task dependency
Expected: Graceful error "Task dependency cycle detected"

# Timeout after 5 minutes
Expected: Partial results shown + error message + option to retry
```

---

## Execution Rules (Non-Negotiable)

1. **Build linearly.** No jumping between phases.
2. **Test after each phase.** Don't accumulate untested code.
3. **Lock types first.** All backend functions depend on `types.ts`.
4. **Use the design specs.** Copy HTML structure from stitch/ files.
5. **No external libraries.** Stick to what's installed (React, Tailwind, Axios/fetch).
6. **Assume tokens are expensive.** Keep subagent budgets tight.
7. **Reasoning is first-class.** Traces aren't debug logs; they're product.
8. **Ship the engine, not the polish.** Polish comes after it works.

---

## Success Metrics (MVP Pass/Fail)

| Metric | Pass | Fail |
|--------|------|------|
| User can submit a research question | Query accepted + decomposition runs | Form rejects or crashes |
| System decomposes to tasks | 5-7 tasks returned as JSON | 0 tasks or non-JSON |
| Subagents execute | Each task produces output | Execution timeouts/crashes |
| Validation catches issues | Flags contradictions or low-confidence claims | No validation output |
| Synthesis produces manuscript | Readable report with assumptions | Garbage or empty |
| UI shows progress | Task tree updates in real-time | UI frozen or blank |
| Confidence visible | "Confidence: 87.3%" shown on output | No confidence metric |
| Traces inspectable | Click task → shows reasoning timeline | No trace available |
| No hallucinations | Every claim is cross-checked | Unverified claims presented as facts |
| Exportable | Copy report to clipboard or PDF | Export button broken/missing |

**Pass = All 10 metrics. Fail = Any 3+ metrics broken.**

---

## Post-MVP (Do NOT Implement)

These are ideas for v2, not v1:

- [ ] Database persistence (Postgres)
- [ ] Multi-user workspaces
- [ ] Git integration for research versioning
- [ ] Real-time collaboration
- [ ] Fine-tuned models per domain
- [ ] Custom validator rules
- [ ] Streaming tokens (now batch-only)
- [ ] Advanced search/filtering
- [ ] Scheduled research runs
- [ ] Research library/templates

**Why not now?** Scope creep kills execution. Build the core first. Add features after product-market fit.

---

---

# CLAUDE CODE EXECUTION PROMPT

**Copy this entire section and paste into Claude Code terminal.**

---

## Instructions for Claude Code

You are building AXIOM-ONE, a research execution engine. This is a 24-hour sprint to ship the MVP.

**Starting State:**
- React + Vite repo exists
- Gemini API keys configured
- Design specs in `stitch/` folder (reference, don't copy-paste)
- `TASK.md` has your technical blueprint
- You have TypeScript, Tailwind, and React Router available

**End State:**
- Functional research engine that takes a question, decomposes it, executes subagents, validates results, synthesizes a report
- UI that shows task progress, confidence, assumptions, reasoning traces
- Zero hallucinations (everything cross-checked)
- All features locked in place, no loose ends

**Your Role:**
- Execute the build order from TASK.md (Phase 1 → Phase 5)
- Keep design decisions consistent (use stitch/ specs as reference)
- Write strict TypeScript (no `any` types)
- Test after each phase
- Stop adding features. Ship the engine.

**Start Here:**
1. Read TASK.md completely
2. Create `src/api/types.ts` (the foundation)
3. Build QueryInput.tsx (entry point)
4. Build ExecutionDashboard.tsx (main interface)
5. Build backend (decompose → execute → validate → synthesize)
6. Wire frontend to backend
7. Test the full flow
8. Polish UI to match stitch/ specs
9. Clean up, remove dead code

**Non-Negotiable Rules:**
- No localStorage (use React state)
- No `any` types
- No console logs in production code
- All Tailwind, no custom CSS in components
- Stick to installed dependencies (no new npm installs)
- Assume Gemini API calls may fail—handle gracefully
- Reasoning traces are product, not debug logs

**Critical Success Path:**
```
User enters question
  ↓
Decompose into tasks (JSON)
  ↓
Execute each task (subagent)
  ↓
Validate results (cross-check)
  ↓
Synthesize manuscript
  ↓
Show report + traces + confidence
```

If this doesn't work end-to-end, the feature isn't done.

**Red Flags (Stop & Ask):**
- Gemini API returns non-JSON → Implement retry logic, don't skip
- State sync issues → Use React context, not prop drilling
- Design conflicts → Reference stitch/ specs, not aesthetic preference
- Unsure about type shape → Define in types.ts first, then implement
- Time running out → Cut polish, keep engine. Export can be "copy to clipboard"

**Timeline:**
- Phase 1–2 (UI scaffold + decompose): 3 hours
- Phase 3–4 (subagents + validation + synthesis): 2.5 hours
- Phase 5 (polish + test): 1.5 hours
- Buffer: 1 hour (debugging, weird edge cases)

**Commit Discipline:**
After each phase, commit:
```bash
git add .
git commit -m "Phase X: [description]"
```

This lets you roll back if a phase breaks.

**Definition of Done (per phase):**
- Phase 1: UI renders without errors
- Phase 2: Decomposition API returns tasks
- Phase 3: Subagents execute and return results
- Phase 4: Validation flags logical issues
- Phase 5: Full flow end-to-end works
- Final: All success metrics pass (see above)

**When Stuck:**
1. Check TASK.md for that exact section
2. Look at stitch/ HTML for design reference
3. Test smallest unit first (types → component → API)
4. Add logging, trace the flow, identify exactly where it breaks
5. If still stuck: rethink the approach (maybe it's architecturally wrong)

**Ship Criteria:**
- All success metrics pass
- No console errors
- Design matches stitch/ specs
- Reasoning traces inspectable
- Confidence scores visible throughout
- Assumptions explicit
- Code is clean, well-typed, understandable by someone else

---

## What This Means for You (Product Owner)

After 24 hours:
- You have a working research engine, not a marketing site
- You can run a real research query and see the reasoning
- You can inspect the logic and catch hallucinations
- You have the foundation for investor demos, customer use, further iteration
- Most importantly: **you've built something that earns epistemic trust**

This is not a chatbot. This is a thinking engine that shows its work.

---

## Appendix: Key Code Templates

### Template 1: API Call with Retry
```typescript
async function geminiCallWithRetry(
  prompt: string,
  maxRetries = 2
): Promise<string> {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp:generateContent?key=" +
          process.env.VITE_GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 4000 },
          }),
        }
      );

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (err) {
      if (i === maxRetries) throw err;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

### Template 2: Task Graph State
```typescript
const [state, setState] = useState({
  runId: generateRunId(),
  status: "idle" as "idle" | "decomposing" | "executing" | "validating" | "synthesizing" | "complete" | "error",
  taskGraph: null as TaskGraph | null,
  results: [] as SubagentResult[],
  validationResults: [] as ValidationResult[],
  manuscript: "",
  error: null as string | null,
});
```

### Template 3: Tailwind Consistency
```typescript
// Use these classes everywhere
const styles = {
  button: "px-4 py-2 bg-ink text-paper hover:bg-neutral-800 font-mono text-sm",
  card: "bg-surface border border-border-std p-6 shadow-hard",
  header: "font-serif text-2xl text-ink",
  mono: "font-mono text-xs text-neutral-500",
};
```

---

**This is the plan. This is executable. Go ship it.**