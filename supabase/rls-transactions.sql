-- Paleiskite Supabase SQL Editor

alter table transactions enable row level security;

drop policy if exists "Allow test user insert transactions" on transactions;
drop policy if exists "Allow test user select transactions" on transactions;
drop policy if exists "Allow test user delete transactions" on transactions;
drop policy if exists "Users manage own transactions" on transactions;

create policy "Users manage own transactions"
on transactions
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
