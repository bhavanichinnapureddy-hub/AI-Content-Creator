import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  CheckCircle2,
  Star,
  MapPin,
  Bookmark,
  Share2,
  Send,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowLeft,
  X
} from 'lucide-react';

export const CreatorProfilePage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, creators, campaigns, sendCollaborationRequest, savedCreatorIds, toggleSaveCreator } = useAuth();
  const { addToast } = useToast();

  const creator = creators.find(c => c.id === id) || creators[0];
  const isSaved = savedCreatorIds.includes(creator.id);

  // Collaboration Modal state
  const shouldOpenHireModal = searchParams.get('action') === 'hire';
  const [isHireModalOpen, setIsHireModalOpen] = useState(shouldOpenHireModal);

  const [collabForm, setCollabForm] = useState({
    campaignId: '',
    amount: creator.ratePerPost || 500,
    deliverable: '1x Dedicated Short/Reel + 2 Stories',
    dueDate: '2026-11-20',
    notes: 'Looking forward to partnering with you on our product launch campaign!'
  });

  const handleSendCollaboration = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/customer/login');
      return;
    }
    if (currentUser.role !== 'customer') {
      addToast('Only brands and customer accounts can initiate collaboration offers.', 'error');
      return;
    }

    try {
      sendCollaborationRequest({
        creatorId: creator.id,
        campaignId: collabForm.campaignId || 'direct-offer',
        amount: collabForm.amount,
        deliverable: collabForm.deliverable,
        dueDate: collabForm.dueDate,
        notes: collabForm.notes
      });
      addToast(`Collaboration proposal successfully dispatched to ${creator.name}!`, 'success');
      setIsHireModalOpen(false);
    } catch (err) {
      addToast(err.message || 'Failed to send collaboration request', 'error');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#102A43] dark:hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Creators
      </button>

      {/* Profile Header Banner */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="h-48 sm:h-64 w-full relative">
          <img
            src={creator.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80"}
            alt={creator.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Profile Card Bottom Details */}
        <div className="p-6 sm:p-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="flex items-end gap-4">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-white dark:ring-[#102A43] shadow-xl"
              />
              <div className="pb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-white">
                    {creator.name}
                  </h1>
                  {creator.verified && (
                    <span title="Verified Content Creator">
                      <CheckCircle2 className="w-5 h-5 text-[#006B4F] dark:text-emerald-400" />
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                  <span>{creator.category}</span> • <MapPin className="w-3.5 h-3.5" /> <span>{creator.location || 'Global'}</span>
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleSaveCreator(creator.id)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isSaved
                    ? 'bg-[#006B4F] text-white border-[#006B4F]'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={isSaved ? 'Bookmarked' : 'Bookmark Creator'}
              >
                <Bookmark className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={() => setIsHireModalOpen(true)}
                className="px-6 py-2.5 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Collaboration Offer</span>
              </button>
            </div>
          </div>

          {/* Bio & Availability */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {creator.bio}
          </p>

          {/* Social Stats Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Audience</span>
              <span className="text-lg font-black text-[#102A43] dark:text-white">{creator.followers.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Engagement</span>
              <span className="text-lg font-black text-[#006B4F] dark:text-emerald-400">{creator.engagementRate}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Rating</span>
              <span className="text-lg font-black text-amber-500 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-500" /> {creator.rating}
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Base Rate</span>
              <span className="text-lg font-black text-[#006B4F] dark:text-emerald-400">${creator.ratePerPost}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Samples Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#102A43] dark:text-white">
          Featured Portfolio Work
        </h2>
        {creator.portfolio && creator.portfolio.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creator.portfolio.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img
                    src={item.media}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-semibold px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                    {item.likes} engagement
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm text-[#102A43] dark:text-white line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No public portfolio items uploaded yet.</p>
        )}
      </div>

      {/* Collaboration Packages */}
      {creator.pricing && creator.pricing.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#102A43] dark:text-white">
            Available Service Packages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {creator.pricing.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-sm text-[#102A43] dark:text-white mb-1">{pkg.plan}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{pkg.deliverable}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-lg font-black text-[#006B4F] dark:text-emerald-400">${pkg.price}</span>
                  <button
                    onClick={() => {
                      setCollabForm(prev => ({ ...prev, amount: pkg.price, deliverable: pkg.deliverable }));
                      setIsHireModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold cursor-pointer"
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collaboration Offer Modal */}
      {isHireModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setIsHireModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#102A43] dark:text-white mb-1">
              Hire {creator.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Create a custom partnership offer. Your budget will only be settled once deliverables are approved.
            </p>

            <form onSubmit={handleSendCollaboration} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Connect to Campaign (Optional)
                </label>
                <select
                  value={collabForm.campaignId}
                  onChange={(e) => setCollabForm({ ...collabForm, campaignId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
                >
                  <option value="">Direct Private Collaboration</option>
                  {campaigns.map(c => (
                    <option key={c.id} value={c.id}>{c.title} (${c.budget})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Offered Budget ($) *
                  </label>
                  <input
                    type="number"
                    value={collabForm.amount}
                    onChange={(e) => setCollabForm({ ...collabForm, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Target Due Date *
                  </label>
                  <input
                    type="date"
                    value={collabForm.dueDate}
                    onChange={(e) => setCollabForm({ ...collabForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Required Deliverables *
                </label>
                <input
                  type="text"
                  value={collabForm.deliverable}
                  onChange={(e) => setCollabForm({ ...collabForm, deliverable: e.target.value })}
                  placeholder="e.g. 1x 60s Reel, 2x IG Stories, raw footage"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Project Notes / Creative Direction
                </label>
                <textarea
                  rows="3"
                  value={collabForm.notes}
                  onChange={(e) => setCollabForm({ ...collabForm, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsHireModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold shadow-md cursor-pointer"
                >
                  Send Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
