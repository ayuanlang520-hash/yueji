// AI技巧库页 —— 分类筛选 + 技巧卡片 + 复制
"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { mockAITips } from "@/lib/mockData";
import { SparklesIcon, CopyIcon, TagIcon, CheckIcon } from "@/components/icons";
import type { AITipCategory } from "@/types";

const cats: (AITipCategory | "全部")[] = [
  "全部",
  "提示词技巧",
  "写作",
  "学习",
  "图片生成",
];

const levelStyle: Record<string, string> = {
  入门: "bg-sage-100 text-sage-600",
  进阶: "bg-amber-100 text-accent-amber",
};

export default function AITipsPage() {
  const [cat, setCat] = useState<AITipCategory | "全部">("全部");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered =
    cat === "全部" ? mockAITips : mockAITips.filter((t) => t.category === cat);

  const copyPrompt = (id: string, prompt: string) => {
    navigator.clipboard?.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 分类筛选 */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
              cat === c
                ? "bg-sage-500 text-white"
                : "bg-white text-sage-600 shadow-card"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 技巧列表 */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card className="text-center py-8 text-sage-400 text-sm">
            该分类暂无技巧
          </Card>
        ) : (
          filtered.map((tip) => (
            <Card key={tip.id}>
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center text-sage-600">
                  <SparklesIcon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-sage-800">
                      {tip.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${levelStyle[tip.level]}`}
                    >
                      {tip.level}
                    </span>
                  </div>
                  <p className="text-xs text-sage-400 mt-1">
                    适用场景：{tip.scenario}
                  </p>
                  {/* 提示词内容 */}
                  <div className="mt-2 bg-sage-50 rounded-xl p-3">
                    <p className="text-xs text-sage-600 leading-relaxed font-mono">
                      {tip.prompt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="flex items-center gap-1 text-xs text-sage-400">
                      <TagIcon size={12} />
                      {tip.category}
                    </span>
                    <button
                      onClick={() => copyPrompt(tip.id, tip.prompt)}
                      className="ml-auto flex items-center gap-1 text-xs text-sage-500 active:text-sage-700 px-2 py-1 rounded-lg hover:bg-sage-50"
                    >
                      {copiedId === tip.id ? (
                        <>
                          <CheckIcon size={14} />
                          已复制
                        </>
                      ) : (
                        <>
                          <CopyIcon size={14} />
                          复制提示词
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 底部提示 */}
      <Card className="text-center bg-sage-50">
        <SparklesIcon size={24} className="mx-auto text-sage-300 mb-1" />
        <p className="text-xs text-sage-400">
          更多 AI 技巧持续更新中
        </p>
      </Card>
    </div>
  );
}
