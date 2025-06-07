"""
Request models for the AI API
"""
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class StackRecommendationRequest(BaseModel):
    """Request model for stack recommendation"""
    project_type: str = Field(..., description="Type of project (web, mobile, api, etc.)")
    requirements: List[str] = Field(..., description="Project requirements")
    team_size: Optional[int] = Field(None, description="Team size")
    experience_level: Optional[str] = Field(None, description="Team experience level")
    budget: Optional[str] = Field(None, description="Budget constraints")
    timeline: Optional[str] = Field(None, description="Project timeline")
    preferred_languages: Optional[List[str]] = Field(None, description="Preferred programming languages")
    constraints: Optional[List[str]] = Field(None, description="Technical constraints")


class TechnologyAnalysisRequest(BaseModel):
    """Request model for technology analysis"""
    technology_name: str = Field(..., description="Name of the technology to analyze")
    context: Optional[str] = Field(None, description="Context for the analysis")
    comparison_with: Optional[List[str]] = Field(None, description="Technologies to compare with")


class DocumentIndexRequest(BaseModel):
    """Request model for document indexing"""
    documents: List[Dict[str, Any]] = Field(..., description="Documents to index")
    namespace: Optional[str] = Field(None, description="Pinecone namespace")


class SearchRequest(BaseModel):
    """Request model for semantic search"""
    query: str = Field(..., description="Search query")
    limit: Optional[int] = Field(10, description="Number of results to return")
    namespace: Optional[str] = Field(None, description="Pinecone namespace to search")
    filters: Optional[Dict[str, Any]] = Field(None, description="Search filters")