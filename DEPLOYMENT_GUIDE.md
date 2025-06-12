# StackCompare Deployment Guide

## Architecture Overview

The application is deployed across 3 separate services:

- **Frontend (Next.js)**: Port 3000
- **Python AI API (FastAPI)**: Port 8000
- **Database (Appwrite Cloud)**: Managed service

## Quick Deployment

### 1. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your API keys
nano .env
```

### 2. Docker Deployment
```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

### 3. Verify Deployment
```bash
# Frontend
curl http://localhost:3000

# Python AI API
curl http://localhost:8000/health

# Test AI recommendations
curl -X POST http://localhost:3000/api/ai/recommend-stack \
  -H "Content-Type: application/json" \
  -d '{"project_type":"web","requirements":["responsive"],"team_size":2}'
```

## Environment Variables Required

### Required for AI Features
```env
MISTRAL_API_KEY=your_mistral_api_key_here
```

### Appwrite Configuration (Optional)
```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=your_database_id
```

### Service Communication
```env
PYTHON_API_URL=http://python-api:8000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Service Health Checks

Each service includes health monitoring:

- **Frontend**: `GET /`
- **Python API**: `GET /health`
- **Appwrite**: Automatic health monitoring

## Production Considerations

### Security
- Use environment variables for all API keys
- Configure HTTPS with SSL certificates
- Use Docker secrets for sensitive data
- Set up proper CORS configuration

### Scaling
- Use Docker Swarm or Kubernetes
- Configure load balancers
- Set up horizontal pod autoscaling
- Implement service mesh

### Monitoring
- Add application logging
- Configure health check endpoints
- Set up alerting
- Monitor resource usage

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000 and 8000 are available
2. **Memory limits**: Increase Docker memory allocation
3. **API key errors**: Verify environment variables are set
4. **Network issues**: Check Docker networking configuration

### Debug Commands
```bash
# View service logs
docker-compose logs nextjs
docker-compose logs python-api

# Connect to containers
docker-compose exec nextjs sh
docker-compose exec python-api bash

# Reset deployment
docker-compose down -v
docker-compose up -d --build
```

## Development vs Production

### Development
- Uses local file mounting
- Hot reload enabled
- Debug logging active
- Development environment variables

### Production
- Built images with optimized assets
- Production environment variables
- SSL termination
- Resource limits configured

## API Endpoints

### Next.js Frontend (Port 3000)
```
GET  /
GET  /ai-recommendations
GET  /stack-builder
GET  /compare-stacks
GET  /resources
```

### Next.js API Routes (Port 3000)
```
GET  /api/health
POST /api/ai/recommend-stack
GET  /api/ai/supported-technologies
GET  /api/ai/status
POST /api/ai/analyze-compatibility
```

### Python AI Service (Port 8000)
```
GET  /health
POST /api/ai/recommend-stack
GET  /api/ai/supported-technologies
```

## Deployment Options

### 1. Docker Compose (Recommended)
- Complete containerized deployment
- Easy local development
- Production-ready configuration

### 2. Vercel Deployment
- Deploy Next.js frontend to Vercel
- Use Vercel Edge Functions for API routes
- Connect to external Python AI service

### 3. Manual VPS Deployment
- Deploy Next.js to VPS
- Run Python AI service separately
- Configure reverse proxy (Nginx)

The application is fully containerized and ready for deployment in any Docker-compatible environment.