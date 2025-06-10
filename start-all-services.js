#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting all services for the tech stack recommendation app...');

// Environment variables
const env = {
  ...process.env,
  NEXT_PUBLIC_API_URL: 'http://localhost:4000',
  NODE_ENV: 'development',
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY
};

// Start Python AI service
console.log('Starting Python AI service on port 8000...');
const aiProcess = spawn('python3', ['simple_main.py'], {
  cwd: join(__dirname, 'python-api'),
  env,
  stdio: ['ignore', 'pipe', 'pipe']
});

// Start Next.js frontend on port 3000
console.log('Starting Next.js frontend on port 3000...');
const frontendProcess = spawn('npx', ['next', 'dev', '--port', '3000', '--hostname', '0.0.0.0'], {
  cwd: __dirname,
  env,
  stdio: ['ignore', 'pipe', 'pipe']
});

// Handle outputs
aiProcess.stdout.on('data', (data) => {
  const output = data.toString().trim();
  if (output) console.log(`[AI-API] ${output}`);
});

aiProcess.stderr.on('data', (data) => {
  const output = data.toString().trim();
  if (output && !output.includes('WARNING')) console.log(`[AI-API] ${output}`);
});

frontendProcess.stdout.on('data', (data) => {
  const output = data.toString().trim();
  if (output) console.log(`[Frontend] ${output}`);
});

frontendProcess.stderr.on('data', (data) => {
  const output = data.toString().trim();
  if (output && !output.includes('WARNING')) console.log(`[Frontend] ${output}`);
});

// Handle process exits
aiProcess.on('exit', (code) => {
  if (code !== 0) console.log(`AI service exited with code ${code}`);
});

frontendProcess.on('exit', (code) => {
  if (code !== 0) console.log(`Frontend exited with code ${code}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down all services...');
  aiProcess.kill('SIGTERM');
  frontendProcess.kill('SIGTERM');
  setTimeout(() => {
    aiProcess.kill('SIGKILL');
    frontendProcess.kill('SIGKILL');
    process.exit(0);
  }, 5000);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Keep process alive
console.log('All services starting...');
console.log('Backend (Hono): http://localhost:4000 (run separately with npm run dev)');
console.log('Frontend (Next.js): http://localhost:3000');
console.log('AI Service: http://localhost:8000');
console.log('Press Ctrl+C to stop all services');

// Prevent exit
setInterval(() => {}, 1000);