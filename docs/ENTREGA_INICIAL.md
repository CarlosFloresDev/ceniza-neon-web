# Entrega inicial · 29 de octubre de 2026

- Sitio público: https://ceniza-neon.chefsitturchey.workers.dev
- Repositorio independiente privado: https://github.com/CarlosFloresDev/ceniza-neon-web
- Rama: `main` de este repositorio, sin modificar la rama del juego.
- Fuente publicada: commit `639b69f`.
- Worker: `ceniza-neon`.
- Versión Cloudflare: `e6fbb619-2fe6-4d13-be7e-6974f94b0a81`.

## Incluido

30 páginas HTML, cuatro registros reales de desarrollo, 15 artículos de wiki, roadmap por estado, personajes y cinco distritos, comunidad, contacto y dossier de prensa. Diseño responsive con animaciones, movimiento reducido, galería y navegación por teclado.

21 pistas con nombres extraídos de los metadatos de sus OGG; reproductor con selección, pausa, siguiente/anterior, posición y volumen. Preferencias locales sin autoplay al cambiar de página. Logotipo original, dos ilustraciones nuevas coherentes con los retratos aprobados y teaser conceptual de 36 segundos con «Dusk Beacon».

Archivo narrativo de aproximadamente 11.600 palabras: biblia, personajes, 36 escenas en siete bloques y contrato de integración futura. Sus originales están en `narrativa/`; no se copian a la web pública. El guion nuevo y el cooperativo no se presentan como funciones ya implementadas en Godot.

## Comprobaciones realizadas

- Compilación completa, RSS, sitemap y recursos locales.
- Tres pruebas de contenido: repertorio y estados, enlaces de todas las páginas, exclusión de archivos de producción y secretos.
- Seis pruebas Playwright: escritorio, móvil, wiki, audio, diálogos y accesibilidad básica.
- Auditoría de dependencias: cero vulnerabilidades notificadas en la revisión final.
- Revisión visual de inicio, universo, wiki, bitácora, roadmap y reproductor.
- Navegación pública real en anchos de 320, 768 y 1024 píxeles sin desbordamiento horizontal en las rutas comprobadas.
- Música y vídeo reproducibles en el navegador público; teaser con duración de 36 segundos; sin errores de JavaScript en la comprobación.
- Inicio, wiki, universo, banda sonora, RSS y sitemap responden correctamente. Rutas inexistentes y `/narrativa/BIBLIA.md` responden 404.

Las pruebas del sitio no sustituyen pruebas de equilibrio, multijugador o campaña del juego. El proyecto Godot solo se leyó para importar copias del contenido y comprobar sus reglas.

## Datos pendientes del autor

Invitación oficial de Discord y correo público de contacto. Las secciones correspondientes están preparadas y muestran el estado pendiente. No se utilizó el correo de autenticación de Cloudflare como correo de contacto. Un dominio propio puede incorporarse cuando el autor lo indique; mientras tanto la URL `workers.dev` es pública y funcional.
