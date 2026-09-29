"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";
import type { Book, ReadingSession } from "@/types";

type SessionRow = {
  id: string;
  user_id: string;
  book_id: string;
  status: "active" | "completed" | "cancelled";
  started_at: string;
  ended_at: string | null;
  active_seconds: number;
  last_resumed_at: string | null;
  progress_start: number;
  progress_end: number | null;
  reflection_text: string | null;
  created_at: string;
  updated_at: string;
};

const sessionColumns =
  "id,user_id,book_id,status,started_at,ended_at,active_seconds,last_resumed_at,progress_start,progress_end,reflection_text,created_at,updated_at";

function mapSession(row: SessionRow): ReadingSession {
  return {
    id: row.id,
    userId: row.user_id,
    bookId: row.book_id,
    status: row.status,
    startedAt: row.started_at,
    endedAt: row.ended_at ?? undefined,
    activeSeconds: row.active_seconds,
    lastResumedAt: row.last_resumed_at ?? undefined,
    progressStart: row.progress_start,
    progressEnd: row.progress_end ?? undefined,
    reflectionText: row.reflection_text ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function secondsSince(value: string, now = Date.now()) {
  return Math.max(0, Math.floor((now - new Date(value).getTime()) / 1000));
}

function totalSeconds(session: ReadingSession, now = Date.now()) {
  return session.activeSeconds + (session.lastResumedAt ? secondsSince(session.lastResumedAt, now) : 0);
}

function formatTimer(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const parts = [minutes, remainingSeconds];

  if (hours > 0) parts.unshift(hours);
  return parts.map((part) => String(part).padStart(2, "0")).join(":");
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) return `${remainingSeconds} 秒`;
  if (remainingSeconds === 0) return `${minutes} 分钟`;
  return `${minutes} 分 ${remainingSeconds} 秒`;
}

function formatSessionDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Australia/Perth",
  }).format(new Date(value));
}

