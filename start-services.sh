#!/bin/bash

# Start Python AI service
echo "Starting Python AI service..."
cd python-api && MISTRAL_API_KEY="${MISTRAL_API_KEY}" python3 simple_main.py &
PYTHON_PID=$!

# Wait for Python service to start
sleep 3

# Start Hono backend
echo "Starting Hono backend..."
cd /home/runner/workspace && NODE_ENV=development tsx server/index.ts &
HONO_PID=$!

# Wait for backend to start
sleep 3

# Start Next.js frontend
echo "Starting Next.js frontend..."
cd /home/runner/workspace && NEXT_PUBLIC_API_URL=http://localhost:5000 npx next dev -H 0.0.0.0 -p 3000 &
NEXTJS_PID=$!

echo "All services started:"
echo "- Python AI: PID $PYTHON_PID (port 8000)"
echo "- Hono Backend: PID $HONO_PID (port 5000)" 
echo "- Next.js Frontend: PID $NEXTJS_PID (port 3000)"

# Keep script running
wait