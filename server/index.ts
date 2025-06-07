import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { createServer } from "http";
import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const honoApp = new Hono();

// Logging middleware
honoApp.use('*', async (c, next) => {
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
honoApp.onError((err, c) => {
  const status = 500;
  const message = err.message || "Internal Server Error";
  
  return c.json({ message }, status);
});

(async () => {
  // Register Hono routes
  await registerRoutes(honoApp);

  // Create Express app for Vite integration
  const expressApp = express();
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: false }));
  
  // Mount Hono app on Express for API routes
  expressApp.use('/api*', async (req, res) => {
    try {
      const url = new URL(req.originalUrl, 'http://localhost:5000');
      const request = new Request(url.href, {
        method: req.method,
        headers: Object.entries(req.headers).reduce((acc, [key, value]) => {
          if (value) acc[key] = Array.isArray(value) ? value.join(', ') : value;
          return acc;
        }, {} as Record<string, string>),
        body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
      });
      
      const response = await honoApp.fetch(request);
      
      res.status(response.status);
      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });
      
      const responseText = await response.text();
      res.send(responseText);
    } catch (error) {
      console.error('Hono adapter error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(expressApp);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "development") {
    await setupVite(expressApp, httpServer);
  } else {
    serveStatic(expressApp);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  
  httpServer.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    log(`serving on port ${port}`);
  });
})();
