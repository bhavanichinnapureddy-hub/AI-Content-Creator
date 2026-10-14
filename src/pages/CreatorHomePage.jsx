import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  FileCheck,
  Clock,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Briefcase,
  Bookmark,
  Share2,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const CreatorHomePage = () => {
  const { currentUser, campaigns, collaborations, applications, savedCampaignIds, toggleSaveCampaign } = useAuth();
  const { addToast } = useToast();

  const myApplications = applications.filter(a => a.creatorId === currentUser?.id);
  const myCollaborations = collaborations.filter(c => c.creatorId === currentUser?.id);
  const activeCollabs = myCollaborations.filter(c => c.status === 'in-progress');
  const pendingRequests = myCollaborations.filter(c => c.status === 'pending');
  const completedProjects = myCollaborations.filter(c => c.status === 'completed');

  // Realistic simulated earnings chart
  const earningsData = [
    { month: 'Jun', earnings: 450 },
    { month: 'Jul', earnings: 850 },
    { month: 'Aug', earnings: 1200 },
    { month: 'Sep', earnings: 1850 },
    { month: 'Oct', earnings: 2100 },
    { month: 'Nov (Est)', earnings: 2750 },
  ];

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    let score = 40; // baseline
    if (currentUser?.bio) score += 15;
    if (currentUser?.portfolio?.length > 0) score += 20;
    if (currentUser?.socialLinks?.instagram) score += 15;
    if (currentUser?.verified) score += 10;
    return Math.min(score, 100);
  };

  const profileScore = calculateProfileCompletion();

  // Recommended campaigns based on creator category or platform
  const recommendedCampaigns = campaigns
    .filter(c => c.status === 'active')
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#102A43] via-[#0d2238] to-[#006B4F] p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Creator Workspace
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {currentUser?.name}! 👋
          </h1>
          <p className="mt-2 text-slate-200 text-sm sm:text-base leading-relaxed">
            Your portfolio is active in the marketplace. You have {activeCollabs.length} active brand partnerships and {recommendedCampaigns.length} campaigns matching your style.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <NavLink
              to="/campaigns"
              className="px-5 py-2.5 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-sm font-semibold shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Discover Campaigns</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
            <NavLink
              to="/ai-studio"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm font-semibold border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Open AI Content Studio</span>
            </NavLink>
          </div>
        </div>

        {/* Decorative corner icon */}
        <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none">
          <Briefcase className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Profile Completion Meter */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
          <div>
            <h3 className="text-base font-bold text-[#102A43] dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#006B4F] dark:text-emerald-400" />
              Profile Completion Status
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Profiles above 85% receive 3.5x more direct brand collaboration invitations.
            </p>
          </div>
          <span className="text-lg font-black text-[#006B4F] dark:text-emerald-400">
            {profileScore}% Completed
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-[#006B4F] h-full rounded-full transition-all duration-500"
            style={{ width: `${profileScore}%` }}
          />
        </div>
        {profileScore < 100 && (
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Tip: Add more portfolio samples or verify your identity for max exposure.
            </span>
            <NavLink to="/portfolio" className="text-[#006B4F] dark:text-emerald-400 font-semibold hover:underline">
              Add Portfolio Samples →
            </NavLink>
          </div>
        )}
      </div>

      {/* Metrics Stat Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Applications</span>
            <FileCheck className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-[#102A43] dark:text-white">{myApplications.length}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Submitted proposals</p>
        </div>

        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Deals</span>
            <Briefcase className="w-5 h-5 text-[#006B4F] dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-[#102A43] dark:text-white">{activeCollabs.length}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">In progress milestones</p>
        </div>

        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Invites</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-[#102A43] dark:text-white">{pendingRequests.length}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Awaiting your response</p>
        </div>

        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Est. Earnings</span>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-[#006B4F] dark:text-emerald-400">$3,450</div>
          <p className="text-[10px] text-slate-400 mt-1 font-medium">Demo simulated metric</p>
        </div>
      </div>

      {/* Main Grid: Recommended Campaigns & Demo Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recommended Campaigns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] dark:text-white">
                Recommended Brand Campaigns
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Curated open opportunities matching your primary category ({currentUser?.category || 'All'})
              </p>
            </div>
            <NavLink
              to="/campaigns"
              className="text-xs font-semibold text-[#006B4F] dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              Browse All ({campaigns.length}) <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          <div className="space-y-4">
            {recommendedCampaigns.map((camp) => {
              const isSaved = savedCampaignIds.includes(camp.id);
              const alreadyApplied = myApplications.some(a => a.campaignId === camp.id);

              return (
                <div
                  key={camp.id}
                  className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={camp.brandLogo}
                        alt={camp.brandName}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                      />
                      <div>
                        <span className="text-xs font-semibold text-[#006B4F] dark:text-emerald-400 uppercase tracking-wider">
                          {camp.brandName}
                        </span>
                        <h4 className="text-base font-bold text-[#102A43] dark:text-white">
                          {camp.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveCampaign(camp.id)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isSaved
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-[#006B4F] dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white'
                      }`}
                      title={isSaved ? 'Saved' : 'Save Campaign'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {camp.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                    <span className="font-bold text-[#006B4F] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                      Budget: ${camp.budget}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      Platform: {camp.platform}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      Category: {camp.category}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 ml-auto">
                      Deadline: {camp.deadline}
                    </span>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {camp.applicationsCount} applicants applied
                    </span>
                    <NavLink
                      to={`/campaign/${camp.id}`}
                      className="px-4 py-2 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {alreadyApplied ? 'View Application' : 'View & Apply'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Performance Analytics & Quick Action Tools */}
        <div className="space-y-6">
          {/* Earnings Chart */}
          <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#102A43] dark:text-white">
                  Earnings Trend
                </h3>
                <p className="text-[11px] text-slate-400">Simulated monthly payouts</p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-[#006B4F] dark:text-emerald-300">
                +24% MoM
              </span>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#102A43',
                      borderColor: '#006B4F',
                      color: '#ffffff',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="earnings" fill="#006B4F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2 italic">
              *Demo simulated data for visualization purposes
            </p>
          </div>

          {/* AI Content Studio Quick Launcher */}
          <div className="bg-gradient-to-br from-emerald-900/30 to-[#102A43] border border-emerald-500/30 rounded-2xl p-6 text-white shadow-sm">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" /> Built-in Creator Utility
            </div>
            <h4 className="text-lg font-bold text-white mb-1">
              Need Fresh Campaign Content?
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Use our AI Content Studio to draft instant video hooks, viral captions, and targeted hashtags.
            </p>
            <NavLink
              to="/ai-studio"
              className="w-full py-2.5 px-4 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Launch AI Studio
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
