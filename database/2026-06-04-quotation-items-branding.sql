-- Cotizaciones multi-item y personalizacion visual por empresa.
-- Ejecutar completo en Supabase SQL Editor.

create extension if not exists pgcrypto;

alter table public.companies add column if not exists logo_url text;
alter table public.companies add column if not exists accent_color text;
alter table public.companies add column if not exists quote_accent text;
alter table public.companies add column if not exists quote_footer text;

create table if not exists public.quotation_items (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid not null references public.quotations(id) on delete cascade,
  description text not null,
  quantity numeric(14,2) not null default 1,
  unit_price numeric(14,2) not null default 0,
  position integer not null default 1,
  line_total numeric(14,2) generated always as (quantity * unit_price) stored
);

create index if not exists idx_quotation_items_quotation_position
on public.quotation_items(quotation_id, position);

alter table public.quotation_items enable row level security;

grant select, insert, update, delete on public.quotation_items to authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'companies'
      and policyname = 'companies_update_own'
  ) then
    create policy "companies_update_own"
    on public.companies for update
    using (id = public.current_company_id())
    with check (id = public.current_company_id());
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'quotation_items'
      and policyname = 'quotation_items_company_access'
  ) then
    create policy "quotation_items_company_access"
    on public.quotation_items for all
    using (
      exists (
        select 1 from public.quotations
        where quotations.id = quotation_items.quotation_id
          and quotations.company_id = public.current_company_id()
      )
    )
    with check (
      exists (
        select 1 from public.quotations
        where quotations.id = quotation_items.quotation_id
          and quotations.company_id = public.current_company_id()
      )
    );
  end if;
end $$;
