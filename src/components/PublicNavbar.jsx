import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const PublicNavbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-[#003B46] text-white border-b border-[#07575B] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00796B] to-[#48E5C2] flex items-center justify-center shadow-lg shadow-teal-950/40 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1">
              CreatorSphere<span className="text-[#48E5C2]"> AI</span>
            </span>
            <div className="text-[10px] tracking-widest uppercase font-semibold text-[#48E5C2]">
              AI Creator Marketplace
            </div>
          </div>
        </NavLink>

        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink
            to="/about"
            className="text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-colors hidden md:inline px-2 py-1"
          >
            About Us
          </NavLink>

          {/* Quick Role Links in Header */}
          <NavLink
            to="/admin/login"
            className="text-xs sm:text-sm font-medium text-slate-200 hover:text-[#48E5C2] px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            Admin
          </NavLink>

          <NavLink
            to="/creator/login"
            className="text-xs sm:text-sm font-medium text-slate-200 hover:text-[#48E5C2] px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            Creator
          </NavLink>

          <NavLink
            to="/customer/login"
            className="text-xs sm:text-sm font-medium text-slate-200 hover:text-[#48E5C2] px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            Customer
          </NavLink>

          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /> : <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
