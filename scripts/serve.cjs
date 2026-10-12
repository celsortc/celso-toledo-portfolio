// Optional local preview helper. The deployed site needs no Node.js or build step.
const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};
const allowed = new Set([
  "/index.html",
  "/styles.css",
  "/hero.css",
  "/scripts/main.js",
  "/scripts/i18n.js",
]);

const server = http.createServer(async (request, response) => {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" });
      return response.end("Method not allowed");
    }
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const resource = pathname === "/" ? "/index.html" : pathname;
    const file = path.resolve(root, "." + resource);
    const insideRoot = file.startsWith(root + path.sep);
    const isAsset =
      resource.startsWith("/assets/") &&
      !resource.split("/").some((part) => part.startsWith("."));
    if (!insideRoot || (!allowed.has(resource) && !isAsset)) {
      response.writeHead(404);
      return response.end("Not found");
    }
    const data = await fs.readFile(file);
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : data);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});
server.on("error", (error) => {
  console.error(`Could not start preview: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Portfolio preview: http://localhost:${port}`),
);
