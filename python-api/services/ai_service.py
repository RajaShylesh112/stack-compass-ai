"""
AI Service using Langchain for technology stack recommendations
"""
import os
from typing import List, Dict, Any
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, SystemMessage
from langchain_core.output_parsers import JsonOutputParser

from ..models.requests import StackRecommendationRequest, TechnologyAnalysisRequest
from ..models.responses import (
    StackRecommendationResponse, 
    TechnologyAnalysisResponse,
    TechnologyRecommendation
)


class AIService:
    """Service for AI-powered technology recommendations"""
    
    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4",
            temperature=0.3,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        self.json_parser = JsonOutputParser()
    
    async def generate_stack_recommendations(self, request: StackRecommendationRequest) -> StackRecommendationResponse:
        """Generate technology stack recommendations based on project requirements"""
        
        system_prompt = """You are an expert technology consultant with deep knowledge of modern development stacks.
        Analyze the project requirements and provide detailed technology recommendations.
        
        Consider these factors:
        - Project type and requirements
        - Team experience level
        - Budget constraints
        - Timeline
        - Scalability needs
        - Maintenance complexity
        - Community support
        - Learning curve
        
        Return a JSON response with the following structure:
        {
            "recommended_stack": {
                "frontend": {
                    "name": "technology_name",
                    "category": "frontend",
                    "reason": "detailed reasoning",
                    "pros": ["advantage1", "advantage2"],
                    "cons": ["disadvantage1", "disadvantage2"],
                    "learning_curve": "easy|moderate|steep",
                    "popularity_score": 0.0-1.0,
                    "compatibility_score": 0.0-1.0
                },
                "backend": {...},
                "database": {...},
                "hosting": {...}
            },
            "overall_score": 0.0-1.0,
            "reasoning": "overall explanation",
            "alternatives": [{"frontend": {...}, "backend": {...}}],
            "estimated_learning_time": "time estimate",
            "estimated_development_time": "time estimate",
            "total_cost_estimate": "cost estimate or null"
        }"""
        
        human_prompt = f"""
        Project Requirements:
        - Type: {request.project_type}
        - Requirements: {', '.join(request.requirements)}
        - Team Size: {request.team_size or 'Not specified'}
        - Experience Level: {request.experience_level or 'Not specified'}
        - Budget: {request.budget or 'Not specified'}
        - Timeline: {request.timeline or 'Not specified'}
        - Preferred Languages: {', '.join(request.preferred_languages) if request.preferred_languages else 'None specified'}
        - Constraints: {', '.join(request.constraints) if request.constraints else 'None specified'}
        
        Please provide detailed technology stack recommendations.
        """
        
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=human_prompt)
        ]
        
        response = await self.llm.ainvoke(messages)
        parsed_response = self.json_parser.parse(response.content)
        
        # Convert to Pydantic models
        recommended_stack = {}
        for category, tech_data in parsed_response["recommended_stack"].items():
            recommended_stack[category] = TechnologyRecommendation(**tech_data)
        
        alternatives = []
        for alt_stack in parsed_response.get("alternatives", []):
            alt_converted = {}
            for category, tech_data in alt_stack.items():
                alt_converted[category] = TechnologyRecommendation(**tech_data)
            alternatives.append(alt_converted)
        
        return StackRecommendationResponse(
            recommended_stack=recommended_stack,
            overall_score=parsed_response["overall_score"],
            reasoning=parsed_response["reasoning"],
            alternatives=alternatives,
            estimated_learning_time=parsed_response["estimated_learning_time"],
            estimated_development_time=parsed_response["estimated_development_time"],
            total_cost_estimate=parsed_response.get("total_cost_estimate")
        )
    
    async def analyze_technology(self, request: TechnologyAnalysisRequest) -> TechnologyAnalysisResponse:
        """Analyze a specific technology and provide detailed insights"""
        
        system_prompt = """You are a technology expert providing detailed analysis of software technologies.
        Provide comprehensive insights including pros, cons, use cases, learning resources, and market trends.
        
        Return a JSON response with this structure:
        {
            "technology_name": "name",
            "overview": "detailed overview",
            "pros": ["advantage1", "advantage2"],
            "cons": ["disadvantage1", "disadvantage2"],
            "use_cases": ["use_case1", "use_case2"],
            "learning_resources": [{"title": "resource", "url": "link", "type": "documentation|tutorial|course"}],
            "market_trends": {
                "popularity_trend": "increasing|stable|decreasing",
                "job_market": "high|medium|low",
                "community_size": "large|medium|small",
                "github_stars": "approximate number",
                "npm_downloads": "weekly downloads if applicable"
            },
            "comparison": {...},
            "recommendation_score": 0.0-1.0
        }"""
        
        human_prompt = f"""
        Technology to analyze: {request.technology_name}
        Context: {request.context or 'General analysis'}
        Compare with: {', '.join(request.comparison_with) if request.comparison_with else 'None'}
        
        Provide a comprehensive analysis.
        """
        
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=human_prompt)
        ]
        
        response = await self.llm.ainvoke(messages)
        parsed_response = self.json_parser.parse(response.content)
        
        return TechnologyAnalysisResponse(**parsed_response)
    
    async def generate_compatibility_matrix(self, technologies: List[str]) -> Dict[str, Any]:
        """Generate compatibility matrix for multiple technologies"""
        
        system_prompt = """Analyze the compatibility between the given technologies.
        Consider integration complexity, ecosystem overlap, and common usage patterns.
        
        Return a JSON response with compatibility scores and explanations."""
        
        human_prompt = f"Analyze compatibility between: {', '.join(technologies)}"
        
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=human_prompt)
        ]
        
        response = await self.llm.ainvoke(messages)
        return self.json_parser.parse(response.content)