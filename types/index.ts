// 类型定义文件 —— 全局数据结构

// ===== 任务/计划 =====
export type Priority = "low" | "medium" | "high";

export type TaskCategory = "效率" | "健康" | "学习" | "生活" | "其他";

export interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  duration: number; // 预计时长（分钟）
  category: TaskCategory;
  priority: Priority;
  note?: string;
  completed: boolean;
  createdAt: string;
}

// ===== 收藏 =====
export interface Favorite {
  id: string;
  name: string;
  url: string;
  category: string;
  tags: string[];
  note?: string;
  createdAt: string;
}

// ===== 运动打卡 =====
export type SportType =
  | "跑步"
  | "步行"
  | "骑行"
  | "力量"
  | "瑜伽"
  | "拉伸"
  | "自定义";

export interface SportRecord {
  id: string;
  type: SportType;
  duration: number; // 分钟
  calories: number; // 千卡
  date: string;
  note?: string;
}

// ===== 读书计划 =====
export interface Book {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
  planDate?: string; // 计划完成日期
  status: "reading" | "done";
  coverColor: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ReadingSessionStatus = "active" | "completed" | "cancelled";

export interface ReadingSession {
  id: string;
  userId: string;
  bookId: string;
  status: ReadingSessionStatus;
  startedAt: string;
  endedAt?: string;
  activeSeconds: number;
  lastResumedAt?: string;
  progressStart: number;
  progressEnd?: number;
  reflectionText?: string;
  createdAt: string;
  updatedAt: string;
}

// ===== AI 技巧库 =====
export type AITipCategory =
  | "提示词技巧"
  | "写作"
  | "学习"
  | "图片生成";

export interface AITip {
  id: string;
  title: string;
  scenario: string;
  prompt: string;
  category: AITipCategory;
  level: "入门" | "进阶";
}

// ===== 心情日记 =====
export type MoodType =
  | "开心"
  | "平静"
  | "疲惫"
  | "焦虑"
  | "难过"
  | "兴奋";

export interface MoodRecord {
  id: string;
  date: string;
  mood: MoodType;
  content: string;
  tags: string[];
}

// ===== 灵感泡泡 =====
export interface Inspiration {
  id: string;
  content: string;
  color: string;
  size: number; // 气泡尺寸
  createdAt: string;
}

// ===== 语言学习 =====
export type WordStatus = "新词" | "学习中" | "已掌握";

export interface LanguageWord {
  id: string;
  word: string;
  meaning: string;
  example: string;
  status: WordStatus;
  language: string;
}

// ===== 成长树 =====
export type Season = "spring" | "summer" | "autumn" | "winter";

export interface GrowthData {
  totalValue: number; // 累计成长值
  streakDays: number; // 连续记录天数
  weekValue: number; // 本周成长值
  monthMilestone: string; // 本月里程碑
  stage: number; // 树木生长阶段 1-5
  season: Season;
}
