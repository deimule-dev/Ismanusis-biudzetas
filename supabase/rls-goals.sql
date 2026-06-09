-- Paleiskite Supabase SQL Editor

alter table goals enable row level security;

drop policy if exists "Allow test user insert goals" on goals;
drop policy if exists "Allow test user select goals" on goals;
drop policy if exists "Allow test user delete goals" on goals;

create policy "Allow test user insert goals"
on goals
for insert
to anon
with check (user_id = '11111111-1111-1111-1111-111111111111');

create policy "Allow test user select goals"
on goals
for select
to anon
using (user_id = '11111111-1111-1111-1111-111111111111');

create policy "Allow test user delete goals"
on goals
for delete
to anon
using (user_id = '11111111-1111-1111-1111-111111111111');
