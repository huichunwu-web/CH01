import React from 'react';
import {
  UtensilsCrossed,
  BookOpen,
  GraduationCap,
  Sparkles,
  FileCheck2,
  FileDown,
  UserCog,
} from 'lucide-react';
import { StudentProfile } from '../types';

export type ActiveTab = 'flashcards' | 'quiz' | 'scenario' | 'regulations' | 'pdf';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  student: StudentProfile;
  onOpenStudentModal: () => void;
  masteredCount: number;
  totalCards: number;
  bestScore?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  student,
  onOpenStudentModal,
  masteredCount,
  totalCards,
  bestScore,
}) => {
  const tabs = [
    { id: 'flashcards' as ActiveTab, label: '學習字卡', icon: BookOpen, badge: `${masteredCount}/${totalCards}` },
    { id: 'quiz' as ActiveTab, label: '模擬測驗', icon: GraduationCap, badge: bestScore !== undefined ? `${bestScore}分` : undefined },
    { id: 'scenario' as ActiveTab, label: '情境分析', icon: Sparkles },
    { id: 'regulations' as ActiveTab, label: '核心法規', icon: FileCheck2 },
    { id: 'pdf' as ActiveTab, label: 'PDF輸出', icon: FileDown, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Subject */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md shadow-amber-600/20 shrink-0">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                  Chapter 1
                </span>
                <h1 className="text-base sm:text-lg font-black text-slate-800 tracking-tight truncate">
                  廚房安全衛生守則
                </h1>
              </div>
              <p className="text-[11px] text-slate-500 truncate hidden sm:block">
                食品安全衛生互動學習與評量系統
              </p>
            </div>
          </div>

          {/* Right controls: Student Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Student ID & Name Profile Pill */}
            <button
              onClick={onOpenStudentModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 hover:bg-amber-100/80 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-900 transition-all cursor-pointer group"
              title="點擊修改學生學號與姓名"
            >
              <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                {student.name.charAt(0) || '學'}
              </div>
              <div className="text-left text-xs leading-tight hidden xs:block">
                <div className="font-bold flex items-center gap-1">
                  <span>{student.name}</span>
                  <UserCog className="w-3 h-3 text-slate-400 group-hover:text-amber-700 transition-colors" />
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {student.studentId}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none border-t border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/80'
                } ${tab.highlight && !isActive ? 'border border-amber-300 bg-amber-50/50 text-amber-800' : ''}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-700'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-amber-700/80 text-amber-100'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
