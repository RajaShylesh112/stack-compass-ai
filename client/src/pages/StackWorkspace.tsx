
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Copy, BarChart3, Heart, Calendar, Filter } from 'lucide-react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';

const StackWorkspace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [, setLocation] = useLocation();

  // Mock user stacks data
  const userStacks = [
    {
      id: 1,
      name: 'AI SaaS MVP',
      description: 'Machine learning SaaS with real-time analytics',
      frontend: 'Next.js',
      backend: 'FastAPI',
      database: 'PostgreSQL',
      auth: 'Supabase Auth',
      hosting: 'Vercel',
      lastModified: '2024-01-15',
      isFavorite: true,
      tags: ['AI', 'SaaS', 'Real-time', 'MVP']
    },
    {
      id: 2,
      name: 'E-commerce Platform',
      description: 'Full-featured online store with payment integration',
      frontend: 'React',
      backend: 'Node.js',
      database: 'MongoDB',
      auth: 'Auth0',
      hosting: 'AWS',
      lastModified: '2024-01-12',
      isFavorite: false,
      tags: ['E-commerce', 'Payments', 'Scale']
    },
    {
      id: 3,
      name: 'Portfolio Website',
      description: 'Personal portfolio with blog and CMS',
      frontend: 'Next.js',
      backend: 'Strapi',
      database: 'PostgreSQL',
      auth: 'None',
      hosting: 'Netlify',
      lastModified: '2024-01-10',
      isFavorite: true,
      tags: ['Portfolio', 'Blog', 'CMS', 'Static']
    },
    {
      id: 4,
      name: 'Mobile App Backend',
      description: 'REST API for mobile application',
      frontend: 'None',
      backend: 'Django',
      database: 'PostgreSQL',
      auth: 'Django Auth',
      hosting: 'Heroku',
      lastModified: '2024-01-08',
      isFavorite: false,
      tags: ['Mobile', 'API', 'REST']
    },
    {
      id: 5,
      name: 'Real-time Chat App',
      description: 'Messaging app with file sharing',
      frontend: 'React',
      backend: 'Socket.io',
      database: 'Redis',
      auth: 'Firebase Auth',
      hosting: 'Railway',
      lastModified: '2024-01-05',
      isFavorite: true,
      tags: ['Real-time', 'Chat', 'WebSocket']
    }
  ];

  const filteredStacks = userStacks.filter(stack => {
    const matchesSearch = stack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stack.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stack.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'favorites' && stack.isFavorite) ||
                         (filterBy === 'recent' && new Date(stack.lastModified) > new Date('2024-01-10'));
    
    return matchesSearch && matchesFilter;
  });

  const sortedStacks = filteredStacks.sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      case 'favorites':
        return b.isFavorite ? 1 : -1;
      default:
        return 0;
    }
  });

  const handleCreateNew = () => {
    setLocation('/stacks/new');
  };

  const handleEditStack = (stackId: number) => {
    setLocation(`/stacks/new?edit=${stackId}`);
  };

  const handleDuplicateStack = (stackId: number) => {
    console.log('Duplicating stack:', stackId);
    // Implement duplication logic
  };

  const handleCompareStack = (stackId: number) => {
    setLocation('/compare/stacks');
  };

  const toggleFavorite = (stackId: number) => {
    console.log('Toggling favorite for stack:', stackId);
    // Implement favorite toggle logic
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text font-poppins mb-2">
              My Tech Stacks
            </h1>
            <p className="text-text-secondary">
              Manage, compare, and organize your technology stack configurations.
            </p>
          </div>
          <Button 
            onClick={handleCreateNew}
            className="bg-accent hover:bg-accent/90 text-white px-6 py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Stack
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <Input
                placeholder="Search stacks, technologies, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-gray-600 text-text"
              />
            </div>
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-40 bg-secondary border-gray-600 text-text">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="bg-secondary border-gray-600">
              <SelectItem value="all">All Stacks</SelectItem>
              <SelectItem value="favorites">Favorites</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 bg-secondary border-gray-600 text-text">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-secondary border-gray-600">
              <SelectItem value="recent">Recently Modified</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="favorites">Favorites First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="neumorphic-card border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-text">{userStacks.length}</div>
              <div className="text-sm text-text-secondary">Total Stacks</div>
            </CardContent>
          </Card>
          <Card className="neumorphic-card border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-text">{userStacks.filter(s => s.isFavorite).length}</div>
              <div className="text-sm text-text-secondary">Favorites</div>
            </CardContent>
          </Card>
          <Card className="neumorphic-card border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-text">
                {new Set(userStacks.map(s => s.frontend)).size}
              </div>
              <div className="text-sm text-text-secondary">Frontend Techs</div>
            </CardContent>
          </Card>
          <Card className="neumorphic-card border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-text">
                {userStacks.filter(s => new Date(s.lastModified) > new Date('2024-01-10')).length}
              </div>
              <div className="text-sm text-text-secondary">Recent Updates</div>
            </CardContent>
          </Card>
        </div>

        {/* Stacks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStacks.map((stack) => (
            <Card key={stack.id} className="neumorphic-card border-0 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-text font-poppins text-lg mb-1">{stack.name}</CardTitle>
                    <p className="text-text-secondary text-sm">{stack.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(stack.id)}
                    className="p-1"
                  >
                    <Heart className={`w-5 h-5 ${stack.isFavorite ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-text-secondary">Frontend:</span>
                      <div className="text-text font-medium">{stack.frontend}</div>
                    </div>
                    <div>
                      <span className="text-text-secondary">Backend:</span>
                      <div className="text-text font-medium">{stack.backend}</div>
                    </div>
                    <div>
                      <span className="text-text-secondary">Database:</span>
                      <div className="text-text font-medium">{stack.database}</div>
                    </div>
                    <div>
                      <span className="text-text-secondary">Hosting:</span>
                      <div className="text-text font-medium">{stack.hosting}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {stack.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-accent/20 text-accent">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Modified {new Date(stack.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditStack(stack.id)}
                    className="flex-1 border-gray-600 text-text-secondary hover:text-text"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicateStack(stack.id)}
                    className="border-gray-600 text-text-secondary hover:text-text"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCompareStack(stack.id)}
                    className="border-gray-600 text-text-secondary hover:text-text"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStacks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-text-secondary mb-4">No stacks found matching your criteria.</div>
            <Button 
              onClick={handleCreateNew}
              className="bg-accent hover:bg-accent/90 text-white"
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
