// Cabecera, pie y documento HTML comunes.
import { illustratePage } from "./page-hero.mjs";
import { sceneFor, stillPath } from "./scene.mjs";
import { esc, svg, sigil } from "./lib/html.mjs";
import { site } from "./site.mjs";

// Solo las fuentes del primer pintado; Silkscreen llega con font-display: swap.
const FONT_PRELOADS = ["big-shoulders", "literata"]
  .map(
    (name) =>
      `<link rel="preload" href="/fonts/${name}.woff2" as="font" type="font/woff2" crossorigin>`,
  )
  .join("");
// GSAP y Lenis se cargan antes que motion.js; todos con defer conservan el orden.
const SCRIPTS = [
  "/vendor/gsap.min.js",
  "/vendor/ScrollTrigger.min.js",
  "/vendor/lenis.min.js",
  "/app.js",
  "/motion.js",
]
  .map((src) => `<script src="${src}" defer></script>`)
  .join("");

export const links = [
  ["/", "Inicio"],
  ["/universo/", "El universo"],
  ["/bitacora/", "Bitácora"],
  ["/roadmap/", "Roadmap"],
  ["/wiki/", "Wiki"],
  ["/banda-sonora/", "Banda sonora"],
];
export const discordButton = () =>
  site.discord
    ? `<a class="button" href="${esc(site.discord)}" target="_blank" rel="noopener noreferrer">Entrar al Discord ${svg("arrow")}</a>`
    : `<p class="pending-link">La invitación oficial se publicará aquí cuando esté lista.</p>`;
function header(current) {
  return `<a class="skip-link" href="#contenido">Saltar al contenido</a><header class="site-header"><a class="brand" href="/" aria-label="CENIZA NEÓN · Inicio">${sigil}<span>CENIZA <b>NEÓN</b></span></a><button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Abrir navegación">${svg("menu")}</button><nav id="main-nav" aria-label="Principal">${links.map(([url, label]) => `<a href="${url}" ${url === current ? 'aria-current="page"' : ""}>${label}</a>`).join("")}<a class="nav-community" href="/comunidad/">Comunidad ${svg("arrow")}</a></nav></header>`;
}
function footer() {
  return `<footer class="site-footer"><div class="footer-main"><a class="brand" href="/">${sigil}<span>CENIZA <b>NEÓN</b></span></a><p>Mañana habrá trabajo.<br><span>Esta noche, la luz se queda.</span></p><div><a href="/contacto/">Contacto</a><a href="/prensa/">Prensa y recursos</a><a href="/privacidad/">Privacidad y créditos</a><a href="/bitacora/feed.xml">RSS de desarrollo</a></div></div><div class="footer-bottom"><span>© 2026 CENIZA NEÓN. Todos los derechos reservados.</span><span>En desarrollo. Sin beta pública.</span></div></footer><aside class="mini-player" aria-label="Reproductor de banda sonora" hidden><button class="mini-play" aria-label="Reproducir música">${svg("play")}</button><a href="/banda-sonora/"><small>Banda sonora</small><span class="mini-title">Dusk Beacon</span></a><span class="mini-clock">0:00</span><button class="mini-close" aria-label="Cerrar reproductor">${svg("close")}</button></aside><audio id="soundtrack-audio" preload="none"></audio><dialog id="gallery-dialog" class="gallery-dialog"><button class="dialog-close" aria-label="Cerrar imagen">${svg("close")}</button><img alt=""><p></p></dialog><dialog id="trailer-dialog" class="trailer-dialog"><button class="dialog-close" aria-label="Cerrar teaser">${svg("close")}</button><video controls playsinline preload="none" poster="/media/still/home.webp"><source src="/media/teaser-v2.mp4" type="video/mp4"><track kind="captions" src="/media/teaser-v2.vtt" srclang="es" label="Español"></video><p>Teaser: escenas de pixel art del juego y capturas de desarrollo. No representa una beta final.</p></dialog>`;
}
export function renderPage(
  url,
  title,
  body,
  { description = site.description, type = "website" } = {},
) {
  const still = stillPath(sceneFor(url), "jpg");
  body = illustratePage(url, body);
  const absolute = site.url ? site.url.replace(/\/$/, "") + url : null;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#0d131c"><title>${esc(title)}${title === site.title ? "" : " · CENIZA NEÓN"}</title><meta name="description" content="${esc(description)}">${absolute ? `<link rel="canonical" href="${esc(absolute)}">` : ""}<meta property="og:type" content="${type}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:locale" content="es_ES"><meta property="og:site_name" content="CENIZA NEÓN">${absolute ? `<meta property="og:url" content="${esc(absolute)}"><meta property="og:image" content="${esc(site.url)}${still}">` : ""}<meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/svg+xml" href="/favicon.svg">${FONT_PRELOADS}<link rel="stylesheet" href="/styles.css"><link rel="alternate" type="application/rss+xml" title="Bitácora de CENIZA NEÓN" href="/bitacora/feed.xml">${SCRIPTS}</head><body>${header(url)}<main id="contenido">${body}</main>${footer()}</body></html>`;
}
export function intro(kicker, title, text) {
  return `<div class="page-intro container"><p class="eyebrow">${kicker}</p><h1>${title}</h1><p class="intro-copy">${text}</p></div>`;
}
