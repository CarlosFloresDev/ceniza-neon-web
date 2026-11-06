// Escenas de cabecera montadas con pixel art del juego (ver content/scene-art.json).
// zone: fondo del distrito ("dawn" deja solo el horizonte lejano).
// Cada actor: id del sprite, x = centro horizontal (% del escenario),
// h = altura (% del escenario), y = altura sobre el suelo (%), z = profundidad en px
// (positivo, más cerca de la cámara) y flip para mirar a la izquierda.
const a = (id, x, h, extra = {}) => ({ id, x, h, y: 3, z: 0, ...extra });
const turret = (x, extra = {}) => [
  a("turret-base", x, 17, extra),
  a("turret-head", x - 1.2, 7.5, { ...extra, y: (extra.y ?? 3) + 15 }),
];

export const scenes = {
  "/": {
    key: "home",
    zone: "periphery",
    alt: "El Portador, de espaldas, mira la Periferia encendida junto a una farola y dos miembros de la colonia.",
    actors: [
      a("builder", 52, 22, { z: -60 }),
      a("lamp", 61, 30, { z: -20 }),
      a("guardian", 86, 33, { z: 30, flip: true }),
      a("portador-back", 72, 44, { z: 90 }),
    ],
  },
  "/universo/": {
    key: "universe",
    zone: "network",
    alt: "El Portador se planta ante el núcleo de la red con un dron médico a su lado.",
    actors: [a("drone", 80, 20, { z: -30, y: 14, flip: true }), a("portador-front", 66, 40, { z: 60 })],
  },
  "/bitacora/": {
    key: "journal",
    zone: "foundry",
    alt: "Una constructora trabaja entre cajas y bobinas a la luz de una farola en la Fundición.",
    actors: [
      a("lamp", 60, 30, { z: -30 }),
      a("spool", 78, 7, { z: 20 }),
      a("crate", 82, 6, { z: 40 }),
      a("builder", 70, 34, { z: 50 }),
    ],
  },
  "/roadmap/": {
    key: "roadmap",
    zone: "periphery",
    alt: "Un tren de servicio espera en la estación de la Periferia mientras una civil observa la vía.",
    actors: [
      a("station", 80, 20, { z: -40 }),
      a("train", 62, 15, { z: -10 }),
      a("civilian", 88, 30, { z: 60, flip: true }),
    ],
  },
  "/wiki/": {
    key: "wiki",
    zone: "citadel",
    alt: "Un explorador apunta hacia la Ciudadela junto a una señal de aviso.",
    actors: [a("sign", 84, 14, { z: 20 }), a("ranger", 68, 34, { z: 60 })],
  },
  "/banda-sonora/": {
    key: "music",
    zone: "flooded",
    alt: "Un dron flota sobre el barrio inundado junto a una farola que se refleja en el agua.",
    actors: [a("lamp", 62, 30, { z: -20 }), a("drone", 76, 24, { z: 40, y: 16, flip: true })],
  },
  "/comunidad/": {
    key: "community",
    zone: "periphery",
    alt: "Tiendas del refugio con una médica, un civil y un constructor reunidos.",
    actors: [
      a("tents", 70, 14, { z: -60 }),
      a("civilian", 58, 28, { z: 20 }),
      a("medic", 76, 30, { z: 40, flip: true }),
      a("builder", 90, 31, { z: 60, flip: true }),
    ],
  },
  "/contacto/": {
    key: "contact",
    zone: "network",
    alt: "Un repetidor de señal en la red con un explorador de guardia.",
    actors: [a("repeater", 70, 34, { z: -10 }), a("ranger", 84, 30, { z: 50, flip: true })],
  },
  "/prensa/": {
    key: "press",
    zone: "citadel",
    alt: "El Portador de perfil ante la puerta de la Ciudadela.",
    actors: [a("portador", 70, 44, { z: 70, flip: true })],
  },
  "/privacidad/": {
    key: "privacy",
    zone: "network",
    alt: "Un núcleo de colonia apagado y un dron que lo examina en la red.",
    actors: [a("core", 74, 20, { z: -10 }), a("drone", 60, 20, { z: 40, y: 18 })],
  },
  "/descargar/": {
    key: "download",
    zone: "periphery",
    alt: "El Portador, de espaldas, sube a un tren de servicio que espera con las puertas abiertas en el andén de la Periferia.",
    actors: [
      a("station", 30, 34, { z: -60 }),
      a("train", 58, 30, { z: -10 }),
      a("portador-back", 78, 42, { z: 80 }),
    ],
  },
  "/404.html": {
    key: "lost",
    zone: "dawn",
    alt: "Una farola encendida y una señal de aviso al final de una vía sin tren.",
    actors: [a("sign", 76, 14, { z: 10 }), a("lamp", 68, 34, { z: 40 })],
  },
  "/wiki/primeros-pasos/": {
    key: "first-steps",
    zone: "periphery",
    alt: "El Portador llega a un refugio vacío entre chatarra y cajas recuperables.",
    actors: [
      a("scrap", 80, 6, { z: 10 }),
      a("crate", 86, 6, { z: 30 }),
      a("portador", 68, 40, { z: 60 }),
    ],
  },
  "/wiki/ciclo-dia-noche/": {
    key: "day-night",
    zone: "flooded",
    night: true,
    alt: "De noche, una muralla y una torreta vigilan el canal bajo una farola.",
    actors: [
      a("lamp", 58, 30, { z: -30 }),
      a("wall", 70, 22, { z: 10 }),
      ...turret(80, { z: 20 }),
    ],
  },
  "/wiki/nucleo-y-construccion/": {
    key: "core",
    zone: "periphery",
    alt: "Una constructora levanta el núcleo de la colonia.",
    actors: [a("core", 74, 24, { z: -10 }), a("builder", 58, 32, { z: 50 })],
  },
  "/wiki/murallas-y-torretas/": {
    key: "defenses",
    zone: "foundry",
    alt: "Un guardián con escudo defiende una muralla reforzada y su torreta.",
    actors: [
      a("wall", 64, 24, { z: -10 }),
      ...turret(74, { z: 0 }),
      a("guardian", 86, 34, { z: 60, flip: true }),
    ],
  },
  "/wiki/reclutas-y-profesiones/": {
    key: "units",
    zone: "periphery",
    alt: "Cinco profesiones de la colonia en fila: explorador, guardián, constructora, médica y saboteador.",
    actors: [
      a("ranger", 52, 26, { z: -20 }),
      a("guardian", 62, 28, { z: 0 }),
      a("builder", 71, 28, { z: 20 }),
      a("medic", 80, 28, { z: 40 }),
      a("saboteador", 90, 28, { z: 60, flip: true }),
    ],
  },
  "/wiki/escuadras-y-portales/": {
    key: "portals",
    zone: "network",
    alt: "Una escuadra de artillero, guardián y explorador avanza hacia un portal de la red.",
    actors: [
      a("repeater", 86, 34, { z: -30 }),
      a("artillero", 54, 30, { z: 10 }),
      a("guardian", 64, 30, { z: 30 }),
      a("ranger", 74, 28, { z: 50 }),
    ],
  },
  "/wiki/experiencia-y-mejoras/": {
    key: "upgrades",
    zone: "foundry",
    alt: "El Portador lanza un tajo cian mientras un dron de apoyo le sigue.",
    actors: [a("drone", 80, 20, { z: -20, y: 22, flip: true }), a("portador-slash", 64, 30, { z: 60 })],
  },
  "/wiki/operaciones-y-viaje/": {
    key: "operations",
    zone: "periphery",
    alt: "Una civil espera el transporte ferroviario de la operación junto a la estación.",
    actors: [
      a("train", 60, 16, { z: -30 }),
      a("station", 84, 20, { z: -10 }),
      a("civilian", 74, 30, { z: 50, flip: true }),
    ],
  },
  "/wiki/recaudador/": {
    key: "collector",
    zone: "periphery",
    alt: "El Recaudador lanza sus pinzas en el depósito de la Periferia.",
    actors: [a("recaudador-attack", 68, 44, { z: 50, flip: true })],
  },
  "/wiki/santa-caldera/": {
    key: "furnace",
    zone: "foundry",
    alt: "Santa Caldera escupe fuego en la Fundición.",
    actors: [a("caldera-attack", 68, 46, { z: 50, flip: true })],
  },
  "/wiki/coro-sumergido/": {
    key: "choir",
    zone: "flooded",
    alt: "El Coro Sumergido lanza una onda sonora sobre el canal.",
    actors: [a("coro-attack", 68, 42, { z: 50, flip: true })],
  },
  "/wiki/boss-rush/": {
    key: "boss-rush",
    zone: "foundry",
    alt: "El Portador se enfrenta a Santa Caldera y al Recaudador en la Fundición.",
    actors: [a("portador-slash", 28, 30, { z: 40 }), a("caldera", 62, 40, { z: 50, flip: true }), a("recaudador", 86, 34, { z: 20, flip: true })],
  },
  "/wiki/prefecto/": {
    key: "prefect",
    zone: "citadel",
    alt: "El Prefecto lanza una estocada ante la puerta de la Ciudadela.",
    actors: [a("prefecto-attack", 68, 46, { z: 50, flip: true })],
  },
  "/wiki/madre-cero/": {
    key: "mother",
    zone: "network",
    alt: "Madre Cero extiende sus filamentos en el centro de la red.",
    actors: [a("madre-attack", 68, 48, { z: 50, flip: true })],
  },
  "/wiki/controles-y-accesibilidad/": {
    key: "controls",
    zone: "citadel",
    alt: "El Portador de frente, listo para moverse, junto a una señal.",
    actors: [a("sign", 80, 14, { z: 10 }), a("portador-front", 66, 40, { z: 60 })],
  },
  "/wiki/cooperativo/": {
    key: "cooperative",
    zone: "network",
    alt: "El Portador y un explorador comparten un mismo paso ante la red. Función prevista.",
    actors: [a("ranger", 78, 32, { z: 20, flip: true }), a("portador", 64, 40, { z: 60 })],
  },
  "/bitacora/una-ciudad-que-respira/": {
    key: "living-city",
    zone: "foundry",
    alt: "Un coche abandonado, barriles y un civil de paso en la Fundición.",
    actors: [
      a("car", 66, 9, { z: -20 }),
      a("barrel", 76, 8, { z: 10 }),
      a("civilian", 86, 30, { z: 50, flip: true }),
    ],
  },
  "/bitacora/caminar-es-mas-que-mover-un-sprite/": {
    key: "walking",
    zone: "flooded",
    alt: "El Portador camina de perfil por la orilla del barrio inundado.",
    actors: [a("portador", 70, 42, { z: 60 })],
  },
  "/bitacora/cinco-jefes-cinco-lenguajes/": {
    key: "boss-language",
    zone: "citadel",
    alt: "Los cinco jefes en fila: Recaudador, Santa Caldera, Coro Sumergido, Prefecto y Madre Cero.",
    actors: [
      a("recaudador", 50, 24, { z: -40 }),
      a("caldera", 60, 26, { z: -20 }),
      a("coro", 70, 26, { z: 0 }),
      a("prefecto", 80, 28, { z: 20 }),
      a("madre", 90, 30, { z: 40 }),
    ],
  },
  "/bitacora/lo-que-ya-existe-y-lo-que-falta/": {
    key: "project-state",
    zone: "periphery",
    alt: "Un núcleo terminado, una muralla y chatarra pendiente con una constructora al lado.",
    actors: [
      a("core", 62, 22, { z: -20 }),
      a("wall", 74, 20, { z: 0 }),
      a("scrap", 90, 6, { z: 40 }),
      a("builder", 82, 32, { z: 50, flip: true }),
    ],
  },
  "/bitacora/el-primer-paso/": {
    key: "first-commit",
    zone: "dawn",
    alt: "El Portador, de espaldas y aún pequeño, frente al horizonte de la ciudad junto a una farola.",
    actors: [a("lamp", 62, 30, { z: 0 }), a("portador-back", 70, 30, { z: 40 })],
  },
  "/bitacora/el-errante-empieza-a-moverse/": {
    key: "wanderer",
    zone: "foundry",
    alt: "Un errante y un corredor, los primeros enemigos, avanzan por la Fundición.",
    actors: [a("corredor", 80, 12, { z: 20, flip: true }), a("errante", 68, 30, { z: 50, flip: true })],
  },
  "/bitacora/el-ferrocarril-llega-a-la-arena/": {
    key: "rail-arena",
    zone: "citadel",
    alt: "Un tren de servicio llega a la Ciudadela junto a un repetidor.",
    actors: [a("repeater", 84, 30, { z: -10 }), a("train", 62, 18, { z: 30 })],
  },
  "/bitacora/cinco-capitulos-una-ruta/": {
    key: "five-chapters",
    zone: "network",
    alt: "El tren cruza la red rumbo a la última estación.",
    actors: [a("station", 80, 20, { z: -20 }), a("train", 60, 16, { z: 20 })],
  },
  "/bitacora/la-historia-encuentra-sus-rostros/": {
    key: "story-faces",
    zone: "periphery",
    alt: "Una médica atiende a un civil mientras un dron médico espera.",
    actors: [
      a("drone", 84, 18, { z: -20, y: 20, flip: true }),
      a("civilian", 62, 30, { z: 30 }),
      a("medic", 72, 32, { z: 50, flip: true }),
    ],
  },
  "/bitacora/el-diseno-aprobado-llega-al-combate/": {
    key: "approved-art",
    zone: "citadel",
    alt: "El Portador y el Prefecto se miden ante la Ciudadela.",
    actors: [a("portador-slash", 62, 28, { z: 40 }), a("prefecto", 80, 40, { z: 60, flip: true })],
  },
  "/bitacora/alfa-0-2-boss-rush-y-jefes-mas-duros/": {
    key: "alpha-02",
    zone: "network",
    alt: "El Portador enfrenta a Madre Cero en el núcleo de la red.",
    actors: [a("portador-slash", 30, 28, { z: 40 }), a("madre-attack", 72, 40, { z: 60, flip: true }), a("prefecto", 92, 34, { z: 20, flip: true })],
  },
};
