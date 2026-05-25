# Entrega a cliente

Checklist para entregar Quantrox Suite Empresarial como app usable en oficina, celular y web.

## 1. Preparar empresa en Supabase

1. Crear el usuario principal del cliente en `Authentication`.
2. Copiar el `User UID`.
3. Crear la empresa en `companies`.
4. Crear el perfil en `profiles` vinculando `id = User UID` y `company_id = empresa`.
5. Ejecutar `database/supabase-schema.sql` actualizado para asegurar `activity_logs` y campos contables.

## 2. Configurar acceso

1. Confirmar que `cloud-config.js` tenga `enabled: true`.
2. Confirmar la URL y publishable key del proyecto Supabase.
3. En Supabase, revisar `Authentication > URL Configuration`:
   - `Site URL`: `https://jhonjairocorpus-cpu.github.io/suite-empresarial/`
   - `Redirect URLs`: `https://jhonjairocorpus-cpu.github.io/suite-empresarial/*`

## 3. Instalar en dispositivos

- Oficina: abrir la URL en Chrome o Edge y usarla como web app.
- Windows: abrir la URL y seleccionar instalar app desde el navegador.
- Android: abrir en Chrome y tocar `Agregar a pantalla principal`.
- iPhone/iPad: abrir en Safari, compartir y tocar `Agregar a inicio`.

## 4. Prueba de entrega

1. Iniciar sesion con el usuario del cliente.
2. Crear producto.
3. Crear cliente.
4. Crear factura.
5. Verificar que descuenta inventario.
6. Verificar que crea ingreso contable.
7. Ir a `Ajustes` y revisar `Historial de cambios`.
8. Abrir la app en otro dispositivo con el mismo usuario y confirmar que los datos aparecen.

## 5. Regla operativa

Mientras el usuario este logueado en cloud, los cambios quedan en Supabase. Si trabaja en demo local, los datos solo viven en ese dispositivo.
