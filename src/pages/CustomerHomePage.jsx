import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserAvatar } from '../components/UserAvatar';
import {
  Search,
  Sparkles,
  PlusCircle,
  Briefcase,
  Users,
  CheckCircle2,
  TrendingUp,
  Star,
  Bookmark,
  ArrowRight,
  Filter,
  DollarSign
} from 'lucide-react';

export const CustomerHomePage = () => {
  const {
    currentUser,
    creators,
    campaigns,
    collaborations,
    savedCreatorIds,
    toggleSaveCreator
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const myCampaigns = campaigns.filter(c => c.brandId === currentUser?.id);
  const myCollaborations = collaborations.filter(c => c.brandId === currentUser?.id);

  const categories = [
    'All',
    'Tech & Gadgets',
    'Fitness & Wellness',
    'Fashion & Beauty',
    'Food & Cooking',
    'Gaming & Esports',
    'Travel & Adventure'
  ];

  const featuredCreators = creators
    .filter(c => {
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.platform.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .slice(0, 6);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Brand Hero Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#102A43] via-[#0d2238] to-[#006B4F] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" /> Brand Campaign Headquarters
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome, {currentUser?.name}
          </h1>
          <p className="mt-2 text-slate-200 text-sm sm:text-base leading-relaxed">
            Connect with vetted content creators, launch targeted campaigns, and track performance across social networks.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <NavLink
              to="/create-campaign"
              className="px-5 py-2.5 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-sm font-semibold shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Campaign</span>
            </NavLink>
            <NavLink
              to="/discover-creators"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm font-semibold border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-emerald-300" />
              <span>Explore All Creators</span>
            </NavLink>
          </div>
        </div>

        <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none">
          <Users className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Campaigns</span>
            <Briefcase className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-[#102A43] dark:text-white">{myCampaigns.length}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Live in marketplace</p>
        </div>

        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Creators Hired</span>
            <Users className="w-5 h-5 text-[#006B4F] dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-[#102A43] dark:text-white">{myCollaborations.length}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Contracted collaborations</p>
        </div>

        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Saved Talent</span>
            <Bookmark className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-[#102A43] dark:text-white">{savedCreatorIds.length}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Bookmarked creator cards</p>
        </div>

        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Campaign Budget</span>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-[#006B4F] dark:text-emerald-400">
            ${myCampaigns.reduce((acc, c) => acc + (c.budget || 0), 0) || '4,500'}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Allocated project spend</p>
        </div>
      </div>

      {/* Discovery Search & Category Filter Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] dark:text-white">
              Discover & Hire Creators
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Find creators with proven audience engagement, verified channels, and transparent pricing.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, platform, niche..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#102A43] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#006B4F] text-white shadow-sm'
                  : 'bg-white dark:bg-[#102A43] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Creators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCreators.map((creator) => {
            const isSaved = savedCreatorIds.includes(creator.id);

            return (
              <div
                key={creator.id}
                className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Creator Cover Image & Bookmark */}
                <div className="relative h-28 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
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

                {/* Creator Details */}
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

                    {/* Stats pills */}
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-center mb-4">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block">Followers</span>
                        <span className="text-xs font-bold text-[#102A43] dark:text-white">
                          {creator.followers.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block">Starting At</span>
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
                    <button
                      onClick={() => navigate(`/creator-profile/${creator.id}?action=hire`)}
                      className="flex-1 py-2 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold text-center shadow-sm transition-all cursor-pointer"
                    >
                      Collaborate
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
