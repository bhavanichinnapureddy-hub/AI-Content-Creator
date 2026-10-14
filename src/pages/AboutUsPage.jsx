import React from 'react';
import { NavLink } from 'react-router-dom';
import { PublicNavbar } from '../components/PublicNavbar';
import {
  Sparkles,
  Target,
  Compass,
  Users,
  ShieldCheck,
  CheckCircle2,
  Mail,
  MapPin,
  ArrowRight,
  Zap,
  Globe
} from 'lucide-react';

export const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1724] text-slate-900 dark:text-white flex flex-col transition-colors duration-200">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        {/* About Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#006B4F] dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" /> Marketplace Story
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#102A43] dark:text-white tracking-tight">
            About CreatorSphere AI
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            “CreatorSphere AI is an AI-powered content creator marketplace designed to connect brands, businesses, and customers with suitable content creators. Our platform helps creators showcase their talent, discover collaboration opportunities, and grow professionally. Brands can find creators based on their niche, content style, audience, and budget. With AI-assisted content tools and a streamlined collaboration process, CreatorSphere AI makes content partnerships easier, faster, and more organized.”
          </p>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#006B4F]/10 dark:bg-emerald-950 flex items-center justify-center text-[#006B4F] dark:text-emerald-400 mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#102A43] dark:text-white mb-2">Our Mission</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To democratize brand-creator partnerships by replacing opaque agency friction with transparent data, real-time collaboration milestones, and AI-amplified workflows that empower independent digital talent.
            </p>
          </div>

          <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#006B4F]/10 dark:bg-emerald-950 flex items-center justify-center text-[#006B4F] dark:text-emerald-400 mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#102A43] dark:text-white mb-2">Our Vision</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              A frictionless global creative economy where every visionary brand finds its authentic voice and every skilled content creator builds a thriving, sustainable career.
            </p>
          </div>
        </div>

        {/* Dual Target Value Propositions: For Creators vs. For Brands */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-900/20 to-[#102A43] border border-emerald-500/30 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" /> For Creators
            </h3>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Showcase dynamic portfolios with video and image proof.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Apply directly to pre-budgeted brand campaigns with custom rate proposals.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Use CreatorSphere AI Studio to draft hooks, scripts, and viral hashtags.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Gain the CreatorSphere AI Verified badge for guaranteed brand trust.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-[#102A43] border border-blue-500/30 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" /> For Brands & Customers
            </h3>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Filter creators by verified metrics, category, platform, and budget.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Publish public campaign briefs and receive inbound pitches within hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Direct collaboration requests with milestone deliverables and set due dates.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Admin trust & safety oversight to prevent fraud and bot inflation.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-[#102A43] dark:text-white">
            How CreatorSphere AI Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#006B4F] text-white font-bold flex items-center justify-center mx-auto mb-3">1</div>
              <h4 className="font-bold text-base text-[#102A43] dark:text-white mb-1">Discover & Align</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Search vetted creators or publish structured campaign requirements with set budgets.</p>
            </div>
            <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#006B4F] text-white font-bold flex items-center justify-center mx-auto mb-3">2</div>
              <h4 className="font-bold text-base text-[#102A43] dark:text-white mb-1">Create with AI</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Use our AI Studio to co-craft compelling briefs, scripts, captions, and creative directions.</p>
            </div>
            <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#006B4F] text-white font-bold flex items-center justify-center mx-auto mb-3">3</div>
              <h4 className="font-bold text-base text-[#102A43] dark:text-white mb-1">Collaborate & Deliver</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Review deliverables, approve milestones, track campaign performance, and build repeat partnerships.</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-[#102A43] dark:text-white mb-1">
              Have Questions or Need Partnerships?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Our support team and trust & safety administrators are here 24/7.
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-[#006B4F] dark:text-emerald-400" /> support@creatorsphere.ai</span>
              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-[#006B4F] dark:text-emerald-400" /> www.creatorsphere.ai</span>
            </div>
          </div>

          <NavLink
            to="/select-role"
            className="px-6 py-3 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white font-semibold text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            Get Started Now
          </NavLink>
        </div>
      </main>
    </div>
  );
};
