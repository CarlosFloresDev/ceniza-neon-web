// Instala las ilustraciones de cabecera generadas en art/heroes/ como WebP para la web.
// Uso: node scripts/install-hero-art.mjs   (procesa todos los PNG con registro en art/heroes/records/)
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const source = "art/heroes";
const target = "public/media/heroes";
await fs.mkdir(target, { recursive: true });
const manifest = {};
for (const name of (await fs.readdir(source)).filter((file) => file.endsWith(".png"))) {
  const key = path.basename(name, ".png");
  const record = JSON.parse(
    await fs.readFile(path.join(source, "records", key + ".json"), "utf8"),
  );
  const original = await fs.readFile(path.join(source, name));
  const image = sharp(original);
  const { width, height } = await image.metadata();
  await image
    .resize({ width: Math.min(width, 1920), withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(target, key + ".webp"));
  manifest[key] = {
    src: `/media/heroes/${key}.webp`,
    route: record.route,
    width,
    height,
    tool: record.tool,
    created: record.created,
    prompt: record.prompt,
    sha256: createHash("sha256").update(original).digest("hex"),
  };
}
await fs.writeFile("content/hero-art.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`Installed ${Object.keys(manifest).length} hero illustrations.`);
