/** Background and text Tailwind classes for job initial avatars (stable per title). */
const AVATAR_PALETTE = [
  { bg: 'bg-blue-100', text: 'text-blue-700' },
  { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  { bg: 'bg-violet-100', text: 'text-violet-700' },
  { bg: 'bg-purple-100', text: 'text-purple-700' },
  { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700' },
  { bg: 'bg-pink-100', text: 'text-pink-700' },
  { bg: 'bg-rose-100', text: 'text-rose-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-teal-100', text: 'text-teal-700' },
  { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  { bg: 'bg-sky-100', text: 'text-sky-700' },
] as const;

export function getJobAvatarStyle(title: string): (typeof AVATAR_PALETTE)[number] {
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash += title.charCodeAt(i);
  const index = Math.abs(hash) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

/** First letter of job title (or company fallback) for display. */
export function getJobTitleInitial(title: string, company: string): string {
  const trimmed = (title || '').trim();
  const first = trimmed.charAt(0);
  if (/[a-zA-Z0-9]/.test(first)) return first.toUpperCase();
  if (company) return company.charAt(0).toUpperCase();
  return 'J';
}
