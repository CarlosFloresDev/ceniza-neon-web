// Tarjeta de registro reutilizada en inicio y bitácora.
import { sceneFor, stillPath } from "./scene.mjs";
import { esc, svg, date } from "./lib/html.mjs";

export function postCard(post) {
  const scene = sceneFor(`/bitacora/${post.slug}/`);
  return `<article class="post-card" id="registro-${post.number}" data-reveal><a class="post-image" href="/bitacora/${post.slug}/"><img src="${stillPath(scene)}" alt="${esc(scene.alt)}" width="1200" height="630" loading="lazy" decoding="async"><span class="image-index">${post.retrospective ? "Archivo" : "Registro"} ${post.number}</span></a><div class="post-meta"><span>${post.category}</span><time datetime="${post.timestamp}">Avance del ${date(post.date)}</time></div><h3><a href="/bitacora/${post.slug}/">${post.title}</a></h3><p>${post.excerpt}</p><a class="text-link" href="/bitacora/${post.slug}/">Leer el registro ${svg("arrow")}</a></article>`;
}
