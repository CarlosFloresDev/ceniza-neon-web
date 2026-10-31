import { esc, svg, fmt } from "../lib/html.mjs";
import { intro } from "../layout.mjs";
import { music } from "../site.mjs";

const route = (url, title, body, options) => ({ url, title, body, options });

export default function routes() {
  const routes = [];
routes.push(
  route(
    "/banda-sonora/",
    "Banda sonora",
    `${intro("ARCHIVO SONORO / 21 PISTAS", "Escucha lo que queda.", "Calma entre los raíles, presión bajo el acero y señales que se niegan a callar. La música del repertorio actual de CENIZA NEÓN.")}<section class="container soundtrack-layout"><aside class="album-art"><img src="/media/still/music.webp" alt="Un dron flota sobre el barrio inundado junto a una farola." width="1200" height="630" loading="lazy" decoding="async"><div><strong class="album-wordmark">Ceniza Neón</strong><span>Archivo sonoro en desarrollo</span></div><button class="album-play button" data-track="menu">${svg("play")} Escuchar desde el principio</button></aside><div class="tracklist"><div class="audio-controls"><div class="transport"><button data-audio-prev aria-label="Pista anterior">${svg("chevron")}</button><button data-audio-toggle aria-label="Reproducir pista seleccionada">${svg("play")}</button><button data-audio-next aria-label="Pista siguiente">${svg("chevron")}</button><span id="full-track-title">Dusk Beacon</span></div><label class="seek-label" for="audio-seek">Posición de reproducción <span id="full-track-time">0:00 / 0:00</span></label><input id="audio-seek" type="range" min="0" max="100" step="0.1" value="0"><label class="volume-label" for="audio-volume">Volumen <input id="audio-volume" type="range" min="0" max="1" step="0.05" value="0.7"></label></div><div class="tracklist-heading"><span>REPERTORIO ACTUAL</span><span>${music.length} PISTAS · ${fmt(music.reduce((a, m) => a + m.duration, 0))}</span></div>${music.map((m, i) => `<button class="track" data-track="${m.id}" aria-label="Reproducir ${esc(m.displayTitle)}"><span class="track-number">${String(i + 1).padStart(2, "0")}</span><span class="track-title">${esc(m.displayTitle)}<small>${m.context}${m.id.endsWith("_b") ? " · Variante B" : ""}</small></span><span class="track-duration">${fmt(m.duration)}</span>${svg("play")}</button>`).join("")}<p class="caption-note">Los títulos se leen de los metadatos Vorbis de los archivos del juego. Dos variantes pueden compartir título. Las pistas sin metadato TITLE se identifican como «Sin título». No se atribuye un compositor sin verificarlo.</p><p class="caption-note">Reproducción bajo demanda. Sin inicio automático. Los niveles y la selección del juego pueden cambiar.</p></div></section><section class="container section"><div class="note-box"><h3>La música también forma parte del desarrollo</h3><p>Este archivo permite escuchar el repertorio integrado. No es el anuncio de un álbum definitivo ni de una publicación comercial independiente. Consulta los créditos y las condiciones de uso antes de reutilizar recursos.</p><a class="text-link" href="/privacidad/#creditos">Créditos y recursos ${svg("arrow")}</a></div></section>`,
  ),
);
  return routes;
}
