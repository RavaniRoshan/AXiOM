import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { decompose } from '../api/decompose';

/* ─── Animation Presets ─── */
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const staggerChild = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Icons ─── */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ScrollArrow() {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 text-neutral-400"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

/* ─── System Status ─── */
function useApiStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const apiKeyValid = true;

  useEffect(() => {
    const check = () => setIsOnline(navigator.onLine);
    check();
    window.addEventListener('online', check);
    window.addEventListener('offline', check);
    return () => {
      window.removeEventListener('online', check);
      window.removeEventListener('offline', check);
    };
  }, []);

  return { isOnline, apiKeyValid };
}

/* ═══════════════════════════════════════════════════
   NAVBAR (Floating & Glass)
   ═══════════════════════════════════════════════════ */
function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-surface/70 backdrop-blur-xl border border-white/20 shadow-xl rounded-full z-50 px-6 py-3 flex items-center justify-between transition-all">
      <motion.span
        className="font-serif text-lg font-bold text-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        AXIOM-ONE
      </motion.span>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-8">
        {['Features', 'Pricing', 'Docs', 'Blog'].map(item => (
          <li key={item}>
            <a href="#" className="relative group font-sans text-xs font-medium text-neutral-600 hover:text-ink transition-colors uppercase tracking-wider">
              {item}
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.button
        className="hidden sm:block px-5 py-2 bg-ink text-paper rounded-full font-mono text-[10px] font-bold tracking-widest shadow-lg hover:shadow-xl hover:bg-neutral-800 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        SIGN IN
      </motion.button>

      {/* Mobile */}
      <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="absolute top-full left-0 w-full mt-4 rounded-2xl border border-border-std bg-paper/95 backdrop-blur-md px-4 py-4 md:hidden shadow-2xl origin-top"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
          >
            {['Features', 'Pricing', 'Docs', 'Blog'].map(item => (
              <a key={item} href="#" className="block py-3 font-sans text-sm font-medium text-neutral-600 hover:text-ink border-b border-border-std last:border-0">{item}</a>
            ))}
            <button className="mt-4 w-full py-3 bg-ink text-paper rounded-xl font-mono text-xs font-bold tracking-wider">SIGN IN</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════════════ */
function HeroSection({
  input, setInput, isLoading, error, isOnline, onSubmit, onKeyDown,
}: {
  input: string; setInput: (v: string) => void; isLoading: boolean;
  error: string | null; isOnline: boolean;
  onSubmit: (e: React.FormEvent) => void; onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32 pb-10 overflow-hidden">
      {/* Subtle gradient accent orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-gradient-radial from-blue-400/10 to-transparent rounded-full blur-3xl animate-float opacity-60" style={{ top: '-10%', left: '-10%' }} />
        <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-cyan-400/10 to-transparent rounded-full blur-3xl animate-float opacity-50" style={{ bottom: '10%', right: '-10%', animationDelay: '3s' }} />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <motion.div {...staggerChild(0)} className="mb-6 inline-flex">
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-mono text-[10px] uppercase tracking-wider font-semibold">
            v1.0 Public Beta
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-6xl md:text-8xl lg:text-[120px] leading-[0.9] tracking-tighter mb-8 text-ink"
          {...staggerChild(0.1)}
        >
          Research that <br />
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent italic pr-4">
            actually thinks.
          </span>
        </motion.h1>

        <motion.p
          className="font-sans text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          {...staggerChild(0.2)}
        >
          Decompose complex queries. Execute isolated agents. <br className="hidden md:block" />
          Verify every step with adversarial reasoning.
        </motion.p>

        <motion.form onSubmit={onSubmit} className="mb-16 w-full max-w-2xl mx-auto relative group" {...staggerChild(0.3)}>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-surface rounded-xl p-2 shadow-2xl border border-white/50 backdrop-blur-sm">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="What do you want to know? (min 20 chars)"
              className="w-full block px-4 py-3 bg-transparent border-none font-serif text-xl text-ink placeholder:text-neutral-400 focus:ring-0 resize-none min-h-[120px]"
              minLength={20}
              maxLength={2000}
              disabled={isLoading}
            />
            <div className="flex justify-between items-center px-4 pb-2 pt-2 border-t border-dashed border-neutral-200">
              <span className="text-xs text-neutral-400 font-mono hidden sm:inline-block">CTRL + ENTER to run</span>
              <button
                type="submit"
                disabled={isLoading || input.trim().length < 20 || !isOnline}
                className="bg-ink text-paper px-6 py-2 rounded-lg font-mono text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
              >
                {isLoading ? <span className="animate-spin">Wait</span> : <>RUN_AUDIT <ArrowIcon className="w-4 h-4" /></>}
              </button>
            </div>
          </div>
          {error && <p className="absolute -bottom-8 left-0 text-error-red font-mono text-xs">{error}</p>}
        </motion.form>
      </div>

      <div className="absolute bottom-10">
        <ScrollArrow />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   LOGO STRIP (Infinite Marquee)
   ═══════════════════════════════════════════════════ */
function LogoStrip() {
  // Using placeholder company names for now
  const logos = ['Acme Corp', 'Veritas', 'Nexus AI', 'Finite Loop', 'BlueSky', 'Quantum', 'Stark Ind'];

  return (
    <div className="w-full py-12 border-y border-border-std overflow-hidden bg-white/50">
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-paper to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-paper to-transparent z-10" />

        <div className="flex gap-16 animate-scroll w-[200%]">
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="whitespace-nowrap font-serif text-xl font-bold text-neutral-300 uppercase tracking-widest hover:text-ink transition-colors cursor-default select-none">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HOW IT WORKS (Bento Grid)
   ═══════════════════════════════════════════════════ */
function HowItWorksSection() {
  return (
    <section className="px-4 py-24 md:py-32 max-w-7xl mx-auto">
      <motion.div className="text-center mb-16" {...fadeInUp}>
        <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4">Reasoning Engine</h2>
        <p className="text-neutral-500 font-sans">Four atomic phases. Zero black boxes.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {/* Card 1: Large Span */}
        <motion.div
          className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-surface border border-border-std shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
          {...staggerChild(0)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-6 left-6 w-12 h-12 rounded-full border border-border-std flex items-center justify-center font-mono text-sm bg-white shadow-sm">01</div>
          <div className="absolute bottom-8 left-8 max-w-md">
            <h3 className="font-serif text-3xl mb-2 group-hover:text-blue-600 transition-colors">Decomposition</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">The engine breaks complex queries into an acyclic graph of atomic sub-tasks. No task is too big to fail.</p>
          </div>
          <div className="absolute top-8 right-8 text-6xl opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all">🧩</div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="md:col-span-1 relative group overflow-hidden rounded-3xl bg-ink text-paper shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
          {...staggerChild(0.1)}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
          <div className="absolute top-6 left-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center font-mono text-sm bg-white/10">02</div>
          <div className="absolute bottom-8 left-8 pr-8">
            <h3 className="font-serif text-3xl mb-2 text-white">Execution</h3>
            <p className="text-neutral-400 text-sm">Isolated agents run in parallel environments.</p>
          </div>
          <div className="absolute top-8 right-8 text-4xl animate-pulse">⚡</div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="md:col-span-1 relative group overflow-hidden rounded-3xl bg-surface border border-border-std shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
          {...staggerChild(0.2)}
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-6 left-6 w-12 h-12 rounded-full border border-border-std flex items-center justify-center font-mono text-sm bg-white shadow-sm">03</div>
          <div className="absolute bottom-8 left-8 pr-6">
            <h3 className="font-serif text-3xl mb-2 group-hover:text-red-500 transition-colors">Validation</h3>
            <p className="text-neutral-500 text-sm">Adversarial critics challenge every output.</p>
          </div>
        </motion.div>

        {/* Card 4: Large Span */}
        <motion.div
          className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-surface border border-border-std shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
          {...staggerChild(0.3)}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-6 left-6 w-12 h-12 rounded-full border border-border-std flex items-center justify-center font-mono text-sm bg-white shadow-sm">04</div>
          <div className="absolute bottom-8 left-8 max-w-md">
            <h3 className="font-serif text-3xl mb-2 group-hover:text-purple-600 transition-colors">Synthesis</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">A final coherence layer weaves verified facts into a single, hallucination-free manuscript.</p>
          </div>
          <div className="absolute bottom-8 right-8 text-6xl opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all">📝</div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   BENTO FEATURES (Depth & Hover)
   ═══════════════════════════════════════════════════ */
function FeaturesSection() {
  const features = [
    { title: 'Traceability', desc: 'Trace every claim back to its source.', col: 'md:col-span-1' },
    { title: 'Confidence', desc: 'Real-time confidence scores for every node.', col: 'md:col-span-1' },
    { title: 'No Hallucinations', desc: 'Adversarial validation ensures 99.9% factual accuracy.', col: 'md:col-span-2' },
    { title: 'Export', desc: 'One-click export to PDF/Markdown.', col: 'md:col-span-2' },
    { title: 'Speed', desc: 'Parallel execution.', col: 'md:col-span-1' },
    { title: 'Privacy', desc: 'Local-first architecture.', col: 'md:col-span-1' },
  ];

  return (
    <section className="px-4 py-24 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2 className="font-serif text-4xl text-center mb-16" {...fadeInUp}>Powerful Capabilities</motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px]">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={`${f.col} group relative bg-surface border border-border-std rounded-2xl p-8 hover:z-10 transition-all duration-300 hover:shadow-glow-blue overflow-hidden`}
              whileHover={{ scale: 1.02, y: -4 }}
              {...staggerChild(i * 0.05)}
            >
              {/* Depth Effect Blob */}
              <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="font-serif text-2xl font-medium mb-2 group-hover:text-blue-600 transition-colors">{f.title}</h3>
                <p className="font-sans text-sm text-neutral-500">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   INFINITE SCROLL PROOF
   ═══════════════════════════════════════════════════ */
function ProofSection() {
  const testimonials = [
    { text: "It's like having a PhD research assistant.", author: "Dr. Chen, Stanford" },
    { text: "The accuracy is unmatched.", author: "Marcus, Veritas AI" },
    { text: "Finally, reasoning I can trust.", author: "Elena, Nexus" },
  ];

  return (
    <section className="py-24 overflow-hidden border-y border-border-std bg-white">
      <div className="mb-12 text-center">
        <h2 className="font-serif text-2xl text-neutral-400 italic">Trusted by the best</h2>
      </div>

      <div className="relative w-full">
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex gap-8 animate-scroll w-[200%] hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="flex-shrink-0 w-80 p-8 bg-paper border border-border-std rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="font-serif text-lg italic text-ink mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200" />
                <span className="font-mono text-xs font-bold uppercase text-neutral-500">{t.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   BANNER SECTION (Blue/Pink Gradient)
   ═══════════════════════════════════════════════════ */
function BannerSection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background with blurry mesh gradients */}
      <div className="absolute inset-0 bg-[#3b82f6]">
        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-pink-300 rounded-full blur-[120px] opacity-70 mix-blend-overlay animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[100%] bg-purple-400 rounded-full blur-[100px] opacity-60 mix-blend-overlay animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <motion.h2
          className="font-serif text-5xl md:text-7xl font-medium mb-8 leading-tight drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          AI that works <br />
          everywhere you work
        </motion.h2>
        <motion.button
          className="px-8 py-3 bg-white text-blue-600 rounded-full font-sans font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Get AXIOM-ONE
        </motion.button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SHOWCASE SECTION (Dark Teal + Image Stack)
   ═══════════════════════════════════════════════════ */
function ShowcaseSection() {
  return (
    <section className="bg-[#0b382e] py-32 px-4 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* Left: Image Stack Placeholder (CSS Shapes) */}
        <motion.div
          className="w-full md:w-1/2 relative h-[400px] flex items-center justify-center p-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Card 1 (Back) */}
          <div className="absolute w-64 h-80 bg-blue-500/20 backdrop-blur-md rounded-lg transform -rotate-12 translate-x-[-40px] border border-white/10" />
          {/* Card 2 (Middle) */}
          <div className="absolute w-64 h-80 bg-purple-500/20 backdrop-blur-md rounded-lg transform rotate-6 translate-x-[20px] translate-y-[-20px] border border-white/10" />
          {/* Card 3 (Front - Focal) */}
          <div className="relative w-72 h-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl p-6 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-4">✨</div>
            <p className="font-serif text-lg italic mb-2">"Thinking..."</p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-teal-400" />
            </div>
          </div>
        </motion.div>

        {/* Right: Text */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">
            Becoming <br />
            Superhuman.
          </h2>
          <p className="font-sans text-lg text-teal-100/80 mb-8 leading-relaxed">
            When AI works everywhere you work, it starts to change <span className="italic">how</span> you work.
            At first, you think faster and more deeply. Before you know it, you have the time to be more creative.
          </p>
          <button className="px-6 py-3 border border-teal-200/30 rounded-lg hover:bg-teal-900/50 transition-colors font-sans text-sm">
            Read our announcement →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER (Superhuman Style)
   ═══════════════════════════════════════════════════ */
function FooterSection() {
  return (
    <footer className="relative bg-ink text-paper py-24 px-4 overflow-hidden border-t border-border-std">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-24">
          {/* Brand - Spans 2 cols */}
          <div className="col-span-2">
            <h3 className="font-serif text-2xl font-bold mb-4 text-white">AXIOM-ONE</h3>
            <p className="font-sans text-sm text-neutral-400 max-w-xs leading-relaxed">
              Builders of the first verifiable reasoning engine. <br />
              Truth is not an approximation.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white mb-6">Product</h4>
            <ul className="space-y-4 font-sans text-sm text-neutral-400">
              {['Features', 'Pricing', 'API', 'Docs', 'Changelog'].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white mb-6">Company</h4>
            <ul className="space-y-4 font-sans text-sm text-neutral-400">
              {['About', 'Blog', 'Careers', 'Manifesto', 'Contact'].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                  {l} {l === 'Careers' && <span className="text-[9px] ml-1">↗</span>}
                </a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white mb-6">Legal</h4>
            <ul className="space-y-4 font-sans text-sm text-neutral-400">
              {['Privacy', 'Terms', 'Security', 'Cookies'].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white mb-6">Connect</h4>
            <ul className="space-y-4 font-sans text-sm text-neutral-400">
              {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-mono border-t border-white/10 pt-8">
          <p>© 2026 AXIOM-ONE INC.</p>
          <div className="flex gap-4 mt-4 md:mt-0 uppercase tracking-wider">
            <span>INDIA</span>
            <span>•</span>
            <span>AHMEDABAD</span>
          </div>
        </div>
      </div>

      {/* Massive Watermark with Strikethrough */}
      <div className="absolute bottom-[-5vw] left-1/2 -translate-x-1/2 pointer-events-none select-none w-full text-center overflow-hidden flex items-center justify-center">
        <div className="relative">
          <span className="font-serif font-bold text-[18vw] leading-none text-white opacity-[0.03] whitespace-nowrap tracking-tighter block">
            AXIOM-ONE
          </span>
          {/* Horizontal Strikethrough Line */}
          <div className="absolute top-1/2 left-[-10%] w-[120%] h-[2px] bg-white opacity-[0.05]" />
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function QueryInput() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isOnline, apiKeyValid } = useApiStatus();

  const handleSubmit = async (e: React.FormEvent) => { /* ... same logic */
    e.preventDefault();
    if (input.trim().length < 20) { setError('Query too short'); return; }
    setIsLoading(true);
    /* mock logic for UI demo */
    setTimeout(() => { setIsLoading(false); navigate('/dashboard'); }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { /* ... */ };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden font-sans">
      <NavBar />
      <HeroSection input={input} setInput={setInput} isLoading={isLoading} error={error} isOnline={isOnline} onSubmit={handleSubmit} onKeyDown={handleKeyDown} />
      <LogoStrip />
      <HowItWorksSection />
      <FeaturesSection />
      <BannerSection />
      <ShowcaseSection />
      <ProofSection />

      {/* Footer (Simplified) */}
      <FooterSection />
    </div>
  );
}
