import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { Users, ArrowLeft, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';

export default function AdminUsers() {
  const { creators } = useMarketplaceStore();

  const userList = [
    {
      id: 'usr-1',
      name: 'Aetheria Studios',
      email: 'brand@aiforge.demo',
      role: 'BRAND',
      status: 'Active',
      joined: '2026-07-12'
    },
    ...creators.map((c) => ({
      id: c.userId,
      name: c.displayName,
      email: `${c.displayName.toLowerCase().replace(' ', '.')}@aiforge.demo`,
      role: 'CREATOR',
      status: 'Active',
      joined: '2026-08-01'
    })),
    {
      id: 'usr-admin',
      name: 'System Administrator',
      email: 'admin@aiforge.demo',
      role: 'ADMIN',
      status: 'Superuser',
      joined: '2026-06-01'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar activeTab="admin" />

      <div className="border-b border-slate-800 bg-slate-900/40 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/admin" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Admin Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-primary-400" />
            User Management & Role Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global view of registered Brands, AI Creators, and Administrators.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {userList.map((u) => (
                <tr key={u.id} className="hover:bg-slate-850/50 transition">
                  <td className="p-4">
                    <div className="font-bold text-white">{u.name}</div>
                    <div className="text-[11px] text-slate-500">{u.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === 'ADMIN'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : u.role === 'BRAND'
                        ? 'bg-primary-950 text-primary-400 border border-primary-800'
                        : 'bg-accent-950 text-accent-400 border border-accent-800'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{u.joined}</td>
                  <td className="p-4 text-right">
                    <button className="text-primary-400 hover:text-primary-300 font-medium">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
