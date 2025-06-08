
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = 3000;

console.log('Waiting for backend to be ready...');

// Wait for backend to be available
const waitForBackend = async () => {
  let attempts = 0;
  const maxAttempts = 30;
  
  while (attempts < maxAttempts) {
    try {
      const response = await fetch('http://localhost:5000/api/health');
      if (response.ok) {
        console.log('✓ Backend is ready');
        break;
      }
    } catch (error) {
      // Backend not ready yet
    }
    
    attempts++;
    if (attempts >= maxAttempts) {
      console.log('⚠ Starting frontend without backend confirmation');
      break;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

const startFrontend = async () => {
  await waitForBackend();
  
  console.log('Starting Next.js frontend...');
  const app = next({ dev, hostname, port });
  const handle = app.getRequestHandler();

  await app.prepare();
  
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, hostname, () => {
      console.log(`✓ Next.js frontend ready on http://${hostname}:${port}`);
      console.log(`✓ Preview available at: https://your-repl-name.your-username.repl.co:3002`);
    });
};

startFrontend().catch(console.error);
