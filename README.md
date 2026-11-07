# CENIZA NEÓN · Web del videojuego

Sitio independiente del proyecto Godot: inicio, universo, bitácora, roadmap, wiki, comunidad, contacto, dossier y banda sonora. Sitio estático en español, sin cuentas ni formularios simulados, desplegado en Cloudflare Workers con assets. El Worker también sirve la API del ranking online del Boss Rush (`/api/ranking`).

**Web pública:** https://ceniza-neon.chefsitturchey.workers.dev · **Repositorio privado:** https://github.com/CarlosFloresDev/ceniza-neon-web

El juego sigue en desarrollo. La alfa de prueba 0.2 se descarga para Windows y Android desde `/descargar/`, que también tiene el botón **Jugar** (versión web de itch.io a pantalla completa) y el top 20 del Boss Rush. El cooperativo para dos jugadores es una función prevista. La web diferencia las mecánicas comprobadas del prototipo y la ampliación narrativa propuesta.

## Trabajar en local

Requiere Node.js 22 o posterior y npm. FFmpeg y Python solo son necesarios para volver a generar el teaser; el vídeo final ya está incluido. No se necesitan las cuentas de generación de imágenes para reconstruir la web.

```powershell
npm ci
npm run build
npm run dev
```

Abre `http://127.0.0.1:4321`. El servidor sirve la última compilación; después de editar fuentes, ejecuta otra vez `npm run build`.

## Publicación

```powershell
npm run build
npm test
npx playwright install chromium
npm run test:browser
npx wrangler whoami
npm run deploy
```

La autenticación pertenece a la sesión local de Wrangler. No colocar tokens en el repositorio. `wrangler.jsonc` define el Worker `ceniza-neon`: `worker/index.mjs` atiende `/api/*` y el resto se sirve como assets; la dirección pública está en `content/site.json`. Cambiar de cuenta o reutilizar otro Worker requiere revisar esa configuración antes de desplegar.

## Ranking online del Boss Rush

- `worker/index.mjs`: `GET /api/ranking` devuelve el top 20; `POST /api/ranking` recibe `{name, seconds, hits, version}` desde el juego (`levels/expedition/online_ranking.gd` en el repo del juego).
- Validación: nombre de 1 a 12 caracteres, tiempo de 30 s a 4 h y 20 envíos por hora por IP (hash). CORS abierto.
- Base D1 `ceniza-ranking`, enlazada como `DB`. Esquema en `worker/schema.sql`. Para crearla en otra cuenta: `npx wrangler d1 execute ceniza-ranking --remote --file worker/schema.sql`.
- Si cambias el formato de envío, cambia también el juego.

## Dónde editar

| Ruta | Contenido |
| --- | --- |
| `content/site.json` | URL pública, invitación de Discord, correo y estado del proyecto |
| `content/download.json` | Página `/descargar/`: versión, enlaces de GitHub, tamaños, requisitos y la dirección de itch.io (`itch.url` para el enlace, `itch.embed` para incrustar el juego; vacías muestran «Próximamente») |
| `content/editorial.mjs` | Entradas recientes de bitácora, fichas públicas de personajes, distritos y roadmap |
| `content/archive-posts.mjs` | Relatos retrospectivos de las primeras etapas |
| `content/development-history.json` | Referencias de Git para las fechas reales de los avances |
| `content/scenes.mjs` | Escena de pixel art de cada ruta: fondo, actores y profundidad |
| `content/scene-art.json` | Procedencia de los sprites y fondos importados del juego |
| `content/wiki.mjs` | Los 15 artículos de la wiki |
| `content/soundtrack.json` | 21 pistas, títulos extraídos de metadatos y duración |
| `scripts/build.mjs` | Orquesta la compilación: limpia `dist/`, copia `public/` y escribe cada ruta |
| `src/layout.mjs` | Documento HTML, cabecera, pie y metadatos SEO compartidos |
| `src/pages/` | Una plantilla por sección; cada una devuelve sus rutas |
| `src/lib/html.mjs` | Escape, iconos, botones e imágenes reutilizables |
| `src/feeds.mjs` | RSS, sitemap, robots y cabeceras de seguridad |
| `styles/` | Hoja de estilos en parciales numerados: tokens, base, estructura, componentes, escenas, páginas y movimiento |
| `public/app.js` | Navegación móvil, búsqueda, galería, teaser y reproductor |
| `public/motion.js` | Scroll suave (Lenis), cámara 3D de las escenas y apariciones (GSAP); respeta movimiento reducido |
| `public/media/` | Sprites y fondos del juego (`scene/`), capturas, logotipo y teaser |
| `public/audio/` | Audio MP3 para reproducción web |
| `art/teaser/` | Fuentes que usa `scripts/build-teaser.py` |
| `narrativa/` | Biblia, personajes, 36 escenas e instrucciones de integración; no se publica |
| `tests/` | Comprobaciones de contenido y pruebas de navegador |
| `docs/` | Guías de edición y despliegue |

