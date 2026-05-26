-- Reparacion de persistencia para inventario, nomina y bitacora.
-- Ejecutar en Supabase SQL Editor si los datos se crean en pantalla pero no quedan guardados al recargar.

create extension if not exists pgcrypto;

alter table public.customers add column if not exists nit text;
alter table public.customers add column if not exists contact_name text;
alter table public.customers add column if not exists phone text;
alter table public.customers add column if not exists city text;
alter table public.customers add column if not exists address text;
alter table public.customers add column if not exists notes text;

create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  nit text,
  category text not null default 'General',
  contact_name text,
  email text,
  phone text,
  city text,
  address text,
  payment_terms text,
  status text not null default 'Activo' check (status in ('Activo', 'En revision', 'Inactivo')),
  notes text,
  created_at timestamptz not null default now()
);

create unique index if not exists idx_products_company_sku_unique
on public.products(company_id, sku);

create index if not exists idx_suppliers_company_id
on public.suppliers(company_id);

alter table public.products enable row level security;
alter table public.employees enable row level security;
alter table public.activity_logs enable row level security;
alter table public.suppliers enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on
  public.products,
  public.employees,
  public.activity_logs,
  public.suppliers
to authenticated;

grant execute on function public.current_company_id() to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
      and policyname = 'products_company_access'
  ) then
    create policy "products_company_access"
    on public.products for all
    using (company_id = public.current_company_id())
    with check (company_id = public.current_company_id());
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'suppliers'
      and policyname = 'suppliers_company_access'
  ) then
    create policy "suppliers_company_access"
    on public.suppliers for all
    using (company_id = public.current_company_id())
    with check (company_id = public.current_company_id());
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employees'
      and policyname = 'employees_company_access'
  ) then
    create policy "employees_company_access"
    on public.employees for all
    using (company_id = public.current_company_id())
    with check (company_id = public.current_company_id());
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'activity_logs'
      and policyname = 'activity_logs_company_access'
  ) then
    create policy "activity_logs_company_access"
    on public.activity_logs for all
    using (company_id = public.current_company_id())
    with check (company_id = public.current_company_id());
  end if;
end $$;
