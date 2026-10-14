import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Briefcase,
  DollarSign,
  Calendar,
  Layers,
  CheckCircle2,
  Bookmark,
  Share2,
  ArrowLeft,
  Send,
  AlertCircle
} from 'lucide-react';

export const CampaignDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campaigns, currentUser, applyToCampaign, applications, savedCampaignIds, toggleSaveCampaign } = useAuth();
  const { addToast } = useToast();

  const campaign = campaigns.find(c => c.id === id) || campaigns[0];
  const isSaved = savedCampaignIds.includes(campaign.id);

  // Check if current creator already applied
  const existingApp = applications.find(
    a => a.campaignId === campaign.id && a.creatorId === currentUser?.id
  );

  const [pitch, setPitch] = useState('');
  const [proposedRate, setProposedRate] = useState(campaign.budget);
  const [submitting, setSubmitting] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/creator/login');
      return;
    }
    if (currentUser.role !== 'creator') {
      addToast('Only registered creator accounts can submit applications.', 'error');
      return;
    }

    if (!pitch.trim()) {
      addToast('Please provide a short pitch or description of your creative strategy.', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      applyToCampaign(campaign.id, pitch, proposedRate);
      addToast('Application submitted successfully to the brand!', 'success');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#102A43] dark:hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Campaigns
      </button>

      {/* Main Campaign Card */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src={campaign.brandLogo}
              alt={campaign.brandName}
              className="w-16 h-16 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006B4F] dark:text-emerald-400">
                {campaign.brandName}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#102A43] dark:text-white">
                {campaign.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleSaveCampaign(campaign.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-[#006B4F]'
                  : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>

        {/* Campaign Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-100 dark:border-slate-800 text-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Budget</span>
            <span className="text-lg font-black text-[#006B4F] dark:text-emerald-400">${campaign.budget}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Platform</span>
            <span className="text-lg font-black text-[#102A43] dark:text-white">{campaign.platform}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Category</span>
            <span className="text-lg font-black text-[#102A43] dark:text-white">{campaign.category}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Deadline</span>
            <span className="text-lg font-black text-[#102A43] dark:text-white">{campaign.deadline}</span>
          </div>
        </div>

        {/* Brief Details */}
        <div className="py-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Campaign Overview</h3>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {campaign.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Expected Deliverables</h3>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {campaign.deliverables}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Creator Requirements</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {campaign.requirements}
            </p>
          </div>
        </div>

        {/* Application Section */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          {existingApp ? (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#006B4F] dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                  You Have Already Applied
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">
                  Status: <strong>{existingApp.status.toUpperCase()}</strong> • Proposed Rate: <strong>${existingApp.proposedRate}</strong>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
                  “{existingApp.pitch}”
                </p>
              </div>
            </div>
          ) : currentUser?.role === 'creator' ? (
            <form onSubmit={handleApply} className="space-y-4">
              <h3 className="text-base font-bold text-[#102A43] dark:text-white">
                Submit Your Proposal
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Proposed Compensation ($)
                </label>
                <input
                  type="number"
                  value={proposedRate}
                  onChange={(e) => setProposedRate(e.target.value)}
                  className="w-full sm:w-60 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Why are you the best fit? (Creative Pitch) *
                </label>
                <textarea
                  rows="4"
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  placeholder="Describe your audience synergy, past brand results, and creative direction idea..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="py-3 px-6 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting Application...' : 'Submit Pitch & Apply'}</span>
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs">
              Sign in as a Creator to submit a proposal for this campaign.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
