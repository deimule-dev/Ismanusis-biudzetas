-- ═══════════════════════════════════════════════════════
-- DI SCENARIJŲ ISTORIJA — paleiskite VISĄ šį failą
-- Supabase → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════

-- 1. Lentelė
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

-- 2. Saugumo taisyklės (RLS) — BE ŠITO ĮRAŠYMAS NEVEIKIA
alter table scenario_logs enable row level security;

drop policy if exists "Allow test user insert scenario_logs" on scenario_logs;
drop policy if exists "Allow test user select scenario_logs" on scenario_logs;
drop policy if exists "Allow test user delete scenario_logs" on scenario_logs;

create policy "Allow test user insert scenario_logs"
on scenario_logs
for insert
to anon
with check (user_id = '11111111-1111-1111-1111-111111111111');

create policy "Allow test user select scenario_logs"
on scenario_logs
for select
to anon
using (user_id = '11111111-1111-1111-1111-111111111111');

create policy "Allow test user delete scenario_logs"
on scenario_logs
for delete
to anon
using (user_id = '11111111-1111-1111-1111-111111111111');
