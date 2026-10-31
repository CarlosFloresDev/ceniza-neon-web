import fs from "node:fs/promises";

const manifest = JSON.parse(
  await fs.readFile(
    new URL("../content/page-art.json", import.meta.url),
    "utf8",
  ),
);
const routes = new Map(manifest.entries.map((entry) => [entry.route, entry]));
const original = {
  "/": {
    key: "home",
    src: "/media/hero.webp",
    alt: "El Portador contempla la ciudad industrial bajo la lluvia.",
  },
  "/universo/": {
    key: "universe",
    src: "/media/station.webp",
    alt: "Mara y el Portador reparan una lámpara en la estación.",
  },
};
const escape = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );

export function artworkFor(route) {
  const entry = original[route] || routes.get(route);
  if (!entry)
    throw new Error("A distinct illustration is required for " + route);
  return entry;
}

function shell(entry, content) {
  return `<section class="section-hero" data-page-art="${entry.src}" data-page-kind="${entry.key}" style="--art-focus:${escape(entry.focus || "60% 12%")}"><img class="section-hero-image" src="${entry.src}" alt="${escape(entry.alt)}" fetchpriority="high" decoding="async"><div class="section-hero-shade" aria-hidden="true"></div>${content}<span class="art-caption">ARTE CONCEPTUAL · NO ES UNA CAPTURA DEL JUEGO</span></section>`;
}

export function illustratePage(route, body) {
  const entry = artworkFor(route);
  if (route === "/")
    return body.replace(
      '<section class="hero">',
      `<section class="hero" data-page-art="${entry.src}">`,
    );
  if (route === "/universo/")
    return body.replace(
      '<section class="universe-hero">',
      `<section class="universe-hero" data-page-art="${entry.src}">`,
    );
  const wiki =
    /(<article class="wiki-article">)(<p class="eyebrow">[\s\S]*?<p class="intro-copy">[\s\S]*?<\/p>)/;
  const wikiMatch = body.match(wiki);
  if (wikiMatch) {
    const heading = `<header class="container wiki-art-heading">${wikiMatch[2]}</header>`;
    return shell(entry, heading) + body.replace(wiki, "$1");
  }
  const article = /<header class="container article-header">[\s\S]*?<\/header>/;
  if (article.test(body))
    return body.replace(article, (heading) => shell(entry, heading));
  const intro = /<div class="page-intro container">[\s\S]*?<\/div>/;
  if (intro.test(body))
    return body.replace(intro, (heading) => shell(entry, heading));
  throw new Error("Missing illustrated page heading for " + route);
}
