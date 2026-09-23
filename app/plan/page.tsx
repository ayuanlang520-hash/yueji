// 每日计划页 —— 任务列表 + 新增/完成/删除
"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockTasks, TODAY } from "@/lib/mockData";
import {
  PlusIcon,
  CircleIcon,
  CheckIcon,
  ClockIcon,
  TagIcon,
  TrashIcon,
  CloseIcon,
  FlameIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons";
import type { Task, Priority, TaskCategory } from "@/types";

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
const categories: TaskCategory[] = ["效率", "健康", "学习", "生活", "其他"];

// 日期工具
function formatDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}
function addDays(dateStr: string, n: number) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return formatDate(d);
}
function dateLabel(dateStr: string) {
  const d = new Date(dateStr);
  const week = ["日", "一", "二", "三", "四", "五", "六"][d.getDay()];
  const isToday = dateStr === TODAY;
  return `${d.getMonth() + 1}月${d.getDate()}日 周${week}${isToday ? " · 今天" : ""}`;
}

export default function PlanPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [showAdd, setShowAdd] = useState(false);
  const [currentDate, setCurrentDate] = useState(TODAY);
  const [form, setForm] = useState({
    title: "",
    time: "",
    duration: 30,
    category: "效率" as TaskCategory,
    priority: "medium" as Priority,
    note: "",
  });

  const dayTasks = tasks
    .filter((t) => t.date === currentDate)
    .sort((a, b) => a.time.localeCompare(b.time));
  const overdueTasks = tasks.filter(
    (t) => t.date < currentDate && !t.completed
  );
  const completed = dayTasks.filter((t) => t.completed).length;
  const rate = dayTasks.length
    ? Math.round((completed / dayTasks.length) * 100)
    : 0;

  const toggleTask = (id: string) =>
    setTasks((ts) =>
      ts.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const deleteTask = (id: string) =>
    setTasks((ts) => ts.filter((t) => t.id !== id));
  const addTask = () => {
    if (!form.title.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: form.title,
      date: currentDate,
      time: form.time || "09:00",
      duration: Number(form.duration) || 30,
      category: form.category,
      priority: form.priority,
      note: form.note,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((ts) => [...ts, newTask]);
    setForm({
      title: "",
      time: "",
      duration: 30,
      category: "效率",
      priority: "medium",
      note: "",
    });
    setShowAdd(false);
  };

  const renderTaskItem = (t: Task, overdue = false) => (
    <Card
      key={t.id}
      className={`flex items-start gap-3 ${
        overdue ? "border-l-4 border-l-accent-rose" : ""
      }`}
    >
      <button
        onClick={() => toggleTask(t.id)}
        className={`shrink-0 w-6 h-6 mt-0.5 rounded-full flex items-center justify-center transition-colors ${
          t.completed
            ? "bg-sage-500 text-white"
            : "bg-sage-100 text-sage-300"
        }`}
      >
        {t.completed ? <CheckIcon size={14} /> : <CircleIcon size={14} />}
      </button>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
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
        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-sage-400">
          <span className="flex items-center gap-1">
            <ClockIcon size={12} />
            {t.time}
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon size={12} />
            {t.duration}min
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
        {t.note && (
          <p className="text-xs text-sage-400 mt-1.5 bg-sage-50 rounded-lg px-2 py-1">
            {t.note}
          </p>
        )}
      </div>
      <button
        onClick={() => deleteTask(t.id)}
        className="shrink-0 p-1.5 text-sage-300 hover:text-red-400"
      >
        <TrashIcon size={16} />
      </button>
    </Card>
  );

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 顶部统计 */}
      <div className="grid grid-cols-4 gap-2">
        <Card className="text-center !p-3">
          <p className="text-xl font-bold text-sage-700">{dayTasks.length}</p>
          <p className="text-xs text-sage-400">今日任务</p>
        </Card>
        <Card className="text-center !p-3">
          <p className="text-xl font-bold text-sage-700">{completed}</p>
          <p className="text-xs text-sage-400">已完成</p>
        </Card>
        <Card className="text-center !p-3">
          <p className="text-xl font-bold text-sage-700">{rate}%</p>
          <p className="text-xs text-sage-400">完成率</p>
        </Card>
        <Card className="text-center !p-3">
          <p className="text-xl font-bold text-sage-700 flex items-center justify-center gap-0.5">
            <FlameIcon size={16} />
            28
          </p>
          <p className="text-xs text-sage-400">连续打卡</p>
        </Card>
      </div>

      {/* 日期切换 */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-card px-3 py-2.5">
        <button
          onClick={() => setCurrentDate(addDays(currentDate, -1))}
          className="p-1.5 text-sage-500 active:bg-sage-100 rounded-lg"
        >
          <ChevronLeftIcon size={20} />
        </button>
        <span className="text-sm font-medium text-sage-700">
          {dateLabel(currentDate)}
        </span>
        <button
          onClick={() => setCurrentDate(addDays(currentDate, 1))}
          className="p-1.5 text-sage-500 active:bg-sage-100 rounded-lg"
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>

      {/* 逾期任务 */}
      {overdueTasks.length > 0 && (
        <div>
          <p className="text-xs text-red-400 font-medium px-1 mb-2">
            逾期未完成 · {overdueTasks.length} 项
          </p>
          <div className="space-y-2">
            {overdueTasks.map((t) => renderTaskItem(t, true))}
          </div>
        </div>
      )}

      {/* 今日任务 */}
      <div>
        <p className="text-xs text-sage-400 font-medium px-1 mb-2">
          今日计划 · {dayTasks.length} 项
        </p>
        {dayTasks.length === 0 ? (
          <Card className="text-center py-8 text-sage-400 text-sm">
            今天还没有计划，点击右下角 + 添加
          </Card>
        ) : (
          <div className="space-y-2">{dayTasks.map((t) => renderTaskItem(t))}</div>
        )}
      </div>

      {/* 悬浮新增按钮 */}
      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-20 right-4 md:bottom-6 w-14 h-14 bg-sage-500 text-white rounded-full shadow-float flex items-center justify-center active:scale-95 transition-transform z-30"
      >
        <PlusIcon size={28} />
      </button>

      {/* 新增弹窗 */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowAdd(false)}
          />
          <div className="relative bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-md p-5 max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-sage-800">新增计划</h3>
              <button
                onClick={() => setShowAdd(false)}
                className="p-1 text-sage-400"
              >
                <CloseIcon size={22} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-sage-400">计划名称</label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="输入计划名称"
                  className="w-full mt-1 px-3 py-2.5 rounded-xl border border-sage-200 focus:border-sage-400 focus:outline-none text-base text-sage-800"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-sage-400">计划时间</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full mt-1 px-3 py-2.5 rounded-xl border border-sage-200 focus:border-sage-400 focus:outline-none text-base text-sage-800"
                  />
                </div>
                <div className="w-28">
                  <label className="text-xs text-sage-400">时长(分钟)</label>
                  <input
                    type="number"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: Number(e.target.value) })
                    }
                    className="w-full mt-1 px-3 py-2.5 rounded-xl border border-sage-200 focus:border-sage-400 focus:outline-none text-base text-sage-800"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-sage-400">分类</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setForm({ ...form, category: c })}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        form.category === c
                          ? "bg-sage-500 text-white"
                          : "bg-sage-50 text-sage-600"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-sage-400">优先级</label>
                <div className="flex gap-2 mt-1">
                  {(["low", "medium", "high"] as Priority[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setForm({ ...form, priority: p })}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-sm ${
                        form.priority === p
                          ? "bg-sage-500 text-white"
                          : "bg-sage-50 text-sage-600"
                      }`}
                    >
                      {priorityLabel[p]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-sage-400">备注</label>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="可选"
                  rows={2}
                  className="w-full mt-1 px-3 py-2.5 rounded-xl border border-sage-200 focus:border-sage-400 focus:outline-none text-base text-sage-800 resize-none"
                />
              </div>
              <Button onClick={addTask} className="w-full">
                保存计划
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
