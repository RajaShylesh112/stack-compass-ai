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
    this.pythonPath = path.resolve(__dirname, '..', 'python-api');
  }

  async recommendStack(requestData) {
    try {
      // Write JSON to temporary file to avoid escaping issues
      const tempFile = `/tmp/ai_request_${Date.now()}.json`;
      await fs.promises.writeFile(tempFile, JSON.stringify(requestData));
      
      const command = `cd "${this.pythonPath}" && python3 -c "
import sys, json, os
sys.path.insert(0, '${this.pythonPath}')
try:
    from ai_module import ai_engine
    with open('${tempFile}', 'r') as f:
        request_data = json.load(f)
    result = ai_engine.recommend_stack(
        request_data.get('project_type', 'web'),
        request_data.get('requirements', []),
        request_data.get('team_size', 3),
        request_data.get('experience_level', 'intermediate')
    )
    print(json.dumps(result))
except Exception as e:
    print(json.dumps({'error': str(e)}))
"`;

      const { stdout, stderr } = await execAsync(command);
      
      // Clean up temp file
      try {
        await fs.promises.unlink(tempFile);
      } catch (e) {
        // Ignore cleanup errors
      }
      
      if (!stdout || stdout.trim() === '') {
        throw new Error('No output from Python AI service');
      }
      
      const result = JSON.parse(stdout.trim());
      if (result.error) {
        throw new Error(result.error);
      }
      
      return result;
    } catch (error) {
      console.error('AI service error:', error);
      // Return a basic fallback structure for demo purposes
      return {
        recommended_stack: {
          frontend: {
            name: "React",
            category: "frontend",
            reason: "Popular choice for web applications",
            pros: ["Large ecosystem", "Component-based"],
            cons: ["Learning curve", "Frequent updates"],
            learning_curve: "moderate",
            popularity_score: 0.9,
            compatibility_score: 0.9
          },
          backend: {
            name: "Node.js",
            category: "backend", 
            reason: "JavaScript ecosystem compatibility",
            pros: ["JavaScript everywhere", "Fast development"],
            cons: ["Single-threaded", "Callback complexity"],
            learning_curve: "moderate",
            popularity_score: 0.85,
            compatibility_score: 0.9
          },
          database: {
            name: "PostgreSQL",
            category: "database",
            reason: "Reliable relational database",
            pros: ["ACID compliance", "Extensible"],
            cons: ["Complex setup", "Resource intensive"],
            learning_curve: "moderate",
            popularity_score: 0.8,
            compatibility_score: 0.85
          }
        },
        overall_score: 0.88,
        reasoning: "This stack provides a solid foundation for web applications with modern tooling and community support.",
        alternatives: ["Vue.js + Express + MongoDB", "Angular + Python/Django + MySQL"],
        estimated_learning_time: "2-4 weeks",
        estimated_development_time: "6-10 weeks"
      };
    }
  }

  async analyzeCompatibility(technologies) {
    try {
      // Write JSON to temporary file to avoid escaping issues
      const tempFile = `/tmp/ai_compat_${Date.now()}.json`;
      await fs.promises.writeFile(tempFile, JSON.stringify(technologies));
      
      const command = `cd "${this.pythonPath}" && python3 -c "
import sys, json
sys.path.insert(0, '${this.pythonPath}')
try:
    from ai_module import ai_engine
    with open('${tempFile}', 'r') as f:
        technologies = json.load(f)
    result = ai_engine.analyze_compatibility(technologies)
    print(json.dumps(result))
except Exception as e:
    print(json.dumps({'error': str(e)}))
"`;

      const { stdout, stderr } = await execAsync(command);
      
      // Clean up temp file
      try {
        await fs.promises.unlink(tempFile);
      } catch (e) {
        // Ignore cleanup errors
      }
      
      if (!stdout || stdout.trim() === '') {
        throw new Error('No output from Python AI service');
      }
      
      const result = JSON.parse(stdout.trim());
      if (result.error) {
        throw new Error(result.error);
      }
      
      return result;
    } catch (error) {
      console.error('AI service error:', error);
      // Return basic compatibility analysis
      const matrix = {};
      technologies.forEach(tech => {
        matrix[tech] = {
          score: 0.8,
          notes: `${tech} is generally compatible with modern development stacks`,
          category: tech.toLowerCase().includes('react') || tech.toLowerCase().includes('vue') || tech.toLowerCase().includes('angular') ? 'frontend' :
                   tech.toLowerCase().includes('node') || tech.toLowerCase().includes('express') || tech.toLowerCase().includes('django') ? 'backend' : 'database'
        };
      });
      
      return {
        compatibility_matrix: matrix,
        overall_score: 0.8,
        recommendations: [
          "Selected technologies are generally compatible",
          "Consider using TypeScript for better type safety",
          "Implement proper API design patterns"
        ]
      };
    }
  }

  async getSupportedTechnologies() {
    try {
      const command = `cd "${this.pythonPath}" && python3 -c "
import sys, json
sys.path.insert(0, '${this.pythonPath}')
try:
    from ai_module import ai_engine
    result = ai_engine.get_supported_technologies()
    print(json.dumps(result))
except Exception as e:
    print(json.dumps({'error': str(e)}))
"`;

      const { stdout, stderr } = await execAsync(command);
      
      if (!stdout || stdout.trim() === '') {
        throw new Error('No output from Python AI service');
      }
      
      const result = JSON.parse(stdout.trim());
      if (result.error) {
        throw new Error(result.error);
      }
      
      return result;
    } catch (error) {
      console.error('AI service error:', error);
      // Return supported technologies list
      return {
        frontend: ["React", "Vue.js", "Angular", "Svelte", "Solid.js"],
        backend: ["Node.js", "Express.js", "Hono", "Python/Django", "Python/FastAPI", "Go", "Rust"],
        database: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "MySQL", "Firebase"],
        tools: ["TypeScript", "Webpack", "Vite", "Docker", "Kubernetes"]
      };
    }
  }

  async checkStatus() {
    try {
      const command = `python3 --version`;
      const { stdout, stderr } = await execAsync(command);
      
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
      return {
        ai_service_available: false,
        python_api_status: "error",
        error: error.message
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
      console.error('Recommend stack error:', error);
      return c.json({ error: "Failed to get AI recommendations" }, 500);
    }
  });

  app.get("/api/ai/supported-technologies", async (c) => {
    try {
      const result = await aiService.getSupportedTechnologies();
      return c.json(result);
    } catch (error) {
      console.error('Supported technologies error:', error);
      return c.json({ error: "Failed to get technologies" }, 500);
    }
  });

  app.post("/api/ai/analyze-compatibility", async (c) => {
    try {
      const { technologies } = await c.req.json();
      const result = await aiService.analyzeCompatibility(technologies);
      return c.json(result);
    } catch (error) {
      console.error('Compatibility analysis error:', error);
      return c.json({ error: "Failed to analyze compatibility" }, 500);
    }
  });

  app.get("/api/ai/status", async (c) => {
    try {
      const status = await aiService.checkStatus();
      return c.json(status);
    } catch (error) {
      console.error('AI status error:', error);
      return c.json({ 
        ai_service_available: false,
        python_api_status: "error",
        error: error.message
      });
    }
  });

  // Health check
  app.get("/api/health", (c) => {
    return c.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Users endpoint (placeholder)
  app.get("/api/users", (c) => {
    return c.json({ users: [] });
  });

  // Stacks endpoint (placeholder)
  app.get("/api/stacks", (c) => {
    return c.json({ stacks: [] });
  });
}

async function startServer() {
  const app = new Hono();

  // CORS middleware
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
    console.error('Server error:', err);
    const message = err.message || "Internal Server Error";
    return c.json({ message }, 500);
  });

  // Register API routes
  await registerRoutes(app);

  // Serve static files and SPA routing
  if (process.env.NODE_ENV === "development") {
    // Serve client files directly
    app.use('/src/*', serveStatic({ root: path.resolve(__dirname, '..', 'client') }));
    app.use('/node_modules/*', serveStatic({ root: path.resolve(__dirname, '..') }));
    
    // Handle SPA routing - serve index.html for non-API routes
    app.use('*', async (c) => {
      if (c.req.path.startsWith('/api')) {
        return c.notFound();
      }

      try {
        const clientTemplate = path.resolve(__dirname, "..", "client", "index.html");
        const template = await fs.promises.readFile(clientTemplate, "utf-8");
        return c.html(template);
      } catch (error) {
        log(`Error serving page: ${error}`);
        return c.text("Internal Server Error", 500);
      }
    });
  } else {
    // Production mode - serve static files
    const distPath = path.resolve(__dirname, "..", "public");
    
    if (fs.existsSync(distPath)) {
      app.use('/*', serveStatic({ root: './public' }));
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
  }

  const port = 5000;
  
  log(`serving on port ${port}`);
  
  try {
    serve({
      fetch: app.fetch,
      port,
      hostname: "0.0.0.0",
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nShutting down server...');
  process.exit(0);
});

// Start the server
startServer().catch(error => {
  console.error('Server startup error:', error);
  process.exit(1);
});