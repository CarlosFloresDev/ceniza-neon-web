import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { posts } from "../content/editorial.mjs";
import { wiki } from "../content/wiki.mjs";
async function files(dir) {
  const results = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    results.push(...(entry.isDirectory() ? await files(full) : [full]));
  }
  return results;
}
test("The release states and library reflect the actual prototype", async () => {
  const music = JSON.parse(await fs.readFile("content/soundtrack.json"));
  assert.equal(music.length, 21);
  assert.equal(music.find((m) => m.id === "menu").title, "Dusk Beacon");
  assert.equal(
    music.find((m) => m.id === "jefe_prefecto").title,
    "Contemptuous Waltz",
  );
  assert.equal(
    music.find((m) => m.id === "jefe_madrecero").title,
    "Emergency Protocol",
  );
  assert.equal(new Set(posts.map((p) => p.slug)).size, posts.length);
  assert.equal(new Set(wiki.map((w) => w.slug)).size, wiki.length);
  assert.match(
    wiki.find((w) => w.slug === "cooperativo").body,
    /todavía no disponible/i,
  );
  for (const track of music)
    assert.ok((await fs.stat("public" + track.src)).size > 1000);
});
test("All local page links, illustrations, fonts, audio and video exist", async () => {
  const missing = [];
  for (const file of (await files("dist")).filter((f) => f.endsWith(".html"))) {
    const html = await fs.readFile(file, "utf8");
    assert.match(html, /<html lang="es">/);
    assert.match(html, /<h1[ >]/);
    assert.match(html, /name="description"/);
    assert.ok(!html.includes("undefined"), file);
    for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const clean = decodeURIComponent(href);
      let target = path.join("dist", clean);
      if (clean.endsWith("/")) target = path.join(target, "index.html");
      try {
        await fs.access(target);
      } catch {
        missing.push(`${file}: ${href}`);
      }
    }
  }
  assert.deepEqual(missing, []);
});
test("Narrative production files and secrets stay out of publication", async () => {
  const published = await files("dist");
  assert.equal(
    published.filter((f) => /narrativa|guion|\.env|\.toml|\.ase$/.test(f))
      .length,
    0,
  );
  for (const file of published.filter((p) => /\.(html|js|json|css)$/.test(p))) {
    const text = await fs.readFile(file, "utf8");
    assert.ok(
      !/gh[op]_[A-Za-z0-9]{20}|oauth_token\s*=|CLOUDFLARE_API_TOKEN\s*=/.test(
        text,
      ),
      file,
    );
  }
});
