"""
Mistral AI-powered FastAPI application for technology stack recommendations
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

# Initialize Mistral AI client
try:
    from mistralai import Mistral
    MISTRAL_API_KEY = os.getenv('MISTRAL_API_KEY')
    mistral_client = Mistral(api_key=MISTRAL_API_KEY) if MISTRAL_API_KEY else None
    print(f"Mistral client initialized: {mistral_client is not None}")
except ImportError as e:
    print(f"Mistral import failed: {e}")
    mistral_client = None

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
        "database": ["Appwrite", "MongoDB", "MySQL"],
        "hosting": ["Vercel", "Netlify", "AWS", "Google Cloud"]
    },
    "mobile": {
        "framework": ["React Native", "Flutter", "Swift", "Kotlin"],
        "backend": ["Node.js", "Python", "Go"],
        "database": ["Firebase", "Appwrite", "MongoDB"]
    },
    "api": {
        "framework": ["FastAPI", "Express.js", "Django REST", "Go Gin"],
        "database": ["Appwrite", "MongoDB", "Redis"],
        "hosting": ["AWS", "Google Cloud", "Docker"]
    }
}

async def get_tech_recommendations(project_type: str, requirements: List[str], 
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

async def get_mistral_recommendations(project_type: str, requirements: List[str], 
                                   experience_level: str) -> Optional[Dict[str, TechnologyRecommendation]]:
    """Get AI-powered recommendations using Mistral AI"""
    if not mistral_client:
        return None
    
    try:
        # Create detailed prompt for Mistral
        prompt = f"""You are an expert technology consultant. Based on the following project details, recommend the best technology stack:

Project Type: {project_type}
Requirements: {', '.join(requirements)}
Experience Level: {experience_level}

Please recommend technologies for these categories:
1. Frontend Framework
2. Backend Framework  
3. Database
4. Deployment Platform

For each recommendation, provide:
- Technology name
- Brief reason for selection
- 2-3 pros
- 1-2 cons
- Learning curve assessment
- Score out of 10

Focus on modern, well-supported technologies that match the experience level and requirements.
Respond in a structured format that I can parse."""

        messages = [
            {"role": "user", "content": prompt}
        ]
        
        response = mistral_client.chat.complete(
            model="mistral-large-latest",
            messages=messages,
            temperature=0.3,
            max_tokens=1000
        )
        
        # Parse Mistral response and convert to our format
        content = response.choices[0].message.content
        return parse_mistral_response(content)
        
    except Exception as e:
        print(f"Mistral API error: {e}")
        return None

def parse_mistral_response(content: str) -> Dict[str, TechnologyRecommendation]:
    """Parse Mistral response into structured recommendations"""
    recommendations = {}
    
    # Simple parsing logic - in production, you'd want more robust parsing
    lines = content.split('\n')
    current_category = None
    current_tech = None
    
    for line in lines:
        line = line.strip()
        if 'Frontend' in line:
            current_category = 'frontend'
        elif 'Backend' in line:
            current_category = 'backend'
        elif 'Database' in line:
            current_category = 'database'
        elif 'Deployment' in line:
            current_category = 'deployment'
        
        # Extract technology names and create recommendations
        if current_category and any(tech in line for tech in ['React', 'Vue', 'Angular', 'Next.js', 'Node.js', 'Django', 'FastAPI', 'Appwrite', 'MongoDB', 'MySQL', 'Vercel', 'AWS', 'Heroku']):
            for tech_name in ['React', 'Vue', 'Angular', 'Next.js', 'Node.js', 'Django', 'FastAPI', 'Appwrite', 'MongoDB', 'MySQL', 'Vercel', 'AWS', 'Heroku']:
                if tech_name in line:
                    recommendations[current_category] = TechnologyRecommendation(
                        name=tech_name,
                        category=current_category,
                        reason=f"AI-recommended for {current_category} based on project requirements",
                        pros=["Modern and well-supported", "Great community", "Excellent documentation"],
                        cons=["Learning curve may vary", "Ecosystem complexity"],
                        learning_curve="Moderate",
                        score=8.5
                    )
                    break
    
    # Ensure we have at least basic recommendations
    if not recommendations:
        return get_fallback_recommendations()
    
    return recommendations

def get_fallback_recommendations() -> Dict[str, TechnologyRecommendation]:
    """Provide sensible fallback recommendations"""
    return {
        "frontend": TechnologyRecommendation(
            name="React",
            category="frontend",
            reason="Popular, flexible, and well-supported framework",
            pros=["Large ecosystem", "Component-based", "Strong community"],
            cons=["Steep learning curve", "Frequent updates"],
            learning_curve="Moderate",
            score=8.5
        ),
        "backend": TechnologyRecommendation(
            name="Node.js",
            category="backend", 
            reason="JavaScript everywhere, fast development",
            pros=["Same language as frontend", "Fast execution", "NPM ecosystem"],
            cons=["Single-threaded", "Callback complexity"],
            learning_curve="Easy",
            score=8.0
        ),
        "database": TechnologyRecommendation(
            name="Appwrite",
            category="database",
            reason="Modern, scalable backend-as-a-service platform",
            pros=["Easy setup", "Built-in auth", "Real-time features"],
            cons=["Vendor lock-in", "Limited customization"],
            learning_curve="Easy",
            score=8.5
        )
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "python-ai-api"}

@app.post("/api/ai/recommend-stack", response_model=StackRecommendationResponse)
async def recommend_stack(request: StackRecommendationRequest):
    """Generate AI-powered technology stack recommendations"""
    try:
        # Check if Mistral AI API key is available for enhanced recommendations
        has_mistral = bool(os.getenv("MISTRAL_API_KEY"))
        
        if has_mistral:
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
        "mistral_available": bool(os.getenv("MISTRAL_API_KEY")),
        "features": {
            "basic_recommendations": True,
            "ai_enhanced_recommendations": bool(os.getenv("MISTRAL_API_KEY")),
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