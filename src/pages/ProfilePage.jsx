import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UserAvatar } from '../components/UserAvatar';
import { BackNavButton } from '../components/BackNavButton';
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Save,
  CheckCircle2,
  Camera,
  Sparkles
} from 'lucide-react';
import { INDIAN_LOCATIONS, isValidEmail, isAuthorizedAdminEmail } from '../data/indianLocations';

export const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatar || '');

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    bio: currentUser?.bio || '',
    location: currentUser?.location || INDIAN_LOCATIONS[0],
    companyName: currentUser?.companyName || '',
    category: currentUser?.category || 'Technology',
    platform: currentUser?.platform || 'Instagram',
    ratePerPost: currentUser?.ratePerPost || 500,
    availability: currentUser?.availability || 'Available for collaboration deals'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('Please choose an image under 5MB.', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        setAvatarPreview(base64);
        updateProfile({ avatar: base64 });
        addToast('Profile photo updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(formData.email) && !isAuthorizedAdminEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@gmail.com).';
    }

    if (formData.phone && formData.phone.trim()) {
      const cleanPhone = formData.phone.trim();
      if (!/^\+?[0-9]{10,14}$/.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid mobile number (10 to 14 digits only, no alphabets or invalid symbols).';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast('Please correct the highlighted form errors.', 'error');
      return;
    }

    updateProfile(formData);
    addToast('Profile changes saved successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <BackNavButton fallbackPath={currentUser ? `/${currentUser.role}/home` : '/'} label="Back" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003B46] dark:text-white">
            My Account Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your personal profile, credentials, contact information, and avatar.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Profile Avatar & Top Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="relative group">
            <UserAvatar
              src={avatarPreview || currentUser?.avatar}
              name={formData.name || currentUser?.name}
              size="xl"
              className="ring-4 ring-[#00796B]"
            />
            {/* Hidden File Picker */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoSelect}
              accept="image/*"
              className="hidden"
            />
            {/* Edit Photo Trigger Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 p-2 rounded-full bg-[#00796B] hover:bg-[#005F54] text-white shadow-md border-2 border-white dark:border-[#003B46] transition-all cursor-pointer flex items-center justify-center group-hover:scale-110"
              title="Edit Profile Photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-xl sm:text-2xl font-bold text-[#003B46] dark:text-white">
                {formData.name || currentUser?.name || 'Account Member'}
              </h2>
              {currentUser?.verified && (
                <CheckCircle2 className="w-5 h-5 text-[#00796B] dark:text-[#48E5C2]" />
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Account Role: <strong className="capitalize text-[#00796B] dark:text-[#48E5C2]">{currentUser?.role === 'customer' ? 'Brand Client' : currentUser?.role}</strong>
            </p>
            <div className="mt-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-[#00796B]" />
                <span>Upload New Photo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="pt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                  errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
                required
              />
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email (e.g., name@gmail.com)"
                className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                  errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
                required
              />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+919876543210"
                className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
                  errors.phone ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Location (India Only) *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00796B]"
              >
                {INDIAN_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {currentUser?.role === 'customer' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Company / Organization Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00796B]"
              />
            </div>
          )}

          {currentUser?.role === 'creator' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Primary Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                >
                  {[
                    'Technology',
                    'Food',
                    'Education',
                    'Gaming',
                    'Fashion & Design',
                    'Travel',
                    'Fitness',
                    'Beauty',
                    'Lifestyle',
                    'Entertainment',
                    'Healthcare',
                    'Business'
                  ].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Base Rate ($/post)
                </label>
                <input
                  type="number"
                  name="ratePerPost"
                  value={formData.ratePerPost}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Availability Notice
                </label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Public Bio & Professional Introduction
            </label>
            <textarea
              rows="3"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00796B]"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#00796B] hover:bg-[#005F54] text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-950/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
