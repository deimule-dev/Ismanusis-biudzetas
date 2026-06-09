-- Paleiskite Supabase SQL Editor: https://supabase.com/dashboard
-- Project -> SQL Editor -> New query -> Run

-- 1. Įjungti Row Level Security (jei dar neįjungta)
alter table profiles enable row level security;

-- 2. Pašalinti senas taisykles (jei buvo bandyta anksčiau)
drop policy if exists "Users can view own profile" on profiles;
drop policy if exists "Users can insert own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;

-- 3. Naujos taisykles: prisijungęs vartotojas mato ir redaguoja tik savo profilį
create policy "Users can view own profile"
on profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can insert own profile"
on profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update own profile"
on profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- 4. Testinis įrašas (tik SQL Editor — ne per anon API)
-- insert into profiles (id, name, monthly_income, currency)
-- values (
--   '11111111-1111-1111-1111-111111111111',
--   'Test User',
--   3000,
--   'EUR'
-- );
