import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BackNavButton } from '../components/BackNavButton';
import {
  Briefcase,
  Plus,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Sparkles
} from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';

const SAMPLE_URLS = [
  { label: 'Minimalist Studio Desk', url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80' },
  { label: 'Wireless Audio Review', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' },
  { label: 'Ergonomic Setup', url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80' }
];

export const PortfolioPage = () => {
  const { currentUser, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [portfolio, setPortfolio] = useState(currentUser?.portfolio || []);
  const [failedImages, setFailedImages] = useState({});

  const [newItem, setNewItem] = useState({
    title: '',
    media: '',
    likes: '1.8K'
  });

  const [previewStatus, setPreviewStatus] = useState('idle'); // 'idle' | 'loading' | 'valid' | 'error'
  const [previewError, setPreviewError] = useState('');

  useEffect(() => {
    const trimmed = newItem.media.trim();
    if (!trimmed) {
      setPreviewStatus('idle');
      setPreviewError('');
      return;
    }

    try {
      const url = new URL(trimmed);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        setPreviewStatus('error');
        setPreviewError('URL must begin with http:// or https://');
        return;
      }
    } catch {
      setPreviewStatus('error');
      setPreviewError('Please enter a well-formed web URL');
      return;
    }

    setPreviewStatus('loading');
    setPreviewError('');

    const img = new Image();
    img.src = trimmed;
    let didCancel = false;

    img.onload = () => {
      if (!didCancel) {
        setPreviewStatus('valid');
        setPreviewError('');
      }
    };

    img.onerror = () => {
      if (!didCancel) {
        setPreviewStatus('error');
        setPreviewError('Unable to load image. Check the URL or ensure the host permits direct embedding.');
      }
    };

    return () => {
      didCancel = true;
    };
  }, [newItem.media]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.title.trim() || !newItem.media.trim()) {
      addToast('Please enter both sample title and image URL', 'warning');
      return;
    }

    if (!newItem.media.startsWith('http://') && !newItem.media.startsWith('https://')) {
      addToast('Please enter a valid web URL starting with http:// or https://', 'warning');
      return;
    }

    if (previewStatus === 'error') {
      addToast('The entered image URL could not be loaded. Please check the URL.', 'error');
      return;
    }

    const updated = [
      {
        id: `p-${Date.now()}`,
        title: newItem.title.trim(),
        media: newItem.media.trim(),
        likes: newItem.likes || '1.5K',
        type: 'image',
        link: '#'
      },
      ...portfolio
    ];

    setPortfolio(updated);
    updateProfile({ portfolio: updated });
    setNewItem({ title: '', media: '', likes: '2.1K' });
    setPreviewStatus('idle');
    addToast('Portfolio sample successfully added and saved!', 'success');
  };

  const handleDelete = (id) => {
    const updated = portfolio.filter(p => p.id !== id);
    setPortfolio(updated);
    updateProfile({ portfolio: updated });
    addToast('Portfolio sample removed.', 'info');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center gap-3">
        <BackNavButton fallbackPath="/creator/home" label="Back" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003B46] dark:text-white">
            My Creative Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Upload and preview your photography, sponsored deliverables, and visual showcases for brand partners.
          </p>
        </div>
      </div>

      {/* Add New Item Form with Live Preview */}
      <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#003B46] dark:text-white mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#00796B] dark:text-[#48E5C2]" />
          Add Portfolio Project
        </h3>

        <form onSubmit={handleAddItem} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="e.g. 4K Drone Cinematic Reel in Himachal"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Image URL (Direct Web Link) *
                </label>
                <input
                  type="url"
                  value={newItem.media}
                  onChange={(e) => setNewItem({ ...newItem, media: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                  required
                />
              </div>

              {/* Quick Sample Presets */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1 font-semibold uppercase tracking-wider">
                  Or Test With Verified Samples:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_URLS.map(sample => (
                    <button
                      key={sample.label}
                      type="button"
                      onClick={() => {
                        setNewItem(prev => ({
                          ...prev,
                          title: prev.title || sample.label,
                          media: sample.url
                        }));
                      }}
                      className="px-2.5 py-1 text-xs rounded-lg border border-teal-200 dark:border-teal-900 bg-teal-50 dark:bg-teal-950/40 text-[#00796B] dark:text-[#48E5C2] hover:bg-teal-100 cursor-pointer"
                    >
                      + {sample.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={previewStatus === 'error' || previewStatus === 'loading'}
                className="w-full py-3 rounded-xl bg-[#00796B] hover:bg-[#005F54] text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-950/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Save Project to Portfolio
              </button>
            </div>

            {/* Live Image Preview Box */}
            <div className="flex flex-col justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-700 min-h-[220px]">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" /> Live Preview
                  </span>
                  {previewStatus === 'valid' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> URL Verified
                    </span>
                  )}
                  {previewStatus === 'error' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                      <AlertCircle className="w-3.5 h-3.5" /> Image Failed to Load
                    </span>
                  )}
                </div>

                <div className="h-44 w-full rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center relative">
                  {previewStatus === 'valid' ? (
                    <img
                      src={newItem.media}
                      alt="Preview"
                      className="w-full h-full object-cover animate-fade-in"
                    />
                  ) : previewStatus === 'loading' ? (
                    <div className="text-center space-y-2 text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#00796B]" />
                      <p className="text-xs">Validating image URL...</p>
                    </div>
                  ) : (
                    <div className="text-center p-4 text-slate-400 space-y-1">
                      <ImageIcon className="w-8 h-8 mx-auto opacity-50" />
                      <p className="text-xs">Enter or paste an image URL to see live preview</p>
                    </div>
                  )}
              </div>

              {previewError && (
                <p className="text-xs text-rose-500 mt-2 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {previewError}
                </p>
              )}

              {newItem.title && (
                <p className="text-xs font-bold text-[#003B46] dark:text-white mt-2 truncate">
                  Preview Title: {newItem.title}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>

      {/* Grid of Saved Portfolio Samples */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#003B46] dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00796B] dark:text-[#48E5C2]" />
            Showcase Collection ({portfolio.length} Projects)
          </h2>
        </div>

        {portfolio.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all"
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {failedImages[item.id] ? (
                    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-slate-800 text-slate-500 text-center">
                      <AlertCircle className="w-8 h-8 text-amber-500 mb-2 shrink-0" />
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Image Inaccessible</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">Host blocked hotlinking or URL is unreachable</p>
                      <a
                        href={item.media}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-[11px] font-semibold text-[#00796B] dark:text-[#48E5C2] inline-flex items-center gap-1 hover:underline"
                      >
                        <span>Open Source URL</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ) : (
                    <>
                      <img
                        src={item.media}
                        alt={item.title}
                        onError={() => {
                          setFailedImages(prev => ({ ...prev, [item.id]: true }));
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20">
                        {item.likes || '1.8K'} engagement
                      </span>
                    </>
                  )}
                </div>

                <div className="p-4 flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-[#003B46] dark:text-white truncate">
                    {item.title}
                  </h4>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer shrink-0"
                    title="Remove Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-3xl p-12 text-center space-y-3">
            <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-[#003B46] dark:text-white">
              No portfolio projects added yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Use the form above to add your sample photography, sponsored clips, or design showcases to attract brand deals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
