import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting development servers...');

// Start Hono backend (already managed by workflow)
console.log('✓ Hono backend running on port 5000');

// Start Python AI service
console.log('Starting Python AI service...');
const aiProcess = spawn('python3', ['simple_main.py'], {
  cwd: join(__dirname, 'python-api'),
  env: { ...process.env, MISTRAL_API_KEY: process.env.MISTRAL_API_KEY },
  stdio: ['ignore', 'pipe', 'pipe']
});

// Start Next.js frontend
console.log('Starting Next.js frontend...');
const frontendProcess = spawn('npx', ['next', 'dev', '--port', '3000', '--hostname', '0.0.0.0'], {
  cwd: __dirname,
  env: { ...process.env, NEXT_PUBLIC_API_URL: 'http://localhost:5000' },
  stdio: ['ignore', 'pipe', 'pipe']
});

// Handle process outputs
aiProcess.stdout.on('data', (data) => {
  console.log(`[AI] ${data.toString().trim()}`);
});

frontendProcess.stdout.on('data', (data) => {
  console.log(`[Frontend] ${data.toString().trim()}`);
});

// Handle process exits
aiProcess.on('exit', (code) => {
  console.log(`AI service exited with code ${code}`);
});

frontendProcess.on('exit', (code) => {
  console.log(`Frontend exited with code ${code}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  aiProcess.kill();
  frontendProcess.kill();
  process.exit(0);
});

console.log('All services starting. Frontend will be available at http://localhost:3000');