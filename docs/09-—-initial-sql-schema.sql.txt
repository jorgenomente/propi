-- 09 — initial-sql-schema.sql
-- Proyecto: Propi
-- Versión: v0.1
-- Fecha: 2026-03-09

begin;

-- =========================================================
-- EXTENSIONES
-- =========================================================

create extension if not exists pgcrypto;

-- =========================================================
-- TABLA PRINCIPAL: tips
-- =========================================================

create table if not exists public.tips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  amount numeric(12,2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint tips_user_id_fkey
    foreign key (user_id)
    references auth.users (id)
    on delete cascade,

  constraint tips_amount_positive_check
    check (amount > 0)
);

-- =========================================================
-- INDICES
-- =========================================================

create index if not exists idx_tips_user_id
  on public.tips (user_id);

create index if not exists idx_tips_user_created_at_desc
  on public.tips (user_id, created_at desc);

-- =========================================================
-- UPDATED_AT AUTOMATICO
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_tips_set_updated_at on public.tips;

create trigger trg_tips_set_updated_at
before update on public.tips
for each row
execute function public.set_updated_at();

-- =========================================================
-- ROW LEVEL SECURITY
-- =========================================================

alter table public.tips enable row level security;
alter table public.tips force row level security;

-- Eliminar policies si existen para permitir re-ejecucion segura
drop policy if exists "tips_select_own" on public.tips;
drop policy if exists "tips_insert_own" on public.tips;
drop policy if exists "tips_update_own" on public.tips;
drop policy if exists "tips_delete_own" on public.tips;

create policy "tips_select_own"
on public.tips
for select
to authenticated
using (auth.uid() = user_id);

create policy "tips_insert_own"
on public.tips
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "tips_update_own"
on public.tips
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "tips_delete_own"
on public.tips
for delete
to authenticated
using (auth.uid() = user_id);

commit;