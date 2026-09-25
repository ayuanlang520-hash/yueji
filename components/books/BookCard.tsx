import { Card } from "@/components/ui/Card";
import type { Book } from "@/types";

export function BookCard({ book }: { book: Book }) {
  const percent = Math.min(
    100,
    Math.max(0, Math.round((book.currentPage / book.totalPages) * 100))
  );

  return (
    <Card className="group relative flex gap-4 overflow-hidden border border-sage-100">
      <div className="relative shrink-0">
        <div
          className="flex h-28 w-[4.5rem] items-center justify-center rounded-r-lg rounded-l-sm border-l-4 border-black/10 px-2 text-xs font-semibold text-white shadow-soft"
          style={{ backgroundColor: book.coverColor }}
        >
          <span className="text-center leading-tight">{book.title}</span>
        </div>
        <span className="absolute -bottom-1 left-2 rounded-t-md bg-white px-2 py-1 text-[10px] font-semibold text-sage-700 shadow-soft">
          P.{book.currentPage}
        </span>
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <h3 className="truncate text-base font-semibold text-sage-800">
          {book.title}
        </h3>
        <p className="mt-0.5 text-sm text-sage-400">{book.author}</p>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sage-100">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${percent}%`, backgroundColor: book.coverColor }}
            />
          </div>
          <span className="text-xs font-medium text-sage-500">{percent}%</span>
        </div>
        <p className="mt-2 text-xs text-sage-400">
          {book.status === "done"
            ? `已读完 · 共 ${book.totalPages} 页`
            : `还剩 ${Math.max(0, book.totalPages - book.currentPage)} 页`}
        </p>
      </div>
    </Card>
  );
}
