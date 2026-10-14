import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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
        <h2 className="text-3xl font-extrabold text-white">Reset your password</h2>
        <p className="mt-2 text-sm text-slate-400">
          Enter your email to receive a secure, time-limited reset token.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Reset Link Dispatched</h3>
              <p className="text-xs text-slate-400 mb-6">
                If an account exists for {email}, a secure password reset link has been dispatched.
              </p>
              <Link
                to="/login"
                className="text-xs text-primary-400 hover:text-primary-300 font-semibold flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Registered Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:ring-2 focus:ring-primary-500"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-brand text-white font-semibold text-sm shadow-glow-primary hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                Send Reset Link
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
