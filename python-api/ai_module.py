"""
AI module for technology stack recommendations
Embedded directly in the Hono backend for better integration
"""
import json
from typing import Dict, List, Any, Optional

class AIStackRecommendation:
    """AI-powered technology stack recommendation engine"""
    
    def __init__(self):
        self.tech_database = {
            "frontend": {
                "React": {
                    "pros": ["Large ecosystem", "Component reusability", "Strong community"],
                    "cons": ["Steep learning curve", "Frequent updates"],
                    "learning_curve": "moderate",
                    "popularity": 0.95,
                    "compatibility": 0.9,
                    "best_for": ["web apps", "SPAs", "enterprise"]
                },
                "Vue.js": {
                    "pros": ["Easy to learn", "Great documentation", "Progressive framework"],
                    "cons": ["Smaller ecosystem", "Less job market"],
                    "learning_curve": "easy",
                    "popularity": 0.8,
                    "compatibility": 0.85,
                    "best_for": ["small to medium apps", "rapid prototyping"]
                },
                "Angular": {
                    "pros": ["Full framework", "TypeScript built-in", "Enterprise ready"],
                    "cons": ["Complex", "Heavy", "Steep learning curve"],
                    "learning_curve": "steep",
                    "popularity": 0.7,
                    "compatibility": 0.8,
                    "best_for": ["enterprise apps", "large teams"]
                },
                "Svelte": {
                    "pros": ["No runtime", "Small bundle size", "Simple syntax"],
                    "cons": ["Smaller community", "Fewer resources"],
                    "learning_curve": "easy",
                    "popularity": 0.6,
                    "compatibility": 0.75,
                    "best_for": ["performance-critical apps", "small bundles"]
                }
            },
            "backend": {
                "Node.js": {
                    "pros": ["JavaScript everywhere", "Fast development", "Large ecosystem"],
                    "cons": ["Single-threaded", "Callback complexity"],
                    "learning_curve": "moderate",
                    "popularity": 0.9,
                    "compatibility": 0.95,
                    "best_for": ["APIs", "real-time apps", "microservices"]
                },
                "Python": {
                    "pros": ["Easy syntax", "AI/ML libraries", "Versatile"],
                    "cons": ["Performance", "GIL limitations"],
                    "learning_curve": "easy",
                    "popularity": 0.85,
                    "compatibility": 0.8,
                    "best_for": ["APIs", "data processing", "AI/ML"]
                },
                "Go": {
                    "pros": ["Fast execution", "Simple deployment", "Great concurrency"],
                    "cons": ["Verbose", "Limited generics"],
                    "learning_curve": "moderate",
                    "popularity": 0.7,
                    "compatibility": 0.75,
                    "best_for": ["microservices", "system programming", "APIs"]
                }
            },
            "database": {
                "PostgreSQL": {
                    "pros": ["ACID compliance", "Advanced features", "Reliable"],
                    "cons": ["Complex setup", "Resource intensive"],
                    "learning_curve": "moderate",
                    "popularity": 0.85,
                    "compatibility": 0.9,
                    "best_for": ["complex queries", "enterprise apps"]
                },
                "MongoDB": {
                    "pros": ["Schema flexibility", "Easy scaling", "JSON-like"],
                    "cons": ["Consistency issues", "Memory usage"],
                    "learning_curve": "easy",
                    "popularity": 0.8,
                    "compatibility": 0.8,
                    "best_for": ["rapid development", "document storage"]
                },
                "Redis": {
                    "pros": ["In-memory speed", "Data structures", "Caching"],
                    "cons": ["Memory limits", "Persistence complexity"],
                    "learning_curve": "easy",
                    "popularity": 0.75,
                    "compatibility": 0.85,
                    "best_for": ["caching", "sessions", "real-time"]
                }
            }
        }
    
    def recommend_stack(self, project_type: str, requirements: List[str], 
                       team_size: int = 3, experience_level: str = "intermediate") -> Dict[str, Any]:
        """Generate technology stack recommendations"""
        
        recommendations = {}
        
        # Frontend recommendation
        if project_type in ["web", "fullstack"]:
            frontend_tech = self._select_frontend(requirements, experience_level)
            recommendations["frontend"] = self._format_recommendation(
                frontend_tech, "frontend", self.tech_database["frontend"][frontend_tech]
            )
        
        # Backend recommendation
        backend_tech = self._select_backend(requirements, experience_level, project_type)
        recommendations["backend"] = self._format_recommendation(
            backend_tech, "backend", self.tech_database["backend"][backend_tech]
        )
        
        # Database recommendation
        database_tech = self._select_database(requirements, project_type)
        recommendations["database"] = self._format_recommendation(
            database_tech, "database", self.tech_database["database"][database_tech]
        )
        
        # Calculate overall score
        overall_score = sum(rec["compatibility_score"] for rec in recommendations.values()) / len(recommendations)
        
        return {
            "recommended_stack": recommendations,
            "overall_score": overall_score,
            "reasoning": self._generate_reasoning(recommendations, project_type, requirements),
            "alternatives": self._get_alternatives(recommendations),
            "estimated_learning_time": self._estimate_learning_time(recommendations, experience_level),
            "estimated_development_time": self._estimate_dev_time(project_type, team_size)
        }
    
    def _select_frontend(self, requirements: List[str], experience_level: str) -> str:
        """Select best frontend technology"""
        if "beginner" in experience_level.lower():
            return "Vue.js"
        elif "enterprise" in " ".join(requirements).lower():
            return "Angular"
        elif "performance" in " ".join(requirements).lower():
            return "Svelte"
        else:
            return "React"
    
    def _select_backend(self, requirements: List[str], experience_level: str, project_type: str) -> str:
        """Select best backend technology"""
        req_text = " ".join(requirements).lower()
        
        if "ai" in req_text or "machine learning" in req_text:
            return "Python"
        elif "performance" in req_text or "microservices" in req_text:
            return "Go"
        else:
            return "Node.js"
    
    def _select_database(self, requirements: List[str], project_type: str) -> str:
        """Select best database technology"""
        req_text = " ".join(requirements).lower()
        
        if "real-time" in req_text or "cache" in req_text:
            return "Redis"
        elif "flexible" in req_text or "rapid" in req_text:
            return "MongoDB"
        else:
            return "PostgreSQL"
    
    def _format_recommendation(self, tech_name: str, category: str, tech_data: Dict) -> Dict[str, Any]:
        """Format technology recommendation"""
        return {
            "name": tech_name,
            "category": category,
            "reason": f"Selected for {', '.join(tech_data['best_for'])}",
            "pros": tech_data["pros"],
            "cons": tech_data["cons"],
            "learning_curve": tech_data["learning_curve"],
            "popularity_score": tech_data["popularity"],
            "compatibility_score": tech_data["compatibility"]
        }
    
    def _generate_reasoning(self, recommendations: Dict, project_type: str, requirements: List[str]) -> str:
        """Generate overall reasoning for recommendations"""
        tech_names = [rec["name"] for rec in recommendations.values()]
        return f"This stack ({', '.join(tech_names)}) provides an excellent balance for {project_type} projects with requirements like {', '.join(requirements[:3])}. The combination offers good performance, maintainability, and community support."
    
    def _get_alternatives(self, recommendations: Dict) -> List[str]:
        """Get alternative stack suggestions"""
        return [
            "Vue.js + Express.js + MongoDB",
            "Angular + Python/Django + PostgreSQL", 
            "Svelte + Go + Redis"
        ]
    
    def _estimate_learning_time(self, recommendations: Dict, experience_level: str) -> str:
        """Estimate learning time for the stack"""
        difficulty_levels = [rec["learning_curve"] for rec in recommendations.values()]
        
        if "beginner" in experience_level.lower():
            if "steep" in difficulty_levels:
                return "3-6 months"
            elif "moderate" in difficulty_levels:
                return "2-4 months"
            else:
                return "1-2 months"
        else:
            if "steep" in difficulty_levels:
                return "1-3 months"
            elif "moderate" in difficulty_levels:
                return "2-6 weeks"
            else:
                return "1-4 weeks"
    
    def _estimate_dev_time(self, project_type: str, team_size: int) -> str:
        """Estimate development time"""
        base_weeks = {"web": 8, "mobile": 12, "api": 4, "fullstack": 16}.get(project_type, 8)
        adjusted_weeks = max(2, base_weeks // max(1, team_size // 2))
        return f"{adjusted_weeks}-{adjusted_weeks + 4} weeks"
    
    def analyze_compatibility(self, technologies: List[str]) -> Dict[str, Any]:
        """Analyze compatibility between technologies"""
        compatibility_scores = {}
        
        for tech in technologies:
            # Find technology in database
            tech_data = None
            for category in self.tech_database.values():
                if tech in category:
                    tech_data = category[tech]
                    break
            
            if tech_data:
                compatibility_scores[tech] = {
                    "score": tech_data.get("compatibility", 0.8),
                    "notes": f"{tech} integrates well with modern development stacks",
                    "category": self._get_tech_category(tech)
                }
            else:
                compatibility_scores[tech] = {
                    "score": 0.7,
                    "notes": f"{tech} compatibility varies by implementation",
                    "category": "unknown"
                }
        
        overall_score = sum(score["score"] for score in compatibility_scores.values()) / len(compatibility_scores)
        
        return {
            "compatibility_matrix": compatibility_scores,
            "overall_score": overall_score,
            "recommendations": [
                "All selected technologies are generally compatible",
                "Consider using TypeScript for better type safety across the stack",
                "Implement proper API design patterns for better integration",
                "Use containerization (Docker) for consistent deployment"
            ]
        }
    
    def _get_tech_category(self, tech_name: str) -> str:
        """Get category for a technology"""
        for category, techs in self.tech_database.items():
            if tech_name in techs:
                return category
        return "unknown"
    
    def get_supported_technologies(self) -> Dict[str, List[str]]:
        """Get all supported technologies by category"""
        return {
            category: list(techs.keys()) 
            for category, techs in self.tech_database.items()
        }

# Export the recommendation engine
ai_engine = AIStackRecommendation()