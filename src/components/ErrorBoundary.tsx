import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-paper flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 bg-error-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl text-ink mb-4">Something Went Wrong</h1>
            <p className="font-sans text-neutral-600 mb-6">
              An unexpected error occurred. We've logged the issue and our team will investigate.
            </p>
            {this.state.error && (
              <div className="bg-neutral-50 border border-border-std p-4 mb-6 text-left">
                <p className="font-mono text-xs text-error-red mb-2">Error Details:</p>
                <p className="font-mono text-xs text-neutral-600 truncate">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <div className="flex gap-2 justify-center">
              <button
                onClick={this.handleGoHome}
                className="px-6 py-3 border border-border-std font-mono text-sm font-bold hover:bg-paper transition-colors"
              >
                Go Home
              </button>
              <button
                onClick={this.handleReload}
                className="px-6 py-3 bg-ink text-paper font-mono text-sm font-bold hover:bg-neutral-800 transition-colors shadow-hard"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
