import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PublicNavbar } from '../components/PublicNavbar';
import { KeyRound, Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { isValidEmail, isAuthorizedAdminEmail } from '../utils/validation';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { addToast } = useToast();
  const { requestPasswordReset } = useAuth();

  const role = location.state?.role || 'creator';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError('Please enter your registered email address.');
      return;
    }

    if (role === 'admin') {
      if (!isAuthorizedAdminEmail(cleanEmail) && cleanEmail.toLowerCase() !== 'admin@creatorsphere.ai') {
        setError('Enter the registered admin email address.');
        return;
      }
    } else if (!isValidEmail(cleanEmail)) {
      setError('Please enter a valid email address (e.g., name@gmail.com).');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const outcome = await requestPasswordReset(cleanEmail);
      setResult(outcome);
      setSubmitted(true);
      addToast(outcome.delivered ? 'Reset email sent.' : outcome.message, outcome.delivered ? 'success' : 'info');
    } catch (err) {
      setError(err.message);
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1724] text-slate-900 dark:text-white flex flex-col transition-colors duration-200">
      <PublicNavbar />

      <div className="flex-1 max-w-md w-full mx-auto px-4 py-16 flex flex-col justify-center">
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-[#006B4F]/10 dark:bg-emerald-950 flex items-center justify-center text-[#006B4F] dark:text-emerald-400 mx-auto mb-4">
            <KeyRound className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-[#102A43] dark:text-white text-center">
            Forgot Password?
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs text-center mt-1 mb-6">
            Enter your registered email to receive a secure, time-limited reset link.
          </p>

          {submitted && result ? (
            <div className="text-center space-y-4">
              <div className={`p-4 rounded-xl border text-xs leading-relaxed text-left ${
                result.delivered
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}>
                <div className="flex items-center gap-2 font-semibold mb-1">
                  {result.delivered ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {result.delivered ? 'Email sent' : 'Reset link created'}
                </div>
                <p>{result.message}</p>
              </div>

              {!result.delivered && result.resetLink && (
                <a
                  href={result.resetLink}
                  className="block w-full py-3 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white font-semibold text-sm shadow-md transition-all text-center"
                >
                  Open secure reset link
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setResult(null);
                }}
                className="text-xs text-slate-500 dark:text-slate-400 hover:underline"
              >
                Enter a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Registered Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email (e.g., name@gmail.com)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Sending Request...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700/80 text-center">
            <NavLink
              to={`/${role}/login`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-[#006B4F] dark:hover:text-emerald-400"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
