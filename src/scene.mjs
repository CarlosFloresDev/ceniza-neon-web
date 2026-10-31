// Escenas de cabecera: capas de pixel art del juego dispuestas en profundidad 3D.
import fs from "node:fs";
import { scenes } from "../content/scenes.mjs";
import { esc } from "./lib/html.mjs";

const art = JSON.parse(
  fs.readFileSync(new URL("../content/scene-art.json", import.meta.url)),
);
// Profundidad de los fondos en px; los actores usan la suya propia.
const LAYER_DEPTH = { far: -520, zone: -240 };
// Altura del suelo pisable de cada fondo, en % desde abajo. "dawn" pinta su propio suelo.
const GROUND = {
  periphery: 11,
  foundry: 6,
  flooded: 6,
  citadel: 10,
  network: 23,
  dawn: 18,
};
export const groundOf = (zone) => GROUND[zone];

export function sceneFor(route) {
  const scene = scenes[route];
  if (!scene) throw new Error("A header scene is required for " + route);
  for (const actor of scene.actors)
    if (!art.sprites[actor.id])
      throw new Error(`Unknown sprite ${actor.id} in ${route}`);
  if (scene.zone !== "dawn" && !art.layers[scene.zone])
    throw new Error(`Unknown zone ${scene.zone} in ${route}`);
  return scene;
}

// Firma estable para comprobar que ninguna página repite composición.
export const signature = (scene) =>
  [scene.zone, ...scene.actors.map((actor) => actor.id)].join("+");

export const stillPath = (scene, extension = "webp") =>
  `/media/still/${scene.key}.${extension}`;

// Cada plano ocupa todo el escenario y se aleja con translateZ; su escala compensa la
// perspectiva desde el borde inferior, así el suelo de todas las capas coincide.
const plane = (depth, content, extra = "") =>
  `<div class="scene-plane${extra}" style="--z:${depth}">${content}</div>`;
const backdrop = (name, src, priority) =>
  `<img class="scene-${name}" src="${src}" alt="" decoding="async"${priority ? ' fetchpriority="high"' : ""}>`;

export function renderScene(route, { priority = true } = {}) {
  const scene = sceneFor(route);
  const ground = GROUND[scene.zone];
  const actors = scene.actors
    .map(({ id, x, h, y, z, flip }) =>
      plane(
        z,
        `<img class="scene-actor" src="/media/scene/${id}.webp" alt="" width="${art.sprites[id].width}" height="${art.sprites[id].height}" style="--x:${x}%;--h:${h}%;--y:${y + ground}%"${flip ? " data-flip" : ""}${art.sprites[id].height < 200 ? " data-pixel" : ""} decoding="async">`,
      ),
    )
    .join("");
  const zone =
    scene.zone === "dawn"
      ? plane(-200, `<div class="scene-ground" style="--ground:${ground}%"></div>`)
      : plane(LAYER_DEPTH.zone, backdrop("zone", `/media/scene/${scene.zone}.webp`, priority));
  return `<div class="scene" data-scene="${scene.key}" data-zone="${scene.zone}"${scene.night ? " data-night" : ""} role="img" aria-label="${esc(scene.alt)}"><div class="scene-stage">${plane(LAYER_DEPTH.far, backdrop("far", "/media/scene/far.webp", priority))}${zone}${plane(-40, "", " scene-haze")}${actors}${plane(160, "", " scene-rain")}</div></div>`;
}

export { scenes, art as sceneArt };
