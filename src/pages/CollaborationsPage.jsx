import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BackNavButton } from '../components/BackNavButton';
import { Handshake, CheckCircle2, XCircle, Clock, Calendar, DollarSign } from 'lucide-react';

export const CollaborationsPage = () => {
  const { currentUser, collaborations, respondToCollaboration } = useAuth();
  const { addToast } = useToast();

  const myCollabs = currentUser?.role === 'creator'
    ? collaborations.filter(c => c.creatorId === currentUser?.id)
    : currentUser?.role === 'customer'
    ? collaborations.filter(c => c.brandId === currentUser?.id)
    : collaborations;

  const handleResponse = (id, status) => {
    respondToCollaboration(id, status);
    addToast(
      status === 'accepted' ? 'Collaboration accepted! Milestone moved to In-Progress.' : 'Collaboration offer declined.',
      status === 'accepted' ? 'success' : 'info'
    );
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="space-y-4">
        <BackNavButton label="Back" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
            Collaboration Requests & Contracts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review partnership agreements, deadlines, deliverables, and deal payouts.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {myCollabs.length === 0 ? (
          <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
            <Handshake className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No active collaboration agreements found.</p>
          </div>
        ) : (
          myCollabs.map((collab) => (
            <div
              key={collab.id}
              className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#006B4F] dark:text-emerald-400">
                    {collab.brandName}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    collab.status === 'completed'
                      ? 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300'
                      : collab.status === 'in-progress'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-[#006B4F] dark:text-emerald-300'
                      : collab.status === 'rejected'
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                  }`}>
                    {collab.status}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#102A43] dark:text-white">
                  {collab.campaignTitle}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>Deliverable:</strong> {collab.deliverable}
                </p>

                {collab.notes && (
                  <p className="text-xs text-slate-400 italic">
                    “{collab.notes}”
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span className="flex items-center gap-1 font-bold text-[#006B4F] dark:text-emerald-400">
                    <DollarSign className="w-3.5 h-3.5" /> ${collab.amount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Due: {collab.dueDate}
                  </span>
                  <span>Partner: <strong>{collab.creatorName}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {collab.status === 'pending' && currentUser?.role === 'creator' && (
                  <>
                    <button
                      onClick={() => handleResponse(collab.id, 'accepted')}
                      className="px-4 py-2 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Accept Offer
                    </button>
                    <button
                      onClick={() => handleResponse(collab.id, 'rejected')}
                      className="px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" /> Decline
                    </button>
                  </>
                )}

                {collab.status === 'in-progress' && (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    In Progress • Assets Under Review
                  </span>
                )}
                {collab.status === 'completed' && (
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800">
                    ✓ Contract Completed & Settled
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
