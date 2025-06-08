import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = 3000;

console.log('Initializing Next.js frontend server...');

const app = next({ dev, hostname, port, dir: '.' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Request error:', err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  })
  .listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`Frontend server ready on http://${hostname}:${port}`);
  })
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying alternative...`);
      process.exit(1);
    } else {
      throw err;
    }
  });
}).catch((ex) => {
  console.error('Failed to start frontend:', ex);
  process.exit(1);
});