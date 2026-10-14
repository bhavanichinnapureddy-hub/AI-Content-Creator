import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BackNavButton } from '../components/BackNavButton';
import { UserAvatar } from '../components/UserAvatar';
import {
  Users,
  Briefcase,
  FileCheck,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Ban,
  Trash2,
  ExternalLink
} from 'lucide-react';

export const AdminDashboardPage = ({ defaultTab = 'creators' }) => {
  const {
    creators,
    customers,
    campaigns,
    collaborations,
    registeredAccounts = [],
    verifyCreator,
    toggleAccountStatus,
    deleteCampaign,
    deleteUser
  } = useAuth();

  const { addToast } = useToast();
  const [tab, setTab] = useState(defaultTab); // 'creators' | 'customers' | 'users' | 'campaigns'
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Unified users list across creators, customers, and admin
  const allUsers = React.useMemo(() => {
    const list = [];
    // Admin
    list.push({
      id: 'admin-1',
      name: 'System Administrator',
      email: 'admin@creatorsphere.ai',
      role: 'admin',
      status: 'active',
      date: 'Platform Genesis',
      avatar: ''
    });
    // Creators
    creators.forEach(c => {
      list.push({
        id: c.id,
        name: c.name || 'Unnamed Creator',
        email: c.email || 'N/A',
        phone: c.phone || 'N/A',
        role: 'creator',
        status: c.status || 'active',
        date: '2026 Active',
        category: c.category,
        avatar: c.avatar
      });
    });
    // Customers
    customers.forEach(b => {
      list.push({
        id: b.id,
        name: b.name || b.companyName || 'Unnamed Brand',
        email: b.email || 'N/A',
        phone: b.phone || 'N/A',
        role: 'customer',
        status: b.status || 'active',
        date: '2026 Active',
        companyName: b.companyName,
        avatar: b.avatar
      });
    });
    return list;
  }, [creators, customers]);

  const filteredUsers = allUsers.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredCreators = creators.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCustomers = customers.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    (b.companyName && b.companyName.toLowerCase().includes(search.toLowerCase())) ||
    b.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCampaigns = campaigns.filter(cmp =>
    cmp.title.toLowerCase().includes(search.toLowerCase()) ||
    cmp.brandName.toLowerCase().includes(search.toLowerCase()) ||
    cmp.category.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackNavButton fallbackPath="/admin/home" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white capitalize">
              Admin {tab === 'creators' ? 'Creator Management' : tab === 'customers' ? 'Brand Management' : tab === 'users' ? 'User Directory' : 'Campaign Management'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Global search, account state suspension, creator badge grants, and campaign moderation.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs & Search Header */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Tab Switcher */}
        <div className="flex flex-wrap rounded-xl bg-slate-100 dark:bg-slate-800 p-1 gap-1">
          <button
            onClick={() => setTab('users')}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'users'
                ? 'bg-[#006B4F] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Users ({allUsers.length})
          </button>
          <button
            onClick={() => setTab('creators')}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'creators'
                ? 'bg-[#006B4F] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Creators ({creators.length})
          </button>
          <button
            onClick={() => setTab('customers')}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'customers'
                ? 'bg-[#006B4F] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Brands ({customers.length})
          </button>
          <button
            onClick={() => setTab('campaigns')}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'campaigns'
                ? 'bg-[#006B4F] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Campaigns ({campaigns.length})
          </button>
        </div>

        {/* Global Search & Filter Bar */}
        <div className="flex items-center gap-2 flex-1 max-w-lg">
          {tab === 'users' && (
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
            >
              <option value="all">All Roles</option>
              <option value="creator">Creators</option>
              <option value="customer">Brands</option>
              <option value="admin">Admins</option>
            </select>
          )}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${tab}...`}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Tab Tables */}
      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {/* ALL USERS TAB */}
        {tab === 'users' && (
          <div className="overflow-x-auto">
            {filteredUsers.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-[#102A43] dark:text-white">No Users Found</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  No accounts match the current filter criteria "{search || roleFilter}". Try resetting your search.
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">User / Identity</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Registered Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar src={u.avatar} name={u.name} size="sm" />
                          <div>
                            <p className="font-bold text-[#102A43] dark:text-white">{u.name}</p>
                            <p className="text-[11px] text-slate-400">{u.companyName || u.category || 'CreatorSphere Member'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          u.role === 'admin'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                            : u.role === 'creator'
                            ? 'bg-emerald-100 text-[#006B4F] dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800'
                        }`}>
                          {u.role === 'customer' ? 'Brand Client' : u.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-slate-700 dark:text-slate-200 font-medium">{u.email}</p>
                        {u.phone && u.phone !== 'N/A' && <p className="text-[11px] text-slate-400">{u.phone}</p>}
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          u.status === 'suspended'
                            ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-[#006B4F] dark:text-emerald-300'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">
                        {u.date}
                      </td>
                      <td className="p-4 text-right">
                        {u.role !== 'admin' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                toggleAccountStatus(u.id, u.role);
                                addToast(`Updated status for ${u.name}`, 'warning');
                              }}
                              className={`p-1.5 rounded-lg border cursor-pointer ${
                                u.status === 'suspended'
                                  ? 'bg-emerald-600 text-white'
                                  : 'text-rose-600 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950'
                              }`}
                              title={u.status === 'suspended' ? 'Activate Account' : 'Suspend Account'}
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                deleteUser(u.id, u.role);
                                addToast(`User ${u.name} deleted.`, 'info');
                              }}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 border border-rose-200 dark:border-rose-800 cursor-pointer"
                              title="Delete Account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Protected</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* CREATORS TAB */}
        {tab === 'creators' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Creator</th>
                  <th className="p-4">Category / Platform</th>
                  <th className="p-4">Audience</th>
                  <th className="p-4">Verification</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCreators.map((creator) => (
                  <tr key={creator.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <p className="font-bold text-[#102A43] dark:text-white">{creator.name}</p>
                          <p className="text-[11px] text-slate-400">{creator.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-700 dark:text-slate-200">{creator.category}</p>
                      <p className="text-[11px] text-slate-400">{creator.platform}</p>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {creator.followers.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400 block">{creator.engagementRate} eng.</span>
                    </td>
                    <td className="p-4">
                      {creator.verified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full">
                          {creator.verificationStatus}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        creator.status === 'suspended'
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                          : 'bg-emerald-100 dark:bg-emerald-950 text-[#006B4F] dark:text-emerald-300'
                      }`}>
                        {creator.status || 'active'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            verifyCreator(creator.id, !creator.verified);
                            addToast(`Updated verification badge for ${creator.name}`, 'info');
                          }}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          {creator.verified ? 'Revoke Badge' : 'Grant Badge'}
                        </button>
                        <button
                          onClick={() => {
                            toggleAccountStatus(creator.id, 'creator');
                            addToast(`Status updated for ${creator.name}`, 'warning');
                          }}
                          className={`p-1.5 rounded-lg border cursor-pointer ${
                            creator.status === 'suspended'
                              ? 'bg-emerald-600 text-white'
                              : 'text-rose-600 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950'
                          }`}
                          title={creator.status === 'suspended' ? 'Activate Account' : 'Suspend Account'}
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CUSTOMERS TAB */}
        {tab === 'customers' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Brand Representative</th>
                  <th className="p-4">Company Name</th>
                  <th className="p-4">Industry / Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCustomers.map((brand) => (
                  <tr key={brand.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={brand.avatar}
                          alt={brand.name}
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <p className="font-bold text-[#102A43] dark:text-white">{brand.name}</p>
                          <p className="text-[11px] text-slate-400">{brand.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                      {brand.companyName || 'Individual Creator Client'}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {brand.industry || 'Consumer'} • {brand.location || 'Global'}
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        brand.status === 'suspended'
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                          : 'bg-emerald-100 dark:bg-emerald-950 text-[#006B4F] dark:text-emerald-300'
                      }`}>
                        {brand.status || 'active'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          toggleAccountStatus(brand.id, 'customer');
                          addToast(`Brand status updated for ${brand.name}`, 'warning');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          brand.status === 'suspended'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                        }`}
                      >
                        {brand.status === 'suspended' ? 'Reactivate' : 'Suspend Account'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CAMPAIGNS TAB */}
        {tab === 'campaigns' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Campaign Title</th>
                  <th className="p-4">Sponsor Brand</th>
                  <th className="p-4">Budget / Platform</th>
                  <th className="p-4">Applicants</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-4">
                      <p className="font-bold text-[#102A43] dark:text-white">{camp.title}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{camp.description}</p>
                    </td>
                    <td className="p-4 font-medium text-slate-700 dark:text-slate-200">
                      {camp.brandName}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-[#006B4F] dark:text-emerald-400">${camp.budget}</span>
                      <span className="text-[11px] text-slate-400 block">{camp.platform}</span>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {camp.applicationsCount} proposals
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          deleteCampaign(camp.id);
                          addToast(`Campaign "${camp.title}" removed.`, 'info');
                        }}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-800 cursor-pointer"
                        title="Delete Campaign"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
