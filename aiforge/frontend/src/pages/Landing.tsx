import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Search,
  Lock,
  Cpu
} from 'lucide-react';

export default function Landing() {
  const featuredCreators = [
    {
      name: "Alex Vance",
      role: "AI Filmmaker & Director",
      tools: ["Runway Gen-3", "Midjourney v6", "Premiere"],
      specialty: "Cinematic Commercials & Sci-Fi",
      rating: "4.98",
      projects: 34,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      badge: "Verified Tool"
    },
    {
      name: "Elena Rostova",
      role: "Generative Motion Designer",
      tools: ["ComfyUI", "Stable Diffusion", "After Effects"],
      specialty: "3D Product Animations",
      rating: "5.0",
      projects: 42,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      badge: "Verified Workflow"
    },
    {
      name: "Marcus Chen",
      role: "Prompt Engineer & Visualist",
      tools: ["Flux.1 Dev", "Magnific AI", "Photoshop"],
      specialty: "Luxury Brand Key Visuals",
      rating: "4.95",
      projects: 29,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      badge: "Verified Creator"
    }
  ];

  const features = [
    {
      icon: <Cpu className="w-6 h-6 text-primary-500" />,
      title: "AI-Native Portfolios",
      description: "Inspect actual prompt architectures, generative models, workflow pipelines, and verified past client projects."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-accent-500" />,
      title: "AI Brief Assistant",
      description: "Convert a one-sentence creative idea into a detailed, structured production brief with deliverables, aspect ratios, and licensing rules."
    },
    {
      icon: <Lock className="w-6 h-6 text-emerald-500" />,
      title: "Milestone Escrow",
      description: "Funds stay locked in automated demo escrow. Money only moves when milestones, drafts, and commercial licenses are approved."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      title: "Verified Authenticity",
      description: "Platform-verified tool competencies and human-supervised production chains guarantee commercial viability and zero copyright ambiguity."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow-primary">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                AIForge
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30">
                  BETA
                </span>
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link to="/creators" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Search className="w-4 h-4 text-primary-400" />
              Discover Creators
            </Link>
            <a href="#features" className="hover:text-white transition-colors">
              Platform Features
            </a>
            <a href="#demo-roles" className="hover:text-white transition-colors">
              Demo Logins
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition">
              Sign In
            </Link>
            <Link to="/signup" className="btn-sm btn-primary bg-primary-600 hover:bg-primary-500 text-white shadow-glow-primary px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary-500/30 bg-primary-950/40 text-primary-300 text-xs font-semibold mb-6 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-primary-400" />
            The AI-Native Marketplace for Elite Creative Production
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Commission <span className="bg-gradient-to-r from-primary-400 via-accent-300 to-indigo-300 bg-clip-text text-transparent">AI Filmmakers & Designers</span> with Zero Guesswork.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Stop hiring generic freelancers. Connect with vetted generative specialists who build with Runway Gen-3, Flux, Midjourney, ComfyUI, and customized neural workflows.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/creators"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold bg-gradient-brand text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              Explore AI Portfolios
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/signup"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-slate-200 transition flex items-center justify-center gap-2"
            >
              Post a Creative Brief
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/80 pt-8 text-left">
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">100%</div>
              <div className="text-xs text-slate-400 mt-1">Verified AI Workflows</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">&lt; 24h</div>
              <div className="text-xs text-slate-400 mt-1">First Draft Turnaround</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">Milestone</div>
              <div className="text-xs text-slate-400 mt-1">Escrow Protection</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">Commercial</div>
              <div className="text-xs text-slate-400 mt-1">Full Rights Transfer</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured AI Creators Showcase */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-400">Curated Talent</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Top-Rated AI Specialists</h2>
            </div>
            <Link to="/creators" className="text-sm font-semibold text-primary-400 hover:text-primary-300 mt-3 md:mt-0 flex items-center gap-1">
              View all creators <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCreators.map((creator, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition relative group shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-500/30" />
                    <div>
                      <h3 className="font-bold text-white group-hover:text-primary-400 transition">{creator.name}</h3>
                      <p className="text-xs text-slate-400">{creator.role}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                    {creator.badge}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <p className="text-xs text-slate-400 mb-2 font-medium">Core Stack:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {creator.tools.map((t, idx) => (
                      <span key={idx} className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                  <span>Specialty: <strong className="text-slate-200">{creator.specialty}</strong></span>
                  <span className="text-amber-400 font-bold">* {creator.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Platform Pillars */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-400">Engineered for Quality</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Built specifically for generative media workflows</h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Traditional freelancing portals cannot evaluate neural model capabilities or track iterative prompt versioning. AIForge does.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-slate-700 transition">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-5 border border-slate-700">
                {feat.icon}
              </div>
              <h3 className="font-bold text-white text-base mb-2">{feat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Credentials Helper Section */}
      <section id="demo-roles" className="py-12 bg-primary-950/20 border-t border-primary-900/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-primary-400" />
            Judge & Reviewer Fast Access
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
            Try out pre-configured roles with realistic simulated escrow wallets, active briefs, and verified portfolios.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-xs font-bold text-primary-400 block mb-1">Brand / Agency</span>
              <div className="text-xs text-slate-300 font-mono">brand@aiforge.demo</div>
              <div className="text-[11px] text-slate-500 mt-1">Publish briefs & hire creators</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-xs font-bold text-accent-400 block mb-1">AI Creator</span>
              <div className="text-xs text-slate-300 font-mono">creator@aiforge.demo</div>
              <div className="text-[11px] text-slate-500 mt-1">Portfolios & draft submissions</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-xs font-bold text-emerald-400 block mb-1">Administrator</span>
              <div className="text-xs text-slate-300 font-mono">admin@aiforge.demo</div>
              <div className="text-[11px] text-slate-500 mt-1">Verification & escrow audits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <span className="text-slate-300 font-medium">AIForge Marketplace &copy; 2026</span>
          </div>
          <div className="flex gap-6">
            <Link to="/creators" className="hover:text-slate-300">Creators</Link>
            <Link to="/login" className="hover:text-slate-300">Sign In</Link>
            <Link to="/signup" className="hover:text-slate-300">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
