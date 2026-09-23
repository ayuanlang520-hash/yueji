// 模拟数据 —— 第一阶段高保真界面展示用
import type {
  Task,
  Favorite,
  SportRecord,
  Book,
  AITip,
  MoodRecord,
  Inspiration,
  LanguageWord,
  GrowthData,
} from "@/types";

// 今天日期（模拟）
export const TODAY = "2026-08-07";

// ===== 任务/计划 =====
export const mockTasks: Task[] = [
  {
    id: "t1",
    title: "整理本周读书笔记",
    date: "2026-08-06", // 逾期
    time: "21:00",
    duration: 30,
    category: "学习",
    priority: "high",
    note: "重点整理《认知觉醒》第三章",
    completed: false,
    createdAt: "2026-08-06T10:00:00",
  },
  {
    id: "t2",
    title: "跑步 30 分钟",
    date: "2026-08-07",
    time: "18:00",
    duration: 30,
    category: "健康",
    priority: "medium",
    note: "公园慢跑",
    completed: false,
    createdAt: "2026-08-07T08:00:00",
  },
  {
    id: "t3",
    title: "晨间冥想 10 分钟",
    date: "2026-08-07",
    time: "07:00",
    duration: 10,
    category: "生活",
    priority: "low",
    completed: true,
    createdAt: "2026-08-07T06:30:00",
  },
  {
    id: "t4",
    title: "学习法语单词 20 个",
    date: "2026-08-07",
    time: "20:00",
    duration: 25,
    category: "学习",
    priority: "medium",
    completed: false,
    createdAt: "2026-08-07T09:00:00",
  },
  {
    id: "t5",
    title: "阅读《认知觉醒》30 页",
    date: "2026-08-07",
    time: "21:30",
    duration: 40,
    category: "学习",
    priority: "low",
    completed: false,
    createdAt: "2026-08-07T09:05:00",
  },
];

// ===== 收藏 =====
export const mockFavorites: Favorite[] = [
  {
    id: "f1",
    name: "Next.js 官方文档",
    url: "https://nextjs.org/docs",
    category: "开发",
    tags: ["前端", "框架"],
    note: "App Router 部分重点看",
    createdAt: "2026-08-01",
  },
  {
    id: "f2",
    name: "Tailwind CSS 速查表",
    url: "https://tailwindcss.com/docs",
    category: "开发",
    tags: ["样式", "工具"],
    createdAt: "2026-08-02",
  },
  {
    id: "f3",
    name: "法语学习播客",
    url: "https://example.com/french-podcast",
    category: "学习",
    tags: ["法语", "听力"],
    note: "每天通勤听一集",
    createdAt: "2026-08-03",
  },
  {
    id: "f4",
    name: "正念冥想引导音频",
    url: "https://example.com/meditation",
    category: "生活",
    tags: ["冥想", "健康"],
    createdAt: "2026-08-04",
  },
];

// ===== 运动打卡 =====
export const mockSportRecords: SportRecord[] = [
  { id: "s1", type: "跑步", duration: 25, calories: 180, date: "2026-08-07" },
  { id: "s2", type: "瑜伽", duration: 30, calories: 90, date: "2026-08-06" },
  { id: "s3", type: "力量", duration: 40, calories: 220, date: "2026-08-05" },
  { id: "s4", type: "步行", duration: 35, calories: 120, date: "2026-08-04" },
  { id: "s5", type: "跑步", duration: 28, calories: 200, date: "2026-08-03" },
];

// 本周运动柱状图数据（周一到周日）
export const mockWeekSport = [
  { day: "一", minutes: 35 },
  { day: "二", minutes: 0 },
  { day: "三", minutes: 28 },
  { day: "四", minutes: 40 },
  { day: "五", minutes: 30 },
  { day: "六", minutes: 0 },
  { day: "日", minutes: 25 },
];

// ===== 读书计划 =====
export const mockBooks: Book[] = [
  {
    id: "b1",
    title: "认知觉醒",
    author: "周岭",
    totalPages: 280,
    currentPage: 182,
    planDate: "2026-08-20",
    status: "reading",
    coverColor: "#5A8C68",
  },
  {
    id: "b2",
    title: "原子习惯",
    author: "詹姆斯·克利尔",
    totalPages: 320,
    currentPage: 95,
    planDate: "2026-09-10",
    status: "reading",
    coverColor: "#7DA9C4",
  },
  {
    id: "b3",
    title: "深度工作",
    author: "卡尔·纽波特",
    totalPages: 296,
    currentPage: 296,
    planDate: "2026-07-30",
    status: "done",
    coverColor: "#E8B86D",
  },
];

