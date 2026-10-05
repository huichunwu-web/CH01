import React, { useState } from 'react';
import {
  Printer,
  Download,
  Award,
  CheckCircle2,
  Calendar,
  User,
  GraduationCap,
  Scale,
  Sparkles,
  ShieldCheck,
  FileText,
  FileCheck2,
} from 'lucide-react';
import { StudentProfile, QuizAttempt } from '../types';
import { FLASHCARD_DATA } from '../data/flashcards';
import { SCENARIO_CASES } from '../data/scenarios';
import { QUIZ_QUESTIONS } from '../data/quiz';

interface PdfExportViewProps {
  student: StudentProfile;
  masteredCardIds: string[];
  completedScenarioIds: string[];
  lastQuizAttempt?: QuizAttempt | null;
  onOpenStudentModal: () => void;
}

export const PdfExportView: React.FC<PdfExportViewProps> = ({
  student,
  masteredCardIds,
  completedScenarioIds,
  lastQuizAttempt,
  onOpenStudentModal,
}) => {
  const [docType, setDocType] = useState<'certificate' | 'fullReport'>('fullReport');

  const currentDate = new Date().toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const cardPercent = Math.round((masteredCardIds.length / FLASHCARD_DATA.length) * 100);
  const scenarioPercent = Math.round((completedScenarioIds.length / SCENARIO_CASES.length) * 100);
  const quizScore = lastQuizAttempt ? lastQuizAttempt.score : 0;

  // Overall evaluation
  const isAllPassed = cardPercent >= 80 && quizScore >= 70 && scenarioPercent >= 60;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner (hidden during print) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-amber-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Printer className="w-4 h-4" />
            <span>PDF 輸出與成果報告列印 (Print / Export PDF)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            學生研習證明書與全方位學習成績單
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            點擊「列印 / 另存為 PDF」即可使用瀏覽器原生轉存為高解析度 A4 PDF 文件，自動套用列印排版與證書紋理。
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200 text-xs font-bold">
            <button
              onClick={() => setDocType('fullReport')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                docType === 'fullReport' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              完整成績報告單
            </button>
            <button
              onClick={() => setDocType('certificate')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                docType === 'certificate' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              研習結業證書
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-600/30 active:scale-95 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>列印 / 另存 PDF</span>
          </button>
        </div>
      </div>

      {/* Student Profile Quick Alert Bar (hidden in print) */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between text-xs print:hidden">
        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-amber-700 shrink-0" />
          <div>
            <span className="font-semibold text-slate-700">當前受評學生：</span>
            <strong className="text-slate-900 mx-1">{student.name}</strong>
            <span className="font-mono text-slate-500">（學號：{student.studentId} / {student.department}）</span>
          </div>
        </div>
        <button
          onClick={onOpenStudentModal}
          className="text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
        >
          修改學生資料
        </button>
      </div>

      {/* ================= PRINTABLE PAPER CONTAINER ================= */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-xl print:shadow-none print:border-none print:p-0 print:m-0 text-slate-800 print:text-black">

        {/* ---------------- DOCUMENT A: 研習結業證書 ---------------- */}
        {docType === 'certificate' && (
          <div className="relative border-8 border-double border-amber-700/80 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-amber-50/30 via-white to-amber-50/40 text-center space-y-8 print:p-8 print:border-amber-800">
            {/* Top header */}
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-600 text-white shadow-md mb-2">
                <Award className="w-9 h-9" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-amber-900 tracking-wider">
                研 習 結 業 證 書
              </h1>
              <p className="text-xs sm:text-sm font-semibold tracking-widest text-amber-700 uppercase">
                Certificate of Food Safety and Kitchen Hygiene
              </p>
            </div>

            {/* Student info proclamation */}
            <div className="space-y-4 max-w-xl mx-auto py-4">
              <p className="text-sm sm:text-base text-slate-600">
                茲證明學生
              </p>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 border-b-2 border-amber-400 pb-2 inline-block px-8">
                {student.name}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 font-mono">
                學號：{student.studentId}　｜　所屬科系：{student.department || '餐飲廚藝管理系'}
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium pt-2">
                已完整研習並精熟<strong>「廚房安全衛生守則 Chapter 1」</strong>課程內容，涵蓋食品衛生詞源哲學、WHO 國際食品鏈規範、Food Protection 三大支柱、食安法第 8 條與第 14 條法規裁罰辨析，以及最新修正之 GHP 良好衛生規範準則，特頒此證以資證明。
              </p>
            </div>

            {/* Performance Badges */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto py-2">
              <div className="p-3 rounded-2xl bg-white border border-amber-200">
                <div className="text-[11px] text-slate-500 font-semibold">字卡掌握度</div>
                <div className="text-base sm:text-lg font-black text-amber-800 font-mono">
                  {cardPercent}%
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-amber-200">
                <div className="text-[11px] text-slate-500 font-semibold">模擬測驗成績</div>
                <div className="text-base sm:text-lg font-black text-amber-800 font-mono">
                  {lastQuizAttempt ? `${lastQuizAttempt.score}分` : '待測驗'}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-amber-200">
                <div className="text-[11px] text-slate-500 font-semibold">情境分析通關</div>
                <div className="text-base sm:text-lg font-black text-amber-800 font-mono">
                  {completedScenarioIds.length} / {SCENARIO_CASES.length}
                </div>
              </div>
            </div>

            {/* Footer Signatures */}
            <div className="flex items-end justify-between pt-8 border-t border-amber-200/80 text-xs text-slate-600 px-4">
              <div className="text-left space-y-1">
                <div>研習發證日期：<span className="font-semibold text-slate-800">{currentDate}</span></div>
                <div>證書編號：<span className="font-mono font-bold text-slate-800">FS-2026-{student.studentId || '001'}</span></div>
              </div>

              <div className="text-center space-y-1">
                <div className="w-32 border-b border-slate-400 pb-1 font-serif font-bold text-slate-700">
                  授課教師 / 衛管負責人
                </div>
                <div className="text-[10px] text-slate-400">核簽核發章</div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- DOCUMENT B: 完整成績報告單 ---------------- */}
        {docType === 'fullReport' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b-2 border-slate-800 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                  學習評鑑報告
                </span>
                <h1 className="text-xl sm:text-3xl font-black text-slate-900 mt-1">
                  廚房安全衛生守則 個人學習成就與測驗成績單
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chapter 1 課程涵蓋：Sanitation 概念、WHO 歷程、Food Protection、兩大法條與 GHP 修正
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs text-slate-500">報告列印日期</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800">{currentDate}</div>
              </div>
            </div>

            {/* Student metadata grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">學生學號</span>
                <span className="font-mono font-black text-slate-800 text-sm">{student.studentId}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">學生姓名</span>
                <span className="font-black text-slate-800 text-sm">{student.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">班級 / 科系</span>
                <span className="font-semibold text-slate-700">{student.department || '餐飲管理系'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">總體評鑑結果</span>
                <span className={`font-black text-xs px-2 py-0.5 rounded-md ${
                  isAllPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {isAllPassed ? '✓ 研習合格通過' : '進行中（建議加強）'}
                </span>
              </div>
            </div>

            {/* Performance Metrics Overview */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-700" />
                <span>各項模組學習成效統計</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Metric 1 */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>核心字卡掌握度</span>
                    <span className="font-mono font-bold text-amber-800">{masteredCardIds.length}/{FLASHCARD_DATA.length} 題</span>
                  </div>
                  <div className="text-2xl font-black text-slate-800 font-mono">
                    {cardPercent}%
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full"
                      style={{ width: `${cardPercent}%` }}
                    />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>模擬測驗總分</span>
                    <span className="font-mono font-bold text-amber-800">{QUIZ_QUESTIONS.length} 題題庫</span>
                  </div>
                  <div className="text-2xl font-black text-slate-800 font-mono">
                    {lastQuizAttempt ? `${lastQuizAttempt.score} 分` : '尚未作答'}
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full"
                      style={{ width: `${quizScore}%` }}
                    />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>情境案例通過數</span>
                    <span className="font-mono font-bold text-amber-800">{completedScenarioIds.length}/{SCENARIO_CASES.length} 案例</span>
                  </div>
                  <div className="text-2xl font-black text-slate-800 font-mono">
                    {scenarioPercent}%
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full"
                      style={{ width: `${scenarioPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Core Knowledge Appendix Table for review */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-700" />
                <span>重點法規與核心知識複習清單 (GHP / 食安法第 8 條 vs 第 14 條)</span>
              </h2>

              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-100 font-bold text-slate-700">
                    <tr>
                      <th className="p-2.5 border-b border-slate-200 w-1/4">法規名稱</th>
                      <th className="p-2.5 border-b border-slate-200 w-1/6">法源與屬性</th>
                      <th className="p-2.5 border-b border-slate-200 w-1/4">處罰方式</th>
                      <th className="p-2.5 border-b border-slate-200 w-1/3">違規罰則</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px]">
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">食品良好衛生規範準則 (GHP)</td>
                      <td className="p-2.5 text-slate-600">食安法第 8 條 (中央法)</td>
                      <td className="p-2.5 font-bold text-amber-800">間接罰 (必須先限期改正)</td>
                      <td className="p-2.5 text-slate-700">未限期改正者罰 6 萬元 ～ 2 億元</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">公共飲食場所衛生之管理辦法</td>
                      <td className="p-2.5 text-slate-600">食安法第 14 條 (地方法)</td>
                      <td className="p-2.5 font-bold text-rose-800">直接罰 (立即罰，不可限期改正！)</td>
                      <td className="p-2.5 text-slate-700">逕行裁處 3 萬 ～ 300 萬元</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Latest GHP Key Points Checklist */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>最新公告修正 GHP 準則六大實務重點複習</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>1. 即食食品手部防護：</strong> 調理即食食品手部不得同時或接續碰觸金錢或污染物品。
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>2. 時間與溫度控管：</strong> 室溫存放不得超過 2 小時；熟食熱藏保持 60°C 以上。
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>3. 體檢剔除結核病：</strong> 空氣飛沫傳染非食品污染，改著重於食品媒介傳染病。
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>4. 教育訓練時數：</strong> 新進人員至少 3 小時，從業期間每年至少 3 小時；作業現場應戴口罩。
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>5. 添加物三專管理：</strong> 專區、專人、專冊落實管理；製程品管擴大為所有食品業者。
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>6. 外送平台與物流：</strong> 增訂外送平台納入衛生規範，並抽測冷鏈車廂體內環境溫度。
                </div>
              </div>
            </div>

            {/* Signature & Verification Footnotes */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 text-xs text-slate-500">
              <div>
                學生簽章：<span className="border-b border-slate-400 inline-block w-24"></span>
              </div>
              <div>
                授課教師 / 評量主管簽核：<span className="border-b border-slate-400 inline-block w-32"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
