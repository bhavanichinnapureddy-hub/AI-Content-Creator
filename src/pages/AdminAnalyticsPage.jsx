import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BackNavButton } from '../components/BackNavButton';
import { BarChart3, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const AdminAnalyticsPage = () => {
  const { creators, customers, campaigns, collaborations } = useAuth();

  const volumeData = [
    { month: 'Jun', gm: 18000, deals: 34 },
    { month: 'Jul', gm: 24500, deals: 48 },
    { month: 'Aug', gm: 32000, deals: 62 },
    { month: 'Sep', gm: 41500, deals: 81 },
    { month: 'Oct', gm: 53000, deals: 104 },
  ];

  const categoryDistribution = [
    { name: 'Tech & Gadgets', value: creators.filter(c => c.category?.includes('Tech')).length || 1, color: '#006B4F' },
    { name: 'Fitness & Wellness', value: creators.filter(c => c.category?.includes('Fitness')).length || 1, color: '#3b82f6' },
    { name: 'Fashion & Beauty', value: creators.filter(c => c.category?.includes('Fashion')).length || 1, color: '#8b5cf6' },
    { name: 'Food & Cooking', value: creators.filter(c => c.category?.includes('Food')).length || 1, color: '#f59e0b' },
    { name: 'Gaming & Others', value: 2, color: '#ec4899' },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackNavButton fallbackPath="/admin/home" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
              Platform Analytics & Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Cross-platform GMV volume, creator category distributions, and marketplace metrics.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Marketplace GMV</span>
          <p className="text-2xl font-black text-[#006B4F] dark:text-emerald-400 mt-1">$169,000</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">+28% growth MoM</span>
        </div>
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Active Deals</span>
          <p className="text-2xl font-black text-[#102A43] dark:text-white mt-1">{collaborations.length}</p>
          <span className="text-[11px] text-slate-400 font-semibold">In escrow & delivered</span>
        </div>
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Creators</span>
          <p className="text-2xl font-black text-[#102A43] dark:text-white mt-1">{creators.length}</p>
          <span className="text-[11px] text-blue-500 font-semibold">{creators.filter(c => c.verified).length} verified</span>
        </div>
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Campaign Velocity</span>
          <p className="text-2xl font-black text-[#102A43] dark:text-white mt-1">{campaigns.length}</p>
          <span className="text-[11px] text-slate-400 font-semibold">Active briefs posted</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#102A43] dark:text-white mb-1">
            Monthly GMV & Volume ($)
          </h3>
          <p className="text-xs text-slate-400 mb-4">Total gross volume processed through CreatorSphere AI</p>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
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
                <Bar dataKey="gm" fill="#006B4F" radius={[4, 4, 0, 0]} name="GMV ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#102A43] dark:text-white mb-1">
            Creator Niche Distribution
          </h3>
          <p className="text-xs text-slate-400 mb-4">Talent categories breakdown across registered creators</p>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
