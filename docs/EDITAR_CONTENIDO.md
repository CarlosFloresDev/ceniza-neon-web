# Mantener la web

## Una entrada de bitácora

Añade un objeto a `posts` en `content/editorial.mjs`. Usa un `slug` único, fecha real, categoría, título, resumen, imagen de `public/media/`, descripción de imagen, tiempo de lectura aproximado y cuerpo Markdown. Coloca primero lo más reciente. El generador crea página, enlaces desde el archivo, portada y RSS.

La referencia de commit es opcional como dato editorial, pero la plantilla actual espera el campo `commit`. Si el registro no corresponde a un cambio de código, adapta ese bloque para mostrar el identificador de la prueba o documento. No inventes un hash para rellenarlo.

Identifica las imágenes como captura, arte ambiental o ilustración conceptual. Una entrada debe explicar qué cambió, cómo se comprobó y qué sigue pendiente. No utilices una captura antigua para demostrar el estado de una función nueva.

## Wiki

Cada artículo de `content/wiki.mjs` tiene `slug`, grupo, título, resumen y Markdown. La búsqueda utiliza título, resumen y grupo, sin depender de tildes. Si añades un tema importante, usa también sus términos en el resumen para que se encuentre. Las categorías y enlaces relacionados se generan desde los datos.

Las cifras de costes, vida y tiempos describen el prototipo revisado. Actualízalas junto a la versión del juego que las cambie. El apartado «Futuro» no equivale a funcionalidad disponible.

## Discord y correo

Introduce la invitación oficial en `content/site.json`, campo `discord`, con URL HTTPS de Discord. Añade el correo que el autor desea hacer público en `email`. El correo de autenticación de servicios no se usa automáticamente como contacto público.

Cuando esos campos están vacíos, las páginas explican que el canal está en preparación. Con valores confirmados se generan el botón externo y el enlace de correo. No hace falta modificar HTML a mano.

## Roadmap

Los hitos viven en `roadmap`. Conserva estados explícitos y cambia «previsto» a «implementado» solo después de comprobarlo. Las fechas deben proceder de una decisión real de publicación; no son necesarias para un roadmap útil.

## Recursos y audio

`node scripts/import-game-assets.mjs "RUTA_DEL_JUEGO"` actualiza las copias desde un checkout del juego. Lee capturas, retratos, panoramas y 21 OGG. Requiere FFmpeg y FFprobe. No se ejecuta durante una compilación normal y puede sobrescribir copias de medios, por lo que hay que revisar el diff.

`python scripts/build-teaser.py` vuelve a renderizar el vídeo desde los recursos incluidos. Guarda intermedios en `build/teaser/`. Las ilustraciones originales están en `art/sources/`; no dependas de rutas locales de la herramienta de generación.

## Antes de publicar

1. Actualiza el contenido y `lastVerified` si has revisado sus datos.
2. Ejecuta compilación, pruebas de contenido y Playwright.
3. Revisa inicio, universo, wiki y reproductor en escritorio y móvil.
4. Revisa los archivos del commit: no incluir `dist`, `build`, credenciales o dependencias.
5. Publica con Wrangler y comprueba la URL devuelta, audio, vídeo y una ruta de wiki.

Los guiones completos permanecen en `narrativa/` para trabajar sin destripar la campaña en la web pública. Sus cambios no deben describirse como una actualización jugable hasta integrarlos y comprobarlos en el proyecto Godot.
