-- Usuarios y permisos para portal Palacios.
-- Permite al Propietario vincular usuarios Auth a su empresa y restringe borrados.

alter table public.profiles add column if not exists contact_email text;

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
check (role in ('Propietario', 'Administrador', 'Oficina', 'Auxiliar contable', 'Contador', 'Cajero', 'Inventario', 'Gerencia'));

create or replace function public.current_user_is_principal()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'Propietario'
      and status = 'Activo'
  )
$$;

grant execute on function public.current_user_is_principal() to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
      and policyname = 'profiles_insert_by_principal'
  ) then
    create policy "profiles_insert_by_principal"
    on public.profiles for insert
    with check (
      public.current_user_is_principal()
      and company_id = public.current_company_id()
    );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
      and policyname = 'profiles_update_by_principal'
  ) then
    create policy "profiles_update_by_principal"
    on public.profiles for update
    using (
      public.current_user_is_principal()
      and company_id = public.current_company_id()
    )
    with check (
      public.current_user_is_principal()
      and company_id = public.current_company_id()
    );
  end if;
end $$;

drop policy if exists "accounting_entries_company_access" on public.accounting_entries;
drop policy if exists "accounting_entries_select_company" on public.accounting_entries;
drop policy if exists "accounting_entries_insert_company" on public.accounting_entries;
drop policy if exists "accounting_entries_update_company" on public.accounting_entries;
drop policy if exists "accounting_entries_delete_principal" on public.accounting_entries;

create policy "accounting_entries_select_company"
on public.accounting_entries for select
using (company_id = public.current_company_id());

create policy "accounting_entries_insert_company"
on public.accounting_entries for insert
with check (company_id = public.current_company_id());

create policy "accounting_entries_update_company"
on public.accounting_entries for update
using (company_id = public.current_company_id())
with check (company_id = public.current_company_id());

create policy "accounting_entries_delete_principal"
on public.accounting_entries for delete
using (
  company_id = public.current_company_id()
  and public.current_user_is_principal()
);
