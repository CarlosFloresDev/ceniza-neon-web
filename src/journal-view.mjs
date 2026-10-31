export function postVisual(post, { image, date, sigil }) {
  if (post.image) return image(post.image, post.imageLabel);
  return `<div class="archive-visual" role="img" aria-label="Ficha editorial del avance del ${date(post.date)}; no es una captura de juego"><span class="archive-grid" aria-hidden="true"></span><span class="archive-symbol" aria-hidden="true">${sigil}</span><span class="archive-kicker">ARCHIVO DE DESARROLLO</span><strong>${post.date.slice(8)}<span>${post.date.slice(5, 7)} / ${post.date.slice(0, 4)}</span></strong><span class="archive-hash">${post.commit} · PRIMERAS ETAPAS</span></div>`;
}

export function retrospectiveNote(post, date) {
  if (!post.retrospective) return "";
  return `<aside class="editorial-note"><span class="eyebrow">REGISTRO RETROSPECTIVO</span><p>El avance corresponde al <strong>${date(post.date)}</strong>, según Git. Esta entrada se redactó el ${date(post.recordedOn)} al reconstruir la bitácora.</p></aside>`;
}

export function journalIndex(posts, { intro, date, svg, postCard }) {
  return `${intro("ARCHIVO DE DESARROLLO", "Más de un mes.<br>Una misma señal.", "Desde el primer movimiento del 22 de septiembre hasta los diseños actuales. Fechas del avance verificadas en Git, capturas identificadas y trabajo pendiente.")}
  <section class="container journal-history" id="linea-tiempo"><div class="history-heading"><div><p class="eyebrow">22 SEP — 29 OCT 2026</p><h2>Cómo llegamos <em>hasta aquí.</em></h2></div><p>Los registros anteriores a esta web son retrospectivos. Cada entrada distingue cuándo se hizo el avance de cuándo se escribió su relato.</p></div><ol class="history-track">${posts
    .toReversed()
    .map(
      (post) =>
        `<li><time datetime="${post.timestamp}">${date(post.date)}</time><a href="/bitacora/${post.slug}/"><span>${post.title}</span>${svg("arrow")}</a><code>${post.commit}</code></li>`,
    )
    .join(
      "",
    )}</ol><a class="text-link history-evidence" href="/data/development-history.json">Consultar las referencias del historial ${svg("arrow")}</a></section>
  <section class="container editorial-index"><div class="index-bar"><span>REGISTROS / ${String(posts.length).padStart(2, "0")}</span><a class="text-link" href="/bitacora/feed.xml">Seguir por RSS ${svg("arrow")}</a></div><div class="posts-grid">${posts.map(postCard).join("")}</div><aside class="note-box"><p class="eyebrow">CÓMO LEER LAS IMÁGENES</p><p>Las capturas vigentes muestran el arte ilustrado revisado el 29 de octubre. Las fichas editoriales del archivo no son screenshots. Si una imagen es arte ambiental o sirve de referencia posterior, su pie lo indica. No se presenta una versión antigua como actualización reciente.</p></aside></section>`;
}
