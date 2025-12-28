
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { runResearchAxiom } from './services/geminiService';
import { ResearchStatus } from './types';

// --- Utility Components ---

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border border-border bg-surface text-text-secondary uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  className = "",
  type = "button"
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'ghost', 
  onClick?: () => void,
  disabled?: boolean,
  className?: string,
  type?: 'button' | 'submit' | 'reset'
}) => {
  const base = "px-6 py-2.5 rounded-full font-semibold transition-all duration-200 text-sm flex items-center justify-center gap-2 tracking-tight";
  const styles = {
    primary: "btn-axiom shadow-lg shadow-accent-main/10", 
    secondary: "bg-surface border border-border text-text hover:border-accent-highlight hover:text-accent-highlight",
    ghost: "bg-transparent text-text-secondary hover:text-text hover:bg-surface/50"
  };
  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- New Section Components ---

// 1. Bento Grid Component
const BentoCard = ({ 
  title, 
  description, 
  icon, 
  colSpan = 1, 
  children,
  delay = 0
}: { 
  title: string, 
  description: string, 
  icon?: string, 
  colSpan?: number,
  children?: React.ReactNode,
  delay?: number
}) => {
  return (
    <div 
      className={`bento-card group relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 transition-all duration-500 hover:z-10 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(var(--accent-color-rgb),0.3)] hover:border-accent-highlight ${colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'}`}
      style={{ '--accent-color-rgb': '0, 112, 243' } as React.CSSProperties}
    >
       {/* Background Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent-highlight/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
      
      {/* Icon */}
      {icon && (
        <div className="absolute top-8 right-8 text-2xl opacity-20 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110">
          {icon}
        </div>
      )}
      
      <div className="relative z-10 flex h-full flex-col">
        {/* Visual Content Area - Fixed height for consistency */}
        <div className="mb-6 flex-grow relative min-h-[160px] w-full rounded-xl overflow-hidden">
           {children}
        </div>
        
        {/* Text Content */}
        <div className="mt-auto">
          <h3 className="mb-2 text-xl font-bold text-text group-hover:text-accent-highlight transition-colors duration-300">{title}</h3>
          <p className="text-sm font-medium leading-relaxed text-text-secondary group-hover:text-text transition-colors duration-300">{description}</p>
        </div>
      </div>
    </div>
  );
};

const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
      <BentoCard 
        title="Atomic Decomposition" 
        description="Complex queries are broken down into sub-atomic propositions. Each logic gate is verified independently."
        icon="⚛️"
      >
         {/* Atomic Visual: Card within a card concept */}
         <div className="h-full w-full flex items-center justify-center bg-primary/30 rounded-xl border border-border/40 group-hover:bg-primary/50 transition-colors duration-500">
            <div className="relative w-3/4 h-2/3 bg-surface border border-border rounded-lg shadow-sm p-4 flex flex-col gap-3 group-hover:translate-y-[-5px] group-hover:shadow-lg transition-all duration-500">
                <div className="flex justify-between items-center mb-1">
                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                   <div className="text-[10px] font-mono opacity-50">NODE_01</div>
                </div>
                <div className="flex gap-2">
                   <div className="w-8 h-8 rounded border border-border bg-primary/50"></div>
                   <div className="w-8 h-8 rounded border border-border bg-primary/50"></div>
                </div>
                <div className="w-full h-1 bg-border/50 rounded-full mt-auto">
                   <div className="w-2/3 h-full bg-accent-highlight rounded-full"></div>
                </div>
            </div>
            {/* Floating connecting line */}
            <div className="absolute top-1/2 right-4 w-8 h-[2px] bg-accent-highlight/30 group-hover:w-12 transition-all duration-500"></div>
         </div>
      </BentoCard>

      <BentoCard 
        title="Hostile Validation Agents" 
        description="Dedicated sub-agents specifically tasked with finding counter-evidence to the primary hypothesis."
        icon="🛡️"
        colSpan={2}
      >
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-primary/20 to-transparent rounded-xl relative overflow-hidden">
           {/* Grid Background */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           <div className="grid grid-cols-3 gap-6 w-full max-w-lg px-8 relative z-10">
              {/* Skeptic Agent */}
              <div className="flex flex-col items-center gap-2 group-hover:translate-y-2 transition-transform duration-500 delay-75">
                 <div className="px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-bold font-mono shadow-[0_0_15px_rgba(239,68,68,0.2)]">SKEPTIC</div>
                 <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase">Challenge</span>
              </div>
              
              {/* Analyst Agent */}
              <div className="flex flex-col items-center gap-2 group-hover:translate-y-[-5px] transition-transform duration-500">
                 <div className="px-4 py-2 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-500 text-xs font-bold font-mono shadow-[0_0_15px_rgba(59,130,246,0.2)]">ANALYST</div>
                 <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase">Synthesize</span>
              </div>

              {/* Historian Agent */}
              <div className="flex flex-col items-center gap-2 group-hover:translate-y-2 transition-transform duration-500 delay-100">
                 <div className="px-4 py-2 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-500 text-xs font-bold font-mono shadow-[0_0_15px_rgba(168,85,247,0.2)]">HISTORIAN</div>
                 <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase">Context</span>
              </div>
           </div>
        </div>
      </BentoCard>

      <BentoCard 
        title="Traceability Ledger" 
        description="Every claim is cryptographically linked to its source. No hallucination goes untracked."
        icon="🔗"
        colSpan={2}
      >
         <div className="h-full w-full rounded-xl bg-black/80 text-white/90 p-5 font-mono text-[10px] overflow-hidden relative shadow-inner group-hover:shadow-2xl transition-shadow duration-300">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-highlight to-transparent opacity-50"></div>
             <div className="flex justify-between border-b border-white/10 pb-2 mb-3 text-white/40">
                <span>HASH_ID</span>
                <span>CONFIDENCE</span>
                <span>STATUS</span>
             </div>
             {[1,2,3,4].map(i => (
               <div key={i} className="flex justify-between py-2 border-b border-white/5 group-hover:bg-white/5 px-2 rounded transition-colors duration-200">
                  <span className="font-mono text-accent-highlight">0x7F...{i}A9</span>
                  <span className="text-green-400">99.{i}%</span>
                  <span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-300 text-[9px]">VERIFIED</span>
               </div>
             ))}
         </div>
      </BentoCard>

      <BentoCard 
        title="Live Reasoning" 
        description="Watch the thought process in real-time. No black boxes."
        icon="⚡"
      >
         <div className="h-full flex items-center justify-center bg-primary/20 rounded-xl relative overflow-hidden group-hover:bg-primary/30 transition-colors">
            <div className="w-24 h-24 rounded-full border-4 border-accent-highlight/20 border-t-accent-highlight animate-spin relative z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-16 h-16 rounded-full bg-accent-highlight/10 blur-xl animate-pulse"></div>
            </div>
         </div>
      </BentoCard>
    </div>
  );
};

