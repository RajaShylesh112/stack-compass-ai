#!/usr/bin/env node

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = promisify(exec);

function log(message, source = "hono") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit", 
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// AI Service for Python integration
class AIService {
  constructor() {
    this.pythonPath = path.join(__dirname, 'python-api');
  }

  async recommendStack(requestData) {
    try {
      const jsonData = JSON.stringify(requestData);
      const command = `cd "${this.pythonPath}" && python3 -c "
import sys
import json
sys.path.append('${this.pythonPath}')
from ai_module import ai_engine

request_data = json.loads('''${jsonData}''')
result = ai_engine.recommend_stack(
    request_data.get('project_type', 'web'),
    request_data.get('requirements', []),
    request_data.get('team_size', 3),
    request_data.get('experience_level', 'intermediate')
)
print(json.dumps(result))
"`;

      const { stdout, stderr } = await execAsync(command);
      
      if (stderr && stderr.trim() !== '') {
        console.error('Python stderr:', stderr);
      }
      
      if (!stdout || stdout.trim() === '') {
        throw new Error('No output from Python AI service');
      }
      
      return JSON.parse(stdout.trim());
    } catch (error) {
      console.error('AI service error:', error);
      throw new Error(`AI service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async analyzeCompatibility(technologies) {
    try {
      const jsonData = JSON.stringify(technologies);
      const command = `cd "${this.pythonPath}" && python3 -c "
import sys
import json
sys.path.append('${this.pythonPath}')
from ai_module import ai_engine

technologies = json.loads('''${jsonData}''')
result = ai_engine.analyze_compatibility(technologies)
print(json.dumps(result))
"`;

      const { stdout, stderr } = await execAsync(command);
      
      if (stderr && stderr.trim() !== '') {
        console.error('Python stderr:', stderr);
      }
      
      if (!stdout || stdout.trim() === '') {
        throw new Error('No output from Python AI service');
      }
      
      return JSON.parse(stdout.trim());
    } catch (error) {
      console.error('AI service error:', error);
      throw new Error(`AI service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getSupportedTechnologies() {
    try {
      const command = `cd "${this.pythonPath}" && python3 -c "
import sys
import json
sys.path.append('${this.pythonPath}')
from ai_module import ai_engine

result = ai_engine.get_supported_technologies()
print(json.dumps(result))
"`;

      const { stdout, stderr } = await execAsync(command);
      
      if (stderr && stderr.trim() !== '') {
        console.error('Python stderr:', stderr);
      }
      
      if (!stdout || stdout.trim() === '') {
        throw new Error('No output from Python AI service');
      }
      
      return JSON.parse(stdout.trim());
    } catch (error) {
      console.error('AI service error:', error);
      throw new Error(`AI service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async checkStatus() {
    try {
      const command = `cd "${this.pythonPath}" && python3 -c "
import sys
print('Python', sys.version.split()[0])
"`;

      const { stdout, stderr } = await execAsync(command);
      
      if (stderr && stderr.trim() !== '') {
        console.error('Python stderr:', stderr);
      }
      
      return {
        ai_service_available: true,
        python_api_status: "embedded",
        python_version: stdout.trim(),
        features: {
          basic_recommendations: true,
          compatibility_analysis: true,
          technology_database: true,
          ai_enhanced: false
        }
      };
    } catch (error) {
      console.error('AI service error:', error);
      return {
        ai_service_available: false,
        python_api_status: "error"
      };
    }
  }
}

const aiService = new AIService();

async function registerRoutes(app) {
  // AI endpoints
  app.post("/api/ai/recommend-stack", async (c) => {
    try {
      const requestData = await c.req.json();
      const result = await aiService.recommendStack(requestData);
      return c.json(result);
    } catch (error) {
      return c.json({ error: "Failed to get AI recommendations" }, 500);
    }
  });

  app.get("/api/ai/supported-technologies", async (c) => {
    try {
      const result = await aiService.getSupportedTechnologies();
      return c.json(result);
    } catch (error) {
      return c.json({ error: "Failed to get technologies" }, 500);
    }
  });

  app.post("/api/ai/analyze-compatibility", async (c) => {
    try {
      const { technologies } = await c.req.json();
      const result = await aiService.analyzeCompatibility(technologies);
      return c.json(result);
    } catch (error) {
      return c.json({ error: "Failed to analyze compatibility" }, 500);
    }
  });

  app.get("/api/ai/status", async (c) => {
    try {
      const status = await aiService.checkStatus();
      return c.json(status);
    } catch (error) {
      return c.json({ 
        ai_service_available: false,
        python_api_status: "error"
      });
    }
  });

  // Health check
  app.get("/api/health", (c) => {
    return c.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
}

(async () => {
  const app = new Hono();

  // Logging middleware
  app.use('*', async (c, next) => {
    const start = Date.now();
    const reqPath = c.req.path;
    
    await next();
    
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${c.req.method} ${reqPath} ${c.res.status} in ${duration}ms`;
      
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
        const clientTemplate = path.resolve(__dirname, "client", "index.html");
        const template = await fs.promises.readFile(clientTemplate, "utf-8");
        return c.html(template);
      } catch (error) {
        log(`Error serving page: ${error}`);
        return c.text("Internal Server Error", 500);
      }
    });
  } else {
    // Production mode - serve static files
    const distPath = path.resolve(__dirname, "public");
    
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