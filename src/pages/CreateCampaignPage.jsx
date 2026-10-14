import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BackNavButton } from '../components/BackNavButton';
import { PlusCircle, Sparkles, DollarSign, Calendar, Layers } from 'lucide-react';

import { CAMPAIGN_CATEGORIES } from '../data/categories';

export const CreateCampaignPage = () => {
  const { createCampaign, currentUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: CAMPAIGN_CATEGORIES[0],
    platform: 'Instagram',
    budget: 1500,
    spotsAvailable: 3,
    deadline: '2026-12-01',
    description: '',
    deliverables: '1x 60s Reel, 2x Stories with direct product sticker link',
    requirements: 'Minimum 20k followers with >3.5% organic engagement rate',
    tags: 'Creator, BrandDeal, Sponsored'
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const categories = CAMPAIGN_CATEGORIES;

  const platforms = ['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'Twitter / X', 'Multi-Platform'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Campaign title is required';
    if (!formData.description.trim()) newErrors.description = 'Campaign description is required';
    if (!formData.budget || formData.budget <= 0) newErrors.budget = 'Please enter a valid budget';
    if (!formData.deadline) newErrors.deadline = 'Submission deadline is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      const created = createCampaign(formData);
      addToast(`Campaign "${created.title}" successfully published!`, 'success');
      navigate('/my-campaigns');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="space-y-4">
        <BackNavButton label="Back" fallbackPath="/customer/dashboard" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white">
            Create New Brand Campaign
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Publish a project brief to receive applications from verified content creators.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#102A43] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Campaign Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Wireless Noise-Cancelling Headphones Launch 2026"
              className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F] ${
                errors.title ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Content Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Target Platform *
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
              >
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Total Budget ($) *
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F] ${
                  errors.budget ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.budget && <p className="text-xs text-rose-500 mt-1">{errors.budget}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Open Spots
              </label>
              <input
                type="number"
                name="spotsAvailable"
                value={formData.spotsAvailable}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Submission Deadline *
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Campaign Description / Objective *
            </label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Outline your product benefits, campaign themes, and key talking points..."
              className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F] ${
                errors.description ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Deliverables Specification
            </label>
            <input
              type="text"
              name="deliverables"
              value={formData.deliverables}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Creator Requirements & Guidelines
            </label>
            <input
              type="text"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-[#006B4F] hover:bg-[#00563f] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              {submitting ? 'Publishing...' : 'Publish Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
