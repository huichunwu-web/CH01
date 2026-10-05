import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Timer,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Award,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quiz';
import { QuizAttempt } from '../types';
import { audioService } from '../utils/audio';

interface QuizViewProps {
  onQuizCompleted: (attempt: QuizAttempt) => void;
  lastAttempt?: QuizAttempt | null;
}

export const QuizView: React.FC<QuizViewProps> = ({
  onQuizCompleted,
  lastAttempt,
}) => {
  const [mode, setMode] = useState<'exam' | 'practice'>('exam');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: number;
    if (isTimerRunning && !isSubmitted) {
      interval = window.setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  // Start quiz on mount
  useEffect(() => {
    setIsTimerRunning(true);
  }, []);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const userAns = selectedAnswers[currentQ.id];

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted && mode === 'exam') return;

    const newAnswers = { ...selectedAnswers, [currentQ.id]: optionId };
    setSelectedAnswers(newAnswers);

    if (mode === 'practice') {
      setShowExplanation(true);
      if (optionId === currentQ.correctAnswerId) {
        audioService.playCorrectSound();
      } else {
        audioService.playWrongSound();
      }
    }
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerId) {
        correct++;
      }
    });
    return Math.round((correct / QUIZ_QUESTIONS.length) * 100);
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);
    const score = calculateScore();

    const attempt: QuizAttempt = {
      date: new Date().toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      score,
      totalQuestions: QUIZ_QUESTIONS.length,
      answers: selectedAnswers,
      timeSpentSeconds: timerSeconds,
    };

    onQuizCompleted(attempt);

    if (score >= 80) {
      audioService.playCorrectSound();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = (onlyMistakes: boolean = false) => {
    if (onlyMistakes) {
      const remainingAnswers: Record<string, string> = {};
      QUIZ_QUESTIONS.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctAnswerId) {
          remainingAnswers[q.id] = q.correctAnswerId;
        }
      });
      setSelectedAnswers(remainingAnswers);
      // find first incorrect
      const firstWrongIdx = QUIZ_QUESTIONS.findIndex(
        (q) => selectedAnswers[q.id] !== q.correctAnswerId
      );
      if (firstWrongIdx !== -1) setCurrentIndex(firstWrongIdx);
    } else {
      setSelectedAnswers({});
      setCurrentIndex(0);
      setTimerSeconds(0);
    }
    setIsSubmitted(false);
    setShowExplanation(false);
    setIsTimerRunning(true);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const currentScore = isSubmitted ? calculateScore() : 0;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-amber-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>廚房安全衛生守則 模擬測驗</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            國家級餐飲衛管 實戰題庫測驗
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            依據簡報第 1 至 21 頁內容嚴選 16 道核心考題，涵蓋 Sanit、WHO 歷程、食品防護三大支柱、食安法第 8 與 14 條對比及最新 GHP 修正。
          </p>
        </div>

        {/* Mode switcher & timer */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200">
            <button
              onClick={() => {
                setMode('exam');
                setShowExplanation(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'exam' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              模擬考試模式
            </button>
            <button
              onClick={() => {
                setMode('practice');
                setShowExplanation(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'practice' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              即時精熟練習
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-mono font-bold text-xs">
            <Timer className="w-3.5 h-3.5 text-amber-700" />
            <span>{formatTime(timerSeconds)}</span>
          </div>
        </div>
      </div>

      {/* When Submitted, show Result Summary */}
      {isSubmitted && (
        <div className="bg-gradient-to-br from-white via-amber-50/50 to-orange-50/40 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-amber-200/80">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-600/30">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  測驗評分報告
                </span>
                <h3 className="text-2xl font-black text-slate-800 mt-1">
                  得分：{currentScore} 分
                </h3>
                <p className="text-xs text-slate-500">
                  答對 {QUIZ_QUESTIONS.filter((q) => selectedAnswers[q.id] === q.correctAnswerId).length} / {QUIZ_QUESTIONS.length} 題 • 費時 {formatTime(timerSeconds)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleRestart(false)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>重新測驗</span>
              </button>
              {currentScore < 100 && (
                <button
                  onClick={() => handleRestart(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>專攻錯題</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick grade tag */}
          <div className="p-4 rounded-2xl bg-white border border-amber-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">評級結果：</span>
            <span className={`font-black text-sm px-3 py-1 rounded-full ${
              currentScore >= 90
                ? 'bg-emerald-100 text-emerald-800'
                : currentScore >= 80
                ? 'bg-blue-100 text-blue-800'
                : currentScore >= 60
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800'
            }`}>
              {currentScore >= 90
                ? '優等 (Master Saint 廚房安全專家)'
                : currentScore >= 80
                ? '甲等 (合格通過衛生專業考核)'
                : currentScore >= 60
                ? '乙等 (及格，建議加強法規與溫度控管)'
                : '待加強 (衛生無妥協空間，建議複習字卡後重測)'}
            </span>
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm space-y-6">
        {/* Question Header & Category Badge */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              {currentQ.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              第 {currentIndex + 1} / {QUIZ_QUESTIONS.length} 題
            </span>
          </div>

          <div className="text-xs text-slate-500">
            已作答 <span className="font-bold text-amber-800 font-mono">{answeredCount}</span> / {QUIZ_QUESTIONS.length} 題
          </div>
        </div>

        {/* Question Text */}
        <div className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
          <span className="text-amber-600 mr-2">Q{currentIndex + 1}.</span>
          {currentQ.question}
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((opt) => {
            const isChosen = userAns === opt.id;
            const isCorrect = opt.id === currentQ.correctAnswerId;
            const revealMode = isSubmitted || (mode === 'practice' && showExplanation && userAns !== undefined);

            let btnStyle = 'border-slate-200 hover:border-amber-300 hover:bg-amber-50/40 text-slate-700';

            if (revealMode) {
              if (isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-400';
              } else if (isChosen) {
                btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
              } else {
                btnStyle = 'border-slate-200 opacity-50 text-slate-400';
              }
            } else if (isChosen) {
              btnStyle = 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/30';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isSubmitted && mode === 'exam'}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold uppercase ${
                    revealMode && isCorrect
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : revealMode && isChosen && !isCorrect
                      ? 'border-rose-600 bg-rose-600 text-white'
                      : isChosen
                      ? 'border-amber-600 bg-amber-600 text-white'
                      : 'border-slate-300 text-slate-500'
                  }`}
                >
                  {opt.id}
                </div>
                <div className="flex-1 text-sm sm:text-base leading-relaxed">
                  {opt.text}
                </div>
                {revealMode && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {revealMode && isChosen && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation in Practice Mode or after Submission */}
        {(isSubmitted || (mode === 'practice' && showExplanation && userAns !== undefined)) && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>法規指引與核心解析</span>
              </span>
              {currentQ.lawRef && (
                <span className="text-[11px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  出處：{currentQ.lawRef}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Navigation bottom bar */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
                setShowExplanation(mode === 'practice' && !!selectedAnswers[QUIZ_QUESTIONS[currentIndex - 1].id]);
              }
            }}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>上一題</span>
          </button>

          {/* Quick submission button */}
          {!isSubmitted && (
            <button
              onClick={handleSubmitQuiz}
              disabled={answeredCount === 0}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs sm:text-sm font-bold shadow-xs shadow-amber-600/20 transition-all cursor-pointer"
            >
              <span>繳卷評分 ({answeredCount}/{QUIZ_QUESTIONS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => {
              if (currentIndex < QUIZ_QUESTIONS.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setShowExplanation(mode === 'practice' && !!selectedAnswers[QUIZ_QUESTIONS[currentIndex + 1].id]);
              }
            }}
            disabled={currentIndex === QUIZ_QUESTIONS.length - 1}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>下一題</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Quick Jump Grid */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>題目跳轉導航板</span>
          <div className="flex items-center gap-3 text-[11px] font-normal text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" /> 已答
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200 inline-block" /> 未答
            </span>
          </div>
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCur = idx === currentIndex;
            const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctAnswerId;
            const isWrong = isSubmitted && selectedAnswers[q.id] !== undefined && !isCorrect;

            let badgeColor = 'bg-slate-100 text-slate-600 hover:bg-slate-200';
            if (isSubmitted) {
              badgeColor = isCorrect ? 'bg-emerald-600 text-white' : isWrong ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-400';
            } else if (isAnswered) {
              badgeColor = 'bg-amber-600 text-white font-bold';
            }

            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowExplanation(mode === 'practice' && !!selectedAnswers[q.id]);
                }}
                className={`h-9 rounded-xl text-xs font-mono flex items-center justify-center transition-all cursor-pointer ${badgeColor} ${
                  isCur ? 'ring-2 ring-amber-500 ring-offset-2 scale-105' : ''
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
