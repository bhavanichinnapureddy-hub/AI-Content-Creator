import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { useAuthStore } from '@/stores/authStore';
import { 
  Sparkles, 
  Wand2, 
  ArrowRight, 
  Layers, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Info 
} from 'lucide-react';

export default function BriefCreate() {
  const { addBrief } = useMarketplaceStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // AI Prompt Assistant Input
  const [roughIdea, setRoughIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [campaignGoal, setCampaignGoal] = useState('');
  const [contentType, setContentType] = useState('Ad');
  const [creativeStyle, setCreativeStyle] = useState('');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [durationSeconds, setDurationSeconds] = useState(20);
  const [deliverableCount, setDeliverableCount] = useState(1);
  const [budgetMin, setBudgetMin] = useState(1200);
  const [budgetMax, setBudgetMax] = useState(2500);
  const [deadline, setDeadline] = useState('2026-11-20');
  const [targetAudience, setTargetAudience] = useState('');
  const [language, setLanguage] = useState('English');
  const [description, setDescription] = useState('');
  const [dosInput, setDosInput] = useState('Cinematic lighting, high micro-detail reflections, smooth camera arcs');
  const [dontsInput, setDontsInput] = useState('No distorted limbs, no blurry background artifacts');
  const [commercialUseType, setCommercialUseType] = useState('Full Worldwide Commercial Rights');
  const [aiDisclosureRequired, setAiDisclosureRequired] = useState(true);
  const [requiredToolsInput, setRequiredToolsInput] = useState('Runway Gen-3, Midjourney v6, ComfyUI');

  // AI Brief Generator Handler
  const handleAiAssist = () => {
    if (!roughIdea) return;
    setIsGenerating(true);

    setTimeout(() => {
      // Intelligent parsing simulation
      setTitle(`AI Campaign: ${roughIdea.slice(0, 45)}...`);
      setCampaignGoal(`Produce high-impact generative visual narrative targeting: "${roughIdea}"`);
      setContentType(roughIdea.toLowerCase().includes('animation') ? '3D Animation' : 'Ad');
      setCreativeStyle('Photorealistic Futuristic, Atmospheric Macro Optics, High Contrast');
      setTargetAudience('Tech-forward early adopters and luxury consumers aged 22-45');
      setDescription(`Full narrative creative execution based on prompt concept: ${roughIdea}. We require a master edit with neural motion styling, bespoke sound design, and clean 4K color correction.`);
      setBudgetMin(1500);
      setBudgetMax(3200);
      setIsGenerating(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newId = addBrief({
      brandProfileId: user?.id || 'brand-1',
      brandName: user?.companyName || user?.displayName || 'Aetheria Studios',
      brandLogo: user?.avatarUrl,
      title,
      campaignGoal,
      contentType,
      creativeStyle,
      aspectRatio,
      durationSeconds: Number(durationSeconds),
      deliverableCount: Number(deliverableCount),
      budgetMin: Number(budgetMin),
      budgetMax: Number(budgetMax),
      deadline,
      targetAudience,
      language,
      description,
      dos: dosInput.split(',').map((s) => s.trim()).filter(Boolean),
      donts: dontsInput.split(',').map((s) => s.trim()).filter(Boolean),
      commercialUseType,
      aiDisclosureRequired,
      requiredFormats: ['4K MP4', 'ProRes HQ'],
      requiredSkills: ['Prompt Architecture', 'Neural Video'],
      requiredTools: requiredToolsInput.split(',').map((s) => s.trim()).filter(Boolean),
      status: 'PUBLISHED',
      isAiGenerated: !!roughIdea
    });

    navigate(`/briefs/${newId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar activeTab="new-brief" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* Page Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-500/10 text-accent-300 border border-accent-500/20 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Structured Production Brief Builder
          </div>
          <h1 className="text-3xl font-extrabold text-white">Create a Creative AI Brief</h1>
          <p className="mt-1 text-slate-400 text-sm">
            Publish structured requirements with required generative models, aspect ratios, and commercial licensing rights.
          </p>
        </div>

        {/* AI-Assisted Brief Generator Section */}
        <div className="bg-gradient-to-r from-primary-950/60 to-accent-950/40 border border-primary-500/30 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Wand2 className="w-5 h-5 text-accent-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              AI-Assisted Brief Builder
            </h2>
          </div>
          <p className="text-xs text-slate-300 mb-4">
            Type a rough idea (e.g. <em>"Make a 20-second futuristic ad for titanium smart ring with floating particles"</em>) and our backend AI engine will configure all technical specs.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={roughIdea}
              onChange={(e) => setRoughIdea(e.target.value)}
              placeholder="Describe your creative concept in 1 sentence..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={handleAiAssist}
              disabled={!roughIdea || isGenerating}
              className="px-5 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold text-xs shadow-glow-accent transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? 'Synthesizing...' : 'Generate Structured Brief'}
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Brief Form */}
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-sm">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Campaign Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chronos: 20-Second Cinematic Smartwatch Spot"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Content Type
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-xs focus:ring-2 focus:ring-primary-500"
              >
                <option value="Ad">Commercial Ad</option>
                <option value="3D Animation">3D Neural Animation</option>
                <option value="Short Film">Cinematic Short Film</option>
                <option value="Product Video">Product Showcase</option>
                <option value="Character Design">Character Design</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Aspect Ratio
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-xs focus:ring-2 focus:ring-primary-500"
              >
                <option value="9:16">9:16 (TikTok, Reel, Short)</option>
                <option value="16:9">16:9 (Landscape Master)</option>
                <option value="1:1">1:1 (Square Post)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Target Duration (Sec)
              </label>
              <input
                type="number"
                value={durationSeconds}
                onChange={(e) => setDurationSeconds(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-xs focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Campaign Goal & High-Level Narrative
            </label>
            <textarea
              rows={3}
              required
              value={campaignGoal}
              onChange={(e) => setCampaignGoal(e.target.value)}
              placeholder="What should viewers feel and what is the primary conversion or impression goal?"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:ring-2 focus:ring-primary-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Creative Visual Style
            </label>
            <input
              type="text"
              value={creativeStyle}
              onChange={(e) => setCreativeStyle(e.target.value)}
              placeholder="e.g. Cyber-luxe, Apple keynote aesthetic, dark titanium reflections"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Budget Range (USD)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(Number(e.target.value))}
                  className="w-1/2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-primary-500"
                  placeholder="Min ($)"
                />
                <span className="text-slate-500">-</span>
                <input
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-1/2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-primary-500"
                  placeholder="Max ($)"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Production Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Creative Do's (Comma separated)
              </label>
              <input
                type="text"
                value={dosInput}
                onChange={(e) => setDosInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Creative Don'ts (Comma separated)
              </label>
              <input
                type="text"
                value={dontsInput}
                onChange={(e) => setDontsInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Licensing & Compliance
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-300">Commercial License Model</div>
                <div className="text-[11px] text-slate-500">{commercialUseType}</div>
              </div>
              <span className="text-xs px-2.5 py-1 bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 rounded-full font-semibold">
                Escrow Protected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="aiDisclosure"
                checked={aiDisclosureRequired}
                onChange={(e) => setAiDisclosureRequired(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="aiDisclosure" className="text-xs text-slate-300">
                Require creator to provide prompt metadata and pipeline model disclosure
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-brand text-white font-bold text-sm shadow-glow-primary hover:opacity-95 transition flex items-center justify-center gap-2"
          >
            Publish Brief to Marketplace
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
