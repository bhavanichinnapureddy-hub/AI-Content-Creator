import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Handshake,
  DollarSign,
  TrendingUp,
  Award,
  Clock,
  Sparkles,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const CreatorDashboardPage = () => {
  const { currentUser, applications, collaborations, campaigns } = useAuth();

  const myApplications = applications.filter(a => a.creatorId === currentUser?.id);
  const myCollaborations = collaborations.filter(c => c.creatorId === currentUser?.id);

  const stats = [
    { label: 'Total Applications', value: myApplications.length, change: '+2 this week', icon: FileText, color: 'text-blue-500' },
    { label: 'Active Collaborations', value: myCollaborations.filter(c => c.status === 'in-progress').length, change: 'On schedule', icon: Handshake, color: 'text-[#006B4F]' },
    { label: 'Pending Invitations', value: myCollaborations.filter(c => c.status === 'pending').length, change: 'Action required', icon: Clock, color: 'text-amber-500' },
    { label: 'Completed Deals', value: myCollaborations.filter(c => c.status === 'completed').length, change: '5.0 avg review', icon: Award, color: 'text-purple-500' },
  ];

  const chartData = [
    { day: 'Mon', views: 4200, engagement: 290 },
    { day: 'Tue', views: 5600, engagement: 380 },
    { day: 'Wed', views: 7100, engagement: 510 },
    { day: 'Thu', views: 6800, engagement: 470 },
    { day: 'Fri', views: 8900, engagement: 620 },
    { day: 'Sat', views: 12400, engagement: 890 },
    { day: 'Sun', views: 11200, engagement: 810 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
            Creator Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Detailed tracking of your proposals, deal pipeline, and simulated content performance.
          </p>
        </div>

        <div className="flex gap-3">
          <NavLink
            to="/ai-studio"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#102A43] dark:text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> AI Studio
          </NavLink>
          <NavLink
            to="/campaigns"
            className="px-4 py-2 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            Find New Deals
          </NavLink>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.label}</span>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-2xl font-black text-[#102A43] dark:text-white">{s.value}</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Engagement Analytics Chart */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#102A43] dark:text-white">
              Estimated Audience Reach & Engagement
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated across your connected accounts (Simulated demo metrics)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1 text-[#006B4F] dark:text-emerald-400">
              <span className="w-3 h-3 rounded-full bg-[#006B4F] inline-block" /> Weekly Impressions
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006B4F" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#006B4F" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#102A43',
                  borderColor: '#006B4F',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area type="monotone" dataKey="views" stroke="#006B4F" strokeWidth={2} fillOpacity={1} fill="url(#viewsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dual Table Section: Active Applications & Collabs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Applications */}
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#102A43] dark:text-white">
              Recent Applications
            </h3>
            <NavLink to="/applications" className="text-xs font-semibold text-[#006B4F] dark:text-emerald-400 hover:underline">
              View all ({myApplications.length})
            </NavLink>
          </div>

          {myApplications.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No applications submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {myApplications.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between"
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-xs font-bold text-[#102A43] dark:text-white truncate">
                      {app.campaignTitle}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Applied: {app.appliedDate} • Bid: ${app.proposedRate}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    app.status === 'accepted'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-[#006B4F] dark:text-emerald-300'
                      : app.status === 'rejected'
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Collaborations */}
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#102A43] dark:text-white">
              Brand Collaborations Pipeline
            </h3>
            <NavLink to="/collaborations" className="text-xs font-semibold text-[#006B4F] dark:text-emerald-400 hover:underline">
              Manage Deals ({myCollaborations.length})
            </NavLink>
          </div>

          {myCollaborations.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No collaborations yet.</p>
          ) : (
            <div className="space-y-3">
              {myCollaborations.slice(0, 4).map((collab) => (
                <div
                  key={collab.id}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between"
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-xs font-bold text-[#102A43] dark:text-white truncate">
                      {collab.brandName}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {collab.campaignTitle} • ${collab.amount}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    collab.status === 'completed'
                      ? 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300'
                      : collab.status === 'in-progress'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-[#006B4F] dark:text-emerald-300'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                  }`}>
                    {collab.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
