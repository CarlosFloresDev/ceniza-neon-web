// Genera el sitio estático en dist/ a partir de content/, src/ y public/.
import fs from "node:fs/promises";
import path from "node:path";
import { renderPage } from "../src/layout.mjs";
import { auxiliaryFiles } from "../src/feeds.mjs";
import { music } from "../src/site.mjs";
import home from "../src/pages/home.mjs";
import journal from "../src/pages/journal.mjs";
import roadmap from "../src/pages/roadmap.mjs";
import universe from "../src/pages/universe.mjs";
import wiki from "../src/pages/wiki.mjs";
import soundtrack from "../src/pages/soundtrack.mjs";
import community from "../src/pages/community.mjs";
import contact from "../src/pages/contact.mjs";
import press from "../src/pages/press.mjs";
import privacy from "../src/pages/privacy.mjs";
import notFound from "../src/pages/not-found.mjs";

// Orden de publicación: también es el orden del sitemap.
const sections = [
  home,
  journal,
  roadmap,
  universe,
  wiki,
  soundtrack,
  community,
  contact,
  press,
  privacy,
];

const output = path.resolve("dist");
if (path.dirname(output) !== process.cwd() || path.basename(output) !== "dist")
  throw new Error("Unexpected output directory");
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });
await fs.cp("public", "dist", { recursive: true });

async function write(file, text) {
  const target = path.join("dist", file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, text);
}
const fileFor = (url) =>
  url === "/"
    ? "index.html"
    : url === "/404.html"
      ? "404.html"
      : url.slice(1) + "index.html";

await write(
  "data/development-history.json",
  await fs.readFile("content/development-history.json", "utf8"),
);
await write("data/music.json", JSON.stringify(music));

const urls = [];
for (const section of sections)
  for (const { url, title, body, options } of section()) {
    await write(fileFor(url), renderPage(url, title, body, options));
    urls.push(url);
  }
for (const { url, title, body, options } of notFound())
  await write(fileFor(url), renderPage(url, title, body, options));
for (const [file, text] of Object.entries(auxiliaryFiles(urls)))
  await write(file, text);

console.log(
  `Built ${urls.length + 1} HTML pages, RSS, sitemap, ${music.length}-track library. Narrative production files excluded.`,
);
