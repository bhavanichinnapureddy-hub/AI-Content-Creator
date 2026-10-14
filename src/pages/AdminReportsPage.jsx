import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BackNavButton } from '../components/BackNavButton';
import { AlertTriangle, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';

export const AdminReportsPage = () => {
  const { reports, resolveReport } = useAuth();
  const { addToast } = useToast();
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'resolved' | 'dismissed'

  const filtered = reports.filter(r => statusFilter === 'all' || r.status === statusFilter);

  const handleResolve = (id, resolution) => {
    resolveReport(id, resolution);
    addToast(`Report marked as ${resolution}.`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackNavButton fallbackPath="/admin/home" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
              Reports & Platform Complaints
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Review flagged campaigns, user violation complaints, and enforce community trust & safety.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 w-fit">
        {['all', 'pending', 'resolved', 'dismissed'].map(tab => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer ${
              statusFilter === tab
                ? 'bg-[#006B4F] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-sm">
            No complaints found for this status filter.
          </div>
        ) : (
          filtered.map(report => (
            <div
              key={report.id}
              className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Type: {report.type}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    report.status === 'resolved'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-[#006B4F] dark:text-emerald-300'
                      : report.status === 'dismissed'
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                  }`}>
                    {report.status}
                  </span>
                  <span className="text-xs text-slate-400">{report.date}</span>
                </div>

                <h3 className="text-base font-bold text-[#102A43] dark:text-white">
                  Target: {report.targetName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {report.reason}
                </p>
                <p className="text-xs text-slate-400">
                  Reported by: <span className="font-semibold text-slate-600 dark:text-slate-300">{report.reportedBy}</span>
                </p>
              </div>

              {report.status === 'pending' && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleResolve(report.id, 'resolved')}
                    className="px-4 py-2 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Resolve Flag
                  </button>
                  <button
                    onClick={() => handleResolve(report.id, 'dismissed')}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
