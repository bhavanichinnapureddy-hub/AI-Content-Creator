import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const BackNavButton = ({ label = 'Go back', fallbackPath, className = '' }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBack = () => {
    // If browser has history length > 1, navigate back
    if (window.history.length > 1) {
      navigate(-1);
    } else if (fallbackPath) {
      navigate(fallbackPath);
    } else if (currentUser) {
      navigate(`/${currentUser.role}/home`);
    } else {
      navigate('/');
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label={label}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#102A43] text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer ${className}`}
    >
      <ArrowLeft className="w-4 h-4 text-[#006B4F] dark:text-emerald-400" />
      <span>{label}</span>
    </button>
  );
};
