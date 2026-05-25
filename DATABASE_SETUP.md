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

## Siguiente implementacion

1. Crear vistas/reportes SQL para tablero gerencial.
2. Agregar `customer_id` real en facturas desde el selector de clientes.
3. Sincronizar POS, nomina y portal de clientes.
4. Crear Edge Functions para DIAN, pagos y WhatsApp Business API.
5. Mantener `localStorage` como cache offline.
