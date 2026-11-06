// Página de descarga de la alfa de prueba. Datos en content/download.json.
import { svg, esc } from "../lib/html.mjs";
import { intro } from "../layout.mjs";
import { site, download } from "../site.mjs";

const route = (url, title, body, options) => ({ url, title, body, options });

const external = (label, href, cls = "button") =>
  `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const steps = (list) =>
  `<ol class="download-steps">${list.map((step) => `<li>${step}</li>`).join("")}</ol>`;

// Tarjeta del navegador: incrustación, enlace o estado «Próximamente» según content/download.json.
function browserCard() {
  const { url, embed } = download.itch;
  let action;
  if (embed)
    // El juego solo se carga al pulsar Jugar: así la página no gasta datos ni memoria.
    action = `<button type="button" class="button itch-play" data-itch-embed="${esc(embed)}">${svg("play")} Jugar</button>${url ? external(`Abrir en itch.io ${svg("arrow")}`, url, "text-link") : ""}`;
  else if (url)
    action = external(`${svg("play")} Jugar en itch.io`, url);
  else
    action = `<span class="phase-badge download-soon">Próximamente en itch.io</span><p class="pending-link">La versión web se publicará en itch.io. El enlace aparecerá aquí en cuanto esté activo.</p>`;
  return `<article class="download-card" data-platform="web" data-reveal><p class="eyebrow">NAVEGADOR</p><h2>Jugar en el navegador</h2><p class="download-meta">Sin instalar nada · Ordenador con teclado o mando</p><p>Una compilación web para probar el juego en una pestaña. Necesita un navegador actualizado con WebGL 2.</p>${action}</article>`;
}

export default function routes() {
  const { version, windows, android } = download;
  return [
    route(
      "/descargar/",
      "Jugar y descargar",
      `${intro(
        `<span class="version-badge">${esc(version)}</span> ${esc(download.channel.toUpperCase())}`,
        "Jugar CENIZA NEÓN.",
        "La primera versión de prueba ya se puede descargar. Es una alfa: está incompleta y tendrá errores. Lo que nos cuentes ayuda a decidir qué arreglamos primero.",
      )}<section class="container download-grid" aria-label="Plataformas disponibles">
<article class="download-card" data-platform="windows" data-reveal><p class="eyebrow">ORDENADOR</p><h2>Windows</h2><p class="download-meta">ZIP · ${esc(windows.size)} · ${esc(windows.requirements)}</p>${external(`${svg("download")} Descargar para Windows`, windows.url)}${steps([
        `Descarga el archivo ZIP (${esc(windows.size)}).`,
        "Descomprímelo: clic derecho y «Extraer todo».",
        "Abre la carpeta y ejecuta <strong>CenizaNeon.exe</strong>.",
      ])}<p class="download-note">Si Windows SmartScreen muestra un aviso, elige «Más información» y después «Ejecutar de todas formas».</p></article>
<article class="download-card" data-platform="android" data-reveal><p class="eyebrow">MÓVIL</p><h2>Android</h2><p class="download-meta">APK · ${esc(android.size)} · ${esc(android.requirements)}</p>${external(`${svg("download")} Descargar APK`, android.url)}${steps([
        `Descarga el APK (${esc(android.size)}) desde el teléfono.`,
        "Ábrelo. Android pedirá permiso para instalar apps de origen desconocido: activa «Permitir de esta fuente» para tu navegador o gestor de archivos.",
        "Instala y abre CENIZA NEÓN. Incluye controles táctiles y también admite mando.",
      ])}<p class="download-note">Es una compilación de prueba que no se distribuye por Google Play. Puedes volver a desactivar el permiso en Ajustes, Aplicaciones, «Instalar apps desconocidas».</p></article>
${browserCard()}
</section>
<section class="container download-details"><div class="download-requirements" data-reveal><h2>Requisitos</h2><dl><dt>Windows</dt><dd>${esc(windows.requirements)}.</dd><dt>Android</dt><dd>${esc(android.requirements)}.</dd><dt>Controles</dt><dd>Mando o teclado. En Android, controles táctiles en pantalla.</dd><dt>Jugadores</dt><dd>Un jugador. El cooperativo para dos sigue previsto y no está incluido.</dd></dl></div><div class="note-box"><h3>Antes de jugar</h3><p>Versión ${esc(version)}: una alfa de prueba del prototipo, no el juego terminado. El equilibrio, los controles y el contenido van a cambiar entre versiones.</p>${external(`Notas de la versión en GitHub ${svg("arrow")}`, download.releaseNotes, "text-link")}${external(`Informar de un error ${svg("arrow")}`, site.issues, "text-link")}</div></section>`,
      {
        description: `Descarga la alfa de prueba ${version} de CENIZA NEÓN para Windows y Android, o juégala en el navegador.`,
      },
    ),
  ];
}
