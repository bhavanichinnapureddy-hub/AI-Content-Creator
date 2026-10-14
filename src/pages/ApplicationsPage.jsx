import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BackNavButton } from '../components/BackNavButton';
import { FileText, CheckCircle2, XCircle, Clock, ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const ApplicationsPage = () => {
  const { currentUser, applications, campaigns } = useAuth();
  const { addToast } = useToast();

  const myApplications = currentUser?.role === 'creator'
    ? applications.filter(a => a.creatorId === currentUser?.id)
    : applications;

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="space-y-4">
        <BackNavButton label="Back" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
            {currentUser?.role === 'creator' ? 'My Campaign Proposals & Applications' : 'All Creator Proposals'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor your submitted pitches, bid pricing, and brand review statuses.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {myApplications.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No applications found.</p>
            <NavLink
              to="/campaigns"
              className="mt-3 inline-block px-4 py-2 rounded-xl bg-[#006B4F] text-white text-xs font-semibold cursor-pointer"
            >
              Discover Open Campaigns
            </NavLink>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Campaign</th>
                  <th className="p-4">Creator / Pitch</th>
                  <th className="p-4">Proposed Rate</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {myApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-4 font-bold text-[#102A43] dark:text-white max-w-xs">
                      {app.campaignTitle}
                    </td>
                    <td className="p-4 max-w-sm">
                      <p className="font-semibold text-slate-700 dark:text-slate-300">{app.creatorName}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">“{app.pitch}”</p>
                    </td>
                    <td className="p-4 font-bold text-[#006B4F] dark:text-emerald-400">
                      ${app.proposedRate}
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        app.status === 'accepted'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-[#006B4F] dark:text-emerald-300'
                          : app.status === 'rejected'
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-[11px]">
                      {app.appliedDate}
                    </td>
                    <td className="p-4 text-right">
                      <NavLink
                        to={`/campaign/${app.campaignId}`}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        Campaign Brief
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
