import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { posts } from "../content/editorial.mjs";
import { wiki } from "../content/wiki.mjs";
test("Every page opens with its own scene built from the game's pixel art", async () => {
  const { scenes } = await import("../content/scenes.mjs");
  const art = JSON.parse(await fs.readFile("content/scene-art.json", "utf8"));
  const routes = Object.keys(scenes);
  assert.equal(routes.length, 36);
  const signatures = new Set(
    Object.values(scenes).map((scene) =>
      [scene.zone, ...scene.actors.map((actor) => actor.id)].join("+"),
    ),
  );
  assert.equal(signatures.size, 36, "two pages share the same composition");
  for (const record of [...Object.values(art.sprites), ...Object.values(art.layers)]) {
    assert.match(record.source, /^assets\/(characters|world)\//);
    assert.ok((await fs.stat("public" + record.file)).size > 0, record.file);
  }
  const keys = new Set();
  for (const file of (await files("dist")).filter((file) => file.endsWith(".html"))) {
    const html = await fs.readFile(file, "utf8");
    const found = [...html.matchAll(/data-scene="([^"]+)"/g)];
    assert.equal(found.length, 1, file);
    assert.ok(!keys.has(found[0][1]), file + " reused a scene");
    keys.add(found[0][1]);
    await fs.access(`dist/media/still/${found[0][1]}.jpg`);
    assert.doesNotMatch(html, /\/media\/pages\/|\/media\/hero\.webp|\/media\/station\.webp|ARTE CONCEPTUAL/);
  }
  assert.equal(keys.size, 36);
  const walk = await fs.readFile(
    "dist/bitacora/caminar-es-mas-que-mover-un-sprite/index.html",
    "utf8",
  );
  assert.match(walk, /data-scene="walking"/);
  assert.match(
    walk,
    /class="container article-cover"><img[^>]+marcha_vigente_20261029/,
  );
});
test("The journal dates come from verified commits and distinguish retrospective entries", async () => {
  const history = JSON.parse(
    await fs.readFile("content/development-history.json", "utf8"),
  );
  assert.equal(posts.length, 10);
  assert.equal(posts.at(-1).date, "2026-09-22");
  assert.equal(posts[0].date, "2026-10-29");
  assert.ok(posts.some((post) => post.date === "2026-09-23"));
  assert.ok(posts.some((post) => post.date === "2026-10-12"));
  for (const post of posts) {
    const commit = history.commits.find((commit) =>
      commit.sha.startsWith(post.commit),
    );
    assert.ok(commit, post.slug);
    assert.equal(post.date, commit.authoredAt.slice(0, 10));
    assert.equal(post.timestamp, commit.authoredAt);
    assert.equal(post.retrospective, post.date < post.recordedOn);
    for (const reference of post.references || [])
      assert.ok(
        history.commits.some((commit) => commit.sha.startsWith(reference)),
      );
  }
  for (let index = 1; index < posts.length; index++)
    assert.ok(
      Date.parse(posts[index - 1].timestamp) >=
        Date.parse(posts[index].timestamp),
    );
  const archive = await fs.readFile(
    "dist/bitacora/el-primer-paso/index.html",
    "utf8",
  );
  assert.match(archive, /REGISTRO RETROSPECTIVO/);
  assert.match(archive, /22 de septiembre de 2026/);
  assert.match(archive, /29 de octubre de 2026/);
  assert.ok(!archive.includes("/media/null.webp"));
});

test("Current boss coverage and the walking entry never reuse superseded captures", async () => {
  const walk = posts.find(
    (post) => post.slug === "caminar-es-mas-que-mover-un-sprite",
  );
  assert.equal(walk.image, "marcha_vigente_20261029");
  const rejected = [
    "prefecto_actual.webp",
    "caldera_actual.webp",
    "coro_actual.webp",
    "recaudador_actual.webp",
    "combat_hud_madre.webp",
    "colonia_actual.webp",
  ];
  for (const file of (await files("dist")).filter((file) =>
    file.endsWith(".html"),
  )) {
    const text = await fs.readFile(file, "utf8");
    for (const name of rejected)
      assert.ok(!text.includes(name), file + ": " + name);
  }
  for (const name of rejected)
    assert.ok(
      !(await files("public/media")).some((file) => file.endsWith(name)),
    );
  for (const name of ["big-shoulders", "literata", "literata-italic", "silkscreen"])
    assert.ok((await fs.stat(`dist/fonts/${name}.woff2`)).size > 1000);
  for (const script of ["gsap.min.js", "ScrollTrigger.min.js", "lenis.min.js"])
    assert.ok((await fs.stat(`dist/vendor/${script}`)).size > 1000);
});
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
