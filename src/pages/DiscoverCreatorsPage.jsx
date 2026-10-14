import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserAvatar } from '../components/UserAvatar';
import {
  Search,
  Filter,
  Star,
  CheckCircle2,
  Bookmark,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';

export const DiscoverCreatorsPage = () => {
  const { creators, savedCreatorIds, toggleSaveCreator } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxBudget, setMaxBudget] = useState(2000);

  const categories = [
    'All',
    'Tech & Gadgets',
    'Fitness & Wellness',
    'Fashion & Beauty',
    'Food & Cooking',
    'Gaming & Esports',
    'Travel & Adventure'
  ];

  const platforms = ['All', 'Instagram', 'YouTube', 'TikTok'];

  const filteredCreators = creators.filter(c => {
    const matchCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchPlatform = selectedPlatform === 'All' || c.platform === selectedPlatform;
    const matchVerified = !verifiedOnly || c.verified;
    const matchBudget = (c.ratePerPost || 0) <= maxBudget;
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      (c.bio && c.bio.toLowerCase().includes(search.toLowerCase())) ||
      (c.tags && c.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));

    return matchCategory && matchPlatform && matchVerified && matchBudget && matchSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
          Discover Creators & Influencers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore vetted talent across multiple platforms and niches. Compare metrics, rates, and sample work.
        </p>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by creator name, tags, or expertise..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
            >
              {categories.map(c => <option key={c} value={c}>Category: {c}</option>)}
            </select>

            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
            >
              {platforms.map(p => <option key={p} value={p}>Platform: {p}</option>)}
            </select>

            <label className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded border-slate-300 text-[#006B4F] focus:ring-[#006B4F]"
              />
              <span>Verified Only</span>
            </label>
          </div>
        </div>

        {/* Budget Slider */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Max Rate Per Post:</span>
            <span className="font-bold text-[#006B4F] dark:text-emerald-400 text-sm">${maxBudget}</span>
            <input
              type="range"
              min="300"
              max="2500"
              step="50"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-40 sm:w-60 accent-[#006B4F]"
            />
          </div>

          <span className="text-slate-400">
            Showing <strong className="text-slate-700 dark:text-slate-200">{filteredCreators.length}</strong> matching creators
          </span>
        </div>
      </div>

      {/* Creator Grid */}
      {filteredCreators.length === 0 ? (
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">No creators found matching your current filter criteria.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setSelectedPlatform('All');
              setVerifiedOnly(false);
              setMaxBudget(2000);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#006B4F] text-white text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => {
            const isSaved = savedCreatorIds.includes(creator.id);

            return (
              <div
                key={creator.id}
                className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-32 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={creator.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <button
                    onClick={() => toggleSaveCreator(creator.id)}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
                      isSaved
                        ? 'bg-[#006B4F] text-white shadow-md'
                        : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white'
                    }`}
                    title={isSaved ? 'Saved to Favorites' : 'Save Creator'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <div className="absolute bottom-2 left-4 text-white text-xs font-medium flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{creator.rating} ({creator.reviewsCount} reviews)</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 -mt-10 mb-3 relative z-10">
                      <UserAvatar
                        src={creator.avatar}
                        name={creator.name}
                        size="lg"
                        className="ring-4 ring-white dark:ring-[#102A43] shadow-md"
                      />
                      <div className="pt-4 min-w-0">
                        <h3 className="font-bold text-base text-[#102A43] dark:text-white truncate flex items-center gap-1">
                          {creator.name || 'Unnamed Creator'}
                          {creator.verified && (
                            <CheckCircle2 className="w-4 h-4 text-[#006B4F] dark:text-emerald-400 shrink-0" />
                          )}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {creator.category} • {creator.platform}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {creator.bio}
                    </p>

                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-center mb-4">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block">Followers</span>
                        <span className="text-xs font-bold text-[#102A43] dark:text-white">
                          {creator.followers.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block">Base Rate</span>
                        <span className="text-xs font-bold text-[#006B4F] dark:text-emerald-400">
                          ${creator.ratePerPost}/post
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <NavLink
                      to={`/creator-profile/${creator.id}`}
                      className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#102A43] dark:text-white text-xs font-semibold text-center transition-colors"
                    >
                      View Profile
                    </NavLink>
                    <NavLink
                      to={`/creator-profile/${creator.id}?action=hire`}
                      className="flex-1 py-2 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold text-center shadow-sm transition-all cursor-pointer"
                    >
                      Hire Creator
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
