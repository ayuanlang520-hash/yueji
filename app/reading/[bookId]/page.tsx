import Link from "next/link";
import { notFound } from "next/navigation";
import { BookIcon } from "@/components/icons";
import { ReadingSessionPanel } from "@/components/reading/ReadingSessionPanel";
import { Card } from "@/components/ui/Card";
import { getBookById } from "@/lib/books";
import { getReadingSessions } from "@/lib/readingSessions";

export const dynamic = "force-dynamic";

const userTimeZone = "Australia/Perth";

function formatDate(value?: string) {
  if (!value) return "尚未记录";

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: userTimeZone,
  }).format(new Date(value));
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const result = await getBookById(bookId);

  if (!result.signedIn) {
    return (
      <Card className="border border-sage-100 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-600">
          <BookIcon size={23} />
        </div>
        <h1 className="mt-4 text-xl font-semibold text-sage-800">登录后查看这本书</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-sage-500">
          书籍详情只属于你的账号，不会公开展示。
        </p>
        <Link
          href="/settings"
          className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-sage-600 px-5 text-sm font-medium text-white hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-300"
        >
          前往登录
        </Link>
      </Card>
    );
  }

  if (result.error) {
    return (
      <div className="space-y-4">
        <Link href="/reading" className="text-sm font-medium text-sage-600">
          ← 返回书架
        </Link>
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {result.error}
        </p>
      </div>
    );
  }

  if (!result.book) notFound();

  const book = result.book;
  const readingSessions = await getReadingSessions(book.id);
  const percent = Math.min(
    100,
    Math.max(0, Math.round((book.currentPage / book.totalPages) * 100)),
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <Link
        href="/reading"
        className="inline-flex min-h-[40px] items-center rounded-lg px-2 text-sm font-medium text-sage-600 hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-300"
      >
        ← 返回书架
      </Link>

      <section className="overflow-hidden rounded-3xl border border-sage-100 bg-white shadow-card">
        <div className="grid gap-0 sm:grid-cols-[12rem_1fr]">
          <div
            className="relative min-h-64 overflow-hidden p-6 text-white sm:min-h-[22rem]"
            style={{ backgroundColor: book.coverColor }}
          >
            <div className="absolute inset-y-0 left-0 w-3 bg-black/10" />
            <div
              className="absolute inset-x-0 bottom-0 bg-white/20 transition-[height] duration-500"
              style={{ height: `${percent}%` }}
            />
            <div className="relative flex h-full min-h-52 flex-col justify-between border-l border-white/25 pl-4 sm:min-h-[19rem]">
              <p className="text-xs font-medium tracking-[0.18em] text-white/70">
                {book.status === "done"
                  ? "已经读完"
                  : book.status === "stopped"
                    ? "停在这里"
                    : "正在阅读"}
              </p>
              <div>
                <h1 className="font-serif text-3xl font-semibold leading-tight">{book.title}</h1>
                <p className="mt-3 text-sm text-white/75">{book.author}</p>
              </div>
              <p className="text-sm font-medium">{percent}%</p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-5 sm:p-7">
            <div>
              <p className="text-xs font-medium tracking-[0.16em] text-sage-400">阅读位置</p>
              <p className="mt-2 text-3xl font-semibold text-sage-800">
                第 {book.currentPage} 页
              </p>
              <p className="mt-1 text-sm text-sage-500">全书 {book.totalPages} 页</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-sage-100">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${percent}%`, backgroundColor: book.coverColor }}
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-sage-100 pt-5">
              <Detail label="加入书架" value={formatDate(book.createdAt)} />
              <Detail label="最近更新" value={formatDate(book.updatedAt)} />
            </div>
          </div>
        </div>
      </section>

      <ReadingSessionPanel
        book={book}
        initialActiveSession={readingSessions.activeSession}
        sessions={readingSessions.sessions}
        loadError={readingSessions.error}
      />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-sage-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-sage-700">{value}</p>
    </div>
  );
}
