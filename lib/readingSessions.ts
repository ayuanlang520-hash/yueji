import "server-only";

import type { ReadingSession } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

type ReadingSessionRow = {
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

function mapReadingSession(row: ReadingSessionRow): ReadingSession {
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

export async function getReadingSessions(bookId: string) {
  if (!isSupabaseConfigured()) {
    return {
      activeSession: null as ReadingSession | null,
      sessions: [] as ReadingSession[],
      error: "Supabase 尚未连接。",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      activeSession: null as ReadingSession | null,
      sessions: [] as ReadingSession[],
      error: null,
    };
  }

  const [activeResult, historyResult] = await Promise.all([
    supabase
      .from("reading_sessions")
      .select(sessionColumns)
      .eq("user_id", user.id)
      .eq("status", "active")
      .maybeSingle(),
    supabase
      .from("reading_sessions")
      .select(sessionColumns)
      .eq("user_id", user.id)
      .eq("book_id", bookId)
      .eq("status", "completed")
      .order("started_at", { ascending: false })
      .limit(10),
  ]);

  return {
    activeSession: activeResult.data
      ? mapReadingSession(activeResult.data as ReadingSessionRow)
      : null,
    sessions: ((historyResult.data ?? []) as ReadingSessionRow[]).map(mapReadingSession),
    error:
      activeResult.error || historyResult.error
        ? "阅读记录暂时无法读取，请稍后重试。"
        : null,
  };
}
