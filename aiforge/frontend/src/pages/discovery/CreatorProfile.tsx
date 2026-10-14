import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { useAuthStore } from '@/stores/authStore';
import { 
  Sparkles, 
  MapPin, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Globe, 
  Clock, 
  DollarSign, 
  Layers, 
  Play, 
  ExternalLink, 
  Send, 
  ArrowLeft 
} from 'lucide-react';

export default function CreatorProfile() {
  const { id } = useParams<{ id: string }>();
  const { creators, briefs, createEngagement } = useMarketplaceStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedBriefId, setSelectedBriefId] = useState('');
  const [offeredBudget, setOfferedBudget] = useState(2000);

  const creator = creators.find((c) => c.id === id) || creators[0];

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBriefId) return;
    const engId = createEngagement(selectedBriefId, creator.id, offeredBudget);
    setInviteModalOpen(false);
    navigate(`/engagements/${engId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar activeTab="creators" />

      {/* Top Breadcrumb */}
      <div className="border-b border-slate-800 bg-slate-900/40 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/creators" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Creators
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Creator Identity & Bio */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <img
                  src={creator.avatarUrl}
                  alt={creator.displayName}
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-primary-500/20 mb-4"
                />
                <h1 className="text-xl font-bold text-white">{creator.displayName}</h1>
                <p className="text-xs font-semibold text-primary-400 mt-1">{creator.specialization}</p>
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {creator.location}
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/40 text-amber-400 border border-amber-800/40 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {creator.rating}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {creator.completedProjects} Completed Projects
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
                <button
                  onClick={() => setInviteModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-brand text-white font-semibold text-xs shadow-glow-primary hover:opacity-95 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Invite to Creative Brief
                </button>
              </div>

              {/* Key Meta Stats */}
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" /> Price Range:
                  </span>
                  <span className="font-bold text-white">
                    ${creator.priceRangeMin} - ${creator.priceRangeMax}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Response Time:
                  </span>
                  <span className="font-semibold text-white">
                    ~{creator.responseTimeDays} Day
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Languages:
                  </span>
                  <span className="font-semibold text-white">
                    {creator.languages.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Badges Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Credentials
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Verified AI Toolstack</span>
                  <span className={`font-bold ${creator.verifiedTool ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {creator.verifiedTool ? 'Approved' : 'Unverified'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Generative Pipeline</span>
                  <span className={`font-bold ${creator.verifiedWorkflow ? 'text-indigo-400' : 'text-slate-500'}`}>
                    {creator.verifiedWorkflow ? 'Approved' : 'Unverified'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Past Commercial Deliverables</span>
                  <span className={`font-bold ${creator.verifiedPastWork ? 'text-amber-400' : 'text-slate-500'}`}>
                    {creator.verifiedPastWork ? 'Approved' : 'Unverified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Neural Tools Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Proprietary AI Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {creator.aiTools.map((tool, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-950 border border-slate-800 text-slate-200 px-2.5 py-1 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Pipeline & AI Portfolio Works */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio & Custom Workflow description */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-2">Creator Bio</h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {creator.bio}
              </p>

              <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent-400" />
                Production Workflow Architecture
              </h2>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
                {creator.workflowDesc}
              </div>
            </div>

            {/* Portfolio Grid Showcase */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary-400" />
                  AI Portfolio Items ({creator.portfolio.length})
                </h2>
                <span className="text-xs text-slate-500">Commercial-use rights verified</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creator.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      {/* Media Display */}
                      <div className="relative aspect-video bg-black overflow-hidden">
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold text-slate-300 border border-slate-800">
                          {item.contentType} - {item.aspectRatio}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-white text-sm mb-1.5">{item.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="mb-3">
                          <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                            Models & Pipelines:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {item.aiToolsUsed.map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-slate-950 border border-slate-800 text-slate-300 px-2 py-0.5 rounded"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Workflow Steps Preview */}
                        {item.workflowSteps && (
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] space-y-1.5">
                            {item.workflowSteps.map((ws, wIdx) => (
                              <div key={wIdx} className="text-slate-400">
                                <strong className="text-primary-300">{ws.step}:</strong> {ws.desc}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Commercial License Valid
                        </span>
                        <a
                          href={item.mediaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1"
                        >
                          Raw Asset <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite to Brief Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">
              Invite {creator.displayName} to Brief
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Select one of your active campaigns to initialize a direct milestone engagement and escrow.
            </p>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Choose Creative Brief
                </label>
                <select
                  required
                  value={selectedBriefId}
                  onChange={(e) => setSelectedBriefId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">-- Select Brief --</option>
                  {briefs.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title} (Budget: ${b.budgetMin}-${b.budgetMax})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Agreed Milestone Budget (USD)
                </label>
                <input
                  type="number"
                  required
                  value={offeredBudget}
                  onChange={(e) => setOfferedBudget(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-primary-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Amount will be funded into demo escrow upon invitation acceptance.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedBriefId}
                  className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold shadow-glow-primary disabled:opacity-50"
                >
                  Confirm & Fund Escrow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
