// 运动打卡页 —— 环形进度 + 快速开始 + 本周柱状图
"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockSportRecords, mockWeekSport, TODAY } from "@/lib/mockData";
import { DumbbellIcon, FlameIcon, ClockIcon, CloseIcon } from "@/components/icons";
import type { SportType } from "@/types";

const sportTypes: { type: SportType; color: string }[] = [
  { type: "跑步", color: "#7DAB89" },
  { type: "步行", color: "#7DA9C4" },
  { type: "骑行", color: "#E8B86D" },
  { type: "力量", color: "#D98B8B" },
  { type: "瑜伽", color: "#C4A9D4" },
  { type: "拉伸", color: "#A9CBB2" },
  { type: "自定义", color: "#8BA8C9" },
];

// 环形进度组件
function RingProgress({
  percent,
  size = 130,
  stroke = 12,
  color = "#5A8C68",
  children,
}: {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
  children: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#E8F1EA"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default function SportsPage() {
  const [records, setRecords] = useState(mockSportRecords);
  const [showAdd, setShowAdd] = useState(false);
  const [selType, setSelType] = useState<SportType>("跑步");
  const [duration, setDuration] = useState(30);

  const todayRecords = records.filter((r) => r.date === TODAY);
  const todayMinutes = todayRecords.reduce((s, r) => s + r.duration, 0);
  const todayCalories = todayRecords.reduce((s, r) => s + r.calories, 0);
  const goal = 40;
  const percent = Math.min(Math.round((todayMinutes / goal) * 100), 100);

  const weekTotal = mockWeekSport.reduce((s, d) => s + d.minutes, 0);
  const sportDays = mockWeekSport.filter((d) => d.minutes > 0).length;
  const maxMin = Math.max(...mockWeekSport.map((d) => d.minutes), 1);

  const addRecord = () => {
    const cal = Math.round(duration * 7);
    setRecords((prev) => [
      {
        id: Date.now().toString(),
        type: selType,
        duration,
        calories: cal,
        date: TODAY,
      },
      ...prev,
    ]);
    setShowAdd(false);
    setDuration(30);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 今日运动数据 */}
      <Card className="flex items-center gap-4">
        <RingProgress percent={percent}>
          <span className="text-2xl font-bold text-sage-700">{percent}%</span>
          <span className="text-xs text-sage-400">今日目标</span>
        </RingProgress>
        <div className="flex-1 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-sage-400">目标时长</span>
            <span className="text-sage-700 font-medium">{goal} min</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-sage-400">已完成</span>
            <span className="text-sage-700 font-medium">{todayMinutes} min</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-sage-400">消耗热量</span>
            <span className="text-sage-700 font-medium">
              {todayCalories} kcal
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-sage-400">连续打卡</span>
            <span className="text-sage-700 font-medium flex items-center gap-1">
              <FlameIcon size={14} className="text-accent-amber" />
              28 天
            </span>
          </div>
        </div>
      </Card>

      {/* 快速开始 */}
      <div>
        <h3 className="text-sm font-semibold text-sage-700 mb-2 px-1">
          快速开始
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {sportTypes.map(({ type, color }) => (
            <button
              key={type}
              onClick={() => {
                setSelType(type);
                setShowAdd(true);
              }}
              className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl shadow-card active:scale-95 transition-transform"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: color + "25", color }}
              >
                <DumbbellIcon size={20} />
              </div>
              <span className="text-xs text-sage-600">{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 本周运动 */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-sage-700">本周运动</h3>
          <span className="text-xs text-sage-400">
            {sportDays}/5 天 · {weekTotal} 分钟
          </span>
        </div>
        <svg viewBox="0 0 280 120" className="w-full">
          {mockWeekSport.map((d, i) => {
            const h = (d.minutes / maxMin) * 80;
            return (
              <g key={i}>
                <rect
                  x={i * 38 + 10}
                  y={95 - h}
                  width="24"
                  height={h}
                  rx="4"
                  fill={d.minutes > 0 ? "#5A8C68" : "#E8F1EA"}
                />
                {d.minutes > 0 && (
                  <text
                    x={i * 38 + 22}
                    y={90 - h}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#5A8C68"
                  >
                    {d.minutes}
                  </text>
                )}
                <text
                  x={i * 38 + 22}
                  y={112}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#9CA3AF"
                >
                  {d.day}
                </text>
              </g>
            );
          })}
        </svg>
      </Card>

      {/* 运动记录 */}
      <div>
        <h3 className="text-sm font-semibold text-sage-700 mb-2 px-1">
          最近记录
        </h3>
        <div className="space-y-2">
          {records.slice(0, 6).map((r) => (
            <Card key={r.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sage-50 flex items-center justify-center text-sage-500">
                <DumbbellIcon size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-sage-800">{r.type}</p>
                <p className="text-xs text-sage-400">{r.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-sage-700 font-medium">
                  {r.duration} min
                </p>
                <p className="text-xs text-sage-400">{r.calories} kcal</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 新增运动弹窗 */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowAdd(false)}
          />
          <div className="relative bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-md p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-sage-800">
                记录运动 · {selType}
              </h3>
              <button
                onClick={() => setShowAdd(false)}
                className="p-1 text-sage-400"
              >
                <CloseIcon size={22} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-sage-400">运动类型</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {sportTypes.map(({ type }) => (
                    <button
                      key={type}
                      onClick={() => setSelType(type)}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        selType === type
                          ? "bg-sage-500 text-white"
                          : "bg-sage-50 text-sage-600"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-sage-400">
                  运动时长（分钟）
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2.5 rounded-xl border border-sage-200 focus:border-sage-400 focus:outline-none text-base text-sage-800"
                />
              </div>
              <div className="bg-sage-50 rounded-xl p-3 text-sm text-sage-500 flex items-center justify-between">
                <span>预计消耗热量</span>
                <span className="font-medium text-sage-700">
                  {Math.round(duration * 7)} kcal
                </span>
              </div>
              <Button onClick={addRecord} className="w-full">
                保存记录
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
