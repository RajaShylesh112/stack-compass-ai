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
        
        // Simple development HTML page
        const devHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stack Builder - Docker Multi-Service Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: white;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            text-align: center;
        }
        .service-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }
        .service-card {
            background: rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 24px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }
        .status-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 8px;
        }
        .status-healthy { background: #10b981; }
        .status-pending { background: #f59e0b; }
        .status-error { background: #ef4444; }
        .btn {
            background: rgba(255,255,255,0.2);
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            cursor: pointer;
            margin: 8px;
            transition: all 0.3s;
        }
        .btn:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }
        #api-response {
            background: rgba(0,0,0,0.3);
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
            text-align: left;
            font-family: 'Courier New', monospace;
            max-height: 300px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Stack Builder - Multi-Service Architecture</h1>
        <p>Docker deployment with separate services on distinct ports</p>
        
        <div class="service-grid">
            <div class="service-card">
                <h3><span class="status-indicator status-healthy"></span>Backend (Node.js/Hono)</h3>
                <p>Port 4000 - API Server</p>
                <button class="btn" onclick="testBackend()">Test Health</button>
            </div>
            <div class="service-card">
                <h3><span class="status-indicator status-pending"></span>Python API (FastAPI)</h3>
                <p>Port 5000 - AI Services</p>
                <button class="btn" onclick="testPython()">Test Health</button>
            </div>
            <div class="service-card">
                <h3><span class="status-indicator status-pending"></span>PostgreSQL</h3>
                <p>Port 5432 - Database</p>
                <button class="btn" onclick="testDatabase()">Test Connection</button>
            </div>
            <div class="service-card">
                <h3><span class="status-indicator status-healthy"></span>Frontend (React)</h3>
                <p>Port 3000 - UI Layer</p>
                <button class="btn" onclick="testAI()">Test AI Recommendations</button>
            </div>
        </div>
        
        <div>
            <h3>API Response:</h3>
            <div id="api-response">Click buttons above to test services...</div>
        </div>
        
        <div style="margin-top: 40px; padding: 20px; background: rgba(0,0,0,0.2); border-radius: 8px;">
            <h3>Docker Deployment Ready</h3>
            <p><strong>Command:</strong> <code>docker-compose up -d --build</code></p>
            <p>All services configured with health checks, environment variables, and inter-container networking</p>
        </div>
    </div>

    <script>
        async function testBackend() {
            updateResponse('Testing backend health...');
            try {
                const response = await fetch('/api/health');
                const data = await response.json();
                updateResponse('Backend Health: ' + JSON.stringify(data, null, 2));
            } catch (error) {
                updateResponse('Backend Error: ' + error.message);
            }
        }
        
        async function testPython() {
            updateResponse('Testing Python API...');
            try {
                const response = await fetch('/api/ai/status');
                const data = await response.json();
                updateResponse('Python API Status: ' + JSON.stringify(data, null, 2));
            } catch (error) {
                updateResponse('Python API Error: ' + error.message);
            }
        }
        
        async function testDatabase() {
            updateResponse('Testing database connection...');
            try {
                const response = await fetch('/api/health');
                const data = await response.json();
                updateResponse('Database connection checked via backend: ' + JSON.stringify(data, null, 2));
            } catch (error) {
                updateResponse('Database Error: ' + error.message);
            }
        }
        
        async function testAI() {
            updateResponse('Testing AI recommendations...');
            try {
                const response = await fetch('/api/ai/recommend-stack', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        project_type: 'web',
                        requirements: ['responsive design', 'real-time features'],
                        team_size: 3,
                        experience_level: 'intermediate'
                    })
                });
                const data = await response.json();
                updateResponse('AI Recommendations: ' + JSON.stringify(data, null, 2));
            } catch (error) {
                updateResponse('AI Error: ' + error.message);
            }
        }
        
        function updateResponse(text) {
            document.getElementById('api-response').textContent = text;
        }
        
        // Auto-test backend on load
        setTimeout(testBackend, 1000);
    </script>
</body>
</html>`;
        
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
