#!/bin/bash
set -e

echo "Starting AI-powered stack recommendation platform..."

# Kill any existing processes
pkill -f "python.*simple_main" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
sleep 2

# Start Python AI service
echo "Starting Mistral AI service..."
cd python-api
MISTRAL_API_KEY="${MISTRAL_API_KEY}" python3 simple_main.py &
AI_PID=$!
echo "AI service started with PID $AI_PID"

# Go back to workspace root
cd /home/runner/workspace

# Start Next.js frontend
echo "Starting Next.js frontend..."
NEXT_PUBLIC_API_URL=http://localhost:5000 npx next dev --port 3000 --hostname 0.0.0.0 &
FRONTEND_PID=$!
echo "Frontend started with PID $FRONTEND_PID"

echo "All services running:"
echo "- Hono Backend: port 5000 (already running)"
echo "- Python AI: port 8000 (PID $AI_PID)"
echo "- Next.js Frontend: port 3000 (PID $FRONTEND_PID)"

# Keep the script running
wait