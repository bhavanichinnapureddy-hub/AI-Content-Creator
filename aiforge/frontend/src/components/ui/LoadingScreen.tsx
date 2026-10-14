import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-surface-50">
      <div className="flex flex-col items-center gap-4">
        {/* Logo mark */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow-primary">
          <span className="text-white font-bold text-xl">A</span>
        </div>
        <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
        <p className="text-sm text-surface-500 font-medium">Loading AIForge...</p>
      </div>
    </div>
  );
}
