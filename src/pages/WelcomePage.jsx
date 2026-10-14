import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicNavbar } from '../components/PublicNavbar';
import { Shield, Sparkles, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';

export const WelcomePage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'admin',
      title: 'Admin',
      subtitle: 'Platform Oversight',
      description: 'Manage and monitor the entire platform, verify creators, review reports, and ensure trust & safety across all campaigns.',
      icon: Shield,
      path: '/admin/login',
      badge: 'Staff Portal',
      buttonText: 'Sign In as Admin',
      secondaryText: null,
      secondaryPath: null
    },
    {
      id: 'creator',
      title: 'Creator',
      subtitle: 'Talent & Influence',
      description: 'Showcase your portfolio, discover brand campaigns across 26+ categories, generate content, and monetize your influence.',
      icon: Sparkles,
      path: '/creator/login',
      badge: 'Talent Portal',
      buttonText: 'Sign In as Creator',
      secondaryText: 'Create Creator Account',
      secondaryPath: '/creator/signup'
    },
    {
      id: 'customer',
      title: 'Customer',
      subtitle: 'Brands & Businesses',
      description: 'Discover verified creators, launch viral marketing campaigns, manage deliverables, and scale your brand reach.',
      icon: Briefcase,
      path: '/customer/login',
      badge: 'Brand Portal',
      buttonText: 'Sign In as Customer',
      secondaryText: 'Register Brand Account',
      secondaryPath: '/customer/signup'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1724] text-slate-900 dark:text-white flex flex-col transition-colors duration-200">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex flex-col items-center justify-center">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950/60 text-[#00796B] dark:text-[#48E5C2] border border-teal-300 dark:border-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-[#00796B] dark:text-[#48E5C2]" /> Next-Gen AI Creator Marketplace
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#003B46] dark:text-white tracking-tight leading-tight">
            Welcome to <span className="text-[#00796B] dark:text-[#48E5C2]">CreatorSphere AI</span>
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-slate-700 dark:text-slate-300 font-medium">
            “Your Platform to Connect, Create and Collaborate.”
          </p>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-base max-w-2xl mx-auto">
            Choose your role below to access your dedicated workspace. Seamlessly connect visionary brands with verified content creators.
          </p>

          {/* Direct Quick Role Pills for instant mobile & desktop access */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => navigate('/admin/login')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm"
            >
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Admin Portal
            </button>
            <button
              onClick={() => navigate('/creator/login')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-100 dark:bg-teal-950/80 hover:bg-teal-200 dark:hover:bg-teal-900 text-[#00796B] dark:text-[#48E5C2] text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm border border-teal-300/40"
            >
              <Sparkles className="w-4 h-4 text-[#00796B] dark:text-[#48E5C2]" /> Creator Portal
            </button>
            <button
              onClick={() => navigate('/customer/login')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 hover:bg-cyan-200 dark:hover:bg-cyan-900 text-cyan-800 dark:text-cyan-300 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm border border-cyan-300/40"
            >
              <Briefcase className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Customer Portal
            </button>
          </div>
        </div>

        {/* Role Selection Prompt */}
        <div className="w-full text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43] dark:text-white">
            Select Your Role
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Three dedicated portals built specifically for Admins, Creators, and Customers
          </p>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className="group relative bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-700/80 rounded-2xl p-7 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-xl bg-[#00796B]/10 dark:bg-teal-950 flex items-center justify-center text-[#00796B] dark:text-[#48E5C2] group-hover:scale-110 group-hover:bg-[#00796B] group-hover:text-white transition-all shadow-inner">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {role.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#102A43] dark:text-white mb-1 group-hover:text-[#00796B] dark:group-hover:text-[#48E5C2] transition-colors">
                    {role.title}
                  </h3>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#00796B] dark:text-[#48E5C2] mb-3">
                    {role.subtitle}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    {role.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => navigate(role.path)}
                    className="w-full py-3 px-4 rounded-xl bg-[#00796B] hover:bg-[#005F54] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-teal-950/40 transition-all cursor-pointer"
                  >
                    <span>{role.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {role.secondaryText && (
                    <button
                      onClick={() => navigate(role.secondaryPath)}
                      className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-[#00796B] dark:hover:text-[#48E5C2] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      {role.secondaryText}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10 w-full max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-3 justify-center sm:justify-start">
              <CheckCircle2 className="w-5 h-5 text-[#00796B] dark:text-[#48E5C2] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-[#003B46] dark:text-white">Strict Role Separation</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Isolated dashboards for Admins, Creators, and Brand clients.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 justify-center sm:justify-start">
              <CheckCircle2 className="w-5 h-5 text-[#00796B] dark:text-[#48E5C2] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-[#003B46] dark:text-white">Intelligent AI Matchmaking</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automated brief generation, creator matchmaking, and viral analytics.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 justify-center sm:justify-start">
              <CheckCircle2 className="w-5 h-5 text-[#00796B] dark:text-[#48E5C2] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-[#003B46] dark:text-white">Secure Brand Deals</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Direct project applications, deliverables tracking, and verified reviews.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#003B46] py-6 text-center text-xs text-slate-500 dark:text-slate-300">
        <p>© 2026 CreatorSphere AI – AI Content Creator Marketplace. Peacock Green, Peacock Blue & White Theme.</p>
      </footer>
    </div>
  );
};
