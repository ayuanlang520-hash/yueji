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
  status: "reading" | "done";
  cover_color: string;
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
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

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
    .select(
      "id,title,author,total_pages,current_page,plan_date,status,cover_color,created_at,updated_at",
    )
    .order("updated_at", { ascending: false });

  return {
    configured: true,
    signedIn: true,
    books: ((data ?? []) as BookRow[]).map(mapBook),
    error: error ? "书架暂时无法读取，请稍后重试。" : null,
  };
}
