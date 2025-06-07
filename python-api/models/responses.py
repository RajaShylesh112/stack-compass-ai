"""
Response models for the AI API
"""
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class TechnologyRecommendation(BaseModel):
    """Single technology recommendation"""
    name: str
    category: str
    reason: str
    pros: List[str]
    cons: List[str]
    learning_curve: str
    popularity_score: float
    compatibility_score: float


class StackRecommendationResponse(BaseModel):
    """Response model for stack recommendations"""
    recommended_stack: Dict[str, TechnologyRecommendation]
    overall_score: float
    reasoning: str
    alternatives: List[Dict[str, TechnologyRecommendation]]
    estimated_learning_time: str
    estimated_development_time: str
    total_cost_estimate: Optional[str]


class TechnologyAnalysisResponse(BaseModel):
    """Response model for technology analysis"""
    technology_name: str
    overview: str
    pros: List[str]
    cons: List[str]
    use_cases: List[str]
    learning_resources: List[Dict[str, str]]
    market_trends: Dict[str, Any]
    comparison: Optional[Dict[str, Any]]
    recommendation_score: float


class SearchResult(BaseModel):
    """Single search result"""
    id: str
    content: str
    metadata: Dict[str, Any]
    score: float


class SearchResponse(BaseModel):
    """Response model for search results"""
    results: List[SearchResult]
    total_count: int = Field(default_factory=lambda: 0)