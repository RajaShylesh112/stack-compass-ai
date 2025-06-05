
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, Zap, Users, Shield, TrendingUp, Star, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const formSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  projectType: z.string().min(1, 'Please select a project type'),
  projectSize: z.string().min(1, 'Please select project size'),
  programmingLanguages: z.array(z.string()).min(1, 'Select at least one language'),
  deploymentEnvironment: z.string().min(1, 'Please select deployment environment'),
  priorities: z.array(z.string()).min(1, 'Select at least one priority'),
  teamSize: z.array(z.number()),
  timeline: z.string().min(1, 'Please select timeline'),
  budget: z.string().min(1, 'Please select budget range'),
  additionalRequirements: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface TechStack {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  pros: string[];
  cons: string[];
  performanceScore: number;
  communityScore: number;
  learningCurve: 'Easy' | 'Medium' | 'Hard';
  suitability: number;
}

const AIRecommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<TechStack[]>([]);
  const [showResults, setShowResults] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      projectType: '',
      projectSize: '',
      programmingLanguages: [],
      deploymentEnvironment: '',
      priorities: [],
      teamSize: [3],
      timeline: '',
      budget: '',
      additionalRequirements: '',
    },
  });

  const generateRecommendations = async (data: FormData) => {
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRecommendations: TechStack[] = [
      {
        id: '1',
        name: 'Modern React Stack',
        description: 'React + TypeScript + Next.js + Tailwind CSS + Supabase',
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
        pros: ['Fast development', 'Great developer experience', 'Strong ecosystem'],
        cons: ['Learning curve for beginners', 'Rapid changes in ecosystem'],
        performanceScore: 92,
        communityScore: 95,
        learningCurve: 'Medium',
        suitability: 94,
      },
      {
        id: '2',
        name: 'Full-Stack JavaScript',
        description: 'Node.js + Express + MongoDB + React + Socket.io',
        technologies: ['Node.js', 'Express', 'MongoDB', 'React', 'Socket.io'],
        pros: ['Single language', 'Real-time capabilities', 'Flexible NoSQL'],
        cons: ['Performance limitations', 'Callback complexity'],
        performanceScore: 85,
        communityScore: 90,
        learningCurve: 'Easy',
        suitability: 88,
      },
      {
        id: '3',
        name: 'Enterprise Java',
        description: 'Spring Boot + PostgreSQL + Angular + Docker',
        technologies: ['Spring Boot', 'PostgreSQL', 'Angular', 'Docker'],
        pros: ['Enterprise-ready', 'Robust architecture', 'Strong typing'],
        cons: ['Verbose syntax', 'Slower development'],
        performanceScore: 95,
        communityScore: 88,
        learningCurve: 'Hard',
        suitability: 82,
      },
    ];
    
    setRecommendations(mockRecommendations);
    setIsLoading(false);
    setShowResults(true);
    toast.success('AI recommendations generated successfully!');
  };

  const onSubmit = (data: FormData) => {
    generateRecommendations(data);
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    const currentLanguages = form.getValues('programmingLanguages');
    if (checked) {
      form.setValue('programmingLanguages', [...currentLanguages, language]);
    } else {
      form.setValue('programmingLanguages', currentLanguages.filter(l => l !== language));
    }
  };

  const handlePriorityChange = (priority: string, checked: boolean) => {
    const currentPriorities = form.getValues('priorities');
    if (checked) {
      form.setValue('priorities', [...currentPriorities, priority]);
    } else {
      form.setValue('priorities', currentPriorities.filter(p => p !== priority));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-primary to-secondary">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 gradient-icon mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-text font-poppins">
              Get AI Recommendations
            </h1>
          </div>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Let our AI analyze your project requirements and suggest the perfect tech stack tailored to your needs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <Card className="neumorphic-card">
            <CardHeader>
              <CardTitle className="text-2xl text-text flex items-center">
                <Sparkles className="w-6 h-6 gradient-icon mr-2" />
                Project Requirements
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Tell us about your project to get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text">Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My awesome project" {...field} className="bg-secondary border-gray-600 text-text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text">Project Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-secondary border-gray-600 text-text">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web-app">Web Application</SelectItem>
                            <SelectItem value="mobile-app">Mobile Application</SelectItem>
                            <SelectItem value="api">API/Backend Service</SelectItem>
                            <SelectItem value="desktop-app">Desktop Application</SelectItem>
                            <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
                            <SelectItem value="dashboard">Dashboard/Analytics</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text">Project Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-secondary border-gray-600 text-text">
                              <SelectValue placeholder="Select project size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="small">Small (MVP/Prototype)</SelectItem>
                            <SelectItem value="medium">Medium (Production App)</SelectItem>
                            <SelectItem value="large">Large (Enterprise Scale)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <FormLabel className="text-text">Programming Languages (Select all that apply)</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Ruby', 'PHP'].map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                          />
                          <label htmlFor={language} className="text-text-secondary text-sm">
                            {language}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="deploymentEnvironment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text">Deployment Environment</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-secondary border-gray-600 text-text">
                              <SelectValue placeholder="Select deployment environment" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cloud">Cloud (AWS, GCP, Azure)</SelectItem>
                            <SelectItem value="serverless">Serverless</SelectItem>
                            <SelectItem value="on-premise">On-Premise</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <FormLabel className="text-text">Priorities (Select all that apply)</FormLabel>
                    <div className="grid grid-cols-1 gap-2">
                      {['Performance', 'Security', 'Scalability', 'Development Speed', 'Cost Efficiency', 'Maintainability'].map((priority) => (
                        <div key={priority} className="flex items-center space-x-2">
                          <Checkbox
                            id={priority}
                            onCheckedChange={(checked) => handlePriorityChange(priority, checked as boolean)}
                          />
                          <label htmlFor={priority} className="text-text-secondary text-sm">
                            {priority}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="teamSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text">Team Size: {field.value[0]} developers</FormLabel>
                        <FormControl>
                          <Slider
                            min={1}
                            max={20}
                            step={1}
                            value={field.value}
                            onValueChange={field.onChange}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text">Timeline</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-secondary border-gray-600 text-text">
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-3-months">1-3 months</SelectItem>
                              <SelectItem value="3-6-months">3-6 months</SelectItem>
                              <SelectItem value="6-12-months">6-12 months</SelectItem>
                              <SelectItem value="12-months">12+ months</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text">Budget Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-secondary border-gray-600 text-text">
                                <SelectValue placeholder="Select budget" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="minimal">Minimal ($0-5k)</SelectItem>
                              <SelectItem value="moderate">Moderate ($5k-25k)</SelectItem>
                              <SelectItem value="substantial">Substantial ($25k-100k)</SelectItem>
                              <SelectItem value="enterprise">Enterprise ($100k+)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text">Additional Requirements (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific requirements, constraints, or preferences..."
                            {...field}
                            className="bg-secondary border-gray-600 text-text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-accent hover:bg-accent/90 text-white py-3 text-lg font-medium"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing Requirements...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Brain className="w-5 h-5 mr-2" />
                        Get AI Recommendations
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {showResults && (
              <Card className="neumorphic-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-text flex items-center">
                    <TrendingUp className="w-6 h-6 gradient-icon mr-2" />
                    AI Recommendations
                  </CardTitle>
                  <CardDescription className="text-text-secondary">
                    Top tech stacks based on your requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {recommendations.map((stack, index) => (
                    <div key={stack.id} className="relative">
                      <Card className="bg-secondary border border-gray-700 hover:border-accent/50 transition-all duration-200">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center mb-2">
                                <Badge variant="secondary" className="bg-accent text-white text-xs mr-2">
                                  #{index + 1}
                                </Badge>
                                <CardTitle className="text-lg text-text">{stack.name}</CardTitle>
                              </div>
                              <CardDescription className="text-text-secondary">
                                {stack.description}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-accent">{stack.suitability}%</div>
                              <div className="text-xs text-text-secondary">Match</div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {stack.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="flex items-center justify-center mb-1">
                                <Zap className="w-4 h-4 text-yellow-400 mr-1" />
                                <span className="text-sm font-medium text-text">{stack.performanceScore}</span>
                              </div>
                              <div className="text-xs text-text-secondary">Performance</div>
                            </div>
                            <div>
                              <div className="flex items-center justify-center mb-1">
                                <Users className="w-4 h-4 text-blue-400 mr-1" />
                                <span className="text-sm font-medium text-text">{stack.communityScore}</span>
                              </div>
                              <div className="text-xs text-text-secondary">Community</div>
                            </div>
                            <div>
                              <div className="flex items-center justify-center mb-1">
                                <Star className="w-4 h-4 text-green-400 mr-1" />
                                <span className="text-sm font-medium text-text">{stack.learningCurve}</span>
                              </div>
                              <div className="text-xs text-text-secondary">Learning</div>
                            </div>
                          </div>

                          <Separator className="bg-gray-700" />

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-green-400 mb-2">Pros</h4>
                              <ul className="text-xs text-text-secondary space-y-1">
                                {stack.pros.map((pro, i) => (
                                  <li key={i}>• {pro}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-orange-400 mb-2">Cons</h4>
                              <ul className="text-xs text-text-secondary space-y-1">
                                {stack.cons.map((con, i) => (
                                  <li key={i}>• {con}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-white">
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Compare This Stack
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}

                  <div className="text-center pt-6">
                    <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-3">
                      Compare All Recommendations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {!showResults && (
              <Card className="neumorphic-card">
                <CardContent className="py-12 text-center">
                  <Brain className="w-16 h-16 gradient-icon mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-text mb-2">
                    Ready to Get Recommendations?
                  </h3>
                  <p className="text-text-secondary">
                    Fill out the form to receive AI-powered tech stack suggestions tailored to your project
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIRecommendations;
