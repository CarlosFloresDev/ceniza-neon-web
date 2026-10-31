// Utilidades de marcado compartidas por todas las páginas.
export const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const icon = (name = "arrow") =>
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
export const svg = (name, cls = "") =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${icon(name)}</svg>`;
export const sigil =
  '<svg class="sigil" viewBox="0 0 40 48" aria-hidden="true"><path d="M20 2 35 12v19L20 45 5 31V12Z" fill="none" stroke="currentColor"/><path d="m20 8 10 8-10 8-10-8Zm0 16v14m0-8h7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2 23h5m26 0h5" stroke="currentColor"/></svg>';
export const fmt = (seconds) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
export const date = (s) =>
  new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(s + "T12:00:00Z"));
export const button = (label, href, secondary = false) =>
  `<a class="button ${secondary ? "button-ghost" : ""}" href="${href}">${label}${svg("arrow")}</a>`;
export const image = (name, alt, cls = "", lazy = true) =>
  `<img class="${cls}" src="/media/${name}.webp" alt="${esc(alt)}" ${lazy ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">`;
