# AI Stack Recommendation API

A Python-based AI service for technology stack recommendations using Mistral AI, integrated with the main Next.js backend.

## Features

- **AI-Powered Stack Recommendations**: Generate technology stack recommendations based on project requirements using Mistral AI
- **Technology Analysis**: Analyze specific technologies and provide detailed insights
- **Compatibility Analysis**: Evaluate compatibility between different technologies
- **Flexible Configuration**: Works with or without external API keys

## Architecture

The Python API runs on port 8000 and is integrated with the main Next.js backend on port 3000 through API routes.

```
Next.js Frontend (Port 3000) → Next.js API Routes → Python AI API (Port 8000)
                                                    ↓
                                                Appwrite Database
```

## API Endpoints

### Main Integration (via Next.js API routes)
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
# - mistralai
# - pydantic
# - python-dotenv
```

## Configuration

Create a `.env` file in the `python-api` directory with the following variables:

```env
# Required: Mistral AI for enhanced recommendations
MISTRAL_API_KEY=your_mistral_api_key_here

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

### Integration with Main App
The Python AI service is automatically integrated with the main Next.js backend. When you run the main application, you can access AI features through the unified API.

## API Usage Examples

### Stack Recommendation
```bash
curl -X POST http://localhost:3000/api/ai/recommend-stack \
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
curl -X POST http://localhost:3000/api/ai/analyze-compatibility \
  -H "Content-Type: application/json" \
  -d '["React", "Node.js", "MongoDB"]'
```

### Check AI Status
```bash
curl http://localhost:3000/api/ai/status
```

## Technology Knowledge Base

The service includes a built-in knowledge base covering:

- **Web Development**: React, Vue.js, Angular, Svelte
- **Backend**: Node.js, Python, Go, Java
- **Databases**: MongoDB, MySQL, Redis, Appwrite
- **Mobile**: React Native, Flutter, Swift, Kotlin
- **Cloud**: AWS, Google Cloud, Azure, Vercel

## Enhanced Features (with Mistral AI)

When configured with Mistral AI API key, the service provides:

- **Mistral AI Integration**: Advanced AI-powered recommendations using Mistral models
- **Intelligent Analysis**: Detailed technology comparisons and insights
- **Context-Aware Recommendations**: Project-specific technology suggestions

## Error Handling

The service gracefully handles missing API keys and provides fallback functionality:

- Without Mistral AI: Uses rule-based recommendations
- Service availability is reported through the status endpoint

## Development

### Project Structure
```
python-api/
├── simple_main.py          # Main FastAPI application with Mistral AI
├── models/                 # Pydantic models
│   ├── requests.py
│   └── responses.py
├── services/               # Business logic
│   └── ai_service.py
├── config/                 # Configuration
│   └── settings.py
└── README.md
```

### Adding New Features

1. Define request/response models in `models/`
2. Implement business logic in `services/`
3. Add endpoints to `simple_main.py`
4. Update the Next.js API routes in `app/api/`

## Monitoring

Check service health and capabilities:
- AI Service: `GET /api/ai/status`
- Health Check: `GET /health`
- Next.js Integration: `GET /api/health`

## Production Considerations

- Configure proper logging
- Set up monitoring and alerting
- Use environment-specific configurations
- Consider rate limiting for AI endpoints
- Implement caching for frequently requested data