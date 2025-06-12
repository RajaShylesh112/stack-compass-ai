#!/bin/bash

echo "🚀 Starting StackCompare with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build and start all services
echo "📦 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo "🔍 Checking service health..."

# Check Python API
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ Python AI API is running on http://localhost:8000"
else
    echo "❌ Python AI API is not responding"
fi

# Check Hono Backend
if curl -f http://localhost:4000/api/health > /dev/null 2>&1; then
    echo "✅ Hono Backend is running on http://localhost:4000"
else
    echo "❌ Hono Backend is not responding"
fi

# Check Next.js Frontend
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Next.js Frontend is running on http://localhost:3000"
else
    echo "❌ Next.js Frontend is not responding"
fi

echo ""
echo "🎉 StackCompare is now running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:4000"
echo "🤖 AI API: http://localhost:8000"
echo ""
echo "To stop all services, run: docker-compose down"
echo "To view logs, run: docker-compose logs -f" 