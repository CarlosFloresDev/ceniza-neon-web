# Identidad, movimiento y archivo de desarrollo

## Tipografía

- **Rajdhani:** títulos y voz industrial de la interfaz.
- **IBM Plex Mono:** fechas, identificadores, etiquetas y detalles de archivo.
- **Cormorant Garamond Italic:** citas y énfasis narrativo.
- **Manrope:** lectura de párrafos, wiki y controles.
- **Barlow Condensed:** rótulos ya renderizados del teaser; se mantiene como entrada de la herramienta de vídeo.

Las fuentes se alojan localmente, con `font-display: swap` y sus licencias OFL. Las tres incorporaciones se comprimieron a WOFF2 sin cambiar sus dibujos. Fuentes oficiales: [Rajdhani](https://github.com/google/fonts/tree/main/ofl/rajdhani), [Cormorant Garamond](https://github.com/google/fonts/tree/main/ofl/cormorantgaramond) e [IBM Plex Mono](https://github.com/google/fonts/tree/main/ofl/ibmplexmono).

## Movimiento

`public/effects.js` añade ceniza ambiental a baja intensidad, desplazamiento de profundidad de la portada ante ratón y scroll, y una línea de progreso de lectura. El canvas limita densidad y frecuencia de dibujo y se detiene cuando la pestaña queda oculta.

CSS aporta señales luminosas lentas, barrido de metal al interactuar, respuesta en la cronología y movimiento de las fichas del archivo. Se conservan las revelaciones al desplazar la página. No se usa destello rápido ni se acompaña el movimiento con sonido automático.

La preferencia `prefers-reduced-motion` detiene las animaciones y evita el canvas y el parallax. También se atienden cambios de esa preferencia con la página abierta.

## Fechas y fuentes

El primer commit conservado es `d0557a6`, del **22 de septiembre de 2026**. El manifiesto inicial de esta revisión contiene 70 commits de la rama del juego examinada. `content/development-history.json` conserva SHA, fecha de autor, fecha de commit y asunto; no exporta correos ni credenciales.

Los diez registros se ordenan por la fecha real del avance y muestran la redacción por separado cuando son retrospectivos. Se cubren inicio, primeras animaciones, arena, campaña, novela visual, arte ilustrado, combate, organización, fondos y fuentes de caminar. No se inventan semanas de publicaciones que esta web todavía no tenía.

## Imágenes

Se retiraron del sitio las capturas sustituidas de los jefes y la colonia. Sus reemplazos usan nombres versionados con el 29 de octubre y muestran arte ilustrado y marcos vigentes. La entrada de caminar utiliza la galería de caminar y el detalle del Prefecto, no una arena con su diseño anterior.

Las etapas sin captura histórica verificable utilizan fichas de fecha y referencia, rotuladas como material editorial. El arte ambiental que acompaña un registro retrospectivo no se presenta como screenshot de ese commit.

El teaser se volvió a renderizar con colonia y Prefecto corregidos. Su URL nueva evita confundir la caché del vídeo anterior con el recurso actualizado. Los metadatos de procedencia de las capturas se conservan en `content/asset-provenance.json`.
