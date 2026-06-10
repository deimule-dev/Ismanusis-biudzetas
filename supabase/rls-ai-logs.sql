-- Paleiskite Supabase SQL Editor
-- Project -> SQL Editor -> New query -> Run

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
