# Despliegue Cloudflare

La web se publica como Worker con assets estáticos. La cuenta se toma de la sesión local autenticada de Wrangler; no utiliza un token dentro del código. No se modifican los otros proyectos de la cuenta.

`wrangler.jsonc` fija `ceniza-neon`, la fecha de compatibilidad y `dist/` como directorio de assets. Las rutas desconocidas usan `404.html`, no una página de inicio que simule una ruta existente. `_headers` añade política de recursos, protección de contenido, límites de permisos y caché de medios.

```powershell
npm run build
npm test
npm run test:browser
npm run deploy
```

La salida de Wrangler es la referencia de la versión y su URL. Tras cambiar de dominio, actualiza `content/site.json` para que canonical, Open Graph, RSS y sitemap usen la dirección real y recompila. Para conectar un dominio propio hace falta conocer el dominio y configurar su ruta en Cloudflare; no se adivina uno a partir del correo.

El despliegue contiene HTML, CSS, JavaScript, fuentes, arte optimizado, audio y teaser. No incluye los guiones de producción, los originales grandes de arte, herramientas, credenciales ni archivos del juego Godot. Cada asset debe respetar el límite individual de Cloudflare; el generador de teaser comprueba que su MP4 queda por debajo de 25 MiB.

El repositorio Git de esta web es independiente del del juego. La publicación del sitio no cambia la rama, los sprites ni los guardados del proyecto Godot.
