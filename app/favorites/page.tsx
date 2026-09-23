// 收藏夹页 —— 搜索 + 分类筛选 + 卡片列表
"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { mockFavorites } from "@/lib/mockData";
import { SearchIcon, ExternalIcon, TagIcon } from "@/components/icons";

export default function FavoritesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");

  const cats = [
    "全部",
    ...Array.from(new Set(mockFavorites.map((f) => f.category))),
  ];
  const filtered = mockFavorites.filter((f) => {
    const matchCat = category === "全部" || f.category === category;
    const matchQuery =
      !query ||
      f.name.includes(query) ||
      (f.note || "").includes(query) ||
      f.tags.some((t) => t.includes(query));
    return matchCat && matchQuery;
  });

  const openLink = (url: string) => window.open(url, "_blank");

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 搜索框 */}
      <div className="relative">
        <SearchIcon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-300"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索收藏..."
          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white shadow-card text-base text-sage-800 focus:outline-none focus:ring-2 focus:ring-sage-300"
        />
      </div>

      {/* 分类筛选 */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
              category === c
                ? "bg-sage-500 text-white"
                : "bg-white text-sage-600 shadow-card"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 收藏列表 */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card className="text-center py-8 text-sage-400 text-sm">
            没有找到匹配的收藏
          </Card>
        ) : (
          filtered.map((f) => (
            <Card key={f.id} onClick={() => openLink(f.url)}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-sage-100 text-sage-600 px-2 py-0.5 rounded">
                      {f.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-sage-800 mt-1.5">
                    {f.name}
                  </h3>
                  <p className="text-xs text-sage-400 mt-1 truncate">
                    {f.url}
                  </p>
                  {f.note && (
                    <p className="text-xs text-sage-500 mt-1.5 bg-sage-50 rounded-lg px-2 py-1">
                      {f.note}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {f.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-0.5 text-xs text-sage-400 bg-sage-50 px-1.5 py-0.5 rounded"
                      >
                        <TagIcon size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 w-9 h-9 rounded-lg bg-sage-50 flex items-center justify-center text-sage-500">
                  <ExternalIcon size={18} />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
