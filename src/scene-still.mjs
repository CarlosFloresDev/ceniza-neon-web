// Fotogramas planos de cada escena para redes sociales, tarjetas y póster del teaser.
import sharp from "sharp";
import { groundOf } from "./scene.mjs";

const WIDTH = 1200;
const HEIGHT = 630;
const SKY = { top: "#0b121c", bottom: "#24364a" };

async function fit(src, options) {
  return sharp("public" + src)
    .resize(options)
    .png()
    .toBuffer({ resolveWithObject: true });
}

// sharp exige que cada capa quepa dentro del lienzo: recorta lo que sobresale.
async function place(data, info, left, top) {
  const crop = {
    left: Math.max(0, -left),
    top: Math.max(0, -top),
    width: Math.min(info.width, WIDTH - left) - Math.max(0, -left),
    height: Math.min(info.height, HEIGHT - top) - Math.max(0, -top),
  };
  return {
    input: await sharp(data).extract(crop).png().toBuffer(),
    left: Math.max(0, left),
    top: Math.max(0, top),
  };
}

export async function renderStill(scene, file) {
  const sky = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}"><defs><linearGradient id="s" x2="0" y2="1"><stop offset="0" stop-color="${SKY.top}"/><stop offset="1" stop-color="${SKY.bottom}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#s)"/></svg>`,
  );
  const layers = [];
  const far = await fit("/media/scene/far.webp", { width: WIDTH });
  layers.push(
    await place(far.data, far.info, 0, Math.round(HEIGHT * 0.7 - far.info.height)),
  );
  if (scene.zone === "dawn") {
    const top = Math.round(HEIGHT * (1 - groundOf("dawn") / 100));
    layers.push({
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT - top}"><rect width="100%" height="100%" fill="#0a1018"/><rect width="100%" height="2" fill="#3a4a5e"/></svg>`,
      ),
      left: 0,
      top,
    });
  } else {
    const zone = await fit(`/media/scene/${scene.zone}.webp`, { width: WIDTH });
    layers.push(await place(zone.data, zone.info, 0, HEIGHT - zone.info.height));
  }
  for (const actor of scene.actors) {
    const height = Math.round((actor.h / 100) * HEIGHT);
    const source = "public/media/scene/" + actor.id + ".webp";
    const { height: native } = await sharp(source).metadata();
    // Vecino más cercano al ampliar para conservar el píxel; suavizado al reducir.
    let sprite = sharp(source).resize({
      height,
      kernel: height > native ? "nearest" : "lanczos3",
    });
    if (actor.flip) sprite = sharp(await sprite.png().toBuffer()).flop();
    const { data, info } = await sprite.png().toBuffer({ resolveWithObject: true });
    const left = Math.round((actor.x / 100) * WIDTH - info.width / 2);
    const ground = actor.y + groundOf(scene.zone);
    const top = Math.round(HEIGHT - (ground / 100) * HEIGHT - info.height);
    layers.push(await place(data, info, left, top));
  }
  if (scene.night)
    layers.push({
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}"><rect width="100%" height="100%" fill="#050b16" fill-opacity="0.35"/></svg>`,
      ),
      left: 0,
      top: 0,
    });
  const image = sharp(sky).composite(layers);
  const flat = await image.png().toBuffer();
  await sharp(flat).webp({ quality: 80 }).toFile(file + ".webp");
  await sharp(flat).jpeg({ quality: 80, mozjpeg: true }).toFile(file + ".jpg");
}
