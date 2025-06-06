import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Wand2, Sparkles, TrendingUp, Users, Star, ArrowRight, BarChart3, Eye } from 'lucide-react';
import Header from '@/components/Header';
import RecommendationDetails from '@/components/RecommendationDetails';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  projectType: z.string().min(1, 'Project type is required'),
  projectSize: z.string().min(1, 'Project size is required'),
  programmingLanguages: z.array(z.string()).min(1, 'At least one programming language is required'),
  deploymentEnvironment: z.string().min(1, 'Deployment environment is required'),
  priorities: z.array(z.string()).min(1, 'At least one priority is required'),
  budget: z.string().min(1, 'Budget range is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  teamSize: z.string().min(1, 'Team size is required'),
  description: z.string().min(10, 'Please provide a detailed description (minimum 10 characters)'),
});

type FormData = z.infer<typeof formSchema>;

const AIRecommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    technical: false,
    constraints: false,
    priorities: false
  });

  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      projectType: '',
      projectSize: '',
      programmingLanguages: [],
      deploymentEnvironment: '',
      priorities: [],
      budget: '',
      timeline: '',
      teamSize: '',
      description: '',
    },
  });

  const handleLanguageChange = (language: string, checked: boolean) => {
    const currentLanguages = form.getValues('programmingLanguages');
    if (checked) {
      form.setValue('programmingLanguages', [...currentLanguages, language]);
    } else {
      form.setValue('programmingLanguages', currentLanguages.filter(lang => lang !== language));
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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log('Form submitted with data:', data);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRecommendations = [
      {
        id: 1,
        name: 'MERN Stack',
        description: 'A full-stack JavaScript solution using MongoDB, Express.js, React, and Node.js. Perfect for rapid development and scalable web applications.',
        match: 92,
        pros: [
          'Single language (JavaScript) across the entire stack',
          'Large community support and extensive documentation',
          'Excellent for real-time applications',
          'Rich ecosystem with many third-party libraries',
          'Great developer experience with hot reloading'
        ],
        cons: [
          'JavaScript fatigue - many choices can be overwhelming',
          'NoSQL database might not suit all use cases',
          'Performance can be slower than compiled languages',
          'Callback hell if not properly managed'
        ],
        tags: ['Full-Stack', 'JavaScript', 'NoSQL', 'Real-time', 'Popular'],
        reason: 'Ideal for your web application with real-time features and JavaScript preference.',
        technologies: ['MongoDB', 'Express.js', 'React', 'Node.js']
      },
      {
        id: 2,
        name: 'Django + React',
        description: 'A robust combination of Django\'s powerful backend framework with React\'s dynamic frontend capabilities.',
        match: 88,
        pros: [
          'Django\'s built-in admin interface and ORM',
          'Strong security features out of the box',
          'Excellent for data-heavy applications',
          'Python\'s readability and extensive libraries',
          'Great testing framework'
        ],
        cons: [
          'Two different languages to maintain',
          'Can be overkill for simple applications',
          'Learning curve for Django concepts',
          'More complex deployment process'
        ],
        tags: ['Backend-Heavy', 'Python', 'SQL', 'Security', 'Admin Interface'],
        reason: 'Great choice for data-driven applications requiring strong backend logic.',
        technologies: ['Django', 'React', 'PostgreSQL', 'Redis']
      },
      {
        id: 3,
        name: 'Next.js + Supabase',
        description: 'Modern full-stack solution combining Next.js for frontend/backend with Supabase for database and authentication.',
        match: 85,
        pros: [
          'Built-in authentication and real-time features',
          'Excellent developer experience',
          'Automatic API generation',
          'Great performance with edge functions',
          'TypeScript support throughout'
        ],
        cons: [
          'Vendor lock-in with Supabase',
          'Limited customization of backend logic',
          'Newer ecosystem, fewer resources',
          'Pricing can scale up quickly'
        ],
        tags: ['JAMstack', 'TypeScript', 'Serverless', 'Real-time', 'Modern'],
        reason: 'Perfect for modern applications prioritizing speed and developer experience.',
        technologies: ['Next.js', 'Supabase', 'TypeScript', 'Vercel']
      }
    ];
    
    setRecommendations(mockRecommendations);
    setShowRecommendations(true);
    setIsLoading(false);
  };

  const handleViewDetails = (recommendation: any) => {
    setSelectedRecommendation(recommendation);
  };

  const handleCompare = () => {
    navigate('/compare/stacks');
  };

  if (selectedRecommendation) {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={() => setSelectedRecommendation(null)} 
            variant="outline" 
            className="mb-6 border-gray-600 text-text-secondary hover:text-text"
          >
            ← Back to Recommendations
          </Button>
          <RecommendationDetails 
            recommendation={selectedRecommendation} 
            onCompare={handleCompare}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent/20 to-purple-600/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-accent font-medium">AI-Powered Recommendations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text font-poppins mb-4">
            Get Personalized Tech Stack Suggestions
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Tell us about your project and let our AI recommend the perfect technology stack tailored to your specific needs and constraints.
          </p>
        </div>

        {!showRecommendations ? (
          <div className="max-w-4xl mx-auto">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <Collapsible open={expandedSections.basic} onOpenChange={() => toggleSection('basic')}>
                <CollapsibleTrigger className="w-full">
                  <Card className="neumorphic-card border-0 cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-text font-poppins flex items-center space-x-2">
                          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">1</span>
                          </div>
                          <span>Basic Information</span>
                        </CardTitle>
                        <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${expandedSections.basic ? 'rotate-180' : ''}`} />
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="neumorphic-card border-0 mt-4">
                    <CardContent className="p-6 space-y-6">
                      {/* Project Name */}
                      <div className="space-y-2">
                        <Label htmlFor="projectName" className="text-text font-medium">Project Name</Label>
                        <Input
                          id="projectName"
                          placeholder="My Awesome Project"
                          {...form.register('projectName')}
                          className="bg-secondary border-gray-600 text-text placeholder-text-secondary focus:border-accent focus:ring-accent"
                        />
                        {form.formState.errors.projectName && (
                          <p className="text-red-400 text-sm">{form.formState.errors.projectName.message}</p>
                        )}
                      </div>

                      {/* Project Type */}
                      <div className="space-y-2">
                        <Label htmlFor="projectType" className="text-text font-medium">Project Type</Label>
                        <Select onValueChange={(value) => form.setValue('projectType', value)}>
                          <SelectTrigger className="bg-secondary border-gray-600 text-text">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent className="bg-secondary border-gray-600">
                            <SelectItem value="web-app">Web Application</SelectItem>
                            <SelectItem value="mobile-app">Mobile Application</SelectItem>
                            <SelectItem value="desktop-app">Desktop Application</SelectItem>
                            <SelectItem value="api">REST API</SelectItem>
                            <SelectItem value="microservices">Microservices</SelectItem>
                            <SelectItem value="e-commerce">E-commerce Platform</SelectItem>
                            <SelectItem value="cms">Content Management System</SelectItem>
                            <SelectItem value="dashboard">Analytics Dashboard</SelectItem>
                          </SelectContent>
                        </Select>
                        {form.formState.errors.projectType && (
                          <p className="text-red-400 text-sm">{form.formState.errors.projectType.message}</p>
                        )}
                      </div>

                      {/* Project Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-text font-medium">Project Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your project in detail. What features do you need? Who are your users? What are your goals?"
                          {...form.register('description')}
                          className="bg-secondary border-gray-600 text-text placeholder-text-secondary focus:border-accent focus:ring-accent min-h-[100px]"
                        />
                        {form.formState.errors.description && (
                          <p className="text-red-400 text-sm">{form.formState.errors.description.message}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Technical Requirements */}
              <Collapsible open={expandedSections.technical} onOpenChange={() => toggleSection('technical')}>
                <CollapsibleTrigger className="w-full">
                  <Card className="neumorphic-card border-0 cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-text font-poppins flex items-center space-x-2">
                          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">2</span>
                          </div>
                          <span>Technical Requirements</span>
                        </CardTitle>
                        <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${expandedSections.technical ? 'rotate-180' : ''}`} />
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="neumorphic-card border-0 mt-4">
                    <CardContent className="p-6 space-y-6">
                      {/* Programming Languages */}
                      <div className="space-y-3">
                        <Label className="text-text font-medium">Preferred Programming Languages</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP'].map((language) => (
                            <label key={language} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                onChange={(e) => handleLanguageChange(language, e.target.checked)}
                                className="w-4 h-4 text-accent bg-secondary border-gray-600 rounded focus:ring-accent"
                              />
                              <span className="text-text-secondary">{language}</span>
                            </label>
                          ))}
                        </div>
                        {form.formState.errors.programmingLanguages && (
                          <p className="text-red-400 text-sm">{form.formState.errors.programmingLanguages.message}</p>
                        )}
                      </div>

                      {/* Deployment Environment */}
                      <div className="space-y-2">
                        <Label htmlFor="deploymentEnvironment" className="text-text font-medium">Deployment Environment</Label>
                        <Select onValueChange={(value) => form.setValue('deploymentEnvironment', value)}>
                          <SelectTrigger className="bg-secondary border-gray-600 text-text">
                            <SelectValue placeholder="Select deployment environment" />
                          </SelectTrigger>
                          <SelectContent className="bg-secondary border-gray-600">
                            <SelectItem value="cloud-aws">AWS Cloud</SelectItem>
                            <SelectItem value="cloud-azure">Azure Cloud</SelectItem>
                            <SelectItem value="cloud-gcp">Google Cloud Platform</SelectItem>
                            <SelectItem value="cloud-vercel">Vercel</SelectItem>
                            <SelectItem value="cloud-netlify">Netlify</SelectItem>
                            <SelectItem value="on-premise">On-Premise</SelectItem>
                            <SelectItem value="hybrid">Hybrid Cloud</SelectItem>
                            <SelectItem value="serverless">Serverless</SelectItem>
                          </SelectContent>
                        </Select>
                        {form.formState.errors.deploymentEnvironment && (
                          <p className="text-red-400 text-sm">{form.formState.errors.deploymentEnvironment.message}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Project Constraints */}
              <Collapsible open={expandedSections.constraints} onOpenChange={() => toggleSection('constraints')}>
                <CollapsibleTrigger className="w-full">
                  <Card className="neumorphic-card border-0 cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-text font-poppins flex items-center space-x-2">
                          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">3</span>
                          </div>
                          <span>Project Constraints</span>
                        </CardTitle>
                        <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${expandedSections.constraints ? 'rotate-180' : ''}`} />
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="neumorphic-card border-0 mt-4">
                    <CardContent className="p-6 space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Project Size */}
                        <div className="space-y-2">
                          <Label htmlFor="projectSize" className="text-text font-medium">Project Size & Complexity</Label>
                          <Select onValueChange={(value) => form.setValue('projectSize', value)}>
                            <SelectTrigger className="bg-secondary border-gray-600 text-text">
                              <SelectValue placeholder="Select project size" />
                            </SelectTrigger>
                            <SelectContent className="bg-secondary border-gray-600">
                              <SelectItem value="small">Small (MVP, Prototype)</SelectItem>
                              <SelectItem value="medium">Medium (Growing Product)</SelectItem>
                              <SelectItem value="large">Large (Enterprise Scale)</SelectItem>
                              <SelectItem value="enterprise">Enterprise (Complex Systems)</SelectItem>
                            </SelectContent>
                          </Select>
                          {form.formState.errors.projectSize && (
                            <p className="text-red-400 text-sm">{form.formState.errors.projectSize.message}</p>
                          )}
                        </div>

                        {/* Budget */}
                        <div className="space-y-2">
                          <Label htmlFor="budget" className="text-text font-medium">Budget Range</Label>
                          <Select onValueChange={(value) => form.setValue('budget', value)}>
                            <SelectTrigger className="bg-secondary border-gray-600 text-text">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent className="bg-secondary border-gray-600">
                              <SelectItem value="minimal">Minimal ($0 - $1k)</SelectItem>
                              <SelectItem value="small">Small ($1k - $10k)</SelectItem>
                              <SelectItem value="medium">Medium ($10k - $50k)</SelectItem>
                              <SelectItem value="large">Large ($50k+)</SelectItem>
                              <SelectItem value="enterprise">Enterprise (Custom)</SelectItem>
                            </SelectContent>
                          </Select>
                          {form.formState.errors.budget && (
                            <p className="text-red-400 text-sm">{form.formState.errors.budget.message}</p>
                          )}
                        </div>

                        {/* Timeline */}
                        <div className="space-y-2">
                          <Label htmlFor="timeline" className="text-text font-medium">Development Timeline</Label>
                          <Select onValueChange={(value) => form.setValue('timeline', value)}>
                            <SelectTrigger className="bg-secondary border-gray-600 text-text">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent className="bg-secondary border-gray-600">
                              <SelectItem value="urgent">Urgent (< 1 month)</SelectItem>
                              <SelectItem value="fast">Fast (1-3 months)</SelectItem>
                              <SelectItem value="normal">Normal (3-6 months)</SelectItem>
                              <SelectItem value="extended">Extended (6+ months)</SelectItem>
                            </SelectContent>
                          </Select>
                          {form.formState.errors.timeline && (
                            <p className="text-red-400 text-sm">{form.formState.errors.timeline.message}</p>
                          )}
                        </div>

                        {/* Team Size */}
                        <div className="space-y-2">
                          <Label htmlFor="teamSize" className="text-text font-medium">Development Team Size</Label>
                          <Select onValueChange={(value) => form.setValue('teamSize', value)}>
                            <SelectTrigger className="bg-secondary border-gray-600 text-text">
                              <SelectValue placeholder="Select team size" />
                            </SelectTrigger>
                            <SelectContent className="bg-secondary border-gray-600">
                              <SelectItem value="solo">Solo Developer</SelectItem>
                              <SelectItem value="small">Small Team (2-5)</SelectItem>
                              <SelectItem value="medium">Medium Team (6-15)</SelectItem>
                              <SelectItem value="large">Large Team (16+)</SelectItem>
                            </SelectContent>
                          </Select>
                          {form.formState.errors.teamSize && (
                            <p className="text-red-400 text-sm">{form.formState.errors.teamSize.message}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Priorities */}
              <Collapsible open={expandedSections.priorities} onOpenChange={() => toggleSection('priorities')}>
                <CollapsibleTrigger className="w-full">
                  <Card className="neumorphic-card border-0 cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-text font-poppins flex items-center space-x-2">
                          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">4</span>
                          </div>
                          <span>Priorities & Goals</span>
                        </CardTitle>
                        <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${expandedSections.priorities ? 'rotate-180' : ''}`} />
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="neumorphic-card border-0 mt-4">
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-3">
                        <Label className="text-text font-medium">What are your top priorities?</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            'High Performance',
                            'Security',
                            'Scalability',
                            'Developer Experience',
                            'Cost Effectiveness',
                            'Quick Time to Market',
                            'Easy Maintenance',
                            'Community Support'
                          ].map((priority) => (
                            <label key={priority} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                onChange={(e) => handlePriorityChange(priority, e.target.checked)}
                                className="w-4 h-4 text-accent bg-secondary border-gray-600 rounded focus:ring-accent"
                              />
                              <span className="text-text-secondary">{priority}</span>
                            </label>
                          ))}
                        </div>
                        {form.formState.errors.priorities && (
                          <p className="text-red-400 text-sm">{form.formState.errors.priorities.message}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Submit Button */}
              <div className="text-center pt-8">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-accent to-purple-600 hover:from-accent/90 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing Your Project...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Wand2 className="w-5 h-5" />
                      <span>Get AI Recommendations</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text font-poppins mb-4">AI Recommendations Ready!</h2>
              <p className="text-text-secondary">Based on your requirements, here are the top tech stacks we recommend:</p>
            </div>

            <div className="grid gap-6 mb-8">
              {recommendations.map((rec, index) => (
                <Card key={rec.id} className="neumorphic-card border-0 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-accent to-purple-600 rounded-xl flex items-center justify-center">
                              <span className="text-white font-bold text-lg">#{index + 1}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-2xl font-bold text-text font-poppins">{rec.name}</h3>
                              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                                {rec.match}% Match
                              </Badge>
                            </div>
                            <p className="text-text-secondary text-lg mb-4">{rec.description}</p>
                            <p className="text-accent font-medium mb-4">💡 {rec.reason}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {rec.tags.map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="bg-accent/20 text-accent">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span className="text-text-secondary text-sm">High Performance</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-blue-500" />
                                <span className="text-text-secondary text-sm">Strong Community</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-text-secondary text-sm">Well Established</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-3 lg:flex-shrink-0">
                        <Button 
                          onClick={() => handleViewDetails(rec)}
                          className="bg-accent hover:bg-accent/90 text-white flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleCompare}
                          className="border-gray-600 text-text-secondary hover:text-text flex items-center space-x-2"
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>Compare</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                onClick={() => setShowRecommendations(false)}
                variant="outline"
                className="border-gray-600 text-text-secondary hover:text-text"
              >
                ← Start New Analysis
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendations;
