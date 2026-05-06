const KEYS = {
  DAILY_CLEARS: 'cs_daily_clears',
  RANDOM_CLEARS: 'cs_random_clears',
  DAILY_DATE: 'cs_daily_date',
  DAILY_COMPLETED: 'cs_daily_completed',
} as const;

function todayStr(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
}

export function getDailyClears(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(KEYS.DAILY_CLEARS) || '0', 10);
}

export function getRandomClears(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(KEYS.RANDOM_CLEARS) || '0', 10);
}

export function incrementDailyClears(): number {
  const n = getDailyClears() + 1;
  localStorage.setItem(KEYS.DAILY_CLEARS, String(n));
  localStorage.setItem(KEYS.DAILY_DATE, todayStr());
  localStorage.setItem(KEYS.DAILY_COMPLETED, 'true');
  return n;
}

export function incrementRandomClears(): number {
  const n = getRandomClears() + 1;
  localStorage.setItem(KEYS.RANDOM_CLEARS, String(n));
  return n;
}

export function isDailyCompleted(): boolean {
  if (typeof window === 'undefined') return false;
  const date = localStorage.getItem(KEYS.DAILY_DATE);
  const completed = localStorage.getItem(KEYS.DAILY_COMPLETED);
  return completed === 'true' && date === todayStr();
}
