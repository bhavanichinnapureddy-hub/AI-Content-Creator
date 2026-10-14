import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export const PasswordField = ({
  id,
  name,
  value,
  onChange,
  placeholder = 'Enter password',
  error,
  label,
  autoComplete = 'current-password',
  className = ''
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id || name} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          id={id || name}
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
            error ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
};
