import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function QueryInput() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed.length < 20) {
      setError('Query must be at least 20 characters');
      return;
    }
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      navigate('/dashboard', { state: { question: trimmed } });
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-paper text-ink relative">
      <header className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-5xl w-full">
          <h1 className="font-serif text-[120px] md:text-[180px] leading-[0.9] tracking-tighter mb-8 italic">
            AXIOM-ONE
          </h1>
          <p className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase opacity-60 mb-12">
            // DECENTRALIZED_LOGIC // ABSOLUTE_TRACEABILITY
          </p>
          <form onSubmit={handleSubmit} className="mb-12">
            <textarea
              aria-label="Research question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your research question..."
              className="w-full max-w-2xl mx-auto block px-6 py-4 bg-surface border border-border-std font-serif text-2xl text-ink placeholder:text-neutral-400 focus:outline-none focus:border-ink mb-6"
              minLength={20}
              maxLength={2000}
              rows={4}
            />
            {error && (
              <p className="text-error-red font-mono text-sm mb-6">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading || input.trim().length < 20}
              aria-label="Initialize audit"
              className="bg-ink text-paper px-10 py-5 font-mono text-sm font-bold tracking-widest flex items-center gap-4 mx-auto hover:bg-neutral-800 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'INITIALIZING...' : 'INITIALIZE_AUDIT'}
              {!isLoading && <ArrowIcon className="shrink-0" />}
            </button>
          </form>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
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
                <span>search_tool(&quot;ASML 2026 production roadmap&quot;)</span>
              </div>
              <div className="flex gap-2 text-teal-success mt-1">
                <span>VALIDATE:</span>
                <span className="text-neutral-500">Source verified. Confidence p=0.98.</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 bg-surface border border-border-std p-6 shadow-hard flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-2">
              Interface_02
            </span>
            <h3 className="font-serif text-3xl mb-4">Living Manuscripts</h3>
            <p className="font-sans text-neutral-600 leading-relaxed mb-6">
              Watch your research evolve as a dynamic paper with continuous synthesis.
            </p>
            <div className="flex-grow border-l border-neutral-200 pl-4 py-2 space-y-4">
              <div className="h-2 w-3/4 bg-neutral-200 animate-pulse" />
              <div className="h-2 w-full bg-neutral-100" />
              <div className="h-2 w-5/6 bg-neutral-100" />
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-4 bg-ink animate-pulse" />
                <span className="font-mono text-[10px] text-neutral-400">SYNTHESIZING...</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-12 bg-surface border border-border-std p-6 md:p-10 shadow-hard flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-success text-paper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
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

      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl italic">The Rational Path</h2>
          <div className="h-px w-24 bg-ink/10 mx-auto mt-6" />
        </div>
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-0 relative">
          <div className="flex-1">
            <div className="bg-surface border border-border-std p-6 shadow-hard flex flex-col h-full">
              <span className="font-mono text-[10px] tracking-widest text-neutral-400 mb-4 uppercase block">
                Phase 01: Thesis Formulation
              </span>
              <h4 className="font-serif text-2xl mb-3">Define the Objective</h4>
              <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-6">
                Establish the logical boundaries and primary hypothesis of the inquiry.
              </p>
              <div className="bg-neutral-50 border border-border-std p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] text-neutral-400">INPUT_FIELD</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 block" />
                  </div>
                </div>
                <div className="font-mono text-[11px] text-ink border-l-2 border-ink pl-2 py-1 italic">
                  &quot;Analyze the impact of...&quot;
                </div>
              </div>
            </div>
          </div>
          <div className="h-12 md:h-auto md:w-16 flex items-center justify-center shrink-0">
            <div className="w-px h-full md:w-full md:h-px bg-border-std relative flex items-center justify-center">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper p-1 text-neutral-300">
                <ChevronIcon />
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-surface border border-border-std p-6 shadow-hard flex flex-col h-full">
              <span className="font-mono text-[10px] tracking-widest text-neutral-400 mb-4 uppercase block">
                Phase 02: Adversarial Trace
              </span>
              <h4 className="font-serif text-2xl mb-3">Critical Auditing</h4>
              <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-6">
                Multi-agent peer review cycle to challenge every logical step.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 border-l border-b border-neutral-400 shrink-0" />
                  <span className="bg-neutral-50 border border-border-std px-2 py-1 font-mono text-[9px]">
                    L01: SOURCE_VERIFY
                  </span>
                </div>
                <div className="flex items-start gap-2 ml-4">
                  <span className="mt-1 w-2 h-2 border-l border-b border-neutral-400 shrink-0" />
                  <span className="bg-teal-50 border border-teal-100 px-2 py-1 font-mono text-[9px] text-teal-700">
                    L02: CONSENSUS_REACHED
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 border-l border-b border-neutral-400 shrink-0" />
                  <span className="bg-neutral-50 border border-border-std px-2 py-1 font-mono text-[9px]">
                    L01: SYNTHESIS_GEN
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-12 md:h-auto md:w-16 flex items-center justify-center shrink-0">
            <div className="w-px h-full md:w-full md:h-px bg-border-std relative flex items-center justify-center">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper p-1 text-neutral-300">
                <ChevronIcon />
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-surface border border-border-std p-6 shadow-hard flex flex-col h-full">
              <span className="font-mono text-[10px] tracking-widest text-neutral-400 mb-4 uppercase block">
                Phase 03: Manuscript Synthesis
              </span>
              <h4 className="font-serif text-2xl mb-3">Final Output</h4>
              <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-6">
                Formalization of reasoning into a structured, exportable research document.
              </p>
              <div className="flex-grow border border-border-std bg-neutral-50 p-3 space-y-2">
                <div className="h-1.5 w-1/3 bg-neutral-300" />
                <div className="h-1 w-full bg-neutral-200" />
                <div className="h-1 w-full bg-neutral-200" />
                <div className="h-1 w-4/5 bg-neutral-200" />
                <div className="pt-2 flex justify-between gap-2">
                  <div className="h-1 w-1/4 bg-neutral-300" />
                  <div className="h-1 w-1/4 bg-neutral-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border-std py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-2xl">AXIOM-ONE</h2>
            <span className="font-mono text-[10px] py-1 px-2 border border-border-std">RATIONAL_V1</span>
          </div>
          <nav className="flex flex-wrap gap-8 font-mono text-[11px] tracking-wider uppercase opacity-60">
            <a href="#" className="hover:opacity-100">Documentation</a>
            <a href="#" className="hover:opacity-100">Methodology</a>
            <a href="#" className="hover:opacity-100">API_Access</a>
            <a href="#" className="hover:opacity-100">Terminal_Login</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
