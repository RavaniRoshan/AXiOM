import React from 'react';

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
            system_update: The post-mortem problem // Join us February 18th
        </div>

        <nav className="sticky top-0 z-50 bg-dark/90 backdrop-blur-md border-b border-dark-border">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-14">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-primary flex items-center justify-center rounded-sm">
                                <span className="material-symbols-outlined text-dark text-xl font-bold">bolt</span>
                            </div>
                            <span className="font-display font-extrabold text-lg tracking-tighter text-white">incident.io</span>
                        </div>
                        <div className="hidden md:flex items-center gap-6 text-[13px] font-semibold text-slate-400">
                            <a className="hover:text-primary transition-colors flex items-center gap-1" href="#">Products <span className="material-symbols-outlined text-[14px]">expand_more</span></a>
                            <a className="hover:text-primary transition-colors" href="#">Solutions</a>
                            <a className="hover:text-primary transition-colors" href="#">Resources</a>
                            <a className="hover:text-primary transition-colors" href="#">Customers</a>
                            <a className="hover:text-primary transition-colors" href="#">Pricing</a>
                            <a className="hover:text-primary transition-colors" href="#">Careers</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={onLoginClick} className="text-[13px] font-semibold hover:text-primary">Login</button>
                        <button onClick={onWaitlistClick} className="bg-primary text-white px-4 py-1.5 rounded-sm text-[13px] font-bold hover:bg-accent transition-colors">Request demo</button>
                    </div>
                </div>
            </div>
        </nav>

        <section className="relative pt-16 pb-20 grid-pattern border-b border-dark-border">
            <div className="max-w-[1440px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-primary/10 border border-primary/20 rounded text-primary text-[10px] font-mono mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        VERSION 2.4.0-STABLE
                    </div>
                    <h1 className="text-5xl md:text-7xl mb-6 leading-[1.05] font-display font-extrabold tracking-tight text-white">
                        Move <span className="text-primary italic">fast</span> when<br/>you break things
                    </h1>
                    <p className="text-lg text-slate-400 max-w-xl mb-10 leading-relaxed font-sans">
                        The all-in-one AI platform for on-call, incident response, and status pages—built for fast-moving teams.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={onWaitlistClick} className="bg-primary text-white px-6 py-3 rounded-sm font-bold text-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">Get a demo</button>
                        <button onClick={onWaitlistClick} className="bg-transparent border border-dark-border text-white px-6 py-3 rounded-sm font-bold text-sm hover:bg-dark-muted transition-all">Start a free trial</button>
                    </div>
                    <div className="mt-8 flex gap-6 text-[11px] font-mono text-slate-500">
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary">terminal</span> SDK available</span>
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary">api</span> GraphQL API</span>
                    </div>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-dark-card border border-dark-border rounded-lg overflow-hidden shadow-2xl">
                        <div className="flex items-center gap-1.5 px-4 py-3 bg-dark-muted border-b border-dark-border">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                            <div className="ml-4 text-[10px] font-mono text-slate-500">incident-dashboard-v1.local</div>
                        </div>
                        <img alt="Platform Dashboard Mockup" className="w-full grayscale brightness-90 contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsiYQVIAzwXgxqPjiNc0JoCU8JjaYKKBxS1yoIjEm2Hl7UDeSc1fBvHMVMIjpuALp-IVvidg9JGBOiAmkapwIC3NyYfAggZ7_0KrIAteYZDKXmVTjTEn_72MSwkQDjpbmgSsmkBiXrkqpFQ6_Gjlq9OGypK_MhUCIoAUnnpIZeARAIE4RUyFCP6yV6Mdu0EywaEdm1mRDLrfwRC_nmt-wBIq9_fniERVGhAgNHPxzyrLtH_8A5jo3nQsTKrpxNzlwec2SmO7Bn1w"/>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-8 bg-dark-card border-b border-dark-border overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="flex flex-wrap justify-between items-center gap-8 opacity-40 grayscale contrast-150">
                    <img alt="Netflix" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmnSRCcs8nMEttBIhoMuvsnp3HlBmYfib-kJh83ufihqTEEwvjk7K4LT0NnVk5iY_fWm3gK5UecyuS8R09mjur2bCxIy_gnM8tql2hrUigW785IXJfB_Rd_v3gQOZRIgmrzHwMZmomylVgMLmOieFW-LZlkIRuMvt01Oqh5QFU83hPfMo7I81_nKjTErRLPHgA2XRP9N73bVEQpAHM8WwvuvDWohCvoEWoxT6I-j5aKs-qGFF3gwwESvT10o6EJYCTpmkRWkLrhg"/>
                    <img alt="Etsy" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9ZLndlk-hkof0aBPtqNwOZUheuhrDltJkXcjrApRefkq4MXGa1NKRYT4Q-BQ5qjGv58NIjgkBADaZ5qO0avAT-MPr28B9JqmhhphoFmiUKGVwuO9ZJrQObgbH-UU8LOKO63gBitOicWqkj5TtENJ4TB1fnSgzzuEwgeJ4gLP2Ywnc-pi-TTC5VNPAPZD9aI3urJKL0HvSNhoeSD7wNcLL05K0rqQ5VnPo2Isp94Nb57rZI3_EcPqP_g50On8Fyuf8-mRthpR4-g"/>
                    <img alt="Hashicorp" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbqV4oSqHxyT-k1BKHgGwyl1iFKJC71TF9YwhDR8Bzhfbtf5QvmQwMN3TKaWduC_1igvyCmlKKhyMGNamodyVXN6RDjKw3hl_BSvewu0SFshNXQK-f8unt03iDm_SmCvD_yHs6bc3eSXwebkMQMHtUzZnS-BpQkZjFBkEFuwh7jX6zSpYqsqVHLttyQXOI2mgqUdO_KjycBdGE9vNrSCwf2IwGzUyR-un_ScAqJFp2r_A4c5VxZ0iiW9WttsaR1kDHHn_eV8Xm6g"/>
                    <img alt="Intercom" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3v51EtGkPUXOSjCdIq2mNMXwH1UpMW0p59n1baK2V4uBKzrs-OTn2w2v_GmxXTIaQiWQpcGXSuY2CmiGBk0jfvZvH0fw0INhERvznllUl2cLIAw1S_S_JZ3tADePD3RYT431gVtpaFnOFKDOwkerLP1PGmk6yfAyzT9AD2QLyDcc1d2jatjJfrHiSrpv9PFUTpKtwKqLs6vDfQne96d0saz_0HtOw4zBIiNpc1U7Fg-veIwfrj86Uy5iObxhXqbZg3mJP30edYg"/>
                    <img alt="Amazon" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd-p1RbjBpJ67ZU6LZ3bOjs9NVRBdVbAlnMSTYeIWhedeRsJmRWbSgjkRz-hnwqCKq8nKTEkD8USOQXpgemW8XCU_rowGeCrExxTJr6eMgMM0cX30EcHh9p1RgvZw8mYq6BmFX-yt1H45LQf9_QF9yrNlJ6yKPSkqW53AV3rgOMOSM0z0_pEdptIfMK98wIue29MbEMldgQnkLqh7rihLhsEzsdS9tzPK2chK8VyLSo_HBvRjGXitvcE4t-7BNtk_AG6CzjyPLWQ"/>
                    <img alt="LinkedIn" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBac_FYauTKtDPfk_BpUdD6Uyqi1YwH49F-PX7FhvnUtWf307sIcv9kyGGsazQfDjpDOLxNfKHEQAgxvPjIT0iUpwaPbDe9VJ1AV4iaOPg8QJ0Ul8QytBScguUb3Ut5sJ2Kg68WakBaPJyM6PDOxYJNinkHNCvUsA3XXv9oE2vIKNg86maVY_xeyQKXIzkkSrsZUeWIelCvZAGXJHeoIbk-yqPwhluA7RrOQYjWxvYZZHR_4MFsFSAoWrPoK8b9aqngI0DVd0xTiA"/>
                    <img alt="Lufthansa" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9yOmU8awaG5mNOXJoCp8H7lYnSx5XqUopg2vpbEMIEEp6SKfAMUeialyE_17aNM6ZZ3ycAdBPD6jZl8Ww1zAZMjQHiirgTggdY6iSxa6msOtLhCkflsLMl9ThVMN4N73FON1dEO_4kn-pu_O0PTuYLo-H61t_rArnmnumVjtBMsJtlplbKFsJgDGlFJMn8LSlSzPc-KIY2Rxa_Qvciukv98DeuQp8avSsgQtZqLd3Kxqb_W9GzF20yI7Mi3zhow8Ye7qajb8zqg"/>
                    <img alt="Google" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr6y12Ccw1pJIXIYJ2GDOX9rQp3bjuFF5MGhvEo8WTVbBdgZruWr-_9xEpr6_OcrcS968IiGqK6WkPpu4Hwju94x--tcDyBcI8mPSxS5qju4oj8SQ9Ldopi1F5gJzqypulo2PJs7h_zrYRUtsFeg7UEvXgpNkKLhbxHWH0oVWli7jNZkF4gScVr0bAdtRQ5c5JjWiR8V4WOo9nR3r44_EC2qR0-hMYAG7Zr5njc8jERo3JV2mZUSkyBcfqPhbDepDY_3PbAYT4rQ"/>
                </div>
            </div>
        </section>

        <section className="py-16 max-w-[1440px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-1 px-1 bg-dark-border border border-dark-border rounded overflow-hidden">
                <div className="lg:col-span-5 bg-dark p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-0.5 text-primary mb-4">
                            <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                            <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                            <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                            <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                            <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                        </div>
                        <h2 className="text-3xl mb-4 font-display font-extrabold tracking-tight text-white">We're the leading incident management platform</h2>
                        <p className="text-sm text-slate-400 mb-8">Loved by hundreds of the world's fastest growing teams. High satisfaction, low friction.</p>
                    </div>
                    <div>
                        <button className="flex items-center gap-2 text-xs font-mono font-bold text-primary hover:translate-x-1 transition-transform">
                            READ_REVIEWS.md
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                        <div className="mt-8 flex gap-3">
                            <div className="h-12 w-12 bg-dark-muted border border-dark-border rounded p-1.5 flex items-center justify-center grayscale">
                                <img alt="G2 Stars" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLzKHb3mBdHCRV_vIUs8hE8Ri2zcqXyIftA3VCzC0s3OqUn9FLYIxT_cXtA0VBEcMXRnxe7uDgxPXs7EXnlk9FahnNX-2966vme4AMoGOhz4kJd2QAhWBDVoyJqIKF0pF0BV9fmkuEGmZjbuimZrAqC64dzwIPq-HAIgS5UyUEZNgMKvVI8f0ktfhUv6-8iu11lYA8VugUoU8d3hghlMqOZyl1TwRQCFoX3INY9vSVC4ODVOMSVfm2ZEb9OJJHmkB_D-eDRn9XFg"/>
                            </div>
                            <div className="h-12 w-12 bg-dark-muted border border-dark-border rounded p-1.5 flex flex-col items-center justify-center text-[8px] font-mono leading-tight text-center">
                                <span className="text-primary font-bold">BEST ROI</span>
                                <span className="text-slate-500">2024</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-7 bg-dark-card p-0 relative min-h-[400px]">
                    <img alt="Satisfaction Grid" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcV79mIAKmDAKJgVZ_VfPRk95WmrAVe-w7954JNg_SWoJe9al_KVf0gTLsV6_JLsWa78egCQ6ib6kBKzWqqk8aIwZgs-r3UJqCv8n_Mrekd1I702jKq8qlW5sCIK52za62Qn3yhwdISoxOl8ZXwWpfJGPDlexy6ORyp63Uvkh2fyniKAd78YdVyxwSXTXstcTn-UrvSFriTs2fMkL8ixx1niCJdkGCGpL7nsSlYuRygUVdEjzDrtSzUIkKAoJZxb6UeMuseFjO4w"/>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="bg-primary/20 p-6 rounded-full border border-primary/40 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                            <span className="material-symbols-outlined text-4xl text-primary">query_stats</span>
                        </div>
                        <div className="mt-6 text-center">
                            <div className="text-[10px] font-mono text-primary mb-1 uppercase tracking-widest">Performance Matrix</div>
                            <div className="text-xl font-display font-bold text-white">Market-Leading Reliability</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-dark border-y border-dark-border py-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-10 p-2 bg-red-900/40 border border-red-500/50 rounded font-mono text-[10px] text-red-200">ALERT: "It's mining crypto"</div>
                <div className="absolute top-1/2 right-20 p-2 bg-red-900/40 border border-red-500/50 rounded font-mono text-[10px] text-red-200">SEV1: "Again???"</div>
                <div className="absolute bottom-1/4 left-1/3 p-2 bg-red-900/40 border border-red-500/50 rounded font-mono text-[10px] text-red-200">CRITICAL: "CPU is at 400%"</div>
                <div className="absolute top-1/3 right-1/4 p-2 bg-red-900/40 border border-red-500/50 rounded font-mono text-[10px] text-red-200">STATUS: "That's not possible"</div>
            </div>
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl mb-6 font-display font-extrabold tracking-tight text-white">Things go <span className="text-primary italic underline decoration-primary/30 underline-offset-8">wrong.</span> All the time.</h2>
                <p className="text-lg text-slate-400 max-w-xl mx-auto">From minor issues to global outages, incidents are inevitable. But chaos doesn't have to be.</p>
            </div>
        </section>

        <section className="py-20 bg-dark-card border-b border-dark-border">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="mb-12 border-l-2 border-primary pl-6">
                    <div className="text-[11px] font-mono text-primary mb-2 uppercase tracking-widest">Centralized Ops</div>
                    <h2 className="text-3xl mb-2 font-display font-extrabold tracking-tight text-white">Meet the <span className="italic text-primary">incident command center</span></h2>
                    <p className="text-sm text-slate-400">Low-latency resolution for high-performance teams.</p>
                </div>
                <div className="grid lg:grid-cols-4 gap-0 border border-dark-border rounded overflow-hidden">
                    <div className="metric-card border-none bg-primary/10 border-r-2 border-primary/50 p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary">notifications_active</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">On-call</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">Get the right people in the room instantly. Integrated escalation policies.</p>
                        <div className="code-snippet font-mono text-xs bg-dark-muted p-2 border border-dark-border rounded">
                            $ inc on-call status --active
                        </div>
                    </div>
                    <div className="metric-card border-none border-l border-dark-border p-4 hover:border-primary/50 transition-colors bg-dark-card">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary">bolt</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Response</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">Run your incident end-to-end. Slack-native workflows and automated timelines.</p>
                        <div className="code-snippet font-mono text-slate-500 text-xs bg-dark-muted p-2 border border-dark-border rounded">
                            $ inc response list-active
                        </div>
                    </div>
                    <div className="metric-card border-none border-l border-dark-border p-4 hover:border-primary/50 transition-colors bg-dark-card">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary">auto_awesome</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">AI SRE</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">Resolve incidents in record time with LLM-powered context synthesis.</p>
                        <div className="code-snippet font-mono text-slate-500 text-xs bg-dark-muted p-2 border border-dark-border rounded">
                            $ inc ai analyze-trace 0x42
                        </div>
                    </div>
                    <div className="metric-card border-none border-l border-dark-border p-4 hover:border-primary/50 transition-colors bg-dark-card">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary">public</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Status Pages</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">Keep customers in the loop effortlessly with multi-channel updates.</p>
                        <div className="code-snippet font-mono text-slate-500 text-xs bg-dark-muted p-2 border border-dark-border rounded">
                            $ inc status publish --public
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 max-w-[1440px] mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                    <div className="inline-block px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-mono font-bold rounded mb-4">MODULE: ON_CALL</div>
                    <h2 className="text-4xl mb-4 font-display font-extrabold tracking-tight text-white">On-call gets the right people in the room</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">On-call designed for humans—effortless scheduling, a delightful on-call experience, and powered by AI to cut noise and reduce pages.</p>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 border border-dark-border rounded bg-dark-card/50">
                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                            <div>
                                <div className="font-bold text-sm mb-1 text-white">Dynamic Routing</div>
                                <div className="text-xs text-slate-500">Route alerts based on service ownership and metadata.</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 border border-dark-border rounded bg-dark-card/50">
                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                            <div>
                                <div className="font-bold text-sm mb-1 text-white">Noise Suppression</div>
                                <div className="text-xs text-slate-500">Group related alerts into single incidents automatically.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-dark-card border border-dark-border p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-4 border-b border-dark-border pb-3">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-[11px] font-mono uppercase text-slate-500">Visual Timeline</span>
                        </div>
                        <img alt="Dashboard" className="rounded border border-dark-border brightness-75 grayscale hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrt_iH8y7oTm7uIzhKj8QrS1JzdF8jiQnapmSsyNLPsycK_QqwOAUCCwUT7BIJwQ10S1-f4LBPEpobAtPbZXwoo9NWNFcKfH2FZuIS6edCR0YKRv0qmxMARPNAqCcomr3t_9sL49AXFWxrHwibWqtwoPf5Y0-NN6B3CvAU6TT-0AbV1zBWjua7HfiSe1ytdkIjYgFzLl2fBwfuuu230t3YT3aL6S5DG4hZ_LLXpap4jQLAiAsIMd5jWaNnrcjp71NcYJSduuX3Ug"/>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-[60px]"></div>
                        <img alt="Intercom" className="h-5 mb-6 opacity-60 grayscale brightness-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP_ZRX09n4rOdDuD5wrEJJhcRx4HgXxOp6NClpCKPAxWyv4VibF9Di_3rnzr_QnGHSE8Zv0FlU9xK8AYN04ciUW1ZDFkfOLwG7DHis56mRAdFdP-s9QnB82aAOOIDVX2CKFOLnWbp59d2kq_-VCTFwKRMAGZBgstk76G2rIqtKk_kyN7quijE70lu8r0fBg-qXbLTE4dUbrKG-iLx-atcdTtymyA2MOuKe6Te64o46-rR9MWNHglmXLyivH9wb3w00agHyTNYqDg"/>
                        <p className="text-lg font-medium text-white italic mb-6">"Nobody likes getting paged, but incident.io makes it painless—you get to the work that matters fast."</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-dark-muted border border-dark-border"></div>
                            <div>
                                <div className="font-bold text-xs text-white">Brian Scanlan</div>
                                <div className="text-[10px] font-mono text-primary">SENIOR_PRINCIPAL_ENGINEER</div>
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
                        <p className="text-sm text-slate-400">The core primitives of fast, reliable and consistent incident management.</p>
                    </div>
                    <button className="text-xs font-mono font-bold text-primary border-b border-primary pb-0.5">
                        VIEW_SYSTEM_ARCHITECTURE.pdf
                    </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-border border border-dark-border">
                    <div className="bg-dark p-6 hover:bg-dark-muted transition-colors">
                        <span className="material-symbols-outlined text-primary mb-4">view_agenda</span>
                        <h3 className="text-sm font-bold mb-2 uppercase tracking-tight text-white">Catalog</h3>
                        <p className="text-[13px] text-slate-500 leading-relaxed">Put the right context at your team's fingertips, instantly. Service graphs and dependencies.</p>
                    </div>
                    <div className="bg-dark p-6 hover:bg-dark-muted transition-colors">
                        <span className="material-symbols-outlined text-primary mb-4">account_tree</span>
                        <h3 className="text-sm font-bold mb-2 uppercase tracking-tight text-white">Workflows</h3>
                        <p className="text-[13px] text-slate-500 leading-relaxed">Automate incident processes and stay consistent at scale. If-this-then-that engine.</p>
                    </div>
                    <div className="bg-dark p-6 hover:bg-dark-muted transition-colors">
                        <span className="material-symbols-outlined text-primary mb-4">bar_chart</span>
                        <h3 className="text-sm font-bold mb-2 uppercase tracking-tight text-white">Insights</h3>
                        <p className="text-[13px] text-slate-500 leading-relaxed">Understand MTTR trends, reduce alert noise, and improve response times via data.</p>
                    </div>
                    <div className="bg-primary/10 p-6 relative">
                        <span className="material-symbols-outlined text-primary mb-4">auto_awesome</span>
                        <h3 className="text-sm font-bold mb-2 uppercase tracking-tight text-white">AI Engine</h3>
                        <p className="text-[13px] text-primary/80 leading-relaxed font-medium">Intelligence, context and power at the core of every incident lifecycle.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-6 py-20">
            <div className="bg-dark border border-dark-border rounded-lg overflow-hidden relative">
                <div className="grid lg:grid-cols-2">
                    <div className="p-12 relative z-10 bg-dark/80 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="bg-red-600 text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold">Priority: SEV0</span>
                            <span className="text-slate-500 text-[10px] font-mono">0x4F92B</span>
                        </div>
                        <h2 className="text-5xl mb-8 font-display font-extrabold tracking-tight text-white">Incident response in the AI era</h2>
                        <a className="inline-flex items-center gap-2 text-primary font-mono text-sm font-bold hover:gap-4 transition-all" href="#">
                            WATCH_RECORDINGS.sh
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                    </div>
                    <div className="relative min-h-[350px]">
                        <img alt="Conference Speakers" className="absolute inset-0 w-full h-full object-cover grayscale opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtvoZpoS48S5jcKtaSIsc8Y0t2MRnyDUJsI4CQ58ZvD-BcQ6IuZVlR8MLKLoTLZxdekBzJwOGiiebtnlszyluoLeXSzlxx7uTXHdQ3katpYd5TMoJG8rgc4EdvQYtM3-7ek0nKRd6OvY37cylr17WrzPRExK2OZp2eBQSc7hdq3wjdffU_jS-Nwp68rivDiMoT6-QmrlwdisI5mzRPcXP2SoWz3M102_NNRhGvcInaUWTe1-_OEJaREiTmDOxMg2s895UqMahDFA"/>
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
                    <h2 className="text-4xl md:text-5xl mb-4 leading-tight font-display font-extrabold tracking-tight text-white">So good, you'll break things on purpose</h2>
                    <p className="text-lg text-slate-400">Ready for modern incident management? Book a call with one of our experts today.</p>
                </div>
                <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden flex flex-col md:flex-row items-stretch">
                    <div className="p-8 md:w-3/5 bg-dark">
                        <div className="text-[11px] font-mono text-slate-500 mb-6 uppercase tracking-widest">Discussion Topics</div>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                All-in-one incident management
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Our unmatched speed of deployment
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Security and Compliance (SOC2/HIPAA)
                            </li>
                        </ul>
                    </div>
                    <div className="p-8 md:w-2/5 flex flex-col items-center justify-center bg-dark-card border-l border-dark-border">
                        <button onClick={onWaitlistClick} className="w-full bg-primary text-white py-4 px-6 rounded-sm font-bold text-sm mb-6 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">Get a demo</button>
                        <div className="flex -space-x-2">
                            <img alt="Avatar" className="w-8 h-8 rounded-sm border border-dark-border" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_pmLcvdPR67LNzXI-RuVcQapaMQlyw6tl_8R8Bu8VnPfRr-mzXP3HF0cTb0F-t_jX0cEfV_43y31zzcdKFCnmElUT2XojvOvKLR1LMX8sZpoQXRaZzPHlWrxFyCShYOqFAzrgFDrdEgYqjks4xTmtIGqbFKC3BrrZmT28Oi313wcKdZ0JzpgkgQCWAZB2quL9RK2CWj4C1QQZ6xvrXRJbtpngQQgHScOECD0h6tB0Hr5H6FoiSnjT4K0e-lAkMWH94Bif3aArPQ"/>
                            <img alt="Avatar" className="w-8 h-8 rounded-sm border border-dark-border" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhHGUMp52WnRXThSCnw1_zUC5I3d00TRJbHH1aZxYNF6q25vkK8hIqJqkWtwjBNIhvtPwn5UAaaB_xgPyHe6DGQ0uxLu2rf6bUC4P3GQGLqcwDqjH2dAelg1d9TbSY7SnYxfI5JNIIJbipjgYNPLqZvvYRSodoKJpJafc-obIvnraPiTEgu4aVZMQEwlbeR29yQgGJYXprgQK1Ch6LhHy8OfdAMliOddEY9iAMDV4ymJ4MIfvVJtL2YZMbYgiXhWSPD7qmSdYHrA"/>
                            <img alt="Avatar" className="w-8 h-8 rounded-sm border border-dark-border" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj9fpBFdFekzksMqCdGMMU02p4RA-Z0R8idJemTTYFrmn8iyRp18yB8K6CQ7OiVHvsX9nYitI5UZ8LWzVvRnSCD-WRjbhfPlvjB__5ZKWiPtBArRTgzB6g0Obg5DXxU26dJWfAfQdFbfyRMB3c6liDChBvyTZdNUld1vHaXirdsII4fytI4XQak5iUsHEJhVwQpbuz5VJuXCLNOrgWXJvpZ0P0-JdHhs1mILk9ws3Xl9_YFPKkxy8hVVSWYWpHKYh2XTfzfI8GvA"/>
                            <div className="w-8 h-8 rounded-sm bg-dark-muted flex items-center justify-center text-[9px] font-mono font-bold border border-dark-border text-slate-400">+12</div>
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
                                <span className="material-symbols-outlined text-dark text-lg font-bold">bolt</span>
                            </div>
                            <span className="font-display font-extrabold text-white tracking-tighter">incident.io</span>
                        </div>
                        <p className="text-[11px] font-mono text-slate-600 mb-6 uppercase">© 2024 Pinepple Technology Ltd.<br/>All systems operational.</p>
                        <div className="flex gap-4">
                            <a className="text-slate-600 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-xl">terminal</span></a>
                            <a className="text-slate-600 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-xl">hub</span></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-mono text-[10px] text-slate-500 mb-6 uppercase tracking-widest">/Product</h4>
                        <ul className="space-y-3 text-sm text-slate-400 font-medium">
                            <li><a className="hover:text-primary transition-colors" href="#">On-call</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Response</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Status Pages</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">AI Engine</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Changelog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-mono text-[10px] text-slate-500 mb-6 uppercase tracking-widest">/Learn</h4>
                        <ul className="space-y-3 text-sm text-slate-400 font-medium">
                            <li><a className="hover:text-primary transition-colors" href="#">Engineering Blog</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Case Studies</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Comparisons</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Slack Community</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-mono text-[10px] text-slate-500 mb-6 uppercase tracking-widest">/Company</h4>
                        <ul className="space-y-3 text-sm text-slate-400 font-medium">
                            <li><a className="hover:text-primary transition-colors" href="#">Legal</a></li>
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
