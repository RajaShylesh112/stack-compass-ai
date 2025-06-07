import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  
  // Proxy API requests to Hono backend
  server.use('/api', createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  }));
  
  // Handle all other requests with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });
  
  server.listen(3000, '0.0.0.0', (err) => {
    if (err) throw err;
    console.log('> Ready on http://0.0.0.0:3000');
  });
});
