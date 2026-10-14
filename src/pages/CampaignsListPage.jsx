import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Bookmark,
  Calendar,
  DollarSign,
  ArrowRight,
  Filter,
  CheckCircle,
  Briefcase
} from 'lucide-react';

import { CAMPAIGN_CATEGORIES } from '../data/categories';

export const CampaignsListPage = () => {
  const { campaigns, savedCampaignIds, toggleSaveCampaign, currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');

  const categories = ['All', ...CAMPAIGN_CATEGORIES];

  const platforms = ['All', 'Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'Twitter / X'];

  const filteredCampaigns = campaigns.filter(c => {
    const matchCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchPlatform = selectedPlatform === 'All' || c.platform === selectedPlatform;
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.brandName.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchPlatform && matchSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
            Discover Paid Brand Campaigns
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse open sponsorship briefs, submit your rate, and pitch your creative approach directly to brands.
          </p>
        </div>

        {currentUser?.role === 'customer' && (
          <NavLink
            to="/create-campaign"
            className="px-4 py-2 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer self-start"
          >
            <span>+ Post Campaign</span>
          </NavLink>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns by title, keywords, or brand..."
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
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCampaigns.map((camp) => {
          const isSaved = savedCampaignIds.includes(camp.id);

          return (
            <div
              key={camp.id}
              className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={camp.brandLogo}
                      alt={camp.brandName}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#006B4F] dark:text-emerald-400 uppercase tracking-wider block">
                        {camp.brandName}
                      </span>
                      <h3 className="text-base font-bold text-[#102A43] dark:text-white line-clamp-1">
                        {camp.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSaveCampaign(camp.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      isSaved
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-[#006B4F] dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white'
                    }`}
                    title={isSaved ? 'Saved' : 'Save Campaign'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                  {camp.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-[#006B4F] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg">
                    Budget: ${camp.budget}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    {camp.platform}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    {camp.category}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Deadline: {camp.deadline} • {camp.applicationsCount} applicants
                </span>
                <NavLink
                  to={`/campaign/${camp.id}`}
                  className="px-4 py-2 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
