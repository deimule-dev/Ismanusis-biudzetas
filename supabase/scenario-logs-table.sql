-- Paleiskite Supabase SQL Editor
-- Project -> SQL Editor -> New query -> Run

create table if not exists scenario_logs (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  income numeric not null,
  expenses numeric not null,
  goal_amount numeric not null,
  scenario_result jsonb not null,
  ai_response text not null,
  created_at timestamptz default now()
);
