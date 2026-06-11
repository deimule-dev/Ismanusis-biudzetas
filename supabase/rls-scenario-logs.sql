-- Paleiskite Supabase SQL Editor

alter table scenario_logs enable row level security;

drop policy if exists "Allow test user insert scenario_logs" on scenario_logs;
drop policy if exists "Allow test user select scenario_logs" on scenario_logs;
drop policy if exists "Allow test user delete scenario_logs" on scenario_logs;
drop policy if exists "Users manage own scenario_logs" on scenario_logs;

create policy "Users manage own scenario_logs"
on scenario_logs
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
