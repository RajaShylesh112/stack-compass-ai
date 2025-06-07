# Stack Builder - Docker Deployment

A full-stack application with AI-powered technology stack recommendations, deployed across multiple Docker containers.

## Architecture

- **Frontend**: React/Vite on port 3000
- **Backend**: Node.js/Hono on port 4000  
- **Python API**: FastAPI on port 5000
- **Database**: PostgreSQL on port 5432
- **Proxy**: Nginx on port 80 (optional)

## Quick Start

1. **Clone and setup environment**:
   ```bash
   cp .env.docker .env
   # Edit .env with your API keys
   ```

2. **Deploy with Docker**:
   ```bash
   ./deploy.sh
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000/api/health
   - Python API: http://localhost:5000/health

## Environment Variables

### Required for AI Features
```env
OPENAI_API_KEY=your_openai_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
```

### Database Configuration
```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/stackbuilder
```

### Service URLs (Docker)
```env
PYTHON_API_URL=http://python-api:5000
BACKEND_API_URL=http://backend:4000
```

## Manual Docker Commands

### Build and start all services:
```bash
docker-compose up -d --build
```

### View logs:
```bash
docker-compose logs -f
```

### Stop services:
```bash
docker-compose down
```

### Individual service commands:
```bash
# Backend only
docker-compose up backend -d

# Python API only  
docker-compose up python-api -d

# Frontend only
docker-compose up frontend -d
```

## Service Health Checks

- **Frontend**: GET http://localhost:3000/health
- **Backend**: GET http://localhost:4000/api/health  
- **Python API**: GET http://localhost:5000/health
- **Database**: `docker-compose exec postgres pg_isready -U postgres`

## Production Deployment

For production, update the following:

1. **Security**: Change default passwords and add proper secrets
2. **SSL**: Configure HTTPS with certificates
3. **Monitoring**: Add health checks and logging
4. **Scaling**: Use Docker Swarm or Kubernetes
5. **Persistence**: Configure proper volume mounts

## API Endpoints

### Backend (Port 4000)
- `GET /api/health` - Health check
- `POST /api/ai/recommend-stack` - AI stack recommendations
- `GET /api/ai/supported-technologies` - Available technologies
- `GET /api/ai/status` - AI service status

### Python API (Port 5000)  
- `GET /health` - Health check
- `POST /api/ai/recommend-stack` - Direct AI recommendations
- `GET /api/ai/supported-technologies` - Technology database

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 4000, 5000, 5432 are available
2. **API keys**: Verify OPENAI_API_KEY and PINECONE_API_KEY in .env
3. **Docker permissions**: Run with sudo if needed
4. **Memory**: Ensure sufficient Docker memory allocation

### Check service status:
```bash
docker-compose ps
docker-compose logs [service-name]
```

### Reset deployment:
```bash
docker-compose down -v
docker-compose up -d --build
```