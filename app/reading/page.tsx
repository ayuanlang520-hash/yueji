import { BookCard } from "@/components/books/BookCard";
import { BookIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { mockBooks } from "@/lib/mockData";

export default function ReadingPage() {
  const reading = mockBooks.filter((book) => book.status === "reading");
  const finished = mockBooks.filter((book) => book.status === "done");

  return (
    <div className="space-y-7 animate-fade-in">
      <section>
        <div className="mb-3 px-1">
          <p className="text-xs text-sage-400">正在阅读 · {reading.length} 本</p>
          <h2 className="mt-0.5 text-lg font-semibold text-sage-800">
            从上次的位置继续
          </h2>
        </div>
        <div className="space-y-3">
          {reading.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {finished.length > 0 && (
        <section>
          <div className="mb-3 px-1">
            <p className="text-xs text-sage-400">已经读完</p>
            <h2 className="mt-0.5 text-lg font-semibold text-sage-800">
              留在书架上的收获
            </h2>
          </div>
          <div className="space-y-2">
            {finished.map((book) => (
              <Card key={book.id} className="flex items-center gap-3">
                <div
                  className="flex h-14 w-10 shrink-0 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: book.coverColor }}
                >
                  <BookIcon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-sage-800">
                    {book.title}
                  </p>
                  <p className="mt-0.5 text-xs text-sage-400">
                    {book.author} · {book.totalPages} 页
                  </p>
                </div>
                <span className="rounded-full bg-sage-100 px-2 py-1 text-xs text-sage-600">
                  已读完
                </span>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
