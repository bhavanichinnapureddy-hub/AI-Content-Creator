import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export const PasswordInput = ({
  name,
  value,
  onChange,
  placeholder = 'Enter password',
  error = false,
  autoComplete = 'current-password',
  required = false
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type={visible ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B] ${
          error ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
        }`}
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
      >
        {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
};
