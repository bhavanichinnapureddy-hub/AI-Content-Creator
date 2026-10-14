import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BackNavButton } from '../components/BackNavButton';
import {
  FileText,
  Users,
  PlusCircle,
  Clock,
  CheckCircle,
  Eye,
  Trash2,
  DollarSign,
  Compass,
  ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const CustomerDashboardPage = () => {
  const { currentUser, campaigns, collaborations, applications } = useAuth();

  const myCampaigns = campaigns.filter(c => c.brandId === currentUser?.id);
  const myCollaborations = collaborations.filter(c => c.brandId === currentUser?.id);
  const pendingApps = applications.filter(a => myCampaigns.some(c => c.id === a.campaignId) && a.status === 'pending');

  const stats = [
    { label: 'Total Campaigns', value: myCampaigns.length, icon: FileText, color: 'text-blue-500' },
    { label: 'Contracted Creators', value: myCollaborations.length, icon: Users, color: 'text-[#006B4F]' },
    { label: 'Pending Proposals', value: pendingApps.length, icon: Clock, color: 'text-amber-500' },
    { label: 'Completed Deliverables', value: myCollaborations.filter(c => c.status === 'completed').length, icon: CheckCircle, color: 'text-purple-500' }
  ];

  const campaignPerfData = myCampaigns.length > 0
    ? myCampaigns.slice(0, 5).map(c => ({
        name: c.title.length > 15 ? c.title.slice(0, 15) + '...' : c.title,
        views: (c.budget || 500) * 18,
        reach: (c.budget || 500) * 12
      }))
    : [
        { name: 'Audio Launch', views: 24000, reach: 18500 },
        { name: 'Fitness Series', views: 42000, reach: 31000 },
        { name: 'Eco Pack', views: 19500, reach: 14200 }
      ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackNavButton fallbackPath="/customer/home" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
              Brand Customer Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Welcome {currentUser?.name}. Real-time statistics across your creative campaigns and talent partnerships.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            to="/discover-creators"
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Compass className="w-4 h-4 text-[#006B4F] dark:text-emerald-400" />
            <span>Find Creators</span>
          </NavLink>
          <NavLink
            to="/create-campaign"
            className="px-4 py-2 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Launch Campaign</span>
          </NavLink>
        </div>
      </div>

      {/* Metrics Grid */}
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
            </div>
          );
        })}
      </div>

      {/* Performance Bar Chart */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#102A43] dark:text-white mb-1">
          Audience Impressions by Campaign
        </h3>
        <p className="text-xs text-slate-400 mb-6">Aggregated organic creator reach (Simulated metrics)</p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignPerfData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
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
              <Bar dataKey="views" fill="#006B4F" radius={[4, 4, 0, 0]} name="Video Views" />
              <Bar dataKey="reach" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Unique Reach" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Brand Campaigns Overview Table */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#102A43] dark:text-white">
            Your Active Campaigns
          </h3>
          <NavLink to="/create-campaign" className="text-xs font-semibold text-[#006B4F] dark:text-emerald-400 hover:underline">
            + New Campaign
          </NavLink>
        </div>

        {myCampaigns.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">No campaigns created yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="p-3">Campaign</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Platform</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Proposals</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {myCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-3 font-bold text-[#102A43] dark:text-white">
                      {camp.title}
                    </td>
                    <td className="p-3 font-semibold text-[#006B4F] dark:text-emerald-400">
                      ${camp.budget}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      {camp.platform}
                    </td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">
                      {camp.deadline}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      {camp.applicationsCount} applicants
                    </td>
                    <td className="p-3 text-right">
                      <NavLink
                        to={`/campaign/${camp.id}`}
                        className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        Details
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
