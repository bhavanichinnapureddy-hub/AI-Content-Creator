import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bookmark, Compass, ArrowRight } from 'lucide-react';

export const SavedItemsPage = ({ mode = 'campaigns' }) => {
  const { savedCampaignIds, savedCreatorIds, campaigns, creators, toggleSaveCampaign, toggleSaveCreator } = useAuth();

  const isCampaignMode = mode === 'campaigns';

  const savedCampaigns = campaigns.filter(c => savedCampaignIds.includes(c.id));
  const savedCreators = creators.filter(c => savedCreatorIds.includes(c.id));

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
          {isCampaignMode ? 'Saved Brand Campaigns' : 'Saved Creators & Bookmarks'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Quickly access your bookmarked listings and opportunities.
        </p>
      </div>

      {isCampaignMode ? (
        savedCampaigns.length === 0 ? (
          <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
            <Bookmark className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No saved campaigns yet.</p>
            <NavLink to="/campaigns" className="mt-3 inline-block px-4 py-2 rounded-xl bg-[#006B4F] text-white text-xs font-semibold">
              Browse Campaigns
            </NavLink>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedCampaigns.map((camp) => (
              <div
                key={camp.id}
                className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#006B4F] dark:text-emerald-400 uppercase tracking-wider">
                      {camp.brandName}
                    </span>
                    <button
                      onClick={() => toggleSaveCampaign(camp.id)}
                      className="text-[#006B4F] dark:text-emerald-400 p-1 cursor-pointer"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                  <h3 className="text-base font-bold text-[#102A43] dark:text-white mb-2">{camp.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">{camp.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#006B4F] dark:text-emerald-400">${camp.budget}</span>
                  <NavLink
                    to={`/campaign/${camp.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-[#006B4F] text-white text-xs font-semibold flex items-center gap-1"
                  >
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        savedCreators.length === 0 ? (
          <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
            <Bookmark className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No saved creators yet.</p>
            <NavLink to="/discover-creators" className="mt-3 inline-block px-4 py-2 rounded-xl bg-[#006B4F] text-white text-xs font-semibold">
              Discover Creators
            </NavLink>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCreators.map((creator) => (
              <div
                key={creator.id}
                className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#006B4F]" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-sm text-[#102A43] dark:text-white truncate">{creator.name}</h3>
                    <p className="text-xs text-slate-400">{creator.category}</p>
                  </div>
                  <button
                    onClick={() => toggleSaveCreator(creator.id)}
                    className="text-[#006B4F] dark:text-emerald-400 cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#006B4F] dark:text-emerald-400">${creator.ratePerPost}/post</span>
                  <NavLink to={`/creator-profile/${creator.id}`} className="font-semibold text-slate-600 dark:text-slate-300 hover:underline">
                    Profile →
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
