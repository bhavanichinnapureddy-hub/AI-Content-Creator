import React from 'react';
import { NavLink } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1724] text-slate-900 dark:text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-[#102A43] dark:text-white mb-2">404 - Page Not Found</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mb-8">
        The destination you are looking for doesn't exist or is restricted to a different CreatorSphere AI user role.
      </p>
      <NavLink
        to="/"
        className="px-6 py-3 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-sm font-semibold shadow-md inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Welcome Portal
      </NavLink>
    </div>
  );
};
