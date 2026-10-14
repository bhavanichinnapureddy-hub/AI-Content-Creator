import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { useAuthStore } from '@/stores/authStore';
import { 
  Sparkles, 
  Upload, 
  Layers, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  ShieldCheck, 
  FileText,
  Star
} from 'lucide-react';

export default function CreatorDashboard() {
  const { engagements, briefs, creators } = useMarketplaceStore();
  const { user } = useAuthStore();

  const currentCreator = creators[0]; // Alex Vance demo creator profile

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar activeTab="creator-dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Creator Banner */}
        <div className="bg-gradient-to-r from-accent-950/60 to-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src={currentCreator.avatarUrl}
              alt={currentCreator.displayName}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-accent-500/30"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-400">
                  AI Creator Studio
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[10px] font-bold">
                  Verified Creator
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white">
                {currentCreator.displayName}
              </h1>
              <p className="text-xs text-slate-400">
                {currentCreator.headline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/creators/${currentCreator.id}`}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
            >
              Public Profile View
            </Link>
          </div>
        </div>

        {/* Creator Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Escrow Pipeline
              </span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              $2,400
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Secured in milestone contracts
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Rating & Reviews
              </span>
              <Star className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              4.98 ★
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Based on 38 brand evaluations
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Portfolio Assets
              </span>
              <Sparkles className="w-4 h-4 text-accent-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {currentCreator.portfolio.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Commercial generative works
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Verification Badges
              </span>
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              3 of 3
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Tool, Workflow & Past Work
            </div>
          </div>
        </div>

        {/* Active Client Engagements */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-400" />
            Active Brand Milestones & Draft Submissions ({engagements.length})
          </h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="divide-y divide-slate-800">
              {engagements.map((eng) => (
                <div
                  key={eng.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-850/50 transition"
                >
                  <div>
                    <span className="text-xs font-bold text-accent-400 uppercase tracking-wider">
                      Client: {eng.brandName}
                    </span>
                    <h3 className="font-bold text-white text-base mt-0.5">
                      {eng.briefTitle}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span>Milestone Budget: <strong className="text-white">${eng.agreedBudget}</strong></span>
                      <span>•</span>
                      <span>Revisions Used: <strong className="text-white">{eng.revisionCount}/{eng.maxRevisions}</strong></span>
                      <span>•</span>
                      <span>Due: <strong className="text-white">{eng.deadline}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-accent-950/60 text-accent-300 border border-accent-800/60">
                      {eng.status.replace('_', ' ')}
                    </span>
                    <Link
                      to={`/engagements/${eng.id}`}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-brand text-white text-xs font-semibold flex items-center gap-1 shadow-glow-primary transition"
                    >
                      Submit Draft / Message <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marketplace Briefs Open for Applications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Open Market Briefs You Can Pitch
            </h2>
            <Link to="/briefs/new" className="text-xs text-primary-400 font-semibold">
              Browse All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {briefs.map((brief) => (
              <div
                key={brief.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-bold text-primary-400">
                      {brief.brandName}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      ${brief.budgetMin} - ${brief.budgetMax}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1.5">
                    {brief.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {brief.campaignGoal}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Duration: {brief.durationSeconds}s</span>
                  <Link
                    to={`/briefs/${brief.id}`}
                    className="text-primary-400 hover:text-primary-300 font-semibold flex items-center gap-1"
                  >
                    View Brief & Apply <ArrowRight className="w-3 h-3" />
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
