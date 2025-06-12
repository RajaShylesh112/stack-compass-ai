'use client';

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
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StackBuilderPage() {
  const [stackName, setStackName] = useState('');
  const [stackDescription, setStackDescription] = useState('');
  const [selectedTech, setSelectedTech] = useState({
    frontend: '',
    backend: '',
    database: '',
    auth: '',
    hosting: ''
  });

  const router = useRouter();

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
      { name: 'NextAuth.js', cost: 'Free', performance: 'High', learning: 'Medium', compatible: ['Next.js'] },
      { name: 'Firebase Auth', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['React', 'Angular'] },
      { name: 'Supabase Auth', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['Next.js', 'React'] },
      { name: 'Auth0', cost: 'Paid', performance: 'High', learning: 'Medium', compatible: ['Any'] },
      { name: 'Clerk', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['Next.js', 'React'] }
    ],
    hosting: [
      { name: 'Vercel', cost: 'Free/Paid', performance: 'Very High', learning: 'Easy', compatible: ['Next.js', 'React'] },
      { name: 'Netlify', cost: 'Free/Paid', performance: 'High', learning: 'Easy', compatible: ['React', 'Vue.js'] },
      { name: 'AWS', cost: 'Paid', performance: 'Very High', learning: 'Hard', compatible: ['Any'] },
      { name: 'Railway', cost: 'Free/Paid', performance: 'High', learning: 'Medium', compatible: ['Node.js', 'Python'] },
      { name: 'Render', cost: 'Free/Paid', performance: 'High', learning: 'Medium', compatible: ['Any'] }
    ]
  };

  const handleTechSelect = (category: string, value: string) => {
    setSelectedTech(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSaveStack = () => {
    // In a real app, you would save this to your database
    console.log('Saving stack:', { stackName, stackDescription, selectedTech });
    // Redirect to the workspace
    router.push('/workspace');
  };

  const getCompatibleTech = (category: string) => {
    const selected = Object.entries(selectedTech).find(([_, value]) => value);
    if (!selected) return technologies[category as keyof typeof technologies];

    const [selectedCategory, selectedValue] = selected;
    if (selectedCategory === category) return technologies[category as keyof typeof technologies];

    const selectedTechItem = technologies[selectedCategory as keyof typeof technologies]
      .find(tech => tech.name === selectedValue);

    if (!selectedTechItem) return technologies[category as keyof typeof technologies];

    return technologies[category as keyof typeof technologies]
      .filter(tech =>
        selectedTechItem.compatible.some(compatible =>
          tech.name === compatible ||
          tech.compatible.includes(selectedValue)
        )
      );
  };

  const isStackComplete = () => {
    return (
      stackName.trim() !== '' &&
      Object.values(selectedTech).every(tech => tech !== '')
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Stack Builder</h1>
          <p className="text-muted-foreground">Build and customize your perfect technology stack</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stack Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stack-name">Stack Name</Label>
                  <Input
                    id="stack-name"
                    placeholder="My Awesome Stack"
                    value={stackName}
                    onChange={(e) => setStackName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stack-description">Description</Label>
                  <Textarea
                    id="stack-description"
                    placeholder="Describe your stack and its purpose..."
                    rows={3}
                    value={stackDescription}
                    onChange={(e) => setStackDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="frontend" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="frontend">Frontend</TabsTrigger>
                    <TabsTrigger value="backend">Backend</TabsTrigger>
                    <TabsTrigger value="database">Database</TabsTrigger>
                    <TabsTrigger value="auth">Auth</TabsTrigger>
                    <TabsTrigger value="hosting">Hosting</TabsTrigger>
                  </TabsList>

                  <TabsContent value="frontend" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getCompatibleTech('frontend').map((tech) => (
                        <div
                          key={tech.name}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedTech.frontend === tech.name
                              ? 'border-primary bg-primary/10'
                              : 'hover:bg-accent/50'
                            }`}
                          onClick={() => handleTechSelect('frontend', tech.name)}
                        >
                          <div className="font-medium">{tech.name}</div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <BarChart3 className="h-3.5 w-3.5 mr-1" />
                            {tech.performance}
                            <span className="mx-2">•</span>
                            <DollarSign className="h-3.5 w-3.5 mr-1" />
                            {tech.cost}
                            <span className="mx-2">•</span>
                            <Users className="h-3.5 w-3.5 mr-1" />
                            {tech.learning}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="backend" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getCompatibleTech('backend').map((tech) => (
                        <div
                          key={tech.name}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedTech.backend === tech.name
                              ? 'border-primary bg-primary/10'
                              : 'hover:bg-accent/50'
                            }`}
                          onClick={() => handleTechSelect('backend', tech.name)}
                        >
                          <div className="font-medium">{tech.name}</div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <BarChart3 className="h-3.5 w-3.5 mr-1" />
                            {tech.performance}
                            <span className="mx-2">•</span>
                            <DollarSign className="h-3.5 w-3.5 mr-1" />
                            {tech.cost}
                            <span className="mx-2">•</span>
                            <Users className="h-3.5 w-3.5 mr-1" />
                            {tech.learning}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="database" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getCompatibleTech('database').map((tech) => (
                        <div
                          key={tech.name}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedTech.database === tech.name
                              ? 'border-primary bg-primary/10'
                              : 'hover:bg-accent/50'
                            }`}
                          onClick={() => handleTechSelect('database', tech.name)}
                        >
                          <div className="font-medium">{tech.name}</div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <BarChart3 className="h-3.5 w-3.5 mr-1" />
                            {tech.performance}
                            <span className="mx-2">•</span>
                            <DollarSign className="h-3.5 w-3.5 mr-1" />
                            {tech.cost}
                            <span className="mx-2">•</span>
                            <Users className="h-3.5 w-3.5 mr-1" />
                            {tech.learning}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="auth" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getCompatibleTech('auth').map((tech) => (
                        <div
                          key={tech.name}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedTech.auth === tech.name
                              ? 'border-primary bg-primary/10'
                              : 'hover:bg-accent/50'
                            }`}
                          onClick={() => handleTechSelect('auth', tech.name)}
                        >
                          <div className="font-medium">{tech.name}</div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Shield className="h-3.5 w-3.5 mr-1" />
                            {tech.performance}
                            <span className="mx-2">•</span>
                            <DollarSign className="h-3.5 w-3.5 mr-1" />
                            {tech.cost}
                            <span className="mx-2">•</span>
                            <Users className="h-3.5 w-3.5 mr-1" />
                            {tech.learning}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="hosting" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getCompatibleTech('hosting').map((tech) => (
                        <div
                          key={tech.name}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedTech.hosting === tech.name
                              ? 'border-primary bg-primary/10'
                              : 'hover:bg-accent/50'
                            }`}
                          onClick={() => handleTechSelect('hosting', tech.name)}
                        >
                          <div className="font-medium">{tech.name}</div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Zap className="h-3.5 w-3.5 mr-1" />
                            {tech.performance}
                            <span className="mx-2">•</span>
                            <DollarSign className="h-3.5 w-3.5 mr-1" />
                            {tech.cost}
                            <span className="mx-2">•</span>
                            <Users className="h-3.5 w-3.5 mr-1" />
                            {tech.learning}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stack Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Stack Name</h3>
                  <p className="text-sm text-muted-foreground">
                    {stackName || 'Unnamed Stack'}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {stackDescription || 'No description provided'}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Technologies</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedTech).map(([category, tech]) => (
                      tech && (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{category}:</span>
                          <Badge variant="secondary">{tech || 'Not selected'}</Badge>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full mt-4"
                  disabled={!isStackComplete()}
                  onClick={handleSaveStack}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Stack
                </Button>

                {!isStackComplete() && (
                  <p className="text-xs text-muted-foreground text-center">
                    Please complete all fields to save your stack
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stack Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Popular Stacks</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 hover:bg-accent/50 rounded cursor-pointer">
                      <span className="text-sm">MERN Stack</span>
                      <Button variant="ghost" size="sm" className="h-7">
                        Use
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-accent/50 rounded cursor-pointer">
                      <span className="text-sm">JAMstack</span>
                      <Button variant="ghost" size="sm" className="h-7">
                        Use
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-accent/50 rounded cursor-pointer">
                      <span className="text-sm">Next.js + Supabase</span>
                      <Button variant="ghost" size="sm" className="h-7">
                        Use
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">AI Suggestions</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized stack recommendations based on your project requirements.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Get AI Recommendations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
