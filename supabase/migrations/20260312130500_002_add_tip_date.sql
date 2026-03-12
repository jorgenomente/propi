begin;

alter table public.tips
  add column if not exists tip_date date;

update public.tips
set tip_date = created_at::date
where tip_date is null;

alter table public.tips
  alter column tip_date set default current_date;

alter table public.tips
  alter column tip_date set not null;

create index if not exists idx_tips_user_tip_date_created_at_desc
  on public.tips (user_id, tip_date desc, created_at desc);

commit;
