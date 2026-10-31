import { svg, sigil } from "../lib/html.mjs";
import { intro, discordButton } from "../layout.mjs";
import { site } from "../site.mjs";

const route = (url, title, body, options) => ({ url, title, body, options });

export default function routes() {
  const routes = [];
routes.push(
  route(
    "/comunidad/",
    "Comunidad",
    `${intro("MANTENER ABIERTA LA SEÑAL", "Una ciudad entre todos.", "Sigue las decisiones, los errores y los pequeños avances que hacen posible el juego. La comunidad tendrá un sitio en este proceso.")}<section class="container community-layout"><div class="community-panel" data-reveal>${sigil}<p class="eyebrow">EL PUNTO DE ENCUENTRO</p><h2>Discord de<br><em>CENIZA NEÓN.</em></h2><p>Queremos reunir conversaciones de desarrollo, avisos de pruebas y comentarios sobre el juego en un canal oficial.</p>${discordButton()}${!site.discord ? '<span class="phase-badge">En preparación</span>' : ""}</div><div class="community-text"><h2>Dos enlaces.<br>Una misma ciudad.</h2><p>El cooperativo para hasta dos jugadores forma parte de la dirección del proyecto. Todavía no está implementado y no hay una prueba multijugador disponible.</p><p>Antes de invitarte a jugar queremos definir cómo se comparten construcción, tropas, progreso y decisiones. Esos pasos aparecerán en el roadmap y en registros de pruebas reales.</p><div class="community-links"><a href="/roadmap/">Ver el plan de desarrollo ${svg("arrow")}</a><a href="/bitacora/">Leer la bitácora ${svg("arrow")}</a><a href="/bitacora/feed.xml">Recibir novedades por RSS ${svg("arrow")}</a></div></div></section>`,
  ),
);
  return routes;
}
