-- Pilnas DI įrašų (ai_logs) lentelės ir RLS nustatymas
-- Supabase: Project -> SQL Editor -> New query -> Run

create table if not exists ai_logs (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  created_at timestamptz default now(),
  prompt text not null,
  response text not null
);

alter table ai_logs enable row level security;

drop policy if exists "Allow test user insert ai_logs" on ai_logs;
drop policy if exists "Allow test user select ai_logs" on ai_logs;
drop policy if exists "Allow test user delete ai_logs" on ai_logs;

create policy "Allow test user insert ai_logs"
on ai_logs
for insert
to anon
with check (user_id = '11111111-1111-1111-1111-111111111111');

create policy "Allow test user select ai_logs"
on ai_logs
for select
to anon
using (user_id = '11111111-1111-1111-1111-111111111111');

create policy "Allow test user delete ai_logs"
on ai_logs
for delete
to anon
using (user_id = '11111111-1111-1111-1111-111111111111');
