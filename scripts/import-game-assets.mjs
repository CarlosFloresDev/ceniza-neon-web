import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const game = process.argv[2];
if (!game)
  throw new Error("Uso: node scripts/import-game-assets.mjs RUTA_DEL_JUEGO");
const root = path.resolve("public/media");
await fs.mkdir(root, { recursive: true });
const records = [];
async function image(from, name, options = {}) {
  const input = path.join(game, from);
  let pipeline = sharp(input);
  if (options.extract) pipeline = pipeline.extract(options.extract);
  await pipeline
    .resize({ width: options.width || 1600, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(path.join(root, name + ".webp"));
  records.push({
    file: "/media/" + name + ".webp",
    source: from,
    kind: options.kind || "game-art",
    processing:
      "WebP optimization; portrait atlas cell extraction where applicable",
  });
}
for (const zone of [
  "periphery_alive_v2",
  "foundry",
  "flooded",
  "citadel",
  "network",
]) {
  await image(`assets/world/backgrounds/references/${zone}.png`, zone, {
    kind: "environment-art",
  });
}
for (const name of [
  "colonia_actual",
  "combat_hud_madre",
  "recaudador_actual",
  "caldera_actual",
  "coro_actual",
  "prefecto_actual",
  "novela_visual",
  "profesiones",
]) {
  await image(`docs/media/${name}.png`, name, {
    kind: "development-screenshot",
  });
}
const actors = ["mara", "ivo", "vera", "nox", "eco", "portador"];
for (let i = 0; i < 6; i++)
  await image("assets/characters/portraits/portraits_manga_v2.png", actors[i], {
    width: 512,
    extract: {
      left: (i % 3) * 512,
      top: Math.floor(i / 3) * 512,
      width: 512,
      height: 512,
    },
    kind: "approved-character-portrait",
  });
for (let i = 0; i < 2; i++)
  await image(
    "assets/characters/portraits/antagonists_manga_v2.png",
    ["prefecto", "madre"][i],
    {
      width: 800,
      extract: { left: i * 1024, top: 0, width: 1024, height: 683 },
      kind: "approved-character-portrait",
    },
  );
await fs.mkdir("public/audio", { recursive: true });
const soundtrack = [];
const tracks = (await fs.readdir(path.join(game, "assets/audio/music"))).filter(
  (p) => p.endsWith(".ogg"),
);
for (const filename of tracks) {
  const input = path.join(game, "assets/audio/music", filename);
  const metadata = JSON.parse(
    execFileSync(
      "ffprobe",
      [
        "-v",
        "quiet",
        "-show_entries",
        "stream_tags:format=duration",
        "-of",
        "json",
        input,
      ],
      { encoding: "utf8" },
    ),
  );
  const tags = metadata.streams?.[0]?.tags || {};
  const title = tags.title || tags.TITLE || null;
  const id = path.basename(filename, ".ogg");
  execFileSync("ffmpeg", [
    "-v",
    "error",
    "-y",
    "-i",
    input,
    "-map_metadata",
    "0",
    "-c:a",
    "libmp3lame",
    "-b:a",
    "160k",
    `public/audio/${id}.mp3`,
  ]);
  soundtrack.push({
    id,
    title,
    displayTitle: title || `Sin título · ${id.replaceAll("_", " ")}`,
    duration: Number(metadata.format.duration),
    src: `/audio/${id}.mp3`,
    titleSource: title
      ? "embedded Vorbis TITLE"
      : "No embedded title; filename identified explicitly",
    context: id.startsWith("jefe")
      ? "Combate"
      : id.startsWith("zona")
        ? "Distritos"
        : ["menu", "colonia_dia", "colonia_noche"].includes(id)
          ? "Ciudad"
          : "Transiciones",
    source: `assets/audio/music/${filename}`,
  });
}
const order = [
  "menu",
  "colonia_dia",
  "zona_fundicion",
  "zona_fundicion_b",
  "zona_inundado",
  "zona_ciudadela",
  "zona_red",
  "zona_red_b",
  "colonia_noche",
  "aviso",
  "jefe_recaudador",
  "jefe_caldera",
  "jefe_caldera_b",
  "jefe_prefecto",
  "jefe_prefecto_b",
  "jefe_madrecero",
  "jefe_alt_1",
  "jefe_alt_2",
  "jefe_alt_3",
  "victoria",
  "derrota",
];
soundtrack.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
await fs.writeFile(
  "content/soundtrack.json",
  JSON.stringify(soundtrack, null, 2) + "\n",
);
await fs.writeFile(
  "content/asset-provenance.json",
  JSON.stringify(
    {
      imported: "2026-10-29",
      sourceProject:
        "CENIZA NEÓN Godot project; approved project art and actual development captures",
      assets: records,
      audio:
        "21 tracks imported from active MusicLibrary; embedded Vorbis TITLE preserved. MP3 transcoded at 160 kbps. No invented composer credits.",
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `${records.length} images and ${soundtrack.length} metadata-identified tracks imported`,
);
