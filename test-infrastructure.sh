#!/bin/bash

echo "Testing multi-service infrastructure..."

# Test current server on port 4000
echo "Testing backend server on port 4000..."
netstat -tuln | grep :4000 || echo "Port 4000 not listening"

# Check if processes are running
echo "Checking running processes..."
ps aux | grep -E "(tsx|node)" | grep -v grep || echo "No Node.js processes found"

# Direct server test
echo "Starting backend server directly on port 4000..."
cd /home/runner/workspace
PORT=4000 NODE_ENV=development tsx server/index.ts &
SERVER_PID=$!
echo "Backend started with PID: $SERVER_PID"

# Wait and test
sleep 5
echo "Testing backend endpoint..."
curl -X GET http://127.0.0.1:4000/api/health 2>/dev/null || echo "Backend not responding"

# Test Python API availability
echo "Testing Python environment..."
cd python-api
python --version
python -c "import uvicorn; print('FastAPI dependencies available')" || echo "Missing dependencies"

echo "Infrastructure test complete"