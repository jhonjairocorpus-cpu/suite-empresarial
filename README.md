# Quantrox Suite Empresarial

Aplicacion PWA para operar una suite empresarial desde navegador o como app instalada:

- Facturacion electronica comercial
- POS y caja
- Inventario
- Facturacion conectada al inventario con descuento automatico de stock
- Contabilidad
- Nomina
- Clientes / CRM
- Reportes gerenciales
- Asistente empresarial con recomendaciones operativas
- Ventajas Quantrox: automatizaciones, cumplimiento, portal cliente e integraciones
- Portal de clientes, automatizaciones y personalizacion de marca
- Configuracion multiempresa

La app funciona como sitio web estatico y puede publicarse en GitHub Pages. Una vez publicada con HTTPS, los usuarios pueden instalarla en Android, iPhone, iPad, Windows y macOS.

## Estado actual

Esta version es una base comercial interactiva. Guarda datos de demostracion en `localStorage` y ya muestra la experiencia de una plataforma tipo SaaS. Para clientes reales, el siguiente paso tecnico es conectar autenticacion, empresas, roles y base de datos cloud.

## Probar en computador

Desde esta carpeta:

```powershell
python -m http.server 5173 --bind 127.0.0.1
```

Abrir:

```text
http://127.0.0.1:5173
```

## Publicar en GitHub Pages

1. Crear un repositorio nuevo en GitHub.
2. Subir estos archivos al repositorio en la rama `main`.
3. En GitHub, entrar a `Settings` > `Pages`.
4. En `Build and deployment`, elegir `GitHub Actions`.
5. Ir a la pestana `Actions` y esperar que termine el flujo `Deploy PWA to GitHub Pages`.
6. Abrir la URL publicada por GitHub Pages.

La URL queda normalmente con este formato:

```text
https://USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/
```

## Instalar en dispositivos

### Android

1. Abrir la URL publicada en Chrome.
2. Tocar el menu de Chrome.
3. Elegir `Instalar app` o `Agregar a pantalla principal`.

### iPhone o iPad

1. Abrir la URL publicada en Safari.
2. Tocar el boton de compartir.
3. Elegir `Agregar a pantalla de inicio`.

### Windows

1. Abrir la URL publicada en Microsoft Edge o Chrome.
2. Usar el icono de instalacion de la barra de direcciones.
3. Confirmar `Instalar`.

## Datos y produccion

El prototipo guarda informacion en el dispositivo con `localStorage`. Para uso multiusuario real, la ruta recomendada es:

1. Supabase/PostgreSQL para empresas, usuarios, roles y datos operativos.
2. API backend para reglas de negocio, permisos y auditoria.
3. Integracion con proveedor autorizado de facturacion electronica.
4. Backups automaticos y ambientes separados para demo, pruebas y produccion.

## Base de datos

La estructura inicial de produccion esta en `database/supabase-schema.sql`.

Ver el paso a paso en `DATABASE_SETUP.md`.

## Supabase cloud

La app carga `@supabase/supabase-js@2` desde CDN y lee `cloud-config.js`.

Si `enabled` esta en `false`, funciona en modo demo local. Si `enabled` esta en `true` y las credenciales son reales, el login usa Supabase Auth y la app sincroniza facturas nuevas con inventario y contabilidad.
