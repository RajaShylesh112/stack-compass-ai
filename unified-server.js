import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = 3000;

console.log('Starting unified server for Next.js frontend...');

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Create proxy for API routes to backend
const apiProxy = createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api'
  }
});

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      
      // Proxy API requests to backend
      if (parsedUrl.pathname.startsWith('/api')) {
        return apiProxy(req, res);
      }
      
      // Handle Next.js pages
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Request error:', err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  });

  server.listen(port, hostname, () => {
    console.log(`Unified server ready on http://${hostname}:${port}`);
    console.log('Frontend accessible with API proxy to backend');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
    }
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('Shutting down server...');
    server.close(() => process.exit(0));
  });

  process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => process.exit(0));
  });

}).catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});