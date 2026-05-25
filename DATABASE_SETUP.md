# Base de datos de produccion

Esta suite ya tiene una base preparada para Supabase/PostgreSQL. La app publicada sigue funcionando en modo demo local hasta conectar las credenciales cloud.

## Crear la base

1. Crear un proyecto en Supabase.
2. Abrir `SQL Editor`.
3. Copiar y ejecutar `database/supabase-schema.sql`.
4. Activar proveedores de autenticacion en `Authentication`.
5. Crear el primer usuario administrador.
6. Copiar el `User UID` del usuario.
7. Abrir `database/supabase-seed-demo.sql`, reemplazar `UUID_DEL_USUARIO_AUTH` por ese UID y ejecutar el archivo.
8. Editar `cloud-config.js` con la URL y la `anon key`.

## Modelo

- `companies`: empresas/clientes de la suite.
- `profiles`: usuarios y roles conectados a `auth.users`.
- `customers`: clientes comerciales.
- `products`: inventario.
- `invoices` e `invoice_items`: facturacion/POS.
- `inventory_movements`: entradas, salidas y ajustes de inventario generados por facturas o compras.
- `dian_events`: trazabilidad de envios, validaciones, rechazos y respuestas del proveedor DIAN.
- `accounting_entries`: movimientos contables.
- `employees`: nomina.
- `tasks`: tareas operativas.
- `warehouses`: bodegas preparadas.
- `price_lists`: listas de precios preparadas.

Todas las tablas operativas usan `company_id`. Las politicas RLS limitan cada usuario a los datos de su empresa.

## Variables de conexion

Editar `cloud-config.js` cuando vayamos a conectar la app publicada:

```js
window.QUANTROX_CLOUD = {
  enabled: true,
  supabaseUrl: "https://TU-PROYECTO.supabase.co",
  supabaseAnonKey: "TU-ANON-KEY"
};
```

La `anon key` puede vivir en el navegador si las politicas RLS estan correctas. Nunca se debe publicar una `service_role key`.

## Primer acceso cloud

1. Crear una empresa en `companies`.
2. Crear un usuario desde `Authentication`.
3. Crear su fila en `profiles` usando el `id` del usuario y el `company_id`.
4. Activar `enabled: true` en `cloud-config.js`.
5. Publicar la app.
6. Entrar con correo y clave desde la pantalla de login.

## Recuperacion de contraseña

La app incluye `Recuperar contraseña` en el login cloud. Para que el enlace vuelva correctamente a la app publicada, en Supabase:

1. Ir a `Authentication` > `URL Configuration`.
2. En `Site URL`, usar la URL publicada de la suite.
3. En `Redirect URLs`, agregar:

```text
https://jhonjairocorpus-cpu.github.io/suite-empresarial/*
```

Supabase solo enviara el flujo de recuperacion a usuarios registrados en Authentication.

Cuando Supabase esta activo, la app usa `signInWithPassword`, carga la empresa del perfil y sincroniza nuevas facturas con inventario y contabilidad.

Ejemplo para crear empresa y perfil desde el SQL Editor, despues de crear el usuario en Authentication:

```sql
insert into public.companies (name, nit, city, email, plan)
values ('Mi Empresa SAS', '900000000-1', 'Bogota', 'admin@miempresa.com', 'Suite Integral')
returning id;

insert into public.profiles (id, company_id, full_name, role, status)
values (
  'UUID_DEL_USUARIO_AUTH',
  'UUID_DE_LA_EMPRESA',
  'Administrador',
  'Propietario',
  'Activo'
);
```

Despues de eso se pueden insertar productos, clientes y empleados iniciales con el mismo `company_id`.

Tambien puedes usar `database/supabase-seed-demo.sql` para crear la empresa, el perfil administrador, productos, clientes y tareas base en un solo paso.

## Sincronizacion actual

Con Supabase activo, la app ya:

- Inicia sesion con `signInWithPassword`.
- Carga empresa, usuario, clientes, productos, facturas, contabilidad, nomina, tareas y movimientos.
- Sincroniza facturas nuevas con inventario y contabilidad.
- Sincroniza productos nuevos.
- Sincroniza clientes nuevos.
- Sincroniza cambios de empresa.
- Actualiza estado de pago de facturas que vienen desde cloud.
- Muestra estado de configuracion, sesion, empresa vinculada y pendientes.
- Prepara campos DIAN en facturas: `dian_status`, `cufe`, `xml_url`, `qr_url`, `dian_response` y eventos.

## Siguiente implementacion

1. Crear vistas/reportes SQL para tablero gerencial.
2. Agregar `customer_id` real en facturas desde el selector de clientes.
3. Sincronizar POS, nomina y portal de clientes.
4. Crear Edge Functions para pagos y WhatsApp Business API.
5. Elegir proveedor tecnologico DIAN y conectar token/API real para reemplazar el mock tecnico.
6. Mantener `localStorage` como cache offline.

## Edge Function DIAN

La funcion `supabase/functions/send-invoice-to-dian` es el backend seguro entre la app y el proveedor DIAN.

Flujo:

```text
App -> Supabase Edge Function -> Proveedor DIAN -> Supabase -> App
```

Despliegue:

```powershell
supabase login
supabase link --project-ref msfprxivjibbpgditbhg
supabase functions deploy send-invoice-to-dian
```

Variables minimas para modo mock:

```powershell
supabase secrets set DIAN_PROVIDER_MODE=mock
```

Variables para proveedor Factus en sandbox:

```powershell
supabase secrets set DIAN_PROVIDER_MODE=factus
supabase secrets set FACTUS_API_URL=https://api-sandbox.factus.com.co
supabase secrets set FACTUS_ACCESS_TOKEN=TOKEN_DEL_PROVEEDOR
supabase secrets set FACTUS_NUMBERING_RANGE_ID=ID_RANGO_NUMERACION
```

Variables opcionales segun proveedor:

```powershell
supabase secrets set FACTUS_PAYMENT_METHOD_CODE=10
supabase secrets set FACTUS_DEFAULT_PHONE=3000000000
supabase secrets set FACTUS_MUNICIPALITY_ID=149
supabase secrets set FACTUS_UNIT_MEASURE_ID=70
```

Nunca guardar tokens DIAN o `service_role` dentro de `cloud-config.js` ni en el navegador.
