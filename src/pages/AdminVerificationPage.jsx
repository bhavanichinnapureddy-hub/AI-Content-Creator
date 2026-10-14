import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BackNavButton } from '../components/BackNavButton';
import { UserAvatar } from '../components/UserAvatar';
import { CheckCircle2, XCircle, Search, ShieldAlert, Award } from 'lucide-react';

export const AdminVerificationPage = () => {
  const { creators, verifyCreator } = useAuth();
  const { addToast } = useToast();
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = creators.filter(c => {
    const status = c.verificationStatus || (c.verified ? 'approved' : 'pending');
    const matchesFilter = filter === 'all' || status === filter;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleVerify = (id, name, approve) => {
    verifyCreator(id, approve);
    addToast(
      approve ? `Verified Creator Badge granted to ${name}.` : `Verification rejected for ${name}.`,
      approve ? 'success' : 'info'
    );
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackNavButton fallbackPath="/admin/home" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
              Creator Profile Verification
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Review creator verification requests, authenticate social accounts and grant verified badges.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 w-full sm:w-auto">
          {['all', 'pending', 'approved', 'rejected'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-[#006B4F] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search creators..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
          />
        </div>
      </div>

      {/* Table of Verification Requests */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            No verification requests found matching your current filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Creator</th>
                  <th className="p-4">Category / Platform</th>
                  <th className="p-4">Followers</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map(creator => {
                  const status = creator.verificationStatus || (creator.verified ? 'approved' : 'pending');
                  return (
                    <tr key={creator.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar
                            src={creator.avatar}
                            name={creator.name}
                            size="md"
                          />
                          <div>
                            <p className="font-bold text-[#102A43] dark:text-white flex items-center gap-1.5">
                              {creator.name}
                              {creator.verified && <Award className="w-3.5 h-3.5 text-[#006B4F] dark:text-emerald-400" />}
                            </p>
                            <p className="text-[11px] text-slate-400">{creator.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-700 dark:text-slate-300">{creator.category}</p>
                        <p className="text-[11px] text-slate-400">{creator.platform}</p>
                      </td>
                      <td className="p-4 font-bold text-slate-700 dark:text-slate-300">
                        {creator.followers.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          status === 'approved'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-[#006B4F] dark:text-emerald-300'
                            : status === 'rejected'
                            ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleVerify(creator.id, creator.name, true)}
                            disabled={creator.verified}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                              creator.verified
                                ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
                                : 'bg-[#006B4F] hover:bg-[#00563f] text-white shadow-sm'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => handleVerify(creator.id, creator.name, false)}
                            disabled={!creator.verified && status === 'rejected'}
                            className="px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-800 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
