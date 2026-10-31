// Inserta la escena de cabecera en cada página manteniendo un único H1.
import { paintingFor, renderScene, sceneFor } from "./scene.mjs";

const caption = (route) =>
  paintingFor(sceneFor(route))
    ? "Ilustración de cabecera · No es una captura del juego"
    : "Pixel art del juego · Composición para la web";

function shell(route, content) {
  return `<section class="section-hero">${renderScene(route)}<div class="section-hero-shade" aria-hidden="true"></div>${content}<span class="art-caption">${caption(route)}</span></section>`;
}

export function illustratePage(route, body) {
  if (route === "/")
    return body.replace("<!--scene-->", renderScene(route));
  if (route === "/universo/")
    return body.replace("<!--scene-->", renderScene(route));
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
