-- Reparacion de persistencia para inventario, nomina y bitacora.
-- Ejecutar en Supabase SQL Editor si los datos se crean en pantalla pero no quedan guardados al recargar.

create extension if not exists pgcrypto;

create unique index if not exists idx_products_company_sku_unique
on public.products(company_id, sku);

alter table public.products enable row level security;
alter table public.employees enable row level security;
alter table public.activity_logs enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on
  public.products,
  public.employees,
  public.activity_logs
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
