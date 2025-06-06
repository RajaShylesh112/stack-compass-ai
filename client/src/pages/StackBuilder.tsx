
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Wand2, BarChart3, DollarSign, Zap, Shield, Users } from 'lucide-react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';

const StackBuilder = () => {
  const [stackName, setStackName] = useState('');
  const [stackDescription, setStackDescription] = useState('');
  const [selectedTech, setSelectedTech] = useState({
    frontend: '',
    backend: '',
    database: '',
    auth: '',
    hosting: '',
    storage: ''
  });

  const [, setLocation] = useLocation();

  // Technology options with metadata
  const technologies = {
    frontend: [
      { name: 'React', cost: 'Free', performance: 'High', learning: 'Medium', compatible: ['Node.js', 'Express.js'] },
      { name: 'Next.js', cost: 'Free', performance: 'Very High', learning: 'Medium', compatible: ['Vercel', 'Supabase'] },
      { name: 'Vue.js', cost: 'Free', performance: 'High', learning: 'Easy', compatible: ['Nuxt.js', 'Laravel'] },
      { name: 'Angular', cost: 'Free', performance: 'High', learning: 'Hard', compatible: ['NestJS', 'Firebase'] },
      { name: 'Svelte', cost: 'Free', performance: 'Very High', learning: 'Easy', compatible: ['SvelteKit'] }
    ],
    backend: [
      { name: 'Node.js', cost: 'Free', performance: 'High', learning: 'Medium', compatible: ['React', 'MongoDB'] },
      { name: 'Django', cost: 'Free', performance: 'High', learning: 'Medium', compatible: ['PostgreSQL', 'Redis'] },
      { name: 'FastAPI', cost: 'Free', performance: 'Very High', learning: 'Easy', compatible: ['PostgreSQL'] },
      { name: 'Express.js', cost: 'Free', performance: 'High', learning: 'Easy', compatible: ['React', 'MongoDB'] },
      { name: 'NestJS', cost: 'Free', performance: 'High', learning: 'Hard', compatible: ['Angular', 'TypeScript'] }
    ],
    database: [
      { name: 'PostgreSQL', cost: 'Free/Paid', performance: 'Very High', learning: 'Medium', compatible: ['Django', 'Next.js'] },
      { name: 'MongoDB', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['Node.js', 'React'] },
      { name: 'Supabase', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['Next.js', 'React'] },
      { name: 'Firebase', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['React', 'Angular'] },
      { name: 'MySQL', cost: 'Free', performance: 'High', learning: 'Medium', compatible: ['Laravel', 'Django'] }
    ],
    auth: [
      { name: 'Supabase Auth', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['Next.js'] },
      { name: 'Firebase Auth', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['React'] },
      { name: 'Auth0', cost: 'Paid', performance: 'Very High', learning: 'Medium', compatible: ['Any'] },
      { name: 'NextAuth.js', cost: 'Free', performance: 'High', learning: 'Medium', compatible: ['Next.js'] },
      { name: 'Django Auth', cost: 'Free', performance: 'High', learning: 'Easy', compatible: ['Django'] }
    ],
    hosting: [
      { name: 'Vercel', cost: 'Free/Paid', performance: 'Very High', learning: 'Easy', compatible: ['Next.js'] },
      { name: 'Netlify', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['React', 'Vue'] },
      { name: 'AWS', cost: 'Paid', performance: 'Very High', learning: 'Hard', compatible: ['Any'] },
      { name: 'Railway', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['Node.js'] },
      { name: 'Heroku', cost: 'Paid', performance: 'Medium', learning: 'Easy', compatible: ['Django', 'Rails'] }
    ],
    storage: [
      { name: 'AWS S3', cost: 'Paid', performance: 'Very High', learning: 'Medium', compatible: ['Any'] },
      { name: 'Supabase Storage', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['Supabase'] },
      { name: 'Firebase Storage', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['Firebase'] },
      { name: 'Cloudinary', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['Any'] },
      { name: 'Backblaze B2', cost: 'Paid', performance: 'High', learning: 'Medium', compatible: ['Any'] }
    ]
  };

  const handleTechSelection = (category: string, tech: string) => {
    setSelectedTech(prev => ({
      ...prev,
      [category]: tech
    }));
  };

  const getSelectedTechData = (category: string) => {
    const tech = selectedTech[category as keyof typeof selectedTech];
    return technologies[category as keyof typeof technologies]?.find(t => t.name === tech);
  };

  const calculateStackMetrics = () => {
    const selectedTechs = Object.entries(selectedTech).filter(([_, tech]) => tech);
    const totalTechs = selectedTechs.length;
    
    if (totalTechs === 0) return { cost: 0, performance: 0, learning: 0, compatibility: 0 };

    let totalCost = 0;
    let totalPerformance = 0;
    let totalLearning = 0;
    let compatibility = 85; // Base compatibility score

    selectedTechs.forEach(([category, techName]) => {
      const techData = getSelectedTechData(category);
      if (techData) {
        // Cost calculation
        if (techData.cost.includes('Free')) totalCost += 0;
        else if (techData.cost.includes('Paid')) totalCost += 1;

        // Performance calculation
        switch (techData.performance) {
          case 'Very High': totalPerformance += 5; break;
          case 'High': totalPerformance += 4; break;
          case 'Medium': totalPerformance += 3; break;
          default: totalPerformance += 2;
        }

        // Learning curve calculation
        switch (techData.learning) {
          case 'Easy': totalLearning += 3; break;
          case 'Medium': totalLearning += 2; break;
          case 'Hard': totalLearning += 1; break;
        }
      }
    });

    return {
      cost: Math.round((totalCost / totalTechs) * 100),
      performance: Math.round((totalPerformance / totalTechs) * 20),
      learning: Math.round((totalLearning / totalTechs) * 33),
      compatibility
    };
  };

  const metrics = calculateStackMetrics();

  const handleSaveStack = () => {
    console.log('Saving stack:', {
      name: stackName,
      description: stackDescription,
      technologies: selectedTech
    });
    setLocation('/stacks');
  };

  const handleAISuggestion = () => {
    console.log('Getting AI suggestions for current stack');
    // Implement AI suggestion logic
  };

  const handleCompare = () => {
    setLocation('/compare/stacks');
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text font-poppins mb-2">
            Build Your Tech Stack
          </h1>
          <p className="text-text-secondary">
            Design your perfect technology stack with real-time insights and recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stack Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="neumorphic-card border-0">
              <CardHeader>
                <CardTitle className="text-text font-poppins">Stack Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="stackName" className="text-text">Stack Name</Label>
                  <Input
                    id="stackName"
                    placeholder="My Awesome Stack"
                    value={stackName}
                    onChange={(e) => setStackName(e.target.value)}
                    className="bg-secondary border-gray-600 text-text"
                  />
                </div>
                <div>
                  <Label htmlFor="stackDescription" className="text-text">Description</Label>
                  <Textarea
                    id="stackDescription"
                    placeholder="Describe your project and requirements..."
                    value={stackDescription}
                    onChange={(e) => setStackDescription(e.target.value)}
                    className="bg-secondary border-gray-600 text-text"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Technology Selection */}
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-secondary">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="database">Database</TabsTrigger>
                <TabsTrigger value="auth">Auth</TabsTrigger>
                <TabsTrigger value="hosting">Hosting</TabsTrigger>
                <TabsTrigger value="storage">Storage</TabsTrigger>
              </TabsList>

              {Object.entries(technologies).map(([category, techs]) => (
                <TabsContent key={category} value={category}>
                  <Card className="neumorphic-card border-0">
                    <CardHeader>
                      <CardTitle className="text-text font-poppins capitalize">{category} Technologies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {techs.map((tech) => (
                          <div
                            key={tech.name}
                            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                              selectedTech[category as keyof typeof selectedTech] === tech.name
                                ? 'border-accent bg-accent/10'
                                : 'border-gray-600 hover:border-gray-500'
                            }`}
                            onClick={() => handleTechSelection(category, tech.name)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-text font-medium">{tech.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {tech.cost}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-text-secondary">
                              <div>Performance: {tech.performance}</div>
                              <div>Learning: {tech.learning}</div>
                            </div>
                            {tech.compatible.length > 0 && (
                              <div className="mt-2">
                                <div className="text-xs text-text-secondary mb-1">Compatible with:</div>
                                <div className="flex flex-wrap gap-1">
                                  {tech.compatible.slice(0, 2).map((comp) => (
                                    <Badge key={comp} className="text-xs bg-blue-500/20 text-blue-400">
                                      {comp}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Stack Summary & Metrics */}
          <div className="space-y-6">
            {/* Current Stack */}
            <Card className="neumorphic-card border-0">
              <CardHeader>
                <CardTitle className="text-text font-poppins">Current Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(selectedTech).map(([category, tech]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-text-secondary capitalize">{category}:</span>
                      <span className="text-text font-medium">
                        {tech || 'Not selected'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stack Metrics */}
            <Card className="neumorphic-card border-0">
              <CardHeader>
                <CardTitle className="text-text font-poppins">Stack Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-text-secondary">Cost Efficiency</span>
                    </div>
                    <span className="text-text font-medium">{100 - metrics.cost}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-text-secondary">Performance</span>
                    </div>
                    <span className="text-text font-medium">{metrics.performance}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-text-secondary">Learning Ease</span>
                    </div>
                    <span className="text-text font-medium">{metrics.learning}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-purple-500" />
                      <span className="text-text-secondary">Compatibility</span>
                    </div>
                    <span className="text-text font-medium">{metrics.compatibility}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                onClick={handleSaveStack}
                className="w-full bg-accent hover:bg-accent/90 text-white"
                disabled={!stackName || Object.values(selectedTech).filter(t => t).length === 0}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Stack
              </Button>
              <Button 
                onClick={handleAISuggestion}
                variant="outline"
                className="w-full border-gray-600 text-text-secondary hover:text-text"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Get AI Suggestions
              </Button>
              <Button 
                onClick={handleCompare}
                variant="outline"
                className="w-full border-gray-600 text-text-secondary hover:text-text"
                disabled={Object.values(selectedTech).filter(t => t).length === 0}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Compare Stack
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackBuilder;
