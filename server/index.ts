import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { registerRoutes } from "./routes";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../vite.config";

function log(message: string, source = "hono") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit", 
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

(async () => {
  const app = new Hono();

  // Logging middleware
  app.use('*', async (c, next) => {
    const start = Date.now();
    const path = c.req.path;
    
    await next();
    
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${c.req.method} ${path} ${c.res.status} in ${duration}ms`;
      
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      
      log(logLine);
    }
  });

  // Error handling
  app.onError((err, c) => {
    const message = err.message || "Internal Server Error";
    return c.json({ message }, 500);
  });

  // Register API routes
  await registerRoutes(app);

  // Development mode with Vite
  if (process.env.NODE_ENV === "development") {
    const vite = await createViteServer({
      ...viteConfig,
      configFile: false,
      server: { 
        middlewareMode: true,
        allowedHosts: ["localhost", "127.0.0.1", "0.0.0.0", "all"],
        host: "0.0.0.0"
      },
      appType: "custom",
    });

    // Vite middleware adapter for Hono
    app.use('*', async (c, next) => {
      if (c.req.path.startsWith('/api')) {
        return await next();
      }

      return new Promise((resolve) => {
        const req = c.req.raw as any;
        const res = {
          statusCode: 200,
          setHeader: () => {},
          removeHeader: () => {},
          getHeader: () => undefined,
          getHeaders: () => ({}),
          hasHeader: () => false,
          writeHead: () => {},
          write: () => {},
          end: (data: any) => {
            if (typeof data === 'string') {
              resolve(c.html(data));
            } else {
              resolve(c.text(''));
            }
          },
          on: () => {},
          once: () => {},
          emit: () => false,
          locals: {},
        };

        vite.middlewares(req, res as any, () => {
          // Fallback to serving index.html for SPA routing
          fs.promises.readFile(path.resolve(process.cwd(), "client", "index.html"), "utf-8")
            .then(template => vite.transformIndexHtml(c.req.url, template))
            .then(page => resolve(c.html(page)))
            .catch(error => {
              log(`Error serving page: ${error}`, "vite");
              resolve(c.text("Internal Server Error", 500));
            });
        });
      });
    });
  } else {
    // Production mode - serve static files
    const distPath = path.resolve(process.cwd(), "public");
    
    if (!fs.existsSync(distPath)) {
      throw new Error(`Build directory not found: ${distPath}`);
    }

    app.use('/*', serveStatic({ root: './public' }));
    
    // Fallback to index.html for SPA routing
    app.use('*', async (c) => {
      if (c.req.path.startsWith('/api')) {
        return c.notFound();
      }
      
      const indexPath = path.resolve(distPath, "index.html");
      const content = await fs.promises.readFile(indexPath, "utf-8");
      return c.html(content);
    });
  }

  const port = 5000;
  
  log(`serving on port ${port}`);
  serve({
    fetch: app.fetch,
    port,
    hostname: "0.0.0.0",
  });
})();
