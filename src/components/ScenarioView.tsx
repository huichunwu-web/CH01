import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  ShieldAlert,
  Store,
  Flame,
  Users,
  Truck,
  BookOpen,
} from 'lucide-react';
import { SCENARIO_CASES } from '../data/scenarios';
import { ScenarioCase } from '../types';
import { audioService } from '../utils/audio';

const iconMap: Record<string, React.ElementType> = {
  Store,
  Flame,
  AlertTriangle,
  ShieldAlert,
  Users,
  Truck,
};

interface ScenarioViewProps {
  completedCaseIds: string[];
  onCaseCompleted: (caseId: string) => void;
}

export const ScenarioView: React.FC<ScenarioViewProps> = ({
  completedCaseIds,
  onCaseCompleted,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(SCENARIO_CASES[0].id);
  const [stepAnswers, setStepAnswers] = useState<Record<string, string>>({});

  const currentCase: ScenarioCase =
    SCENARIO_CASES.find((c) => c.id === selectedCaseId) || SCENARIO_CASES[0];

  const handleSelectOption = (stepId: string, optionId: string, isCorrect: boolean) => {
    setStepAnswers((prev) => ({ ...prev, [stepId]: optionId }));
    if (isCorrect) {
      audioService.playCorrectSound();
    } else {
      audioService.playWrongSound();
    }

    // Check if all steps of this case are correct
    setTimeout(() => {
      const allDone = currentCase.steps.every((st) => {
        const chosen = st.id === stepId ? optionId : stepAnswers[st.id];
        const opt = st.options.find((o) => o.id === chosen);
        return opt?.isCorrect;
      });
      if (allDone && !completedCaseIds.includes(currentCase.id)) {
        onCaseCompleted(currentCase.id);
      }
    }, 200);
  };

  const isCaseFullyPassed = currentCase.steps.every((st) => {
    const chosen = stepAnswers[st.id];
    return st.options.find((o) => o.id === chosen)?.isCorrect;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-amber-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>餐飲實務情境案例分析 (Scenario Analysis)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            真實廚房與外場 衛生突發事件模擬
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            身歷其境面對收銀交叉污染、外燴超時溫控、衛生局直接罰 vs 限期改裁罰爭端及三專管理等挑戰，鍛鍊現場決策力！
          </p>
        </div>

        {/* Completion badge */}
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl shrink-0">
          <div className="text-xs font-bold text-amber-900">案例破關進度</div>
          <div className="text-sm font-black text-amber-700 font-mono">
            {completedCaseIds.length} / {SCENARIO_CASES.length}
          </div>
        </div>
      </div>

      {/* Case Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {SCENARIO_CASES.map((item, idx) => {
          const Icon = iconMap[item.icon] || Store;
          const isSelected = item.id === selectedCaseId;
          const isPassed = completedCaseIds.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedCaseId(item.id);
                setStepAnswers({});
              }}
              className={`p-3 rounded-2xl border text-left transition-all relative cursor-pointer ${
                isSelected
                  ? 'border-amber-600 bg-amber-50/90 ring-2 ring-amber-500/30 shadow-xs'
                  : 'border-slate-200/80 bg-white hover:border-amber-300 hover:bg-amber-50/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {isPassed && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
              <div className="text-[11px] font-bold text-slate-800 line-clamp-1">
                案例 {idx + 1}
              </div>
              <div className="text-[10px] text-slate-500 line-clamp-1">
                {item.tag}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Case Workspace */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {currentCase.tag}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentCase.subtitle}
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-800">
              {currentCase.title}
            </h3>
          </div>

          {isCaseFullyPassed && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0">
              <CheckCircle2 className="w-4 h-4" />
              <span>本案例決策通關！</span>
            </div>
          )}
        </div>

        {/* Story Scenario Narrative */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-2">
          <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>事發現場情境還原</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {currentCase.story}
          </p>
        </div>

        {/* Hazard & Danger Points */}
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200/70 space-y-2">
          <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>重大食安隱患與潛在危害</span>
          </div>
          <ul className="list-disc list-inside text-xs sm:text-sm text-rose-950 space-y-1 font-medium">
            {currentCase.dangerPoints.map((danger, i) => (
              <li key={i}>{danger}</li>
            ))}
          </ul>
        </div>

        {/* Decision Steps Challenge */}
        <div className="space-y-6 pt-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>現場即時決策挑戰（請為每一步驟選取正確行動）</span>
          </div>

          {currentCase.steps.map((step, sIdx) => {
            const userChosen = stepAnswers[step.id];

            return (
              <div
                key={step.id}
                className="p-5 rounded-2xl border-2 border-slate-100 bg-slate-50/40 space-y-4"
              >
                <div>
                  <div className="text-xs font-bold text-amber-700 mb-1">
                    步驟 {sIdx + 1}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-800">
                    {step.question}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {step.options.map((opt) => {
                    const isSelected = userChosen === opt.id;
                    const hasChosen = userChosen !== undefined;

                    let btnCls = 'bg-white border-slate-200 hover:border-amber-300 text-slate-700';

                    if (hasChosen) {
                      if (opt.isCorrect) {
                        btnCls = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-400';
                      } else if (isSelected) {
                        btnCls = 'bg-rose-50 border-rose-500 text-rose-950';
                      } else {
                        btnCls = 'bg-white border-slate-200 opacity-50';
                      }
                    } else if (isSelected) {
                      btnCls = 'bg-amber-50 border-amber-600 text-amber-950 font-bold';
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(step.id, opt.id, opt.isCorrect)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${btnCls}`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold ${
                            hasChosen && opt.isCorrect
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : hasChosen && isSelected && !opt.isCorrect
                              ? 'border-rose-600 bg-rose-600 text-white'
                              : isSelected
                              ? 'border-amber-600 bg-amber-600 text-white'
                              : 'border-slate-300 text-slate-500'
                          }`}
                        >
                          {opt.id}
                        </div>
                        <div className="flex-1 text-xs sm:text-sm">
                          {opt.text}
                        </div>
                        {hasChosen && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {hasChosen && isSelected && !opt.isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback note when answered */}
                {userChosen && (
                  <div
                    className={`p-3 rounded-xl text-xs font-medium ${
                      step.options.find((o) => o.id === userChosen)?.isCorrect
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-rose-50 text-rose-900 border border-rose-200'
                    }`}
                  >
                    {step.options.find((o) => o.id === userChosen)?.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legal Basis & Fine Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <div className="text-xs font-bold text-amber-900 mb-1">
              法規核心依據
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {currentCase.correctRegulation}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
            <div className="text-xs font-bold text-rose-900 mb-1">
              罰則法條與主管機關處置
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {currentCase.penaltyBasis}
            </p>
          </div>
        </div>

        {/* Operational Takeaway */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-emerald-900 mb-0.5">
              主廚實務黃金守則 Takeaway
            </div>
            <p className="text-xs text-emerald-950 font-medium">
              {currentCase.takeaway}
            </p>
          </div>
        </div>

        {/* Next Case Trigger */}
        <div className="flex items-center justify-end pt-2">
          <button
            onClick={() => {
              const curIdx = SCENARIO_CASES.findIndex((c) => c.id === currentCase.id);
              const nextCase = SCENARIO_CASES[(curIdx + 1) % SCENARIO_CASES.length];
              setSelectedCaseId(nextCase.id);
              setStepAnswers({});
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            <span>下一個案例挑戰</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
