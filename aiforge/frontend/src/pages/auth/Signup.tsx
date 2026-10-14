import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '@/stores/authStore';
import { Sparkles, ArrowRight, ShieldCheck, Building2, User, Lock, Mail } from 'lucide-react';

export default function Signup() {
  const [role, setRole] = useState<UserRole>('BRAND');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      role,
      displayName: name || (role === 'BRAND' ? 'Creative Agency' : 'AI Creator'),
      isEmailVerified: true
    };
    setUser(newUser);
    if (role === 'CREATOR') {
      navigate('/creator/dashboard');
    } else {
      navigate('/dashboard');
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
        <h2 className="text-3xl font-extrabold text-white">Create your account</h2>
        <p className="mt-2 text-sm text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="font-medium text-primary-400 hover:text-primary-300">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSignup}>
            {/* Role Toggle Tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Join As:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('BRAND')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition ${
                    role === 'BRAND'
                      ? 'border-primary-500 bg-primary-950/40 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Building2 className={`w-5 h-5 mt-0.5 ${role === 'BRAND' ? 'text-primary-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-sm font-bold">Brand / Agency</div>
                    <div className="text-[11px] text-slate-400">Commission AI projects</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('CREATOR')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition ${
                    role === 'CREATOR'
                      ? 'border-accent-500 bg-accent-950/40 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <User className={`w-5 h-5 mt-0.5 ${role === 'CREATOR' ? 'text-accent-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-sm font-bold">AI Creator</div>
                    <div className="text-[11px] text-slate-400">Showcase AI work</div>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {role === 'BRAND' ? 'Company or Agency Name' : 'Creator Display Name'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={role === 'BRAND' ? 'e.g. Apex Studio' : 'e.g. Jordan V.'}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Business Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="contact@studio.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Min 8 chars, 1 uppercase, 1 symbol"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-brand text-white font-semibold text-sm shadow-glow-primary hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Role-Based Access Control enforced on backend
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
