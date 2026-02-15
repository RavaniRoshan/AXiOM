import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ResearchReport, SubagentResult, ValidationResult } from '../api/types';
import { formatManuscriptAsMarkdown } from '../api/synthesize';

// Logo Icon Component
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
    </svg>
  );
}

// Check Icon
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

// Download Icon
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

// Copy Icon
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

// Task Result Card Component
interface TaskResultCardProps {
  taskId: string;
  result: SubagentResult;
}

function TaskResultCard({ taskId, result }: TaskResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-border-std bg-surface">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-paper transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold text-ink">{taskId}</span>
          <span className="font-sans text-sm text-neutral-600">{result.title || 'Task Analysis'}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`font-mono text-xs px-2 py-1 rounded ${
            result.confidenceScore >= 0.8 ? 'bg-teal-success/10 text-teal-success' :
            result.confidenceScore >= 0.6 ? 'bg-trace-blue/10 text-trace-blue' :
            'bg-error-red/10 text-error-red'
          }`}>
            {(result.confidenceScore * 100).toFixed(0)}% Confidence
          </span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-4 border-t border-border-std bg-paper">
          <p className="font-sans text-sm text-neutral-700 mb-4">{result.output}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase">Source Type</span>
              <p className="font-sans text-neutral-700 capitalize">{result.sourceType}</p>
            </div>
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase">Execution Time</span>
              <p className="font-sans text-neutral-700">{result.executionTime}ms</p>
            </div>
          </div>
          {result.assumptions.length > 0 && (
            <div className="mt-4">
              <span className="font-mono text-xs text-neutral-500 uppercase">Assumptions</span>
              <ul className="mt-2 space-y-1">
                {result.assumptions.map((assumption, idx) => (
                  <li key={idx} className="font-sans text-sm text-neutral-700 flex items-start gap-2">
                    <span className="text-trace-blue">•</span>
                    {assumption}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Validation Flag Component
function ValidationFlagItem({ flag }: { flag: ValidationResult['flags'][0] }) {
  const severityColors = {
    warning: 'bg-trace-blue/10 text-trace-blue border-trace-blue/20',
    error: 'bg-error-red/10 text-error-red border-error-red/20',
    critical: 'bg-error-red/20 text-error-red border-error-red',
  };

  return (
    <div className={`p-3 border ${severityColors[flag.severity]} text-sm`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-xs font-bold uppercase">{flag.severity}</span>
      </div>
      <p className="font-sans text-neutral-700">{flag.message}</p>
      {flag.suggestion && (
        <p className="font-sans text-neutral-500 text-xs mt-1">Suggestion: {flag.suggestion}</p>
      )}
    </div>
  );
}

// Main ReportView Component
export default function ReportView() {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state?.report as ResearchReport | undefined;
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  // Handle missing report
  if (!report) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-ink mb-4">No Report Available</h1>
          <p className="font-sans text-neutral-600 mb-8">Start a new research query to generate a report.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-ink text-paper font-mono text-sm font-bold hover:bg-neutral-800 transition-colors shadow-hard"
          >
            Start New Query
          </button>
        </div>
      </div>
    );
  }

  const handleCopyToClipboard = () => {
    const markdown = formatManuscriptAsMarkdown(report);
    navigator.clipboard.writeText(markdown);
    setShowCopiedToast(true);
    setTimeout(() => setShowCopiedToast(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const markdown = formatManuscriptAsMarkdown(report);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `axiom-report-${report.runId.toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNewQuery = () => {
    navigate('/');
  };

  const taskResults = Object.entries(report.tasks);
  const validationIssues = report.validationResults.flatMap(v => v.flags);

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="border-b border-border-std bg-surface sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <LogoIcon className="w-6 h-6 text-ink" />
              <div>
                <h1 className="font-serif text-xl md:text-2xl text-ink leading-tight">{report.question}</h1>
                <p className="font-mono text-xs text-neutral-500 mt-1">
                  RUN_ID: {report.runId} | Generated {new Date().toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopyToClipboard}
                className="flex items-center gap-2 px-4 py-2 border border-border-std font-mono text-xs font-bold hover:bg-paper transition-colors"
              >
                <CopyIcon />
                Copy
              </button>
              <button
                onClick={handleDownloadMarkdown}
                className="flex items-center gap-2 px-4 py-2 bg-ink text-paper font-mono text-xs font-bold hover:bg-neutral-800 transition-colors shadow-hard"
              >
                <DownloadIcon />
                Download
              </button>
              <button
                onClick={handleNewQuery}
                className="px-4 py-2 border border-border-std font-mono text-xs font-bold hover:bg-paper transition-colors"
              >
                New Query
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Metadata Grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-surface border border-border-std p-4 md:p-6">
            <span className="font-mono text-xs text-neutral-500 uppercase block mb-2">Confidence</span>
            <div className="font-serif text-3xl md:text-4xl font-bold text-ink">
              {(report.confidenceScore * 100).toFixed(1)}%
            </div>
          </div>
          <div className="bg-surface border border-border-std p-4 md:p-6">
            <span className="font-mono text-xs text-neutral-500 uppercase block mb-2">Execution Time</span>
            <div className="font-serif text-3xl md:text-4xl font-bold text-ink">
              {(report.executionTime / 1000).toFixed(1)}s
            </div>
          </div>
          <div className="bg-surface border border-border-std p-4 md:p-6">
            <span className="font-mono text-xs text-neutral-500 uppercase block mb-2">Tasks</span>
            <div className="font-serif text-3xl md:text-4xl font-bold text-ink">
              {taskResults.length}
            </div>
          </div>
        </div>

        {/* Manuscript */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-ink mb-6 pb-2 border-b border-border-std">Research Findings</h2>
          <article 
            className="prose prose-lg max-w-none font-serif leading-relaxed text-ink"
            dangerouslySetInnerHTML={{ __html: report.manuscript }}
          />
        </section>

        {/* Assumptions */}
        {report.assumptions.length > 0 && (
          <section className="bg-neutral-50 border border-border-std p-6 md:p-8 mb-12">
            <h2 className="font-serif text-xl text-ink mb-6">Key Assumptions</h2>
            <ul className="space-y-3">
              {report.assumptions.map((assumption, idx) => (
                <li key={idx} className="flex gap-3">
                  <CheckIcon className="shrink-0 text-teal-success mt-1" />
                  <span className="font-sans text-neutral-700">{assumption}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Validation Issues */}
        {validationIssues.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-xl text-ink mb-6">Validation Flags</h2>
            <div className="space-y-3">
              {validationIssues.map((flag, idx) => (
                <ValidationFlagItem key={idx} flag={flag} />
              ))}
            </div>
          </section>
        )}

        {/* Task Execution Summary */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-ink mb-6 pb-2 border-b border-border-std">Task Execution Summary</h2>
          <div className="space-y-4">
            {taskResults.map(([taskId, result]) => (
              <TaskResultCard key={taskId} taskId={taskId} result={result} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-std bg-surface py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <p className="font-mono text-xs text-neutral-500">
            AXIOM-ONE | Research Execution Engine | v1.0
          </p>
          <p className="font-mono text-xs text-neutral-400 mt-2">
            Epistemic accuracy over conversational fluency
          </p>
        </div>
      </footer>

      {/* Copy Toast */}
      {showCopiedToast && (
        <div className="fixed bottom-4 right-4 bg-ink text-paper px-4 py-2 font-mono text-sm shadow-hard z-50">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
