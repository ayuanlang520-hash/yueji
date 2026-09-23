// 心情日记页 —— 心情选择 + 文字 + 标签 + 日历查看
"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockMoodRecords } from "@/lib/mockData";
import { CloseIcon } from "@/components/icons";
import type { MoodType } from "@/types";

const moodConfig: Record<MoodType, { color: string; emoji: string }> = {
  开心: { color: "#E8B86D", emoji: "🙂" },
  平静: { color: "#7DAB89", emoji: "😌" },
  兴奋: { color: "#D98B8B", emoji: "🤩" },
  疲惫: { color: "#7DA9C4", emoji: "😮‍💨" },
  焦虑: { color: "#C4A9D4", emoji: "😟" },
  难过: { color: "#8BA8C9", emoji: "😢" },
};

const presetTags = ["工作", "运动", "阅读", "家人", "朋友", "成就感", "放松"];

export default function MoodPage() {
  const [records, setRecords] = useState(mockMoodRecords);
  const [showAdd, setShowAdd] = useState(false);
  const [mood, setMood] = useState<MoodType | null>(null);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // 日历：2026年8月
  const year = 2026;
  const month = 7; // 0-indexed
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const recordMap = new Map(
    records.map((r) => [
      r.date,
      { mood: r.mood, color: moodConfig[r.mood].color },
    ])
  );

  const toggleTag = (tag: string) =>
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const saveMood = () => {
    if (!mood) return;
    const today = "2026-08-07";
    const newRecord = {
      id: Date.now().toString(),
      date: today,
      mood,
      content: content || "今天没有特别想说的",
      tags,
    };
    setRecords((prev) =>
      prev.some((r) => r.date === today)
        ? prev.map((r) => (r.date === today ? newRecord : r))
        : [newRecord, ...prev]
    );
    setMood(null);
    setContent("");
    setTags([]);
    setShowAdd(false);
  };

  const todayRecord = records.find((r) => r.date === "2026-08-07");

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 今日心情 */}
      <Card className="bg-gradient-to-br from-sage-50 to-white">
        {todayRecord ? (
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl"
              style={{ backgroundColor: moodConfig[todayRecord.mood].color + "30" }}
            >
              {moodConfig[todayRecord.mood].emoji}
            </div>
            <p className="text-lg font-semibold text-sage-800 mt-2">
              今天{todayRecord.mood}
            </p>
            <p className="text-sm text-sage-500 mt-1">{todayRecord.content}</p>
            {todayRecord.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                {todayRecord.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white text-sage-500 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <Button
              variant="ghost"
              onClick={() => {
                setMood(todayRecord.mood);
                setContent(todayRecord.content);
                setTags(todayRecord.tags);
                setShowAdd(true);
              }}
              className="mt-3 text-xs"
            >
              修改今日心情
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sage-500 mb-3">还没有记录今天的心情</p>
            <Button onClick={() => setShowAdd(true)}>记录心情</Button>
          </div>
        )}
      </Card>

      {/* 心情日历 */}
      <Card>
        <h3 className="text-sm font-semibold text-sage-700 mb-3">
          2026年8月 心情日历
        </h3>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
            <div key={d} className="text-xs text-sage-400 py-1">
              {d}
            </div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`e${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `2026-08-${String(day).padStart(2, "0")}`;
            const rec = recordMap.get(dateStr);
            const isToday = day === 7;
            return (
              <div
                key={day}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs ${
                  isToday ? "bg-sage-100 ring-1 ring-sage-400" : ""
                }`}
              >
                <span className="text-sage-600">{day}</span>
                {rec && (
                  <span
                    className="w-2 h-2 rounded-full mt-0.5"
                    style={{ backgroundColor: rec.color }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* 历史记录 */}
      <div>
        <h3 className="text-sm font-semibold text-sage-700 mb-2 px-1">
          最近记录
        </h3>
        <div className="space-y-2">
          {records.slice(0, 5).map((r) => (
            <Card key={r.id} className="flex items-start gap-3">
              <div
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{
                  backgroundColor: moodConfig[r.mood].color + "30",
                }}
              >
                {moodConfig[r.mood].emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-sage-800">
                    {r.mood}
                  </span>
                  <span className="text-xs text-sage-400">{r.date}</span>
                </div>
                <p className="text-xs text-sage-500 mt-0.5">{r.content}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 记录心情弹窗 */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowAdd(false)}
          />
          <div className="relative bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-md p-5 max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-sage-800">记录心情</h3>
              <button
                onClick={() => setShowAdd(false)}
                className="p-1 text-sage-400"
              >
                <CloseIcon size={22} />
              </button>
            </div>
            {/* 心情选择 */}
            <p className="text-xs text-sage-400 mb-2">选择心情</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {(Object.keys(moodConfig) as MoodType[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
                    mood === m
                      ? "ring-2 scale-105"
                      : "bg-sage-50"
                  }`}
                  style={
                    mood === m
                      ? {
                          backgroundColor: moodConfig[m].color + "20",
                          borderColor: moodConfig[m].color,
                        }
                      : {}
                  }
                >
                  <span className="text-2xl">{moodConfig[m].emoji}</span>
                  <span className="text-xs text-sage-600">{m}</span>
                </button>
              ))}
            </div>
            {/* 文字输入 */}
            <p className="text-xs text-sage-400 mb-2">想说点什么</p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="今天发生了什么..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-sage-200 focus:border-sage-400 focus:outline-none text-base text-sage-800 resize-none mb-4"
            />
            {/* 标签 */}
            <p className="text-xs text-sage-400 mb-2">添加标签</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {presetTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    tags.includes(tag)
                      ? "bg-sage-500 text-white"
                      : "bg-sage-50 text-sage-600"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
            <Button
              onClick={saveMood}
              className="w-full"
              disabled={!mood}
            >
              保存
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
