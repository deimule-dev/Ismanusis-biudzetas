-- Paleiskite Supabase SQL Editor

alter table categories enable row level security;

drop policy if exists "Allow anon select categories" on categories;

create policy "Allow anon select categories"
on categories
for select
to anon
using (true);
