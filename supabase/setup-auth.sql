-- Pilnas prisijungimo (auth) nustatymas
-- Supabase: Project -> SQL Editor -> New query -> Run
--
-- Po šio failo paleidimo:
-- 1. Authentication -> Providers -> įjunkite Email
-- 2. Authentication -> URL Configuration -> Site URL:
--    http://localhost:5173 (dev) ir https://ismanusis-biudzetas-six.vercel.app (prod)

-- Profilis naujiems vartotojams
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, monthly_income, currency)
  values (
    new.id,
    split_part(new.email, '@', 1),
    0,
    'EUR'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Profiles RLS
alter table profiles enable row level security;

drop policy if exists "Users can view own profile" on profiles;
drop policy if exists "Users can insert own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;

create policy "Users can view own profile"
on profiles for select to authenticated
using (auth.uid() = id);

create policy "Users can insert own profile"
on profiles for insert to authenticated
with check (auth.uid() = id);

create policy "Users can update own profile"
on profiles for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Goals RLS
alter table goals enable row level security;

drop policy if exists "Allow test user insert goals" on goals;
drop policy if exists "Allow test user select goals" on goals;
drop policy if exists "Allow test user delete goals" on goals;
drop policy if exists "Users manage own goals" on goals;

create policy "Users manage own goals"
on goals for all to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Transactions RLS
alter table transactions enable row level security;

drop policy if exists "Allow test user insert transactions" on transactions;
drop policy if exists "Allow test user select transactions" on transactions;
drop policy if exists "Allow test user delete transactions" on transactions;
drop policy if exists "Users manage own transactions" on transactions;

create policy "Users manage own transactions"
on transactions for all to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Categories (bendros visiems prisijungusiems)
alter table categories enable row level security;

drop policy if exists "Allow anon select categories" on categories;
drop policy if exists "Allow authenticated select categories" on categories;

create policy "Allow authenticated select categories"
on categories for select to authenticated
using (true);

-- AI logs RLS
alter table ai_logs enable row level security;

drop policy if exists "Allow test user insert ai_logs" on ai_logs;
drop policy if exists "Allow test user select ai_logs" on ai_logs;
drop policy if exists "Allow test user delete ai_logs" on ai_logs;
drop policy if exists "Users manage own ai_logs" on ai_logs;

create policy "Users manage own ai_logs"
on ai_logs for all to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Scenario logs RLS
alter table scenario_logs enable row level security;

drop policy if exists "Allow test user insert scenario_logs" on scenario_logs;
drop policy if exists "Allow test user select scenario_logs" on scenario_logs;
drop policy if exists "Allow test user delete scenario_logs" on scenario_logs;
drop policy if exists "Users manage own scenario_logs" on scenario_logs;

create policy "Users manage own scenario_logs"
on scenario_logs for all to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
