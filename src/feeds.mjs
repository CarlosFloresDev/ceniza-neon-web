// Archivos auxiliares: RSS, sitemap, robots y cabeceras de seguridad.
import { esc } from "./lib/html.mjs";
import { site } from "./site.mjs";
import { posts } from "../content/editorial.mjs";

export function auxiliaryFiles(urls) {
  const origin = site.url.replace(/\/$/, "");
  const files = {
    "bitacora/feed.xml": `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>CENIZA NEÓN · Bitácora</title><link>${esc(origin)}/bitacora/</link><description>Registros reales del desarrollo de CENIZA NEÓN.</description><language>es</language>${posts.map((p) => `<item><title>${esc(p.title)}</title><link>${esc(origin)}/bitacora/${p.slug}/</link><guid isPermaLink="true">${esc(origin)}/bitacora/${p.slug}/</guid><pubDate>${new Date(p.recordedOn + "T12:00:00Z").toUTCString()}</pubDate><description>${esc(p.excerpt)}</description></item>`).join("")}</channel></rss>`,
    "robots.txt": `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ""}`,
    _headers: `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: default-src 'self'; img-src 'self' data:; media-src 'self'; font-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'\n/media/*\n  Cache-Control: public, max-age=86400\n/audio/*\n  Cache-Control: public, max-age=604800\n`,
  };
  if (origin)
    files["sitemap.xml"] = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${esc(origin + url)}</loc><lastmod>${site.lastVerified}</lastmod></url>`).join("")}</urlset>`;
  return files;
}