// ===== AI 技巧库 =====
export const mockAITips: AITip[] = [
  {
    id: "a1",
    title: "角色扮演提示法",
    scenario: "需要专业领域建议时",
    prompt: "你现在是一位经验丰富的{角色}，请从你的专业角度分析以下问题：{问题}",
    category: "提示词技巧",
    level: "入门",
  },
  {
    id: "a2",
    title: "分步拆解法",
    scenario: "处理复杂任务时",
    prompt: "请将以下任务拆解为 5 个具体步骤，每步给出预期产出：{任务}",
    category: "提示词技巧",
    level: "进阶",
  },
  {
    id: "a3",
    title: "文章润色指令",
    scenario: "优化文章表达",
    prompt: "请润色以下文字，保持原意，让语言更简洁有力，输出修改前后对比：{文字}",
    category: "写作",
    level: "入门",
  },
  {
    id: "a4",
    title: "费曼学习法提问",
    scenario: "深入理解新知识",
    prompt: "请用费曼学习法帮我理解{概念}，先简单解释，再问我三个检验问题",
    category: "学习",
    level: "进阶",
  },
];

// ===== 心情日记 =====
export const mockMoodRecords: MoodRecord[] = [
  {
    id: "m1",
    date: "2026-08-07",
    mood: "开心",
    content: "今天完成了跑步目标，感觉很有成就感，继续保持。",
    tags: ["运动", "成就感"],
  },
  {
    id: "m2",
    date: "2026-08-06",
    mood: "平静",
    content: "读了一下午书，内心很安宁。",
    tags: ["阅读"],
  },
  {
    id: "m3",
    date: "2026-08-05",
    mood: "疲惫",
    content: "工作比较忙，但坚持完成了学习计划。",
    tags: ["工作", "坚持"],
  },
];

// ===== 灵感泡泡 =====
export const mockInspirations: Inspiration[] = [
  {
    id: "i1",
    content: "做一个每日复盘的模板",
    color: "#7DAB89",
    size: 100,
    createdAt: "2026-08-07T10:00:00",
  },
  {
    id: "i2",
    content: "学习用 SVG 画成长树",
    color: "#E8B86D",
    size: 80,
    createdAt: "2026-08-06T15:00:00",
  },
  {
    id: "i3",
    content: "把读书笔记做成卡片",
    color: "#7DA9C4",
    size: 90,
    createdAt: "2026-08-06T20:00:00",
  },
  {
    id: "i4",
    content: "尝试番茄工作法",
    color: "#D98B8B",
    size: 70,
    createdAt: "2026-08-05T11:00:00",
  },
];

// ===== 语言学习（法语示例） =====
export const mockLanguageWords: LanguageWord[] = [
  {
    id: "w1",
    word: "bonjour",
    meaning: "你好（日间问候）",
    example: "Bonjour, comment allez-vous ?",
    status: "已掌握",
    language: "法语",
  },
  {
    id: "w2",
    word: "merci",
    meaning: "谢谢",
    example: "Merci beaucoup pour votre aide.",
    status: "已掌握",
    language: "法语",
  },
  {
    id: "w3",
    word: "apprendre",
    meaning: "学习",
    example: "J'apprends le français depuis un mois.",
    status: "学习中",
    language: "法语",
  },
  {
    id: "w4",
    word: "bibliothèque",
    meaning: "图书馆",
    example: "Je vais à la bibliothèque tous les jours.",
    status: "学习中",
    language: "法语",
  },
  {
    id: "w5",
    word: "réver",
    meaning: "梦想",
    example: "Je rêve de voyager en France.",
    status: "新词",
    language: "法语",
  },
];

// ===== 成长树 =====
export const mockGrowthData: GrowthData = {
  totalValue: 1280,
  streakDays: 28,
  weekValue: 145,
  monthMilestone: "连续学习满一个月",
  stage: 3,
  season: "summer",
};

// 成长树各阶段描述
export const growthStages = [
  { stage: 1, name: "种子", desc: "刚刚开始你的成长之旅" },
  { stage: 2, name: "幼苗", desc: "小苗破土，充满生机" },
  { stage: 3, name: "小树", desc: "枝叶渐丰，稳步向上" },
  { stage: 4, name: "大树", desc: "根深叶茂，果实累累" },
  { stage: 5, name: "苍天古树", desc: "参天而立，岁月沉淀" },
];
