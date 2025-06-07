"""
Vector Service using Pinecone for semantic search and document indexing
"""
import os
from typing import List, Dict, Any, Optional
from pinecone import Pinecone, ServerlessSpec
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document

from ..models.responses import SearchResult


class VectorService:
    """Service for vector operations using Pinecone"""
    
    def __init__(self):
        self.pc = None
        self.index = None
        self.embeddings = OpenAIEmbeddings(
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        self.index_name = "tech-stack-knowledge"
    
    async def initialize(self):
        """Initialize Pinecone connection and index"""
        try:
            self.pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
            
            # Check if index exists, create if not
            if self.index_name not in self.pc.list_indexes().names():
                self.pc.create_index(
                    name=self.index_name,
                    dimension=1536,  # OpenAI embeddings dimension
                    metric="cosine",
                    spec=ServerlessSpec(
                        cloud="aws",
                        region="us-east-1"
                    )
                )
            
            self.index = self.pc.Index(self.index_name)
            print(f"Connected to Pinecone index: {self.index_name}")
            
        except Exception as e:
            print(f"Failed to initialize Pinecone: {e}")
            # Continue without Pinecone for now
            self.pc = None
            self.index = None
    
    async def index_documents(self, documents: List[Dict[str, Any]], namespace: Optional[str] = None) -> int:
        """Index documents into Pinecone"""
        if not self.index:
            raise Exception("Pinecone not initialized")
        
        vectors = []
        
        for doc_data in documents:
            # Extract text content
            text_content = doc_data.get('content', '')
            metadata = doc_data.get('metadata', {})
            doc_id = doc_data.get('id', f"doc_{len(vectors)}")
            
            # Split text into chunks
            chunks = self.text_splitter.split_text(text_content)
            
            for i, chunk in enumerate(chunks):
                # Generate embedding
                embedding = await self.embeddings.aembed_query(chunk)
                
                # Prepare vector
                vector = {
                    "id": f"{doc_id}_chunk_{i}",
                    "values": embedding,
                    "metadata": {
                        **metadata,
                        "content": chunk,
                        "chunk_index": i,
                        "parent_doc_id": doc_id
                    }
                }
                vectors.append(vector)
        
        # Upsert vectors to Pinecone
        if vectors:
            self.index.upsert(vectors=vectors, namespace=namespace)
        
        return len(vectors)
    
    async def search(self, query: str, limit: int = 10, namespace: Optional[str] = None) -> List[SearchResult]:
        """Perform semantic search"""
        if not self.index:
            # Return empty results if Pinecone not available
            return []
        
        try:
            # Generate query embedding
            query_embedding = await self.embeddings.aembed_query(query)
            
            # Search in Pinecone
            search_results = self.index.query(
                vector=query_embedding,
                top_k=limit,
                include_metadata=True,
                namespace=namespace
            )
            
            # Convert to SearchResult objects
            results = []
            for match in search_results.matches:
                result = SearchResult(
                    id=match.id,
                    content=match.metadata.get('content', ''),
                    metadata=match.metadata,
                    score=match.score
                )
                results.append(result)
            
            return results
            
        except Exception as e:
            print(f"Search error: {e}")
            return []
    
    async def add_technology_knowledge(self, tech_name: str, knowledge_data: Dict[str, Any]):
        """Add technology-specific knowledge to the vector database"""
        documents = []
        
        # Create documents from different aspects of the technology
        aspects = [
            ('overview', knowledge_data.get('overview', '')),
            ('pros', ' '.join(knowledge_data.get('pros', []))),
            ('cons', ' '.join(knowledge_data.get('cons', []))),
            ('use_cases', ' '.join(knowledge_data.get('use_cases', []))),
            ('best_practices', knowledge_data.get('best_practices', ''))
        ]
        
        for aspect_name, content in aspects:
            if content:
                documents.append({
                    'id': f"{tech_name}_{aspect_name}",
                    'content': content,
                    'metadata': {
                        'technology': tech_name,
                        'aspect': aspect_name,
                        'type': 'knowledge'
                    }
                })
        
        return await self.index_documents(documents)
    
    async def get_similar_technologies(self, tech_name: str, limit: int = 5) -> List[str]:
        """Find technologies similar to the given one"""
        search_results = await self.search(
            query=f"technology similar to {tech_name}",
            limit=limit
        )
        
        similar_techs = []
        for result in search_results:
            tech = result.metadata.get('technology')
            if tech and tech != tech_name and tech not in similar_techs:
                similar_techs.append(tech)
        
        return similar_techs[:limit]