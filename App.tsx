import React, { useState, useEffect } from 'react';
import { DotGrid, Metaballs } from '@paper-design/shaders-react';
import LandingPage from './src/LandingPage';

// --- Utility Components ---

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
    secondary: "glass-morphism border border-border text-text hover:border-accent-highlight hover:text-accent-highlight",
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

// 5. Waitlist Page Component
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
    <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto max-w-3xl animate-fade-in relative z-10">
       <button 
         onClick={onBack}
         className="mb-8 flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-accent-highlight transition-colors"
       >
         ← Back to Home
       </button>
       
       <div className="glass-morphism p-8 md:p-12 rounded-[2rem] shadow-2xl">
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
                  className="w-full bg-white/80 dark:bg-surface/50 border border-border/60 rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 transition-all placeholder:text-text-secondary/60 backdrop-blur-md font-medium"
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
                     className="w-full bg-white/80 dark:bg-surface/50 border border-border/60 rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 transition-all placeholder:text-text-secondary/60 backdrop-blur-md font-medium"
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
                     className="w-full bg-white/80 dark:bg-surface/50 border border-border/60 rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 transition-all placeholder:text-text-secondary/60 backdrop-blur-md font-medium"
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
                  className="w-full bg-white/80 dark:bg-surface/50 border border-border/60 rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 transition-all placeholder:text-text-secondary/60 backdrop-blur-md font-medium"
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
                  className="w-full bg-white/80 dark:bg-surface/50 border border-border/60 rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent-highlight/20 transition-all placeholder:text-text-secondary/60 resize-none backdrop-blur-md font-medium"
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

// --- WIP Page Component ---
const WIPPage = ({ onBack }: { onBack: () => void }) => {
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const messages = [
      "I will be right back",
      "Refactoring the universe...",
      "Teaching AI to love...",
      "Compiling more pixels...",
      "Just a moment, aligning the stars...",
      "Fetching more coffee for the developer..."
    ];
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
             <Metaballs 
                speed={1} 
                count={10} 
                size={0.83} 
                scale={1} 
                colors={['#6E33CC', '#FF5500', '#FFC105', '#FFC800', '#F585FF']} 
                colorBack="#00000000" 
                className="w-full h-full bg-black" 
            />
        </div>
        
        <div className="relative z-10 text-center space-y-8 p-12 glass-morphism rounded-[3rem] max-w-2xl mx-6 shadow-2xl">
            <h1 className="text-6xl md:text-8xl font-black text-white mix-blend-difference tracking-tighter">WIP</h1>
            <p className="text-xl md:text-2xl font-serif-display italic text-white/90 font-medium">
                "{message}"
            </p>
            <Button onClick={onBack} className="mx-auto !bg-white !text-black hover:scale-105">
                Go Back Home
            </Button>
        </div>
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('axiom-theme');
    return saved ? saved === 'dark' : true;
  });
  const [view, setView] = useState<'home' | 'waitlist' | 'wip'>('home');

  useEffect(() => {
    localStorage.setItem('axiom-theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (view === 'wip') {
    return <WIPPage onBack={() => setView('home')} />;
  }

  if (view === 'waitlist') {
    return (
      <div className="min-h-screen relative">
         {/* Background Grid - Persistence */}
         <div className="fixed inset-0 z-0 pointer-events-none">
            <DotGrid 
                size={2} 
                gapY={32} 
                gapX={32} 
                strokeWidth={0} 
                sizeRange={0} 
                opacityRange={0} 
                shape="circle" 
                colorFill={isDarkMode ? "#FFFFFF" : "#111827"} 
                colorStroke="#FFAA00" 
                colorBack={isDarkMode ? "#0A0A0A" : "#F4F6F8"} 
                className="w-full h-full" 
            />
         </div>
         <WaitlistPage onBack={() => setView('home')} />
      </div>
    );
  }

  return (
    <LandingPage
        onWaitlistClick={() => setView('waitlist')}
        onLoginClick={() => setView('wip')}
    />
  );
}
