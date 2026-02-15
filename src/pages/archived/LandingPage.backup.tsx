import React from 'react';
import { DotGrid, Metaballs } from '@paper-design/shaders-react';

interface LandingPageProps {
  onWaitlistClick?: () => void;
  onLoginClick?: () => void;
}

export default function LandingPage({ onWaitlistClick, onLoginClick }: LandingPageProps) {
  return (
    <div className="bg-dark text-slate-300 font-sans antialiased selection:bg-primary/30 min-h-screen">
        <style>{`
            .grid-pattern {
                background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                                  linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
                background-size: 24px 24px;
            }
        `}</style>

        <div className="bg-primary/10 border-b border-primary/20 py-2 px-4 text-center text-[11px] font-mono tracking-wider text-primary uppercase">
            SYSTEM_STATUS: ORCHESTRATOR ONLINE // v1.0-ALPHA
        </div>

        <nav className="sticky top-0 z-50 bg-dark/90 backdrop-blur-md border-b border-dark-border">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-14">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-primary flex items-center justify-center rounded-sm">
                                <span className="material-symbols-outlined text-dark text-xl font-bold">hub</span>
                            </div>
                            <span className="font-display font-extrabold text-lg tracking-tighter text-white">AXIOM-ONE</span>
                        </div>
                        <div className="hidden md:flex items-center gap-6 text-[13px] font-semibold text-slate-400">
                            <a className="hover:text-primary transition-colors flex items-center gap-1" href="#">Product <span className="material-symbols-outlined text-[14px]">expand_more</span></a>
                            <a className="hover:text-primary transition-colors" href="#">Research</a>
                            <a className="hover:text-primary transition-colors" href="#">Manifesto</a>
                            <a className="hover:text-primary transition-colors" href="#">Docs</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={onLoginClick} className="text-[13px] font-semibold hover:text-primary">Login</button>
                        <button onClick={onWaitlistClick} className="bg-primary text-white px-4 py-1.5 rounded-sm text-[13px] font-bold hover:bg-accent transition-colors">Start Research</button>
                    </div>
                </div>
            </div>
        </nav>

        <section className="relative pt-16 pb-20 grid-pattern border-b border-dark-border overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-primary/10 border border-primary/20 rounded text-primary text-[10px] font-mono mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        RESEARCH EXECUTION ENGINE
                    </div>
                    <h1 className="text-5xl md:text-7xl mb-6 leading-[1.05] font-display font-extrabold tracking-tight text-white">
                        A <span className="text-primary italic">Thinking-First</span><br/>Research Engine
                    </h1>
                    <p className="text-lg text-slate-400 max-w-xl mb-10 leading-relaxed font-sans">
                        AXIOM-ONE decomposes complex questions into atomic tasks, executes them via isolated subagents, and validates reasoning under adversarial scrutiny. <span className="text-white font-medium">Not a chatbot. Not vibes.</span>
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={onWaitlistClick} className="bg-primary text-white px-6 py-3 rounded-sm font-bold text-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">Start Research</button>
                        <button onClick={onWaitlistClick} className="bg-transparent border border-dark-border text-white px-6 py-3 rounded-sm font-bold text-sm hover:bg-dark-muted transition-all">Read Manifesto</button>
                    </div>
                    <div className="mt-8 flex gap-6 text-[11px] font-mono text-slate-500">
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary">terminal</span> CLI Available</span>
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary">api</span> Reasoning API</span>
                    </div>
                </div>
                <div className="relative group h-[400px] w-full">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-dark-card border border-dark-border rounded-lg overflow-hidden shadow-2xl h-full w-full flex flex-col">
                        <div className="flex items-center gap-1.5 px-4 py-3 bg-dark-muted border-b border-dark-border shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                            <div className="ml-4 text-[10px] font-mono text-slate-500">axiom-orchestrator.local</div>
                        </div>
                        <div className="flex-1 relative bg-black w-full h-full overflow-hidden">
                             <Metaballs
                                speed={0.5}
                                count={15}
                                size={1}
                                scale={1.2}
                                colors={['#3B82F6', '#60A5FA', '#1E40AF', '#2563EB', '#93C5FD']}
                                colorBack="#000000"
                                className="w-full h-full"
                            />
                            <div className="absolute bottom-4 right-4 bg-dark/80 backdrop-blur border border-dark-border p-3 rounded text-[10px] font-mono text-primary animate-pulse">
                                &gt; Validating subagent outputs...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-8 bg-dark-card border-b border-dark-border overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6">
                <p className="text-[10px] font-mono text-slate-600 mb-4 uppercase tracking-widest text-center">Built for rigorous teams at</p>
                <div className="flex flex-wrap justify-between items-center gap-8 opacity-30 grayscale contrast-125 hover:opacity-50 transition-opacity">
                    <img alt="Research Lab" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmnSRCcs8nMEttBIhoMuvsnp3HlBmYfib-kJh83ufihqTEEwvjk7K4LT0NnVk5iY_fWm3gK5UecyuS8R09mjur2bCxIy_gnM8tql2hrUigW785IXJfB_Rd_v3gQOZRIgmrzHwMZmomylVgMLmOieFW-LZlkIRuMvt01Oqh5QFU83hPfMo7I81_nKjTErRLPHgA2XRP9N73bVEQpAHM8WwvuvDWohCvoEWoxT6I-j5aKs-qGFF3gwwESvT10o6EJYCTpmkRWkLrhg"/>
                    <img alt="AI Institute" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9ZLndlk-hkof0aBPtqNwOZUheuhrDltJkXcjrApRefkq4MXGa1NKRYT4Q-BQ5qjGv58NIjgkBADaZ5qO0avAT-MPr28B9JqmhhphoFmiUKGVwuO9ZJrQObgbH-UU8LOKO63gBitOicWqkj5TtENJ4TB1fnSgzzuEwgeJ4gLP2Ywnc-pi-TTC5VNPAPZD9aI3urJKL0HvSNhoeSD7wNcLL05K0rqQ5VnPo2Isp94Nb57rZI3_EcPqP_g50On8Fyuf8-mRthpR4-g"/>
                    <img alt="Tech Corp" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbqV4oSqHxyT-k1BKHgGwyl1iFKJC71TF9YwhDR8Bzhfbtf5QvmQwMN3TKaWduC_1igvyCmlKKhyMGNamodyVXN6RDjKw3hl_BSvewu0SFshNXQK-f8unt03iDm_SmCvD_yHs6bc3eSXwebkMQMHtUzZnS-BpQkZjFBkEFuwh7jX6zSpYqsqVHLttyQXOI2mgqUdO_KjycBdGE9vNrSCwf2IwGzUyR-un_ScAqJFp2r_A4c5VxZ0iiW9WttsaR1kDHHn_eV8Xm6g"/>
                    <img alt="Science Org" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3v51EtGkPUXOSjCdIq2mNMXwH1UpMW0p59n1baK2V4uBKzrs-OTn2w2v_GmxXTIaQiWQpcGXSuY2CmiGBk0jfvZvH0fw0INhERvznllUl2cLIAw1S_S_JZ3tADePD3RYT431gVtpaFnOFKDOwkerLP1PGmk6yfAyzT9AD2QLyDcc1d2jatjJfrHiSrpv9PFUTpKtwKqLs6vDfQne96d0saz_0HtOw4zBIiNpc1U7Fg-veIwfrj86Uy5iObxhXqbZg3mJP30edYg"/>
                    <img alt="Data Systems" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd-p1RbjBpJ67ZU6LZ3bOjs9NVRBdVbAlnMSTYeIWhedeRsJmRWbSgjkRz-hnwqCKq8nKTEkD8USOQXpgemW8XCU_rowGeCrExxTJr6eMgMM0cX30EcHh9p1RgvZw8mYq6BmFX-yt1H45LQf9_QF9yrNlJ6yKPSkqW53AV3rgOMOSM0z0_pEdptIfMK98wIue29MbEMldgQnkLqh7rihLhsEzsdS9tzPK2chK8VyLSo_HBvRjGXitvcE4t-7BNtk_AG6CzjyPLWQ"/>
                </div>
            </div>
        </section>

        <section className="py-16 max-w-[1440px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-1 px-1 bg-dark-border border border-dark-border rounded overflow-hidden">
                <div className="lg:col-span-5 bg-dark p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-0.5 text-primary mb-4">
                            <span className="material-symbols-outlined text-[14px] fill-1">verified</span>
                            <span className="material-symbols-outlined text-[14px] fill-1">verified</span>
                            <span className="material-symbols-outlined text-[14px] fill-1">verified</span>
                            <span className="material-symbols-outlined text-[14px] fill-1">verified</span>
                            <span className="material-symbols-outlined text-[14px] fill-1">verified</span>
                        </div>
                        <h2 className="text-3xl mb-4 font-display font-extrabold tracking-tight text-white">Reasoning as a first-class artifact</h2>
                        <p className="text-sm text-slate-400 mb-8">Traceable, inspectable, and rigorous. No black boxes. Just verified research execution.</p>
                    </div>
                    <div>
                        <button className="flex items-center gap-2 text-xs font-mono font-bold text-primary hover:translate-x-1 transition-transform">
                            VIEW_REASONING_TRACE.json
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                        <div className="mt-8 flex gap-3">
                            <div className="h-12 w-12 bg-dark-muted border border-dark-border rounded p-1.5 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white/50 text-2xl">science</span>
                            </div>
                            <div className="h-12 w-12 bg-dark-muted border border-dark-border rounded p-1.5 flex flex-col items-center justify-center text-[8px] font-mono leading-tight text-center">
                                <span className="text-primary font-bold">99.9%</span>
                                <span className="text-slate-500">VALIDATED</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-7 bg-dark-card p-0 relative min-h-[400px] overflow-hidden">
                    <div className="absolute inset-0">
                         <DotGrid
                            size={2}
                            gapY={24}
                            gapX={24}
                            strokeWidth={0}
                            sizeRange={0}
                            opacityRange={0}
                            shape="circle"
                            colorFill="#3B82F6"
                            colorStroke="#000000"
                            colorBack="#0A0A0B"
                            className="w-full h-full opacity-20"
                        />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="bg-primary/20 p-6 rounded-full border border-primary/40 shadow-[0_0_40px_rgba(59,130,246,0.2)] backdrop-blur-sm">
                            <span className="material-symbols-outlined text-4xl text-primary">psychology</span>
                        </div>
                        <div className="mt-6 text-center relative z-10">
                            <div className="text-[10px] font-mono text-primary mb-1 uppercase tracking-widest">Confidence Score</div>
                            <div className="text-xl font-display font-bold text-white">Epistemic Certainty</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-dark border-y border-dark-border py-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-10 p-2 bg-red-900/40 border border-red-500/50 rounded font-mono text-[10px] text-red-200">ALERT: "Hallucination Detected"</div>
                <div className="absolute top-1/2 right-20 p-2 bg-red-900/40 border border-red-500/50 rounded font-mono text-[10px] text-red-200">FAIL: "Circular Logic"</div>
                <div className="absolute bottom-1/4 left-1/3 p-2 bg-red-900/40 border border-red-500/50 rounded font-mono text-[10px] text-red-200">CRITICAL: "Source Missing"</div>
                <div className="absolute top-1/3 right-1/4 p-2 bg-red-900/40 border border-red-500/50 rounded font-mono text-[10px] text-red-200">WARN: "Overconfident Claim"</div>
            </div>
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl mb-6 font-display font-extrabold tracking-tight text-white">LLMs <span className="text-primary italic underline decoration-primary/30 underline-offset-8">hallucinate.</span> All the time.</h2>
                <p className="text-lg text-slate-400 max-w-xl mx-auto">Standard models prioritize fluency over fact. AXIOM-ONE validates every step before it reaches you.</p>
            </div>
        </section>

        <section className="py-20 bg-dark-card border-b border-dark-border">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="mb-12 border-l-2 border-primary pl-6">
                    <div className="text-[11px] font-mono text-primary mb-2 uppercase tracking-widest">System Architecture</div>
                    <h2 className="text-3xl mb-2 font-display font-extrabold tracking-tight text-white">Meet the <span className="italic text-primary">Reasoning Pipeline</span></h2>
                    <p className="text-sm text-slate-400">Deterministic execution for complex research questions.</p>
                </div>
                <div className="grid lg:grid-cols-4 gap-0 border border-dark-border rounded overflow-hidden">
                    <div className="metric-card border-none bg-primary/10 border-r-2 border-primary/50 p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary">account_tree</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Decomposer</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">Break down complex questions into atomic tasks. Deterministic JSON schemas.</p>
                        <div className="code-snippet font-mono text-xs bg-dark-muted p-2 border border-dark-border rounded">
                            $ axiom task decompose --depth=3
                        </div>
                    </div>
                    <div className="metric-card border-none border-l border-dark-border p-4 hover:border-primary/50 transition-colors bg-dark-card">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary">layers</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Subagents</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">Isolated execution environments prevent context pollution. Failures die locally.</p>
                        <div className="code-snippet font-mono text-slate-500 text-xs bg-dark-muted p-2 border border-dark-border rounded">
                            $ axiom swarm --parallel=4
                        </div>
                    </div>
                    <div className="metric-card border-none border-l border-dark-border p-4 hover:border-primary/50 transition-colors bg-dark-card">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary">gavel</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Validator</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">Hostile peer review for every claim. No hallucination survives scrutiny.</p>
                        <div className="code-snippet font-mono text-slate-500 text-xs bg-dark-muted p-2 border border-dark-border rounded">
                            $ axiom validate --mode=hostile
                        </div>
                    </div>
                    <div className="metric-card border-none border-l border-dark-border p-4 hover:border-primary/50 transition-colors bg-dark-card">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary">auto_awesome</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Synthesis</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">Merge validated outputs into a final reasoning artifact with confidence scores.</p>
                        <div className="code-snippet font-mono text-slate-500 text-xs bg-dark-muted p-2 border border-dark-border rounded">
                            $ axiom synthesize --format=pdf
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 max-w-[1440px] mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                    <div className="inline-block px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-mono font-bold rounded mb-4">MODULE: ISOLATION</div>
                    <h2 className="text-4xl mb-4 font-display font-extrabold tracking-tight text-white">Isolation Beats Memory</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">Context isolation via subagents is preferred over long-term memory. Failures are contained, and noise never reaches the orchestrator.</p>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 border border-dark-border rounded bg-dark-card/50">
                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                            <div>
                                <div className="font-bold text-sm mb-1 text-white">Fresh Context Windows</div>
                                <div className="text-xs text-slate-500">Each subagent starts clean. No token pollution.</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 border border-dark-border rounded bg-dark-card/50">
                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                            <div>
                                <div className="font-bold text-sm mb-1 text-white">Explicit Discarding</div>
                                <div className="text-xs text-slate-500">Failed attempts and internal chain-of-thought are discarded.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-dark-card border border-dark-border p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-4 border-b border-dark-border pb-3">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-[11px] font-mono uppercase text-slate-500">Validation Graph</span>
                        </div>
                        <div className="w-full h-48 bg-dark relative overflow-hidden rounded border border-dark-border/50">
                             <DotGrid
                                size={2}
                                gapY={16}
                                gapX={16}
                                strokeWidth={0}
                                sizeRange={1}
                                opacityRange={0.5}
                                shape="circle"
                                colorFill="#3B82F6"
                                colorStroke="#000000"
                                colorBack="#000000"
                                className="w-full h-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-dark/80 backdrop-blur px-3 py-1 rounded text-xs font-mono text-primary border border-primary/30">
                                    Graph Validated
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-[60px]"></div>
                        <div className="flex items-center gap-2 mb-6 opacity-60">
                             <span className="material-symbols-outlined text-white text-xl">format_quote</span>
                        </div>
                        <p className="text-lg font-medium text-white italic mb-6">"Finally, a research tool that cites its sources properly. The adversarial validation layer caught errors I missed."</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-dark-muted border border-dark-border flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-500">person</span>
                            </div>
                            <div>
                                <div className="font-bold text-xs text-white">Dr. Elena S.</div>
                                <div className="text-[10px] font-mono text-primary">SENIOR_RESEARCHER</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 bg-dark-card border-y border-dark-border">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl mb-2 font-display font-extrabold tracking-tight text-white">Built on rock-solid foundations</h2>
                        <p className="text-sm text-slate-400">The core primitives of fast, reliable and consistent research execution.</p>
                    </div>
                    <button className="text-xs font-mono font-bold text-primary border-b border-primary pb-0.5">
                        VIEW_SYSTEM_ARCHITECTURE.pdf
                    </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-border border border-dark-border">
                    <div className="bg-dark p-6 hover:bg-dark-muted transition-colors">
                        <span className="material-symbols-outlined text-primary mb-4">memory</span>
                        <h3 className="text-sm font-bold mb-2 uppercase tracking-tight text-white">Vector Store</h3>
                        <p className="text-[13px] text-slate-500 leading-relaxed">Semantic chunks of subagent outputs. Retrieval and cross-checking backbone.</p>
                    </div>
                    <div className="bg-dark p-6 hover:bg-dark-muted transition-colors">
                        <span className="material-symbols-outlined text-primary mb-4">schema</span>
                        <h3 className="text-sm font-bold mb-2 uppercase tracking-tight text-white">Metadata Store</h3>
                        <p className="text-[13px] text-slate-500 leading-relaxed">Relational tracking of task IDs, confidence scores, and assumptions.</p>
                    </div>
                    <div className="bg-dark p-6 hover:bg-dark-muted transition-colors">
                        <span className="material-symbols-outlined text-primary mb-4">security</span>
                        <h3 className="text-sm font-bold mb-2 uppercase tracking-tight text-white">Safety</h3>
                        <p className="text-[13px] text-slate-500 leading-relaxed">Explicit uncertainty modeling. Ambiguity is surfaced, not hidden.</p>
                    </div>
                    <div className="bg-primary/10 p-6 relative">
                        <span className="material-symbols-outlined text-primary mb-4">psychology</span>
                        <h3 className="text-sm font-bold mb-2 uppercase tracking-tight text-white">Thinking Mode</h3>
                        <p className="text-[13px] text-primary/80 leading-relaxed font-medium">Gemini-class reasoning model enabled for deep task decomposition.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-6 py-20">
            <div className="bg-dark border border-dark-border rounded-lg overflow-hidden relative">
                <div className="grid lg:grid-cols-2">
                    <div className="p-12 relative z-10 bg-dark/80 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="bg-primary text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold">Status: ACTIVE</span>
                            <span className="text-slate-500 text-[10px] font-mono">Build 0x4F92B</span>
                        </div>
                        <h2 className="text-5xl mb-8 font-display font-extrabold tracking-tight text-white">Research in the AI era</h2>
                        <a className="inline-flex items-center gap-2 text-primary font-mono text-sm font-bold hover:gap-4 transition-all" href="#">
                            WATCH_DEMO.sh
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                    </div>
                    <div className="relative min-h-[350px] bg-black">
                        <Metaballs
                            speed={0.3}
                            count={8}
                            size={0.6}
                            scale={1.5}
                            colors={['#1E1E24', '#2A2A35', '#3B82F6', '#1E1E24', '#000000']}
                            colorBack="#000000"
                            className="w-full h-full opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/40 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-24 border-t border-dark-border grid-pattern">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/30 text-primary flex items-center justify-center mx-auto mb-6 rounded-sm">
                        <span className="material-symbols-outlined">terminal</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl mb-4 leading-tight font-display font-extrabold tracking-tight text-white">So good, you'll cite it on purpose</h2>
                    <p className="text-lg text-slate-400">Ready for modern research execution? Join the waitlist today.</p>
                </div>
                <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden flex flex-col md:flex-row items-stretch">
                    <div className="p-8 md:w-3/5 bg-dark">
                        <div className="text-[11px] font-mono text-slate-500 mb-6 uppercase tracking-widest">Core Capabilities</div>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Multi-step reasoning validation
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Epistemic rigor &gt; Fluency
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Transparent reasoning traces
                            </li>
                        </ul>
                    </div>
                    <div className="p-8 md:w-2/5 flex flex-col items-center justify-center bg-dark-card border-l border-dark-border">
                        <button onClick={onWaitlistClick} className="w-full bg-primary text-white py-4 px-6 rounded-sm font-bold text-sm mb-6 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">Request Access</button>
                        <div className="flex -space-x-2">
                            <img alt="Avatar" className="w-8 h-8 rounded-sm border border-dark-border" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_pmLcvdPR67LNzXI-RuVcQapaMQlyw6tl_8R8Bu8VnPfRr-mzXP3HF0cTb0F-t_jX0cEfV_43y31zzcdKFCnmElUT2XojvOvKLR1LMX8sZpoQXRaZzPHlWrxFyCShYOqFAzrgFDrdEgYqjks4xTmtIGqbFKC3BrrZmT28Oi313wcKdZ0JzpgkgQCWAZB2quL9RK2CWj4C1QQZ6xvrXRJbtpngQQgHScOECD0h6tB0Hr5H6FoiSnjT4K0e-lAkMWH94Bif3aArPQ"/>
                            <img alt="Avatar" className="w-8 h-8 rounded-sm border border-dark-border" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhHGUMp52WnRXThSCnw1_zUC5I3d00TRJbHH1aZxYNF6q25vkK8hIqJqkWtwjBNIhvtPwn5UAaaB_xgPyHe6DGQ0uxLu2rf6bUC4P3GQGLqcwDqjH2dAelg1d9TbSY7SnYxfI5JNIIJbipjgYNPLqZvvYRSodoKJpJafc-obIvnraPiTEgu4aVZMQEwlbeR29yQgGJYXprgQK1Ch6LhHy8OfdAMliOddEY9iAMDV4ymJ4MIfvVJtL2YZMbYgiXhWSPD7qmSdYHrA"/>
                            <img alt="Avatar" className="w-8 h-8 rounded-sm border border-dark-border" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj9fpBFdFekzksMqCdGMMU02p4RA-Z0R8idJemTTYFrmn8iyRp18yB8K6CQ7OiVHvsX9nYitI5UZ8LWzVvRnSCD-WRjbhfPlvjB__5ZKWiPtBArRTgzB6g0Obg5DXxU26dJWfAfQdFbfyRMB3c6liDChBvyTZdNUld1vHaXirdsII4fytI4XQak5iUsHEJhVwQpbuz5VJuXCLNOrgWXJvpZ0P0-JdHhs1mILk9ws3Xl9_YFPKkxy8hVVSWYWpHKYh2XTfzfI8GvA"/>
                            <div className="w-8 h-8 rounded-sm bg-dark-muted flex items-center justify-center text-[9px] font-mono font-bold border border-dark-border text-slate-400">+128</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer className="bg-dark-card border-t border-dark-border py-20">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-primary flex items-center justify-center rounded-xs">
                                <span className="material-symbols-outlined text-dark text-lg font-bold">hub</span>
                            </div>
                            <span className="font-display font-extrabold text-white tracking-tighter">AXIOM-ONE</span>
                        </div>
                        <p className="text-[11px] font-mono text-slate-600 mb-6 uppercase">© 2024 AXIOM-ONE Research Systems.<br/>All systems operational.</p>
                        <div className="flex gap-4">
                            <a className="text-slate-600 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-xl">terminal</span></a>
                            <a className="text-slate-600 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-xl">hub</span></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-mono text-[10px] text-slate-500 mb-6 uppercase tracking-widest">/Product</h4>
                        <ul className="space-y-3 text-sm text-slate-400 font-medium">
                            <li><a className="hover:text-primary transition-colors" href="#">Task Decomposer</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Subagent Engine</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Validation</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Synthesis</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Changelog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-mono text-[10px] text-slate-500 mb-6 uppercase tracking-widest">/Learn</h4>
                        <ul className="space-y-3 text-sm text-slate-400 font-medium">
                            <li><a className="hover:text-primary transition-colors" href="#">Manifesto</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Case Studies</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Research Blog</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Community</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-mono text-[10px] text-slate-500 mb-6 uppercase tracking-widest">/Company</h4>
                        <ul className="space-y-3 text-sm text-slate-400 font-medium">
                            <li><a className="hover:text-primary transition-colors" href="#">About</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Privacy</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Status</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
}
