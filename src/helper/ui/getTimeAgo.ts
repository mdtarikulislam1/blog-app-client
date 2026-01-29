export const getTimeAgo = (dateString: string) => {
  const now = new Date();
  const target = new Date(dateString);
  const diffMs = now.getTime() - target.getTime(); // difference in milliseconds

  const mins = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (mins < 60) return `${mins} Minute${mins > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} H ago`;
  if (days < 30) return `${days} D ago`;
  if (months < 12) return `${months} Mo ago`;
  return `${years} Y ago`;
};
