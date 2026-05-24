# Guia de publicacion

## Opcion recomendada: GitHub Pages

GitHub Pages sirve archivos estaticos directamente desde un repositorio y entrega HTTPS, que es necesario para que la PWA funcione correctamente en produccion.

### Comandos despues de crear el repositorio en GitHub

Reemplaza `TU_USUARIO` y `suite-empresarial` por los valores reales:

```powershell
git remote add origin https://github.com/TU_USUARIO/suite-empresarial.git
git branch -M main
git push -u origin main
```

Despues:

1. Entra al repositorio en GitHub.
2. Abre `Settings` > `Pages`.
3. Selecciona `GitHub Actions` como fuente.
4. Abre `Actions` y ejecuta o espera el workflow `Deploy PWA to GitHub Pages`.

### URL publica

La app quedara disponible en:

```text
https://TU_USUARIO.github.io/suite-empresarial/
```

## Dominio propio

Cuando ya tengas un dominio, puedes conectarlo desde `Settings` > `Pages` > `Custom domain`.

## Actualizaciones

Cada cambio nuevo se publica con:

```powershell
git add .
git commit -m "Actualizar app"
git push
```

GitHub Actions publicara la nueva version automaticamente.
