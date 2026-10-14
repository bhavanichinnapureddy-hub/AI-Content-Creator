import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-gradient-brand flex items-center justify-center mx-auto mb-8 shadow-glow-primary">
          <span className="text-white font-bold text-3xl">A</span>
        </div>
        <h1 className="text-6xl font-bold text-surface-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-surface-700 mb-4">Page not found</h2>
        <p className="text-surface-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => history.back()} className="btn-md btn-secondary flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" />
            Go back
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
