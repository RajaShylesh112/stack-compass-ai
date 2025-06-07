# AI Stack Recommendation API

A Python-based AI service for technology stack recommendations using Langchain and Pinecone, integrated with the main Hono backend.

## Features

- **AI-Powered Stack Recommendations**: Generate technology stack recommendations based on project requirements
- **Technology Analysis**: Analyze specific technologies and provide detailed insights
- **Compatibility Analysis**: Evaluate compatibility between different technologies
- **Vector Search**: Semantic search capabilities using Pinecone (when configured)
- **Flexible Configuration**: Works with or without external API keys

## Architecture

The Python API runs on port 8000 and is integrated with the main Hono backend on port 5000 through proxy endpoints.

```
Frontend (React) → Hono Backend (Port 5000) → Python AI API (Port 8000)
                ↓
            Appwrite Database
```

## API Endpoints

### Main Integration (via Hono backend)
- `POST /api/ai/recommend-stack` - Get AI-powered stack recommendations
- `GET /api/ai/technologies` - List supported technologies
- `POST /api/ai/analyze-compatibility` - Analyze technology compatibility
- `GET /api/ai/status` - Check AI service status

### Direct Python API
- `POST /api/ai/recommend-stack` - Stack recommendations
- `GET /api/ai/technologies` - Technology catalog
- `POST /api/ai/analyze-compatibility` - Compatibility analysis
- `GET /api/ai/status` - Service capabilities
- `GET /health` - Health check

## Installation

The Python dependencies are already installed via the package manager:

```bash
# Dependencies included:
# - fastapi
# - uvicorn
# - langchain
# - langchain-openai
# - pinecone-client
# - pydantic
# - python-dotenv
```

## Configuration

Create a `.env` file in the `python-api` directory with the following variables:

```env
# Optional: Enhanced AI features
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Vector search capabilities  
PINECONE_API_KEY=your_pinecone_api_key_here

# API Configuration
DEBUG=False
API_HOST=0.0.0.0
API_PORT=8000
```

## Running the Service

### Standalone Mode
```bash
cd python-api
python simple_main.py
```

### With Startup Script
```bash
cd python-api
python start_ai_service.py
```

### Integration with Main App
The Python AI service is automatically integrated with the main Hono backend. When you run the main application, you can access AI features through the unified API.

## API Usage Examples

### Stack Recommendation
```bash
curl -X POST http://localhost:5000/api/ai/recommend-stack \
  -H "Content-Type: application/json" \
  -d '{
    "project_type": "web",
    "requirements": ["responsive design", "real-time features"],
    "team_size": 3,
    "experience_level": "intermediate"
  }'
```

### Technology Compatibility
```bash
curl -X POST http://localhost:5000/api/ai/analyze-compatibility \
  -H "Content-Type: application/json" \
  -d '["React", "Node.js", "PostgreSQL"]'
```

### Check AI Status
```bash
curl http://localhost:5000/api/ai/status
```

## Technology Knowledge Base

The service includes a built-in knowledge base covering:

- **Web Development**: React, Vue.js, Angular, Svelte
- **Backend**: Node.js, Python, Go, Java
- **Databases**: PostgreSQL, MongoDB, MySQL, Redis
- **Mobile**: React Native, Flutter, Swift, Kotlin
- **Cloud**: AWS, Google Cloud, Azure, Vercel

## Enhanced Features (with API Keys)

When configured with external API keys, the service provides:

- **OpenAI Integration**: Advanced AI-powered recommendations using GPT-4
- **Pinecone Vector Search**: Semantic search through technology documentation
- **Enhanced Analysis**: Detailed technology comparisons and insights

## Error Handling

The service gracefully handles missing API keys and provides fallback functionality:

- Without OpenAI: Uses rule-based recommendations
- Without Pinecone: Provides basic technology information
- Service availability is reported through the status endpoint

## Development

### Project Structure
```
python-api/
├── simple_main.py          # Main FastAPI application
├── main.py                 # Full-featured app (with external APIs)
├── models/                 # Pydantic models
│   ├── requests.py
│   └── responses.py
├── services/               # Business logic
│   ├── ai_service.py
│   └── vector_service.py
├── config/                 # Configuration
│   └── settings.py
└── README.md
```

### Adding New Features

1. Define request/response models in `models/`
2. Implement business logic in `services/`
3. Add endpoints to `simple_main.py`
4. Update the Hono backend proxy in `server/routes.ts`

## Monitoring

Check service health and capabilities:
- AI Service: `GET /api/ai/status`
- Health Check: `GET /health`
- Hono Integration: `GET /api/health`

## Production Considerations

- Configure proper logging
- Set up monitoring and alerting
- Use environment-specific configurations
- Consider rate limiting for AI endpoints
- Implement caching for frequently requested data