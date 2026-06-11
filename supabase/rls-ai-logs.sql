-- Paleiskite Supabase SQL Editor

alter table ai_logs enable row level security;

drop policy if exists "Allow test user insert ai_logs" on ai_logs;
drop policy if exists "Allow test user select ai_logs" on ai_logs;
drop policy if exists "Allow test user delete ai_logs" on ai_logs;
drop policy if exists "Users manage own ai_logs" on ai_logs;

create policy "Users manage own ai_logs"
on ai_logs
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
