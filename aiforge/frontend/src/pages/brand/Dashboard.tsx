import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { useAuthStore } from '@/stores/authStore';
import { 
  PlusCircle, 
  Layers, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  DollarSign, 
  FileText,
  Sparkles
} from 'lucide-react';

export default function BrandDashboard() {
  const { briefs, engagements, walletBalance } = useMarketplaceStore();
  const { user } = useAuthStore();

  const inEscrowTotal = engagements
    .filter((e) => e.escrowStatus === 'IN_ESCROW')
    .reduce((sum, e) => sum + e.agreedBudget, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar activeTab="dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-400">
                Brand Workspace
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[10px] font-bold">
                Active Client
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.displayName || 'Brand Executive'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Track active AI video briefs, review milestone drafts, approve deliverables, and manage escrow disbursements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/briefs/new"
              className="px-4 py-2.5 rounded-xl bg-gradient-brand text-white font-semibold text-xs shadow-glow-primary hover:opacity-95 transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              New Creative Brief
            </Link>
            <Link
              to="/creators"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center gap-1.5"
            >
              <Search className="w-4 h-4 text-primary-400" />
              Find AI Creators
            </Link>
          </div>
        </div>

        {/* Financial & Project Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Simulated Wallet
              </span>
              <CreditCard className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              ${walletBalance.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              Available for new briefs
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Locked in Escrow
              </span>
              <DollarSign className="w-4 h-4 text-accent-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              ${inEscrowTotal.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Released upon final delivery
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Active Engagements
              </span>
              <Clock className="w-4 h-4 text-primary-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {engagements.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Currently in milestone review
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Published Briefs
              </span>
              <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {briefs.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Receiving creator applications
            </div>
          </div>
        </div>

        {/* Section 1: Active Engagements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-400" />
              Active Engagements & Deliverables ({engagements.length})
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-800">
              {engagements.map((eng) => (
                <div
                  key={eng.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-850/50 transition"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={eng.creatorAvatar}
                      alt={eng.creatorName}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary-500/20"
                    />
                    <div>
                      <Link
                        to={`/engagements/${eng.id}`}
                        className="font-bold text-white text-sm hover:text-primary-400 transition"
                      >
                        {eng.briefTitle}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span>Creator: <strong className="text-slate-300">{eng.creatorName}</strong></span>
                        <span>•</span>
                        <span>Budget: <strong className="text-slate-300">${eng.agreedBudget}</strong></span>
                        <span>•</span>
                        <span>Revisions: <strong className="text-slate-300">{eng.revisionCount}/{eng.maxRevisions}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-primary-950/60 text-primary-300 border border-primary-800/60">
                      {eng.status.replace('_', ' ')}
                    </span>
                    <Link
                      to={`/engagements/${eng.id}`}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1 transition"
                    >
                      Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Published Briefs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent-400" />
              Published Creative Briefs ({briefs.length})
            </h2>
            <Link to="/briefs/new" className="text-xs text-primary-400 hover:text-primary-300 font-semibold flex items-center gap-1">
              Create New <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {briefs.map((brief) => (
              <div
                key={brief.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {brief.contentType} • {brief.aspectRatio}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      ${brief.budgetMin} - ${brief.budgetMax}
                    </span>
                  </div>

                  <Link
                    to={`/briefs/${brief.id}`}
                    className="font-bold text-white text-sm hover:text-primary-400 transition block mb-1.5"
                  >
                    {brief.title}
                  </Link>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {brief.campaignGoal}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Applications: <strong className="text-white">{brief.applicantCount}</strong></span>
                  <Link
                    to={`/briefs/${brief.id}`}
                    className="text-primary-400 hover:text-primary-300 font-semibold flex items-center gap-1"
                  >
                    View Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
