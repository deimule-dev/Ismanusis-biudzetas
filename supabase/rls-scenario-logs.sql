-- Paleiskite Supabase SQL Editor
-- Project -> SQL Editor -> New query -> Run

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
