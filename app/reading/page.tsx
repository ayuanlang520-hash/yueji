// 读书计划页 —— 本周统计 + 正在阅读 + 已完成
"use client";
import { Card } from "@/components/ui/Card";
import { mockBooks } from "@/lib/mockData";
import { BookIcon, ClockIcon, FlameIcon } from "@/components/icons";

export default function ReadingPage() {
  const reading = mockBooks.filter((b) => b.status === "reading");
  const done = mockBooks.filter((b) => b.status === "done");

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 本周阅读统计 */}
      <Card className="bg-gradient-to-br from-sage-50 to-white">
        <h3 className="text-sm font-semibold text-sage-700 mb-3">
          本周阅读统计
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-2xl font-bold text-sage-700">180</p>
            <p className="text-xs text-sage-400">阅读分钟</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-sage-700">85</p>
            <p className="text-xs text-sage-400">阅读页数</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-sage-700 flex items-center justify-center gap-1">
              <FlameIcon size={16} className="text-accent-amber" />
              12
            </p>
            <p className="text-xs text-sage-400">连续天数</p>
          </div>
        </div>
      </Card>

      {/* 正在阅读 */}
      <div>
        <h3 className="text-sm font-semibold text-sage-700 mb-2 px-1">
          正在阅读 · {reading.length} 本
        </h3>
        <div className="space-y-3">
          {reading.map((b) => {
            const percent = Math.round(
              (b.currentPage / b.totalPages) * 100
            );
            return (
              <Card key={b.id} className="flex gap-3">
                {/* 书脊占位 */}
                <div
                  className="shrink-0 w-14 h-20 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-soft"
                  style={{ backgroundColor: b.coverColor }}
                >
                  <span className="text-center leading-tight" style={{ writingMode: "vertical-rl" }}>
                    {b.title}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-sage-800 truncate">
                    {b.title}
                  </h4>
                  <p className="text-xs text-sage-400 mt-0.5">{b.author}</p>
                  {/* 进度条 */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-sage-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: b.coverColor,
                        }}
                      />
                    </div>
                    <span className="text-xs text-sage-500 font-medium">
                      {percent}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5 text-xs text-sage-400">
                    <span>
                      {b.currentPage} / {b.totalPages} 页
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon size={12} />
                      计划 {b.planDate}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 已完成 */}
      {done.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-sage-700 mb-2 px-1">
            已读完 · {done.length} 本
          </h3>
          <div className="space-y-2">
            {done.map((b) => (
              <Card key={b.id} className="flex items-center gap-3 opacity-80">
                <div
                  className="shrink-0 w-10 h-14 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: b.coverColor }}
                >
                  <BookIcon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-sage-700 line-through">
                    {b.title}
                  </p>
                  <p className="text-xs text-sage-400">
                    {b.totalPages} 页 · {b.author}
                  </p>
                </div>
                <span className="text-xs bg-sage-100 text-sage-600 px-2 py-1 rounded-full">
                  已完成
                </span>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
