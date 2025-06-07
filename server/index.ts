import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { registerRoutes } from "./routes";
import fs from "fs";
import path from "path";

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

  // Serve static files in development
  if (process.env.NODE_ENV === "development") {
    // Serve client files directly
    app.use('/src/*', serveStatic({ root: './client' }));
    app.use('/node_modules/*', serveStatic({ root: '.' }));
    
    // Handle SPA routing - serve index.html for non-API routes
    app.use('*', async (c) => {
      if (c.req.path.startsWith('/api')) {
        return c.notFound();
      }

      try {
        const clientTemplate = path.resolve(process.cwd(), "client", "index.html");
        const template = await fs.promises.readFile(clientTemplate, "utf-8");
        
        // Simple development HTML without Vite transforms
        const devHtml = template.replace(
          '<script type="module" src="/src/main.tsx"></script>',
          `<script type="module">
            import { createElement } from 'react';
            import { createRoot } from 'react-dom/client';
            import App from '/src/App.tsx';
            
            const container = document.getElementById('root');
            const root = createRoot(container);
            root.render(createElement(App));
          </script>`
        );
        
        return c.html(devHtml);
      } catch (error) {
        log(`Error serving page: ${error}`);
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

  const port = parseInt(process.env.PORT || '4000');
  
  log(`serving on port ${port}`);
  serve({
    fetch: app.fetch,
    port,
    hostname: "0.0.0.0",
  });
})();
