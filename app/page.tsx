// 工作台首页 —— 仪表盘
"use client";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { mockTasks, mockGrowthData, TODAY } from "@/lib/mockData";
import {
  FlameIcon,
  PlusIcon,
  DumbbellIcon,
  BulbIcon,
  SmileIcon,
  CircleIcon,
  CheckIcon,
  ClockIcon,
  TagIcon,
} from "@/components/icons";
import type { Priority } from "@/types";

const priorityStyle: Record<Priority, string> = {
  high: "bg-red-50 text-red-500",
  medium: "bg-amber-50 text-amber-600",
  low: "bg-sage-50 text-sage-500",
};
const priorityLabel: Record<Priority, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

export default function HomePage() {
  const hour = new Date().getHours();
  let greeting = "早上好";
  if (hour >= 12 && hour < 18) greeting = "下午好";
  else if (hour >= 18 && hour < 22) greeting = "晚上好";
  else if (hour >= 22 || hour < 6) greeting = "夜深了";

  const todayTasks = mockTasks.filter((t) => t.date === TODAY);
  const overdueTasks = mockTasks.filter((t) => t.date < TODAY && !t.completed);
  const completedToday = todayTasks.filter((t) => t.completed).length;
  const completionRate = todayTasks.length
    ? Math.round((completedToday / todayTasks.length) * 100)
    : 0;
  const remaining = todayTasks.filter((t) => !t.completed).length;

  const quickActions = [
    {
      label: "新增计划",
      href: "/plan",
      icon: PlusIcon,
      color: "bg-sage-100 text-sage-600",
    },
    {
      label: "开始运动",
      href: "/sports",
      icon: DumbbellIcon,
      color: "bg-amber-100 text-accent-amber",
    },
    {
      label: "记录灵感",
      href: "/inspiration",
      icon: BulbIcon,
      color: "bg-sky-100 text-accent-sky",
    },
    {
      label: "记录心情",
      href: "/mood",
      icon: SmileIcon,
      color: "bg-rose-100 text-accent-rose",
    },
  ];

  const renderTask = (t: (typeof mockTasks)[number], overdue = false) => (
    <Card
      key={t.id}
      className={`flex items-center gap-3 ${overdue ? "border-l-4 border-l-accent-rose" : ""}`}
    >
      <div
        className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
          t.completed ? "bg-sage-500 text-white" : "bg-sage-100 text-sage-300"
        }`}
      >
        {t.completed ? <CheckIcon size={14} /> : <CircleIcon size={14} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p
            className={`text-sm font-medium truncate ${
              t.completed
                ? "text-sage-400 line-through"
                : overdue
                ? "text-red-500"
                : "text-sage-800"
            }`}
          >
            {overdue && (
              <span className="text-xs bg-red-100 text-red-500 px-1.5 py-0.5 rounded mr-1">
                逾期
              </span>
            )}
            {t.title}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-sage-400">
          <span className="flex items-center gap-1">
            <ClockIcon size={12} />
            {t.time}
          </span>
          <span className="flex items-center gap-1">
            <TagIcon size={12} />
            {t.category}
          </span>
          <span
            className={`px-1.5 py-0.5 rounded ${priorityStyle[t.priority]}`}
          >
            {priorityLabel[t.priority]}
          </span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 欢迎卡片 */}
      <div className="bg-gradient-to-br from-sage-500 to-sage-600 text-white rounded-3xl p-5 shadow-float">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-semibold">{greeting}，成长者</p>
            <p className="text-sm text-white/80 mt-1">
              2026年8月7日 周五 · 晴 28°
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <FlameIcon size={18} />
              <span className="text-2xl font-bold">
                {mockGrowthData.streakDays}
              </span>
            </div>
            <p className="text-xs text-white/70">连续打卡</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2.5">
          <span className="text-sm text-white/80">今日成长值</span>
          <span className="text-xl font-bold">+{mockGrowthData.weekValue}</span>
          <span className="ml-auto text-xs text-white/70">
            累计 {mockGrowthData.totalValue}
          </span>
        </div>
      </div>

      {/* 今日概览 */}
      <div>
        <h2 className="text-sm font-semibold text-sage-700 mb-2 px-1">
          今日概览
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <p className="text-xs text-sage-400">计划完成率</p>
            <p className="text-2xl font-bold text-sage-700 mt-1">
              {completionRate}%
            </p>
            <div className="mt-2 h-1.5 bg-sage-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sage-500 rounded-full transition-all"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </Card>
          <Card>
            <p className="text-xs text-sage-400">剩余计划</p>
            <p className="text-2xl font-bold text-sage-700 mt-1">
              {remaining}
              <span className="text-sm font-normal text-sage-400"> 项</span>
            </p>
            <p className="text-xs text-sage-400 mt-2">
              含 {overdueTasks.length} 项逾期
            </p>
          </Card>
          <Card>
            <p className="text-xs text-sage-400">运动时间</p>
            <p className="text-2xl font-bold text-sage-700 mt-1">
              25
              <span className="text-sm font-normal text-sage-400"> /40min</span>
            </p>
            <div className="mt-2 h-1.5 bg-sage-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-amber rounded-full"
                style={{ width: "62%" }}
              />
            </div>
          </Card>
          <Card>
            <p className="text-xs text-sage-400">阅读中</p>
            <p className="text-2xl font-bold text-sage-700 mt-1">
              2<span className="text-sm font-normal text-sage-400"> 本</span>
            </p>
            <p className="text-xs text-sage-400 mt-2">本周 180 分钟</p>
          </Card>
        </div>
      </div>

      {/* 今天要做 */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className="text-sm font-semibold text-sage-700">今天要做</h2>
          <Link href="/plan" className="text-xs text-sage-500">
            全部 →
          </Link>
        </div>
        <div className="space-y-2">
          {overdueTasks.map((t) => renderTask(t, true))}
          {todayTasks.map((t) => renderTask(t))}
        </div>
      </div>

      {/* 快捷入口 */}
      <div>
        <h2 className="text-sm font-semibold text-sage-700 mb-2 px-1">
          快捷入口
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(({ label, href, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}
              >
                <Icon size={24} />
              </div>
              <span className="text-xs text-sage-600">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
