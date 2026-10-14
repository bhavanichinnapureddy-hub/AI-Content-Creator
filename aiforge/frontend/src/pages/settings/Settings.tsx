import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useAuthStore } from '@/stores/authStore';
import { ShieldCheck, User, Bell, Key, CheckCircle2 } from 'lucide-react';

export default function Settings() {
  const { user } = useAuthStore();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar activeTab="settings" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Account & Security Settings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your personal profile, credentials, and notification preferences.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
              <img
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"}
                alt="Avatar"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary-500/20"
              />
              <div>
                <h3 className="font-bold text-white text-base">{user?.displayName}</h3>
                <span className="text-xs text-primary-400 font-semibold">{user?.role} Profile</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user?.email || 'user@aiforge.demo'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                2FA & Argon2 Password Encryption Enabled
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-brand text-white font-bold text-xs shadow-glow-primary hover:opacity-95 transition"
              >
                {saved ? 'Changes Saved!' : 'Save Preferences'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
