import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, Bell, Sun, Moon, ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const MainLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { currentUser, notifications } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const unreadCount = notifications.filter(n =>
    !n.read && (n.recipientRole === currentUser?.role || n.recipientId === currentUser?.id || n.recipientId === 'all')
  ).length;

  const handleReopenSidebar = () => {
    setSidebarVisible(true);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobileOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b1724] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {sidebarVisible && (
        <Sidebar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          onNavigate={() => setSidebarVisible(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-16 bg-white/90 dark:bg-[#102A43]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            {!sidebarVisible ? (
              <button
                onClick={handleReopenSidebar}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#00796B] dark:text-[#48E5C2] border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900 transition-all shadow-sm font-semibold text-xs cursor-pointer"
                aria-label="Reopen navigation menu"
                title="Show Menu / Sidebar"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Menu</span>
              </button>
            ) : (
              <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                aria-label="Open Navigation"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-[#006B4F] dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {currentUser?.role === 'admin' ? 'Platform Administrator' : currentUser?.role === 'creator' ? 'Verified Creator' : 'Brand Client'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5 text-emerald-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            </button>

            <NavLink
              to="/notifications"
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/profile"
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              title="My Profile"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00796B] to-[#48E5C2] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[120px]">
                  {currentUser?.name || 'User Profile'}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                  {currentUser?.role}
                </span>
              </div>
            </NavLink>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
