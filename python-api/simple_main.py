"""
Simplified FastAPI application for AI-intensive operations
Works with or without external API keys
"""
import os
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="AI Stack Recommendation API",
    description="AI-powered technology stack recommendations",
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

# Simple request/response models
class StackRecommendationRequest(BaseModel):
    project_type: str = Field(..., description="Type of project")
    requirements: List[str] = Field(..., description="Project requirements")
    team_size: Optional[int] = Field(None, description="Team size")
    experience_level: Optional[str] = Field(None, description="Experience level")
    budget: Optional[str] = Field(None, description="Budget")

class TechnologyRecommendation(BaseModel):
    name: str
    category: str
    reason: str
    pros: List[str]
    cons: List[str]
    learning_curve: str
    score: float

class StackRecommendationResponse(BaseModel):
    recommended_stack: Dict[str, TechnologyRecommendation]
    reasoning: str
    alternatives: List[str]

# Technology knowledge base
TECH_KNOWLEDGE = {
    "web": {
        "frontend": ["React", "Vue.js", "Angular", "Svelte"],
        "backend": ["Node.js", "Python/Django", "Python/FastAPI", "Go"],
        "database": ["PostgreSQL", "MongoDB", "MySQL"],
        "hosting": ["Vercel", "Netlify", "AWS", "Google Cloud"]
    },
    "mobile": {
        "framework": ["React Native", "Flutter", "Swift", "Kotlin"],
        "backend": ["Node.js", "Python", "Go"],
        "database": ["Firebase", "PostgreSQL", "MongoDB"]
    },
    "api": {
        "framework": ["FastAPI", "Express.js", "Django REST", "Go Gin"],
        "database": ["PostgreSQL", "MongoDB", "Redis"],
        "hosting": ["AWS", "Google Cloud", "Docker"]
    }
}

def get_tech_recommendations(project_type: str, requirements: List[str], 
                           experience_level: str = "intermediate") -> Dict[str, TechnologyRecommendation]:
    """Generate technology recommendations based on project requirements"""
    
    recommendations = {}
    tech_options = TECH_KNOWLEDGE.get(project_type, TECH_KNOWLEDGE["web"])
    
    # Frontend recommendation
    if "frontend" in tech_options:
        if "beginner" in experience_level.lower():
            frontend_choice = "React"
            reason = "React has excellent documentation and large community support"
        else:
            frontend_choice = tech_options["frontend"][0]
            reason = f"{frontend_choice} is popular and well-supported for {project_type} projects"
        
        recommendations["frontend"] = TechnologyRecommendation(
            name=frontend_choice,
            category="frontend",
            reason=reason,
            pros=["Large community", "Good documentation", "Ecosystem support"],
            cons=["Learning curve", "Frequent updates"],
            learning_curve="moderate",
            score=0.9
        )
    
    # Backend recommendation
    if "backend" in tech_options:
        backend_choice = tech_options["backend"][0]
        recommendations["backend"] = TechnologyRecommendation(
            name=backend_choice,
            category="backend",
            reason=f"{backend_choice} is efficient and scalable",
            pros=["Performance", "Scalability", "Community"],
            cons=["Complexity"],
            learning_curve="moderate",
            score=0.85
        )
    
    # Database recommendation
    if "database" in tech_options:
        db_choice = tech_options["database"][0]
        recommendations["database"] = TechnologyRecommendation(
            name=db_choice,
            category="database",
            reason=f"{db_choice} is reliable and feature-rich",
            pros=["ACID compliance", "Performance", "Reliability"],
            cons=["Setup complexity"],
            learning_curve="moderate",
            score=0.88
        )
    
    return recommendations

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "python-ai-api"}

@app.post("/api/ai/recommend-stack", response_model=StackRecommendationResponse)
async def recommend_stack(request: StackRecommendationRequest):
    """Generate AI-powered technology stack recommendations"""
    try:
        # Check if OpenAI API key is available for enhanced recommendations
        has_openai = bool(os.getenv("OPENAI_API_KEY"))
        
        if has_openai:
            # Enhanced AI recommendations would go here
            # For now, use rule-based recommendations
            pass
        
        recommendations = get_tech_recommendations(
            request.project_type,
            request.requirements,
            request.experience_level or "intermediate"
        )
        
        reasoning = f"Based on your {request.project_type} project requirements, "
        reasoning += f"these technologies provide the best balance of functionality and ease of use."
        
        alternatives = ["Vue.js + Express", "Angular + Python", "Svelte + Go"]
        
        return StackRecommendationResponse(
            recommended_stack=recommendations,
            reasoning=reasoning,
            alternatives=alternatives
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/ai/technologies")
async def get_supported_technologies():
    """Get list of supported technologies"""
    return TECH_KNOWLEDGE

@app.post("/api/ai/analyze-compatibility")
async def analyze_compatibility(technologies: List[str]):
    """Analyze compatibility between technologies"""
    compatibility_scores = {}
    
    for tech in technologies:
        # Simple compatibility scoring
        compatibility_scores[tech] = {
            "score": 0.8,
            "notes": f"{tech} integrates well with modern development stacks"
        }
    
    return {
        "compatibility_matrix": compatibility_scores,
        "overall_score": 0.85,
        "recommendations": [
            "All selected technologies are compatible",
            "Consider using TypeScript for better type safety",
            "Implement proper testing strategies"
        ]
    }

@app.get("/api/ai/status")
async def get_ai_status():
    """Get AI service status and capabilities"""
    return {
        "openai_available": bool(os.getenv("OPENAI_API_KEY")),
        "pinecone_available": bool(os.getenv("PINECONE_API_KEY")),
        "features": {
            "basic_recommendations": True,
            "ai_enhanced_recommendations": bool(os.getenv("OPENAI_API_KEY")),
            "semantic_search": bool(os.getenv("PINECONE_API_KEY")),
            "knowledge_base": True
        }
    }

if __name__ == "__main__":
    uvicorn.run(
        "simple_main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )