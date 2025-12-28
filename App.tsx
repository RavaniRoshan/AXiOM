
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

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
  onMouseEnter,
  onMouseLeave,
  disabled = false,
  className = "",
  type = "button"
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'ghost', 
  onClick?: () => void,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- New Section Components ---

// 1. New Capabilities Grid (Replacing BentoGrid)
const CapabilityCard = ({
  title,
  description,
  visual,
  className = ""
}: {
  title: string,
  description: string,
  visual: React.ReactNode,
  className?: string
}) => {
  return (
    <div className={`capability-card group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
      {/* Visual Header */}
      <div className="relative h-64 w-full overflow-hidden bg-primary/50">
         <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
           {visual}
         </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-text group-hover:text-accent-highlight transition-colors">{title}</h3>
        <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
      </div>
    </div>
  );
}

const CapabilitiesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
      {/* Card 1: Data Analysis */}
      <CapabilityCard
        title="Analyze Research Datasets"
        description="Upload CSVs or JSON datasets. AXIOM automatically identifies trends, anomalies, and statistical correlations."
        visual={
          <div className="w-full h-full flex items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900">
             <div className="w-full h-full bg-surface border border-border rounded-lg shadow-sm overflow-hidden flex flex-col">
                <div className="flex items-center px-4 py-2 border-b border-border gap-2">
                   <div className="w-2 h-2 rounded-full bg-red-400"></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                   <div className="w-2 h-2 rounded-full bg-green-400"></div>
                   <span className="text-[10px] text-text-secondary ml-2 font-mono">analysis_result.csv</span>
                </div>
                <div className="p-4 grid grid-cols-4 gap-2 text-[10px] font-mono text-text-secondary">
                   <div className="font-bold text-text">ID</div><div className="font-bold text-text">Metric</div><div className="font-bold text-text">Value</div><div className="font-bold text-text">Trend</div>
                   <div>001</div><div>Alpha</div><div>0.94</div><div className="text-green-500">↑ 12%</div>
                   <div>002</div><div>Beta</div><div>0.82</div><div className="text-red-500">↓ 4%</div>
                   <div>003</div><div>Gamma</div><div>1.02</div><div className="text-green-500">↑ 8%</div>
                   <div>004</div><div>Delta</div><div>0.45</div><div className="text-text-secondary">-</div>
                </div>
                <div className="mt-auto p-2 border-t border-border bg-primary/20">
                    <div className="h-1.5 w-2/3 bg-accent-highlight rounded-full"></div>
                </div>
             </div>
          </div>
        }
      />

      {/* Card 2: Knowledge Graph */}
      <CapabilityCard
        title="Generate Knowledge Graphs"
        description="Visualize complex relationships between entities. Transform unstructured text into structured node-link diagrams."
        visual={
          <div className="w-full h-full relative overflow-hidden bg-black">
             {/* Animated Background */}
             <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#3291FF 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32">
                   <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-accent-highlight rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_#3291FF] z-10"></div>
                   <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 animate-bounce"></div>
                   <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                   <div className="absolute top-1/3 right-0 w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
                   <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <line x1="50" y1="50" x2="50" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                      <line x1="50" y1="50" x2="25" y2="90" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                      <line x1="50" y1="50" x2="90" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                   </svg>
                </div>
             </div>
          </div>
        }
      />

      {/* Card 3: Ingest Documents */}
      <CapabilityCard
        title="Ingest Technical Papers"
        description="Upload PDFs or provide ArXiv links. AXIOM parses tables, formulas, and citations with pixel-perfect accuracy."
        visual={
           <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
              <div className="relative w-40 h-52 bg-white dark:bg-zinc-950 shadow-xl rounded border border-border transition-transform group-hover:-rotate-6 duration-500">
                 <div className="p-4 space-y-2">
                    <div className="h-2 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                    <div className="h-2 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded mb-4"></div>
                    <div className="space-y-1">
                       {[1,2,3,4,5,6].map(i => <div key={i} className="h-1 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded"></div>)}
                    </div>
                    <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-900/30">
                       <div className="h-1.5 w-full bg-blue-200 dark:bg-blue-800 rounded"></div>
                    </div>
                 </div>
                 {/* Scan Line */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-accent-highlight shadow-[0_0_10px_#3291FF] animate-[scan_3s_linear_infinite] opacity-50"></div>
              </div>
           </div>
        }
      />

      {/* Card 4: Agent Reasoning */}
      <CapabilityCard
        title="Multi-hop Reasoning"
        description="Ask complex questions that require chaining logic across multiple domains. Watch the agent think step-by-step."
        visual={
          <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
             <div className="w-[80%] bg-surface rounded-xl shadow-lg border border-border p-4 space-y-3">
                <div className="flex gap-3">
                   <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">A</div>
                   <div className="flex-1 space-y-1">
                      <div className="h-2 bg-indigo-500/20 rounded w-1/2 animate-pulse"></div>
                      <div className="h-2 bg-indigo-500/10 rounded w-3/4"></div>
                   </div>
                </div>
                <div className="pl-9 space-y-2">
                   <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      <span>Searching database...</span>
                   </div>
                   <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      <span>Verifying facts...</span>
                   </div>
                </div>
             </div>
          </div>
        }
      />
    </div>
  );
};

// 2. Process Section Component
const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [animating, setAnimating] = useState(false);

  const handleStepChange = (id: number) => {
    if (activeStep === id) return;
    setAnimating(true);
    setTimeout(() => {
        setActiveStep(id);
        setAnimating(false);
    }, 200);
  };

  const steps = [
    { id: 1, title: "Decomposition", desc: "Query is broken into atomic logical units." },
    { id: 2, title: "Execution", desc: "Parallel agents hunt for evidence." },
    { id: 3, title: "Synthesis", desc: "Results are merged and verified." },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-full bg-surface border border-border p-1.5 shadow-lg">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => handleStepChange(step.id)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeStep === step.id 
                  ? 'bg-text text-surface shadow-md scale-105' 
                  : 'text-text-secondary hover:text-text hover:bg-primary/50'
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

// 5. Waitlist Page Component (New)
const WaitlistPage = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({
    email: 'john@company.com',
    name: 'John Doe',
    phone: '(555) 123-4567',
    company: 'Acme Inc.',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for joining the waitlist. We will be in touch soon.');
    onBack();
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto max-w-3xl animate-fade-in">
       <button 
         onClick={onBack}
         className="mb-8 flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-accent-highlight transition-colors"
       >
         ← Back to Home
       </button>
       
       <div className="card-base p-8 md:p-12 rounded-[2rem] shadow-2xl bg-surface">
          <div className="mb-10">
             <h2 className="text-3xl font-bold text-text mb-2">Contact Information</h2>
             <p className="text-text-secondary">Please provide your contact details so we can reach you.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
             {/* Business Email */}
             <div className="space-y-2">
                <label className="block text-sm font-bold text-text">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 transition-all placeholder:text-text-secondary/40"
                  placeholder="john@company.com"
                />
                <p className="text-xs text-text-secondary">Please use your work email address.</p>
             </div>

             {/* Name & Phone Row */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="block text-sm font-bold text-text">
                     Name <span className="text-red-500">*</span>
                   </label>
                   <input 
                     type="text" 
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     required
                     className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 transition-all placeholder:text-text-secondary/40"
                     placeholder="John Doe"
                   />
                </div>
                <div className="space-y-2">
                   <label className="block text-sm font-bold text-text">
                     Phone
                   </label>
                   <input 
                     type="tel" 
                     name="phone"
                     value={formData.phone}
                     onChange={handleChange}
                     className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 transition-all placeholder:text-text-secondary/40"
                     placeholder="(555) 123-4567"
                   />
                </div>
             </div>

             {/* Company */}
             <div className="space-y-2">
                <label className="block text-sm font-bold text-text">
                  Company
                </label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 transition-all placeholder:text-text-secondary/40"
                  placeholder="Acme Inc."
                />
                <p className="text-xs text-text-secondary">Optional: Tell us where you work.</p>
             </div>

             {/* Message */}
             <div className="space-y-2">
                <label className="block text-sm font-bold text-text">
                   Your Message <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-text-secondary mb-2">Tell us about your project or inquiry.</p>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 transition-all placeholder:text-text-secondary/40 resize-none"
                  placeholder="Tell us about your project or inquiry..."
                  maxLength={500}
                ></textarea>
                <p className="text-xs text-text-secondary">{formData.message.length}/500 characters</p>
             </div>

             {/* Buttons */}
             <div className="flex gap-4 pt-4">
                <Button variant="secondary" onClick={() => setFormData({email: '', name: '', phone: '', company: '', message: ''})}>
                   Reset
                </Button>
                <button 
                   type="submit" 
                   className="bg-black dark:bg-white text-white dark:text-black px-8 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
                >
                   Submit
                </button>
             </div>
          </form>
       </div>
    </div>
  );
};

// --- Updated Architecture Diagram with GSAP ScrollTrigger ---

const ArchitectureDiagram = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = (window as any).gsap.context(() => {
      // Connect all vertical lines
      const tl = (window as any).gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1.5,
          toggleActions: "play reverse play reverse"
        }
      });

      // Enhancing animations to be "pulse-like" when active
      
      // Step 1: Line 1 grows
      tl.to(".line-1", { height: "60px", duration: 1, ease: "none" })
        
        // Step 2: Decomposer activates (PULSE effect)
        .to(".node-decomposer", { 
          backgroundColor: "rgba(59, 130, 246, 0.15)", 
          borderColor: "rgba(59, 130, 246, 0.6)", 
          scale: 1.15, 
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
          duration: 0.3,
          ease: "back.out(1.7)" 
        }, "<")
        .to(".node-decomposer", { // Settle slightly
          scale: 1.05,
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.2)",
          duration: 0.5 
        })

        // Step 3: Line 2
        .to(".line-2", { height: "60px", duration: 1, ease: "none" })
        
        // Step 4: Parallel Agents
        .fromTo(".parallel-branch", { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.5 })
        .to(".node-agent", { 
          borderColor: "rgba(16, 185, 129, 0.5)", 
          backgroundColor: "rgba(16, 185, 129, 0.1)", 
          scale: 1.1,
          boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)",
          stagger: 0.1, 
          duration: 0.3,
          ease: "back.out(1.7)" 
        })
        .to(".node-agent", {
          scale: 1.0,
          boxShadow: "0 0 5px rgba(16, 185, 129, 0.1)",
          stagger: 0.1,
          duration: 0.5
        })
        
        // Step 5: Merge
        .to(".line-3", { height: "40px", duration: 0.8, ease: "none" })
        
        // Step 6: Orchestrator (PULSE)
        .to(".node-orchestrator", { 
          backgroundColor: "rgba(139, 92, 246, 0.15)", 
          borderColor: "rgba(139, 92, 246, 0.6)", 
          scale: 1.15, 
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
          duration: 0.3,
          ease: "back.out(1.7)"
        })
        .to(".node-orchestrator", { 
          scale: 1.05,
          boxShadow: "0 0 10px rgba(139, 92, 246, 0.2)",
          duration: 0.5
        })

        // Step 7: Final Output
        .to(".line-4", { height: "60px", duration: 1, ease: "none" })
        .to(".node-output", { 
          backgroundColor: "rgba(255, 255, 255, 0.1)", 
          borderColor: "#fff", 
          scale: 1.15, 
          boxShadow: "0 0 25px rgba(255, 255, 255, 0.3)",
          duration: 0.3,
          ease: "back.out(1.7)"
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const Node = ({ label, className = "", type = "default" }: any) => {
    let colors = "border-border bg-surface text-text";
    if (type === "input") colors = "border-accent-highlight text-accent-highlight bg-accent-highlight/5 shadow-[0_0_15px_rgba(59,130,246,0.1)]";
    if (type === "output") colors = "border-text text-text bg-text/5";
    
    return (
      <div className={`relative z-10 px-8 py-3 rounded-xl border font-mono text-xs font-bold shadow-sm transition-all duration-300 ${colors} ${className}`}>
        {label}
      </div>
    );
  };

  const VLine = ({ className = "" }: any) => (
    <div className={`w-[2px] bg-accent-highlight/30 mx-auto h-0 transition-all ${className}`}></div>
  );

  return (
    <div ref={containerRef} className="flex flex-col items-center py-12 w-full max-w-3xl mx-auto relative min-h-[600px]">
      
      {/* 1. Input Node */}
      <Node label="USER QUERY" type="input" className="z-20" />
      
      {/* Line 1 */}
      <VLine className="line-1" />

      {/* 2. Decomposer Node */}
      <Node label="TASK DECOMPOSER" className="node-decomposer z-20" />

      {/* Line 2 */}
      <VLine className="line-2" />

      {/* 3. Parallel Agents Section */}
      <div className="relative w-full max-w-md flex justify-center py-2">
         {/* Horizontal bar for branching */}
         <div className="parallel-branch absolute top-0 left-10 right-10 h-[2px] bg-accent-highlight/30 origin-top"></div>
         
         <div className="flex justify-between w-full px-10 pt-4">
             <div className="flex flex-col items-center">
                <div className="parallel-branch w-[2px] h-4 bg-accent-highlight/30 absolute top-0 left-[23%]"></div>
                <Node label="QUANT AGENT" className="node-agent" />
                <div className="line-3 w-[2px] bg-accent-highlight/30 h-0 mt-2"></div>
             </div>
             <div className="flex flex-col items-center">
                 <div className="parallel-branch w-[2px] h-4 bg-accent-highlight/30 absolute top-0 left-1/2"></div>
                <Node label="SKEPTIC AGENT" className="node-agent" />
                <div className="line-3 w-[2px] bg-accent-highlight/30 h-0 mt-2"></div>
             </div>
             <div className="flex flex-col items-center">
                 <div className="parallel-branch w-[2px] h-4 bg-accent-highlight/30 absolute top-0 right-[23%]"></div>
                <Node label="HISTORIAN" className="node-agent" />
                <div className="line-3 w-[2px] bg-accent-highlight/30 h-0 mt-2"></div>
             </div>
         </div>
      </div>

      {/* 4. Orchestrator */}
      <Node label="MAIN ORCHESTRATOR" className="node-orchestrator z-20 mt-2" />

      {/* Line 4 */}
      <VLine className="line-4" />

      {/* 5. Output */}
      <Node label="FINAL SYNTHESIS" type="output" className="node-output z-20" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, transparent 70%)' }}></div>
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
  const [view, setView] = useState<'home' | 'waitlist'>('home');
  const [waitlistHover, setWaitlistHover] = useState(false);
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
    // Only run animations if we are in 'home' view
    if (view !== 'home') return;

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
      // Fix: Use autoAlpha to handle opacity+visibility automatically to prevent "invisible" issue if logic fails
      gsap.from(".capability-card", {
        scrollTrigger: {
          trigger: "#features",
          start: "top 85%", // Trigger slightly earlier
        },
        y: 50,
        autoAlpha: 0, // Better than opacity: 0
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all" // Ensure props are cleared after animation so hover effects work cleanly
      });

      // Metrics Cards Animation
      gsap.from(".metric-card", {
        scrollTrigger: {
          trigger: "#metrics",
          start: "top 85%",
        },
        scale: 0.9,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
    }, heroRef); // Scope to hero for safety, though global classes are used

    return () => ctx.revert();
  }, [view]);

  if (view === 'waitlist') {
    return (
      <div className="min-h-screen relative">
         {/* Background Grid - Persistence */}
         <div className="absolute inset-0 z-[-1] pointer-events-none grid-bg opacity-50"></div>
         <WaitlistPage onBack={() => setView('home')} />
      </div>
    );
  }

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
            <Button 
               onClick={() => setView('waitlist')} 
               onMouseEnter={() => setWaitlistHover(true)}
               onMouseLeave={() => setWaitlistHover(false)}
               className="!px-5 !py-2 h-10 text-xs w-[100px] transition-all duration-300"
            >
               {waitlistHover ? "Join ->" : "Waitlist"}
            </Button>
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
            <Button onClick={() => setView('waitlist')} className="w-full sm:w-auto px-12 py-5 text-base shadow-xl hover:shadow-2xl">
              Get Alpha Access
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto px-12 py-5 text-base">
              Read Whitepaper
            </Button>
          </div>
        </section>

        {/* Updated Capabilities Grid (Replaces BentoGrid) */}
        <section id="features" className="mb-48">
          <CapabilitiesGrid />
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
          <Button onClick={() => setView('waitlist')} className="mx-auto !px-16 !py-6 text-lg shadow-2xl hover:scale-105">Join the Alpha</Button>
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
    </div>
  );
}
