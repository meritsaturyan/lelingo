"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Level, UserProgress, WordStatus } from "./types";
import { todayKey } from "./utils";

const STORAGE_KEY = "le-lingo-progress-v1";

const defaultProgress: UserProgress = {
  onboardingComplete: false,
  level: null,
  learningGoal: null,
  name: "Ալեքս",
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  completedDays: [],
  weeklyCompleted: {},
  vocabStatus: {},
  skillProgress: {
    grammar: 20,
    vocabulary: 25,
    listening: 15,
    speaking: 10,
    dictation: 18,
  },
  dailyXp: 0,
  lessonsCompletedToday: 0,
  vocabLearnedToday: 0,
  weeklyTestScores: [],
  dictationHistory: [],
  speakingHistory: [],
};

function loadProgress(): UserProgress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

function saveProgress(p: UserProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

type Store = {
  progress: UserProgress;
  hydrated: boolean;
  completeOnboarding: (level: Level, name?: string, goal?: UserProgress["learningGoal"]) => void;
  setLevel: (level: Level) => void;
  addXp: (amount: number) => void;
  markDayComplete: (day: string) => void;
  setVocabStatus: (id: string, status: WordStatus) => void;
  updateSkill: (skill: keyof UserProgress["skillProgress"], delta: number) => void;
  recordPlacement: (result: NonNullable<UserProgress["placementResult"]>) => void;
  recordWeeklyTest: (score: number, xp: number) => void;
  recordDictation: (score: number) => void;
  recordSpeaking: (score: number) => void;
  touchActivity: () => void;
  resetAll: () => void;
};

const ProgressContext = createContext<Store | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadProgress();
    const today = todayKey();
    if (loaded.lastActiveDate && loaded.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yKey = yesterday.toISOString().slice(0, 10);
      if (loaded.lastActiveDate === yKey) {
        // streak continues when they open today - don't increment until activity
      } else if (loaded.lastActiveDate < yKey) {
        loaded.streak = 0;
      }
      loaded.dailyXp = 0;
      loaded.lessonsCompletedToday = 0;
      loaded.vocabLearnedToday = 0;
    }
    setProgress(loaded);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveProgress(progress);
  }, [progress, hydrated]);

  const touchActivity = useCallback(() => {
    setProgress((prev) => {
      const today = todayKey();
      if (prev.lastActiveDate === today) return prev;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yKey = yesterday.toISOString().slice(0, 10);
      const newStreak =
        prev.lastActiveDate === yKey ? prev.streak + 1 : prev.streak === 0 ? 1 : 1;
      return {
        ...prev,
        lastActiveDate: today,
        streak: Math.max(newStreak, prev.lastActiveDate === today ? prev.streak : newStreak),
        dailyXp: prev.lastActiveDate === today ? prev.dailyXp : 0,
        lessonsCompletedToday:
          prev.lastActiveDate === today ? prev.lessonsCompletedToday : 0,
        vocabLearnedToday: prev.lastActiveDate === today ? prev.vocabLearnedToday : 0,
      };
    });
  }, []);

  const completeOnboarding = useCallback(
    (level: Level, name?: string, goal?: UserProgress["learningGoal"]) => {
      setProgress((prev) => ({
        ...prev,
        onboardingComplete: true,
        level,
        learningGoal: goal ?? prev.learningGoal ?? null,
        name: name || prev.name,
        lastActiveDate: todayKey(),
        streak: 1,
      }));
    },
    []
  );

  const setLevel = useCallback((level: Level) => {
    setProgress((prev) => ({ ...prev, level }));
  }, []);

  const addXp = useCallback((amount: number) => {
    setProgress((prev) => {
      const today = todayKey();
      const isNewDay = prev.lastActiveDate !== today;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yKey = yesterday.toISOString().slice(0, 10);
      let streak = prev.streak;
      if (isNewDay) {
        streak = prev.lastActiveDate === yKey ? prev.streak + 1 : 1;
      }
      return {
        ...prev,
        xp: prev.xp + amount,
        dailyXp: isNewDay ? amount : prev.dailyXp + amount,
        lastActiveDate: today,
        streak,
      };
    });
  }, []);

  const markDayComplete = useCallback((day: string) => {
    setProgress((prev) => {
      const key = `${prev.level}-${day}`;
      if (prev.weeklyCompleted[key]) {
        return {
          ...prev,
          lessonsCompletedToday: prev.lessonsCompletedToday,
        };
      }
      return {
        ...prev,
        weeklyCompleted: { ...prev.weeklyCompleted, [key]: true },
        completedDays: prev.completedDays.includes(todayKey())
          ? prev.completedDays
          : [...prev.completedDays, todayKey()],
        lessonsCompletedToday: prev.lessonsCompletedToday + 1,
      };
    });
  }, []);

  const setVocabStatus = useCallback((id: string, status: WordStatus) => {
    setProgress((prev) => {
      const prevStatus = prev.vocabStatus[id];
      const learnedNew = status === "learned" && prevStatus !== "learned";
      return {
        ...prev,
        vocabStatus: { ...prev.vocabStatus, [id]: status },
        vocabLearnedToday: learnedNew
          ? prev.vocabLearnedToday + 1
          : prev.vocabLearnedToday,
        skillProgress: {
          ...prev.skillProgress,
          vocabulary: learnedNew
            ? Math.min(100, prev.skillProgress.vocabulary + 1)
            : prev.skillProgress.vocabulary,
        },
      };
    });
  }, []);

  const updateSkill = useCallback(
    (skill: keyof UserProgress["skillProgress"], delta: number) => {
      setProgress((prev) => ({
        ...prev,
        skillProgress: {
          ...prev.skillProgress,
          [skill]: Math.min(100, Math.max(0, prev.skillProgress[skill] + delta)),
        },
      }));
    },
    []
  );

  const recordPlacement = useCallback(
    (result: NonNullable<UserProgress["placementResult"]>) => {
      setProgress((prev) => ({
        ...prev,
        placementResult: result,
        level: result.level,
        onboardingComplete: true,
        streak: prev.streak || 1,
        lastActiveDate: todayKey(),
      }));
    },
    []
  );

  const recordWeeklyTest = useCallback((score: number, xp: number) => {
    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + xp,
      dailyXp: prev.dailyXp + xp,
      weeklyTestScores: [
        ...prev.weeklyTestScores,
        { date: todayKey(), score, xp },
      ],
      weeklyCompleted: {
        ...prev.weeklyCompleted,
        [`${prev.level}-sunday`]: true,
      },
      skillProgress: {
        ...prev.skillProgress,
        grammar: Math.min(100, prev.skillProgress.grammar + 2),
        vocabulary: Math.min(100, prev.skillProgress.vocabulary + 2),
      },
    }));
  }, []);

  const recordDictation = useCallback((score: number) => {
    setProgress((prev) => ({
      ...prev,
      dictationHistory: [...prev.dictationHistory, { date: todayKey(), score }],
      skillProgress: {
        ...prev.skillProgress,
        dictation: Math.min(
          100,
          prev.skillProgress.dictation + Math.round(score / 5)
        ),
      },
    }));
  }, []);

  const recordSpeaking = useCallback((score: number) => {
    setProgress((prev) => ({
      ...prev,
      speakingHistory: [...prev.speakingHistory, { date: todayKey(), score }],
      skillProgress: {
        ...prev.skillProgress,
        speaking: Math.min(
          100,
          prev.skillProgress.speaking + Math.round(score / 20)
        ),
      },
    }));
  }, []);

  const resetAll = useCallback(() => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      progress,
      hydrated,
      completeOnboarding,
      setLevel,
      addXp,
      markDayComplete,
      setVocabStatus,
      updateSkill,
      recordPlacement,
      recordWeeklyTest,
      recordDictation,
      recordSpeaking,
      touchActivity,
      resetAll,
    }),
    [
      progress,
      hydrated,
      completeOnboarding,
      setLevel,
      addXp,
      markDayComplete,
      setVocabStatus,
      updateSkill,
      recordPlacement,
      recordWeeklyTest,
      recordDictation,
      recordSpeaking,
      touchActivity,
      resetAll,
    ]
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
