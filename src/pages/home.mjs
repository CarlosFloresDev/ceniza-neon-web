import { svg, button, image, esc } from "../lib/html.mjs";
import { postCard } from "../post-card.mjs";
import { site, download } from "../site.mjs";
import { posts, districts } from "../../content/editorial.mjs";

const route = (url, title, body, options) => ({ url, title, body, options });

export default function routes() {
  const routes = [];
const urls = [];
routes.push(
  route(
    "/",
    site.title,
    `
<section class="hero"><!--scene--><div class="hero-shade" aria-hidden="true"></div><div class="hero-content container"><p class="eyebrow"><span class="status-dot"></span>Un juego independiente en desarrollo</p><h1 class="hero-title" aria-label="CENIZA NEÓN"><span class="hero-word" aria-hidden="true">Ceniza</span><span class="hero-word" aria-hidden="true">Neón</span></h1><p class="hero-tagline">Una ciudad que cobra por existir.<br>Una luz que todavía puedes defender.</p><p class="hero-description">Construye un refugio, reúne a los que quedan y enfréntate a las máquinas que nunca dejaron de obedecer.</p><div class="hero-actions"><a class="button" href="/descargar/">${svg("download")} Jugar la alfa ${esc(download.version)}</a><button class="button button-ghost" data-trailer>${svg("play")} Ver tráiler</button></div><p class="hero-platforms">Windows y Android. Pronto también en el navegador.</p></div><div class="hero-bottom container"><span>Supervivencia, construcción y combate en arenas</span><a href="#el-juego">Bajar al distrito <span aria-hidden="true">↓</span></a><button class="ambient-trigger" data-track="menu">${svg("sound")} Escuchar el mundo</button></div></section>
<div class="status-strip"><span><i class="status-dot"></i>Desarrollo activo</span><span>Windows · Android · Godot</span><span>Cooperativo para 2 previsto</span><span><a href="/descargar/">Alfa de prueba ${esc(download.version)}</a></span></div>
<section id="el-juego" class="section container game-intro" data-reveal><div><p class="eyebrow">RECONSTRUIR TAMBIÉN ES RESISTIR</p><h2>Lo que salves<br>tendrá que <em>amanecer.</em></h2></div><div class="editorial-copy"><p>La emergencia terminó hace diecisiete años.<br>La red nunca recibió la orden.</p><p>En una ciudad de acero, lluvia y memoria, la supervivencia tiene un precio. Tú llevas el único enlace que las máquinas no reconocen. Tu tarea empieza con una lámpara y las personas dispuestas a quedarse.</p>${button("Conocer el universo", "/universo/", true)}</div></section>
<section class="container play-loop"><div class="wide-capture" data-reveal><button class="gallery-trigger" data-image="/media/colonia_vigente_20261029.webp" data-caption="Captura real del prototipo · Construcción y defensa de la colonia" aria-label="Ampliar captura de la colonia">${image("colonia_vigente_20261029", "Colonia del prototipo con núcleo, construcciones y defensas industriales.")}</button><span class="capture-label">CAPTURA DE DESARROLLO · EL JUEGO PUEDE CAMBIAR</span></div><div class="loop-grid">${[
      [
        "01",
        "Construye de día",
        "Encarga obras, administra energía y arma una escuadra. Tus trabajadores hacen posible cada mejora.",
      ],
      [
        "02",
        "Resiste de noche",
        "Tus tropas sostienen el frente. Da órdenes, protege tus recursos y aprende a retirarte a tiempo.",
      ],
      [
        "03",
        "Cruza el umbral",
        "Entra a las arenas, lee a los jefes y convierte la experiencia en armas y pasivas que definan tu recorrido.",
      ],
    ]
      .map(
        ([n, t, d]) =>
          `<article data-reveal><span class="line-number">${n}</span><h3>${t}</h3><p>${d}</p></article>`,
      )
      .join("")}</div></section>
<section class="section districts-section"><div class="container section-heading" data-reveal><div><p class="eyebrow">CINCO DISTRITOS. UNA MISMA DEUDA.</p><h2>Una ciudad.<br><em>Muchas cicatrices.</em></h2></div><a class="text-link" href="/universo/#distritos">Recorrer los distritos ${svg("arrow")}</a></div><div class="district-rail container">${districts.map((d) => `<a class="district-card" href="/universo/#${d.id}" data-reveal>${image(d.id, "Arte ambiental: " + d.name)}<span class="district-number">${d.n}</span><div><small>${d.detail}</small><h3>${d.name}</h3>${svg("arrow")}</div></a>`).join("")}</div></section>
<section class="section container journal-home"><div class="section-heading" data-reveal><div><p class="eyebrow">DESDE EL TALLER</p><h2>El juego también<br>se construye <em>aquí.</em></h2></div><a class="text-link" href="/bitacora/">Toda la bitácora ${svg("arrow")}</a></div><div class="posts-grid">${posts.slice(0, 2).map(postCard).join("")}</div></section>
<section class="music-feature" data-reveal><div class="music-art">${image("network", "Arquitectura del Núcleo de la Red.")}</div><div class="container music-feature-content"><p class="eyebrow">EL SONIDO DE LO QUE QUEDA</p><h2>Antes de entrar,<br><em>escucha.</em></h2><p>De la calma de «Dusk Beacon» a la tensión de «Emergency Protocol». El repertorio actual del juego, con los títulos de sus archivos originales.</p><div class="hero-actions"><button class="button" data-track="menu">${svg("play")} Dusk Beacon</button>${button("Explorar la banda sonora", "/banda-sonora/", true)}</div></div></section>
<section class="section container community-tease" data-reveal><p class="eyebrow">NADIE RECONSTRUYE UNA CIUDAD A SOLAS</p><h2>Quédate cerca<br><em>de la señal.</em></h2><p>Avances, pruebas y lo que venga después. Estamos preparando el camino hacia el cooperativo para dos jugadores.</p>${button("Comunidad y novedades", "/comunidad/")}</section>`,
  ),
);
  return routes;
}
