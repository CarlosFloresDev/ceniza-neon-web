import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";
const [key, input] = process.argv.slice(2);
const manifest = JSON.parse(await fs.readFile("content/page-art.json", "utf8"));
const entry = manifest.entries.find((item) => item.key === key);
if (!entry || !input)
  throw new Error("Unknown page artwork or missing generated file");
const source = path.resolve(entry.source),
  output = path.resolve("public" + entry.src);
await fs.mkdir(path.dirname(source), { recursive: true });
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.copyFile(input, source);
const metadata = await sharp(source).metadata();
await sharp(source)
  .resize({ width: 1680, withoutEnlargement: true })
  .webp({ quality: 88, effort: 5 })
  .toFile(output);
await fs.mkdir("art/page-records", { recursive: true });
await fs.writeFile(
  `art/page-records/${key}.json`,
  JSON.stringify(
    {
      tool: "OpenAI image_gen (built-in)",
      key,
      route: entry.route,
      source: entry.source,
      output: entry.src,
      prompt: entry.prompt,
      references: entry.references || [],
      width: metadata.width,
      height: metadata.height,
      generatedAt: new Date().toISOString(),
      sha256: crypto
        .createHash("sha256")
        .update(await fs.readFile(source))
        .digest("hex"),
      processing:
        "Original PNG preserved unchanged. WebP resize and compression only; no painted edits.",
    },
    null,
    2,
  ) + "\n",
);
console.log(key + ": original and web image saved");
