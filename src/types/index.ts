export interface StudentProfile {
  studentId: string;
  name: string;
  department?: string;
  createdAt: string;
}

export type FlashcardCategory = 
  | 'concept'       // 核心概念與縮寫 (Sanit, Sanity, Saint)
  | 'terminology'   // 術語辨析 (Sanitation vs Hygiene, 清潔vs衛生)
  | 'who_history'   // WHO定義與國際歷程 (Farm to Plate, 911)
  | 'food_protect'  // 食品防護三支柱與四大範圍 (FS, FD, FQ, SQF)
  | 'regulations'   // 兩大法條對比 (第8條 vs 第14條)
  | 'ghp_revision'; // 最新GHP修正重點 (時間溫度、體檢、三專、外送)

export interface FlashcardItem {
  id: string;
  category: FlashcardCategory;
  categoryName: string;
  title: string;
  question: string;
  answer: string;
  mnemonic?: string; // 記憶口訣
  keyPoints: string[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  type: 'single' | 'boolean';
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
  explanation: string;
  lawRef?: string;
}

export interface ScenarioStep {
  id: string;
  description: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface ScenarioCase {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tag: string;
  story: string;
  dangerPoints: string[];
  correctRegulation: string;
  penaltyBasis: string;
  steps: ScenarioStep[];
  takeaway: string;
}

export interface QuizAttempt {
  date: string;
  score: number;
  totalQuestions: number;
  answers: Record<string, string>;
  timeSpentSeconds: number;
}
