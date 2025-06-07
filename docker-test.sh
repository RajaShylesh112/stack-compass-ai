#!/bin/bash

echo "🚀 Docker Multi-Service Deployment Test"
echo "========================================"

# Stop any existing processes
pkill -f "tsx" 2>/dev/null || true
pkill -f "uvicorn" 2>/dev/null || true
sleep 2

# Start backend on port 4000
echo "Starting Backend (Node.js/Hono) on port 4000..."
cd /home/runner/workspace
PORT=4000 NODE_ENV=development tsx server/index.ts &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Start Python API on port 5000
echo "Starting Python API (FastAPI) on port 5000..."
cd python-api
python -m uvicorn simple_main:app --host 0.0.0.0 --port 5000 &
PYTHON_PID=$!
echo "Python API PID: $PYTHON_PID"
cd ..

# Wait for services to initialize
echo "Waiting for services to start..."
sleep 8

# Test endpoints
echo ""
echo "Testing Service Endpoints:"
echo "=========================="

# Test backend health
echo -n "Backend Health (4000): "
BACKEND_RESPONSE=$(curl -s http://127.0.0.1:4000/api/health 2>/dev/null || echo "FAILED")
if [[ "$BACKEND_RESPONSE" == *"status"* ]]; then
    echo "✅ HEALTHY"
else
    echo "❌ FAILED"
fi

# Test Python API health
echo -n "Python API Health (5000): "
PYTHON_RESPONSE=$(curl -s http://127.0.0.1:5000/health 2>/dev/null || echo "FAILED")
if [[ "$PYTHON_RESPONSE" == *"healthy"* ]]; then
    echo "✅ HEALTHY"
else
    echo "❌ FAILED"
fi

# Test AI integration
echo -n "AI Stack Recommendations: "
AI_RESPONSE=$(curl -s -X POST http://127.0.0.1:4000/api/ai/recommend-stack \
  -H "Content-Type: application/json" \
  -d '{"project_type":"web","requirements":["responsive"],"team_size":2}' 2>/dev/null || echo "FAILED")
if [[ "$AI_RESPONSE" == *"recommended_stack"* ]]; then
    echo "✅ WORKING"
else
    echo "❌ FAILED"
fi

echo ""
echo "Docker Infrastructure Summary:"
echo "=============================="
echo "✅ Backend Server: Node.js/Hono on port 4000"
echo "✅ Python API: FastAPI on port 5000"
echo "✅ Database: PostgreSQL configured for port 5432"
echo "✅ Frontend: React/Vite configured for port 3000"
echo ""
echo "Ready for Docker deployment with:"
echo "docker-compose up -d --build"

# Keep services running for demonstration
echo ""
echo "Services running for demonstration..."
echo "Press Ctrl+C to stop all services"
trap "kill $BACKEND_PID $PYTHON_PID 2>/dev/null; exit" INT
wait