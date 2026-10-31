import { svg } from "../lib/html.mjs";
import { intro } from "../layout.mjs";

const route = (url, title, body, options) => ({ url, title, body, options });

export default function routes() {
  const routes = [];
routes.push(
  route(
    "/privacidad/",
    "Privacidad y créditos",
    `${intro("INFORMACIÓN DEL SITIO", "Privacidad y créditos.", "Qué guarda esta web, de dónde vienen sus recursos y cómo se presenta el estado del juego.")}<section class="prose legal-content"><h2>Datos y reproducción</h2><p>Esta versión no tiene cuentas, formularios de contacto, analítica publicitaria ni una lista de beta. No solicita datos personales para navegar. El reproductor guarda en el almacenamiento local del navegador la pista, posición y volumen para recordar tu selección; no inicia audio sin una acción tuya.</p><p>Cloudflare sirve el sitio y puede procesar datos técnicos de las solicitudes según sus políticas. Discord y GitHub son servicios externos: sus propias condiciones se aplican al abrirlos. La web no envía mensajes a esos servicios por ti.</p><button class="button button-ghost" id="clear-local">Borrar preferencias de audio</button><p id="clear-status" role="status"></p><h2 id="creditos">Arte, música y tecnología</h2><p>Los personajes, escenarios y capturas proceden del proyecto CENIZA NEÓN. Los retratos de personajes y el teaser conceptual incluyen recursos generados con OpenAI image_gen. Las ilustraciones de cabecera de esta web se generaron con OpenAI image_gen a partir de un brief de estilo propio; no son capturas del juego. Los sprites y fondos de pixel art del juego se trabajan y exportan con LibreSprite. La procedencia y el prompt de cada imagen quedan registrados en el repositorio.</p><p>La banda sonora reúne 21 pistas del repertorio integrado en el juego. Sus nombres proceden de los metadatos de los archivos; se evita inventar créditos de composición o afirmar una licencia de reutilización no verificada.</p><p>El sitio utiliza Marked, Sharp, GSAP, Lenis y las tipografías Permanent Marker, Caveat e Inter; Barlow Condensed y Manrope aparecen en el teaser. Todas se distribuyen bajo sus respectivas licencias, que acompañan a los archivos publicados. El juego se desarrolla con Godot.</p><h2>Estado y contenidos narrativos</h2><p>Las capturas muestran un prototipo. La ampliación narrativa y el cooperativo de dos jugadores son trabajos previstos; no se presentan como funciones terminadas. La web no distribuye una beta ni promete una duración de campaña sin pruebas.</p><h2>Derechos y contacto</h2><p>© 2026 CENIZA NEÓN. El contenido original se reserva a su titular. Los recursos de terceros mantienen sus condiciones. Para cobertura editorial consulta el dossier; para contactar, utiliza los canales publicados en la página de contacto.</p><a class="text-link" href="/contacto/">Contacto ${svg("arrow")}</a></section>`,
  ),
);
  return routes;
}
