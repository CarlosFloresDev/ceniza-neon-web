import { esc, svg, image } from "../lib/html.mjs";
import { intro } from "../layout.mjs";
import { marked } from "marked";
import { wiki } from "../../content/wiki.mjs";

// Capturas de desarrollo que acompañan a ciertos artículos.
const captures = {
  recaudador: "recaudador_arena_20261029",
  "santa-caldera": "caldera_arena_20261029",
  "coro-sumergido": "coro_arena_20261029",
  prefecto: "prefecto_arena_20261029",
  "madre-cero": "madre_arena_20261029",
  "reclutas-y-profesiones": "profesiones",
};

const route = (url, title, body, options) => ({ url, title, body, options });

export default function routes() {
  const routes = [];
routes.push(
  route(
    "/wiki/",
    "Wiki del juego",
    `${intro("MANUAL DE CAMPO", "Entender la ciudad.", "Reglas del prototipo, construcción, progresión y encuentros. Una wiki que distingue lo jugable de lo que sigue en diseño.")}<section class="container wiki-index"><div class="wiki-search"><label for="wiki-query">Buscar en la wiki</label><div>${svg("search")}<input id="wiki-query" type="search" placeholder="Núcleo, tropas, jefes…" autocomplete="off" aria-controls="wiki-results"></div><p id="wiki-count" role="status">${wiki.length} artículos disponibles</p></div><div class="wiki-filter" role="group" aria-label="Categorías"><button aria-pressed="true" data-wiki-filter="Todos">Todos</button>${[...new Set(wiki.map((w) => w.group))].map((g) => `<button aria-pressed="false" data-wiki-filter="${g}">${g}</button>`).join("")}</div><div class="wiki-results" id="wiki-results">${wiki.map((w) => `<a class="wiki-row" href="/wiki/${w.slug}/" data-category="${w.group}" data-search="${esc(w.title + " " + w.summary + " " + w.group)}"><span class="wiki-category">${w.group}</span><div><h2>${w.title}</h2><p>${w.summary}</p></div>${svg("arrow")}</a>`).join("")}</div><p class="empty-results" hidden>No encontramos ese término. Prueba con «núcleo», «mejoras» o «jefes».</p><aside class="note-box"><p>Última revisión: 6 de noviembre de 2026, alfa 0.2.0. El equilibrio y los controles pueden cambiar mientras el juego siga en alfa.</p></aside></section>`,
  ),
);
for (const entry of wiki) {
  const siblings = wiki
    .filter((w) => w.group === entry.group && w.slug !== entry.slug)
    .slice(0, 3);
  routes.push(
    route(
      `/wiki/${entry.slug}/`,
      entry.title,
      `<div class="container wiki-article-layout"><aside class="wiki-sidebar"><a href="/wiki/" class="text-link">← Toda la wiki</a><p class="eyebrow">${entry.group}</p><nav aria-label="Artículos relacionados">${wiki
        .filter((w) => w.group === entry.group)
        .map(
          (w) =>
            `<a href="/wiki/${w.slug}/" ${w.slug === entry.slug ? 'aria-current="page"' : ""}>${w.title}</a>`,
        )
        .join(
          "",
        )}</nav><small>Revisado: 29 oct 2026<br>Prototipo en desarrollo</small></aside><article class="wiki-article"><p class="eyebrow">WIKI / ${entry.group}</p><h1>${entry.title}</h1><p class="intro-copy">${entry.summary}</p><div class="prose">${captures[entry.slug] ? `<figure class="wiki-figure">${image(captures[entry.slug], entry.title + " / Captura de desarrollo")}<figcaption>CAPTURA DE DESARROLLO</figcaption></figure>` : ""}${marked.parse(entry.body)}</div>${siblings.length ? `<div class="wiki-related"><h2>Seguir leyendo</h2>${siblings.map((w) => `<a class="text-link" href="/wiki/${w.slug}/">${w.title} ${svg("arrow")}</a>`).join("")}</div>` : ""}</article></div>`,
      { description: entry.summary },
    ),
  );
}
  return routes;
}
