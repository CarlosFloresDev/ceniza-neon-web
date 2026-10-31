// Tarjeta de registro reutilizada en inicio y bitácora.
import { esc, svg, sigil, date, image } from "./lib/html.mjs";
import { postVisual } from "./journal-view.mjs";

export function postCard(post) {
  return `<article class="post-card" id="registro-${post.number}" data-reveal><a class="post-image" href="/bitacora/${post.slug}/">${postVisual(post, { image, date, sigil })}<span class="image-index">${post.retrospective ? "Archivo" : "Registro"} ${post.number}</span></a><div class="post-meta"><span>${post.category}</span><time datetime="${post.timestamp}">Avance del ${date(post.date)}</time></div><h3><a href="/bitacora/${post.slug}/">${post.title}</a></h3><p>${post.excerpt}</p><a class="text-link" href="/bitacora/${post.slug}/">Leer el registro ${svg("arrow")}</a></article>`;
}
