# Suite Empresarial

Aplicacion PWA para operar tres modulos empresariales desde navegador o como app instalada:

- Sistema Contable
- Sistema POS y Facturacion
- Sistema de Nomina

La app funciona como sitio web estatico y puede publicarse en GitHub Pages. Una vez publicada con HTTPS, los usuarios pueden instalarla en Android, iPhone, iPad, Windows y macOS.

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

## Datos

Esta primera version guarda informacion en el dispositivo con `localStorage`. Para uso multiusuario real, el siguiente paso es conectar una base de datos en la nube, por ejemplo Supabase con PostgreSQL.
