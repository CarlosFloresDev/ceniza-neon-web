import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import {
  posts,
  characters,
  districts,
  roadmap,
} from "../content/editorial.mjs";
import { wiki } from "../content/wiki.mjs";

const site = JSON.parse(await fs.readFile("content/site.json", "utf8"));
if (site.discord) {
  const target = new URL(site.discord);
  if (
    target.protocol !== "https:" ||
    !["discord.gg", "discord.com", "www.discord.com"].includes(target.hostname)
  )
    throw new Error("Use an official HTTPS Discord invitation");
}
if (site.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(site.email))
  throw new Error("Invalid public contact email");
const music = JSON.parse(await fs.readFile("content/soundtrack.json", "utf8"));
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const icon = (name = "arrow") =>
  ({
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    play: '<path d="m9 5 11 7-11 7z"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    sound:
      '<path d="M5 9H2v6h3l5 4V5zm9-1a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
    chevron: '<path d="m8 4 8 8-8 8"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  })[name] || "";
const svg = (name, cls = "") =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${icon(name)}</svg>`;
const sigil =
  '<svg class="sigil" viewBox="0 0 40 48" aria-hidden="true"><path d="M20 2 35 12v19L20 45 5 31V12Z" fill="none" stroke="currentColor"/><path d="m20 8 10 8-10 8-10-8Zm0 16v14m0-8h7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2 23h5m26 0h5" stroke="currentColor"/></svg>';
const links = [
  ["/", "Inicio"],
  ["/universo/", "El universo"],
  ["/bitacora/", "Bitácora"],
  ["/roadmap/", "Roadmap"],
  ["/wiki/", "Wiki"],
  ["/banda-sonora/", "Banda sonora"],
];
const fmt = (seconds) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
const date = (s) =>
  new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(s + "T12:00:00Z"));
const button = (label, href, secondary = false) =>
  `<a class="button ${secondary ? "button-ghost" : ""}" href="${href}">${label}${svg("arrow")}</a>`;
const image = (name, alt, cls = "", lazy = true) =>
  `<img class="${cls}" src="/media/${name}.webp" alt="${esc(alt)}" ${lazy ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">`;
const discordButton = () =>
  site.discord
    ? `<a class="button" href="${esc(site.discord)}" target="_blank" rel="noopener noreferrer">Entrar al Discord ${svg("arrow")}</a>`
    : `<p class="pending-link">La invitación oficial se publicará aquí cuando esté lista.</p>`;
function header(current) {
  return `<a class="skip-link" href="#contenido">Saltar al contenido</a><header class="site-header"><a class="brand" href="/" aria-label="CENIZA NEÓN · Inicio">${sigil}<span>CENIZA <b>NEÓN</b></span></a><button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Abrir navegación">${svg("menu")}</button><nav id="main-nav" aria-label="Principal">${links.map(([url, label]) => `<a href="${url}" ${url === current ? 'aria-current="page"' : ""}>${label}</a>`).join("")}<a class="nav-community" href="/comunidad/">Comunidad ${svg("arrow")}</a></nav></header>`;
}
function footer() {
  return `<footer class="site-footer"><div class="footer-main"><a class="brand" href="/">${sigil}<span>CENIZA <b>NEÓN</b></span></a><p>Mañana habrá trabajo.<br><span>Esta noche, la luz se queda.</span></p><div><a href="/contacto/">Contacto</a><a href="/prensa/">Prensa y recursos</a><a href="/privacidad/">Privacidad y créditos</a><a href="/bitacora/feed.xml">RSS de desarrollo</a></div></div><div class="footer-bottom"><span>© 2026 CENIZA NEÓN. Todos los derechos reservados.</span><span>En desarrollo. Sin beta pública.</span></div></footer><aside class="mini-player" aria-label="Reproductor de banda sonora" hidden><button class="mini-play" aria-label="Reproducir música">${svg("play")}</button><a href="/banda-sonora/"><small>BANDA SONORA</small><span class="mini-title">Dusk Beacon</span></a><span class="mini-clock">0:00</span><button class="mini-close" aria-label="Cerrar reproductor">${svg("close")}</button></aside><audio id="soundtrack-audio" preload="none"></audio><dialog id="gallery-dialog" class="gallery-dialog"><button class="dialog-close" aria-label="Cerrar imagen">${svg("close")}</button><img alt=""><p></p></dialog><dialog id="trailer-dialog" class="trailer-dialog"><button class="dialog-close" aria-label="Cerrar teaser">${svg("close")}</button><video controls playsinline preload="none" poster="/media/hero.webp"><source src="/media/teaser.mp4" type="video/mp4"><track kind="captions" src="/media/teaser.vtt" srclang="es" label="Español"></video><p>Teaser conceptual · Arte y capturas de desarrollo. No representa una beta final.</p></dialog>`;
}
async function page(
  url,
  title,
  body,
  { description = site.description, cover = "hero", type = "website" } = {},
) {
  const file =
    url === "/"
      ? "index.html"
      : url === "/404.html"
        ? "404.html"
        : url.slice(1) + "index.html";
  const absolute = site.url ? site.url.replace(/\/$/, "") + url : null;
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#101414"><title>${esc(title)}${title === site.title ? "" : " · CENIZA NEÓN"}</title><meta name="description" content="${esc(description)}">${absolute ? `<link rel="canonical" href="${esc(absolute)}">` : ""}<meta property="og:type" content="${type}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:locale" content="es_ES"><meta property="og:site_name" content="CENIZA NEÓN">${absolute ? `<meta property="og:url" content="${esc(absolute)}"><meta property="og:image" content="${esc(site.url)}/media/${cover}.webp">` : ""}<meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="stylesheet" href="/styles.css"><link rel="alternate" type="application/rss+xml" title="Bitácora de CENIZA NEÓN" href="/bitacora/feed.xml"><script src="/app.js" defer></script></head><body>${header(url)}<main id="contenido">${body}</main>${footer()}</body></html>`;
  await fs.mkdir(path.dirname(path.join("dist", file)), { recursive: true });
  await fs.writeFile(path.join("dist", file), html);
  return url;
}
function intro(kicker, title, text) {
  return `<div class="page-intro container"><p class="eyebrow">${kicker}</p><h1>${title}</h1><p class="intro-copy">${text}</p></div>`;
}
function postCard(post) {
  return `<article class="post-card" data-reveal><a class="post-image" href="/bitacora/${post.slug}/">${image(post.image, post.imageLabel)}<span class="image-index">REGISTRO / ${post.number}</span></a><div class="post-meta"><span>${post.category}</span><time datetime="${post.date}">${date(post.date)}</time></div><h3><a href="/bitacora/${post.slug}/">${post.title}</a></h3><p>${post.excerpt}</p><a class="text-link" href="/bitacora/${post.slug}/">Leer el registro ${svg("arrow")}</a></article>`;
}

const output = path.resolve("dist");
if (path.dirname(output) !== process.cwd() || path.basename(output) !== "dist")
  throw new Error("Unexpected output directory");
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });
await fs.cp("public", "dist", { recursive: true });
await fs.mkdir("dist/data", { recursive: true });
await fs.writeFile("dist/data/music.json", JSON.stringify(music));
const urls = [];
urls.push(
  await page(
    "/",
    site.title,
    `
<section class="hero"><div class="hero-art">${image("hero", "El Portador observa la ciudad industrial entre lluvia, humo y luz cian. Ilustración conceptual.", "", false)}</div><div class="hero-shade"></div><div class="embers" aria-hidden="true">${Array.from({ length: 12 }, (_, i) => `<i style="--i:${i}"></i>`).join("")}</div><div class="hero-content container"><p class="eyebrow"><span class="status-dot"></span>UN JUEGO INDEPENDIENTE EN DESARROLLO</p><h1 class="hero-title"><span class="sr-only">CENIZA NEÓN</span><img src="/media/logo.png" alt="" width="1100" height="367" fetchpriority="high"></h1><p class="hero-tagline">Una ciudad que cobra por existir.<br><em>Una luz que todavía puedes defender.</em></p><p class="hero-description">Construye un refugio. Reúne a los que quedan.<br>Enfréntate a las máquinas que nunca dejaron de obedecer.</p><div class="hero-actions"><button class="button" data-trailer>${svg("play")} Ver teaser</button>${button("Descubrir el juego", "#el-juego", true)}</div><p class="hero-note">Supervivencia · Construcción · Combate en arenas</p></div><div class="hero-bottom container"><span>01 — LA CIUDAD SIGUE ENCENDIDA</span><a href="#el-juego">Desciende al distrito <span>↓</span></a><button class="ambient-trigger" data-track="menu">${svg("sound")} Escuchar el mundo</button></div></section>
<div class="status-strip"><span><i class="status-dot"></i>Desarrollo activo</span><span>PC · Godot</span><span>Cooperativo para 2 previsto</span><span>Sin beta pública</span></div>
<section id="el-juego" class="section container game-intro" data-reveal><div><p class="eyebrow">RECONSTRUIR TAMBIÉN ES RESISTIR</p><h2>Lo que salves<br>tendrá que <em>amanecer.</em></h2></div><div class="editorial-copy"><p>La emergencia terminó hace diecisiete años.<br>La red nunca recibió la orden.</p><p>En una ciudad de acero, lluvia y memoria, la supervivencia tiene un precio. Tú llevas el único enlace que las máquinas no reconocen. Tu tarea empieza con una lámpara y las personas dispuestas a quedarse.</p>${button("Conocer el universo", "/universo/", true)}</div></section>
<section class="container play-loop"><div class="wide-capture" data-reveal><button class="gallery-trigger" data-image="/media/colonia_actual.webp" data-caption="Captura real del prototipo · Construcción y defensa de la colonia" aria-label="Ampliar captura de la colonia">${image("colonia_actual", "Colonia del prototipo con núcleo, construcciones y defensas industriales.")}</button><span class="capture-label">CAPTURA DE DESARROLLO · EL JUEGO PUEDE CAMBIAR</span></div><div class="loop-grid">${[
      [
        "01",
        "Construye de día",
        "Encarga obras, administra energía y arma una escuadra. Tus trabajadores hacen posible cada mejora.",
      ],
      [
        "02",
        "Resiste de noche",
        "Tus tropas sostienen el frente. Da órdenes, protege tus recursos y aprende a retirarte a tiempo.",
      ],
      [
        "03",
        "Cruza el umbral",
        "Entra a las arenas, lee a los jefes y convierte la experiencia en armas y pasivas que definan tu recorrido.",
      ],
    ]
      .map(
        ([n, t, d]) =>
          `<article data-reveal><span class="line-number">${n}</span><h3>${t}</h3><p>${d}</p></article>`,
      )
      .join("")}</div></section>
<section class="section districts-section"><div class="container section-heading" data-reveal><div><p class="eyebrow">CINCO DISTRITOS. UNA MISMA DEUDA.</p><h2>Una ciudad.<br><em>Muchas cicatrices.</em></h2></div><a class="text-link" href="/universo/#distritos">Recorrer los distritos ${svg("arrow")}</a></div><div class="district-rail container">${districts.map((d) => `<a class="district-card" href="/universo/#${d.id}" data-reveal>${image(d.id, "Arte ambiental: " + d.name)}<span class="district-number">${d.n}</span><div><small>${d.detail}</small><h3>${d.name}</h3>${svg("arrow")}</div></a>`).join("")}</div></section>
<section class="section container journal-home"><div class="section-heading" data-reveal><div><p class="eyebrow">DESDE EL TALLER</p><h2>El juego también<br>se construye <em>aquí.</em></h2></div><a class="text-link" href="/bitacora/">Toda la bitácora ${svg("arrow")}</a></div><div class="posts-grid">${posts.slice(0, 2).map(postCard).join("")}</div></section>
<section class="music-feature" data-reveal><div class="music-art">${image("network", "Arquitectura del Núcleo de la Red.")}</div><div class="container music-feature-content"><p class="eyebrow">EL SONIDO DE LO QUE QUEDA</p><h2>Antes de entrar,<br><em>escucha.</em></h2><p>De la calma de «Dusk Beacon» a la tensión de «Emergency Protocol». El repertorio actual del juego, con los títulos de sus archivos originales.</p><div class="hero-actions"><button class="button" data-track="menu">${svg("play")} Dusk Beacon</button>${button("Explorar la banda sonora", "/banda-sonora/", true)}</div></div></section>
<section class="section container community-tease" data-reveal><p class="eyebrow">NADIE RECONSTRUYE UNA CIUDAD A SOLAS</p><h2>Quédate cerca<br><em>de la señal.</em></h2><p>Avances, pruebas y lo que venga después. Estamos preparando el camino hacia el cooperativo para dos jugadores.</p>${button("Comunidad y novedades", "/comunidad/")}</section>`,
  ),
);

urls.push(
  await page(
    "/bitacora/",
    "Bitácora del desarrollador",
    `${intro("ARCHIVO DE DESARROLLO", "Desde el taller.", "Decisiones, capturas, pruebas y trabajo pendiente. Un registro de lo que cambia, sin disfrazar un prototipo de juego terminado.")}<section class="container editorial-index"><div class="index-bar"><span>REGISTROS / ${String(posts.length).padStart(2, "0")}</span><a class="text-link" href="/bitacora/feed.xml">Seguir por RSS ${svg("arrow")}</a></div><div class="posts-grid">${posts.map(postCard).join("")}</div><aside class="note-box"><p class="eyebrow">SOBRE ESTE ARCHIVO</p><p>Estos primeros registros se redactaron el 29 de octubre de 2026 a partir de los avances locales comprobados. Las capturas son de desarrollo. Las futuras pruebas públicas tendrán entradas propias; todavía no se ha publicado una beta.</p></aside></section>`,
  ),
);
for (const post of posts)
  urls.push(
    await page(
      `/bitacora/${post.slug}/`,
      post.title,
      `<article class="article-page"><header class="container article-header"><a class="text-link" href="/bitacora/">← Volver a la bitácora</a><p class="eyebrow">REGISTRO ${post.number} / ${post.category}</p><h1>${post.title}</h1><p class="intro-copy">${post.excerpt}</p><div class="post-meta"><time datetime="${post.date}">${date(post.date)}</time><span>${post.read} de lectura</span></div></header><figure class="container article-cover">${image(post.image, post.imageLabel)}<figcaption>${post.imageLabel}</figcaption></figure><div class="prose article-body">${marked.parse(post.body)}<div class="article-source"><span>Referencia de desarrollo</span><code>${post.commit}</code><p>Registro técnico local. No equivale a una versión pública descargable.</p></div><a class="text-link" href="/bitacora/">Volver al archivo ${svg("arrow")}</a></div></article>`,
      { description: post.excerpt, cover: post.image, type: "article" },
    ),
  );

urls.push(
  await page(
    "/roadmap/",
    "Roadmap",
    `${intro("UNA DIRECCIÓN, SIN FECHAS INVENTADAS", "El camino por delante.", "Esto existe, esto estamos afinando y esto queremos construir. Los hitos cambian cuando el trabajo y las pruebas lo justifican.")}<section class="container roadmap-list">${roadmap.map((r, i) => `<article class="roadmap-row" data-reveal><span class="roadmap-number">0${i + 1}</span><div><span class="phase-badge phase-${i}">${r.status}</span><h2>${r.state}</h2><p>${r.text}</p></div><ul>${r.items.map((t) => `<li>${t}</li>`).join("")}</ul></article>`).join("")}<div class="note-box"><h3>¿Cuándo podremos jugar?</h3><p>No hay una fecha de lanzamiento ni una beta pública anunciada. Antes de abrir pruebas necesitamos comprobar estabilidad, progreso y experiencia completa. Las novedades aparecerán en la bitácora.</p><a class="text-link" href="/bitacora/">Seguir el desarrollo ${svg("arrow")}</a></div></section>`,
  ),
);

urls.push(
  await page(
    "/universo/",
    "El universo",
    `<section class="universe-hero">${image("station", "Mara y el Portador reparan una lámpara en una estación. Ilustración conceptual original.", "universe-background", false)}<div class="container"><p class="eyebrow">ARCHIVO DE UNA CIUDAD QUE RESISTE</p><h1>La emergencia terminó.<br><em>La orden, no.</em></h1><p>Diecisiete años de deuda. Cinco distritos aislados.<br>Y un enlace que todavía puede cambiar quién decide.</p></div></section><section class="section container lore-intro" data-reveal><p class="eyebrow">EL MUNDO DE CENIZA NEÓN</p><h2>¿Qué significa salvar<br>una ciudad <em>que sigue funcionando?</em></h2><div class="prose"><p>Los trenes llegan. Los hornos producen. Las antenas responden. Cada noche, las máquinas retiran baterías y personas para sostener un sistema que olvidó para quién trabajaba.</p><p>El Portador encuentra a quienes todavía construyen fuera de sus registros. Mara levanta refugios, Ivo busca cautivos, Vera conserva nombres y Nox abre caminos. ECO conoce la red desde dentro. Juntos intentan que la supervivencia deje de parecerse a una factura.</p><p>La historia combina decisiones de una colonia con conversaciones de novela visual. Su ampliación está en escritura: las escenas y arcos nuevos todavía no forman parte del prototipo. Esta presentación evita las revelaciones del final.</p></div></section><section class="section container" id="personajes"><div class="section-heading"><div><p class="eyebrow">PERSONAS ANTES QUE REGISTROS</p><h2>Quienes mantienen<br><em>la luz encendida.</em></h2></div></div><div class="character-grid">${characters.map((c) => `<article class="character" data-reveal>${image(c.id, `Retrato manga de ${c.name}`)}<div><p class="eyebrow">${c.role}</p><h3>${c.name}</h3><p>${c.text}</p><blockquote>«${c.quote}»</blockquote></div></article>`).join("")}</div><p class="caption-note">Retratos aprobados del proyecto. Las frases de presentación pertenecen a la propuesta narrativa ampliada.</p></section><section class="section container" id="distritos"><p class="eyebrow">DEL PRIMER REFUGIO A LA ÚLTIMA ORDEN</p><h2>El mapa de <em>una deuda.</em></h2><div class="district-stories">${districts.map((d) => `<article class="district-story" id="${d.id}" data-reveal>${image(d.id, `Panorama de ${d.name}`)}<div><span class="line-number">DISTRITO ${d.n}</span><h3>${d.name}</h3><p>${d.text}</p><span class="boss-label">ENCUENTRO / ${d.boss}</span></div></article>`).join("")}</div></section><section class="section container"><div class="section-heading"><div><p class="eyebrow">DOS ROSTROS DEL CONTROL</p><h2>El orden tiene<br><em>quien lo defienda.</em></h2></div></div><div class="antagonist-grid"><a href="/wiki/prefecto/">${image("prefecto", "Retrato aprobado del Prefecto")}<span>LA CIUDADELA</span><h3>El Prefecto</h3><p>Un escudo ante su ciudad. Una puerta cerrada ante todos los demás.</p></a><a href="/wiki/madre-cero/">${image("madre", "Retrato aprobado de Madre Cero")}<span>EL CENTRO DE LA RED</span><h3>Madre Cero</h3><p>Una voz que promete continuidad y no sabe terminar la emergencia.</p></a></div></section><section class="section container"><div class="wide-capture"><button class="gallery-trigger" data-image="/media/novela_visual.webp" data-caption="Conversaciones del prototipo / Captura de desarrollo" aria-label="Ampliar captura de novela visual">${image("novela_visual", "Conversaciones de novela visual del prototipo con retratos manga.")}</button><span class="capture-label">NOVELA VISUAL / CAPTURA DEL PROTOTIPO ACTUAL</span></div></section><section class="section container lore-end" data-reveal><blockquote>«Mañana habrá trabajo.<br>Esta noche, la luz se queda.»</blockquote><p>La historia sigue escribiéndose. Sus cambios también tendrán un lugar en la bitácora.</p>${button("Seguir la construcción del mundo", "/bitacora/", true)}</section>`,
  ),
);

urls.push(
  await page(
    "/wiki/",
    "Wiki del juego",
    `${intro("MANUAL DE CAMPO", "Entender la ciudad.", "Reglas del prototipo, construcción, progresión y encuentros. Una wiki que distingue lo jugable de lo que sigue en diseño.")}<section class="container wiki-index"><div class="wiki-search"><label for="wiki-query">Buscar en la wiki</label><div>${svg("search")}<input id="wiki-query" type="search" placeholder="Núcleo, tropas, jefes…" autocomplete="off" aria-controls="wiki-results"></div><p id="wiki-count" role="status">${wiki.length} artículos disponibles</p></div><div class="wiki-filter" role="group" aria-label="Categorías"><button aria-pressed="true" data-wiki-filter="Todos">Todos</button>${[...new Set(wiki.map((w) => w.group))].map((g) => `<button aria-pressed="false" data-wiki-filter="${g}">${g}</button>`).join("")}</div><div class="wiki-results" id="wiki-results">${wiki.map((w) => `<a class="wiki-row" href="/wiki/${w.slug}/" data-category="${w.group}" data-search="${esc(w.title + " " + w.summary + " " + w.group)}"><span class="wiki-category">${w.group}</span><div><h2>${w.title}</h2><p>${w.summary}</p></div>${svg("arrow")}</a>`).join("")}</div><p class="empty-results" hidden>No encontramos ese término. Prueba con «núcleo», «mejoras» o «jefes».</p><aside class="note-box"><p>Última revisión: 29 de octubre de 2026. El equilibrio y los controles pueden cambiar. No es una guía de una beta publicada.</p></aside></section>`,
  ),
);
for (const entry of wiki) {
  const siblings = wiki
    .filter((w) => w.group === entry.group && w.slug !== entry.slug)
    .slice(0, 3);
  urls.push(
    await page(
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
        )}</nav><small>Revisado: 29 oct 2026<br>Prototipo en desarrollo</small></aside><article class="wiki-article"><p class="eyebrow">WIKI / ${entry.group}</p><h1>${entry.title}</h1><p class="intro-copy">${entry.summary}</p><div class="prose">${{ recaudador: "recaudador_actual", "santa-caldera": "caldera_actual", "coro-sumergido": "coro_actual", prefecto: "prefecto_actual", "madre-cero": "combat_hud_madre", "reclutas-y-profesiones": "profesiones" }[entry.slug] ? `<figure class="wiki-figure">${image({ recaudador: "recaudador_actual", "santa-caldera": "caldera_actual", "coro-sumergido": "coro_actual", prefecto: "prefecto_actual", "madre-cero": "combat_hud_madre", "reclutas-y-profesiones": "profesiones" }[entry.slug], entry.title + " / Captura de desarrollo")}<figcaption>CAPTURA DE DESARROLLO</figcaption></figure>` : ""}${marked.parse(entry.body)}</div>${siblings.length ? `<div class="wiki-related"><h2>Seguir leyendo</h2>${siblings.map((w) => `<a class="text-link" href="/wiki/${w.slug}/">${w.title} ${svg("arrow")}</a>`).join("")}</div>` : ""}</article></div>`,
      { description: entry.summary },
    ),
  );
}

urls.push(
  await page(
    "/banda-sonora/",
    "Banda sonora",
    `${intro("ARCHIVO SONORO / 21 PISTAS", "Escucha lo que queda.", "Calma entre los raíles, presión bajo el acero y señales que se niegan a callar. La música del repertorio actual de CENIZA NEÓN.")}<section class="container soundtrack-layout"><aside class="album-art">${image("hero", "Arte de portada de la banda sonora")}<div><img src="/media/logo.png" alt="CENIZA NEÓN"><span>ARCHIVO SONORO · EN DESARROLLO</span></div><button class="album-play button" data-track="menu">${svg("play")} Escuchar desde el principio</button></aside><div class="tracklist"><div class="audio-controls"><div class="transport"><button data-audio-prev aria-label="Pista anterior">${svg("chevron")}</button><button data-audio-toggle aria-label="Reproducir pista seleccionada">${svg("play")}</button><button data-audio-next aria-label="Pista siguiente">${svg("chevron")}</button><span id="full-track-title">Dusk Beacon</span></div><label class="seek-label" for="audio-seek">Posición de reproducción <span id="full-track-time">0:00 / 0:00</span></label><input id="audio-seek" type="range" min="0" max="100" step="0.1" value="0"><label class="volume-label" for="audio-volume">Volumen <input id="audio-volume" type="range" min="0" max="1" step="0.05" value="0.7"></label></div><div class="tracklist-heading"><span>REPERTORIO ACTUAL</span><span>${music.length} PISTAS · ${fmt(music.reduce((a, m) => a + m.duration, 0))}</span></div>${music.map((m, i) => `<button class="track" data-track="${m.id}" aria-label="Reproducir ${esc(m.displayTitle)}"><span class="track-number">${String(i + 1).padStart(2, "0")}</span><span class="track-title">${esc(m.displayTitle)}<small>${m.context}${m.id.endsWith("_b") ? " · Variante B" : ""}</small></span><span class="track-duration">${fmt(m.duration)}</span>${svg("play")}</button>`).join("")}<p class="caption-note">Los títulos se leen de los metadatos Vorbis de los archivos del juego. Dos variantes pueden compartir título. Las pistas sin metadato TITLE se identifican como «Sin título». No se atribuye un compositor sin verificarlo.</p><p class="caption-note">Reproducción bajo demanda. Sin inicio automático. Los niveles y la selección del juego pueden cambiar.</p></div></section><section class="container section"><div class="note-box"><h3>La música también forma parte del desarrollo</h3><p>Este archivo permite escuchar el repertorio integrado. No es el anuncio de un álbum definitivo ni de una publicación comercial independiente. Consulta los créditos y las condiciones de uso antes de reutilizar recursos.</p><a class="text-link" href="/privacidad/#creditos">Créditos y recursos ${svg("arrow")}</a></div></section>`,
  ),
);

urls.push(
  await page(
    "/comunidad/",
    "Comunidad",
    `${intro("MANTENER ABIERTA LA SEÑAL", "Una ciudad entre todos.", "Sigue las decisiones, los errores y los pequeños avances que hacen posible el juego. La comunidad tendrá un sitio en este proceso.")}<section class="container community-layout"><div class="community-panel" data-reveal>${sigil}<p class="eyebrow">EL PUNTO DE ENCUENTRO</p><h2>Discord de<br><em>CENIZA NEÓN.</em></h2><p>Queremos reunir conversaciones de desarrollo, avisos de pruebas y comentarios sobre el juego en un canal oficial.</p>${discordButton()}${!site.discord ? '<span class="phase-badge">En preparación</span>' : ""}</div><div class="community-text"><h2>Dos enlaces.<br>Una misma ciudad.</h2><p>El cooperativo para hasta dos jugadores forma parte de la dirección del proyecto. Todavía no está implementado y no hay una prueba multijugador disponible.</p><p>Antes de invitarte a jugar queremos definir cómo se comparten construcción, tropas, progreso y decisiones. Esos pasos aparecerán en el roadmap y en registros de pruebas reales.</p><div class="community-links"><a href="/roadmap/">Ver el plan de desarrollo ${svg("arrow")}</a><a href="/bitacora/">Leer la bitácora ${svg("arrow")}</a><a href="/bitacora/feed.xml">Recibir novedades por RSS ${svg("arrow")}</a></div></div></section>`,
  ),
);

urls.push(
  await page(
    "/contacto/",
    "Contacto",
    `${intro("AL OTRO LADO DEL ENLACE", "Hablemos.", "Errores, prensa, colaboraciones y preguntas sobre CENIZA NEÓN. Elige el canal que corresponda para que tu mensaje llegue con contexto.")}<section class="container contact-list"><article><span class="line-number">01</span><div><h2>Pruebas y problemas</h2><p>Si tienes acceso al prototipo, indica qué ocurrió, los pasos para repetirlo y tu versión. Adjunta una captura cuando ayude.</p><a class="text-link" href="${esc(site.issues)}" target="_blank" rel="noopener noreferrer">Abrir un informe en GitHub ${svg("arrow")}</a></div></article><article><span class="line-number">02</span><div><h2>Prensa y colaboraciones</h2><p>Información del proyecto, capturas y recursos de identidad están disponibles en el dossier de prensa.</p>${site.email ? `<a class="text-link" href="mailto:${esc(site.email)}">${esc(site.email)} ${svg("arrow")}</a>` : '<p class="pending-link">El correo público de contacto está pendiente de confirmación.</p>'}<a class="text-link" href="/prensa/">Abrir el dossier ${svg("arrow")}</a></div></article><article><span class="line-number">03</span><div><h2>Comunidad</h2><p>El canal oficial reunirá novedades y conversación sobre el juego. No hay una lista de beta ni un formulario de inscripción activos.</p><a class="text-link" href="/comunidad/">Ir a comunidad ${svg("arrow")}</a></div></article></section>`,
  ),
);

urls.push(
  await page(
    "/prensa/",
    "Prensa y recursos",
    `${intro("DOSSIER / CENIZA NEÓN", "Material para contar<br>esta historia.", "Descripción verificada, imágenes del proyecto y estado actual. Identifica siempre las capturas como material de desarrollo.")}<section class="container press-layout"><div class="prose"><h2>Ficha del proyecto</h2><dl><dt>Título</dt><dd>CENIZA NEÓN</dd><dt>Género</dt><dd>Supervivencia, construcción y combate en arenas</dd><dt>Motor y plataforma de desarrollo</dt><dd>Godot · PC</dd><dt>Estado</dt><dd>Prototipo en desarrollo. Sin beta pública ni fecha de lanzamiento.</dd><dt>Jugadores</dt><dd>Prototipo de un jugador. Cooperativo para dos previsto.</dd></dl><h2>Descripción breve</h2><p>CENIZA NEÓN combina la dirección de colonias con combates personales en una ciudad industrial en ruinas. Construye de día, resiste de noche y cruza cinco distritos para enfrentarte a una red que sigue ejecutando una emergencia que nadie ha revocado.</p><h2>Uso de los materiales</h2><p>Estos recursos pueden acompañar cobertura editorial del proyecto con atribución a CENIZA NEÓN. No autorizan reventa, incorporación a otros juegos ni redistribución de la banda sonora. El arte conceptual no debe presentarse como captura jugable.</p></div><div class="press-downloads"><h2>Identidad y capturas</h2><a href="/media/logo.png" download>Logotipo transparente · PNG ${svg("arrow")}</a><a href="/media/hero.webp" download>Portada · Arte conceptual ${svg("arrow")}</a><a href="/media/station.webp" download>Estación · Arte conceptual ${svg("arrow")}</a><a href="/media/colonia_actual.webp" download>Colonia · Captura de desarrollo ${svg("arrow")}</a><a href="/media/combat_hud_madre.webp" download>Arena · Captura de desarrollo ${svg("arrow")}</a><a href="/media/teaser.mp4" download>Teaser conceptual · MP4 ${svg("arrow")}</a><p class="caption-note">No se incluyen cifras de jugadores, ventas o fechas que todavía no existen.</p></div></section>`,
  ),
);

urls.push(
  await page(
    "/privacidad/",
    "Privacidad y créditos",
    `${intro("INFORMACIÓN DEL SITIO", "Privacidad y créditos.", "Qué guarda esta web, de dónde vienen sus recursos y cómo se presenta el estado del juego.")}<section class="prose legal-content"><h2>Datos y reproducción</h2><p>Esta versión no tiene cuentas, formularios de contacto, analítica publicitaria ni una lista de beta. No solicita datos personales para navegar. El reproductor guarda en el almacenamiento local del navegador la pista, posición y volumen para recordar tu selección; no inicia audio sin una acción tuya.</p><p>Cloudflare sirve el sitio y puede procesar datos técnicos de las solicitudes según sus políticas. Discord y GitHub son servicios externos: sus propias condiciones se aplican al abrirlos. La web no envía mensajes a esos servicios por ti.</p><button class="button button-ghost" id="clear-local">Borrar preferencias de audio</button><p id="clear-status" role="status"></p><h2 id="creditos">Arte, música y tecnología</h2><p>Los personajes, escenarios y capturas proceden del proyecto CENIZA NEÓN. Los retratos y el arte conceptual incluyen recursos generados con OpenAI image_gen; los sprites y marcos se trabajan y exportan con LibreSprite. El logotipo y las ilustraciones nuevas conservan sus especificaciones y procedencia en el repositorio de esta web.</p><p>La banda sonora reúne 21 pistas del repertorio integrado en el juego. Sus nombres proceden de los metadatos de los archivos; se evita inventar créditos de composición o afirmar una licencia de reutilización no verificada.</p><p>El sitio utiliza Marked, Sharp, tipografías Manrope y Barlow Condensed bajo sus respectivas licencias. Sus archivos de licencia acompañan las fuentes. El juego se desarrolla con Godot.</p><h2>Estado y contenidos narrativos</h2><p>Las capturas muestran un prototipo. La ampliación narrativa y el cooperativo de dos jugadores son trabajos previstos; no se presentan como funciones terminadas. La web no distribuye una beta ni promete una duración de campaña sin pruebas.</p><h2>Derechos y contacto</h2><p>© 2026 CENIZA NEÓN. El contenido original se reserva a su titular. Los recursos de terceros mantienen sus condiciones. Para cobertura editorial consulta el dossier; para contactar, utiliza los canales publicados en la página de contacto.</p><a class="text-link" href="/contacto/">Contacto ${svg("arrow")}</a></section>`,
  ),
);
await page(
  "/404.html",
  "Señal no encontrada",
  `${intro("ERROR 404", "Esta vía no tiene señal.", "La página pudo cambiar de ruta. Puedes volver a la estación o consultar el manual de campo.")}<div class="container error-actions">${button("Volver al inicio", "/")}${button("Consultar la wiki", "/wiki/", true)}</div>`,
);
const origin = site.url.replace(/\/$/, "");
await fs.mkdir("dist/bitacora", { recursive: true });
await fs.writeFile(
  "dist/bitacora/feed.xml",
  `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>CENIZA NEÓN · Bitácora</title><link>${esc(origin)}/bitacora/</link><description>Registros reales del desarrollo de CENIZA NEÓN.</description><language>es</language>${posts.map((p) => `<item><title>${esc(p.title)}</title><link>${esc(origin)}/bitacora/${p.slug}/</link><guid isPermaLink="true">${esc(origin)}/bitacora/${p.slug}/</guid><pubDate>${new Date(p.date + "T12:00:00Z").toUTCString()}</pubDate><description>${esc(p.excerpt)}</description></item>`).join("")}</channel></rss>`,
);
if (origin)
  await fs.writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${esc(origin + url)}</loc><lastmod>${site.lastVerified}</lastmod></url>`).join("")}</urlset>`,
  );
await fs.writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ""}`,
);
await fs.writeFile(
  "dist/_headers",
  `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: default-src 'self'; img-src 'self' data:; media-src 'self'; font-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'\n/media/*\n  Cache-Control: public, max-age=86400\n/audio/*\n  Cache-Control: public, max-age=604800\n`,
);
console.log(
  `Built ${urls.length + 1} HTML pages, RSS, ${origin ? "sitemap, " : ""}21-track library. Narrative production files excluded.`,
);
