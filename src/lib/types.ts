export type Level = "A1" | "A2" | "B1" | "B2";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type LessonType =
  | "vocabulary"
  | "grammar"
  | "conversation"
  | "listening"
  | "dictation"
  | "speaking"
  | "weekly-test"
  | "alphabet"
  | "combinations"
  | "reading";

export type LearningGoal =
  | "travel"
  | "business"
  | "study"
  | "culture"
  | "relocation"
  | "other";

export type WordStatus = "new" | "learned" | "difficult" | "favorite";

export type ExerciseType =
  | "multiple-choice"
  | "fill-blank"
  | "reorder"
  | "match"
  | "translate"
  | "true-false"
  | "listen-choose"
  | "dictation"
  | "speaking";

export interface LevelInfo {
  id: Level;
  titleHy: string;
  titleFr: string;
  description: string;
  difficulty: number;
  difficultyLabel: string;
  lessonsCount: number;
  color: string;
}

export interface VocabItem {
  id: string;
  french: string;
  armenian: string;
  pronunciation?: string;
  exampleFr: string;
  exampleHy: string;
  category: string;
  level: Level;
}

export interface VocabCategory {
  id: string;
  nameHy: string;
  image: string;
  description: string;
}

export interface GrammarLesson {
  id: string;
  level: Level;
  titleFr: string;
  titleHy: string;
  explanation: string;
  rule: string;
  examples: {
    french: string;
    armenian: string;
  }[];
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  questionHy: string;
  promptFr?: string;
  audioText?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanationHy: string;
  words?: string[];
  pairs?: { left: string; right: string }[];
}

export interface DayLesson {
  id?: string;
  week?: number;
  day: DayOfWeek | string;
  dayLabelHy: string;
  dayLabelFr: string;
  type: LessonType;
  themeFr: string;
  themeHy: string;
  level: Level;
  expressions?: {
    french: string;
    armenian: string;
    pronunciation?: string;
    exampleFr?: string;
    exampleHy?: string;
  }[];
  rule?: string;
  grammarId?: string;
  readingId?: string;
  exercises?: Exercise[];
  locked?: boolean;
}

export interface MonthWeek {
  week: number;
  titleHy: string;
  titleFr: string;
  lessons: DayLesson[];
}

export interface PlacementQuestion {
  id: string;
  type: ExerciseType;
  level: Level;
  questionHy: string;
  promptFr?: string;
  audioText?: string;
  options?: string[];
  correctAnswer: string;
  explanationHy: string;
  skill: "vocabulary" | "grammar" | "reading" | "listening" | "translation";
}

export interface ListeningExercise {
  id: string;
  level: Level;
  audioText: string;
  questionHy: string;
  type: ExerciseType;
  options?: string[];
  correctAnswer: string;
  explanationHy: string;
  maxReplays?: number;
}

export interface SpeakingPrompt {
  id: string;
  level: Level;
  topicHy: string;
  promptFr: string;
  promptHy: string;
  expectedKeywords: string[];
  sampleAnswer: string;
  tipsHy: string;
}

export interface DictationItem {
  id: string;
  level: Level;
  text: string;
  hintHy?: string;
}

export interface WeeklyTestSection {
  id: string;
  titleHy: string;
  skill: string;
  exercises: Exercise[];
}

export interface UserProgress {
  onboardingComplete: boolean;
  level: Level | null;
  learningGoal?: LearningGoal | null;
  name: string;
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  completedDays: string[];
  weeklyCompleted: Record<string, boolean>;
  vocabStatus: Record<string, WordStatus>;
  skillProgress: {
    grammar: number;
    vocabulary: number;
    listening: number;
    speaking: number;
    dictation: number;
  };
  dailyXp: number;
  lessonsCompletedToday: number;
  vocabLearnedToday: number;
  placementResult?: {
    level: Level;
    strengths: string[];
    weaknesses: string[];
    score: number;
  };
  weeklyTestScores: { date: string; score: number; xp: number }[];
  dictationHistory: { date: string; score: number }[];
  speakingHistory: { date: string; score: number }[];
}
