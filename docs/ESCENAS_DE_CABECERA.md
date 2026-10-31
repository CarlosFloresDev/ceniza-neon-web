# Escenas de cabecera

Las 36 rutas abren con una ilustración pictórica en hora dorada, generada con OpenAI image_gen a través de Codex. Cada una se coloca como plano lejano de una escena 3D, con neblina y lluvia por delante. El resto de la web usa el pixel art y las capturas del juego.

## Ilustraciones

- `art/heroes/ESTILO.md` fija dirección, paleta, composición y fichas de personaje.
- `scripts/hero-prompts.mjs` genera `art/heroes/prompts.json` a partir de `content/scenes.mjs`: un prompt por ruta con la misma base de estilo.
- Los PNG originales y su registro (prompt exacto, herramienta, fecha) quedan en `art/heroes/` y `art/heroes/records/`.
- `node scripts/install-hero-art.mjs` crea los WebP de `public/media/heroes/` y el manifiesto `content/hero-art.json` con dimensiones y SHA-256.
- Si una ruta no tiene ilustración, su cabecera vuelve a la composición de pixel art descrita abajo.
- Las cabeceras pintadas llevan una nota a mano: «Ilustración pintada, no es una captura».
- Variantes: la portada y el universo añaden polaroids de capturas reales; las páginas de los cinco jefes, la captura de su arena; el resto, solo la ilustración.

## Composición de pixel art (respaldo)

Los fondos de distrito, el Portador, los cinco jefes, las unidades, las estructuras y los objetos salen de `assets/` del proyecto Godot.

## Cómo se construye

- `scripts/import-scene-art.mjs RUTA_DEL_JUEGO` recorta celdas de las hojas de combate y del atlas de unidades, elimina márgenes transparentes y guarda WebP sin pérdida en `public/media/scene/`. Los fondos se amplían 2x por vecino más cercano. Cada archivo queda registrado en `content/scene-art.json` con su origen, recorte, tamaño y SHA-256.
- `content/scenes.mjs` describe cada escena: fondo (`zone`), texto alternativo y actores con posición `x`, altura `h`, elevación `y`, profundidad `z` y orientación.
- `src/scene.mjs` genera el marcado. Cada capa es un plano a pantalla completa desplazado con `translateZ` y compensado con `scale`, con la cámara en el borde inferior: en reposo el suelo coincide y al moverse la cámara las capas se separan.
- `src/scene-still.mjs` pinta durante la compilación un fotograma plano de cada escena en `dist/media/still/`. Se usa en tarjetas, metadatos sociales, prensa, el póster y el teaser.

## Movimiento

`public/motion.js` inclina la cámara con el puntero, la acerca al hacer scroll y en la portada ejecuta una única entrada: la cámara llega, el letrero de neón se enciende y aparece el resto. Con movimiento reducido no hay inclinación, avance, lluvia ni transiciones de página.

## Verificar

`npm test` comprueba que las 36 composiciones son distintas, que cada recurso procede de `assets/` del juego y que no quedan referencias al arte retirado. `npm run test:browser` recorre las rutas y comprueba que todas las capas cargan.
