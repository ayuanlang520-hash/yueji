"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BookCard } from "@/components/books/BookCard";
import { PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";
import type { Book } from "@/types";

const coverColors = ["#5A8C68", "#6E809C", "#A87854", "#8C6F85"];

export function BookShelfManager({ books }: { books: Book[] }) {
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(books.length === 0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function addBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const title = String(form.get("title") ?? "").trim();
    const author = String(form.get("author") ?? "").trim();
    const totalPages = Number(form.get("totalPages"));
    const currentPage = Number(form.get("currentPage"));

    if (!title || !author || totalPages < 1 || currentPage < 0 || currentPage > totalPages) {
      setMessage("请检查书名、作者和页数。当前页不能超过总页数。");
      setSubmitting(false);
      return;
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("登录状态已失效，请重新登录。");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("books").insert({
      user_id: user.id,
      title,
      author,
      total_pages: totalPages,
      current_page: currentPage,
      status: currentPage === totalPages ? "done" : "reading",
      cover_color: coverColors[books.length % coverColors.length],
    });

    if (error) {
      setMessage(`保存失败：${error.message}`);
    } else {
      formElement.reset();
      setShowAddForm(false);
      setMessage("已加入书架。");
      router.refresh();
    }
    setSubmitting(false);
  }

  async function updateProgress(book: Book, form: FormData) {
    setSubmitting(true);
    setMessage("");
    const currentPage = Number(form.get("currentPage"));

    if (currentPage < 0 || currentPage > book.totalPages) {
      setMessage(`《${book.title}》的页数应在 0–${book.totalPages} 之间。`);
      setSubmitting(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("books")
      .update({
        current_page: currentPage,
        status: currentPage === book.totalPages ? "done" : "reading",
        updated_at: new Date().toISOString(),
      })
      .eq("id", book.id);

    if (error) {
      setMessage(`更新失败：${error.message}`);
    } else {
      setEditingId(null);
      setMessage(`已记录《${book.title}》读到第 ${currentPage} 页。`);
      router.refresh();
    }
    setSubmitting(false);
  }

  async function finishBook(book: Book) {
    const form = new FormData();
    form.set("currentPage", String(book.totalPages));
    await updateProgress(book, form);
  }

  const reading = books.filter((book) => book.status === "reading");
  const finished = books.filter((book) => book.status === "done");
  const stopped = books.filter((book) => book.status === "stopped");

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-sage-800 p-5 text-white shadow-float">
        <p className="text-xs font-medium tracking-[0.16em] text-sage-200">你的在读书架</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <p className="text-3xl font-semibold">{reading.length}</p>
            <p className="mt-1 text-sm text-sage-100">本书正在陪你往前走</p>
          </div>
          <Button
            type="button"
            variant="secondary"
            className="shrink-0 bg-white text-sage-800 hover:bg-sage-50"
            onClick={() => setShowAddForm((value) => !value)}
          >
            <span className="flex items-center gap-2">
              <PlusIcon size={17} /> 添加书籍
            </span>
          </Button>
        </div>
      </section>

      {showAddForm && (
        <Card className="border border-sage-200 p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-sage-800">把一本书放到手边</h2>
            <p className="mt-1 text-sm text-sage-500">先记录现在读到哪里，之后再从这里继续。</p>
          </div>
          <form className="space-y-4" onSubmit={addBook}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="书名" name="title" placeholder="例如：认知觉醒" />
              <Field label="作者" name="author" placeholder="作者姓名" />
              <Field label="总页数" name="totalPages" type="number" min="1" placeholder="280" />
              <Field label="现在读到" name="currentPage" type="number" min="0" defaultValue="0" />
            </div>
            <div className="flex gap-3">
              <Button type="submit" disabled={submitting}>
                {submitting ? "正在保存…" : "加入书架"}
              </Button>
              {books.length > 0 && (
                <Button type="button" variant="secondary" onClick={() => setShowAddForm(false)}>
                  取消
                </Button>
              )}
            </div>
          </form>
        </Card>
      )}

      {message && (
        <p className="rounded-xl bg-sage-50 px-4 py-3 text-sm text-sage-700" role="status">
          {message}
        </p>
      )}

      {reading.length > 0 && (
        <section>
          <div className="mb-3 px-1">
            <p className="text-xs text-sage-400">正在阅读 · {reading.length} 本</p>
            <h2 className="mt-0.5 text-lg font-semibold text-sage-800">从上次的位置继续</h2>
          </div>
          <div className="space-y-4">
            {reading.map((book) => (
              <div key={book.id} className="space-y-2">
                <BookCard book={book} />
                {editingId === book.id ? (
                  <form
                    className="flex items-end gap-2 rounded-2xl border border-sage-200 bg-white p-3"
                    onSubmit={(event) => {
                      event.preventDefault();
                      void updateProgress(book, new FormData(event.currentTarget));
                    }}
                  >
                    <label className="min-w-0 flex-1">
                      <span className="mb-1 block text-xs text-sage-500">这次读到第几页</span>
                      <input
                        required
                        name="currentPage"
                        type="number"
                        min="0"
                        max={book.totalPages}
                        defaultValue={book.currentPage}
                        className="min-h-[42px] w-full rounded-xl border border-sage-200 px-3 text-base text-sage-800 outline-none focus:border-sage-500 focus:ring-2 focus:ring-sage-100"
                      />
                    </label>
                    <Button type="submit" disabled={submitting}>保存页数</Button>
                  </form>
                ) : (
                  <div className="flex justify-end gap-2 px-1">
                    <button
                      type="button"
                      className="rounded-xl px-3 py-2 text-sm font-medium text-sage-600 hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-300"
                      onClick={() => setEditingId(book.id)}
                    >
                      更新页数
                    </button>
                    <button
                      type="button"
                      className="rounded-xl px-3 py-2 text-sm text-sage-400 hover:bg-sage-50 hover:text-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-300"
                      onClick={() => finishBook(book)}
                      disabled={submitting}
                    >
                      标记读完
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {finished.length > 0 && (
        <section>
          <div className="mb-3 px-1">
            <p className="text-xs text-sage-400">已经读完 · {finished.length} 本</p>
            <h2 className="mt-0.5 text-lg font-semibold text-sage-800">留在书架上的收获</h2>
          </div>
          <div className="space-y-3">
            {finished.map((book) => <BookCard key={book.id} book={book} />)}
          </div>
        </section>
      )}

      {stopped.length > 0 && (
        <section>
          <div className="mb-3 px-1">
            <p className="text-xs text-sage-400">停止阅读 · {stopped.length} 本</p>
            <h2 className="mt-0.5 text-lg font-semibold text-sage-800">停在这里，也是一段真实轨迹</h2>
          </div>
          <div className="space-y-3">
            {stopped.map((book) => <BookCard key={book.id} book={book} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  min,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  min?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-sage-700">{label}</span>
      <input
        required
        name={name}
        type={type}
        min={min}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="min-h-[46px] w-full rounded-xl border border-sage-200 bg-white px-3 text-base text-sage-800 outline-none transition focus:border-sage-500 focus:ring-2 focus:ring-sage-100"
      />
    </label>
  );
}
