import React from 'react';

/**
 * UserAvatar - Professional avatar component
 * - If user uploaded/provided explicit image URL, renders image with error fallback.
 * - Otherwise, renders clean, gender-neutral initials or neutral user icon.
 * - Never guesses or assigns male/female photos based on a user's name.
 */
export const UserAvatar = ({
  src,
  name = '',
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className = '',
  ring = true
}) => {
  const [imageError, setImageError] = React.useState(false);

  const getInitials = (fullName) => {
    if (!fullName || typeof fullName !== 'string') return '?';
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-bold',
    xl: 'w-24 h-24 text-2xl font-black'
  };

  const ringClass = ring ? 'ring-2 ring-[#006B4F] dark:ring-emerald-500/80' : '';
  const chosenSize = sizeClasses[size] || sizeClasses.md;

  // Render image if provided and didn't error out
  if (src && !imageError) {
    return (
      <img
        src={src}
        alt={name || 'User avatar'}
        onError={() => setImageError(true)}
        className={`${chosenSize} rounded-full object-cover shrink-0 ${ringClass} ${className}`}
      />
    );
  }

  // Fallback to neutral initials avatar
  const initials = getInitials(name);

  return (
    <div
      aria-label={name || 'User avatar'}
      className={`${chosenSize} rounded-full bg-slate-200 dark:bg-slate-800 text-[#102A43] dark:text-emerald-300 font-semibold flex items-center justify-center shrink-0 border border-slate-300 dark:border-slate-700 select-none ${ringClass} ${className}`}
    >
      <span>{initials}</span>
    </div>
  );
};
