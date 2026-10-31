// Inserta la escena de cabecera en cada página manteniendo un único H1.
// Variantes: portada y universo con polaroids de capturas reales, jefes con la captura
// de su arena, y el resto solo con la ilustración y una nota escrita a mano.
import { captureFor, paintingFor, renderScene, sceneFor } from "./scene.mjs";
import { esc } from "./lib/html.mjs";

// Capturas reales del juego que se pegan como polaroids sobre la ilustración.
const POLAROIDS = {
  home: [
    ["colonia_vigente_20261029", "La colonia, primer día", -5],
    ["prefecto_arena_20261029", "El Prefecto nos espera", 4],
  ],
  universe: [["novela_visual", "Conversaciones en la estación", -4]],
  collector: [["recaudador_arena_20261029", "Su arena, captura real", -4]],
  furnace: [["caldera_arena_20261029", "Su arena, captura real", 3]],
  choir: [["coro_arena_20261029", "Su arena, captura real", -3]],
  prefect: [["prefecto_arena_20261029", "Su arena, captura real", 4]],
  mother: [["madre_arena_20261029", "Su arena, captura real", -4]],
};

function polaroids(route) {
  const list = POLAROIDS[sceneFor(route).key];
  if (!list) return "";
  return `<div class="hero-polaroids" data-depth="1">${list
    .map(
      ([image, caption, tilt], index) =>
        `<figure class="polaroid" style="--tilt:${tilt}deg;--i:${index}"><img src="/media/${image}.webp" alt="${esc(caption)}. Captura de desarrollo del juego." loading="lazy" decoding="async"><figcaption>${esc(caption)}</figcaption></figure>`,
    )
    .join("")}</div>`;
}

const caption = (route) => {
  const scene = sceneFor(route);
  if (captureFor(scene)) return "Imagen del juego en desarrollo";
  if (paintingFor(scene)) return "Ilustración pintada, no es una captura";
  return "Pixel art del juego, montado para la web";
};

function shell(route, content) {
  return `<section class="section-hero">${renderScene(route)}<div class="section-hero-shade" aria-hidden="true"></div>${polaroids(route)}${content}<span class="art-caption">${caption(route)}</span></section>`;
}

export function illustratePage(route, body) {
  if (route === "/" || route === "/universo/")
    return body.replace("<!--scene-->", renderScene(route) + polaroids(route));
  const wiki =
    /(<article class="wiki-article">)(<p class="eyebrow">[\s\S]*?<p class="intro-copy">[\s\S]*?<\/p>)/;
  const wikiMatch = body.match(wiki);
  if (wikiMatch) {
    const heading = `<header class="container wiki-art-heading">${wikiMatch[2]}</header>`;
    return shell(route, heading) + body.replace(wiki, "$1");
  }
  const article = /<header class="container article-header">[\s\S]*?<\/header>/;
  if (article.test(body))
    return body.replace(article, (heading) => shell(route, heading));
  const intro = /<div class="page-intro container">[\s\S]*?<\/div>/;
  if (intro.test(body))
    return body.replace(intro, (heading) => shell(route, heading));
  throw new Error("Missing page heading for " + route);
}
