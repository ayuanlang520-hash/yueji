create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  author text not null check (char_length(author) between 1 and 120),
  total_pages integer not null check (total_pages > 0),
  current_page integer not null default 0 check (current_page >= 0 and current_page <= total_pages),
  plan_date date,
  status text not null default 'reading' check (status in ('reading', 'done')),
  cover_color text not null default '#5A8C68',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists books_user_status_updated_idx
  on public.books (user_id, status, updated_at desc);

alter table public.books enable row level security;

create policy "Users can read their own books"
  on public.books for select
  using (auth.uid() = user_id);

create policy "Users can add their own books"
  on public.books for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own books"
  on public.books for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own books"
  on public.books for delete
  using (auth.uid() = user_id);
