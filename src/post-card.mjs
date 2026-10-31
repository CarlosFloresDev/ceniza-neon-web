// Tarjeta de registro reutilizada en inicio y bitácora.
import { artworkFor } from "./page-art.mjs";
import { esc, svg, date } from "./lib/html.mjs";

export function postCard(post) {
  return `<article class="post-card" id="registro-${post.number}" data-reveal><a class="post-image" href="/bitacora/${post.slug}/"><img src="${artworkFor(`/bitacora/${post.slug}/`).src}" alt="${esc(artworkFor(`/bitacora/${post.slug}/`).alt)}" loading="lazy" decoding="async"><span class="image-index"><span class="concept-label">ARTE CONCEPTUAL</span> ${post.retrospective ? "ARCHIVO / " : "REGISTRO / "}${post.number}</span></a><div class="post-meta"><span>${post.category}</span><time datetime="${post.timestamp}">Avance del ${date(post.date)}</time></div><h3><a href="/bitacora/${post.slug}/">${post.title}</a></h3><p>${post.excerpt}</p><a class="text-link" href="/bitacora/${post.slug}/">Leer el registro ${svg("arrow")}</a></article>`;
}
