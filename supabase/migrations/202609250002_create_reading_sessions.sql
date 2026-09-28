create table if not exists public.reading_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete restrict,
  status text not null default 'active'
    check (status in ('active', 'completed', 'cancelled')),
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  active_seconds integer not null default 0 check (active_seconds >= 0),
  last_resumed_at timestamptz,
  progress_start integer not null check (progress_start >= 0),
  progress_end integer check (progress_end >= 0),
  reflection_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reading_sessions_end_after_start
    check (ended_at is null or ended_at >= started_at),
  constraint reading_sessions_resume_time_in_range
    check (
      last_resumed_at is null
      or (
        last_resumed_at >= started_at
        and (ended_at is null or last_resumed_at <= ended_at)
      )
    ),
  constraint reading_sessions_active_fields
    check (
      status <> 'active'
      or (ended_at is null and progress_end is null)
    ),
  constraint reading_sessions_completed_fields
    check (
      status <> 'completed'
      or (
        ended_at is not null
        and progress_end is not null
        and last_resumed_at is null
      )
    ),
  constraint reading_sessions_cancelled_fields
    check (
      status <> 'cancelled'
      or (ended_at is not null and last_resumed_at is null)
    )
);

create index if not exists reading_sessions_user_started_idx
  on public.reading_sessions (user_id, started_at desc);

create index if not exists reading_sessions_book_started_idx
  on public.reading_sessions (book_id, started_at desc);

create unique index if not exists reading_sessions_one_active_per_user_idx
  on public.reading_sessions (user_id)
  where status = 'active';

create or replace function public.set_reading_sessions_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists reading_sessions_set_updated_at on public.reading_sessions;

create trigger reading_sessions_set_updated_at
before update on public.reading_sessions
for each row execute function public.set_reading_sessions_updated_at();

alter table public.reading_sessions enable row level security;

grant select, insert, update, delete
  on table public.reading_sessions
  to authenticated;

drop policy if exists "Users can read their own reading sessions"
  on public.reading_sessions;
create policy "Users can read their own reading sessions"
  on public.reading_sessions for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can start sessions for their own books"
  on public.reading_sessions;
create policy "Users can start sessions for their own books"
  on public.reading_sessions for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.books
      where books.id = book_id
        and books.user_id = auth.uid()
    )
  );

drop policy if exists "Users can update their own reading sessions"
  on public.reading_sessions;
create policy "Users can update their own reading sessions"
  on public.reading_sessions for update
  to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.books
      where books.id = book_id
        and books.user_id = auth.uid()
    )
  );

drop policy if exists "Users can delete their own reading sessions"
  on public.reading_sessions;
create policy "Users can delete their own reading sessions"
  on public.reading_sessions for delete
  to authenticated
  using (auth.uid() = user_id);
