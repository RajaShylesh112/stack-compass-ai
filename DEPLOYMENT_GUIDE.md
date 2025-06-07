# Docker Multi-Service Deployment Guide

## Architecture Overview

The application is deployed across 4 separate Docker containers:

- **Frontend (React/Vite)**: Port 3000
- **Backend (Node.js/Hono)**: Port 4000  
- **Python AI API (FastAPI)**: Port 5000
- **Database (PostgreSQL)**: Port 5432

## Quick Deployment

### 1. Environment Setup
```bash
# Copy environment template
cp .env.docker .env

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
curl http://localhost:3000/health

# Backend API
curl http://localhost:4000/api/health

# Python AI API
curl http://localhost:5000/health

# Test AI recommendations
curl -X POST http://localhost:4000/api/ai/recommend-stack \
  -H "Content-Type: application/json" \
  -d '{"project_type":"web","requirements":["responsive"],"team_size":2}'
```

## Environment Variables Required

### Basic Infrastructure
```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/stackbuilder
NODE_ENV=production
PORT=4000
```

### AI Integration (Optional)
```env
OPENAI_API_KEY=your_openai_key_here
PINECONE_API_KEY=your_pinecone_key_here
OPENAI_MODEL=gpt-4
```

### Service Communication
```env
PYTHON_API_URL=http://python-api:5000
BACKEND_API_URL=http://backend:4000
VITE_API_URL=http://localhost:4000
```

## Service Health Checks

Each service includes health monitoring:

- **Frontend**: `GET /health`
- **Backend**: `GET /api/health`
- **Python API**: `GET /health`
- **Database**: PostgreSQL ready check

## Production Considerations

### Security
- Change default PostgreSQL password
- Add proper JWT secrets
- Configure HTTPS with SSL certificates
- Use Docker secrets for API keys

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

1. **Port conflicts**: Ensure ports 3000, 4000, 5000, 5432 are available
2. **Memory limits**: Increase Docker memory allocation
3. **API key errors**: Verify environment variables are set
4. **Network issues**: Check Docker networking configuration

### Debug Commands
```bash
# View service logs
docker-compose logs backend
docker-compose logs python-api

# Connect to containers
docker-compose exec backend sh
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

### Backend Service (Port 4000)
```
GET  /api/health
POST /api/ai/recommend-stack
GET  /api/ai/supported-technologies
GET  /api/ai/status
POST /api/ai/analyze-compatibility
```

### Python AI Service (Port 5000)
```
GET  /health
POST /api/ai/recommend-stack
GET  /api/ai/supported-technologies
```

The infrastructure is fully containerized and ready for deployment in any Docker-compatible environment.