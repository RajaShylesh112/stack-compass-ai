# AI Stack Recommender - Next.js + Mistral AI

A modern AI-powered technology stack recommendation platform built with Next.js and Mistral AI.

## Features

- **Next.js Frontend**: Modern React framework with App Router
- **Mistral AI Integration**: Intelligent technology recommendations
- **Express Backend**: RESTful API with TypeScript
- **Python AI Service**: FastAPI service for AI processing
- **Responsive Design**: Tailwind CSS with shadcn/ui components
- **Real-time Recommendations**: Interactive forms with instant AI analysis

## Tech Stack

### Frontend
- Next.js 14 with App Router
- React 18 with TypeScript
- Tailwind CSS for styling
- shadcn/ui component library
- TanStack Query for state management
- Lucide React for icons

### Backend
- Express.js with TypeScript
- Python FastAPI for AI services
- Mistral AI for recommendations
- PostgreSQL database (optional)
- Appwrite for authentication (optional)

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Mistral AI API key (optional but recommended)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Mistral AI API Key (for enhanced recommendations)
MISTRAL_API_KEY=your_mistral_api_key_here

# Optional: Database Configuration
DATABASE_URL=your_database_url

# Optional: Appwrite Configuration
APPWRITE_ENDPOINT=your_appwrite_endpoint
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=your_database_id
```

### Required API Keys and Secrets

To enable the full AI-powered functionality, you'll need:

1. **MISTRAL_API_KEY** - Get from [Mistral AI Console](https://console.mistral.ai/)
   - Used for intelligent technology stack recommendations
   - Without this key, the app will use basic fallback recommendations

2. **Optional: Database credentials** - For user data persistence
3. **Optional: Appwrite credentials** - For user authentication

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ai-stack-recommender
```

2. Install dependencies
```bash
npm install
```

3. Install Python dependencies
```bash
cd python-api
pip install -r requirements.txt
# or
uv sync
```

4. Start the development servers
```bash
npm run dev
```

This will start:
- Next.js frontend on http://localhost:3000
- Express backend on http://localhost:5000
- Python AI service on http://localhost:8000

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── ai-recommendations/ # AI recommendations page
│   ├── stack-builder/     # Manual stack builder
│   └── compare-stacks/    # Stack comparison (coming soon)
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx        # Navigation header
│   └── Footer.tsx        # Footer component
├── lib/                  # Utility functions
├── server/               # Express.js backend
│   ├── index.ts          # Main server file
│   ├── routes.ts         # API routes
│   └── ai-integration.ts # AI service integration
├── python-api/           # Python FastAPI service
│   ├── simple_main.py    # Main FastAPI app with Mistral AI
│   └── requirements.txt  # Python dependencies
└── shared/               # Shared types and utilities
```

## API Endpoints

### Frontend Routes
- `/` - Home page with quick start
- `/ai-recommendations` - AI-powered recommendations
- `/stack-builder` - Manual stack builder
- `/compare-stacks` - Stack comparison

### Backend API
- `GET /api/health` - Health check
- `POST /api/ai/recommend-stack` - Get AI recommendations
- `GET /api/ai/supported-technologies` - List available technologies
- `POST /api/ai/analyze-compatibility` - Analyze tech compatibility
- `GET /api/ai/status` - AI service status

## How It Works

1. **User Input**: Users provide project details through interactive forms
2. **AI Processing**: Mistral AI analyzes requirements and generates recommendations
3. **Smart Recommendations**: The system provides detailed technology suggestions with pros/cons
4. **Fallback System**: If Mistral AI is unavailable, the app uses intelligent fallback logic

## Deployment

### Using Replit Deployments

1. Configure environment variables in Replit Secrets
2. The app will automatically build and deploy
3. Frontend will be available on port 3000
4. Backend API on port 5000

### Manual Deployment

1. Build the frontend:
```bash
npm run next:build
```

2. Build the backend:
```bash
npm run build
```

3. Start production servers:
```bash
npm start  # Backend
npm run next:start  # Frontend
```

## Features Overview

### Quick Start Recommendations
- Interactive project type selection
- Team size and timeline considerations
- One-click AI recommendations

### Advanced Stack Builder
- Manual technology selection
- Category-based organization
- Compatibility analysis

### AI-Powered Insights
- Mistral AI integration for intelligent recommendations
- Technology pros/cons analysis
- Learning curve assessments
- Project-specific suggestions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details