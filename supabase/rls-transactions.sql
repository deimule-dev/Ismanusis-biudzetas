-- Paleiskite Supabase SQL Editor
-- Project -> SQL Editor -> New query -> Run

alter table transactions enable row level security;

drop policy if exists "Allow test user insert transactions" on transactions;
drop policy if exists "Allow test user select transactions" on transactions;
drop policy if exists "Allow test user delete transactions" on transactions;

-- Leidžia programai (anon raktas) įrašyti testinio vartotojo operacijas
create policy "Allow test user insert transactions"
on transactions
for insert
to anon
with check (user_id = '11111111-1111-1111-1111-111111111111');

-- Leidžia matyti testinio vartotojo operacijas
create policy "Allow test user select transactions"
on transactions
for select
to anon
using (user_id = '11111111-1111-1111-1111-111111111111');

-- Leidžia ištrinti testinio vartotojo operacijas
create policy "Allow test user delete transactions"
on transactions
for delete
to anon
using (user_id = '11111111-1111-1111-1111-111111111111');
