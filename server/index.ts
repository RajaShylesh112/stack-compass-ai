import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { registerRoutes } from "./routes.js";

function log(message: string, source = "hono") {
  const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });
  console.log(`${timestamp} [${source}] ${message}`);
}

async function startServer() {
  const app = new Hono();

  // Middleware
  app.use("*", logger());
  app.use(
    "*",
    cors({
      origin: ["http://localhost:3000", "http://localhost:5173"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Register API routes
  registerRoutes(app);

  const port = parseInt(process.env.PORT || '4000');
  
  log(`Backend server starting on port ${port}`);
  log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  log(`Python API URL: ${process.env.PYTHON_API_URL || 'http://localhost:8000'}`);
  
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
}

startServer().catch(console.error);