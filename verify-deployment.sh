#!/bin/bash

echo "Verifying Docker deployment infrastructure..."

# Test if services can start correctly
echo "1. Testing backend server startup..."
cd /home/runner/workspace
timeout 10 bash -c 'PORT=4000 NODE_ENV=development tsx server/index.ts' &
BACKEND_PID=$!
sleep 3

# Check if backend is running
if ps -p $BACKEND_PID > /dev/null; then
    echo "   ✓ Backend server started successfully"
    kill $BACKEND_PID 2>/dev/null
else
    echo "   ✗ Backend server failed to start"
fi

# Test Python API
echo "2. Testing Python API startup..."
cd python-api
timeout 10 python -m uvicorn simple_main:app --host 0.0.0.0 --port 5000 &
PYTHON_PID=$!
sleep 3

if ps -p $PYTHON_PID > /dev/null; then
    echo "   ✓ Python API started successfully"
    kill $PYTHON_PID 2>/dev/null
else
    echo "   ✗ Python API failed to start"
fi

cd ..

# Test Docker configuration files
echo "3. Validating Docker configuration..."
if [ -f "docker-compose.yml" ]; then
    echo "   ✓ Docker Compose configuration exists"
else
    echo "   ✗ Missing docker-compose.yml"
fi

if [ -f "Dockerfile.client" ] && [ -f "Dockerfile.server" ] && [ -f "Dockerfile.python" ]; then
    echo "   ✓ All Dockerfiles present"
else
    echo "   ✗ Missing Docker configuration files"
fi

# Test environment configuration
echo "4. Environment configuration..."
if [ -f ".env.docker" ]; then
    echo "   ✓ Docker environment template exists"
else
    echo "   ✗ Missing .env.docker template"
fi

echo ""
echo "Docker deployment infrastructure verification complete"
echo ""
echo "To deploy with Docker:"
echo "1. Copy environment: cp .env.docker .env"
echo "2. Add API keys to .env file"
echo "3. Run: docker-compose up -d --build"
echo ""
echo "Service ports:"
echo "- Frontend: 3000"
echo "- Backend: 4000" 
echo "- Python API: 5000"
echo "- PostgreSQL: 5432"