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
