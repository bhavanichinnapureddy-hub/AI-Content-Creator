import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  LayoutDashboard,
  Compass,
  FileText,
  Handshake,
  MessageSquare,
  Sparkles,
  Bookmark,
  Settings,
  Info,
  LogOut,
  Users,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
  X,
  Briefcase
} from 'lucide-react';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen, onNavigate }) => {
  const { currentUser, logout, notifications } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!currentUser) return null;

  const unreadCount = notifications.filter(n =>
    !n.read && (n.recipientRole === currentUser.role || n.recipientId === currentUser.id || n.recipientId === 'all')
  ).length;

  const handleLogout = () => {
    logout();
    navigate('/');
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const closeAfterNavigate = () => {
    if (setIsMobileOpen) setIsMobileOpen(false);
    if (onNavigate) onNavigate();
  };

  const getNavLinks = () => {
    if (currentUser.role === 'creator') {
      return [
        { name: 'Home', path: '/creator/home', icon: Home },
        { name: 'Creator Dashboard', path: '/creator/dashboard', icon: LayoutDashboard },
        { name: 'Discover Campaigns', path: '/campaigns', icon: Compass },
        { name: 'My Applications', path: '/applications', icon: FileText },
        { name: 'My Portfolio', path: '/portfolio', icon: Briefcase },
        { name: 'Messages', path: '/messages', icon: MessageSquare },
        { name: 'About Us', path: '/about', icon: Info },
      ];
    }

    if (currentUser.role === 'admin') {
      return [
        { name: 'Admin Home', path: '/admin/home', icon: Home },
        { name: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Manage Creators', path: '/admin/creators', icon: Users },
        { name: 'Manage Customers', path: '/admin/customers', icon: Users },
        { name: 'Manage Users', path: '/admin/users', icon: ShieldCheck },
        { name: 'Manage Campaigns', path: '/admin/campaigns', icon: FileText },
        { name: 'Verify Creator Profiles', path: '/admin/verify-creators', icon: ShieldCheck, badge: 'Review' },
        { name: 'Messages', path: '/messages', icon: MessageSquare, badgeCount: unreadCount },
        { name: 'Reports and Complaints', path: '/admin/reports', icon: AlertTriangle },
        { name: 'Platform Analytics', path: '/admin/analytics', icon: BarChart3 },
        { name: 'About Us', path: '/about', icon: Info },
      ];
    }

    if (currentUser.role === 'customer') {
      return [
        { name: 'Home', path: '/customer/home', icon: Home },
        { name: 'Customer Dashboard', path: '/customer/dashboard', icon: LayoutDashboard },
        { name: 'Discover Creators', path: '/discover-creators', icon: Compass },
        { name: 'Saved Creators', path: '/saved-creators', icon: Bookmark },
        { name: 'Collaboration Requests', path: '/collaborations', icon: Handshake },
        { name: 'Messages', path: '/messages', icon: MessageSquare },
        { name: 'About Us', path: '/about', icon: Info },
      ];
    }

    return [];
  };

  const navLinks = getNavLinks();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#102A43] text-white select-none border-r border-[#1e3a5f] shadow-2xl">
      <div className="p-5 flex items-center justify-between border-b border-slate-700/60">
        <NavLink
          to={`/${currentUser.role}/home`}
          className="flex items-center gap-3 group"
          onClick={closeAfterNavigate}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00796B] to-[#48E5C2] flex items-center justify-center shadow-lg shadow-teal-950/40 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              Creator<span className="text-[#48E5C2]">Sphere</span>
            </span>
            <div className="text-[10px] tracking-wider font-semibold text-[#48E5C2] uppercase">
              {currentUser.role === 'admin' ? 'Super Admin' : currentUser.role === 'creator' ? 'Creator Suite' : 'Brand Portal'}
            </div>
          </div>
        </NavLink>
        {isMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={closeAfterNavigate}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-[#006B4F] text-white shadow-md shadow-emerald-950/40 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                <span className="truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {item.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
                {typeof item.badgeCount === 'number' && item.badgeCount > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                    {item.badgeCount}
                  </span>
                )}
              </div>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800 space-y-1.5 bg-slate-950/40">
        <NavLink
          to="/settings"
          onClick={closeAfterNavigate}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative flex flex-col w-72 max-w-[85vw] h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
