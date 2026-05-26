-- Quantrox Suite Empresarial
-- Datos iniciales para probar Supabase despues de ejecutar supabase-schema.sql.
-- 1. Crear usuario en Supabase Authentication.
-- 2. Reemplazar UUID_DEL_USUARIO_AUTH por el ID del usuario creado.
-- 3. Ejecutar este archivo en SQL Editor.

with new_company as (
  insert into public.companies (name, nit, city, email, plan)
  values ('Comercial Andina SAS', '901.235.884-1', 'Bogota', 'admin@empresa.com', 'Suite Integral')
  on conflict (nit) do update set
    name = excluded.name,
    city = excluded.city,
    email = excluded.email,
    plan = excluded.plan
  returning id
),
admin_profile as (
  insert into public.profiles (id, company_id, full_name, role, status)
  select 'UUID_DEL_USUARIO_AUTH'::uuid, id, 'Administrador', 'Propietario', 'Activo'
  from new_company
  on conflict (id) do update set
    company_id = excluded.company_id,
    full_name = excluded.full_name,
    role = excluded.role,
    status = excluded.status
  returning company_id
)
insert into public.products (company_id, sku, name, stock, min_stock, cost, price)
select company_id, item.sku, item.name, item.stock, item.min_stock, item.cost, item.price
from admin_profile,
jsonb_to_recordset('[
  {"sku":"PRD-001","name":"Plancha industrial","stock":14,"min_stock":6,"cost":155000,"price":235000},
  {"sku":"PRD-002","name":"Bascula digital","stock":5,"min_stock":8,"cost":98000,"price":155000},
  {"sku":"PRD-003","name":"Impresora POS","stock":11,"min_stock":5,"cost":210000,"price":318000},
  {"sku":"SRV-014","name":"Servicio tecnico","stock":999,"min_stock":1,"cost":65000,"price":180000}
]'::jsonb) as item(sku text, name text, stock numeric, min_stock numeric, cost numeric, price numeric)
on conflict (company_id, sku) do update set
  name = excluded.name,
  stock = excluded.stock,
  min_stock = excluded.min_stock,
  cost = excluded.cost,
  price = excluded.price;

insert into public.customers (company_id, name, nit, channel, contact_name, contact_email, phone, city, address, balance, notes)
select c.id, item.name, item.nit, item.channel, item.contact_name, item.contact_email, item.phone, item.city, item.address, item.balance, item.notes
from (select id from public.companies where nit = '901.235.884-1') c,
jsonb_to_recordset('[
  {"name":"Drogueria Central","nit":"900.123.456-7","channel":"Mayorista","contact_name":"Area de compras","contact_email":"compras@central.com","phone":"3104567890","city":"Cali","address":"Calle 12 # 8-45","balance":0,"notes":"Cliente recurrente de contado"},
  {"name":"Mercado La 80","nit":"901.456.789-0","channel":"Retail","contact_name":"Administracion","contact_email":"admin@la80.com","phone":"3007894561","city":"Bogota","address":"Carrera 80 # 24-10","balance":904400,"notes":"Tiene cartera pendiente"},
  {"name":"Cafe Norte","nit":"1.144.555.332-1","channel":"Servicios","contact_name":"Gerencia","contact_email":"gerencia@cafenorte.com","phone":"3185557788","city":"Medellin","address":"Avenida Norte # 15-20","balance":0,"notes":"Prefiere contacto por correo"}
]'::jsonb) as item(name text, nit text, channel text, contact_name text, contact_email text, phone text, city text, address text, balance numeric, notes text);

insert into public.suppliers (company_id, name, nit, category, contact_name, email, phone, city, address, payment_terms, status, notes)
select c.id, item.name, item.nit, item.category, item.contact_name, item.email, item.phone, item.city, item.address, item.payment_terms, item.status, item.notes
from (select id from public.companies where nit = '901.235.884-1') c,
jsonb_to_recordset('[
  {"name":"Distribuciones Tecnicas SAS","nit":"901.777.224-5","category":"Inventario","contact_name":"Laura Gomez","email":"compras@ditec.com","phone":"3157788990","city":"Bogota","address":"Zona industrial","payment_terms":"30 dias","status":"Activo","notes":"Proveedor principal de equipos POS"},
  {"name":"Servicios Cloud Andinos","nit":"900.888.112-3","category":"Tecnologia","contact_name":"Soporte comercial","email":"ventas@cloudandinos.com","phone":"3012223344","city":"Cali","address":"Remoto","payment_terms":"Contado","status":"Activo","notes":"Hosting, dominios y soporte tecnico"}
]'::jsonb) as item(name text, nit text, category text, contact_name text, email text, phone text, city text, address text, payment_terms text, status text, notes text);

insert into public.quotations (company_id, number, customer_name, contact_email, service, quantity, unit_price, tax_rate, subtotal, tax, total, status, valid_until, issued_at, notes)
select c.id, item.number, item.customer_name, item.contact_email, item.service, item.quantity, item.unit_price, item.tax_rate, item.subtotal, item.tax, item.total, item.status, item.valid_until::date, item.issued_at::date, item.notes
from (select id from public.companies where nit = '901.235.884-1') c,
jsonb_to_recordset('[
  {"number":"CT-1003","customer_name":"Mercado La 80","contact_email":"admin@la80.com","service":"Suite empresarial + inventario","quantity":1,"unit_price":79900,"tax_rate":19,"subtotal":79900,"tax":15181,"total":95081,"status":"Enviada","valid_until":"2026-06-15","issued_at":"2026-05-24","notes":"Incluye configuracion inicial y acompanamiento remoto."},
  {"number":"CT-1002","customer_name":"Cafe Norte","contact_email":"gerencia@cafenorte.com","service":"Desarrollo de portal de clientes","quantity":1,"unit_price":1200000,"tax_rate":19,"subtotal":1200000,"tax":228000,"total":1428000,"status":"Aceptada","valid_until":"2026-06-05","issued_at":"2026-05-23","notes":"Alcance sujeto a integraciones de pago."}
]'::jsonb) as item(number text, customer_name text, contact_email text, service text, quantity numeric, unit_price numeric, tax_rate numeric, subtotal numeric, tax numeric, total numeric, status text, valid_until text, issued_at text, notes text)
on conflict (company_id, number) do update set
  customer_name = excluded.customer_name,
  contact_email = excluded.contact_email,
  service = excluded.service,
  quantity = excluded.quantity,
  unit_price = excluded.unit_price,
  tax_rate = excluded.tax_rate,
  subtotal = excluded.subtotal,
  tax = excluded.tax,
  total = excluded.total,
  status = excluded.status,
  valid_until = excluded.valid_until,
  issued_at = excluded.issued_at,
  notes = excluded.notes;

insert into public.tasks (company_id, text, done)
select c.id, item.text, item.done
from (select id from public.companies where nit = '901.235.884-1') c,
jsonb_to_recordset('[
  {"text":"Revisar cartera pendiente","done":false},
  {"text":"Validar stock bajo","done":false},
  {"text":"Enviar reporte semanal","done":true}
]'::jsonb) as item(text text, done boolean);
