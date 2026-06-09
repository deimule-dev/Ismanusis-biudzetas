-- Paleiskite Supabase SQL Editor
-- Project -> SQL Editor -> New query -> Run

create table if not exists ai_logs (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  created_at timestamptz default now(),
  prompt text not null,
  response text not null
);
