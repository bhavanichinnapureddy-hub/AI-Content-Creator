import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Bell, CheckCheck, Clock, Info, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { formatRelativeOrExactTime } from '../utils/timestamps';

export const NotificationsPage = () => {
  const { currentUser, notifications, markAllNotificationsAsRead } = useAuth();
  const { addToast } = useToast();

  const userNotifs = notifications.filter(n =>
    n.recipientRole === currentUser?.role ||
    n.recipientId === currentUser?.id ||
    n.recipientId === 'all'
  );

  const handleMarkAll = () => {
    markAllNotificationsAsRead();
    addToast('All notifications marked as read.', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
            Notifications Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time activity updates regarding collaborations, campaigns, and account status.
          </p>
        </div>

        {userNotifs.length > 0 && (
          <button
            onClick={handleMarkAll}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-200"
          >
            <CheckCheck className="w-4 h-4 text-[#006B4F] dark:text-emerald-400" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
        {userNotifs.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">You are all caught up!</p>
            <p className="text-xs text-slate-400 mt-1">No pending notifications right now.</p>
          </div>
        ) : (
          userNotifs.map((n) => (
            <div
              key={n.id}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                !n.read ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : 'hover:bg-slate-50/50 dark:hover:bg-slate-900/40'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#006B4F]/10 dark:bg-emerald-950 text-[#006B4F] dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                {n.type === 'collab' ? (
                  <Sparkles className="w-5 h-5" />
                ) : n.type === 'admin' ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : (
                  <Bell className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-[#102A43] dark:text-white truncate">
                    {n.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                    {formatRelativeOrExactTime(n.createdAt, n.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {n.message}
                </p>
              </div>

              {!n.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#006B4F] dark:bg-emerald-400 shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
