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

  // CORS middleware for Docker networking
  app.use('*', async (c, next) => {
    c.header('Access-Control-Allow-Origin', '*');
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (c.req.method === 'OPTIONS') {
      return c.text('', 200);
    }
    
    await next();
  });

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
    console.error('Server error:', err);
    const message = err.message || "Internal Server Error";
    return c.json({ message }, 500);
  });

  // Register API routes
  await registerRoutes(app);

  // Health check for Docker
  app.get("/health", (c) => {
    return c.json({ 
      status: 'healthy', 
      service: 'backend',
      timestamp: new Date().toISOString(),
      port: process.env.PORT || 4000
    });
  });

  // Static file serving in production
  if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(process.cwd(), "dist", "client");
    
    if (fs.existsSync(distPath)) {
      app.use('/*', serveStatic({ root: './dist/client' }));
    }
    
    // Fallback to index.html for SPA routing
    app.use('*', async (c) => {
      if (c.req.path.startsWith('/api')) {
        return c.notFound();
      }
      
      try {
        const indexPath = path.resolve(distPath, "index.html");
        const content = await fs.promises.readFile(indexPath, "utf-8");
        return c.html(content);
      } catch (error) {
        return c.text("Application not built", 404);
      }
    });
  } else {
    // Development mode fallback
    app.use('*', async (c) => {
      if (c.req.path.startsWith('/api')) {
        return c.notFound();
      }
      return c.text("Development mode - frontend should be served separately", 200);
    });
  }

  const port = parseInt(process.env.PORT || '4000');
  
  log(`Backend server starting on port ${port}`);
  log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  log(`Python API URL: ${process.env.PYTHON_API_URL || 'http://localhost:5000'}`);
  
  try {
    serve({
      fetch: app.fetch,
      port,
      hostname: "0.0.0.0",
    });
    
    log(`Backend server running on http://0.0.0.0:${port}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();