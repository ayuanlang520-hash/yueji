import Link from "next/link";
import { BookCard } from "@/components/books/BookCard";
import { BookIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { mockBooks } from "@/lib/mockData";

export default function HomePage() {
  const readingBooks = mockBooks.filter((book) => book.status === "reading");

  return (
    <div className="space-y-7 animate-fade-in">
      <section className="relative overflow-hidden rounded-3xl border border-sage-100 bg-white p-5 shadow-card">
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-sage-100/70" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-sage-600">
            <BookIcon size={22} />
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-sage-400">
              今天的阅读
            </p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-sage-800">
              继续一点就好
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-sage-500">
              不必追赶固定数字。从上次停下的位置，再往前读几页。
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between px-1">
          <div>
            <p className="text-xs text-sage-400">最近正在读</p>
            <h2 className="mt-0.5 text-lg font-semibold text-sage-800">
              手边的书
            </h2>
          </div>
          <Link
            href="/reading"
            className="rounded-lg px-2 py-1 text-sm font-medium text-sage-600 hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-300"
          >
            查看书架
          </Link>
        </div>
        <div className="space-y-3">
          {readingBooks.slice(0, 2).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <Card className="border border-dashed border-sage-200 bg-sage-50/60 shadow-none">
        <p className="text-sm font-medium text-sage-700">阅读会从这里慢慢留下痕迹</p>
        <p className="mt-1 text-sm leading-6 text-sage-500">
          每次读到哪里、用了多久、当时想到什么，之后都会回到对应的书里。
        </p>
      </Card>
    </div>
  );
}
