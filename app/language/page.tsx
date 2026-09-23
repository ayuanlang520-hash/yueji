// 语言学习页 —— 单词列表 + 掌握状态 + 学习计划
"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { mockLanguageWords } from "@/lib/mockData";
import { GlobeIcon } from "@/components/icons";
import type { WordStatus } from "@/types";

const statusStyle: Record<WordStatus, string> = {
  新词: "bg-red-50 text-red-400",
  学习中: "bg-amber-50 text-amber-600",
  已掌握: "bg-sage-100 text-sage-600",
};

const langs = ["法语", "英语", "日语"];

export default function LanguagePage() {
  const [lang, setLang] = useState("法语");
  const words = lang === "法语" ? mockLanguageWords : [];
  const mastered = words.filter((w) => w.status === "已掌握").length;
  const learning = words.filter((w) => w.status === "学习中").length;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 语言切换 */}
      <div className="flex gap-2">
        {langs.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              lang === l
                ? "bg-sage-500 text-white shadow-card"
                : "bg-white text-sage-600 shadow-card"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {words.length === 0 ? (
        <Card className="text-center py-12 text-sage-400">
          <GlobeIcon size={40} className="mx-auto mb-3 text-sage-200" />
          <p className="text-sm">{lang}学习内容即将上线</p>
          <p className="text-xs mt-1">当前示例数据为法语</p>
        </Card>
      ) : (
        <>
          {/* 学习统计 */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="text-center">
              <p className="text-xl font-bold text-sage-700">{words.length}</p>
              <p className="text-xs text-sage-400">总词数</p>
            </Card>
            <Card className="text-center">
              <p className="text-xl font-bold text-sage-700">{mastered}</p>
              <p className="text-xs text-sage-400">已掌握</p>
            </Card>
            <Card className="text-center">
              <p className="text-xl font-bold text-sage-700">{learning}</p>
              <p className="text-xs text-sage-400">学习中</p>
            </Card>
          </div>

          {/* 学习计划 */}
          <Card className="bg-gradient-to-br from-sage-50 to-white">
            <p className="text-xs text-sage-400">今日学习计划</p>
            <p className="text-sm text-sage-700 mt-1">
              学习 20 个新词，复习 10 个旧词
            </p>
            <div className="mt-2 h-1.5 bg-sage-100 rounded-full overflow-hidden">
              <div className="h-full bg-sage-500 rounded-full w-2/5" />
            </div>
            <p className="text-xs text-sage-400 mt-1">已完成 8 / 20</p>
          </Card>

          {/* 单词列表 */}
          <div className="space-y-2">
            {words.map((w) => (
              <Card key={w.id}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-sage-800">
                        {w.word}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${statusStyle[w.status]}`}
                      >
                        {w.status}
                      </span>
                    </div>
                    <p className="text-sm text-sage-600 mt-1">{w.meaning}</p>
                    <p className="text-xs text-sage-400 mt-1.5 italic">
                      &ldquo;{w.example}&rdquo;
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
