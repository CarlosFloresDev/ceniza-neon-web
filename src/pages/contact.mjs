import { esc, svg } from "../lib/html.mjs";
import { intro } from "../layout.mjs";
import { site } from "../site.mjs";

const route = (url, title, body, options) => ({ url, title, body, options });

export default function routes() {
  const routes = [];
routes.push(
  route(
    "/contacto/",
    "Contacto",
    `${intro("AL OTRO LADO DEL ENLACE", "Hablemos.", "Errores, prensa, colaboraciones y preguntas sobre CENIZA NEÓN. Elige el canal que corresponda para que tu mensaje llegue con contexto.")}<section class="container contact-list"><article><span class="line-number">01</span><div><h2>Pruebas y problemas</h2><p>Si tienes acceso al prototipo, indica qué ocurrió, los pasos para repetirlo y tu versión. Adjunta una captura cuando ayude.</p><a class="text-link" href="${esc(site.issues)}" target="_blank" rel="noopener noreferrer">Abrir un informe en GitHub ${svg("arrow")}</a></div></article><article><span class="line-number">02</span><div><h2>Prensa y colaboraciones</h2><p>Información del proyecto, capturas y recursos de identidad están disponibles en el dossier de prensa.</p>${site.email ? `<a class="text-link" href="mailto:${esc(site.email)}">${esc(site.email)} ${svg("arrow")}</a>` : '<p class="pending-link">El correo público de contacto está pendiente de confirmación.</p>'}<a class="text-link" href="/prensa/">Abrir el dossier ${svg("arrow")}</a></div></article><article><span class="line-number">03</span><div><h2>Comunidad</h2><p>El canal oficial reunirá novedades y conversación sobre el juego. No hay una lista de beta ni un formulario de inscripción activos.</p><a class="text-link" href="/comunidad/">Ir a comunidad ${svg("arrow")}</a></div></article></section>`,
  ),
);
  return routes;
}
