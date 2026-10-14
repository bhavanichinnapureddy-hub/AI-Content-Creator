import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UserAvatar } from '../components/UserAvatar';
import {
  ShieldAlert,
  Users,
  Briefcase,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  UserCheck,
  MessageSquare,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { formatRelativeOrExactTime } from '../utils/timestamps';

export const AdminHomePage = () => {
  const {
    creators,
    customers,
    campaigns,
    collaborations,
    reports,
    messages,
    verifyCreator,
    resolveReport,
    approveRequest,
    rejectRequest
  } = useAuth();

  const { addToast } = useToast();

  const pendingVerifications = creators.filter(c => c.verificationStatus === 'pending');
  const pendingReports = reports.filter(r => r.status === 'pending');

  // Compute accurate platform usage counts directly from database/state
  const platformsList = [
    { name: 'Instagram', match: 'instagram' },
    { name: 'YouTube', match: 'youtube' },
    { name: 'LinkedIn', match: 'linkedin' },
    { name: 'TikTok', match: 'tiktok' },
    { name: 'Twitter / X', match: 'twitter' }
  ];

  const platformAnalytics = platformsList.map(p => {
    const creatorCount = creators.filter(c => (c.platform || '').toLowerCase().includes(p.match)).length;
    const campaignCount = campaigns.filter(c => (c.platform || '').toLowerCase().includes(p.match)).length;
    const totalCount = creatorCount + campaignCount;
    return {
      platform: p.name,
      Creators: creatorCount,
      Campaigns: campaignCount,
      Total: totalCount
    };
  });

  const handleVerify = (id, name, approve) => {
    verifyCreator(id, approve);
    addToast(
      approve ? `Verified badge granted to ${name}.` : `Verification request for ${name} was rejected.`,
      approve ? 'success' : 'info'
    );
  };

  const handleResolveReport = (reportId, resolution) => {
    resolveReport(reportId, resolution);
    addToast(`Report marked as ${resolution}.`, 'success');
  };

  const handleApproveMessage = (msgId, senderName) => {
    approveRequest(msgId);
    addToast(`Request from ${senderName} approved and marked as processed.`, 'success');
  };

  const handleRejectMessage = (msgId, senderName) => {
    rejectRequest(msgId);
    addToast(`Request from ${senderName} declined and marked as processed.`, 'info');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Admin Hero Header */}
      <div className="bg-[#003B46] text-white rounded-3xl p-8 border border-[#07575B] shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-[#48E5C2] border border-[#48E5C2]/30 text-xs font-semibold uppercase tracking-wider mb-3">
            <UserCheck className="w-4 h-4 text-[#48E5C2]" /> CreatorSphere AI System Admin
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Administrator Command Center
          </h1>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-time oversight over platform analytics, creator badge authentication, incoming brand deal requests, and trust & safety moderation.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <NavLink
              to="/admin/verify-creators"
              className="px-4 py-2.5 rounded-xl bg-[#00796B] hover:bg-[#005F54] text-white text-xs font-bold shadow-md shadow-teal-950/40 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Review Pending Creators ({pendingVerifications.length})</span>
            </NavLink>
            <NavLink
              to="/admin/reports"
              className="px-4 py-2.5 rounded-xl bg-[#002B33] hover:bg-[#07575B] text-white text-xs font-bold border border-[#07575B] flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>View Open Reports ({pendingReports.length})</span>
            </NavLink>
          </div>
        </div>

        <div className="absolute right-4 -bottom-8 opacity-10 pointer-events-none">
          <ShieldAlert className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Key Metric Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Creators</span>
            <Users className="w-5 h-5 text-[#00796B] dark:text-[#48E5C2]" />
          </div>
          <div className="text-2xl font-black text-[#003B46] dark:text-white">{creators.length}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {creators.filter(c => c.verified).length} verified accounts
          </p>
        </div>

        <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Brands & Clients</span>
            <Briefcase className="w-5 h-5 text-cyan-500" />
          </div>
          <div className="text-2xl font-black text-[#003B46] dark:text-white">{customers.length}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Active verified companies</p>
        </div>

        <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Campaigns Live</span>
            <FileCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-[#003B46] dark:text-white">{campaigns.length}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {collaborations.length} total collabs
          </p>
        </div>

        <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Action Queue</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {pendingVerifications.length + pendingReports.length + messages.filter(m => m.status === 'Pending').length}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Pending admin processing</p>
        </div>
      </div>

      {/* Platform Usage Analytics Section (Instagram, YouTube, LinkedIn, TikTok, Twitter/X) */}
      <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-black text-[#003B46] dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#00796B] dark:text-[#48E5C2]" />
              Platform Usage Analytics
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Live distribution of active creator portfolios and brand campaigns across social platforms.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-[#00796B] dark:text-[#48E5C2]">
              <span className="w-3 h-3 rounded-full bg-[#00796B]" /> Creators
            </span>
            <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
              <span className="w-3 h-3 rounded-full bg-cyan-500" /> Campaigns
            </span>
          </div>
        </div>

        {/* Breakdown Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {platformAnalytics.map((stat) => (
            <div
              key={stat.platform}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 text-center"
            >
              <p className="text-xs font-extrabold text-[#003B46] dark:text-white">{stat.platform}</p>
              <p className="text-lg font-black text-[#00796B] dark:text-[#48E5C2] mt-0.5">{stat.Total}</p>
              <p className="text-[10px] text-slate-400">
                {stat.Creators} Creators • {stat.Campaigns} Deals
              </p>
            </div>
          ))}
        </div>

        {/* Real-Data Bar Chart with exact integer counts */}
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformAnalytics} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="platform" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} tickLine={false} unit=" acts" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#003B46',
                  borderColor: '#00796B',
                  color: '#ffffff',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="Creators" fill="#00796B" radius={[6, 6, 0, 0]} barSize={28} />
              <Bar dataKey="Campaigns" fill="#06B6D4" radius={[6, 6, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Incoming Requests & Real-Time Messages Table */}
      <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-black text-[#003B46] dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#00796B] dark:text-[#48E5C2]" />
              Incoming Requests & Real-Time Deal Inquiries
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Review incoming creator and brand messages. Approve or reject requests with real-time status updates.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/60 text-[#00796B] dark:text-[#48E5C2]">
            {messages.length} Total Messages
          </span>
        </div>

        {messages.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 dark:bg-slate-900/40 rounded-2xl">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
            <p className="text-sm font-bold text-[#003B46] dark:text-white">All queues are clear</p>
            <p className="text-xs text-slate-400 mt-0.5">No pending messages or collaboration inquiries.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Sender</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Message / Request</th>
                  <th className="p-4">Received Date & Time</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-4">
                      <div className="font-bold text-[#003B46] dark:text-white flex items-center gap-2">
                        <span>{msg.senderName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        msg.senderRole === 'creator'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-[#00796B] dark:text-[#48E5C2]'
                          : 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300'
                      }`}>
                        {msg.senderRole === 'customer' ? 'Brand Client' : msg.senderRole}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs sm:max-w-md">
                      <p className="text-slate-800 dark:text-slate-200 font-medium line-clamp-2">
                        {msg.text}
                      </p>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 block">
                        Type: {msg.requestType || 'Inquiry'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatRelativeOrExactTime(msg.createdAt, msg.timestamp)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        msg.status === 'Approved'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : msg.status === 'Rejected'
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                      }`}>
                        {msg.status === 'Approved' ? 'Approved' : msg.status === 'Rejected' ? 'Rejected' : 'Pending Review'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {msg.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleApproveMessage(msg.id, msg.senderName)}
                            className="px-3 py-1.5 rounded-xl bg-[#00796B] hover:bg-[#005F54] text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => handleRejectMessage(msg.id, msg.senderName)}
                            className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400 italic">
                          Processed & Read
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admin Action Workbenches: Pending Creator Verifications & Complaints */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Creator Verification Requests */}
        <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#003B46] dark:text-white">
                Pending Creator Verifications
              </h3>
              <p className="text-xs text-slate-400">Evaluate identity & channel authentications</p>
            </div>
            <NavLink
              to="/admin/verify-creators"
              className="text-xs font-bold text-[#00796B] dark:text-[#48E5C2] hover:underline"
            >
              All Creators →
            </NavLink>
          </div>

          {pendingVerifications.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/40 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
              <p className="text-xs text-slate-500 dark:text-slate-400">All verification queues are clear!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingVerifications.map((creator) => (
                <div
                  key={creator.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      src={creator.avatar}
                      name={creator.name}
                      size="md"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#003B46] dark:text-white">
                        {creator.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {creator.category} • {creator.platform} • {creator.followers.toLocaleString()} followers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVerify(creator.id, creator.name, true)}
                      className="px-3 py-1.5 rounded-xl bg-[#00796B] hover:bg-[#005F54] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => handleVerify(creator.id, creator.name, false)}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Complaints & Reports */}
        <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#003B46] dark:text-white">
                Reports & Content Flags
              </h3>
              <p className="text-xs text-slate-400">Community safety violations</p>
            </div>
            <NavLink
              to="/admin/reports"
              className="text-xs font-bold text-[#00796B] dark:text-[#48E5C2] hover:underline"
            >
              Full Queue →
            </NavLink>
          </div>

          {reports.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/40 rounded-2xl">
              <p className="text-xs text-slate-400">No active complaints flagged.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-[#003B46] dark:text-white">
                      Flag: {report.targetName}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      report.status === 'resolved'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-[#00796B] dark:text-[#48E5C2]'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                    {report.reason}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span>Reported by: {report.reportedBy}</span>
                    {report.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResolveReport(report.id, 'resolved')}
                          className="text-[#00796B] dark:text-[#48E5C2] font-bold hover:underline cursor-pointer"
                        >
                          Resolve Flag
                        </button>
                        <button
                          onClick={() => handleResolveReport(report.id, 'dismissed')}
                          className="text-slate-400 hover:underline cursor-pointer"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
