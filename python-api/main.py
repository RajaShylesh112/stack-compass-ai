"""
FastAPI application for AI-intensive operations using Langchain and Pinecone
"""
import os
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from dotenv import load_dotenv

from services.ai_service import AIService
from services.vector_service import VectorService
from models.requests import (
    StackRecommendationRequest,
    TechnologyAnalysisRequest,
    DocumentIndexRequest,
    SearchRequest
)
from models.responses import (
    StackRecommendationResponse,
    TechnologyAnalysisResponse,
    SearchResponse
)

# Load environment variables
load_dotenv()

app = FastAPI(
    title="AI Stack Recommendation API",
    description="AI-powered technology stack recommendations using Langchain and Pinecone",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
ai_service = AIService()
vector_service = VectorService()


@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    await vector_service.initialize()


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "ai-api"}


@app.post("/api/ai/recommend-stack", response_model=StackRecommendationResponse)
async def recommend_stack(request: StackRecommendationRequest):
    """
    Generate AI-powered technology stack recommendations
    """
    try:
        recommendations = await ai_service.generate_stack_recommendations(request)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/ai/analyze-technology", response_model=TechnologyAnalysisResponse)
async def analyze_technology(request: TechnologyAnalysisRequest):
    """
    Analyze a specific technology and provide detailed insights
    """
    try:
        analysis = await ai_service.analyze_technology(request)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/ai/index-documents")
async def index_documents(request: DocumentIndexRequest):
    """
    Index documents into Pinecone vector database
    """
    try:
        result = await vector_service.index_documents(request.documents)
        return {"status": "success", "indexed_count": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/ai/search", response_model=SearchResponse)
async def semantic_search(request: SearchRequest):
    """
    Perform semantic search using Pinecone
    """
    try:
        results = await vector_service.search(request.query, request.limit or 10)
        return SearchResponse(results=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/ai/technologies")
async def get_supported_technologies():
    """
    Get list of supported technologies
    """
    return {
        "frontend": ["React", "Vue.js", "Angular", "Svelte", "Next.js", "Nuxt.js"],
        "backend": ["Node.js", "Python", "Java", "Go", "Rust", "C#", "PHP"],
        "databases": ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch"],
        "cloud": ["AWS", "Google Cloud", "Azure", "Vercel", "Netlify"],
        "mobile": ["React Native", "Flutter", "Swift", "Kotlin"]
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )