import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BackNavButton } from '../components/BackNavButton';
import {
  FileText,
  PlusCircle,
  Clock,
  CheckCircle,
  Eye,
  Trash2,
  DollarSign,
  Calendar,
  Users,
  Search,
  Filter
} from 'lucide-react';

export const MyCampaignsPage = () => {
  const { currentUser, campaigns, deleteCampaign, applications } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const myCampaigns = campaigns.filter(c => c.brandId === currentUser?.id);

  const filteredCampaigns = myCampaigns.filter(c => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to cancel and remove "${title}"?`)) {
      deleteCampaign(id);
      addToast(`Campaign "${title}" was removed.`, 'info');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackNavButton fallbackPath="/customer/dashboard" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
              My Campaigns Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Manage your active listings, review creator pitches, edit budget allocations, and track deliverables.
            </p>
          </div>
        </div>

        <NavLink
          to="/create-campaign"
          className="px-4 py-2.5 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create New Campaign</span>
        </NavLink>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 w-full sm:w-auto">
          {['all', 'active', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#006B4F] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your campaigns..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
          />
        </div>
      </div>

      {/* Campaigns List / Cards */}
      {filteredCampaigns.length === 0 ? (
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-base font-bold text-[#102A43] dark:text-white">No campaigns found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {myCampaigns.length === 0
              ? "You haven't launched any brand campaigns yet. Click below to publish your first sponsorship brief."
              : "No campaigns match your search and filter criteria."}
          </p>
          {myCampaigns.length === 0 && (
            <NavLink
              to="/create-campaign"
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006B4F] text-white text-xs font-semibold shadow-sm"
            >
              <PlusCircle className="w-4 h-4" /> Launch First Campaign
            </NavLink>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCampaigns.map(camp => {
            const campApps = applications.filter(a => a.campaignId === camp.id);
            return (
              <div
                key={camp.id}
                className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#006B4F] dark:text-emerald-300">
                      {camp.category}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {camp.platform}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Deadline: {camp.deadline}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#102A43] dark:text-white">
                    {camp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {camp.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <span className="font-bold text-[#006B4F] dark:text-emerald-400">
                      Budget: ${camp.budget}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">
                      Proposals Received: <strong className="text-slate-800 dark:text-white">{campApps.length || camp.applicationsCount}</strong>
                    </span>
                    <span className="text-slate-400">
                      Spots Available: {camp.spotsAvailable || 3}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <NavLink
                    to={`/campaign/${camp.id}`}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Applications
                  </NavLink>
                  <button
                    onClick={() => handleDelete(camp.id, camp.title)}
                    className="p-2 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Delete Campaign"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
