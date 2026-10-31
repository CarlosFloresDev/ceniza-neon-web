// Recursos que se generan o copian en cada compilación en lugar de versionarse.
import fs from "node:fs/promises";
import path from "node:path";
import { scenes } from "./scene.mjs";
import { renderStill } from "./scene-still.mjs";

const modules = path.resolve("node_modules");
// Destino en dist/ -> origen en node_modules/. Solo el subconjunto latino: basta para el español.
const vendor = {
  "fonts/permanent-marker.woff2":
    "@fontsource/permanent-marker/files/permanent-marker-latin-400-normal.woff2",
  "fonts/PermanentMarker-LICENSE.txt": "@fontsource/permanent-marker/LICENSE",
  "fonts/caveat.woff2": "@fontsource-variable/caveat/files/caveat-latin-wght-normal.woff2",
  "fonts/Caveat-OFL.txt": "@fontsource-variable/caveat/LICENSE",
  "fonts/inter.woff2": "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  "fonts/inter-italic.woff2": "@fontsource-variable/inter/files/inter-latin-wght-italic.woff2",
  "fonts/Inter-OFL.txt": "@fontsource-variable/inter/LICENSE",
  "vendor/gsap.min.js": "gsap/dist/gsap.min.js",
  "vendor/ScrollTrigger.min.js": "gsap/dist/ScrollTrigger.min.js",
  "vendor/lenis.min.js": "lenis/dist/lenis.min.js",
  "vendor/LENIS-LICENSE": "lenis/LICENSE",
};

export async function copyVendor(output) {
  for (const [target, source] of Object.entries(vendor)) {
    await fs.mkdir(path.dirname(path.join(output, target)), { recursive: true });
    await fs.copyFile(path.join(modules, source), path.join(output, target));
  }
}

export async function renderStills(output) {
  const folder = path.join(output, "media/still");
  await fs.mkdir(folder, { recursive: true });
  await Promise.all(
    Object.values(scenes).map((scene) =>
      renderStill(scene, path.join(folder, scene.key)),
    ),
  );
}

// La hoja de estilos se escribe en parciales numerados y se publica como un solo archivo.
export async function bundleStyles(output) {
  const parts = (await fs.readdir("styles"))
    .filter((name) => name.endsWith(".css"))
    .sort();
  const css = await Promise.all(
    parts.map((name) => fs.readFile(path.join("styles", name), "utf8")),
  );
  await fs.writeFile(path.join(output, "styles.css"), css.join("\n"));
}
