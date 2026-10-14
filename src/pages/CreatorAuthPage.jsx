import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PublicNavbar } from '../components/PublicNavbar';
import { Sparkles, Mail, Phone, User, MapPin, Lock, Eye, EyeOff } from 'lucide-react';
import { INDIAN_LOCATIONS, isValidEmail } from '../data/indianLocations';
import { PasswordField } from '../components/PasswordField';
import { sanitizePhoneInput } from '../utils/validation';
import { CAMPAIGN_CATEGORIES } from '../data/categories';

export const CreatorAuthPage = ({ isSignUp = false }) => {
  const [isRegister, setIsRegister] = useState(isSignUp);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    category: 'Technology',
    platform: 'Instagram',
    languages: 'English',
    location: INDIAN_LOCATIONS[0]
  });

  // Always empty initial value for login
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Clear fields on mount and when toggling between register and login
  useEffect(() => {
    setLoginIdentifier('');
    setLoginPassword('');
    setShowPassword(false);
    setErrors({});
  }, [isRegister]);

  const { login, registerCreator } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const categories = CAMPAIGN_CATEGORIES;

  const platforms = ['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'Twitter / X'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name cannot be empty.';
    }

    const cleanPhone = formData.phone.trim();
    if (!cleanPhone) {
      newErrors.phone = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    const cleanEmail = formData.email.trim();
    if (!cleanEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@gmail.com).';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.location) {
      newErrors.location = 'Please select your Indian state or city.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setLoading(true);
    try {
      registerCreator(formData);
      addToast('Registration successful! Welcome to CreatorSphere AI Creator Suite.', 'success');
      login('creator', formData.email, formData.password);
      navigate('/creator/home');
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error');
      setErrors(prev => ({ ...prev, general: err.message }));
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const loginErrors = {};
    const cleanId = loginIdentifier.trim();

    if (!cleanId) {
      loginErrors.loginIdentifier = 'Please enter your registered email address or mobile number.';
    } else if (cleanId.includes('@') && !isValidEmail(cleanId)) {
      loginErrors.loginIdentifier = 'Please enter a valid email address (e.g., name@gmail.com).';
    }

    if (!loginPassword) {
      loginErrors.loginPassword = 'Password is required.';
    }

    if (Object.keys(loginErrors).length > 0) {
      setErrors(loginErrors);
      return;
    }

    setLoading(true);
    try {
      login('creator', cleanId, loginPassword);
      addToast('Signed in to Creator Suite.', 'success');
      navigate('/creator/home');
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8F9] dark:bg-[#001F26] text-slate-900 dark:text-white flex flex-col transition-colors duration-200">
      <PublicNavbar />

      <div className="flex-1 max-w-xl w-full mx-auto px-4 py-12 flex flex-col justify-center">
        {/* Header Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950/60 text-[#00796B] dark:text-[#48E5C2] border border-teal-300 dark:border-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-[#00796B] dark:text-[#48E5C2]" /> Creator Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#003B46] dark:text-white">
            {isRegister ? 'Create Account' : 'Sign In'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            {isRegister
              ? 'Join CreatorSphere AI to connect with verified brands and monetize your influence'
              : 'Sign in to access your portfolio, campaign briefs, and brand deals'}
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-3xl p-6 sm:p-8 shadow-xl">
          {errors.general && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm font-medium">
              {errors.general}
            </div>
          )}

          {/* Registration Form */}
          {isRegister ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Jordan Hayes"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                      errors.name ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Mobile Number (India) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                        errors.phone ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email (e.g., name@gmail.com)"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                        errors.email ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Location (India Only) *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                    >
                      {INDIAN_LOCATIONS.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Primary Platform *
                  </label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                  >
                    {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Content Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                        errors.password ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                        errors.confirmPassword ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-rose-500 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 rounded-xl bg-[#00796B] hover:bg-[#005F54] text-white font-bold text-sm shadow-md shadow-teal-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Creating Account...' : 'Complete Creator Registration'}
              </button>

              <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegister(false); setErrors({}); }}
                  className="font-bold text-[#00796B] dark:text-[#48E5C2] hover:underline cursor-pointer ml-1"
                >
                  Sign In
                </button>
              </div>
            </form>
          ) : (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4" autoComplete="off">
              <div>
                <label htmlFor="creator-login-identifier" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Email Address or Mobile Number *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="creator-login-identifier"
                    name="creator_identifier"
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => {
                      setLoginIdentifier(e.target.value);
                      if (errors.loginIdentifier) setErrors(prev => ({ ...prev, loginIdentifier: '' }));
                    }}
                    placeholder="@gmail.com"
                    autoComplete="off"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                      errors.loginIdentifier ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                </div>
                {errors.loginIdentifier && <p className="text-xs text-rose-500 mt-1">{errors.loginIdentifier}</p>}
              </div>

              <div>
                <label htmlFor="creator-login-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="creator-login-password"
                    name="creator_secret"
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (errors.loginPassword) setErrors(prev => ({ ...prev, loginPassword: '' }));
                    }}
                    placeholder="password"
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                      errors.loginPassword ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
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
                {errors.loginPassword && <p className="text-xs text-rose-500 mt-1">{errors.loginPassword}</p>}
                <div className="flex justify-end mt-1.5">
                  <NavLink
                    to="/forgot-password"
                    state={{ role: 'creator' }}
                    className="text-xs text-[#00796B] dark:text-[#48E5C2] hover:underline font-medium"
                  >
                    Forgot Password?
                  </NavLink>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 rounded-xl bg-[#00796B] hover:bg-[#005F54] text-white font-bold text-sm shadow-md shadow-teal-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>

              <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegister(true); setErrors({}); }}
                  className="font-bold text-[#00796B] dark:text-[#48E5C2] hover:underline cursor-pointer ml-1"
                >
                  Create Account
                </button>
              </div>
            </form>
          )}

          {/* Bottom link to switch role */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/80 text-center">
            <NavLink
              to="/select-role"
              className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-[#00796B] dark:hover:text-[#48E5C2] transition-colors"
            >
              ← Choose a different role (Admin or Customer)
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
