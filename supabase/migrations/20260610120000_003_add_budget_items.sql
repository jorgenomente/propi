begin;

create table if not exists public.budget_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  type text not null,
  name text not null,
  amount numeric(12, 2) not null,
  budget_date date not null default current_date,
  is_recurring boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint budget_items_user_id_fkey
    foreign key (user_id)
    references auth.users (id)
    on delete cascade,
  constraint budget_items_type_check
    check (type in ('fixed_income', 'fixed_expense', 'variable_expense')),
  constraint budget_items_name_not_blank_check
    check (length(trim(name)) > 0),
  constraint budget_items_variable_not_recurring_check
    check (type <> 'variable_expense' or is_recurring = false),
  constraint budget_items_amount_positive_check
    check (amount > 0)
);

create index if not exists idx_budget_items_user_budget_date_desc
  on public.budget_items (user_id, budget_date desc);

create index if not exists idx_budget_items_user_type
  on public.budget_items (user_id, type);

drop trigger if exists trg_budget_items_set_updated_at on public.budget_items;

create trigger trg_budget_items_set_updated_at
before update on public.budget_items
for each row
execute function public.set_updated_at();

alter table public.budget_items enable row level security;
alter table public.budget_items force row level security;

drop policy if exists "budget_items_select_own" on public.budget_items;
drop policy if exists "budget_items_insert_own" on public.budget_items;
drop policy if exists "budget_items_update_own" on public.budget_items;
drop policy if exists "budget_items_delete_own" on public.budget_items;

create policy "budget_items_select_own"
on public.budget_items
for select
to authenticated
using (auth.uid() = user_id);

create policy "budget_items_insert_own"
on public.budget_items
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "budget_items_update_own"
on public.budget_items
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "budget_items_delete_own"
on public.budget_items
for delete
to authenticated
using (auth.uid() = user_id);

commit;