// 2. Process Section Component
const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  // Use simple CSS animation trigger instead of heavy GSAP logic for tab switching
  // to ensure responsiveness and reliability.
  const [animating, setAnimating] = useState(false);

  const handleStepChange = (id: number) => {
    if (activeStep === id) return;
    setAnimating(true);
    setTimeout(() => {
        setActiveStep(id);
        setAnimating(false);
    }, 200); // Wait for fade out
  };

  const steps = [
    { id: 1, title: "Decomposition", desc: "Query is broken into atomic logical units." },
    { id: 2, title: "Execution", desc: "Parallel agents hunt for evidence." },
    { id: 3, title: "Synthesis", desc: "Results are merged and verified." },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-full bg-primary border border-border p-1.5 shadow-inner">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => handleStepChange(step.id)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeStep === step.id 
                  ? 'bg-text text-surface shadow-md scale-105' 
                  : 'text-text-secondary hover:text-text hover:bg-surface/50'
              }`}
            >
              Step {step.id}
            </button>
          ))}
        </div>
      </div>

      <div 
        className={`process-card card-base rounded-[2.5rem] p-8 md:p-12 min-h-[450px] flex flex-col md:flex-row gap-12 items-center transition-all duration-500 hover:shadow-2xl hover:border-accent-highlight/50 ${animating ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}`}
      >
        <div className="md:w-1/2 space-y-8">
          <Badge className="border-accent-highlight/30 text-accent-highlight bg-accent-highlight/5">Process Phase 0{activeStep}</Badge>
          
          <div className="space-y-4">
            <h3 className="text-4xl font-bold tracking-tight text-text">
                {steps[activeStep-1].title}
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed font-medium">
                {activeStep === 1 && "The engine intercepts your raw natural language query. Instead of answering immediately, it maps the semantic space and identifies ambiguity. It constructs a dependency graph of what needs to be known before an answer can be synthesized."}
                {activeStep === 2 && "AXIOM spins up ephemeral sub-agents. One might be parsing PDF tables, another scraping live data, and a third checking for logical fallacies in retrieved documents. This happens in parallel, reducing latency while maximizing rigor."}
                {activeStep === 3 && "The Orchestrator collects all agent outputs. It looks for contradictions. If Agent A says 'True' and Agent B says 'False', a new 'Conflict Resolution' task is spawned. Only resolved, grounded facts make it to the final response."}
            </p>
          </div>

          <div className="pt-2">
             <button className="text-sm font-bold text-text border-b border-text/30 pb-1 hover:border-accent-highlight hover:text-accent-highlight transition-all">
                View Architecture Spec &rarr;
             </button>
          </div>
        </div>
        
        <div className="md:w-1/2 w-full">
           {/* Visual simulation based on step */}
           <div className="rounded-2xl bg-[#0F1115] border border-border/20 p-6 shadow-2xl font-mono text-xs overflow-hidden relative h-[300px] text-gray-300">
              <div className="flex gap-2 mb-6 opacity-50">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-3 relative z-10">
                 {activeStep === 1 && (
                   <>
                     <div className="text-green-400 font-bold">$ query.decompose("Market viability of fusion energy")</div>
                     <div className="opacity-70">> Analyzing semantic structure...</div>
                     <div className="opacity-70">> Found 3 distinct entities.</div>
                     <div className="opacity-70">> Generating sub-queries:</div>
                     <div className="pl-4 text-blue-400 bg-blue-500/10 py-1 rounded w-fit mb-1">[0] "Cost per kWh trends 2020-2025"</div>
                     <div className="pl-4 text-blue-400 bg-blue-500/10 py-1 rounded w-fit">[1] "Regulatory hurdles EU vs US"</div>
                   </>
                 )}
                 {activeStep === 2 && (
                   <>
                     <div className="text-blue-400 font-bold">$ agents.dispatch_parallel()</div>
                     <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span>> Agent_Quant:</span> 
                        <span className="text-green-400 px-2 py-0.5 bg-green-900/30 rounded">Active (Processing CSV)</span>
                     </div>
                     <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span>> Agent_Hist:</span> 
                        <span className="text-green-400 px-2 py-0.5 bg-green-900/30 rounded">Active (Scanning Arxiv)</span>
                     </div>
                     <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span>> Agent_Skept:</span> 
                        <span className="text-yellow-400 px-2 py-0.5 bg-yellow-900/30 rounded">Reviewing (Bias Check)</span>
                     </div>
                   </>
                 )}
                 {activeStep === 3 && (
                   <>
                     <div className="text-purple-400 font-bold">$ synthesis.finalize()</div>
                     <div className="opacity-70">> Resolving conflict in 'Cost Projections'...</div>
                     <div className="opacity-70">> Weighting primary sources > news articles</div>
                     <div className="bg-green-500/10 text-green-400 p-4 rounded-lg border border-green-500/20 mt-4 flex items-center gap-4">
                       <div className="text-2xl">✓</div>
                       <div>
                           <div className="font-bold">Confidence Score: 94.2%</div>
                           <div className="opacity-70">Citations: 12 Verified</div>
                       </div>
                     </div>
                   </>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// 3. FAQ Section Component
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-border py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left focus:outline-none group"
      >
        <span className="text-lg font-medium text-text group-hover:text-accent-highlight transition-colors">{question}</span>
        <span className={`ml-6 flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all duration-300 ${isOpen ? 'rotate-45 bg-text text-surface border-text' : 'bg-transparent text-text-secondary'}`}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div 
        ref={contentRef}
        style={{ 
          height: isOpen ? contentRef.current?.scrollHeight : 0,
          opacity: isOpen ? 1 : 0
        }}
        className="overflow-hidden transition-all duration-500 ease-out"
      >
        <p className="pb-8 pt-2 text-text-secondary leading-relaxed max-w-2xl">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    { q: "How does AXIOM verify its sources?", a: "AXIOM uses a cryptographic ledger to track every piece of information back to its origin. We prioritize primary data sources (papers, raw datasets) over secondary summaries." },
    { q: "Can I integrate this into my existing pipeline?", a: "Yes. AXIOM offers a RESTful API and Python SDK that allows you to inject our reasoning engine into your existing data processing workflows." },
    { q: "Is my data used to train the model?", a: "No. We operate on a strict zero-retention policy for enterprise tier customers. Your queries and data are processed ephemerally and then discarded." },
    { q: "What is the difference between Alpha and Pro?", a: "Alpha access gives you limited compute credits to test the reasoning capabilities. Pro includes dedicated throughput, priority support, and custom agent configuration." },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-text">
        Frequently Asked <span className="font-serif-display italic font-normal ml-2">Questions</span>
      </h2>
      <div className="space-y-2">
        {faqs.map((f, i) => <FAQItem key={i} question={f.q} answer={f.a} />)}
      </div>
    </div>
  );
};

// 4. Footer Hover Component
const FooterTitle = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative h-[120px] md:h-[200px] flex items-center justify-center overflow-hidden cursor-default group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1 
        className={`absolute text-[12vw] font-black tracking-tighter transition-all duration-500 ease-in-out ${isHovered ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-20 text-text'}`}
      >
        AXIOM
      </h1>
      <h1 
        className={`absolute text-[6vw] font-bold tracking-widest text-accent-highlight transition-all duration-500 ease-in-out ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'}`}
      >
        COMING SOON
      </h1>
    </div>
  );
};

