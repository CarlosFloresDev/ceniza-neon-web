import { svg } from "../lib/html.mjs";
import { intro } from "../layout.mjs";
import { roadmap } from "../../content/editorial.mjs";

const route = (url, title, body, options) => ({ url, title, body, options });

export default function routes() {
  const routes = [];
routes.push(
  route(
    "/roadmap/",
    "Roadmap",
    `${intro("UNA DIRECCIÓN, SIN FECHAS INVENTADAS", "El camino por delante.", "Esto existe, esto estamos afinando y esto queremos construir. Los hitos cambian cuando el trabajo y las pruebas lo justifican.")}<section class="container roadmap-list">${roadmap.map((r, i) => `<article class="roadmap-row" data-reveal><span class="roadmap-number">0${i + 1}</span><div><span class="phase-badge phase-${i}">${r.status}</span><h2>${r.state}</h2><p>${r.text}</p></div><ul>${r.items.map((t) => `<li>${t}</li>`).join("")}</ul></article>`).join("")}<div class="note-box"><h3>¿Cuándo podremos jugar?</h3><p>No hay una fecha de lanzamiento ni una beta pública anunciada. Antes de abrir pruebas necesitamos comprobar estabilidad, progreso y experiencia completa. Las novedades aparecerán en la bitácora.</p><a class="text-link" href="/bitacora/">Seguir el desarrollo ${svg("arrow")}</a></div></section>`,
  ),
);
  return routes;
}
