import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '@/stores/authStore';
import { Sparkles, ShieldCheck, ArrowRight, Lock, Mail } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('brand@aiforge.demo');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      if (email.includes('creator')) {
        navigate('/creator/dashboard');
      } else if (email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please verify your email and password.');
    }
  };

  const handleQuickDemoSelect = (role: UserRole) => {
    if (role === 'BRAND') {
      setEmail('brand@aiforge.demo');
      setPassword('BrandSecure2026!');
    } else if (role === 'CREATOR') {
      setEmail('creator@aiforge.demo');
      setPassword('CreatorSecure2026!');
    } else {
      setEmail('admin@aiforge.demo');
      setPassword('AdminSecure2026!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-primary-500 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow-primary">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-2xl text-white tracking-tight">AIForge</span>
        </Link>
        <h2 className="text-3xl font-extrabold text-white">Sign in to your account</h2>
        <p className="mt-2 text-sm text-slate-400">
          Or{' '}
          <Link to="/signup" className="font-medium text-primary-400 hover:text-primary-300">
            register a new brand or creator account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          {/* Quick Demo Logins Pill Box */}
          <div className="mb-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">
              Quick Fill Demo Roles
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoSelect('BRAND')}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-primary-950/60 text-primary-300 border border-primary-800/60 hover:bg-primary-900/60 transition"
              >
                Brand
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoSelect('CREATOR')}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-accent-950/60 text-accent-300 border border-accent-800/60 hover:bg-accent-900/60 transition"
              >
                Creator
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoSelect('ADMIN')}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/60 transition"
              >
                Admin
              </button>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-primary-400 hover:text-primary-300">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-brand text-white font-semibold text-sm shadow-glow-primary hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              {isLoading ? 'Verifying...' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Secured with Argon2id and HttpOnly tokens
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