export function ReadingSessionPanel({
  book,
  initialActiveSession,
  sessions,
  loadError,
}: {
  book: Book;
  initialActiveSession: ReadingSession | null;
  sessions: ReadingSession[];
  loadError: string | null;
}) {
  const router = useRouter();
  const nextPage = Math.min(book.currentPage + 1, book.totalPages);
  const [session, setSession] = useState(initialActiveSession);
  const [clock, setClock] = useState(() => Date.now());
  const [showFinishForm, setShowFinishForm] = useState(false);
  const [finishPage, setFinishPage] = useState(nextPage);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(loadError ?? "");

  const isThisBook = session?.bookId === book.id;
  const isRunning = Boolean(isThisBook && session?.lastResumedAt);
  const displayedSeconds = useMemo(
    () => (isThisBook && session ? totalSeconds(session, clock) : 0),
    [clock, isThisBook, session],
  );

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => setClock(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [isRunning]);

  async function startSession() {
    setSubmitting(true);
    setMessage("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("登录状态已失效，请重新登录。");
      setSubmitting(false);
      return;
    }

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("reading_sessions")
      .insert({
        user_id: user.id,
        book_id: book.id,
        status: "active",
        started_at: now,
        active_seconds: 0,
        last_resumed_at: now,
        progress_start: nextPage,
      })
      .select(sessionColumns)
      .single();

    if (error || !data) {
      setMessage(
        error?.code === "23505"
          ? "你还有一段阅读没有结束，请先回到那本书完成记录。"
          : "暂时无法开始计时，请稍后重试。",
      );
    } else {
      setSession(mapSession(data as SessionRow));
      setFinishPage(nextPage);
      setClock(Date.now());
      setMessage("计时开始。慢慢读，不必赶进度。");
    }
    setSubmitting(false);
  }

  async function pauseSession() {
    if (!session?.lastResumedAt) return;
    setSubmitting(true);
    setMessage("");

    const now = Date.now();
    const activeSeconds = totalSeconds(session, now);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("reading_sessions")
      .update({ active_seconds: activeSeconds, last_resumed_at: null })
      .eq("id", session.id)
      .eq("status", "active")
      .select(sessionColumns)
      .single();

    if (error || !data) {
      setMessage("暂停失败，计时仍在继续，请稍后重试。");
    } else {
      setSession(mapSession(data as SessionRow));
      setClock(now);
      setMessage("已暂停，这段时间不会计入阅读时长。");
    }
    setSubmitting(false);
  }

  async function resumeSession() {
    if (!session || session.lastResumedAt) return;
    setSubmitting(true);
    setMessage("");

    const now = new Date().toISOString();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("reading_sessions")
      .update({ last_resumed_at: now })
      .eq("id", session.id)
      .eq("status", "active")
      .select(sessionColumns)
      .single();

    if (error || !data) {
      setMessage("继续计时失败，请稍后重试。");
    } else {
      setSession(mapSession(data as SessionRow));
      setClock(Date.now());
      setMessage("继续计时。");
    }
    setSubmitting(false);
  }

  async function finishSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;

    if (finishPage < session.progressStart || finishPage > book.totalPages) {
      setMessage(`结束页数应在 ${session.progressStart}–${book.totalPages} 页之间。`);
      return;
    }

    setSubmitting(true);
    setMessage("");

    const now = new Date();
    const activeSeconds = totalSeconds(session, now.getTime());
    const supabase = createClient();
    const { error: sessionError } = await supabase
      .from("reading_sessions")
      .update({
        status: "completed",
        ended_at: now.toISOString(),
        active_seconds: activeSeconds,
        last_resumed_at: null,
        progress_end: finishPage,
      })
      .eq("id", session.id)
      .eq("status", "active");

    if (sessionError) {
      setMessage("阅读记录保存失败，请稍后重试。");
      setSubmitting(false);
      return;
    }

    const { error: bookError } = await supabase
      .from("books")
      .update({
        current_page: finishPage,
        status: finishPage === book.totalPages ? "done" : "reading",
        updated_at: now.toISOString(),
      })
      .eq("id", book.id);

    setSession(null);
    setShowFinishForm(false);
    setSubmitting(false);

    if (bookError) {
      setMessage("阅读时长已保存，但页码更新失败，请回到书架补记页数。");
    } else {
      setMessage(`已保存 ${formatDuration(activeSeconds)}，读到第 ${finishPage} 页。`);
    }
    router.refresh();
  }

  if (session && !isThisBook) {
    return (
      <Card className="border border-sage-100 p-5">
        <p className="text-xs font-medium tracking-[0.16em] text-sage-400">正在进行</p>
        <h2 className="mt-2 text-lg font-semibold text-sage-800">你还有一段阅读没有结束</h2>
        <p className="mt-1 text-sm leading-6 text-sage-500">
          每次只记录一本书，先处理正在进行的那一段，再回到这里。
        </p>
        <Link
          href={`/reading/${session.bookId}`}
          className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-sage-600 px-5 text-sm font-medium text-white hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-300"
        >
          回到正在读的书
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border border-sage-100 p-0">
        <div className="border-b border-sage-100 bg-sage-800 px-5 py-5 text-white sm:px-6">
          <p className="text-xs font-medium tracking-[0.18em] text-sage-200">
            {session ? (isRunning ? "阅读中" : "暂时停在这里") : "这一次，只读一会儿也可以"}
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <p className="font-mono text-4xl font-semibold tabular-nums tracking-tight sm:text-5xl">
              {formatTimer(displayedSeconds)}
            </p>
            {session && (
              <p className="pb-1 text-right text-xs leading-5 text-sage-200">
                从第 {session.progressStart} 页开始
              </p>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {!session && book.status !== "done" && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-sage-800">从第 {nextPage} 页继续</h2>
                <p className="mt-1 text-sm leading-6 text-sage-500">
                  开始后可以随时暂停，暂停的时间不会被计算。
                </p>
              </div>
              <Button className="shrink-0" onClick={() => void startSession()} disabled={submitting}>
                {submitting ? "正在开始…" : "开始阅读"}
              </Button>
            </div>
          )}

          {session && !showFinishForm && (
            <div className="flex flex-wrap gap-3">
              <Button
                variant={isRunning ? "secondary" : "primary"}
                onClick={() => void (isRunning ? pauseSession() : resumeSession())}
                disabled={submitting}
              >
                {submitting ? "正在保存…" : isRunning ? "暂停一下" : "继续阅读"}
              </Button>
              <Button variant="ghost" onClick={() => setShowFinishForm(true)} disabled={submitting}>
                结束并记录
              </Button>
            </div>
          )}

          {session && showFinishForm && (
            <form className="space-y-4" onSubmit={finishSession}>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-sage-700">
                  这次读到第几页？
                </span>
                <input
                  required
                  autoFocus
                  type="number"
                  min={session.progressStart}
                  max={book.totalPages}
                  value={finishPage}
                  onChange={(event) => setFinishPage(Number(event.target.value))}
                  className="min-h-[46px] w-full rounded-xl border border-sage-200 bg-white px-3 text-base text-sage-800 outline-none transition focus:border-sage-500 focus:ring-2 focus:ring-sage-100"
                />
                <span className="mt-1.5 block text-xs text-sage-400">
                  本次从第 {session.progressStart} 页开始，全书 {book.totalPages} 页。
                </span>
              </label>
              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "正在保存…" : "保存这次阅读"}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowFinishForm(false)}>
                  返回计时
                </Button>
              </div>
            </form>
          )}

          {book.status === "done" && !session && (
            <div>
              <h2 className="text-lg font-semibold text-sage-800">这本书已经读完</h2>
              <p className="mt-1 text-sm leading-6 text-sage-500">下面保留了你真实的阅读记录。</p>
            </div>
          )}

          {message && (
            <p className="mt-4 rounded-xl bg-sage-50 px-4 py-3 text-sm text-sage-700" role="status">
              {message}
            </p>
          )}
        </div>
      </Card>

      <Card className="border border-sage-100 p-5 shadow-none sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.16em] text-sage-400">阅读记录</p>
            <h2 className="mt-1 text-lg font-semibold text-sage-800">留在这本书里的时间</h2>
          </div>
          <p className="text-xs text-sage-400">最近 {sessions.length} 次</p>
        </div>

        {sessions.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-sage-200 bg-sage-50/60 px-4 py-5 text-sm leading-6 text-sage-500">
            完成第一次阅读后，时间和页数会出现在这里。
          </p>
        ) : (
          <ol className="mt-4 divide-y divide-sage-100">
            {sessions.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-sage-700">
                    第 {item.progressStart} 页 → 第 {item.progressEnd} 页
                  </p>
                  <p className="mt-1 text-xs text-sage-400">{formatSessionDate(item.startedAt)}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold tabular-nums text-sage-600">
                  {formatDuration(item.activeSeconds)}
                </p>
              </li>
            ))}
          </ol>
        )}
      </Card>
    </div>
  );
}
