
export const LEVELS = [
  { level: 1, title: 'HTML Apprentice', minXP: 0 },
  { level: 2, title: 'CSS Adept', minXP: 100 },
  { level: 3, title: 'JS Scholar', minXP: 200 },
  { level: 4, title: 'React Master', minXP: 300 },
  { level: 5, title: 'Royal Architect', minXP: 400 },
  { level: 6, title: 'Imperial Grandmaster', minXP: 500 },
];

export function calculateLevel(xp) {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXP) current = lvl;
  }
  return current;
}

export function calculateLevelProgress(xp) {
  const current = calculateLevel(xp);
  const idx = LEVELS.findIndex((l) => l.level === current.level);
  const next = LEVELS[idx + 1] || null;

  if (!next) {
    return { current, next: null, xpIntoLevel: xp - current.minXP, xpForNextLevel: 0, percent: 100 };
  }

  const xpIntoLevel = xp - current.minXP;
  const xpForNextLevel = next.minXP - current.minXP;
  const percent = Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100));

  return { current, next, xpIntoLevel, xpForNextLevel, percent };
}
