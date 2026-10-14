import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BackNavButton } from '../components/BackNavButton';
import {
  Sparkles,
  Copy,
  Check,
  Video,
  FileText,
  Hash,
  Lightbulb,
  Sliders,
  Send,
  RefreshCw,
  Globe
} from 'lucide-react';

export const AIStudioPage = () => {
  const { addToast } = useToast();
  const [activeTool, setActiveTool] = useState('captions'); // captions | script | ideas | hashtags | brief

  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('Tech & Gadgets');
  const [platform, setPlatform] = useState('Instagram Reel');
  const [language, setLanguage] = useState('English');
  const [tone, setTone] = useState('Engaging & Modern');
  const [audience, setAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Simulated AI Generator
  const handleGenerate = (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      addToast('Please enter a topic or product name to generate content.', 'warning');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      let result = '';
      const langPrefix = language !== 'English' ? `[Generated in ${language}]\n\n` : '';

      if (activeTool === 'captions') {
        result = `${langPrefix}✨ [OPTION 1 - Story-driven Hook]\n"POV: You finally found the one gadget that makes 8 hours of editing feel like 20 minutes... 🎧✨\n\nMeet the ${topic}. Zero background distractions, spatial acoustics that literally wrap around your mind, and battery that outlasts your longest grind.\n\n👇 Drop a 🔥 in the comments if your workspace needs this upgrade!"\n\n---\n\n⚡ [OPTION 2 - Punchy & Direct]\n"Stop settling for mediocre audio. The ${topic} just dropped, and it genuinely changed how I experience sound.\n\nCheck the link in bio to grab early-bird creator pricing before they sell out! 🚀\n\n#ContentCreator #WorkspaceSetup #${category.replace(/[^a-zA-Z]/g, '')}`;
      } else if (activeTool === 'script') {
        result = `${langPrefix}🎬 [60-SECOND REEL / TIKTOK SCRIPT: ${topic}]\n\n[00:00 - 00:03 | VISUAL HOOK]\n(Tight macro close-up of fingers adjusting the dial, snappy snap-cut sound effect)\nVOICEOVER: "If you work in coffee shops or noisy apartments, do NOT scroll past this..."\n\n[00:04 - 00:15 | PROBLEM SETUP]\n(Cut to creator shaking head with annoying ambient espresso grinder noises)\nVOICEOVER: "I was losing hours trying to focus with regular earbuds..."\n\n[00:16 - 00:35 | THE REVEAL & VALUE]\n(Crisp unboxing shot, slow-mo head fit, sudden silence effect on audio track)\nVOICEOVER: "Then I tested the ${topic}. The active noise cancellation isn't just quiet—it feels like stepping into a private studio."\n\n[00:36 - 00:50 | DEMO / PROOF]\n(Show real-time mic test and battery indicator)\nVOICEOVER: "Plus, 45 hours battery life means I charge it once a week."\n\n[00:51 - 01:00 | CALL TO ACTION]\n(Creator looks directly into camera smiling, points to link sticker)\nVOICEOVER: "Grab yours through the link on screen. Trust me, your ears will thank you."`;
      } else if (activeTool === 'ideas') {
        result = `${langPrefix}💡 [5 VIRAL CONTENT CONCEPTS FOR: ${topic}]\n\n1. "The Ultimate Stress Test":\nTake the product to the noisiest place in your city (subway/construction site) and test live if the audio cuts through.\n\n2. "What \$X Really Gets You":\nCompare budget alternative vs. this premium solution in a blind audio clarity comparison.\n\n3. "Day In The Life (Creator Edition)":\nSeamless morning-to-night vlog highlighting ergonomic comfort after 10 hours continuous wear.\n\n4. "The 3 Features Nobody Talks About":\nFast-paced breakdown of hidden customization settings, spatial presets, and multipoint Bluetooth switching.\n\n5. "Mistakes to Avoid Before Buying":\nEducational guide answering user FAQs, compatibility, and sizing for different work styles.`;
      } else if (activeTool === 'hashtags') {
        result = `${langPrefix}🏷️ [TARGETED HASHTAG MATRIX FOR: ${category}]\n\nTier 1 - High Volume (1M+ Posts):\n#${category.replace(/[^a-zA-Z]/g, '')} #CreatorEconomy #InfluencerMarketing #TechTrends #ProductivityTips\n\nTier 2 - Niche & Targeted (50k - 500k Posts):\n#WorkspaceInspo #DeskSetupGoals #MinimalistTech #CleanAesthetic #AudioPhileCommunity #CreatorGear\n\nTier 3 - Intent & Conversion:\n#TechReview2026 #MustHaveGadget #SmartWorkSetup #SoundMatters #ContentCreationTools\n\n💡 Pro Tip: Instagram's 2026 algorithm favors 3-5 hyper-relevant hashtags placed directly in the main caption over 30 spam tags in the comments.`;
      } else if (activeTool === 'brief') {
        result = `${langPrefix}📋 [OPTIMIZED CAMPAIGN BRIEF: ${topic}]\n\nOBJECTIVE:\nDrive high-intent awareness among ${audience || 'prospective customers'} by showcasing key differentiators in authentic lifestyle formats.\n\nDELIVERABLES:\n• 1x 60s vertical video (9:16 high-definition, 4k/60fps)\n• 2x Story posts with swipe-up/sticker link\n• 30-day organic usage rights for brand whitelisting\n\nKEY TALKING POINTS:\n1. Unmatched ergonomics for creators working long hours.\n2. True-to-life studio sound balance.\n3. Eco-friendly sustainable packaging and build.\n\nDOs & DONTs:\n✅ Do show real-world usage in authentic workspaces.\n❌ Do not use aggressive artificial beauty filters during live shots.`;
      }

      setOutput(result);
      setLoading(false);
      addToast('Generated content successfully with simulated AI!', 'success');
    }, 600);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    addToast('Copied content to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Studio Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#006B4F] dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" /> CreatorSphere AI Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
          CreatorSphere AI Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Accelerate your content pipeline. Generate viral captions, high-converting video scripts, content roadmaps, and hashtags instantly.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'captions', name: 'Captions & Hooks', icon: FileText },
          { id: 'script', name: 'Video Script Writer', icon: Video },
          { id: 'ideas', name: 'Content Ideas', icon: Lightbulb },
          { id: 'hashtags', name: 'Hashtag Generator', icon: Hash },
          { id: 'brief', name: 'Campaign Brief Assistant', icon: Sliders },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => { setActiveTool(t.id); setOutput(''); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTool === t.id
                  ? 'bg-[#006B4F] text-white shadow-md'
                  : 'bg-white dark:bg-[#102A43] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Configuration Form */}
        <div className="lg:col-span-5 bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#102A43] dark:text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#006B4F] dark:text-emerald-400" />
            Prompt Parameters
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Topic or Product Name *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Ergonomic Standing Desk, Plant-based Protein..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
              >
                <option>Tech & Gadgets</option>
                <option>Fitness & Wellness</option>
                <option>Fashion & Beauty</option>
                <option>Food & Cooking</option>
                <option>Gaming & Esports</option>
                <option>Travel & Lifestyle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Social Platform & Format
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
              >
                <option>Instagram Reel</option>
                <option>TikTok Short Video</option>
                <option>YouTube 10min Review</option>
                <option>LinkedIn Thought Leadership</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Target Audience
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Busy moms, university students..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Output Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
              >
                <option>English</option>
                <option>Telugu</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>German</option>
                <option>French</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Tone of Voice
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
              >
                <option>Engaging & Modern</option>
                <option>High Energy & Viral</option>
                <option>Minimalist & Aesthetic</option>
                <option>Informative & Educational</option>
                <option>Humorous & Relatable</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating Output...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Content</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Output Canvas */}
        <div className="lg:col-span-7 bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Production Output Canvas
              </span>
              {output && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleGenerate(e)}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
                    <span>Regenerate</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setOutput(''); addToast('Canvas cleared.', 'info'); }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="py-20 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-[#006B4F] dark:text-emerald-400 animate-pulse mx-auto" />
                <p className="text-xs text-slate-400">Drafting personalized content tailored to your niche...</p>
              </div>
            ) : output ? (
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[480px] overflow-y-auto">
                {output}
              </div>
            ) : (
              <div className="py-20 text-center space-y-2">
                <Sparkles className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No output generated yet</p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Select your tool, specify your topic, and click "Generate Content" to create production-ready drafts.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 text-center">
            Simulated generation demo mode for CreatorSphere AI. Safe for instant client workflows.
          </div>
        </div>
      </div>
    </div>
  );
};