// --- Architecture Diagram (Unchanged but kept for context) ---
const ArchitectureDiagram = () => {
  const nodes = [
    { label: "USER QUERY", type: "input" },
    { label: "TASK DECOMPOSER", type: "logic" },
    { label: ["SUBAGENT A", "SUBAGENT B", "SUBAGENT C"], type: "parallel" },
    { label: "MAIN ORCHESTRATOR", type: "logic" },
    { label: "REASONING VALIDATOR", type: "check" },
    { label: "FINAL SYNTHESIS", type: "logic" },
    { label: "OUTPUT", type: "output" },
  ];

  return (
    <div className="arch-diag flex flex-col items-center py-12 space-y-6 w-full max-w-2xl mx-auto">
      {nodes.map((node, i) => (
        <React.Fragment key={i}>
          {Array.isArray(node.label) ? (
            <div className="flex gap-4 w-full justify-center">
              {node.label.map((sub, j) => (
                <div key={j} className="px-4 py-2 border border-border font-mono text-[10px] font-bold text-text-secondary bg-surface rounded-lg shadow-sm">
                  {sub}
                </div>
              ))}
            </div>
          ) : (
            <div className={`px-10 py-4 border font-mono text-xs font-bold rounded-xl shadow-sm transition-all duration-300 hover:scale-105 ${
              node.type === 'check' ? 'border-green-500/30 text-green-600 bg-green-500/5' : 
              node.type === 'input' ? 'border-accent-highlight text-accent-highlight bg-accent-highlight/5' :
              node.type === 'output' ? 'border-text-secondary text-text-secondary bg-text-secondary/5' :
              'border-border text-text bg-surface'
            }`}>
              {node.label}
            </div>
          )}
          {i < nodes.length - 1 && (
            <div className="h-8 w-[2px] bg-border relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1/2 bg-accent-highlight animate-[flow_1.5s_infinite_linear]"></div>
            </div>
          )}
        </React.Fragment>
      ))}
      <style>{`
        @keyframes flow {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </div>
  );
};

// --- Metrics Dashboard (Unchanged) ---
const MetricsDashboard = () => {
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const donutChartRef = useRef<HTMLCanvasElement>(null);
  const plotlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure styles are computed
    const computedStyle = getComputedStyle(document.body);
    const isDark = document.documentElement.classList.contains('dark');
    
    // Use explicit colors if variables aren't parsing in canvas context immediately
    const textColor = isDark ? '#A1A1A1' : '#475569'; 
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    const accentColor = isDark ? '#3291FF' : '#0070F3';

    if (barChartRef.current && (window as any).Chart) {
      const ctx = barChartRef.current.getContext('2d');
      let gradient = null;
      if (ctx) {
        gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, accentColor);
        gradient.addColorStop(1, isDark ? 'rgba(50, 145, 255, 0.1)' : 'rgba(0, 112, 243, 0.1)');
      }

      new (window as any).Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Baseline LLM', 'AXIOM-ONE (v1)'],
          datasets: [{
            label: 'Reliability %',
            data: [62, 94.5],
            backgroundColor: [isDark ? '#2A2A2A' : '#E2E8F0', gradient || accentColor],
            borderRadius: 8,
            barThickness: 50,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { 
              beginAtZero: true, 
              max: 100, 
              grid: { color: gridColor, drawBorder: false }, 
              ticks: { color: textColor, font: { family: 'JetBrains Mono', size: 11, weight: '500' } } 
            },
            x: { 
              grid: { display: false, drawBorder: false }, 
              ticks: { color: textColor, font: { family: 'JetBrains Mono', size: 11, weight: '500' } } 
            }
          },
          animation: {
            duration: 2000,
            easing: 'easeOutQuart'
          }
        }
      });
    }

    if (donutChartRef.current && (window as any).Chart) {
      new (window as any).Chart(donutChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Decomposition', 'Execution', 'Validation', 'Synthesis'],
          datasets: [{
            data: [15, 45, 30, 10],
            backgroundColor: [
              isDark ? '#333' : '#CBD5E1', 
              accentColor, 
              isDark ? '#238636' : '#10B981', 
              isDark ? '#8250DF' : '#8B5CF6'
            ],
            borderColor: isDark ? '#111' : '#FFF',
            borderWidth: 5,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '85%',
          plugins: {
            legend: { 
              position: 'bottom', 
              labels: { 
                color: textColor, 
                font: { family: 'Inter', size: 11, weight: '500' }, 
                boxWidth: 8, 
                usePointStyle: true,
                padding: 20
              } 
            }
          },
          animation: {
            animateScale: true,
            animateRotate: true,
            duration: 2000,
            easing: 'easeOutCirc'
          }
        }
      });
    }

    if (plotlyRef.current && (window as any).Plotly) {
      (window as any).Plotly.newPlot(plotlyRef.current, [
        {
          x: Array.from({length: 150}, () => Math.random() * 10),
          y: Array.from({length: 150}, () => Math.random() * 10),
          z: Array.from({length: 150}, () => Math.random() * 10),
          mode: 'markers',
          marker: { 
            size: 5, 
            color: '#A855F7', // Vibrant Purple
            opacity: 0.8,
            line: { width: 0.5, color: 'rgba(255,255,255,0.2)' }
          },
          type: 'scatter3d',
          hovertemplate: '<b>Node</b><br>X: %{x:.1f}<br>Y: %{y:.1f}<br>Z: %{z:.1f}<extra></extra>'
        }
      ], {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: { l: 0, r: 0, b: 0, t: 0 },
        scene: {
          xaxis: { visible: false },
          yaxis: { visible: false },
          zaxis: { visible: false },
          camera: {
            eye: {x: 1.6, y: 1.6, z: 1.6},
            center: {x: 0, y: 0, z: 0},
          }
        },
        showlegend: false,
        hoverlabel: {
          bgcolor: '#A855F7',
          bordercolor: '#ffffff',
          font: { family: 'JetBrains Mono', size: 12, color: '#ffffff' }
        }
      }, { displayModeBar: false, staticPlot: false });
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
      {['Reliability', 'Compute', 'Reasoning Space'].map((title, idx) => (
        <div key={idx} className="metric-card card-base p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
             <h4 className="font-mono text-[11px] text-text-secondary uppercase tracking-widest font-bold">{title}</h4>
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="h-[250px] relative">
            {idx === 0 && <canvas ref={barChartRef}></canvas>}
            {idx === 1 && <canvas ref={donutChartRef}></canvas>}
            {idx === 2 && <div className="w-full h-full" ref={plotlyRef}></div>}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('axiom-theme');
    return saved ? saved === 'dark' : true;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [researchQuery, setResearchQuery] = useState("");
  const [researchOutput, setResearchOutput] = useState("");
  const [engineStatus, setEngineStatus] = useState<ResearchStatus>(ResearchStatus.IDLE);
  const modalRef = useRef<HTMLDialogElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('axiom-theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const ctx = gsap.context(() => {
      // Hero Animation - Headlines & Subtext fade in with slight upward motion
      const tl = gsap.timeline();
      tl.from(".hero-elm", {
        y: 30, // Slight upward motion (30px)
        opacity: 0,
        stagger: 0.2, // Stagger effect for sequential appearance
        duration: 1.5,
        ease: "power3.out"
      });

      // Feature Cards Animation on Scroll
      gsap.from(".bento-card", {
        scrollTrigger: {
          trigger: "#features",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
      });

      // Metrics Cards Animation
      gsap.from(".metric-card", {
        scrollTrigger: {
          trigger: "#metrics",
          start: "top 80%",
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
    }, heroRef); // Scope to hero for safety, though global classes are used

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isModalOpen]);

  const handleStartResearch = async () => {
    if (!researchQuery) return;
    setResearchOutput("");
    setEngineStatus(ResearchStatus.RUNNING);
    await runResearchAxiom(researchQuery, (chunk) => {
      setResearchOutput(prev => prev + chunk);
    });
    setEngineStatus(ResearchStatus.COMPLETED);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === modalRef.current) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header - Capsule Style Glassmorphism */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
        <div className="glass-morphism nav-capsule px-2 py-2 flex items-center justify-between shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 px-4">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-bold text-xs shadow-md">A</div>
            <span className="font-mono font-bold text-sm tracking-tight text-text">AXIOM-ONE</span>
            <Badge className="hidden sm:inline-flex opacity-80">v1.0.0</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-8 px-6 border-r border-border/50 mr-2">
              <a href="#features" className="text-xs font-semibold text-text-secondary hover:text-text transition-colors">Stack</a>
              <a href="#process" className="text-xs font-semibold text-text-secondary hover:text-text transition-colors">Process</a>
              <a href="#metrics" className="text-xs font-semibold text-text-secondary hover:text-text transition-colors">Data</a>
            </nav>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface transition-colors text-text-secondary hover:text-text focus:outline-none"
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <Button onClick={() => setIsModalOpen(true)} className="!px-5 !py-2 h-10 text-xs">Waitlist</Button>
          </div>
        </div>
      </header>

      <main ref={heroRef} className="container mx-auto px-6 pt-48 pb-32">
        {/* Hero */}
        <section className="text-center max-w-4xl mx-auto mb-40">
          <div className="hero-elm inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-border bg-surface text-accent-highlight text-[11px] font-mono tracking-widest uppercase font-bold shadow-sm">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            System Online: Epistemic Check Enabled
          </div>
          <h1 className="hero-elm text-5xl md:text-8xl font-bold mb-8 gradient-text tracking-tighter leading-[1.1] pb-2">
            High-Fidelity <br/> Reasoning Engine.
          </h1>
          <p className="hero-elm text-text-secondary text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Break complex research queries into atomic tasks. Execute with parallel validation sub-agents. Auditable, rigorous, and grounded.
          </p>
          <div className="hero-elm flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto px-12 py-5 text-base shadow-xl hover:shadow-2xl">
              Get Alpha Access
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto px-12 py-5 text-base">
              Read Whitepaper
            </Button>
          </div>
        </section>

        {/* Updated Bento Grid Feature Section */}
        <section id="features" className="mb-48">
          <BentoGrid />
        </section>

        {/* New Process Section */}
        <section id="process" className="mb-48">
          <div className="mb-16 text-center">
             <h2 className="text-3xl font-bold mb-4 tracking-tight">How It Works</h2>
             <p className="text-text-secondary text-sm">Our proprietary smart process pipeline.</p>
          </div>
          <ProcessSection />
        </section>

        {/* Architecture */}
        <section className="mb-48 relative overflow-hidden p-16 card-base rounded-[2.5rem]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-highlight/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Atomic Pipeline Flow</h2>
            <p className="text-text-secondary text-xs font-mono uppercase tracking-widest font-bold">Logic Visualization</p>
          </div>
          <ArchitectureDiagram />
        </section>

        {/* Demo Console */}
        <section id="demo" className="mb-48 max-w-5xl mx-auto">
          <div className="card-base rounded-2xl overflow-hidden shadow-2xl border border-border">
            <div className="flex items-center justify-between p-4 bg-surface border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-[10px] font-mono text-text-secondary ml-3 font-bold opacity-60">AXIOM_REASONER_v1.0.exe</span>
              </div>
              <Badge className={engineStatus === ResearchStatus.RUNNING ? "text-accent-highlight animate-pulse border-accent-highlight" : ""}>
                {engineStatus}
              </Badge>
            </div>
            
            <div className="p-8 bg-primary/50">
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <input 
                  type="text" 
                  placeholder="Enter research query..." 
                  value={researchQuery}
                  onChange={(e) => setResearchQuery(e.target.value)}
                  className="flex-1 bg-surface border border-border rounded-xl px-5 py-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 transition-all text-text shadow-sm"
                />
                <Button onClick={handleStartResearch} disabled={engineStatus === ResearchStatus.RUNNING || !researchQuery} className="h-[54px]">
                  {engineStatus === ResearchStatus.RUNNING ? "Running..." : "Start Research"}
                </Button>
              </div>

              <div className="min-h-[450px] p-8 rounded-xl font-mono text-xs leading-relaxed overflow-auto border border-border bg-surface shadow-inner">
                {researchOutput ? (
                  <div className="whitespace-pre-wrap text-text-secondary prose prose-sm max-w-none dark:prose-invert">
                    {researchOutput}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-text-secondary/40 space-y-6 pt-32">
                    <div className="w-12 h-12 border-2 border-dashed border-current rounded-full animate-spin-slow opacity-20"></div>
                    <p className="tracking-widest font-bold">AWAITING INPUT_</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section id="metrics" className="mb-48">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Auditable Performance</h2>
            <p className="text-text-secondary text-base max-w-2xl mx-auto">Quantitative analysis of reasoning accuracy and compute distribution across our verification clusters.</p>
          </div>
          <MetricsDashboard />
        </section>

        {/* New FAQ Section */}
        <section className="mb-48">
           <FAQSection />
        </section>

        {/* Closing */}
        <section className="text-center py-32 card-base rounded-[3rem] px-8 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-highlight/5 pointer-events-none"></div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tighter">Ready for Rigor?</h2>
          <p className="text-text-secondary mb-12 max-w-xl mx-auto text-lg">Join the research pool and start building with the industry's first dedicated reasoning execution engine.</p>
          <Button onClick={() => setIsModalOpen(true)} className="mx-auto !px-16 !py-6 text-lg shadow-2xl hover:scale-105">Join the Alpha</Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-20 bg-surface">
        <div className="container mx-auto px-6">
           {/* Footer Hover Title */}
           <div className="mb-20">
             <FooterTitle />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-text text-surface rounded-full flex items-center justify-center font-bold text-[10px]">A</div>
                <span className="font-mono font-bold text-lg text-text">AXIOM-ONE</span>
              </div>
              <p className="text-xs text-text-secondary leading-loose max-w-xs font-medium">The first-ever research-grade execution engine for complex synthesis tasks. No chatbots, only rigor.</p>
            </div>
            <div className="flex justify-center gap-10">
              <a href="#" className="text-xs font-bold text-text-secondary hover:text-accent-highlight transition-colors tracking-widest">GITHUB</a>
              <a href="#" className="text-xs font-bold text-text-secondary hover:text-accent-highlight transition-colors tracking-widest">DOCS</a>
              <a href="#" className="text-xs font-bold text-text-secondary hover:text-accent-highlight transition-colors tracking-widest">TWITTER</a>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-secondary font-medium">© 2025 Axiom Labs Inc. <br/> Built with Gemini 3 Pro.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <dialog 
        ref={modalRef} 
        onClick={handleBackdropClick}
        className="card-base p-0 text-text w-full max-w-md shadow-2xl rounded-3xl overflow-hidden focus:outline-none backdrop:bg-black/40"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="p-10">
          <h3 className="text-2xl font-bold mb-3 tracking-tight">Interest Pool</h3>
          <p className="text-text-secondary text-sm mb-8 font-medium">AXIOM-ONE is in gated preview. Apply below to request compute cycles for your research project.</p>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert("Interest Recorded."); }}>
            <div>
              <label className="block text-[10px] font-mono text-text-secondary uppercase mb-2 font-bold">Work Email</label>
              <input type="email" required className="w-full bg-primary border border-border rounded-xl px-4 py-3.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 text-text" placeholder="name@org.edu" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-text-secondary uppercase mb-2 font-bold">Primary Domain</label>
              <select className="w-full bg-primary border border-border rounded-xl px-4 py-3.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 text-text">
                <option>Systems Verification</option>
                <option>Bio-Informatics</option>
                <option>Quantum Computing</option>
                <option>Formal Logic</option>
              </select>
            </div>
            <div className="pt-4 flex gap-3">
              <Button type="submit" className="flex-1">Apply Now</Button>
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
