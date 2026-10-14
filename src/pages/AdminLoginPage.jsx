import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PublicNavbar } from '../components/PublicNavbar';
import { Shield, Lock, User, Eye, EyeOff } from 'lucide-react';
import { isValidEmail } from '../data/indianLocations';

export const AdminLoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const newErrors = {};
    const cleanId = identifier.trim();

    if (!cleanId) {
      newErrors.identifier = 'Admin Email or Username is required.';
    } else if (cleanId.includes('@') && !isValidEmail(cleanId)) {
      newErrors.identifier = 'Please provide a valid email address (e.g., name@gmail.com) or authorized admin username.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      login('admin', cleanId, password);
      addToast('Authorized Admin session initiated.', 'success');
      navigate('/admin/home');
    } catch (err) {
      addToast(err.message, 'error');
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8F9] dark:bg-[#001F26] text-slate-900 dark:text-white flex flex-col transition-colors duration-200">
      <PublicNavbar />

      <div className="flex-1 max-w-md w-full mx-auto px-4 py-12 flex flex-col justify-center">
        {/* Admin Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950/60 text-[#00796B] dark:text-[#48E5C2] border border-teal-300 dark:border-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield className="w-4 h-4 text-[#00796B] dark:text-[#48E5C2]" /> Platform Oversight
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#003B46] dark:text-white">
            Admin Sign In
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Restricted gateway for CreatorSphere AI platform administrators
          </p>
        </div>

        {/* Admin Login Card */}
        <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-3xl p-6 sm:p-8 shadow-xl">
          {errors.general && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm font-medium">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Admin Username or Email Address *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errors.identifier) setErrors(prev => ({ ...prev, identifier: '' }));
                  }}
                  placeholder="Enter your email (e.g., name@gmail.com)"
                  autoComplete="off"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                    errors.identifier ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
              </div>
              {errors.identifier && <p className="text-xs text-rose-500 mt-1">{errors.identifier}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Admin Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                    errors.password ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-[#00796B] hover:bg-[#005F54] text-white font-bold text-sm shadow-md shadow-teal-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? 'Verifying Credentials...' : 'Sign In to Admin Console'}
            </button>
          </form>

          {/* Bottom link to switch role */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/80 text-center">
            <NavLink
              to="/select-role"
              className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-[#00796B] dark:hover:text-[#48E5C2] transition-colors"
            >
              ← Choose a different portal (Creator or Customer)
            </NavLink>
          </div>
        </div>

      </div>
    </div>
  );
};
