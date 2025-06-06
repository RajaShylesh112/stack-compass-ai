import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Search, Plus, ArrowRight, Star, Download, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';

const CompareStacks = () => {
  const [selectedStacks, setSelectedStacks] = useState<any[]>([]);
  const [location] = useLocation();
  
  // Mock tech stacks data
  const techStacks = [
    {
      id: 1,
      name: 'MERN Stack',
      description: 'MongoDB, Express.js, React, Node.js',
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      metrics: {
        performance: 85,
        scalability: 90,
        learning: 75,
        community: 95,
        jobMarket: 88,
        maintenance: 80
      },
      stats: {
        githubStars: '847k',
        npmDownloads: '15.2M/week',
        jobOpenings: '23,456',
        companies: 'Netflix, Facebook, WhatsApp'
      }
    },
    {
      id: 2,
      name: 'LAMP Stack',
      description: 'Linux, Apache, MySQL, PHP',
      technologies: ['Linux', 'Apache', 'MySQL', 'PHP'],
      metrics: {
        performance: 80,
        scalability: 70,
        learning: 85,
        community: 85,
        jobMarket: 75,
        maintenance: 90
      },
      stats: {
        githubStars: '234k',
        npmDownloads: '8.1M/week',
        jobOpenings: '18,923',
        companies: 'WordPress, Facebook, Yahoo'
      }
    },
    {
      id: 3,
      name: 'JAMstack',
      description: 'JavaScript, APIs, Markup',
      technologies: ['JavaScript', 'APIs', 'Static Site Generators', 'CDN'],
      metrics: {
        performance: 95,
        scalability: 85,
        learning: 70,
        community: 80,
        jobMarket: 82,
        maintenance: 85
      },
      stats: {
        githubStars: '567k',
        npmDownloads: '12.7M/week',
        jobOpenings: '15,234',
        companies: 'Netlify, Gatsby, Vercel'
      }
    }
  ];

  // Handle preselected stack from navigation state
  useEffect(() => {
    // For now, we'll implement preselected stacks via URL params or other means
    // since wouter doesn't support state in the same way as react-router
  }, [location]);

  const handleAddStack = (stack: any) => {
    if (selectedStacks.length < 2 && !selectedStacks.find(s => s.id === stack.id)) {
      setSelectedStacks([...selectedStacks, stack]);
    }
  };

  const handleRemoveStack = (stackId: number) => {
    setSelectedStacks(selectedStacks.filter(s => s.id !== stackId));
  };

  const comparisonData = selectedStacks.length === 2 ? [
    {
      metric: 'Performance',
      [selectedStacks[0].name]: selectedStacks[0].metrics.performance,
      [selectedStacks[1].name]: selectedStacks[1].metrics.performance
    },
    {
      metric: 'Scalability',
      [selectedStacks[0].name]: selectedStacks[0].metrics.scalability,
      [selectedStacks[1].name]: selectedStacks[1].metrics.scalability
    },
    {
      metric: 'Learning Curve',
      [selectedStacks[0].name]: selectedStacks[0].metrics.learning,
      [selectedStacks[1].name]: selectedStacks[1].metrics.learning
    },
    {
      metric: 'Community',
      [selectedStacks[0].name]: selectedStacks[0].metrics.community,
      [selectedStacks[1].name]: selectedStacks[1].metrics.community
    },
    {
      metric: 'Job Market',
      [selectedStacks[0].name]: selectedStacks[0].metrics.jobMarket,
      [selectedStacks[1].name]: selectedStacks[1].metrics.jobMarket
    },
    {
      metric: 'Maintenance',
      [selectedStacks[0].name]: selectedStacks[0].metrics.maintenance,
      [selectedStacks[1].name]: selectedStacks[1].metrics.maintenance
    }
  ] : [];

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#FFFFFF]  mb-4">Compare Tech Stacks</h1>
          <p className="text-[#FFFFFF]-secondary text-lg">Select up to 2 tech stacks to compare side by side</p>
        </div>

        {/* Stack Selection */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFFFFF]-secondary w-4 h-4" />
              <Input
                placeholder="Search tech stacks..."
                className="pl-10 bg-[#1A1A1A] border border-[#333333] rounded-xl text-[#FFFFFF]"
              />
            </div>
            <span className="text-[#FFFFFF]-secondary text-sm">
              {selectedStacks.length}/2 selected
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {techStacks.map((stack) => (
              <Card key={stack.id} className="neumorphic-card border-0">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#FFFFFF] ">{stack.name}</h3>
                      <p className="text-[#FFFFFF]-secondary text-sm">{stack.description}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAddStack(stack)}
                      disabled={selectedStacks.length >= 2 || selectedStacks.find(s => s.id === stack.id)}
                      className="bg-accent hover:bg-accent/90 text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {stack.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-accent/20 text-[#A259FF] text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {stack.technologies.length > 3 && (
                      <Badge variant="secondary" className="bg-gray-600 text-gray-300 text-xs">
                        +{stack.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Stacks */}
        {selectedStacks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#FFFFFF]  mb-4">Selected for Comparison</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {selectedStacks.map((stack, index) => (
                <Card key={stack.id} className="neumorphic-card border-0">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#FFFFFF] ">{stack.name}</h3>
                        <p className="text-[#FFFFFF]-secondary text-sm">{stack.description}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveStack(stack.id)}
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-[#FFFFFF]-secondary">{stack.stats.githubStars}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-green-500" />
                        <span className="text-[#FFFFFF]-secondary">{stack.stats.npmDownloads}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-[#A259FF]" />
                        <span className="text-[#FFFFFF]-secondary">{stack.stats.jobOpenings}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span className="text-[#FFFFFF]-secondary">Popular</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Results */}
        {selectedStacks.length === 2 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#FFFFFF]  text-center">Comparison Results</h2>
            
            {/* Metrics Comparison */}
            <Card className="neumorphic-card border-0">
              <CardHeader>
                <CardTitle className="text-[#FFFFFF] ">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="metric" stroke="#e5e7eb" />
                    <YAxis stroke="#e5e7eb" />
                    <Bar dataKey={selectedStacks[0].name} fill="#6366f1" />
                    <Bar dataKey={selectedStacks[1].name} fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Side by Side Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              {selectedStacks.map((stack, index) => (
                <Card key={stack.id} className="neumorphic-card border-0">
                  <CardHeader>
                    <CardTitle className="text-[#FFFFFF] ">{stack.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#FFFFFF] mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {stack.technologies.map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="bg-accent/20 text-[#A259FF]">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#FFFFFF] mb-2">Popular Companies</h4>
                      <p className="text-[#FFFFFF]-secondary text-sm">{stack.stats.companies}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#FFFFFF] mb-2">Key Stats</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>GitHub Stars: <span className="text-[#A259FF]">{stack.stats.githubStars}</span></div>
                        <div>Job Openings: <span className="text-[#A259FF]">{stack.stats.jobOpenings}</span></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Winner Declaration */}
            <Card className="neumorphic-card border-0 text-center">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#FFFFFF]  mb-4">Recommendation</h3>
                <p className="text-[#FFFFFF]-secondary mb-4">
                  Based on the comparison, both stacks have their strengths. Consider your project requirements:
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-[#A259FF]">{selectedStacks[0].name}</div>
                    <div className="text-sm text-[#FFFFFF]-secondary">Better for modern web apps</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-[#FFFFFF]-secondary mt-2" />
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-400">{selectedStacks[1].name}</div>
                    <div className="text-sm text-[#FFFFFF]-secondary">Better for traditional websites</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareStacks;
