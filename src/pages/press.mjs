import { svg } from "../lib/html.mjs";
import { intro } from "../layout.mjs";

const route = (url, title, body, options) => ({ url, title, body, options });

export default function routes() {
  const routes = [];
routes.push(
  route(
    "/prensa/",
    "Prensa y recursos",
    `${intro("DOSSIER / CENIZA NEÓN", "Material para contar<br>esta historia.", "Descripción verificada, imágenes del proyecto y estado actual. Identifica siempre las capturas como material de desarrollo.")}<section class="container press-layout"><div class="prose"><h2>Ficha del proyecto</h2><dl><dt>Título</dt><dd>CENIZA NEÓN</dd><dt>Género</dt><dd>Supervivencia, construcción y combate en arenas</dd><dt>Motor y plataforma de desarrollo</dt><dd>Godot · PC</dd><dt>Estado</dt><dd>Prototipo en desarrollo. Sin beta pública ni fecha de lanzamiento.</dd><dt>Jugadores</dt><dd>Prototipo de un jugador. Cooperativo para dos previsto.</dd></dl><h2>Descripción breve</h2><p>CENIZA NEÓN combina la dirección de colonias con combates personales en una ciudad industrial en ruinas. Construye de día, resiste de noche y cruza cinco distritos para enfrentarte a una red que sigue ejecutando una emergencia que nadie ha revocado.</p><h2>Uso de los materiales</h2><p>Estos recursos pueden acompañar cobertura editorial del proyecto con atribución a CENIZA NEÓN. No autorizan reventa, incorporación a otros juegos ni redistribución de la banda sonora. El arte conceptual no debe presentarse como captura jugable.</p></div><div class="press-downloads"><h2>Identidad y capturas</h2><a href="/media/logo.png" download>Logotipo transparente · PNG ${svg("arrow")}</a><a href="/media/hero.webp" download>Portada · Arte conceptual ${svg("arrow")}</a><a href="/media/station.webp" download>Estación · Arte conceptual ${svg("arrow")}</a><a href="/media/colonia_vigente_20261029.webp" download>Colonia · Captura de desarrollo ${svg("arrow")}</a><a href="/media/madre_arena_20261029.webp" download>Arena · Captura de desarrollo ${svg("arrow")}</a><a href="/media/teaser-v2.mp4" download>Teaser conceptual · MP4 ${svg("arrow")}</a><p class="caption-note">No se incluyen cifras de jugadores, ventas o fechas que todavía no existen.</p></div></section>`,
  ),
);
  return routes;
}
