import { Card } from "@/components/ui/Card";
import type { Book } from "@/types";

export function BookCard({ book }: { book: Book }) {
  const percent = Math.min(
    100,
    Math.max(0, Math.round((book.currentPage / book.totalPages) * 100))
  );

  return (
    <Card className="flex gap-4">
      <div
        className="flex h-24 w-16 shrink-0 items-center justify-center rounded-lg px-2 text-xs font-semibold text-white shadow-soft"
        style={{ backgroundColor: book.coverColor }}
      >
        <span className="text-center leading-tight">{book.title}</span>
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <h3 className="truncate text-base font-semibold text-sage-800">
          {book.title}
        </h3>
        <p className="mt-0.5 text-sm text-sage-400">{book.author}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sage-100">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${percent}%`, backgroundColor: book.coverColor }}
            />
          </div>
          <span className="text-xs font-medium text-sage-500">{percent}%</span>
        </div>
        <p className="mt-2 text-xs text-sage-400">
          读到第 {book.currentPage} 页 · 共 {book.totalPages} 页
        </p>
      </div>
    </Card>
  );
}
