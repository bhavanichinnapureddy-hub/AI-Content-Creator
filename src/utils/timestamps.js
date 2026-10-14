export const formatExactLocalTime = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return String(dateInput);
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

export const formatRelativeOrExactTime = (createdAt, fallbackTimestamp) => {
  if (!createdAt && !fallbackTimestamp) return '';
  const date = createdAt ? new Date(createdAt) : new Date(fallbackTimestamp);
  if (!Number.isNaN(date.getTime())) {
    const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diffSec >= 0 && diffSec < 60) {
      return 'Just now';
    }
    if (diffSec >= 60 && diffSec < 3600) {
      const mins = Math.floor(diffSec / 60);
      return `${mins}m ago`;
    }
    if (diffSec >= 3600 && diffSec < 86400) {
      const hours = Math.floor(diffSec / 3600);
      return `${hours}h ago`;
    }
    return formatExactLocalTime(date);
  }
  if (fallbackTimestamp && fallbackTimestamp !== 'Just now') {
    return fallbackTimestamp;
  }
  return fallbackTimestamp || '';
};

export const formatNotificationTime = (createdAt, storedTimestamp) => {
  return formatRelativeOrExactTime(createdAt, storedTimestamp);
};
