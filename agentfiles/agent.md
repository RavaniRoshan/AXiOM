# AXIOM-ONE Production Plan: Complete Documentation

**Status:** Ready for execution  
**Audience:** Roshan (product owner) + Claude Code (dev)  
**Timeline:** 24-hour sprint  
**Last Updated:** February 15, 2026  

---

## What You Have (Complete Production Blueprint)

### 4 Comprehensive Documents

#### 1. **TASK.md** (22KB)
**Purpose:** Technical deep-dive for developers  
**Contains:**
- 5 phases of implementation (UI scaffold → backend → wiring → polish → testing)
- Every file to create, exact file paths
- Code samples for critical functions (decompose, execute, validate, synthesize)
- Data structures (TypeScript interfaces)
- API endpoints and request/response shapes
- Error handling patterns
- Edge cases and gotchas
- Testing checklist
- Non-negotiable rules (no localStorage, strict typing, etc.)
- Success criteria (MVP pass/fail metrics)

**When to use:** You're building a component or API endpoint and need to know exactly what to implement.

---

#### 2. **PRODUCTION_PLAN.md** (17KB)
**Purpose:** Strategic context + Claude Code execution prompt  
**Contains:**
- Executive summary (why this matters)
- What's being built (concrete deliverables)
- Architecture decisions (why decompose? why subagents? why validate?)
- MVP scope (what ships, what doesn't)
- Design system lock (colors, fonts, shadows)
- Directory structure (repo layout after build)
- Risk assessment & mitigations
- Testing strategy (smoke tests + error cases)
- Execution rules (non-negotiable, e.g., build linearly)
- Success metrics (10 metrics for MVP pass/fail)
- Post-MVP ideas (v2 features, do NOT build)
- **CLAUDE CODE EXECUTION PROMPT** (Copy and paste into Claude Code terminal)

**When to use:** You're starting the build and need strategic context, or you're giving this to Claude Code as a dev.

---

#### 3. **DESIGN_REFERENCE.md** (27KB)
**Purpose:** Visual & component specifications  
**Contains:**
- Design token lock (colors, fonts, shadows, spacing)
- 4 screen specifications with full React component code:
  - QueryInput (Thesis Statement hero + feature cards)
  - ExecutionDashboard (header + sidebar + manuscript + trace modal)
  - TraceModal (adversarial inspection)
  - ReportView (final manuscript)
- Component code examples with Tailwind classes
- Mapping between stitch/ HTML specs and React implementations
- Responsive behavior (mobile/tablet/desktop)
- Utility classes (reusable patterns)
- Color reference map
- Gotchas (things that break design)

**When to use:** You're building a React component and need the exact HTML structure, Tailwind classes, and state shape.

---

#### 4. **EXECUTE.md** (12KB)
**Purpose:** Quick-reference checklist for the build sprint  
**Contains:**
- 8-phase build checklist
- Each phase broken into sub-tasks with checkboxes
- Git workflow (when to commit, what to commit)
- Exact testing steps (happy path + error cases)
- Success verification checklist
- What NOT to do (scope guardrails)
- Definition of "done" per phase
- Deployment/handoff steps

**When to use:** You're in the middle of the sprint and need a quick reference. Check off items as you complete them.

---

## The Gap (Why This Documentation Exists)

**Current State:**
```
✅ React + Vite scaffold
✅ Gemini API keys configured
✅ Design system fully specified (stitch/ folder)
❌ ZERO task decomposition logic
❌ ZERO subagent execution
❌ ZERO validation layer
❌ Landing page instead of research engine
```

**Target State:**
```
✅ User enters research question
✅ System decomposes into 5-7 tasks
✅ Each task executed by isolated subagent
✅ Results validated for logical flaws
✅ Results synthesized into manuscript
✅ Full UI showing progress, confidence, assumptions, reasoning traces
✅ Zero hallucinations (everything cross-checked)
```

**This documentation bridges that gap with:**
- Exact technical specs (what to build)
- Exact design specs (how it looks)
- Exact build order (how to build it)
- Exact success criteria (when you're done)

---

## How to Use This (Three Scenarios)

### Scenario 1: You're Building Yourself
1. Read TASK.md completely (understand the architecture)
2. Read PRODUCTION_PLAN.md (understand why)
3. Skim DESIGN_REFERENCE.md (visual reference)
4. Follow EXECUTE.md checklist (what to build, in order)
5. Reference DESIGN_REFERENCE.md as you code (copy component structures)
6. Reference TASK.md for API details (function signatures, type shapes)

**Time:** 6-8 hours focused work

---

### Scenario 2: You're Giving This to Claude Code
1. Copy the **CLAUDE CODE EXECUTION PROMPT** section from PRODUCTION_PLAN.md
2. Paste it into Claude Code terminal
3. Point Claude Code to TASK.md for technical details
4. Point Claude Code to DESIGN_REFERENCE.md for component patterns

Claude Code will:
- Execute the build linearly (Phase 1 → 8)
- Commit after each phase
- Test as it builds
- Follow the exact specs

**Result:** Functional AXIOM-ONE MVP in ~6-8 hours

---

### Scenario 3: You're Working With a Team
1. Share all 4 documents with the team
2. Frontend dev reads: DESIGN_REFERENCE.md + EXECUTE.md phases 1-3
3. Backend dev reads: TASK.md sections 2.1-2.6 + PRODUCTION_PLAN.md
4. QA reads: EXECUTE.md phase 7 + PRODUCTION_PLAN.md (testing strategy)
5. Product owner (you) reads: PRODUCTION_PLAN.md + PRODUCTION_PLAN.md success metrics

**Coordination:** Phase gates (each dev doesn't start phase N until phase N-1 is complete)

---

## Document Sizes & Purposes

| Document | Size | Primary Use |
|----------|------|-------------|
| TASK.md | 22KB | Technical implementation (developers) |
| PRODUCTION_PLAN.md | 17KB | Strategic context + Claude Code prompt (product + dev) |
| DESIGN_REFERENCE.md | 27KB | Visual specifications (frontend dev) |
| EXECUTE.md | 12KB | Build checklist (everyone during sprint) |

**Total:** ~78KB of production-grade documentation.

---

## Critical Design Decisions (Already Locked)

### 1. Decompose → Execute → Validate → Synthesize
Why? Breaks complex reasoning into atomic tasks, each with cross-checks. Prevents hallucinations through isolation and adversarial validation.

### 2. Subagents with Isolated Context
Why? Fresh context window per task = no context collapse. Failures die inside the agent. Noise never reaches orchestrator.

### 3. Reasoning is First-Class
Why? Traces are stored, inspectable, product features—not debug logs. Users see how the system thinks.

### 4. Paper Theme, Brutalist Design
Why? Signals seriousness, epistemic rigor, no fluff. Attracts researchers, engineers, investors who care about correctness.

### 5. No Streaming, Batch-Only
Why? Simpler architecture. Results are validated *before* shown. No partial/uncertain outputs.

---

## Success Criteria (Exactly 10 Metrics)

1. ✅ User can submit research question
2. ✅ System decomposes to 5-7 tasks (JSON)
3. ✅ Subagents execute and return results
4. ✅ Validation flags contradictions/overconfidence
5. ✅ Synthesis produces readable manuscript
6. ✅ Task progress visible in real-time
7. ✅ Confidence score visible on all outputs
8. ✅ Reasoning traces inspectable (click → modal)
9. ✅ Every claim cross-checked (no unvalidated assertions)
10. ✅ Report exportable (clipboard or PDF)

**MVP Pass:** All 10 metrics work  
**MVP Fail:** Any 3+ metrics broken  

---

## The MVP Scope (Locked, No Changes)

### Ships
- Task decomposition (question → tasks JSON)
- Subagent execution (task → validated output)
- Validation layer (flags logical flaws)
- Synthesis (results → manuscript)
- Full UI (input → dashboard → report)
- Confidence tracking
- Assumption transparency
- Reasoning traces
- Export (copy/PDF)

### Doesn't Ship
- Multi-user collaboration
- Persistent database
- Real-time collaboration
- Self-improving loops
- Streaming responses
- File uploads
- API documentation (stub)
- Advanced analytics

**Why this scope?** Shippable in 24 hours. Defensible (focused, coherent). Foundation for v2.

---

## The 24-Hour Build Timeline

| Phase | Time | What's Built |
|-------|------|--------------|
| 1 | 45 min | Types scaffold, routes, archive old landing page |
| 2 | 60 min | QueryInput UI (hero, cards, form) |
| 3 | 90 min | ExecutionDashboard UI (header, sidebar, manuscript, trace modal) |
| 4 | 120 min | Backend APIs (decompose, execute, validate, synthesize, orchestrator) |
| 5 | 60 min | Wire frontend to backend (state sync, data flow) |
| 6 | 60 min | Design system (colors, fonts, shadows, responsive) |
| 7 | 60 min | Testing (smoke tests, error paths, manual QA) |
| 8 | 30 min | Cleanup (code quality, git hygiene) |
| **Buffer** | **2 hours** | Debugging, unexpected issues |
| **Total** | **~6-8 hours focused** | Functional MVP |

---

## What Makes This Different (Than Typical Docs)

### ✅ What's Included
- Exact code samples (copy-pasteable starting points)
- Exact design specs (reference stitch/ files, but code in components)
- Exact build order (no parallelization, linear progression)
- Exact success criteria (10 measurable metrics)
- Exact gotchas (edge cases, error handling patterns)
- Exact testing steps (not vague "test thoroughly")

### ✅ What's NOT Included
- Marketing fluff ("Build the future of...")
- Vague statements ("Use best practices...")
- Aspirational scope ("Wouldn't it be cool if...")
- Theoretical architecture diagrams
- Generic documentation

### ✅ Tone
- Direct, opinionated, unambiguous
- Calls out weak decisions
- Prioritizes execution over perfection
- Expects discipline and focus

---

## Next Steps (What to Do Now)

### Option A: Build It Yourself
1. Clone your AXiOM repo
2. Create a branch: `git checkout -b feature/core-engine`
3. Follow EXECUTE.md checklist
4. Reference TASK.md for technical details
5. Reference DESIGN_REFERENCE.md for component patterns
6. Commit after each phase
7. Test and iterate
8. Ship

**Time:** 6-8 hours

---

### Option B: Use Claude Code
1. Copy the "CLAUDE CODE EXECUTION PROMPT" from PRODUCTION_PLAN.md
2. Paste into Claude Code terminal
3. Claude Code will execute automatically
4. You review, iterate, ship

**Time:** Same 6-8 hours, but mostly hands-off

---

### Option C: Team Build
1. Share these 4 docs with your team
2. Assign frontend dev to DESIGN_REFERENCE.md + EXECUTE.md phases 1-3
3. Assign backend dev to TASK.md sections 2.1-2.6
4. Coordinate phase gates
5. Daily standups against EXECUTE.md checklist

**Time:** 6-8 hours total time (parallelized if team is coordinated)

---

## Files Provided

All 4 documents are in `/mnt/user-data/outputs/`:

```
outputs/
├── TASK.md                (22KB) — Implementation details
├── PRODUCTION_PLAN.md     (17KB) — Strategy + Claude Code prompt
├── DESIGN_REFERENCE.md    (27KB) — Component specs + Tailwind
└── EXECUTE.md            (12KB) — Build checklist
```

---

## The Bottom Line

**You're not shipping vibes. You're shipping a thinking engine.**

This documentation gives you everything needed to build a research execution system that:
- Takes complex questions
- Decomposes them into atomic tasks
- Executes each task with validation
- Synthesizes results into a coherent report
- Shows all reasoning (no black box)
- Tracks confidence throughout
- Explicitly surfaces assumptions

**In 24 hours.**

No marketing site. No fluff. Just an engine that earns trust.

---

## Questions? (FAQ)

**Q: Can I change the design?**  
A: No. Design lock is intentional (colors, fonts, shadows). Focus on the engine.

**Q: Can I add multi-user?**  
A: Not now. v2, post-MVP. Scope lock = execution speed.

**Q: What if I get stuck?**  
A: Check TASK.md for that section, check DESIGN_REFERENCE.md for visual reference, trace the exact failure point.

**Q: How do I know I'm done?**  
A: All 10 success metrics pass + no console errors + all EXECUTE.md checkboxes checked.

**Q: Can I parallelize the build?**  
A: Frontend and backend can be parallel (phase 2-3 simultaneous with phase 4), but don't start phase 5 until phases 1-4 complete.

**Q: What's the time commitment?**  
A: 6-8 hours of focused, uninterrupted work. Not 6 hours with distractions. 6 hours heads-down.

---

## Document Integrity

These documents are locked. They represent the complete, coherent execution plan. They're meant to be:
- Used as-is (don't rewrite)
- Followed linearly (don't skip phases)
- Referenced during build (don't freestyle)
- Completed before shipping (100% of checklist, not 80%)

**This is the plan. Execute it.**

---

**Created:** February 15, 2026  
**For:** Roshan Ravani, AXIOM-ONE Product Owner  
**By:** Claude + Design System (stitch/)  
**Status:** LOCKED, READY FOR EXECUTION