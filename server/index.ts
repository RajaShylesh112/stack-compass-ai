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
        hmr: false
      },
      appType: "custom",
    });

    // Handle Vite assets
    app.use('/src/*', async (c, next) => {
      return new Promise((resolve) => {
        const req = c.req.raw as any;
        req.url = c.req.path;
        
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
            if (data) {
              resolve(new Response(data, {
                headers: { 'Content-Type': 'application/javascript' }
              }));
            } else {
              resolve(c.text(''));
            }
          },
          on: () => {},
          once: () => {},
          emit: () => false,
        };

        vite.middlewares(req, res as any, () => {
          resolve(c.notFound());
        });
      });
    });

    // Handle node_modules and @fs requests
    app.use('/@*', async (c, next) => {
      return new Promise((resolve) => {
        const req = c.req.raw as any;
        req.url = c.req.path + (c.req.query() ? '?' + new URLSearchParams(c.req.query()).toString() : '');
        
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
            if (data) {
              resolve(new Response(data, {
                headers: { 'Content-Type': 'application/javascript' }
              }));
            } else {
              resolve(c.text(''));
            }
          },
          on: () => {},
          once: () => {},
          emit: () => false,
        };

        vite.middlewares(req, res as any, () => {
          resolve(c.notFound());
        });
      });
    });

    // Handle SPA routing - serve index.html for non-API routes
    app.use('*', async (c, next) => {
      if (c.req.path.startsWith('/api')) {
        return await next();
      }

      try {
        const clientTemplate = path.resolve(process.cwd(), "client", "index.html");
        let template = await fs.promises.readFile(clientTemplate, "utf-8");
        const page = await vite.transformIndexHtml(c.req.url, template);
        
        return c.html(page);
      } catch (error) {
        log(`Error serving page: ${error}`, "vite");
        return c.text("Internal Server Error", 500);
      }
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
