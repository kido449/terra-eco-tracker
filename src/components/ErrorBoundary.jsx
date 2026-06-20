import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary
 * 
 * Catches JavaScript errors anywhere in their child component tree, logs those errors, 
 * and displays a fallback UI instead of crashing the whole application component tree.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-[var(--color-dark)] flex items-center justify-center p-6 text-center">
          <div className="max-w-lg bg-[#080808]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 shadow-2xl">
            <div className="w-16 h-16 mx-auto bg-red-500/10 text-red-500 rounded-full flex items-center justify-center text-3xl mb-6 shadow-[inset_0_0_15px_rgba(239,68,68,0.2)]">
              ⚠️
            </div>
            <h1 className="text-3xl font-display text-white mb-4 tracking-tight">Something went wrong.</h1>
            <p className="text-sm text-[#a3a3a3] mb-8 leading-relaxed">
              We encountered an unexpected error. Please refresh the page or return to the dashboard.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold text-white hover:bg-white/10 transition-colors"
              >
                Refresh Page
              </button>
              <button 
                onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}
                className="px-6 py-3 bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/30 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold text-white hover:bg-[var(--color-cyan)]/20 hover:border-[var(--color-cyan)]/50 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
