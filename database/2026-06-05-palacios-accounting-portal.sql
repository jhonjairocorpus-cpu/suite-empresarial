-- Portal contable exclusivo Palacios Constructores.
-- Agrega campos operativos al libro contable.

alter table public.accounting_entries add column if not exists third_party text;
alter table public.accounting_entries add column if not exists document_number text;
alter table public.accounting_entries add column if not exists project_name text;
alter table public.accounting_entries add column if not exists payment_method text;
alter table public.accounting_entries add column if not exists payment_status text not null default 'Pagado';

create index if not exists idx_accounting_entries_company_project
on public.accounting_entries(company_id, project_name);

create index if not exists idx_accounting_entries_company_payment_status
on public.accounting_entries(company_id, payment_status);
