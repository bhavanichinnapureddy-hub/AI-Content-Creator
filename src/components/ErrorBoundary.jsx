import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1724] text-slate-900 dark:text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-[#102A43] dark:text-white">
              Something went wrong
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              An unexpected error occurred while loading this page. You can reload or return to the welcome portal.
            </p>

            {this.state.error?.message && (
              <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-left font-mono text-[11px] text-slate-600 dark:text-slate-400 overflow-x-auto border border-slate-200 dark:border-slate-800">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
              <button
                onClick={this.handleReload}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                className="w-full py-2.5 px-4 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Return to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
