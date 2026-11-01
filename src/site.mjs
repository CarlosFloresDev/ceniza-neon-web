// Datos globales del sitio, validados al cargarse.
import fs from "node:fs/promises";

export const site = JSON.parse(await fs.readFile("content/site.json", "utf8"));
if (site.discord) {
  const target = new URL(site.discord);
  if (
    target.protocol !== "https:" ||
    !["discord.gg", "discord.com", "www.discord.com"].includes(target.hostname)
  )
    throw new Error("Use an official HTTPS Discord invitation");
}
if (site.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(site.email))
  throw new Error("Invalid public contact email");
export const music = JSON.parse(await fs.readFile("content/soundtrack.json", "utf8"));

// Descargas de la versión de prueba. La dirección de itch.io se rellena solo en content/download.json.
export const download = JSON.parse(await fs.readFile("content/download.json", "utf8"));
for (const key of ["releaseNotes", "windows", "android"]) {
  const target = new URL(download[key].url ?? download[key]);
  if (target.protocol !== "https:" || target.hostname !== "github.com")
    throw new Error("Downloads must point to the official GitHub release: " + key);
}
for (const key of ["url", "embed"])
  if (download.itch[key]) {
    const target = new URL(download.itch[key]);
    if (target.protocol !== "https:" || !/(^|\.)itch\.io$/.test(target.hostname))
      throw new Error("Use an HTTPS itch.io address for itch." + key);
  }