`dist/` se reconstruye desde cero y se excluye de Git. `build/` guarda capturas de revisión, resultados de pruebas y archivos intermedios del teaser. Tampoco se publican. Este repositorio no depende del proyecto Godot para compilar: las copias necesarias están incluidas.

## Contenido inicial

36 páginas HTML: inicio y secciones, diez registros de bitácora, quince artículos de wiki y página 404. La cronología recorre avances del 22 de septiembre al 29 de octubre de 2026. Sus fechas proceden de un manifiesto de 70 commits del juego. Las entradas se redactaron el 29 de octubre: las retrospectivas distinguen esa fecha de la del avance, sin fingir publicaciones anteriores de esta web.

El guion de producción contiene aproximadamente 11.600 palabras: prólogo, cinco capítulos y epílogo, con biblia del mundo, personajes y consecuencias propuestas. No está integrado en el juego. La web pública solo presenta una síntesis del universo sin las revelaciones principales.

El teaser conceptual dura 36 segundos e incluye arte, capturas de desarrollo y «Dusk Beacon». No se presenta como una grabación de gameplay. El logotipo transparente y dos ilustraciones manga originales se generaron con OpenAI image_gen; sus especificaciones están en `art/prompts.json`.

Las capturas de jefes y colonia se renovaron con los diseños ilustrados vigentes. La entrada de caminar muestra la galería real y un detalle actual del Prefecto. Las imágenes sustituidas se retiraron del sitio, y el teaser corregido usa `teaser-v2.mp4` para evitar recuperar el vídeo anterior desde la caché.

Cada una de las 36 páginas tiene una cabecera ilustrada distinta: se conservan las de Inicio y Universo y se añaden 34 escenas nuevas para secciones, artículos, fichas de wiki y 404. Las miniaturas de bitácora usan su ilustración propia, mientras que las capturas verificadas permanecen dentro del artículo. Los rótulos distinguen siempre el arte conceptual de una captura jugable. Los PNG originales están en `art/sources/pages/`; sus copias WebP optimizadas, en `public/media/pages/`.

Los campos de Discord y correo se dejan vacíos hasta recibir sus valores oficiales. En ese estado, la web muestra que están pendientes y no publica enlaces falsos. El canal de errores de GitHub pertenece al repositorio público del juego.

## Verificación

`npm test` comprueba metadatos musicales, unicidad del contenido, enlaces y recursos locales de las 30 páginas, y exclusión de guiones y secretos de la publicación. Playwright revisa escritorio y móvil, búsqueda sin depender de tildes, filtros, audio voluntario, selección recordada sin autoplay, diálogos, movimiento reducido y 404.

Las capturas de navegador se guardan en `build/review/`. Son material de comprobación, no nuevos recursos permanentes de producción.

La revisión actual comprende seis pruebas de contenido y nueve de navegador, incluido un recorrido por las 36 cabeceras ilustradas. La primera publicación pasó tres pruebas de contenido y seis de navegador. La revisión de tipografía, cronología y capturas añade dos pruebas de contenido y dos de navegador. También se comprueba la versión pública: rutas, RSS, sitemap, 404, exclusión del guion, reproducción musical y teaser. El estado de la publicación original se conserva en [la entrega inicial](docs/ENTREGA_INICIAL.md).

## Arte, música y derechos

`content/asset-provenance.json` conserva el origen de las capturas y el arte aprobado del juego. `art/prompts.json` conserva los prompts de las tres piezas nuevas. Los originales se mantienen sin modificar y las copias WebP se optimizan con Sharp.

El importador lee `TITLE` de los comentarios Vorbis de los OGG: por eso el nombre público puede diferir del nombre técnico de archivo. Algunas variantes comparten título. Las pistas sin ese metadato se marcan como «Sin título»; no se inventa un compositor.

La tipografía usa Rajdhani en títulos, IBM Plex Mono en etiquetas técnicas, Cormorant Garamond en cursivas narrativas y Manrope en lectura. Barlow Condensed se conserva para renderizar los rótulos del teaser. Se sirven localmente con sus licencias OFL; las tres fuentes nuevas utilizan WOFF2. El contenido original del proyecto mantiene todos los derechos reservados de su titular; las dependencias y recursos de terceros conservan sus licencias. No se concede una licencia general de reutilización de la banda sonora.

Referencias de implementación: [Cloudflare Static Assets](https://developers.cloudflare.com/workers/static-assets/), [Playwright](https://playwright.dev/docs/intro) y las guías de diseño de la skill Sites. Se usa Wrangler para publicar en la cuenta Cloudflare del usuario, sin registrar una copia adicional en el servicio Sites.
