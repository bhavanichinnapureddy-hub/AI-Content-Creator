import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  SlidersHorizontal, 
  ArrowUpDown, 
  MapPin, 
  DollarSign, 
  Eye, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function CreatorDiscovery() {
  const { creators } = useMarketplaceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('ALL');
  const [selectedTool, setSelectedTool] = useState('ALL');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'priceDesc'>('rating');

  const specializations = [
    'ALL',
    'AI Filmmaker',
    'AI Animator',
    'Generative Designer',
    'AI Character Designer',
    'AI Video Editor'
  ];

  const tools = [
    'ALL',
    'Runway Gen-3',
    'ComfyUI',
    'Midjourney v6',
    'Flux.1',
    'Stable Diffusion',
    'Kling AI',
    'Pika 1.5'
  ];

  const filteredCreators = useMemo(() => {
    return creators
      .filter((creator) => {
        const matchesSearch = 
          creator.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesSpec = 
          selectedSpecialization === 'ALL' || creator.specialization === selectedSpecialization;

        const matchesTool = 
          selectedTool === 'ALL' || creator.aiTools.some((t) => t.includes(selectedTool));

        const matchesVerified = !verifiedOnly || creator.isVerified;

        return matchesSearch && matchesSpec && matchesTool && matchesVerified;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'priceAsc') return a.priceRangeMin - b.priceRangeMin;
        if (sortBy === 'priceDesc') return b.priceRangeMax - a.priceRangeMax;
        return 0;
      });
  }, [creators, searchTerm, selectedSpecialization, selectedTool, verifiedOnly, sortBy]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar activeTab="creators" />

      {/* Header Banner */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Verified AI Talent Directory
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Discover & Commission AI Creators
            </h1>
            <p className="mt-2 text-slate-400 text-sm sm:text-base">
              Filter by proprietary generative pipelines, verified tooling, model weights, and authentic client deliverables.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Search & Filter Toolbar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search skills, models, tools, or names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Specialization */}
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec === 'ALL' ? 'All Specializations' : spec}
                  </option>
                ))}
              </select>

              {/* Tool */}
              <select
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                {tools.map((t) => (
                  <option key={t} value={t}>
                    {t === 'ALL' ? 'All AI Tools' : t}
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 text-slate-300 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="rating">Top Rated</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>

              {/* Verified Toggle */}
              <button
                type="button"
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
                  verifiedOnly
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Badges Only
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs text-slate-400 font-medium">
            Showing <strong className="text-white">{filteredCreators.length}</strong> AI creators
          </span>
          {(selectedSpecialization !== 'ALL' || selectedTool !== 'ALL' || verifiedOnly || searchTerm) && (
            <button
              onClick={() => {
                setSelectedSpecialization('ALL');
                setSelectedTool('ALL');
                setVerifiedOnly(false);
                setSearchTerm('');
              }}
              className="text-xs text-primary-400 hover:text-primary-300 font-medium"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Creators Grid */}
        {filteredCreators.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center">
            <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">No AI creators match your filter</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
              Try adjusting your search criteria, picking a broader toolset, or removing the verification filter.
            </p>
            <button
              onClick={() => {
                setSelectedSpecialization('ALL');
                setSelectedTool('ALL');
                setVerifiedOnly(false);
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-semibold transition"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator) => (
              <div
                key={creator.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {/* Top Profile Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={creator.avatarUrl}
                        alt={creator.displayName}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-500/20 group-hover:ring-primary-500/40 transition"
                      />
                      <div>
                        <Link
                          to={`/creators/${creator.id}`}
                          className="font-bold text-white text-base hover:text-primary-400 transition"
                        >
                          {creator.displayName}
                        </Link>
                        <p className="text-xs text-primary-400 font-medium mt-0.5">
                          {creator.specialization}
                        </p>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {creator.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {creator.rating}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        ({creator.reviewsCount} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Headline & Bio */}
                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {creator.headline}
                  </p>

                  {/* Verification Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {creator.verifiedTool && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Verified Tool
                      </span>
                    )}
                    {creator.verifiedWorkflow && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-950/60 text-indigo-400 border border-indigo-800/60 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Verified Workflow
                      </span>
                    )}
                    {creator.verifiedPastWork && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-400 border border-amber-800/60 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Verified Clients
                      </span>
                    )}
                  </div>

                  {/* Key AI Tools Stack */}
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                      Toolchain:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {creator.aiTools.slice(0, 4).map((tool, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Portfolio Thumbnail Preview */}
                  {creator.portfolio.length > 0 && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-800 relative group/thumb">
                      <img
                        src={creator.portfolio[0].thumbnailUrl}
                        alt={creator.portfolio[0].title}
                        className="w-full h-32 object-cover transition duration-300 group-hover/thumb:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-[11px] font-medium text-white truncate">
                          {creator.portfolio[0].title}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Pricing & CTA */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                      Pricing Range
                    </span>
                    <span className="text-sm font-bold text-white">
                      ${creator.priceRangeMin} - ${creator.priceRangeMax}
                    </span>
                  </div>

                  <Link
                    to={`/creators/${creator.id}`}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-primary-600 text-slate-200 hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    View Portfolio
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
