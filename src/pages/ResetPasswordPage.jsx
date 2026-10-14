import React, { useMemo, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PublicNavbar } from '../components/PublicNavbar';
import { PasswordField } from '../components/PasswordField';
import { Lock, CheckCircle2, ArrowLeft, AlertCircle } from 'lucide-react';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { validateResetToken, completePasswordReset } = useAuth();
  const { addToast } = useToast();

  const token = searchParams.get('token') || '';
  const emailFromUrl = searchParams.get('email') || '';

  const tokenCheck = useMemo(
    () => validateResetToken(token, emailFromUrl),
    [token, emailFromUrl, validateResetToken]
  );

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!tokenCheck.valid) {
      newErrors.general = tokenCheck.error;
    }
    if (!newPassword) {
      newErrors.newPassword = 'New password is required.';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters.';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      completePasswordReset(token, newPassword);
      setSuccess(true);
      addToast('Password updated. You can now log in with the new password.', 'success');
    } catch (err) {
      setErrors({ general: err.message });
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const loginPath = tokenCheck.email?.includes('admin@') ? '/admin/login' : '/creator/login';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1724] text-slate-900 dark:text-white flex flex-col transition-colors duration-200">
      <PublicNavbar />

      <div className="flex-1 max-w-md w-full mx-auto px-4 py-16 flex flex-col justify-center">
        <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-[#006B4F]/10 dark:bg-emerald-950 flex items-center justify-center text-[#006B4F] dark:text-emerald-400 mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-[#102A43] dark:text-white text-center">
            Set New Password
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs text-center mt-1 mb-6">
            {emailFromUrl ? `Resetting password for ${emailFromUrl}` : 'Use the secure token from your reset email'}
          </p>

          {success ? (
            <div className="text-center space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs leading-relaxed text-left flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Password Reset Complete</strong>
                  Your password was updated. Sign in with the new password.
                </div>
              </div>

              <button
                onClick={() => navigate(loginPath)}
                className="w-full py-3 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                Proceed to Login
              </button>
            </div>
          ) : !tokenCheck.valid ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{tokenCheck.error || 'This reset link is invalid or has expired.'}</span>
              </div>
              <NavLink
                to="/forgot-password"
                className="block w-full py-3 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white font-semibold text-sm text-center"
              >
                Request a new reset link
              </NavLink>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-medium">
                  {errors.general}
                </div>
              )}

              <PasswordField
                name="newPassword"
                label="New Password *"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword) setErrors(prev => ({ ...prev, newPassword: '' }));
                }}
                placeholder="Min 6 characters"
                autoComplete="new-password"
                error={errors.newPassword}
              />

              <PasswordField
                name="confirmPassword"
                label="Confirm New Password *"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                }}
                placeholder="Repeat new password"
                autoComplete="new-password"
                error={errors.confirmPassword}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Updating Password...' : 'Save New Password'}
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700/80 text-center">
            <NavLink
              to="/creator/login"
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
