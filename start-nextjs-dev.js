const { spawn } = require('child_process');

// Set environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:5000';
process.env.HOSTNAME = '0.0.0.0';
process.env.PORT = '3000';

// Start Next.js development server
const nextDev = spawn('npx', ['next', 'dev', '-p', '3000', '-H', '0.0.0.0'], {
  stdio: 'inherit',
  env: process.env
});

nextDev.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
});

nextDev.on('error', (err) => {
  console.error('Failed to start Next.js:', err);
});