import { FlashcardItem } from '../types';

export const FLASHCARD_DATA: FlashcardItem[] = [
  {
    id: 'fc-1',
    category: 'concept',
    categoryName: '核心概念',
    title: 'Sanit 的縮寫與深層意涵',
    question: 'Sanit 代表什麼縮寫？如果將「Sanit」拆開五個字母，各自代表什麼意義？',
    answer: 'Sanit 是 Sanitation 的縮寫，代表「衛生、清潔」。拆開五個字母分別為：\nS - Safety\na - always\nn - needs\ni - I\nt - targeting\n整句意涵為：「Safety always needs I targeting」（餐飲安全永遠是我的目標）。',
    mnemonic: '「S-a-n-i-t」＝ 餐飲安全永遠是我的目標！',
    keyPoints: [
      'Sanit 是 Sanitation 的簡稱',
      'Safety always needs I targeting',
      '餐飲從業人員必須將安全當成個人永恆使命'
    ]
  },
  {
    id: 'fc-2',
    category: 'concept',
    categoryName: '核心概念',
    title: 'Sanit + y 延伸哲學：Sanity & Saint',
    question: 'Sanit 加上「y」變成 Sanity，在廚房衛生態度上有何啟示？若徹底做到餐飲安全可昇華為什麼？',
    answer: 'Sanit (衛生) + y = sanity，意指「正經八百（明智）」。告訴我們做好衛生必須以非常認真、睿智的態度去執行，絕不可敷衍了事，衛生是沒有妥協空間的！餐飲業者若將餐飲安全做徹底了，就可以轉成「Saint（超凡入聖）」，成為企業永續經營最好的基石。',
    mnemonic: '衛生要 Sanity（正經八百），做徹底成 Saint（超凡入聖）！',
    keyPoints: [
      'Sanity 代表明智、正經八百，衛生絕無妥協空間',
      '做徹底後達到 Saint 等級，是永續經營基石'
    ]
  },
  {
    id: 'fc-3',
    category: 'terminology',
    categoryName: '術語辨析',
    title: 'Sanitation 與 Hygiene 的差異比較',
    question: '英文中「Sanitation」與「Hygiene」在餐飲衛生中如何嚴格區分？中文「衛生」與「清潔」有何差別？',
    answer: '1. Sanitation：偏重「物體及設備」的衛生（如環境消毒、設備清洗）。\n2. Hygiene：傾向「個人操作」的衛生（如洗手SOP、配戴口罩手套）。\n3. 中文差異：\n★ 衛生 ＝ 清潔 ＋ 人員操作\n★ 清潔 → 則單純指去除污垢，不包含人員操作行爲。',
    mnemonic: '物體設備看 Sanitation，個人操作看 Hygiene；衛生包含人，清潔只除塵！',
    keyPoints: [
      'Sanitation ＝ 物體設備衛生',
      'Hygiene ＝ 個人操作衛生',
      '中文定義：衛生 ＝ 清潔 ＋ 人員操作'
    ]
  },
  {
    id: 'fc-4',
    category: 'who_history',
    categoryName: 'WHO與國際歷程',
    title: '世界衛生組織 (WHO) 對食品安全之定義',
    question: '世界衛生組織 (WHO) 如何定義食品安全？其涵蓋的範圍為何？',
    answer: '世界衛生組織 (WHO) 定義：「食品安全旨在確保所有食品盡可能安全的行動。食品安全政策和行動需要涵蓋從農場到餐盤整個食品鏈。」',
    keyPoints: [
      '目標：確保所有食品盡可能安全',
      '政策涵蓋整個食品鏈：從農場到餐盤 (From Farm to Plate)'
    ]
  },
  {
    id: 'fc-5',
    category: 'who_history',
    categoryName: 'WHO與國際歷程',
    title: 'WHO 國際食安里程碑與用字演變',
    question: '世衛組織在 2000 年與 2015 年有何重大宣示？對於食品鏈用字從何演變？',
    answer: '1. 2000年：通過決議【採認食品安全是公共衛生一項重要功能】。\n2. 2015年4月7日：WHO 年慶正式訂該日為「食品安全日」。\n3. 用字演變：過去慣稱「From Farm to Table（從農場到餐桌）」，現已改為「From Farm to Plate（從農場到餐盤）」，更加精確著重於最終直接食用之盛盤環節。',
    mnemonic: '2000年認功能，2015訂食安日；Table 變 Plate，防護到餐盤！',
    keyPoints: [
      '2000年決議：食品安全是公衛重要功能',
      '2015/4/7：WHO年慶訂為食品安全日',
      'Table 改為 Plate（餐盤）'
    ]
  },
  {
    id: 'fc-6',
    category: 'who_history',
    categoryName: 'WHO與國際歷程',
    title: '「食品衛生」轉變成「食品安全」之關鍵契機',
    question: '什麼歷史事件促使全世界廣泛由「食品衛生」改稱為「食品安全」？我國法規又是何時順應更名？',
    answer: '1. 國際契機：美國 911 恐怖事件發生後，世界各國紛紛將「食品衛生」改為更具防禦威脅意涵的「食品安全 (Food Safety)」。\n2. 安全定義：沒有危險，不受損害，不受威脅；食品安全即「食物不帶有危險性」。\n3. 台灣更名：我國沿用長達 40 年的《食品衛生管理法》，於民國 104 年 (2015) 2 月 4 日正式更名為《食品安全衛生管理法》。',
    mnemonic: '911 後轉安全，民國104年2月4日台灣修食安衛生法！',
    keyPoints: [
      '911事件前多稱食品衛生，911後全球改稱食品安全 (Food Safety)',
      '安全＝沒有危險、不受損害、不受威脅',
      '台灣於104年2月4日正式更名為《食品安全衛生管理法》'
    ]
  },
  {
    id: 'fc-7',
    category: 'food_protect',
    categoryName: '食品防護體系',
    title: '最高境界：Food Protection (食品防護) 三大支柱',
    question: '食品安全目前最高境界為 Food Protection，其包含哪三大支柱？其中 Food Safety 與 Food Defense 有何根本差異？',
    answer: 'Food Protection 包含三大支柱交集：\n1. Food Safety (食品安全)：防範「偶然 / 意外污染 (Unintentional)」，以 HACCP 預防，可根據加工合理預測。\n2. Food Defense (食品防禦)：防範「有意 / 蓄意食安污染 (Intentional)」，蓄意攻擊難以預測。\n3. Food Quality (食品品質)。',
    mnemonic: 'Protection 三本柱：Safety(意外可測)+Defense(蓄意難測)+Quality(品質)！',
    keyPoints: [
      'Food Safety：偶然/意外污染，HACCP預防，可合理預測',
      'Food Defense：蓄意/人為惡意污染，很難預測',
      'Food Quality：維持良好食品品質'
    ]
  },
  {
    id: 'fc-8',
    category: 'food_protect',
    categoryName: '食品防護體系',
    title: 'Food Protection 四大涵蓋範圍與最高標章',
    question: 'Food Protection 涵蓋的四大範圍是什麼？目前國際上針對 Food Protection 驗證的最高水準標章為何？',
    answer: '【四大範圍】：\n1. 食品要足夠且來源要穩定。\n2. 食品品質要好且營養衛生與安全。\n3. 食品要防範可能遭受的恐怖攻擊。\n4. 食品與社會、經濟、物理等要有關聯性。\n【最高標章】：SQF (Safe Quality Food Certified) 標章，正是專門針對 Food Protection 進行嚴格國際驗證。',
    mnemonic: '足夠穩定、品質安全、防範恐攻、社會關聯；最高標章認 SQF！',
    keyPoints: [
      '四大範疇比單純衛生安全更加宏觀廣闊',
      'SQF 是目前針對 Food Protection 進行驗證的最高水準國際標章'
    ]
  },
  {
    id: 'fc-9',
    category: 'regulations',
    categoryName: '法規與罰則',
    title: '兩大核心衛生法條：GHP vs 公共飲食場所辦法',
    question: '請比較「食品良好衛生規範準則」與「公共飲食場所衛生之管理辦法」之法源依據、中央/地方屬性、處罰方式及罰鍰金額。',
    answer: '★ 食品良好衛生規範準則 (GHP)：\n- 法源：食安法【第 8 條】\n- 屬性：【中央法】\n- 處罰方式：【間接罰】(必須先「限期改正」)\n- 罰則：屆期未改善者處【6 萬元 ～ 2 億元】\n\n★ 公共飲食場所衛生之管理辦法：\n- 法源：食安法【第 14 條】\n- 屬性：【地方法】\n- 處罰方式：【直接罰】(立即開罰，不可限期改正！)\n- 罰則：直接開罰【3 萬 ～ 300 萬元】',
    mnemonic: '8條中央GHP先限改(6萬~2億)；14條地方公共辦法直接罰(3萬~300萬)！',
    keyPoints: [
      '第 8 條 ＝ 中央法 ＝ 間接罰 (限期改善) ＝ 6萬~2億',
      '第 14 條 ＝ 地方法 ＝ 直接罰 (不得限改立即罰) ＝ 3萬~300萬',
      '此為衛生稽查實務與證照考試必考重點'
    ]
  },
  {
    id: 'fc-10',
    category: 'ghp_revision',
    categoryName: '最新GHP修正',
    title: 'GHP 修正要點：即時食品、時間與溫度控管',
    question: '最新公告修正 GHP 對於「調理即食食品手部接觸」與「室溫存放時間及熟食熱藏溫度」有何嚴格規範？',
    answer: '1. 手部防污染：調理即食食品時，手部【不得同時或接續接觸金錢或其他有污染之虞物品】。\n2. 室溫極限：室溫下【不得存放超過 2 小時】，熟食及易腐敗菜餚應及時冷藏。\n3. 熱藏標準：熟食之熱藏溫度必須【保持在攝氏 60 度以上】。',
    mnemonic: '即食不摸錢、室溫不逾2小時、熱藏維持60度以上！',
    keyPoints: [
      '調理即食食品嚴禁手摸金錢或污染物品',
      '危險溫度帶警示：室溫不可超過 2 小時',
      '熟食熱藏溫度 ≥ 60°C'
    ]
  },
  {
    id: 'fc-11',
    category: 'ghp_revision',
    categoryName: '最新GHP修正',
    title: 'GHP 修正要點：從業人員體檢、訓練與裝備',
    question: '最新 GHP 準則中，從業人員體檢刪除了哪一個項目？原因為何？新進及在職從業人員每年教育訓練要求幾小時？工作必備裝備？',
    answer: '1. 體檢變更：【刪除結核病檢查】。原因為結核病係透過空氣飛沫傳染，非屬透過食品媒介污染傳播之疾病。\n2. 教育訓練：\n- 新進食品從業人員（含管理人員）：應經【至少 3 小時】訓練。\n- 從業期間：【每年至少 3 小時】教育訓練。\n3. 工作裝備：作業場所工作【新增應戴口罩】。',
    mnemonic: '刪結核（空氣傳染非食安），新進年年各3小時訓，上工必戴口罩！',
    keyPoints: [
      '體檢刪除結核病檢查（非食品媒介感染）',
      '新進從業人員 ≥ 3 小時訓練；在職每年 ≥ 3 小時訓練',
      '作業現場強制規定配戴口罩'
    ]
  },
  {
    id: 'fc-12',
    category: 'ghp_revision',
    categoryName: '最新GHP修正',
    title: 'GHP 修正要點：外送平台、運輸抽溫、添加物三專與適用對象',
    question: '最新 GHP 修正如何納管外送平台？運輸車輛？食品添加物管理原則？法規適用對象擴大到誰？',
    answer: '1. 強化食品外送：物流業增訂【外送平台業者】，外送員及過程均須遵循衛生規範。\n2. 貯存運輸：增訂變更設定需有合理原因，且須【抽測運輸車廂體內環境溫度】。\n3. 食品添加物販售管理：增訂【三專管理】（專區、專人、專冊）。\n4. 製程及品管適用對象：由原本單純「製造業」擴大為【所有食品業者】。',
    mnemonic: '外送平台納入管，車廂抽測箱溫，添加物要三專（區/人/冊），擴及所有業者！',
    keyPoints: [
      '外送平台業者納入物流外送衛生管理',
      '冷鏈運輸車廂環境溫度加強抽測',
      '添加物落實三專：專區、專人、專冊管理',
      'GHP 製程品管擴及「所有食品業者」'
    ]
  }
];
