
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Search, Plus, Star, Download, Users, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import Header from '@/components/Header';

const CompareTools = () => {
  const [selectedTools, setSelectedTools] = useState<any[]>([]);
  const [category, setCategory] = useState('Frontend Frameworks');
  
  // Mock tools data
  const toolCategories = {
    'Frontend Frameworks': [
      {
        id: 1,
        name: 'React',
        description: 'A JavaScript library for building user interfaces',
        version: '18.2.0',
        license: 'MIT',
        firstRelease: '2013',
        metrics: {
          performance: 90,
          learning: 75,
          community: 95,
          ecosystem: 92,
          maintenance: 88
        },
        stats: {
          githubStars: '213k',
          npmDownloads: '18.2M/week',
          contributors: '1,534',
          issues: '896'
        },
        features: {
          'TypeScript Support': true,
          'Server-Side Rendering': true,
          'Mobile Development': true,
          'Testing Tools': true,
          'Developer Tools': true,
          'Hot Reloading': true
        }
      },
      {
        id: 2,
        name: 'Vue.js',
        description: 'The Progressive JavaScript Framework',
        version: '3.3.4',
        license: 'MIT',
        firstRelease: '2014',
        metrics: {
          performance: 85,
          learning: 90,
          community: 85,
          ecosystem: 80,
          maintenance: 90
        },
        stats: {
          githubStars: '203k',
          npmDownloads: '4.1M/week',
          contributors: '424',
          issues: '567'
        },
        features: {
          'TypeScript Support': true,
          'Server-Side Rendering': true,
          'Mobile Development': false,
          'Testing Tools': true,
          'Developer Tools': true,
          'Hot Reloading': true
        }
      }
    ]
  };

  const tools = toolCategories[category as keyof typeof toolCategories] || [];

  const handleAddTool = (tool: any) => {
    if (selectedTools.length < 3 && !selectedTools.find(t => t.id === tool.id)) {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleRemoveTool = (toolId: number) => {
    setSelectedTools(selectedTools.filter(t => t.id !== toolId));
  };

  const radarData = selectedTools.length > 0 ? [
    {
      metric: 'Performance',
      ...selectedTools.reduce((acc, tool) => ({ ...acc, [tool.name]: tool.metrics.performance }), {})
    },
    {
      metric: 'Learning Curve',
      ...selectedTools.reduce((acc, tool) => ({ ...acc, [tool.name]: tool.metrics.learning }), {})
    },
    {
      metric: 'Community',
      ...selectedTools.reduce((acc, tool) => ({ ...acc, [tool.name]: tool.metrics.community }), {})
    },
    {
      metric: 'Ecosystem',
      ...selectedTools.reduce((acc, tool) => ({ ...acc, [tool.name]: tool.metrics.ecosystem }), {})
    },
    {
      metric: 'Maintenance',
      ...selectedTools.reduce((acc, tool) => ({ ...acc, [tool.name]: tool.metrics.maintenance }), {})
    }
  ] : [];

  // Mock trend data
  const trendData = [
    { month: 'Jan', React: 85, 'Vue.js': 65 },
    { month: 'Feb', React: 87, 'Vue.js': 68 },
    { month: 'Mar', React: 89, 'Vue.js': 70 },
    { month: 'Apr', React: 91, 'Vue.js': 72 },
    { month: 'May', React: 90, 'Vue.js': 74 },
    { month: 'Jun', React: 92, 'Vue.js': 76 }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#FFFFFF]  mb-4">Compare Tools & Frameworks</h1>
          <p className="text-[#FFFFFF]-secondary text-lg">Compare technologies that serve the same purpose</p>
        </div>

        {/* Category Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.keys(toolCategories).map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                onClick={() => setCategory(cat)}
                className={category === cat ? "bg-accent text-white" : "border-[#333333] text-[#FFFFFF]-secondary"}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Tool Selection */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFFFFF]-secondary w-4 h-4" />
              <Input
                placeholder="Search tools..."
                className="pl-10 bg-[#1A1A1A] border border-[#333333] rounded-xl text-[#FFFFFF]"
              />
            </div>
            <span className="text-[#FFFFFF]-secondary text-sm">
              {selectedTools.length}/3 selected
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tools.map((tool, index) => (
              <div key={tool.id} className="group relative">
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
                
                <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 group-hover:scale-[1.02] backdrop-blur-sm">
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="relative z-10 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-3 h-3 rounded-full animate-pulse ${
                            index % 4 === 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                            index % 4 === 1 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                            index % 4 === 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                            'bg-gradient-to-r from-orange-500 to-yellow-500'
                          }`}></div>
                          <h3 className="text-lg font-semibold text-[#FFFFFF]">{tool.name}</h3>
                        </div>
                        <p className="text-[#CCCCCC] text-sm leading-relaxed mb-3">{tool.description}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-2 py-1 rounded-md border border-blue-500/30">
                            <span className="text-blue-300">v{tool.version}</span>
                          </div>
                          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-2 py-1 rounded-md border border-green-500/30">
                            <span className="text-green-300">{tool.license}</span>
                          </div>
                          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-2 py-1 rounded-md border border-purple-500/30">
                            <span className="text-purple-300">Since {tool.firstRelease}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddTool(tool)}
                        disabled={selectedTools.length >= 3 || selectedTools.find(t => t.id === tool.id)}
                        className="bg-gradient-to-r from-[#A259FF] to-purple-600 hover:from-[#A259FF]/90 hover:to-purple-700 text-white border-0 transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Enhanced statistics display */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-3 rounded-xl border border-yellow-500/20">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-300 font-medium">{tool.stats.githubStars}</span>
                        </div>
                        <span className="text-xs text-[#CCCCCC]">GitHub Stars</span>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-3 rounded-xl border border-green-500/20">
                        <div className="flex items-center space-x-2">
                          <Download className="w-4 h-4 text-green-400" />
                          <span className="text-green-300 font-medium">{tool.stats.npmDownloads}</span>
                        </div>
                        <span className="text-xs text-[#CCCCCC]">Weekly Downloads</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Tools */}
        {selectedTools.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">Selected for Comparison</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {selectedTools.map((tool, index) => (
                <div key={tool.id} className="group relative">
                  {/* Selected tool gradient border - different color */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 rounded-2xl opacity-30 blur-sm"></div>
                  
                  <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-green-500/30 rounded-2xl shadow-xl shadow-green-500/10 backdrop-blur-sm">
                    {/* Selected inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 rounded-2xl"></div>
                    
                    <CardContent className="relative z-10 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                          <h3 className="font-semibold text-[#FFFFFF]">{tool.name}</h3>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveTool(tool.id)}
                          className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 text-red-300 hover:text-red-200 hover:border-red-400/50 hover:bg-red-500/30 transition-all duration-200 h-6 w-6 p-0"
                        >
                          ×
                        </Button>
                      </div>
                      <p className="text-[#CCCCCC] text-sm leading-relaxed">{tool.description}</p>
                      
                      {/* Selection indicator */}
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-1 rounded-full border border-green-500/30">
                          <span className="text-green-300 text-xs font-medium">Selected #{index + 1}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Results */}
        {selectedTools.length >= 2 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#FFFFFF]  text-center">Comparison Results</h2>
            
            {/* Radar Chart */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-2xl opacity-15 blur-lg"></div>
              
              <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl shadow-2xl shadow-blue-500/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl"></div>
                
                <CardHeader className="relative z-10">
                  <CardTitle className="text-[#FFFFFF] flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📊</span>
                    </div>
                    <span>Performance Radar</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="metric" stroke="#e5e7eb" />
                    <PolarRadiusAxis domain={[0, 100]} stroke="#e5e7eb" />
                    {selectedTools.map((tool, index) => (
                      <Radar
                        key={tool.name}
                        name={tool.name}
                        dataKey={tool.name}
                        stroke={index === 0 ? '#6366f1' : index === 1 ? '#10b981' : '#f59e0b'}
                        fill={index === 0 ? '#6366f1' : index === 1 ? '#10b981' : '#f59e0b'}
                        fillOpacity={0.2}
                      />
                    ))}
                  </RadarChart>
                </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Trend Analysis */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 via-blue-500 to-purple-500 rounded-2xl opacity-15 blur-lg"></div>
              
              <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl shadow-2xl shadow-green-500/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 rounded-2xl"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-[#FFFFFF] flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">📈</span>
                  </div>
                  <span>Popularity Trends (Last 6 Months)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#e5e7eb" />
                    <YAxis stroke="#e5e7eb" />
                    {selectedTools.map((tool, index) => (
                      <Line
                        key={tool.name}
                        type="monotone"
                        dataKey={tool.name}
                        stroke={index === 0 ? '#6366f1' : index === 1 ? '#10b981' : '#f59e0b'}
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
              </Card>
            </div>

            {/* Feature Comparison Table */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-2xl opacity-15 blur-lg"></div>
              
              <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl shadow-2xl shadow-purple-500/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-2xl"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-[#FFFFFF] flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                  <span>Feature Comparison</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[#FFFFFF]">Feature</TableHead>
                      {selectedTools.map((tool) => (
                        <TableHead key={tool.name} className="text-[#FFFFFF] text-center">{tool.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.keys(selectedTools[0]?.features || {}).map((feature) => (
                      <TableRow key={feature}>
                        <TableCell className="text-[#FFFFFF]-secondary">{feature}</TableCell>
                        {selectedTools.map((tool) => (
                          <TableCell key={tool.name} className="text-center">
                            {tool.features[feature] ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              </Card>
            </div>

            {/* Statistics Comparison */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 via-yellow-500 to-red-500 rounded-2xl opacity-15 blur-lg"></div>
              
              <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl shadow-2xl shadow-orange-500/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-yellow-500/5 rounded-2xl"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-[#FFFFFF] flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">📊</span>
                  </div>
                  <span>Key Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[#FFFFFF]">Metric</TableHead>
                        {selectedTools.map((tool) => (
                          <TableHead key={tool.name} className="text-[#FFFFFF] text-center">{tool.name}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-[#FFFFFF]-secondary">GitHub Stars</TableCell>
                        {selectedTools.map((tool) => (
                          <TableCell key={tool.name} className="text-center text-[#FFFFFF]">{tool.stats.githubStars}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-[#FFFFFF]-secondary">Weekly Downloads</TableCell>
                        {selectedTools.map((tool) => (
                          <TableCell key={tool.name} className="text-center text-[#FFFFFF]">{tool.stats.npmDownloads}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-[#FFFFFF]-secondary">Contributors</TableCell>
                        {selectedTools.map((tool) => (
                          <TableCell key={tool.name} className="text-center text-[#FFFFFF]">{tool.stats.contributors}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-[#FFFFFF]-secondary">Open Issues</TableCell>
                        {selectedTools.map((tool) => (
                          <TableCell key={tool.name} className="text-center text-[#FFFFFF]">{tool.stats.issues}</TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareTools;
