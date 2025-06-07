#!/bin/bash

echo "🚀 Starting Docker deployment for Stack Builder application..."

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📄 Creating .env file from .env.docker template..."
    cp .env.docker .env
    echo "⚠️  Please update the .env file with your actual API keys before running the application."
fi

# Build and start all services
echo "🔨 Building Docker images..."
docker-compose build

echo "🚀 Starting all services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service health
echo "🔍 Checking service health..."
echo "Frontend (Port 3000): $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health || echo "Not responding")"
echo "Backend (Port 4000): $(curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/api/health || echo "Not responding")"
echo "Python API (Port 5000): $(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/health || echo "Not responding")"
echo "PostgreSQL (Port 5432): $(docker-compose exec postgres pg_isready -U postgres &> /dev/null && echo "Ready" || echo "Not ready")"

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📍 Service URLs:"
echo "   Frontend:   http://localhost:3000"
echo "   Backend:    http://localhost:4000"
echo "   Python API: http://localhost:5000"
echo "   Database:   postgresql://postgres:postgres@localhost:5432/stackbuilder"
echo ""
echo "📋 Useful commands:"
echo "   View logs:     docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart:       docker-compose restart"
echo ""
echo "⚙️  To configure AI features, add your API keys to the .env file:"
echo "   OPENAI_API_KEY=your_openai_key"
echo "   PINECONE_API_KEY=your_pinecone_key"