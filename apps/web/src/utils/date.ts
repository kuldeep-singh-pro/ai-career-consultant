export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString();
};

export const getRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};
