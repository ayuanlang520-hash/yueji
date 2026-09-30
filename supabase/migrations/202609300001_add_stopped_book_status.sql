alter table public.books
  add column if not exists stopped_at timestamptz,
  add column if not exists stop_reason text;

alter table public.books
  drop constraint if exists books_status_check;

alter table public.books
  add constraint books_status_check
  check (status in ('reading', 'done', 'stopped'));

