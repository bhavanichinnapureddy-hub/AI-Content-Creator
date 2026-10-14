import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { BackNavButton } from '../components/BackNavButton';
import { Settings, Sun, Moon, Shield, Bell, Key, LogOut } from 'lucide-react';

export const SettingsPage = () => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="space-y-4">
        <BackNavButton label="Back" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
            Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Customize your display theme, security settings, and session status.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Appearance Settings */}
        <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#102A43] dark:text-white mb-2">
            Appearance & Visual Theme
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Toggle between CreatorSphere AI Light Mode and Deep Navy Dark Mode across all components.
          </p>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-emerald-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
              <div>
                <p className="text-xs font-bold text-[#102A43] dark:text-white">
                  Current Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </p>
                <p className="text-[11px] text-slate-400">
                  Deep Blue (#102A43), White (#FFFFFF) & Deep Green (#006B4F) palette
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>

        {/* Security / Password Simulation */}
        <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#102A43] dark:text-white mb-2">
            Security & Authentication
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Signed in as <strong className="text-[#006B4F] dark:text-emerald-400">{currentUser?.email}</strong> with role-based session guarding.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-[#006B4F] dark:text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-[#102A43] dark:text-white">Password Management</p>
                <p className="text-[11px] text-slate-400">Manage credentials stored in your current demo session</p>
              </div>
            </div>
            <NavLink
              to="/forgot-password"
              state={{ role: currentUser?.role || 'creator' }}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer inline-block"
            >
              Update Password
            </NavLink>
          </div>
        </div>

        {/* Logout Zone */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-rose-600 mb-2">
            Session Termination
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Log out from your current role and return to the main role selection portal.
          </p>

          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of CreatorSphere AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
