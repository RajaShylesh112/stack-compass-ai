#!/bin/bash

# StackCompare Deployment Script
# This script deploys the complete StackCompare application

set -e

echo "🚀 Starting StackCompare deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "📝 Please edit .env file with your API keys before continuing."
    echo "   Required: MISTRAL_API_KEY"
    echo "   Optional: APPWRITE_* variables for data persistence"
    exit 1
fi

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo "🏥 Checking service health..."

# Check Next.js frontend
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Next.js Frontend: Ready (http://localhost:3000)"
else
    echo "❌ Next.js Frontend: Not ready"
fi

# Check Python AI API
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ Python AI API: Ready (http://localhost:8000)"
else
    echo "❌ Python AI API: Not ready"
fi

# Test AI recommendations
echo "🧪 Testing AI recommendations..."
if curl -X POST http://localhost:3000/api/ai/recommend-stack \
    -H "Content-Type: application/json" \
    -d '{"project_type":"web","requirements":["responsive"],"team_size":2}' \
    > /dev/null 2>&1; then
    echo "✅ AI Recommendations: Working"
else
    echo "⚠️  AI Recommendations: May need MISTRAL_API_KEY"
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📱 Services available at:"
echo "   Frontend:   http://localhost:3000"
echo "   AI API:     http://localhost:8000"
echo ""
echo "🔑 Environment variables:"
echo "   MISTRAL_API_KEY: $(if [ -n "$MISTRAL_API_KEY" ]; then echo "Set"; else echo "Not set"; fi)"
echo "   APPWRITE_*: $(if [ -n "$APPWRITE_ENDPOINT" ]; then echo "Set"; else echo "Not set"; fi)"
echo ""
echo "📚 Next steps:"
echo "   1. Visit http://localhost:3000 to use the application"
echo "   2. Set MISTRAL_API_KEY in .env for AI features"
echo "   3. Set APPWRITE_* variables for data persistence"
echo ""
echo "🛠️  Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart: docker-compose restart"