import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { 
  Plus, 
  Search, 
  Filter, 
  Heart, 
  Edit, 
  Copy, 
  BarChart3, 
  Calendar,
  Code,
  Database,
  Server,
  Cloud
} from 'lucide-react';

interface TechStack {
  id: string;
  name: string;
  description: string;
  frontend: string;
  backend: string;
  database: string;
  hosting: string;
  tags: string[];
  isFavorite: boolean;
  lastModified: string;
}

const StackWorkspace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Sample data for demonstration
  const userStacks: TechStack[] = [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with modern technologies',
      frontend: 'React',
      backend: 'Node.js',
      database: 'PostgreSQL',
      hosting: 'Vercel',
      tags: ['React', 'TypeScript', 'Tailwind', 'Stripe'],
      isFavorite: true,
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      name: 'Mobile App Backend',
      description: 'Scalable API service for mobile applications',
      frontend: 'React Native',
      backend: 'Python',
      database: 'MongoDB',
      hosting: 'AWS',
      tags: ['Python', 'FastAPI', 'MongoDB', 'Docker'],
      isFavorite: false,
      lastModified: '2024-01-12'
    },
    {
      id: '3',
      name: 'Analytics Dashboard',
      description: 'Real-time data visualization and reporting tool',
      frontend: 'Vue.js',
      backend: 'Go',
      database: 'InfluxDB',
      hosting: 'DigitalOcean',
      tags: ['Vue', 'Go', 'InfluxDB', 'Chart.js'],
      isFavorite: true,
      lastModified: '2024-01-10'
    }
  ];

  const filteredStacks = useMemo(() => {
    let filtered = userStacks.filter(stack => 
      stack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stack.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stack.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (filterBy === 'favorites') {
      filtered = filtered.filter(stack => stack.isFavorite);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'modified':
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        default:
          return 0;
      }
    });
  }, [searchTerm, filterBy, sortBy]);

  const sortedStacks = filteredStacks;

  const handleCreateNew = () => {
    console.log('Creating new stack...');
    // Navigate to stack builder or open modal
  };

  const handleEditStack = (stackId: string) => {
    console.log('Editing stack:', stackId);
    // Navigate to edit page or open modal
  };

  const handleDuplicateStack = (stackId: string) => {
    console.log('Duplicating stack:', stackId);
    // Implement duplication logic
  };

  const handleCompareStack = (stackId: string) => {
    console.log('Comparing stack:', stackId);
    // Navigate to comparison page
  };

  const toggleFavorite = (stackId: string) => {
    console.log('Toggling favorite for stack:', stackId);
    // Implement favorite toggle logic
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] mb-2">
              My Tech Stacks
            </h1>
            <p className="text-[#CCCCCC]">
              Manage, compare, and organize your technology stack configurations.
            </p>
          </div>
          <Button 
            onClick={handleCreateNew}
            className="bg-[#A259FF] hover:bg-[#A259FF]/90 text-white px-6 py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Stack
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#CCCCCC]" />
              <Input
                placeholder="Search stacks, technologies, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1A1A1A] border-[#333333] text-[#FFFFFF]"
              />
            </div>
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-48 bg-[#1A1A1A] border-[#333333] text-[#FFFFFF]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stacks</SelectItem>
              <SelectItem value="favorites">Favorites Only</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-[#1A1A1A] border-[#333333] text-[#FFFFFF]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="modified">Last Modified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-[#1A1A1A] border-[#333333]">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#FFFFFF]">{userStacks.filter(s => s.isFavorite).length}</div>
              <div className="text-sm text-[#CCCCCC]">Favorites</div>
            </CardContent>
          </Card>
          <Card className="bg-[#1A1A1A] border-[#333333]">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#FFFFFF]">
                {new Set(userStacks.map(s => s.frontend)).size}
              </div>
              <div className="text-sm text-[#CCCCCC]">Frontend Techs</div>
            </CardContent>
          </Card>
          <Card className="bg-[#1A1A1A] border-[#333333]">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#FFFFFF]">
                {userStacks.filter(s => new Date(s.lastModified) > new Date('2024-01-10')).length}
              </div>
              <div className="text-sm text-[#CCCCCC]">Recent Updates</div>
            </CardContent>
          </Card>
        </div>

        {/* Stacks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStacks.map((stack) => (
            <div key={stack.id} className="group relative">
              {/* Gradient border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
              
              <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 group-hover:scale-[1.02] backdrop-blur-sm">
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                        <CardTitle className="text-[#FFFFFF] text-lg">{stack.name}</CardTitle>
                      </div>
                      <p className="text-[#CCCCCC] text-sm leading-relaxed">{stack.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(stack.id)}
                      className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
                    >
                      <Heart className={`w-5 h-5 transition-all duration-200 ${stack.isFavorite ? 'text-red-500 fill-current scale-110' : 'text-gray-400 hover:text-red-400'}`} />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  {/* Technology Stack Grid with enhanced styling */}
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3 rounded-xl border border-blue-500/20">
                        <span className="text-blue-400 text-xs font-medium uppercase tracking-wide">Frontend</span>
                        <div className="text-[#FFFFFF] font-semibold mt-1">{stack.frontend}</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-3 rounded-xl border border-green-500/20">
                        <span className="text-green-400 text-xs font-medium uppercase tracking-wide">Backend</span>
                        <div className="text-[#FFFFFF] font-semibold mt-1">{stack.backend}</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-xl border border-purple-500/20">
                        <span className="text-purple-400 text-xs font-medium uppercase tracking-wide">Database</span>
                        <div className="text-[#FFFFFF] font-semibold mt-1">{stack.database}</div>
                      </div>
                      <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-3 rounded-xl border border-orange-500/20">
                        <span className="text-orange-400 text-xs font-medium uppercase tracking-wide">Hosting</span>
                        <div className="text-[#FFFFFF] font-semibold mt-1">{stack.hosting}</div>
                      </div>
                    </div>
                  </div>

                  {/* Tags with gradient effects */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {stack.tags.map((tag, index) => (
                      <Badge 
                        key={tag} 
                        className={`text-xs px-3 py-1 rounded-full border-0 font-medium transition-all duration-200 hover:scale-105 ${
                          index % 4 === 0 ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300' :
                          index % 4 === 1 ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300' :
                          index % 4 === 2 ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300' :
                          'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-300'
                        }`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Last modified with improved styling */}
                  <div className="flex items-center justify-between mb-6 p-2 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-2 text-xs text-[#CCCCCC]">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      <span>Modified {new Date(stack.lastModified).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action buttons with enhanced styling */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditStack(stack.id)}
                      className="flex-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30 text-blue-300 hover:text-blue-200 hover:border-blue-400/50 hover:bg-blue-500/20 transition-all duration-200"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDuplicateStack(stack.id)}
                      className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 text-green-300 hover:text-green-200 hover:border-green-400/50 hover:bg-green-500/20 transition-all duration-200"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCompareStack(stack.id)}
                      className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-300 hover:text-purple-200 hover:border-purple-400/50 hover:bg-purple-500/20 transition-all duration-200"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {filteredStacks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#CCCCCC] mb-4">No stacks found matching your criteria.</div>
            <Button 
              onClick={handleCreateNew}
              className="bg-[#A259FF] hover:bg-[#A259FF]/90 text-white"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Stack
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StackWorkspace;