import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PublicNavbar } from '../components/PublicNavbar';
import { Briefcase, Eye, EyeOff, Lock, Mail, Phone, User, Building, MapPin } from 'lucide-react';
import { INDIAN_LOCATIONS, isValidEmail } from '../data/indianLocations';

export const CustomerAuthPage = ({ isSignUp = false }) => {
  const [isRegister, setIsRegister] = useState(isSignUp);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    businessCategory: 'Brand Marketing',
    location: INDIAN_LOCATIONS[0],
    password: '',
    confirmPassword: ''
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

  const { login, registerCustomer } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

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
      newErrors.name = 'Contact representative name is required.';
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

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company / Brand name is required.';
    }

    if (!formData.location) {
      newErrors.location = 'Please select your Indian headquarters or city.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setLoading(true);
    try {
      registerCustomer(formData);
      addToast('Brand account created successfully! Welcome to CreatorSphere AI.', 'success');
      login('customer', formData.email, formData.password);
      navigate('/customer/home');
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
      login('customer', cleanId, loginPassword);
      addToast('Signed in to Brand Portal.', 'success');
      navigate('/customer/home');
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-[#00796B] dark:text-[#48E5C2] border border-cyan-300 dark:border-cyan-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-4 h-4 text-[#00796B] dark:text-[#48E5C2]" /> Brand Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#003B46] dark:text-white">
            {isRegister ? 'Create Account' : 'Sign In'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            {isRegister
              ? 'Join CreatorSphere AI to hire verified creators and launch high-impact campaigns'
              : 'Sign in to manage your active campaigns, proposals, and hired creators'}
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
                  Representative Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Sarah Jenkins"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                      errors.name ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Company / Brand Name *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Luminary Audio Co."
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                      errors.companyName ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                </div>
                {errors.companyName && <p className="text-xs text-rose-500 mt-1">{errors.companyName}</p>}
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
                    Industry Sector *
                  </label>
                  <select
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                  >
                    <option value="Consumer Tech">Consumer Tech</option>
                    <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Education & EdTech">Education & EdTech</option>
                    <option value="Gaming & Esports">Gaming & Esports</option>
                    <option value="Finance & SaaS">Finance & SaaS</option>
                  </select>
                </div>
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
                {loading ? 'Creating Account...' : 'Complete Brand Registration'}
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
                <label htmlFor="customer-login-identifier" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Email Address or Mobile Number *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="customer-login-identifier"
                    name="customer_identifier"
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
                <label htmlFor="customer-login-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="customer-login-password"
                    name="customer_secret"
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
                    state={{ role: 'customer' }}
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
              ← Choose a different role (Admin or Creator)
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
