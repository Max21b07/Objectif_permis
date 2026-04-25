import type { Language, LocalizedString } from "../locales/types";

export type Importance = "Vital" | "Important" | "Useful";

export type ModuleId =
  | "home"
  | "legal"
  | "driving"
  | "vietnam-france"
  | "commands"
  | "vocabulary"
  | "automatic"
  | "training"
  | "husband"
  | "quiz"
  | "printables"
  | "sources";

export interface ModuleInfo {
  id: ModuleId;
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface DrivingTopic {
  id: string;
  title: LocalizedString;
  importance: Importance;
  explanation: LocalizedString;
  mistake: LocalizedString;
  example: LocalizedString;
  remember: LocalizedString;
}

export interface ComparisonItem {
  id: string;
  vietnamHabit: LocalizedString;
  franceChange: LocalizedString;
  risk: LocalizedString;
  reflex: LocalizedString;
}

export interface CommandItem {
  french: string;
  pronunciation: string;
  english: string;
  vietnamese: string;
  situation: LocalizedString;
}

export interface VocabularyItem {
  french: string;
  pronunciation: string;
  english: string;
  vietnamese: string;
  category: string;
  importance: Importance;
  example: LocalizedString;
}

export interface TrainingSession {
  week: number;
  session: number;
  level: LocalizedString;
  objective: LocalizedString;
  duration: string;
  legalPlace: LocalizedString;
  exercises: LocalizedString[];
  vocabulary: string[];
  watch: LocalizedString[];
  success: LocalizedString[];
  stress: "Low" | "Medium" | "High";
}

export interface QuizQuestion {
  id: string;
  question: LocalizedString;
  answers: LocalizedString[];
  correctIndex: number;
  explanation: LocalizedString;
  level: "easy" | "intermediate" | "scenario";
  category: string;
  language: Language | "all";
}

export interface PrintableSheetData {
  id: string;
  title: LocalizedString;
  intro: LocalizedString;
  items: LocalizedString[];
}

export interface SourceLink {
  title: string;
  url: string;
  note: LocalizedString;
}
