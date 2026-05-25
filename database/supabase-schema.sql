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
  dian_status text not null default 'Por enviar',
  cufe text,
  qr_url text,
  xml_url text,
  dian_response text,
  dian_sent_at timestamptz,
  payment_link text,
  subtotal numeric(14,2) not null default 0,
  tax numeric(14,2) not null default 0,
  total numeric(14,2) generated always as (subtotal + tax) stored,
  issued_at date not null default current_date,
  created_at timestamptz not null default now(),
  unique (company_id, number)
);

alter table public.invoices add column if not exists dian_status text not null default 'Por enviar';
alter table public.invoices add column if not exists cufe text;
alter table public.invoices add column if not exists qr_url text;
alter table public.invoices add column if not exists xml_url text;
alter table public.invoices add column if not exists dian_response text;
alter table public.invoices add column if not exists dian_sent_at timestamptz;
alter table public.invoices add column if not exists payment_link text;

create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  description text not null,
  quantity numeric(14,2) not null default 1,
  unit_price numeric(14,2) not null default 0,
  line_total numeric(14,2) generated always as (quantity * unit_price) stored
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  type text not null check (type in ('Entrada', 'Salida', 'Ajuste')),
  quantity numeric(14,2) not null,
  origin text not null,
  movement_date date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.dian_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  invoice_id uuid references public.invoices(id) on delete set null,
  invoice_number text not null,
  event text not null,
  status text not null,
  response text,
  created_at timestamptz not null default now()
);

create table if not exists public.warehouses (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  city text,
  status text not null default 'Activa' check (status in ('Activa', 'Inactiva')),
  created_at timestamptz not null default now()
);

create table if not exists public.price_lists (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  margin_percent numeric(8,2) not null default 0,
  status text not null default 'Activa' check (status in ('Activa', 'Inactiva')),
  created_at timestamptz not null default now()
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
create index if not exists idx_inventory_movements_company_id on public.inventory_movements(company_id);
create index if not exists idx_dian_events_company_id on public.dian_events(company_id);
create index if not exists idx_warehouses_company_id on public.warehouses(company_id);
create index if not exists idx_price_lists_company_id on public.price_lists(company_id);
create index if not exists idx_accounting_entries_company_id on public.accounting_entries(company_id);
create index if not exists idx_employees_company_id on public.employees(company_id);
create index if not exists idx_tasks_company_id on public.tasks(company_id);

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.products enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.dian_events enable row level security;
alter table public.warehouses enable row level security;
alter table public.price_lists enable row level security;
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

create policy "inventory_movements_company_access"
on public.inventory_movements for all
using (company_id = public.current_company_id())
with check (company_id = public.current_company_id());

create policy "dian_events_company_access"
on public.dian_events for all
using (company_id = public.current_company_id())
with check (company_id = public.current_company_id());

create policy "warehouses_company_access"
on public.warehouses for all
using (company_id = public.current_company_id())
with check (company_id = public.current_company_id());

create policy "price_lists_company_access"
on public.price_lists for all
using (company_id = public.current_company_id())
with check (company_id = public.current_company_id());

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
