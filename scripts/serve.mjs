import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
const root = path.resolve("dist");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".xml": "application/xml",
  ".woff2": "font/woff2",
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let file = path.resolve(root, "." + pathname);
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(403).end();
        return;
      }
      const stat = await fs.stat(file).catch(() => null);
      if (stat?.isDirectory()) file = path.join(file, "index.html");
      let buffer;
      try {
        buffer = await fs.readFile(file);
      } catch {
        file = path.join(root, "404.html");
        buffer = await fs.readFile(file);
        res.statusCode = 404;
      }
      res.setHeader(
        "Content-Type",
        mime[path.extname(file)] || "application/octet-stream",
      );
      if (req.headers.range && [".mp3", ".mp4"].includes(path.extname(file))) {
        const [start, end] = req.headers.range
          .replace("bytes=", "")
          .split("-")
          .map(Number);
        const finish = end || buffer.length - 1;
        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${finish}/${buffer.length}`,
          "Accept-Ranges": "bytes",
          "Content-Length": finish - start + 1,
        });
        res.end(buffer.subarray(start, finish + 1));
        return;
      }
      res.end(buffer);
    } catch {
      res.writeHead(500).end("Error al servir la página");
    }
  })
  .listen(4321, "127.0.0.1", () => console.log("Local: http://127.0.0.1:4321"));
