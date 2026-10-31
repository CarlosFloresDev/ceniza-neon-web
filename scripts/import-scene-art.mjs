// Copia el pixel art del juego que componen las escenas de cabecera.
// Uso: node scripts/import-scene-art.mjs RUTA_DEL_JUEGO
// Recorta celdas de los atlas, elimina márgenes transparentes y registra la procedencia.
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const game = process.argv[2];
if (!game)
  throw new Error("Uso: node scripts/import-scene-art.mjs RUTA_DEL_JUEGO");
const root = path.resolve("public/media/scene");
await fs.mkdir(root, { recursive: true });

// Hojas de combate exportadas con LibreSprite: 8 columnas; celdas de 192 px (Portador)
// o 320 px (jefes). Índices según assets/characters/combat/layout.json.
const combat = (file, index) => {
  const size = file === "portador" ? 192 : 320;
  return {
    from: `assets/characters/combat/${file}.png`,
    cell: { left: (index % 8) * size, top: Math.floor(index / 8) * size, width: size, height: size },
  };
};
const FRONT = 0, // idle_south
  STRIKE = 88, // attack_east, fotograma central
  SHOT = 95; // shoot_east, fotograma central
// Vistas de referencia del Portador (12 x 4 celdas de 181 px): más detalle para las poses quietas.
const reference = (row) => ({
  from: "assets/characters/combat/references/portador.png",
  cell: { left: 0, top: row * 181, width: 181, height: 181 },
});
// Atlas de unidades: 4 x 2 celdas con líneas guía en los bordes.
const unit = (index) => ({
  from: "assets/characters/units/field_atlas_v3.png",
  cell: {
    left: Math.round((index % 4) * 443.5) + 8,
    top: Math.floor(index / 4) * 443 + 8,
    width: 427,
    height: 427,
  },
});
const file = (from) => ({ from: `assets/${from}` });

const sprites = {
  "portador-back": reference(2),
  portador: reference(1),
  "portador-slash": combat("portador", STRIKE),
  "portador-front": reference(0),
  recaudador: combat("recaudador", FRONT),
  "recaudador-attack": combat("recaudador", STRIKE),
  caldera: combat("caldera", FRONT),
  "caldera-attack": combat("caldera", SHOT),
  coro: combat("coro", FRONT),
  "coro-attack": combat("coro", SHOT),
  prefecto: combat("prefecto", FRONT),
  "prefecto-attack": combat("prefecto", STRIKE),
  madre: combat("madre", FRONT),
  "madre-attack": combat("madre", STRIKE),
  ranger: unit(0),
  guardian: unit(1),
  builder: unit(2),
  medic: unit(3),
  civilian: unit(4),
  drone: unit(5),
  artillero: unit(6),
  saboteador: unit(7),
  core: file("world/structures/fortress/core_3.png"),
  wall: file("world/structures/fortress/wall_3.png"),
  "turret-base": file("world/structures/fortress/turret_base_3.png"),
  "turret-head": file("world/structures/fortress/turret_head_3.png"),
  lamp: file("world/props/lamp.png"),
  crate: file("world/props/crate.png"),
  barrel: file("world/props/barrel.png"),
  car: file("world/props/car.png"),
  sign: file("world/props/sign.png"),
  scrap: file("world/props/scrap.png"),
  spool: file("world/props/spool.png"),
  repeater: file("world/expedition/repeater.png"),
  station: file("world/expedition/station.png"),
  train: file("world/expedition/train.png"),
  ruins: file("world/settlements/ruins.png"),
  tents: file("world/settlements/supports.png"),
  errante: file("characters/enemies/errante/reposo/reposo_00.png"),
  corredor: file("characters/enemies/corredor/reposo/reposo_00.png"),
};
const layers = {
  far: "far_skyline",
  periphery: "periphery_alive_v2",
  foundry: "foundry",
  flooded: "flooded",
  citadel: "citadel",
  network: "network",
};

const records = [];
const layerRecords = [];
const digest = (buffer) => createHash("sha256").update(buffer).digest("hex");

for (const [id, { from, cell }] of Object.entries(sprites)) {
  const input = await fs.readFile(path.join(game, from));
  let image = sharp(input);
  if (cell) image = sharp(await image.extract(cell).png().toBuffer());
  const output = await image
    .trim({ threshold: 1 })
    .webp({ lossless: true, effort: 6 })
    .toBuffer({ resolveWithObject: true });
  await fs.writeFile(path.join(root, id + ".webp"), output.data);
  records.push({
    file: `/media/scene/${id}.webp`,
    source: from,
    cell: cell || null,
    width: output.info.width,
    height: output.info.height,
    sha256: digest(output.data),
  });
}
// Fondos: ampliación 2x por vecino más cercano para conservar el píxel al escalar.
for (const [id, name] of Object.entries(layers)) {
  const from = `assets/world/backgrounds/layers/${name}.png`;
  const source = sharp(path.join(game, from));
  const { width, height } = await source.metadata();
  const data = await source
    .resize({ width: width * 2, height: height * 2, kernel: "nearest" })
    .webp({ quality: 90, alphaQuality: 100, smartSubsample: true })
    .toBuffer();
  await fs.writeFile(path.join(root, id + ".webp"), data);
  layerRecords.push({
    file: `/media/scene/${id}.webp`,
    source: from,
    width: width * 2,
    height: height * 2,
    sha256: digest(data),
  });
}
await fs.writeFile(
  "content/scene-art.json",
  JSON.stringify(
    {
      imported: new Date().toISOString().slice(0, 10),
      sourceProject:
        "CENIZA NEÓN, proyecto Godot: pixel art del juego, sin ilustraciones generadas para la web",
      sprites: Object.fromEntries(
        records.map((record) => [path.basename(record.file, ".webp"), record]),
      ),
      layers: Object.fromEntries(
        layerRecords.map((record) => [path.basename(record.file, ".webp"), record]),
      ),
    },
    null,
    2,
  ) + "\n",
);
console.log(`Imported ${records.length + layerRecords.length} scene assets into public/media/scene.`);
