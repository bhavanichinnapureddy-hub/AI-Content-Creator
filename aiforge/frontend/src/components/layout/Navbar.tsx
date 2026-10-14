import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '@/stores/authStore';
import { 
  Sparkles, 
  Search, 
  PlusCircle, 
  CreditCard, 
  ShieldCheck, 
  LogOut, 
  Layers, 
  User, 
  BarChart3,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  activeTab?: string;
}

export default function Navbar({ activeTab }: NavbarProps) {
  const { user, isAuthenticated, logout, switchDemoRole } = useAuthStore();
  const navigate = useNavigate();

  const handleRoleSwitch = (role: UserRole) => {
    switchDemoRole(role);
    if (role === 'BRAND') navigate('/dashboard');
    else if (role === 'CREATOR') navigate('/creator/dashboard');
    else if (role === 'ADMIN') navigate('/admin');
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow-primary">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              AIForge
            </span>
          </Link>

          {/* Navigation links based on state */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
            <Link 
              to="/creators" 
              className={`hover:text-white transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                activeTab === 'creators' ? 'bg-slate-800 text-white font-semibold' : ''
              }`}
            >
              <Search className="w-4 h-4 text-primary-400" />
              Discover Creators
            </Link>

            {isAuthenticated && user?.role === 'BRAND' && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`hover:text-white transition px-3 py-1.5 rounded-lg ${
                    activeTab === 'dashboard' ? 'bg-slate-800 text-white font-semibold' : ''
                  }`}
                >
                  Brand Dashboard
                </Link>
                <Link 
                  to="/briefs/new" 
                  className={`hover:text-white transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                    activeTab === 'new-brief' ? 'bg-slate-800 text-white font-semibold' : ''
                  }`}
                >
                  <PlusCircle className="w-4 h-4 text-accent-400" />
                  Post AI Brief
                </Link>
                <Link 
                  to="/payments" 
                  className={`hover:text-white transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                    activeTab === 'payments' ? 'bg-slate-800 text-white font-semibold' : ''
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  Escrow Wallet
                </Link>
              </>
            )}

            {isAuthenticated && user?.role === 'CREATOR' && (
              <>
                <Link 
                  to="/creator/dashboard" 
                  className={`hover:text-white transition px-3 py-1.5 rounded-lg ${
                    activeTab === 'creator-dashboard' ? 'bg-slate-800 text-white font-semibold' : ''
                  }`}
                >
                  Creator Studio
                </Link>
                <Link 
                  to="/creator/payments" 
                  className={`hover:text-white transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                    activeTab === 'creator-payments' ? 'bg-slate-800 text-white font-semibold' : ''
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  Earnings & Payouts
                </Link>
              </>
            )}

            {isAuthenticated && user?.role === 'ADMIN' && (
              <>
                <Link 
                  to="/admin" 
                  className={`hover:text-white transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                    activeTab === 'admin' ? 'bg-slate-800 text-white font-semibold' : ''
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Admin Console
                </Link>
                <Link 
                  to="/admin/verification" 
                  className={`hover:text-white transition px-3 py-1.5 rounded-lg ${
                    activeTab === 'verification' ? 'bg-slate-800 text-white font-semibold' : ''
                  }`}
                >
                  Verifications
                </Link>
                <Link 
                  to="/admin/analytics" 
                  className={`hover:text-white transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                    activeTab === 'analytics' ? 'bg-slate-800 text-white font-semibold' : ''
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-primary-400" />
                  Platform Metrics
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Right Actions & Demo Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Role Switcher Badge */}
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
              <span className="text-slate-500 px-2 font-medium">Role:</span>
              <button 
                onClick={() => handleRoleSwitch('BRAND')}
                className={`px-2 py-1 rounded-lg transition font-medium ${
                  user?.role === 'BRAND' ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Brand
              </button>
              <button 
                onClick={() => handleRoleSwitch('CREATOR')}
                className={`px-2 py-1 rounded-lg transition font-medium ${
                  user?.role === 'CREATOR' ? 'bg-accent-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Creator
              </button>
              <button 
                onClick={() => handleRoleSwitch('ADMIN')}
                className={`px-2 py-1 rounded-lg transition font-medium ${
                  user?.role === 'ADMIN' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>
          ) : null}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.displayName} className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs">
                    {user?.displayName?.charAt(0) || 'U'}
                  </div>
                )}
                <div className="hidden lg:block text-left text-xs leading-tight">
                  <div className="font-semibold text-white">{user?.displayName}</div>
                  <div className="text-slate-400">{user?.role}</div>
                </div>
              </div>

              <button 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-900 transition">
                Sign In
              </Link>
              <Link to="/signup" className="btn-sm btn-primary bg-primary-600 hover:bg-primary-500 text-white px-3.5 py-1.5 rounded-xl text-sm font-semibold shadow-glow-primary transition">
                Join Marketplace
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
