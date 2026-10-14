import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
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
        <h2 className="text-3xl font-extrabold text-white">Create New Password</h2>
        <p className="mt-2 text-sm text-slate-400">
          Enter a strong replacement password for your account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          {success ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Password Updated!</h3>
              <p className="text-xs text-slate-400 mb-2">
                Redirecting you to login...
              </p>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:ring-2 focus:ring-primary-500"
                    placeholder="Min 8 characters"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:ring-2 focus:ring-primary-500"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-brand text-white font-semibold text-sm shadow-glow-primary hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                Update Password
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
