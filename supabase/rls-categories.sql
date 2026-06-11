-- Paleiskite Supabase SQL Editor

alter table categories enable row level security;

drop policy if exists "Allow anon select categories" on categories;
drop policy if exists "Allow authenticated select categories" on categories;

create policy "Allow authenticated select categories"
on categories
for select
to authenticated
using (true);
