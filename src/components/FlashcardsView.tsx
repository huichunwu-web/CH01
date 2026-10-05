import React, { useState, useEffect, useCallback } from 'react';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BookmarkCheck,
  Volume2,
  Sparkles,
  Shuffle,
  Lightbulb,
  BookOpen,
} from 'lucide-react';
import { FLASHCARD_DATA } from '../data/flashcards';
import { FlashcardCategory } from '../types';
import { audioService } from '../utils/audio';

interface FlashcardsViewProps {
  masteredIds: string[];
  onToggleMaster: (id: string) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  masteredIds,
  onToggleMaster,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FlashcardCategory | 'all'>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'unmastered' | 'mastered'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filtered cards list
  const filteredCards = FLASHCARD_DATA.filter((card) => {
    if (selectedCategory !== 'all' && card.category !== selectedCategory) {
      return false;
    }
    const isMastered = masteredIds.includes(card.id);
    if (filterMode === 'mastered') return isMastered;
    if (filterMode === 'unmastered') return !isMastered;
    return true;
  });

  // Keep index in range
  useEffect(() => {
    if (currentIndex >= filteredCards.length) {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
  }, [selectedCategory, filterMode, filteredCards.length, currentIndex]);

  const currentCard = filteredCards[currentIndex] || FLASHCARD_DATA[0];
  const isCurrentMastered = currentCard ? masteredIds.includes(currentCard.id) : false;

  const handleFlip = useCallback(() => {
    audioService.playCardFlip();
    setIsFlipped((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (filteredCards.length <= 1) return;
    setIsFlipped(false);
    audioService.playCardFlip();
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  }, [filteredCards.length]);

  const handlePrev = useCallback(() => {
    if (filteredCards.length <= 1) return;
    setIsFlipped(false);
    audioService.playCardFlip();
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  }, [filteredCards.length]);

  const handleShuffle = () => {
    if (filteredCards.length <= 1) return;
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setIsFlipped(false);
    audioService.playCardFlip();
    setCurrentIndex(randomIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev]);

  // Text to speech
  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const categories = [
    { id: 'all', name: '全部字卡' },
    { id: 'concept', name: '核心概念' },
    { id: 'terminology', name: '術語辨析' },
    { id: 'who_history', name: 'WHO與歷史' },
    { id: 'food_protect', name: '食品防護體系' },
    { id: 'regulations', name: '兩大法條對比' },
    { id: 'ghp_revision', name: '最新GHP修正' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner & Progress Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-amber-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>互動學習字卡 (Flashcards)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            廚房安全衛生守則 核心字卡記憶
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            翻轉卡片深度記憶重要名詞、法條比對與最新 GHP 修正準則（支援空白鍵翻牌、左右鍵切換）
          </p>
        </div>

        {/* Progress stats */}
        <div className="flex items-center gap-4 bg-amber-50/70 border border-amber-200/80 px-4 py-3 rounded-2xl shrink-0">
          <div>
            <div className="text-[11px] font-semibold text-amber-800">已掌握進度</div>
            <div className="text-lg font-black text-amber-900 font-mono">
              {masteredIds.length} <span className="text-xs text-amber-700 font-normal">/ {FLASHCARD_DATA.length} 題</span>
            </div>
          </div>
          <div className="w-12 h-12 relative flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                className="text-amber-200"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                className="text-amber-600 transition-all duration-500"
                fill="none"
                strokeDasharray={125.6}
                strokeDashoffset={125.6 - (125.6 * (masteredIds.length / FLASHCARD_DATA.length))}
              />
            </svg>
            <span className="absolute text-xs font-bold text-amber-900">
              {Math.round((masteredIds.length / FLASHCARD_DATA.length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills & Filter Controls */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as FlashcardCategory | 'all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-xs shadow-amber-600/30'
                  : 'bg-white hover:bg-amber-50 text-slate-600 border border-slate-200/80'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterMode === 'all' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              全部 ({FLASHCARD_DATA.length})
            </button>
            <button
              onClick={() => setFilterMode('unmastered')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterMode === 'unmastered' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              待加強 ({FLASHCARD_DATA.length - masteredIds.length})
            </button>
            <button
              onClick={() => setFilterMode('mastered')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterMode === 'mastered' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              已掌握 ({masteredIds.length})
            </button>
          </div>

          <button
            onClick={handleShuffle}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-medium transition-colors cursor-pointer"
            title="隨機抽取卡片"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>隨機複習</span>
          </button>
        </div>
      </div>

      {/* Main Flashcard Container */}
      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-amber-100 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">太棒了！此分類卡片全部掌握完畢！</h3>
          <p className="text-xs text-slate-500">你可以切換為「全部」繼續複習，或前往「模擬測驗」檢測實力！</p>
          <button
            onClick={() => setFilterMode('all')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            檢視所有字卡
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* 3D Flip Card */}
          <div
            onClick={handleFlip}
            className="relative w-full min-h-[360px] sm:min-h-[380px] cursor-pointer perspective-[1200px] select-none group"
          >
            <div
              className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front of Card (Question / Concept) */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-white via-amber-50/30 to-amber-100/40 rounded-3xl p-6 sm:p-8 border-2 border-amber-200/90 shadow-lg shadow-amber-900/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                      {currentCard.categoryName}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">
                    {currentCard.title}
                  </h3>

                  <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-amber-200/70 shadow-xs">
                    <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed">
                      {currentCard.question}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs text-amber-800 font-medium">
                  <div className="flex items-center gap-1.5">
                    <RotateCw className="w-4 h-4 text-amber-600 group-hover:rotate-180 transition-transform duration-500" />
                    <span>點擊卡片或按「空白鍵」翻看詳細解答</span>
                  </div>
                  <span className="font-mono font-bold text-slate-400">
                    {currentIndex + 1} / {filteredCards.length}
                  </span>
                </div>
              </div>

              {/* Back of Card (Answer, Key points, Mnemonic) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl shadow-amber-900/10 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      重點解答解析
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(`${currentCard.title}。${currentCard.answer}`);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                      title="語音朗讀解答"
                    >
                      <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-600 animate-pulse' : ''}`} />
                    </button>
                  </div>

                  <div className="text-sm sm:text-base font-medium text-slate-700 whitespace-pre-line leading-relaxed">
                    {currentCard.answer}
                  </div>

                  {/* Key points bullets */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                    <div className="text-xs font-bold text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>必記核心關鍵點</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                      {currentCard.keyPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Mnemonic rhyme */}
                  {currentCard.mnemonic && (
                    <div className="p-3 rounded-2xl bg-orange-50/80 border border-orange-200/80 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div className="text-xs font-semibold text-orange-950">
                        <span className="text-orange-700 font-bold">記憶口訣：</span>
                        {currentCard.mnemonic}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5 text-amber-700">
                    <RotateCw className="w-4 h-4" />
                    <span>再次點擊卡片翻回正面</span>
                  </div>
                  <span className="font-mono font-bold">
                    {currentIndex + 1} / {filteredCards.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation & Mastery Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrev}
              disabled={filteredCards.length <= 1}
              className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一張 (←)</span>
            </button>

            {/* Mastered toggle button */}
            <button
              onClick={() => onToggleMaster(currentCard.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                isCurrentMastered
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  : 'bg-white hover:bg-emerald-50 text-slate-700 border border-emerald-300'
              }`}
            >
              <BookmarkCheck className={`w-4 h-4 ${isCurrentMastered ? 'text-white' : 'text-emerald-600'}`} />
              <span>{isCurrentMastered ? '已標記為掌握 ✓' : '標記為已掌握'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={filteredCards.length <= 1}
              className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>下一張 (→)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
