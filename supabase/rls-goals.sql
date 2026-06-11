-- Paleiskite Supabase SQL Editor

alter table goals enable row level security;

drop policy if exists "Allow test user insert goals" on goals;
drop policy if exists "Allow test user select goals" on goals;
drop policy if exists "Allow test user delete goals" on goals;
drop policy if exists "Users manage own goals" on goals;

create policy "Users manage own goals"
on goals
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
