import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: '概念與詞源',
    type: 'single',
    question: '在講義中，將「Sanit」五個英文字母拆解展開，其所代表的核心意義為何？',
    options: [
      { id: 'a', text: 'Safety always needs I targeting（餐飲安全永遠是我的目標）' },
      { id: 'b', text: 'Service always needs international technology（服務永遠需要國際科技）' },
      { id: 'c', text: 'Sanitation allows natural ingredients tested（衛生允許檢測天然食材）' },
      { id: 'd', text: 'Strict action normalizes inspection time（嚴格行動規範檢驗時間）' }
    ],
    correctAnswerId: 'a',
    explanation: '投影片第 2 頁特別強調 Sanit 拆開為「Safety always needs I targeting」，意指「餐飲安全永遠是我的目標」，期許從業人員將安全視為個人的使命。',
    lawRef: '教材第 2 頁'
  },
  {
    id: 'q2',
    category: '概念與詞源',
    type: 'single',
    question: '教材提及「Sanit (衛生) + y = sanity」，代表餐飲從業人員在執行衛生時應具備何種精神？',
    options: [
      { id: 'a', text: '只要成本允許，偶爾妥協無妨' },
      { id: 'b', text: '正經八百（明智），衛生是沒有妥協的空間' },
      { id: 'c', text: '主要應付衛生局稽查即可' },
      { id: 'd', text: '追求華麗盤飾優於基礎清潔' }
    ],
    correctAnswerId: 'b',
    explanation: '投影片第 3~4 頁：「Sanity 代表正經八百（明智），做好衛生一定要正經八百，非常認真睿智地執行，絕對不可敷衍了事，衛生是沒有妥協的空間。」若做到徹底更能成「Saint（超凡入聖）」。',
    lawRef: '教材第 3~4 頁'
  },
  {
    id: 'q3',
    category: '術語辨析',
    type: 'single',
    question: '若要細緻區分英文「Sanitation」與「Hygiene」，以及中文「衛生」與「清潔」之內涵，下列敘述何者正確？',
    options: [
      { id: 'a', text: 'Sanitation 傾向個人操作衛生，Hygiene 偏重物體設備衛生' },
      { id: 'b', text: '中文用法上「清潔」包含人員操作，「衛生」則不包含' },
      { id: 'c', text: 'Sanitation 偏重物體及設備衛生，Hygiene 傾向個人操作衛生；中文「衛生」＝ 清潔 ＋ 人員操作' },
      { id: 'd', text: '兩者英文與中文完全沒有區別，只是同義詞隨機交替使用' }
    ],
    correctAnswerId: 'c',
    explanation: '投影片第 5 頁：Sanitation 偏重物體及設備衛生；Hygiene 較傾向個人操作衛生。在中文用法上：衛生 ＝ 清潔 ＋ 人員操作，清潔則不包含人員操作。',
    lawRef: '教材第 5 頁'
  },
  {
    id: 'q4',
    category: 'WHO與國際歷程',
    type: 'single',
    question: '世界衛生組織 (WHO) 過去常用「From Farm to Table（從農場到餐桌）」，現已改用下列何種用詞？',
    options: [
      { id: 'a', text: 'From Soil to Market（從土壤到市場）' },
      { id: 'b', text: 'From Farm to Plate（從農場到餐盤）' },
      { id: 'c', text: 'From Kitchen to Customer（從廚房到顧客）' },
      { id: 'd', text: 'From Store to Mouth（從商店到口中）' }
    ],
    correctAnswerId: 'b',
    explanation: '投影片第 8 頁指出：WHO 對食品安全用字的改變為「From Farm to Table 從農場到餐桌」轉變為「From Farm to Plate 從農場到餐盤」。',
    lawRef: '教材第 8 頁'
  },
  {
    id: 'q5',
    category: '國際歷史與國內法規',
    type: 'single',
    question: '美國發生何項重大歷史事件後，促使全世界各國紛紛將慣用的「食品衛生」轉變改稱為「食品安全 (food safety)」？',
    options: [
      { id: 'a', text: '波灣戰爭' },
      { id: 'b', text: '美國 911 恐怖事件' },
      { id: 'c', text: '千禧年危機' },
      { id: 'd', text: '2008 金融海嘯' }
    ],
    correctAnswerId: 'b',
    explanation: '投影片第 10 頁：美國 911 恐怖事件發生前全世界幾乎都稱「食品衛生」，911 事件後防恐與安全意識抬頭，世界各國紛紛改為「食品安全 (food safety)」。',
    lawRef: '教材第 10 頁'
  },
  {
    id: 'q6',
    category: '國內法規演進',
    type: 'single',
    question: '我國沿用 40 年的《食品衛生管理法》，於何時正式更名為《食品安全衛生管理法》？',
    options: [
      { id: 'a', text: '民國 99 年 1 月 1 日' },
      { id: 'b', text: '民國 101 年 12 月 25 日' },
      { id: 'c', text: '民國 104 年 2 月 4 日' },
      { id: 'd', text: '民國 110 年 7 月 1 日' }
    ],
    correctAnswerId: 'c',
    explanation: '投影片第 11 頁明確記載：我國沿用 40 年的《食品衛生管理法》，於民國 104 年 2 月 4 日更名為《食品安全衛生管理法》。',
    lawRef: '教材第 11 頁'
  },
  {
    id: 'q7',
    category: '食品防護體系',
    type: 'single',
    question: '現代食品安全最高境界為「Food Protection（食品防護）」，其核心三支柱為何？',
    options: [
      { id: 'a', text: 'Food Safety(食品安全)、Food Defense(食品防禦)、Food Quality(食品品質)' },
      { id: 'b', text: 'Food Nutrition(食品營養)、Food Cost(成本控管)、Food Delivery(外送品質)' },
      { id: 'c', text: 'Food Policy(政策)、Food Market(市場)、Food Cooking(烹調技巧)' },
      { id: 'd', text: 'Food Storage(保存)、Food Hygiene(個人衛生)、Food Service(外場服務)' }
    ],
    correctAnswerId: 'a',
    explanation: '投影片第 12 與 14 頁架構圖顯示，Food Protection (食品防護) 是由 Food Safety (FS 食品安全/HACCP)、Food Defense (FD 食品防禦) 與 Food Quality (FQ 食品品質) 三大支柱所構成。',
    lawRef: '教材第 12, 14 頁'
  },
  {
    id: 'q8',
    category: '食品防護體系',
    type: 'single',
    question: '關於「食品安全 (Food Safety)」與「食品防禦 (Food Defense)」的差異，下列何者正確？',
    options: [
      { id: 'a', text: '食品安全是防範有意破壞，食品防禦是預防偶然意外' },
      { id: 'b', text: '食品安全針對偶然/意外污染 (HACCP可合理預測)；食品防禦針對有意的食安污染 (很難預測)' },
      { id: 'c', text: '兩者皆可輕易透過 HACCP 徹底完全預測與消除' },
      { id: 'd', text: '食品防禦專門處理過期腐敗，食品安全專門處理恐怖攻擊' }
    ],
    correctAnswerId: 'b',
    explanation: '投影片第 13 頁：Food Safety 是偶然/意外污染 (UNintentional contamination)，可透過 HACCP 合理預測；Food Defense 則是防範有意的食安污染 (INTENTIONAL contamination)，蓄意犯罪很難預測。',
    lawRef: '教材第 13 頁'
  },
  {
    id: 'q9',
    category: '食品標章認證',
    type: 'single',
    question: '目前國際上針對「Food Protection (食品防護)」進行驗證、代表最高水準的標章是哪一個？',
    options: [
      { id: 'a', text: 'GMP 標章' },
      { id: 'b', text: 'CAS 優良農產品標章' },
      { id: 'c', text: 'SQF (Safe Quality Food Certified) 標章' },
      { id: 'd', text: 'ISO 9001 標章' }
    ],
    correctAnswerId: 'c',
    explanation: '投影片第 15 頁：「現在食品最高水準的標章：SQF，就是針對 Food Protection 進行驗證。」',
    lawRef: '教材第 15 頁'
  },
  {
    id: 'q10',
    category: '核心法規對比',
    type: 'single',
    question: '餐飲業者若違反《食品良好衛生規範準則 (GHP)》，其法源依據、處罰方式及罰則為何？',
    options: [
      { id: 'a', text: '食安法第 8 條，地方法，直接開罰 3~300 萬元' },
      { id: 'b', text: '食安法第 8 條，中央法，間接罰（限期改正，未改善者處 6 萬元~2 億元）' },
      { id: 'c', text: '食安法第 14 條，中央法，直接開罰 6 萬~2 億元' },
      { id: 'd', text: '食安法第 14 條，地方法，間接罰（限期改正，未改善處 3~300 萬）' }
    ],
    correctAnswerId: 'b',
    explanation: '投影片第 19 頁：食品良好衛生規範準則法源為食安法第 8 條，屬於「中央法」，採「間接罰」（限期改正，未限期改正者罰 6 萬元~2 億元）。',
    lawRef: '教材第 19 頁'
  },
  {
    id: 'q11',
    category: '核心法規對比',
    type: 'single',
    question: '餐飲業者若違反依食安法第 14 條訂定之《公共飲食場所衛生之管理辦法》，其處罰方式與額度為何？',
    options: [
      { id: 'a', text: '間接罰，必須給予 30 天限期改正期' },
      { id: 'b', text: '直接罰，立即開罰且不可限期改正，罰鍰 3 萬~300 萬元' },
      { id: 'c', text: '直接罰，處 6 萬~2 億元並勒令停業' },
      { id: 'd', text: '僅口頭勸導，不開罰' }
    ],
    correctAnswerId: 'b',
    explanation: '投影片第 19 頁表格：《公共飲食場所衛生之管理辦法》依食安法第 14 條，為「地方法」，採「直接罰（立即罰，不可限期改正）」，罰款「3 萬~300 萬元」。',
    lawRef: '教材第 19 頁'
  },
  {
    id: 'q12',
    category: 'GHP最新修正',
    type: 'single',
    question: '最新公告修正 GHP 準則中，針對「即食食品調理」與「收銀金錢接觸」之衛生管理有何明確要求？',
    options: [
      { id: 'a', text: '只要戴手套就可以同時收錢找零與調理生菜沙拉' },
      { id: 'b', text: '調理即食食品，手部不得同時或接續接觸金錢或其他有污染之虞物品' },
      { id: 'c', text: '碰過錢幣後只要在圍裙上擦乾手即可繼續備餐' },
      { id: 'd', text: '僅限外送人員不可接觸金錢，內場廚工不受限制' }
    ],
    correctAnswerId: 'b',
    explanation: '投影片第 20 頁增訂重點：調理即食食品，手部不得同時或接續接觸金錢或其他有污染之虞物品，避免金錢上的病菌交叉污染直接食用的食品。',
    lawRef: '教材第 20 頁'
  },
  {
    id: 'q13',
    category: 'GHP最新修正',
    type: 'single',
    question: '最新 GHP 規定中，餐飲業製備菜餚之時間與溫度管理標準，下列何者正確？',
    options: [
      { id: 'a', text: '室溫下不得存放超過 4 小時；熟食熱藏維持 50°C 以上' },
      { id: 'b', text: '室溫下不得存放超過 2 小時；熟食熱藏溫度保持在攝氏 60 度以上' },
      { id: 'c', text: '室溫下可存放 6 小時；熟食熱藏維持 70°C 以上' },
      { id: 'd', text: '熟食冷藏應保持在 15°C，熱藏保持在 45°C' }
    ],
    correctAnswerId: 'b',
    explanation: '投影片第 20 頁明訂：室溫下不得存放 2 小時以上，熟食及易腐敗菜餚應及時冷藏；熟食之熱藏溫度保持在攝氏 60 度以上。',
    lawRef: '教材第 20 頁'
  },
  {
    id: 'q14',
    category: 'GHP最新修正',
    type: 'single',
    question: '最新修正之 GHP 準則中，從業人員「體檢」項目為何刪除結核病檢查？',
    options: [
      { id: 'a', text: '因為檢查費用太昂貴' },
      { id: 'b', text: '因為結核病已在台灣完全絕跡' },
      { id: 'c', text: '因為結核病係透過空氣傳染，非屬透過食品污染傳染之疾病' },
      { id: 'd', text: '因為廚房高溫可以完全殺死結核桿菌' }
    ],
    correctAnswerId: 'c',
    explanation: '投影片第 20 頁：「體檢刪除結核病檢查：係透過空氣傳染，非屬透過食品污染之疾病。」因此從業人員體檢改著重食品媒介傳染病。',
    lawRef: '教材第 20 頁'
  },
  {
    id: 'q15',
    category: 'GHP最新修正',
    type: 'single',
    question: '最新 GHP 對於食品從業人員（含管理人員）的教育訓練時數規定為何？工作場所新增何項穿戴要求？',
    options: [
      { id: 'a', text: '新進人員至少 1 小時，在職每年 1 小時；作業場所應戴護目鏡' },
      { id: 'b', text: '新進人員至少 3 小時，從業期間每年至少 3 小時；作業場所工作新增應戴口罩' },
      { id: 'c', text: '新進人員免訓練，在職每兩年 6 小時；作業場所應戴耳塞' },
      { id: 'd', text: '主管每年 12 小時，基層免受訓；作業場所新增穿防護衣' }
    ],
    correctAnswerId: 'b',
    explanation: '投影片第 20 頁：新進食品從業人員（含管理人員）應經至少 3 小時訓練；從業期間每年至少 3 小時教育訓練。且作業場所工作新增「應戴口罩」。',
    lawRef: '教材第 20 頁'
  },
  {
    id: 'q16',
    category: '食品防護體系',
    type: 'single',
    question: '「食品防護 (Food Protection)」之涵蓋範圍較食品安全與食品防禦更加廣泛，下列何者「不屬於」其所包含之四大核心範疇？',
    options: [
      { id: 'a', text: '食品要足夠且來源要穩定' },
      { id: 'b', text: '食品品質要好且營養衛生與安全' },
      { id: 'c', text: '食品要防範可能遭受的恐怖攻擊' },
      { id: 'd', text: '食品外包裝必須全面印製知名網紅代言推薦' }
    ],
    correctAnswerId: 'd',
    explanation: 'Food Protection (食品防護) 範疇涵蓋四大核心：1. 食品要足夠且來源要穩定；2. 食品品質要好且營養衛生與安全；3. 食品要防範可能遭受的恐怖攻擊；4. 食品與社會、經濟、物理等要有關聯性。選項 D 不屬於法定食品防護四大範疇。',
    lawRef: '食品防護體系四大範疇'
  }
];
