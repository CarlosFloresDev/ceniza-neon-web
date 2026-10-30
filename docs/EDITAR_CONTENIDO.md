# Mantener la web

## Una entrada de bitácora

Añade un objeto a las entradas recientes de `content/editorial.mjs`, o a `archivePosts` en `content/archive-posts.mjs` si reconstruyes una etapa anterior. Usa `slug` único, categoría, título, resumen, imagen de `public/media/`, descripción de imagen, tiempo de lectura aproximado, `commit`, `recordedOn` y cuerpo Markdown. `recordedOn` es la fecha real de redacción; los registros iniciales usan el 29 de octubre de 2026.

Actualiza primero las referencias con `node scripts/import-history.mjs "RUTA_DEL_JUEGO"`. El script solo lee el checkout del juego y escribe el manifiesto en la web. La fecha del avance se calcula desde la fecha de autor del commit; no se escribe manualmente. Orden y número de registro se calculan por su instante real. El generador crea página, cronología, enlaces, portada y RSS. El RSS usa la fecha de redacción, no aparenta que el sitio ya publicaba en septiembre.

La referencia de commit es obligatoria en este archivo de avances: si no existe en el manifiesto, la compilación se detiene. Para una futura noticia independiente de código, define otro tipo editorial con su propia fecha de publicación; no inventes un hash para rellenar este contrato.

Identifica las imágenes como captura, arte ambiental o ilustración conceptual. Una entrada debe explicar qué cambió, cómo se comprobó y qué sigue pendiente. No utilices una captura antigua para demostrar el estado de una función nueva. Si no hay una captura histórica verificada, usa `image: null`: aparecerá una ficha editorial expresamente identificada, no una imagen inventada del prototipo.

## Wiki

Cada artículo de `content/wiki.mjs` tiene `slug`, grupo, título, resumen y Markdown. La búsqueda utiliza título, resumen y grupo, sin depender de tildes. Si añades un tema importante, usa también sus términos en el resumen para que se encuentre. Las categorías y enlaces relacionados se generan desde los datos.

Las cifras de costes, vida y tiempos describen el prototipo revisado. Actualízalas junto a la versión del juego que las cambie. El apartado «Futuro» no equivale a funcionalidad disponible.

## Discord y correo

Introduce la invitación oficial en `content/site.json`, campo `discord`, con URL HTTPS de Discord. Añade el correo que el autor desea hacer público en `email`. El correo de autenticación de servicios no se usa automáticamente como contacto público.

Cuando esos campos están vacíos, las páginas explican que el canal está en preparación. Con valores confirmados se generan el botón externo y el enlace de correo. No hace falta modificar HTML a mano.

## Roadmap

Los hitos viven en `roadmap`. Conserva estados explícitos y cambia «previsto» a «implementado» solo después de comprobarlo. Las fechas deben proceder de una decisión real de publicación; no son necesarias para un roadmap útil.

## Recursos y audio

`node scripts/import-game-assets.mjs "RUTA_DEL_JUEGO"` actualiza las copias desde un checkout del juego. Lee capturas, retratos, panoramas y 21 OGG. Requiere FFmpeg y FFprobe. Las capturas de jefes se leen de las salidas gráficas de `boss_hud_test`, y caminar de la galería vigente; no usa los jefes sustituidos de `docs/media`. Es necesario disponer primero de esas capturas revisadas. No se ejecuta durante una compilación normal y puede sobrescribir copias de medios, por lo que hay que revisar el diff.

Al importar otra revisión, actualiza los nombres versionados y comprueba cada imagen: la fecha en el nombre no debe quedar obsoleta. El mismo criterio se aplica al teaser (`teaser-v2.mp4`) para que una caché del navegador no siga enseñando la versión anterior.

`python scripts/build-teaser.py` vuelve a renderizar el vídeo desde los recursos incluidos. Guarda intermedios en `build/teaser/`. Las ilustraciones originales están en `art/sources/`; no dependas de rutas locales de la herramienta de generación.

## Antes de publicar

1. Actualiza el contenido y `lastVerified` si has revisado sus datos.
2. Ejecuta compilación, pruebas de contenido y Playwright.
3. Revisa inicio, universo, wiki y reproductor en escritorio y móvil.
4. Revisa los archivos del commit: no incluir `dist`, `build`, credenciales o dependencias.
5. Publica con Wrangler y comprueba la URL devuelta, audio, vídeo y una ruta de wiki.

Los guiones completos permanecen en `narrativa/` para trabajar sin destripar la campaña en la web pública. Sus cambios no deben describirse como una actualización jugable hasta integrarlos y comprobarlos en el proyecto Godot.
