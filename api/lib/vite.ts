// Serves the built frontend in production.

import type { Hono } from "hono";

export async function serveStaticFiles(app: Hono) {
  const { serveStatic } = await import("@hono/node-server/serve-static");
  app.use(
    "/*",
    serveStatic({
      root: "./dist/public",
      rewriteRequestPath: (path) => (path === "/" ? "/index.html" : path),
    }),
  );
  // SPA fallback: unknown non-API routes get the app shell
  app.get("*", async (c, next) => {
    if (c.req.path.startsWith("/api/")) return next();
    return serveStatic({ path: "./dist/public/index.html" })(c, next);
  });
}
