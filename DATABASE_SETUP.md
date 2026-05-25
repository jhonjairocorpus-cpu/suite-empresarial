# Base de datos de produccion

Esta suite ya tiene una base preparada para Supabase/PostgreSQL. La app publicada sigue funcionando en modo demo local hasta conectar las credenciales cloud.

## Crear la base

1. Crear un proyecto en Supabase.
2. Abrir `SQL Editor`.
3. Copiar y ejecutar `database/supabase-schema.sql`.
4. Activar proveedores de autenticacion en `Authentication`.
5. Crear el primer usuario administrador.
6. Insertar una empresa y un perfil ligado al usuario.

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

Todas las tablas operativas usan `company_id`. Las politicas RLS limitan cada usuario a los datos de su empresa.

## Variables de conexion

Copiar `cloud-config.example.js` como `cloud-config.js` cuando vayamos a conectar la app:

```js
window.QUANTROX_CLOUD = {
  enabled: true,
  supabaseUrl: "https://TU-PROYECTO.supabase.co",
  supabaseAnonKey: "TU-ANON-KEY"
};
```

La `anon key` puede vivir en el navegador si las politicas RLS estan correctas. Nunca se debe publicar una `service_role key`.

## Siguiente implementacion

1. Cargar `@supabase/supabase-js` en la PWA.
2. Cambiar el login demo por `supabase.auth`.
3. Leer `profiles.company_id` despues del login.
4. Reemplazar `localStorage` por consultas a tablas.
5. Mantener `localStorage` como cache offline.
