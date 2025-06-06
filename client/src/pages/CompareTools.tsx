
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
    <div className="min-h-screen bg-primary">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground  mb-4">Compare Tools & Frameworks</h1>
          <p className="text-foreground-secondary text-lg">Compare technologies that serve the same purpose</p>
        </div>

        {/* Category Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.keys(toolCategories).map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                onClick={() => setCategory(cat)}
                className={category === cat ? "bg-accent text-white" : "border-gray-600 text-foreground-secondary"}
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-secondary w-4 h-4" />
              <Input
                placeholder="Search tools..."
                className="pl-10 bg-secondary border border-gray-600 rounded-xl text-foreground"
              />
            </div>
            <span className="text-foreground-secondary text-sm">
              {selectedTools.length}/3 selected
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {tools.map((tool) => (
              <Card key={tool.id} className="neumorphic-card border-0">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground ">{tool.name}</h3>
                      <p className="text-foreground-secondary text-sm">{tool.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-foreground-secondary">
                        <span>v{tool.version}</span>
                        <span>{tool.license}</span>
                        <span>Since {tool.firstRelease}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAddTool(tool)}
                      disabled={selectedTools.length >= 3 || selectedTools.find(t => t.id === tool.id)}
                      className="bg-accent hover:bg-accent/90 text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="text-foreground-secondary">{tool.stats.githubStars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-3 h-3 text-green-500" />
                      <span className="text-foreground-secondary">{tool.stats.npmDownloads}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Tools */}
        {selectedTools.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground  mb-4">Selected for Comparison</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {selectedTools.map((tool) => (
                <Card key={tool.id} className="neumorphic-card border-0">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">{tool.name}</h3>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveTool(tool.id)}
                      >
                        ×
                      </Button>
                    </div>
                    <p className="text-foreground-secondary text-sm">{tool.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Results */}
        {selectedTools.length >= 2 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground  text-center">Comparison Results</h2>
            
            {/* Radar Chart */}
            <Card className="neumorphic-card border-0">
              <CardHeader>
                <CardTitle className="text-foreground ">Performance Radar</CardTitle>
              </CardHeader>
              <CardContent>
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

            {/* Trend Analysis */}
            <Card className="neumorphic-card border-0">
              <CardHeader>
                <CardTitle className="text-foreground ">Popularity Trends (Last 6 Months)</CardTitle>
              </CardHeader>
              <CardContent>
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

            {/* Feature Comparison Table */}
            <Card className="neumorphic-card border-0">
              <CardHeader>
                <CardTitle className="text-foreground ">Feature Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">Feature</TableHead>
                      {selectedTools.map((tool) => (
                        <TableHead key={tool.name} className="text-foreground text-center">{tool.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.keys(selectedTools[0]?.features || {}).map((feature) => (
                      <TableRow key={feature}>
                        <TableCell className="text-foreground-secondary">{feature}</TableCell>
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

            {/* Statistics Comparison */}
            <Card className="neumorphic-card border-0">
              <CardHeader>
                <CardTitle className="text-foreground ">Key Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-foreground">Metric</TableHead>
                        {selectedTools.map((tool) => (
                          <TableHead key={tool.name} className="text-foreground text-center">{tool.name}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-foreground-secondary">GitHub Stars</TableCell>
                        {selectedTools.map((tool) => (
                          <TableCell key={tool.name} className="text-center text-foreground">{tool.stats.githubStars}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-foreground-secondary">Weekly Downloads</TableCell>
                        {selectedTools.map((tool) => (
                          <TableCell key={tool.name} className="text-center text-foreground">{tool.stats.npmDownloads}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-foreground-secondary">Contributors</TableCell>
                        {selectedTools.map((tool) => (
                          <TableCell key={tool.name} className="text-center text-foreground">{tool.stats.contributors}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-foreground-secondary">Open Issues</TableCell>
                        {selectedTools.map((tool) => (
                          <TableCell key={tool.name} className="text-center text-foreground">{tool.stats.issues}</TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareTools;
