# Una ilustración para cada página

Las 36 rutas tienen cabeceras distintas. Inicio conserva el Portador ante la ciudad y Universo conserva la reparación de la lámpara. Se generaron otras 34 escenas originales con `image_gen`, siguiendo la misma línea manga a color, materiales industriales, luz cian y ámbar, y la identidad de los retratos aprobados.

## Distribución

- Nueve ilustraciones para las otras secciones y la página 404.
- Quince para los artículos de wiki: colonia, construcción, tropas, progresión, controles y cinco jefes.
- Diez para los registros de bitácora, cada una relacionada con su tema.

La composición reserva la zona izquierda para títulos y coloca el foco visual hacia la derecha. La capa oscura y el recorte cambian en móvil. Las cabeceras comparten movimiento de profundidad; al reducir movimiento se desactiva.

Las imágenes no son capturas ni anuncios de funciones terminadas. El rótulo de arte conceptual y los textos de estado se mantienen. Las capturas comprobadas del juego siguen dentro de los artículos y de las fichas correspondientes. Las entradas históricas conservan su explicación retrospectiva y sus pruebas de fecha.

## Archivos

`content/page-art.json` relaciona cada ruta con su imagen, texto alternativo, prompt completo y referencias. `src/page-art.mjs` compone la cabecera y conserva una sola cabecera H1 por página. También asigna la imagen propia a los metadatos sociales.

`art/sources/pages/` contiene los originales PNG intactos. `public/media/pages/` contiene las copias WebP de hasta 1680 píxeles de ancho. `art/page-records/` registra herramienta, prompt, referencias, dimensiones, fecha y SHA-256. Las referencias aprobadas necesarias para documentar la generación están copiadas en `art/references/`; el sitio se puede construir sin abrir el proyecto Godot.

## Verificar

Las pruebas comprueban las 36 rutas, la exclusividad de sus cabeceras, la existencia de recursos y fuentes, y la separación entre ilustración y captura real. Playwright recorre las páginas, comprueba que la imagen carga y que solo existe un H1. Las revisiones de escritorio y móvil muestran cómo quedan las composiciones junto al texto.
