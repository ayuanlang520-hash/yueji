// 灵感泡泡页 —— 气泡展示 + 记录灵感弹窗 + 预留AI/转计划按钮
"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockInspirations } from "@/lib/mockData";
import { BulbIcon, PlusIcon, CloseIcon, SparklesIcon } from "@/components/icons";
import type { Inspiration } from "@/types";

const bubbleColors = [
  "#7DAB89",
  "#E8B86D",
  "#7DA9C4",
  "#D98B8B",
  "#A9CBB2",
  "#C4A9D4",
];

export default function InspirationPage() {
  const [inspirations, setInspirations] =
    useState<Inspiration[]>(mockInspirations);
  const [showAdd, setShowAdd] = useState(false);
  const [content, setContent] = useState("");

  const addInspiration = () => {
    if (!content.trim()) return;
    const color =
      bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    const size = 70 + Math.floor(Math.random() * 50);
    const newOne: Inspiration = {
      id: Date.now().toString(),
      content: content.trim(),
      color,
      size,
      createdAt: new Date().toISOString(),
    };
    setInspirations((prev) => [newOne, ...prev]);
    setContent("");
    setShowAdd(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 顶部 */}
      <Card className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-sage-800">灵感泡泡</p>
          <p className="text-xs text-sage-400 mt-0.5">
            已记录 {inspirations.length} 个灵感
          </p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="!px-3">
          <PlusIcon size={18} className="mr-1" />
          记录灵感
        </Button>
      </Card>

      {/* 气泡区域 */}
      <div className="flex flex-wrap gap-3 justify-center py-4">
        {inspirations.map((ins) => (
          <div
            key={ins.id}
            className="rounded-full flex items-center justify-center text-white text-xs font-medium text-center p-3 shadow-soft animate-pop cursor-pointer hover:scale-105 transition-transform"
            style={{
              width: ins.size,
              height: ins.size,
              backgroundColor: ins.color,
            }}
          >
            <span className="line-clamp-3 leading-tight">{ins.content}</span>
          </div>
        ))}
        {inspirations.length === 0 && (
          <p className="text-sm text-sage-400 py-8">
            还没有灵感，点击上方按钮记录第一个吧
          </p>
        )}
      </div>

      {/* 预留功能按钮 */}
      <div className="grid grid-cols-2 gap-3">
        <button
          disabled
          className="bg-white rounded-2xl shadow-card p-4 text-center opacity-60 cursor-not-allowed"
        >
          <SparklesIcon size={24} className="mx-auto text-sage-400 mb-1" />
          <p className="text-sm text-sage-600">AI 总结</p>
          <p className="text-xs text-sage-300 mt-0.5">即将上线</p>
        </button>
        <button
          disabled
          className="bg-white rounded-2xl shadow-card p-4 text-center opacity-60 cursor-not-allowed"
        >
          <BulbIcon size={24} className="mx-auto text-sage-400 mb-1" />
          <p className="text-sm text-sage-600">一键转计划</p>
          <p className="text-xs text-sage-300 mt-0.5">即将上线</p>
        </button>
      </div>

      {/* 记录灵感弹窗 */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowAdd(false)}
          />
          <div className="relative bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-md p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-sage-800">
                记录灵感
              </h3>
              <button
                onClick={() => setShowAdd(false)}
                className="p-1 text-sage-400"
              >
                <CloseIcon size={22} />
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="写下此刻的灵感..."
              rows={4}
              autoFocus
              className="w-full px-3 py-2.5 rounded-xl border border-sage-200 focus:border-sage-400 focus:outline-none text-base text-sage-800 resize-none"
            />
            <Button
              onClick={addInspiration}
              className="w-full mt-3"
              disabled={!content.trim()}
            >
              保存灵感
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
