export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim().toLowerCase();
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(clean);
};

export const isValidGmail = (email) => {
  return isValidEmail(email);
};

export const isAuthorizedAdminEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim().toLowerCase();
  return (
    isValidEmail(clean) ||
    clean === 'admin' ||
    clean === 'admin@creatorsphere.ai'
  );
};

export const sanitizePhoneInput = (value, maxLength = 14) => {
  if (!value) return '';
  return String(value).replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '').slice(0, maxLength);
};

export const isValidPhone = (value) => {
  const clean = (value || '').trim();
  if (!clean) return false;
  return /^\+?\d{10,14}$/.test(clean);
};

export const formatStoredTimestamp = (item) => {
  if (!item) return '';
  if (item.timestamp && item.timestamp !== 'Just now') {
    return item.timestamp;
  }
  const source = item.createdAt || item.timestamp;
  if (!source) return '';
  const date = new Date(source);
  if (Number.isNaN(date.getTime())) {
    return String(source);
  }
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const formatExactTime = (dateInput = new Date()) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};
