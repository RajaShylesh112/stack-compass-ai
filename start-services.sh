#!/bin/bash

echo "Starting multi-service Stack Builder application..."

# Kill any existing processes
pkill -f "tsx server" || true
pkill -f "uvicorn" || true
sleep 2

# Start Backend on port 4000
echo "Starting Backend (Node.js/Hono) on port 4000..."
PORT=4000 NODE_ENV=development tsx server/index.ts &
BACKEND_PID=$!

# Start Python API on port 5000
echo "Starting Python API (FastAPI) on port 5000..."
cd python-api && python -m uvicorn simple_main:app --host 0.0.0.0 --port 5000 &
PYTHON_PID=$!
cd ..

# Wait for services to start
sleep 5

echo "Services started:"
echo "  Backend PID: $BACKEND_PID"
echo "  Python API PID: $PYTHON_PID"
echo ""
echo "Testing service endpoints..."

# Test Backend
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/api/health 2>/dev/null || echo "000")
echo "  Backend (4000): $BACKEND_STATUS"

# Test Python API
PYTHON_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/health 2>/dev/null || echo "000")
echo "  Python API (5000): $PYTHON_STATUS"

echo ""
echo "Multi-service infrastructure ready for Docker deployment"
echo ""
echo "Service URLs:"
echo "  Backend API: http://localhost:4000/api/health"
echo "  Python API: http://localhost:5000/health"
echo "  AI Recommendations: http://localhost:4000/api/ai/recommend-stack"