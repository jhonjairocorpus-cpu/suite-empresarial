-- Quantrox Suite Empresarial
-- Base multiempresa para Supabase/PostgreSQL.
-- Ejecutar en Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  nit text not null unique,
  city text,
  email text,
  plan text not null default 'Suite Integral',
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('Propietario', 'Administrador', 'Contador', 'Cajero', 'Inventario', 'Gerencia')),
  status text not null default 'Activo' check (status in ('Activo', 'Invitado', 'Suspendido')),
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  channel text not null default 'Retail',
  contact_email text,
  balance numeric(14,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  sku text not null,
  name text not null,
  stock numeric(14,2) not null default 0,
  min_stock numeric(14,2) not null default 0,
  cost numeric(14,2) not null default 0,
  price numeric(14,2) not null default 0,
  created_at timestamptz not null default now(),
  unique (company_id, sku)
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  number text not null,
  status text not null default 'Pendiente' check (status in ('Borrador', 'Pendiente', 'Pagada', 'Anulada')),
  subtotal numeric(14,2) not null default 0,
  tax numeric(14,2) not null default 0,
  total numeric(14,2) generated always as (subtotal + tax) stored,
  issued_at date not null default current_date,
  created_at timestamptz not null default now(),
  unique (company_id, number)
);

create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  description text not null,
  quantity numeric(14,2) not null default 1,
  unit_price numeric(14,2) not null default 0,
  line_total numeric(14,2) generated always as (quantity * unit_price) stored
);

create table if not exists public.accounting_entries (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  detail text not null,
  account text not null,
  type text not null check (type in ('Ingreso', 'Gasto')),
  amount numeric(14,2) not null,
  entry_date date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  full_name text not null,
  role text not null,
  salary numeric(14,2) not null default 0,
  status text not null default 'Activa' check (status in ('Activa', 'Inactiva')),
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  text text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_company_id on public.profiles(company_id);
create index if not exists idx_customers_company_id on public.customers(company_id);
create index if not exists idx_products_company_id on public.products(company_id);
create index if not exists idx_invoices_company_id on public.invoices(company_id);
create index if not exists idx_accounting_entries_company_id on public.accounting_entries(company_id);
create index if not exists idx_employees_company_id on public.employees(company_id);
create index if not exists idx_tasks_company_id on public.tasks(company_id);

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.products enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.accounting_entries enable row level security;
alter table public.employees enable row level security;
alter table public.tasks enable row level security;

create or replace function public.current_company_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select company_id from public.profiles where id = auth.uid()
$$;

create policy "profiles_read_own_company"
on public.profiles for select
using (company_id = public.current_company_id());

create policy "profiles_update_self"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "companies_read_own"
on public.companies for select
using (id = public.current_company_id());

create policy "customers_company_access"
on public.customers for all
using (company_id = public.current_company_id())
with check (company_id = public.current_company_id());

create policy "products_company_access"
on public.products for all
using (company_id = public.current_company_id())
with check (company_id = public.current_company_id());

create policy "invoices_company_access"
on public.invoices for all
using (company_id = public.current_company_id())
with check (company_id = public.current_company_id());

create policy "invoice_items_company_access"
on public.invoice_items for all
using (
  exists (
    select 1 from public.invoices
    where invoices.id = invoice_items.invoice_id
      and invoices.company_id = public.current_company_id()
  )
)
with check (
  exists (
    select 1 from public.invoices
    where invoices.id = invoice_items.invoice_id
      and invoices.company_id = public.current_company_id()
  )
);

create policy "accounting_entries_company_access"
on public.accounting_entries for all
using (company_id = public.current_company_id())
with check (company_id = public.current_company_id());

create policy "employees_company_access"
on public.employees for all
using (company_id = public.current_company_id())
with check (company_id = public.current_company_id());

create policy "tasks_company_access"
on public.tasks for all
using (company_id = public.current_company_id())
with check (company_id = public.current_company_id());

