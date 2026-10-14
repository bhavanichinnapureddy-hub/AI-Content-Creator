import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { useAuthStore } from '@/stores/authStore';
import { 
  ArrowLeft, 
  Sparkles, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Layers, 
  FileCheck 
} from 'lucide-react';

export default function BriefDetail() {
  const { id } = useParams<{ id: string }>();
  const { briefs, applyToBrief } = useMarketplaceStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [proposedBudget, setProposedBudget] = useState(2200);
  const [pitchNote, setPitchNote] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const brief = briefs.find((b) => b.id === id) || briefs[0];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    applyToBrief(brief.id, user?.id || 'creator-1', proposedBudget, pitchNote);
    setAppliedSuccess(true);
    setTimeout(() => {
      setApplyModalOpen(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />

      <div className="border-b border-slate-800 bg-slate-900/40 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => history.back()}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to previous page
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Header Block */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-400">
                  {brief.brandName}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">Posted on {brief.createdAt}</span>
                {brief.isAiGenerated && (
                  <span className="px-2 py-0.5 rounded-full bg-accent-950/60 text-accent-300 border border-accent-800/60 text-[10px] font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI-Assisted Brief
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {brief.title}
              </h1>
              <p className="text-xs text-slate-400 mt-2">
                Format: <strong className="text-white">{brief.contentType}</strong> • Ratio:{' '}
                <strong className="text-white">{brief.aspectRatio}</strong> • Duration:{' '}
                <strong className="text-white">{brief.durationSeconds}s</strong>
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="text-2xl font-extrabold text-emerald-400">
                ${brief.budgetMin} - ${brief.budgetMax}
              </div>
              <button
                onClick={() => setApplyModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-brand text-white font-semibold text-xs shadow-glow-primary hover:opacity-95 transition flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Application Pitch
              </button>
            </div>
          </div>
        </div>

        {/* Narrative & Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                Campaign Goal & Objective
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {brief.campaignGoal}
              </p>

              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                Detailed Brief Narrative
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {brief.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Creative Do's
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {brief.dos.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span className="font-bold">✕</span> Creative Don'ts
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {brief.donts.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Production Parameters
              </h3>

              <div className="text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Deadline:</span>
                  <span className="font-bold text-white">{brief.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deliverables:</span>
                  <span className="font-semibold text-white">{brief.deliverableCount} Master Files</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Language:</span>
                  <span className="font-semibold text-white">{brief.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Audience:</span>
                  <span className="font-semibold text-white truncate max-w-[150px]">{brief.targetAudience}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">
                  Commercial Rights:
                </span>
                <span className="text-xs font-semibold text-emerald-400 block mb-1">
                  {brief.commercialUseType}
                </span>
                <span className="text-[11px] text-slate-500">
                  Escrow automatically releases upon brand approval.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Pitch Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            {appliedSuccess ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Pitch Submitted!</h3>
                <p className="text-xs text-slate-400">
                  The brand will review your proposal and linked AI portfolio.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-1">
                  Pitch for "{brief.title}"
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  Outline your intended AI toolstack and proposal for this creative brief.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Proposed Budget (USD)
                  </label>
                  <input
                    type="number"
                    required
                    value={proposedBudget}
                    onChange={(e) => setProposedBudget(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Creator Pitch & Toolchain Proposal
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={pitchNote}
                    onChange={(e) => setPitchNote(e.target.value)}
                    placeholder="Describe how you will achieve the desired motion, lighting, and resolution using Runway, ComfyUI, etc..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setApplyModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-brand text-white font-semibold text-xs shadow-glow-primary"
                  >
                    Send Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
