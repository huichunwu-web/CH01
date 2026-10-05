import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { ScenarioView } from './components/ScenarioView';
import { RegulationsView } from './components/RegulationsView';
import { PdfExportView } from './components/PdfExportView';
import { StudentModal } from './components/StudentModal';
import { StudentProfile, QuizAttempt } from './types';
import { FLASHCARD_DATA } from './data/flashcards';

const STORAGE_KEYS = {
  STUDENT: 'kitchen_hygiene_student',
  MASTERED_CARDS: 'kitchen_hygiene_mastered_cards',
  COMPLETED_SCENARIOS: 'kitchen_hygiene_completed_scenarios',
  LAST_QUIZ: 'kitchen_hygiene_last_quiz',
};

const DEFAULT_STUDENT: StudentProfile = {
  studentId: 'B11204018',
  name: '王小明',
  department: '餐旅管理學系 二年甲班',
  createdAt: new Date().toISOString(),
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('flashcards');
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  // Student Profile
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENT);
      return saved ? JSON.parse(saved) : DEFAULT_STUDENT;
    } catch {
      return DEFAULT_STUDENT;
    }
  });

  // Mastered Flashcards IDs
  const [masteredCardIds, setMasteredCardIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MASTERED_CARDS);
      return saved ? JSON.parse(saved) : ['fc-1', 'fc-3'];
    } catch {
      return ['fc-1', 'fc-3'];
    }
  });

  // Completed Scenario Case IDs
  const [completedScenarioIds, setCompletedScenarioIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_SCENARIOS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Last Quiz Attempt
  const [lastQuizAttempt, setLastQuizAttempt] = useState<QuizAttempt | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAST_QUIZ);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(student));
    } catch {
      // ignore
    }
  }, [student]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MASTERED_CARDS, JSON.stringify(masteredCardIds));
    } catch {
      // ignore
    }
  }, [masteredCardIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_SCENARIOS, JSON.stringify(completedScenarioIds));
    } catch {
      // ignore
    }
  }, [completedScenarioIds]);

  useEffect(() => {
    try {
      if (lastQuizAttempt) {
        localStorage.setItem(STORAGE_KEYS.LAST_QUIZ, JSON.stringify(lastQuizAttempt));
      }
    } catch {
      // ignore
    }
  }, [lastQuizAttempt]);

  const handleToggleMaster = (id: string) => {
    setMasteredCardIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCaseCompleted = (caseId: string) => {
    setCompletedScenarioIds((prev) =>
      prev.includes(caseId) ? prev : [...prev, caseId]
    );
  };

  const handleQuizCompleted = (attempt: QuizAttempt) => {
    setLastQuizAttempt(attempt);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Noto_Sans_TC',sans-serif]">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        student={student}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
        masteredCount={masteredCardIds.length}
        totalCards={FLASHCARD_DATA.length}
        bestScore={lastQuizAttempt?.score}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'flashcards' && (
          <FlashcardsView
            masteredIds={masteredCardIds}
            onToggleMaster={handleToggleMaster}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            onQuizCompleted={handleQuizCompleted}
            lastAttempt={lastQuizAttempt}
          />
        )}

        {activeTab === 'scenario' && (
          <ScenarioView
            completedCaseIds={completedScenarioIds}
            onCaseCompleted={handleCaseCompleted}
          />
        )}

        {activeTab === 'regulations' && <RegulationsView />}

        {activeTab === 'pdf' && (
          <PdfExportView
            student={student}
            masteredCardIds={masteredCardIds}
            completedScenarioIds={completedScenarioIds}
            lastQuizAttempt={lastQuizAttempt}
            onOpenStudentModal={() => setIsStudentModalOpen(true)}
          />
        )}
      </main>

      {/* Footer (hidden in print) */}
      <footer className="py-6 border-t border-slate-200/80 bg-white/60 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">廚房安全衛生守則 Chapter 1</span>
            <span>•</span>
            <span>食品良好衛生規範 (GHP) 與安全管理評量系統</span>
          </div>
          <div>
            當前登入：<strong>{student.name}</strong>（學號：{student.studentId}）
          </div>
        </div>
      </footer>

      {/* Student Profile Settings Modal */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        profile={student}
        onSave={(updated) => setStudent(updated)}
      />
    </div>
  );
}
