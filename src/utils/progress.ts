import { badges } from "../data/badges";

export interface SessionRecord {
  id: string;
  date: string;
  type: "daily" | "quiz" | "flashcards" | "practice" | "after-practice";
  score: number;
  categories: string[];
}

export interface LearningProgress {
  lastActiveDate: string | null;
  totalActiveDays: number;
  currentStreak: number;
  bestStreak: number;
  dailySessionsCompleted: number;
  quizCompleted: number;
  flashcardsKnown: number;
  averageScore: number;
  weakCategories: string[];
  strongCategories: string[];
  unlockedBadges: string[];
  learnedCommands: string[];
  moduleProgress: Record<string, number>;
  history: SessionRecord[];
}

const storageKey = "minhPhuongDrivingProgress";
const todayIso = () => new Date().toISOString().slice(0, 10);

export const defaultProgress: LearningProgress = {
  lastActiveDate: null,
  totalActiveDays: 0,
  currentStreak: 0,
  bestStreak: 0,
  dailySessionsCompleted: 0,
  quizCompleted: 0,
  flashcardsKnown: 0,
  averageScore: 0,
  weakCategories: [],
  strongCategories: [],
  unlockedBadges: [],
  learnedCommands: [],
  moduleProgress: {
    "Automatic car basics": 0,
    "French commands": 0,
    Roundabouts: 0,
    Priority: 0,
    Pedestrians: 0,
    "Blind spots": 0,
    Parking: 0,
    Vocabulary: 0,
  },
  history: [],
};

function safeParse(value: string | null): LearningProgress | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<LearningProgress>;
    return {
      ...defaultProgress,
      ...parsed,
      moduleProgress: { ...defaultProgress.moduleProgress, ...(parsed.moduleProgress ?? {}) },
      history: Array.isArray(parsed.history) ? parsed.history.slice(0, 12) as SessionRecord[] : [],
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
      learnedCommands: Array.isArray(parsed.learnedCommands) ? parsed.learnedCommands : [],
    };
  } catch {
    return null;
  }
}

export function getProgress(): LearningProgress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    return safeParse(window.localStorage.getItem(storageKey)) ?? defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: LearningProgress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch {
    // Progress is nice-to-have. The app must remain usable without storage.
  }
}

export function updateStreak(progress: LearningProgress, date = todayIso()): LearningProgress {
  if (progress.lastActiveDate === date) return progress;

  const previous = progress.lastActiveDate ? new Date(progress.lastActiveDate) : null;
  const current = new Date(date);
  const diffDays = previous ? Math.round((current.getTime() - previous.getTime()) / 86_400_000) : null;
  const currentStreak = diffDays === 1 ? progress.currentStreak + 1 : 1;

  return {
    ...progress,
    lastActiveDate: date,
    totalActiveDays: progress.totalActiveDays + 1,
    currentStreak,
    bestStreak: Math.max(progress.bestStreak, currentStreak),
  };
}

export function recalculateBadges(progress: LearningProgress): LearningProgress {
  const unlocked = new Set(progress.unlockedBadges);
  if (progress.dailySessionsCompleted >= 1) unlocked.add("first-lesson");
  if (progress.currentStreak >= 3) unlocked.add("streak-3");
  if (progress.currentStreak >= 7) unlocked.add("streak-7");
  if (progress.flashcardsKnown >= 30 || progress.learnedCommands.length >= 30) unlocked.add("words-30");
  if (progress.history.some((item) => item.categories.includes("Traffic lights"))) unlocked.add("traffic-light");
  if (progress.history.some((item) => item.categories.includes("Roundabouts"))) unlocked.add("roundabout");
  if (progress.history.some((item) => item.categories.includes("Blind spots"))) unlocked.add("blind-spot");
  if (progress.history.some((item) => item.categories.includes("Pedestrians"))) unlocked.add("pedestrian");
  if (progress.moduleProgress["Automatic car basics"] >= 30) unlocked.add("automatic");
  if (progress.history.some((item) => item.type === "practice" && item.score >= 70)) unlocked.add("maxime-commands");

  return { ...progress, unlockedBadges: badges.filter((badge) => unlocked.has(badge.id)).map((badge) => badge.id) };
}

export function recordSession(progress: LearningProgress, record: SessionRecord): LearningProgress {
  const history = [record, ...progress.history].slice(0, 12);
  const averageScore = Math.round(history.reduce((sum, item) => sum + item.score, 0) / history.length);
  const categoryScores = new Map<string, number[]>();
  history.forEach((item) => item.categories.forEach((category) => {
    categoryScores.set(category, [...(categoryScores.get(category) ?? []), item.score]);
  }));

  const ranked = Array.from(categoryScores.entries()).map(([category, scores]) => ({
    category,
    score: scores.reduce((sum, value) => sum + value, 0) / scores.length,
  }));

  return recalculateBadges({
    ...updateStreak(progress, record.date),
    averageScore,
    history,
    weakCategories: ranked.filter((item) => item.score < 70).map((item) => item.category).slice(0, 4),
    strongCategories: ranked.filter((item) => item.score >= 85).map((item) => item.category).slice(0, 4),
  });
}

export function resetProgress(): LearningProgress {
  saveProgress(defaultProgress);
  return defaultProgress;
}

export function progressPercent(progress: LearningProgress): number {
  return Math.min(100, Math.round(
    progress.dailySessionsCompleted * 6 +
    progress.quizCompleted * 3 +
    Math.min(progress.flashcardsKnown, 50) +
    progress.unlockedBadges.length * 4,
  ));
}
