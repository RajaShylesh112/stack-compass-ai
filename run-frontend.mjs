import { spawn } from 'child_process';

const env = {
  ...process.env,
  NEXT_PUBLIC_API_URL: 'http://localhost:5000',
  PORT: '3000',
  HOSTNAME: '0.0.0.0'
};

console.log('Starting Next.js frontend on 0.0.0.0:3000...');

const nextProcess = spawn('npx', ['next', 'dev', '--port', '3000', '--hostname', '0.0.0.0'], {
  env,
  stdio: 'inherit'
});

nextProcess.on('exit', (code) => {
  console.log(`Next.js process exited with code ${code}`);
});

process.on('SIGINT', () => {
  nextProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  nextProcess.kill('SIGTERM');
  process.exit(0);
});