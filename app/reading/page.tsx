import Link from "next/link";
import { BookShelfManager } from "@/components/books/BookShelfManager";
import { BookIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { getBookShelf } from "@/lib/books";

export const dynamic = "force-dynamic";

export default async function ReadingPage() {
  const shelf = await getBookShelf();

  if (!shelf.signedIn) {
    return (
      <Card className="border border-sage-100 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-600">
          <BookIcon size={23} />
        </div>
        <h1 className="mt-4 text-xl font-semibold text-sage-800">登录后建立自己的书架</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-sage-500">
          书籍和阅读进度会只保存在你的账号中，换设备后也能继续。
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

  return (
    <div className="animate-fade-in">
      {shelf.error && (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {shelf.error}
        </p>
      )}
      <BookShelfManager books={shelf.books} />
    </div>
  );
}
