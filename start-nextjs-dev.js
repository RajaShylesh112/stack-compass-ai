#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Start Next.js development server
const nextProcess = spawn('npx', ['next', 'dev', '-p', '3000'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

// Start Python AI service
const pythonProcess = spawn('python3', ['simple_main.py'], {
  stdio: 'inherit',
  cwd: path.join(process.cwd(), 'python-api')
});

console.log('Starting development servers...');
console.log('Next.js frontend: http://localhost:3000');
console.log('Express backend: http://localhost:5000');
console.log('Python AI service: http://localhost:8000');

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down development servers...');
  nextProcess.kill();
  pythonProcess.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  nextProcess.kill();
  pythonProcess.kill();
  process.exit(0);
});