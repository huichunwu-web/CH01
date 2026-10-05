import React, { useState } from 'react';
import {
  FileCheck2,
  Scale,
  ShieldCheck,
  Search,
  BookOpen,
  AlertCircle,
  Truck,
  Sparkles,
  ThermometerSnowflake,
  ClipboardList,
} from 'lucide-react';
import { REGULATIONS_LIST, CORE_TWO_LAWS } from '../data/regulations';

export const RegulationsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredRegulations = REGULATIONS_LIST.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-amber-100">
        <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
          <FileCheck2 className="w-4 h-4" />
          <span>餐飲法規標準庫 (Regulations Reference)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          我國餐飲安全衛生法規與 GHP 最新修正要點
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          彙整投影片第 17 至 21 頁關鍵規範：食安法第 8 條與第 14 條兩大核心法條對比、21 項餐飲安全衛生法規，以及衛福部食藥署最新 GHP 修正要點。
        </p>
      </div>

      {/* CORE TWO LAWS COMPARISON (SLIDE 19) */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-md space-y-4">
        <div className="flex items-center gap-2 text-amber-900 pb-2 border-b border-amber-100">
          <Scale className="w-5 h-5 text-amber-700" />
          <h3 className="text-lg font-black tracking-tight">
            伍、餐飲業者一般衛生管理兩大核心法條對照表（必考重點）
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-amber-100/70 text-amber-950 font-bold">
                <th className="p-3.5 rounded-l-xl w-1/4 border-b border-amber-200">比較項目</th>
                <th className="p-3.5 w-3/8 border-b border-amber-200">
                  食品良好衛生規範準則 (GHP)
                </th>
                <th className="p-3.5 rounded-r-xl w-3/8 border-b border-amber-200">
                  公共飲食場所衛生之管理辦法
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="p-3.5 font-bold text-slate-800 bg-slate-50/50">法源依據</td>
                <td className="p-3.5 text-amber-800 font-bold bg-amber-50/30">
                  食品安全衛生管理法 <span className="underline decoration-amber-500">第 8 條</span>
                </td>
                <td className="p-3.5 text-rose-800 font-bold bg-rose-50/30">
                  食品安全衛生管理法 <span className="underline decoration-rose-500">第 14 條</span>
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-800 bg-slate-50/50">法律屬性</td>
                <td className="p-3.5 text-slate-700">中央法（全國一致適用）</td>
                <td className="p-3.5 text-slate-700">地方法（直轄市、縣市自治辦法）</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-800 bg-slate-50/50">處罰方式</td>
                <td className="p-3.5 text-amber-900 font-bold bg-amber-50/30">
                  【間接罰】（依法必須先「限期改正」）
                </td>
                <td className="p-3.5 text-rose-900 font-bold bg-rose-50/30">
                  【直接罰】（立即罰，不可限期改正！）
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-800 bg-slate-50/50">違規罰則</td>
                <td className="p-3.5">
                  <span className="font-bold text-amber-700">限期改正</span>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    未限期改正者，處 <span className="font-bold text-rose-600">6 萬元 ～ 2 億元</span>
                  </div>
                </td>
                <td className="p-3.5">
                  <span className="font-bold text-rose-600">立即開罰！</span>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    逕行裁處 <span className="font-bold text-rose-600">3 萬 ～ 300 萬元</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>口訣記憶：</strong>中央 8 條 GHP 限改未改罰 6 萬至 2 億；地方 14 條公共飲食辦法直接罰 3 萬至 300 萬，不可限期改正！
          </span>
        </div>
      </div>

      {/* LATEST GHP REVISIONS BREAKDOWN (SLIDES 20-21) */}
      <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          <h3 className="text-lg font-black text-slate-800">
            公告修正「食品良好衛生規範 (GHP) 準則」核心摘要說明
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>即食食品防污染</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              增訂調理即食食品，<strong>手部不得同時或接續接觸金錢或其他有污染之虞物品</strong>，徹底斷絕收銀出餐交叉污染。
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <ThermometerSnowflake className="w-2 h-2 rounded-full bg-amber-600" />
              <span>時間與溫度管理</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>室溫下不得存放 2 小時以上</strong>；熟食及易腐敗菜餚應及時冷藏；<strong>熟食之熱藏溫度應保持在 60°C 以上</strong>。
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>從業人員體檢變革</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>體檢刪除結核病檢查</strong>：因結核病係透過空氣飛沫傳染，非屬透過食品污染傳染之疾病。
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>教育訓練與口罩要求</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              新進從業人員至少 <strong>3 小時訓練</strong>；在職期間<strong>每年至少 3 小時</strong>教育訓練；作業場所工作新增<strong>應戴口罩</strong>。
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Truck className="w-2 h-2 rounded-full bg-amber-600" />
              <span>外送平台與運輸抽溫</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              食品物流業增訂<strong>「外送平台業者」</strong>納入管理；規範<strong>抽測運輸車廂體內環境溫度</strong>。
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <ClipboardList className="w-2 h-2 rounded-full bg-amber-600" />
              <span>添加物三專與適用對象</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              食品添加物販售及使用增訂<strong>「三專」（專區、專人、專冊）</strong>；製程及品管適用對象由製造業擴大為<strong>「所有食品業者」</strong>。
            </p>
          </div>
        </div>
      </div>

      {/* 21 LAWS AND REGULATIONS LIST (SLIDES 17-18) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-800">
              我國餐飲安全衛生 21 項相關法令規章清單
            </h3>
            <p className="text-xs text-slate-500">收錄投影片第 17 與 18 頁所列之完整 21 項法律命令</p>
          </div>

          {/* Filter and Search */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜尋法規名稱或簡介..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 bg-slate-50"
              />
            </div>
          </div>
        </div>

        {/* 21 items list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredRegulations.map((reg) => (
            <div
              key={reg.id}
              className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-amber-50/40 hover:border-amber-200 transition-all flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-xl bg-amber-600/10 text-amber-800 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                {reg.id}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  {reg.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {reg.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
