import { svg, sigil, image, date } from "../lib/html.mjs";
import { intro } from "../layout.mjs";
import { postCard } from "../post-card.mjs";
import { marked } from "marked";
import { posts } from "../../content/editorial.mjs";
import { postVisual, retrospectiveNote, journalIndex } from "../journal-view.mjs";

const route = (url, title, body, options) => ({ url, title, body, options });

export default function routes() {
  const routes = [];
routes.push(
  route(
    "/bitacora/",
    "Bitácora del desarrollador",
    journalIndex(posts, { intro, date, svg, postCard }),
  ),
);
for (const post of posts)
  routes.push(
    route(
      `/bitacora/${post.slug}/`,
      post.title,
      `<article class="article-page"><header class="container article-header"><a class="text-link" href="/bitacora/">← Volver a la bitácora</a><p class="eyebrow">REGISTRO ${post.number} / ${post.category}</p><h1>${post.title}</h1><p class="intro-copy">${post.excerpt}</p><div class="post-meta"><time datetime="${post.timestamp}">Avance del ${date(post.date)}</time><span>${post.read} de lectura</span></div></header><figure class="container article-cover">${postVisual(post, { image, date, sigil })}<figcaption>${post.imageLabel}</figcaption></figure><div class="prose article-body">${retrospectiveNote(post, date)}${marked.parse(post.body)}<div class="article-source"><span>Referencia de desarrollo</span><code>${post.commit}</code><p>Registro técnico local. No equivale a una versión pública descargable.</p></div><a class="text-link" href="/bitacora/">Volver al archivo ${svg("arrow")}</a></div></article>`,
      {
        description: post.excerpt,
        cover: post.image || "hero",
        type: "article",
      },
    ),
  );
  return routes;
}
