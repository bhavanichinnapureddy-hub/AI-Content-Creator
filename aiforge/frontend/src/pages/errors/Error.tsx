import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorPage() {
  const location = useLocation();
  const message = (location.state as { message?: string } | null)?.message;

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-error-50 border border-error-100 flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-10 h-10 text-error-500" />
        </div>
        <h1 className="text-2xl font-bold text-surface-900 mb-3">Something went wrong</h1>
        <p className="text-surface-500 mb-8">
          {message ?? "We encountered an unexpected error. Please try again or contact support if the problem persists."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="btn-md btn-secondary flex items-center gap-2 justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
          <Link to="/" className="btn-md btn-primary flex items-center gap-2 justify-center">
            <Home className="w-4 h-4" />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
