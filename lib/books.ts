import "server-only";

import type { Book } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

type BookRow = {
  id: string;
  title: string;
  author: string;
  total_pages: number;
  current_page: number;
  plan_date: string | null;
  status: "reading" | "done" | "stopped";
  cover_color: string;
  stopped_at: string | null;
  stop_reason: string | null;
  created_at: string;
  updated_at: string;
};

function mapBook(row: BookRow): Book {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    totalPages: row.total_pages,
    currentPage: row.current_page,
    planDate: row.plan_date ?? undefined,
    status: row.status,
    coverColor: row.cover_color,
    stoppedAt: row.stopped_at ?? undefined,
    stopReason: row.stop_reason ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const bookColumns =
  "id,title,author,total_pages,current_page,plan_date,status,cover_color,stopped_at,stop_reason,created_at,updated_at";

export async function getBookShelf() {
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      signedIn: false,
      books: [] as Book[],
      error: "Supabase 尚未连接。",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      configured: true,
      signedIn: false,
      books: [] as Book[],
      error: null,
    };
  }

  const { data, error } = await supabase
    .from("books")
    .select(bookColumns)
    .order("updated_at", { ascending: false });

  return {
    configured: true,
    signedIn: true,
    books: ((data ?? []) as BookRow[]).map(mapBook),
    error: error ? "书架暂时无法读取，请稍后重试。" : null,
  };
}

export async function getBookById(bookId: string) {
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      signedIn: false,
      book: null as Book | null,
      error: "Supabase 尚未连接。",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      configured: true,
      signedIn: false,
      book: null as Book | null,
      error: null,
    };
  }

  const { data, error } = await supabase
    .from("books")
    .select(bookColumns)
    .eq("id", bookId)
    .eq("user_id", user.id)
    .maybeSingle();

  return {
    configured: true,
    signedIn: true,
    book: data ? mapBook(data as BookRow) : null,
    error: error ? "这本书暂时无法读取，请稍后重试。" : null,
  };
}
