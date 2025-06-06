
import React, { useState } from 'react';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Settings, 
  Plus, 
  Edit, 
  Copy, 
  BarChart3, 
  Trash2, 
  Star, 
  Calendar,
  Crown,
  Lock,
  Bookmark,
  GitBranch,
  Clock,
  Filter,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    authMethod: 'GitHub OAuth',
    plan: 'Free',
    stacksUsed: 3,
    stacksLimit: 3
  };

  // Mock saved stacks
  const savedStacks = [
    {
      id: 1,
      name: 'AI SaaS MVP',
      tags: ['AI', 'SaaS', 'Real-time'],
      dateModified: '2024-01-15',
      frontend: 'Next.js',
      backend: 'FastAPI',
      database: 'PostgreSQL',
      hosting: 'Vercel'
    },
    {
      id: 2,
      name: 'E-commerce Platform',
      tags: ['E-commerce', 'Payments'],
      dateModified: '2024-01-12',
      frontend: 'React',
      backend: 'Node.js',
      database: 'MongoDB',
      hosting: 'AWS'
    },
    {
      id: 3,
      name: 'Portfolio Website',
      tags: ['Portfolio', 'Blog'],
      dateModified: '2024-01-10',
      frontend: 'Next.js',
      backend: 'Strapi',
      database: 'PostgreSQL',
      hosting: 'Netlify'
    }
  ];

  // Mock recent comparisons
  const recentComparisons = [
    { id: 1, tools: ['Next.js', 'Svelte'], date: '2024-01-14', winner: 'Next.js' },
    { id: 2, tools: ['Supabase', 'Firebase'], date: '2024-01-13', winner: 'Supabase' },
    { id: 3, tools: ['Vercel', 'Netlify'], date: '2024-01-12', winner: 'Vercel' }
  ];

  // Mock AI suggestions
  const aiSuggestions = [
    {
      id: 1,
      title: 'AI-Powered SaaS Stack',
      date: '2024-01-15',
      stack: 'Next.js + FastAPI + PostgreSQL + Vercel',
      confidence: 92
    },
    {
      id: 2,
      title: 'Mobile-First E-commerce',
      date: '2024-01-13',
      stack: 'React Native + Node.js + MongoDB + AWS',
      confidence: 88
    }
  ];

  // Mock bookmarked tools
  const bookmarkedTools = [
    { name: 'Next.js', category: 'Frontend', logo: '⚛️' },
    { name: 'Supabase', category: 'Backend', logo: '🗃️' },
    { name: 'Vercel', category: 'Hosting', logo: '🚀' },
    { name: 'Tailwind CSS', category: 'Styling', logo: '🎨' }
  ];

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(17, 24, 39)"
      gradientBackgroundEnd="rgb(31, 41, 55)"
      firstColor="99, 102, 241"
      secondColor="139, 92, 246"
      thirdColor="59, 130, 246"
      fourthColor="16, 185, 129"
      fifthColor="245, 158, 11"
      containerClassName="min-h-screen"
    >
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-black/20 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white font-poppins">TechStack Pro</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>
            <Avatar className="border-2 border-white/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile & Quick Actions */}
            <div className="space-y-6">
              {/* User Profile */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-poppins">{user.name}</div>
                      <div className="text-sm text-white/70">{user.email}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Auth Method</span>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {user.authMethod}
                      </Badge>
                    </div>
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Plan */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span>Current Plan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">{user.plan} Tier</span>
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                        Free
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Saved Stacks</span>
                        <span className="text-white/70">{user.stacksUsed}/{user.stacksLimit}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" 
                          style={{ width: `${(user.stacksUsed / user.stacksLimit) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Zap className="w-4 h-4 mr-2" />
                      Upgrade to Pro
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Bookmarked Tools */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bookmark className="w-5 h-5" />
                    <span>Favorite Tools</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {bookmarkedTools.map((tool) => (
                      <div key={tool.name} className="bg-white/10 rounded-lg p-3 text-center">
                        <div className="text-2xl mb-1">{tool.logo}</div>
                        <div className="text-sm font-medium">{tool.name}</div>
                        <div className="text-xs text-white/60">{tool.category}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Middle Column - Saved Stacks */}
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center space-x-2">
                      <GitBranch className="w-5 h-5" />
                      <span>Saved Stacks ({savedStacks.length})</span>
                    </CardTitle>
                    <Button 
                      onClick={() => navigate('/stacks/new')}
                      className="bg-accent hover:bg-accent/90"
                      disabled={user.stacksUsed >= user.stacksLimit}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Stack
                    </Button>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="recent">Recent</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="frontend">Frontend</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterBy} onValueChange={setFilterBy}>
                      <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="ai">AI</SelectItem>
                        <SelectItem value="web">Web</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  {user.stacksUsed >= user.stacksLimit && (
                    <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2 text-orange-300">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm">Stack limit reached. Upgrade to Pro for unlimited stacks.</span>
                      </div>
                    </div>
                  )}
                  <div className="space-y-4">
                    {savedStacks.map((stack) => (
                      <div key={stack.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold font-poppins">{stack.name}</h3>
                            <p className="text-sm text-white/70">{stack.frontend} + {stack.backend} + {stack.database}</p>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                              <BarChart3 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white/70 hover:text-red-400 hover:bg-white/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {stack.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-white/20 text-white text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-white/50">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Modified {new Date(stack.dateModified).toLocaleDateString()}</span>
                          </div>
                          <span>{stack.hosting}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Recent Activity & AI Suggestions */}
            <div className="space-y-6">
              {/* Recent Comparisons */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Recent Comparisons</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentComparisons.map((comparison) => (
                      <div key={comparison.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            {comparison.tools.join(' vs ')}
                          </span>
                          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                            Re-compare
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-xs text-white/60">
                          <span>Winner: {comparison.winner}</span>
                          <span>{new Date(comparison.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Suggestions History */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>AI Suggestions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{suggestion.title}</h4>
                            <p className="text-xs text-white/70 mt-1">{suggestion.stack}</p>
                          </div>
                          <Badge className="bg-green-500/20 text-green-300">
                            {suggestion.confidence}%
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-white/60">{new Date(suggestion.date).toLocaleDateString()}</span>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="text-xs text-white/70 hover:text-white hover:bg-white/10">
                              Save as Stack
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs text-white/70 hover:text-white hover:bg-white/10">
                              Rerun
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Log (Pro Feature) */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-8 h-8 mx-auto mb-2 text-purple-300" />
                    <div className="text-sm font-medium">Pro Feature</div>
                    <div className="text-xs text-white/70">Upgrade to unlock activity tracking</div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 opacity-50">
                    <Clock className="w-5 h-5" />
                    <span>Activity Log</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="opacity-50">
                  <div className="space-y-2">
                    <div className="bg-white/5 rounded-lg p-2 text-sm">
                      Compared Next.js vs Svelte
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-sm">
                      Explored Firebase authentication
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-sm">
                      Built AI SaaS stack
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Index;
