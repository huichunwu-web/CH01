export interface RegulationItem {
  id: number;
  name: string;
  category: 'core' | 'school' | 'standard' | 'guideline';
  desc: string;
}

export const REGULATIONS_LIST: RegulationItem[] = [
  { id: 1, name: '食品安全衛生管理法', category: 'core', desc: '我國食品衛生安全之根本大法（104年2月4日更名）' },
  { id: 2, name: '食品衛生管理法解釋彙編（101年12月）', category: 'core', desc: '主管機關歷年法條行政釋示與執行指引' },
  { id: 3, name: '食品良好衛生規範準則 (GHP)', category: 'core', desc: '食安法第8條中央法規，食品業者通用良好作業規範' },
  { id: 4, name: '食品業者專門職業或技術證照人員設置及管理辦法', category: 'core', desc: '規範特定食品業聘用食品技師、營養師、技術士規定' },
  { id: 5, name: '食品安全管制系統準則 (HACCP)', category: 'core', desc: '危害分析重要管制點之系統化預防性自主管理' },
  { id: 6, name: '學校衛生法', category: 'school', desc: '維護校園健康環境與學生身心健全發展法源' },
  { id: 7, name: '學校餐廳廚房員生消費合作社衛生管理辦法', category: 'school', desc: '校園餐飲與員生合作社餐食製造供餐規範' },
  { id: 8, name: '校園飲品及點心販售範圍', category: 'school', desc: '限制校園高糖、高鹽、油炸食品，保障學童營養' },
  { id: 9, name: '直轄市縣（市）政府及所屬中小學校辦理學校午餐應行注意事項', category: 'school', desc: '午餐招標、食材驗收、留樣與食安應變流程' },
  { id: 10, name: '餐盒食品工廠應符合「食品安全管制系統」相關規定', category: 'school', desc: '供應團膳便當工廠強制落實 HACCP 評鑑' },
  { id: 11, name: '食品工廠建築及設備設廠標準', category: 'standard', desc: '廠房分區（清潔區、準清潔區、污染區）與硬體動線規定' },
  { id: 12, name: '食品製造工廠衛生管理人員設置辦法', category: 'standard', desc: '指派合格衛生管理人員專責廠內衛生把關' },
  { id: 13, name: '食品添加物使用範圍及限量暨規格標準', category: 'standard', desc: '正面表列准許使用之添加物品項、劑量及使用限制' },
  { id: 14, name: '食品器具容器包裝衛生標準', category: 'standard', desc: '塑膠、金屬、紙質餐具溶出試驗與有害物質限量' },
  { id: 15, name: '一般食品衛生標準', category: 'standard', desc: '一般可食性產品之性狀、雜質與基本衛生規範' },
  { id: 16, name: '食品中微生物衛生標準', category: 'standard', desc: '沙門氏桿菌、李斯特菌、金黃色葡萄球菌等限量標準' },
  { id: 17, name: '食品中污染物質及毒素衛生標準', category: 'standard', desc: '重金屬、真菌毒素（如黃麴毒素）、農獸藥殘留限值' },
  { id: 18, name: '食品中毒案件處理要點', category: 'guideline', desc: '疑似群聚中毒事件採樣、通報、停業與調查SOP' },
  { id: 19, name: '餐具清洗良好作業指引', category: 'guideline', desc: '餐具三槽式洗滌法（洗滌、沖洗、殺菌）與乾燥標準' },
  { id: 20, name: '公告指定應設置衛生管理人員之食品製造工廠類別', category: 'guideline', desc: '水產、肉品、乳品等指定高風險業別衛管要求' },
  { id: 21, name: '降低食品中塑化劑含量之企業指引', category: 'guideline', desc: '避免加工管道與包材塑化劑溶出至食品之防治指引' }
];

export const CORE_TWO_LAWS = {
  ghp: {
    title: '食品良好衛生規範準則 (GHP)',
    lawBasis: '食品安全衛生管理法 第 8 條',
    nature: '中央法規',
    penaltyType: '間接罰（限期改正）',
    fine: '屆期未限期改正者，處新台幣 6 萬元 ～ 2 億元罰鍰',
    keyAspect: '全國統一遵循準則，若初查不合格須先限期令其改善'
  },
  publicDine: {
    title: '公共飲食場所衛生之管理辦法',
    lawBasis: '食品安全衛生管理法 第 14 條',
    nature: '地方自治法規',
    penaltyType: '直接罰（立即罰，不可限期改正！）',
    fine: '當場逕行裁處新台幣 3 萬 ～ 300 萬元罰鍰',
    keyAspect: '直轄市/縣市地方主管機關實施，查獲違失當場開罰無寬限期'
  }
};
