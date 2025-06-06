
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import Header from '@/components/Header';

const CompatibilityExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock compatibility data
  const compatibilityMatrix = {
    'Next.js': {
      'Supabase': { status: 'full', notes: 'Perfect integration with built-in auth' },
      'Firebase': { status: 'warning', notes: 'Some SSR limitations' },
      'MongoDB': { status: 'full', notes: 'Works well with Mongoose' },
      'PostgreSQL': { status: 'full', notes: 'Excellent with Prisma ORM' },
      'Vercel': { status: 'full', notes: 'Made by the same team' },
      'AWS': { status: 'warning', notes: 'Requires custom configuration' }
    },
    'React': {
      'Supabase': { status: 'full', notes: 'Great client-side integration' },
      'Firebase': { status: 'full', notes: 'Excellent real-time features' },
      'MongoDB': { status: 'full', notes: 'Works with any backend' },
      'PostgreSQL': { status: 'full', notes: 'Backend-agnostic' },
      'Vercel': { status: 'full', notes: 'Static exports work great' },
      'AWS': { status: 'full', notes: 'S3 + CloudFront deployment' }
    },
    'Django': {
      'Supabase': { status: 'warning', notes: 'Limited to REST API usage' },
      'Firebase': { status: 'not-recommended', notes: 'Conflicting auth systems' },
      'MongoDB': { status: 'warning', notes: 'Use MongoEngine instead of ORM' },
      'PostgreSQL': { status: 'full', notes: 'Default Django database' },
      'Vercel': { status: 'warning', notes: 'Serverless limitations' },
      'AWS': { status: 'full', notes: 'EC2 + RDS recommended' }
    },
    'Express.js': {
      'Supabase': { status: 'full', notes: 'Easy REST API integration' },
      'Firebase': { status: 'full', notes: 'Admin SDK works perfectly' },
      'MongoDB': { status: 'full', notes: 'Classic MEAN/MERN stack' },
      'PostgreSQL': { status: 'full', notes: 'Use with Sequelize or Prisma' },
      'Vercel': { status: 'full', notes: 'Serverless functions' },
      'AWS': { status: 'full', notes: 'Lambda or EC2 deployment' }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'full':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'not-recommended':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'full':
        return 'Fully Compatible';
      case 'warning':
        return 'Works with Caveats';
      case 'not-recommended':
        return 'Not Recommended';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'full':
        return 'bg-green-500/20 text-green-400';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'not-recommended':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const technologies = ['Next.js', 'React', 'Django', 'Express.js'];
  const services = ['Supabase', 'Firebase', 'MongoDB', 'PostgreSQL', 'Vercel', 'AWS'];

  const filteredTechnologies = technologies.filter(tech =>
    tech.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent/20 to-purple-600/20 px-4 py-2 rounded-full mb-4">
            <Search className="w-5 h-5 text-accent" />
            <span className="text-accent font-medium">Compatibility Insights</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground  mb-4">
            Technology Compatibility Explorer
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Discover how well different technologies work together and avoid common integration pitfalls.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-secondary" />
              <Input
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-gray-600 text-foreground"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-secondary border-gray-600 text-foreground">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-secondary border-gray-600">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="database">Database</SelectItem>
              <SelectItem value="hosting">Hosting</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Compatibility Matrix */}
        <Card className="neumorphic-card border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-foreground ">Compatibility Matrix</CardTitle>
            <p className="text-foreground-secondary">
              Click on any cell to see detailed compatibility notes and recommendations.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground font-medium">Framework/Library</TableHead>
                    {services.map((service) => (
                      <TableHead key={service} className="text-center text-foreground font-medium min-w-32">
                        {service}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTechnologies.map((tech) => (
                    <TableRow key={tech}>
                      <TableCell className="font-medium text-foreground">{tech}</TableCell>
                      {services.map((service) => {
                        const compatibility = compatibilityMatrix[tech]?.[service];
                        return (
                          <TableCell key={service} className="text-center">
                            {compatibility ? (
                              <div className="flex flex-col items-center space-y-1">
                                {getStatusIcon(compatibility.status)}
                                <Badge className={`text-xs ${getStatusColor(compatibility.status)}`}>
                                  {getStatusText(compatibility.status)}
                                </Badge>
                              </div>
                            ) : (
                              <Badge className="bg-gray-500/20 text-gray-400 text-xs">
                                Not Tested
                              </Badge>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="neumorphic-card border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-foreground ">Compatibility Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-foreground font-medium">Fully Compatible</p>
                  <p className="text-foreground-secondary text-sm">Works seamlessly without issues</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-foreground font-medium">Works with Caveats</p>
                  <p className="text-foreground-secondary text-sm">Requires additional configuration</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <XCircle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-foreground font-medium">Not Recommended</p>
                  <p className="text-foreground-secondary text-sm">Known conflicts or limitations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Combinations */}
        <Card className="neumorphic-card border-0">
          <CardHeader>
            <CardTitle className="text-foreground ">Popular Compatible Combinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Modern JAMstack', techs: ['Next.js', 'Supabase', 'Vercel'], rating: 'Excellent' },
                { name: 'Classic MERN', techs: ['React', 'Express.js', 'MongoDB'], rating: 'Very Good' },
                { name: 'Enterprise Django', techs: ['Django', 'PostgreSQL', 'AWS'], rating: 'Excellent' },
                { name: 'Rapid Prototype', techs: ['React', 'Firebase', 'Vercel'], rating: 'Good' },
                { name: 'Full-stack JS', techs: ['Next.js', 'MongoDB', 'Vercel'], rating: 'Very Good' },
                { name: 'Python Backend', techs: ['Django', 'PostgreSQL', 'AWS'], rating: 'Excellent' }
              ].map((combo, index) => (
                <div key={index} className="border border-gray-600 rounded-lg p-4 hover:border-accent/50 transition-colors">
                  <h3 className="text-foreground font-medium mb-2">{combo.name}</h3>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {combo.techs.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Badge className={`text-xs ${
                    combo.rating === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                    combo.rating === 'Very Good' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {combo.rating}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompatibilityExplorer;
