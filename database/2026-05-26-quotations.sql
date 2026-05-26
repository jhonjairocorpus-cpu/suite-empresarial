-- Migracion incremental: modulo de cotizaciones comerciales.
-- Ejecutar en Supabase SQL Editor si la base ya existe.

create table if not exists public.quotations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  number text not null,
  customer_name text not null,
  contact_email text,
  service text not null,
  quantity numeric(14,2) not null default 1,
  unit_price numeric(14,2) not null default 0,
  tax_rate numeric(8,2) not null default 19,
  subtotal numeric(14,2) not null default 0,
  tax numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  status text not null default 'Borrador' check (status in ('Borrador', 'Enviada', 'Aceptada', 'Rechazada')),
  valid_until date,
  issued_at date not null default current_date,
  notes text,
  created_at timestamptz not null default now(),
  unique (company_id, number)
);

create index if not exists idx_quotations_company_id on public.quotations(company_id);

alter table public.quotations enable row level security;

grant select, insert, update, delete on public.quotations to authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'quotations'
      and policyname = 'quotations_company_access'
  ) then
    create policy "quotations_company_access"
    on public.quotations for all
    using (company_id = public.current_company_id())
    with check (company_id = public.current_company_id());
  end if;
end
$$;
