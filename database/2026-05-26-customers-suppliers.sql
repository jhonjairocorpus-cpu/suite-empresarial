-- Migracion incremental: datos completos de clientes y modulo de proveedores.
-- Ejecutar en Supabase SQL Editor si la base ya existe.

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

create index if not exists idx_suppliers_company_id on public.suppliers(company_id);

alter table public.suppliers enable row level security;

grant select, insert, update, delete on public.suppliers to authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'suppliers'
      and policyname = 'suppliers_company_access'
  ) then
    create policy "suppliers_company_access"
    on public.suppliers for all
    using (company_id = public.current_company_id())
    with check (company_id = public.current_company_id());
  end if;
end
$$;
