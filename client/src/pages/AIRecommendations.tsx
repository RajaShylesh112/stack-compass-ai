import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { 
  Sparkles, 
  Wand2, 
  Eye, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Star
} from 'lucide-react';

const formSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  projectType: z.string().min(1, 'Project type is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  programmingLanguages: z.array(z.string()).min(1, 'Select at least one programming language'),
  deploymentEnvironment: z.string().min(1, 'Deployment environment is required'),
  projectSize: z.string().min(1, 'Project size is required'),
  budget: z.string().min(1, 'Budget range is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  teamSize: z.string().min(1, 'Team size is required'),
  priorities: z.array(z.string()).min(1, 'Select at least one priority'),
});

type FormData = z.infer<typeof formSchema>;

const AIRecommendations = () => {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  // Parse URL parameters for pre-filling
  const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      projectType: params.get('projectType') || '',
      teamSize: params.get('teamSize') || '',
      timeline: params.get('timeline') || '',
      prefilled: params.get('prefilled') === 'true'
    };
  };

  const urlParams = getUrlParams();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      projectType: urlParams.projectType,
      description: '',
      programmingLanguages: [],
      deploymentEnvironment: '',
      projectSize: '',
      budget: '',
      timeline: urlParams.timeline,
      teamSize: urlParams.teamSize,
      priorities: [],
    },
  });

  // Effect to handle pre-filled data
  useEffect(() => {
    console.log('URL Params:', urlParams);
    console.log('Current form values:', form.getValues());
    
    if (urlParams.prefilled) {
      console.log('Pre-filling form with URL params');
      
      // Set default values for pre-filled form
      if (urlParams.projectType) {
        console.log('Setting project type:', urlParams.projectType);
        form.setValue('projectType', urlParams.projectType);
      }
      if (urlParams.teamSize) {
        console.log('Setting team size:', urlParams.teamSize);
        form.setValue('teamSize', urlParams.teamSize);
      }
      if (urlParams.timeline) {
        console.log('Setting timeline:', urlParams.timeline);
        form.setValue('timeline', urlParams.timeline);
      }
      
      // Set some sensible defaults for other fields when pre-filled
      form.setValue('projectName', 'My Project');
      form.setValue('description', 'A modern application built with the latest technologies');
      form.setValue('programmingLanguages', ['JavaScript', 'TypeScript']);
      form.setValue('deploymentEnvironment', 'cloud-vercel');
      form.setValue('projectSize', 'medium');
      form.setValue('budget', 'medium');
      form.setValue('priorities', ['Developer Experience', 'Quick Time to Market']);
      
      // Update state arrays
      setSelectedLanguages(['JavaScript', 'TypeScript']);
      setSelectedPriorities(['Developer Experience', 'Quick Time to Market']);
      
      console.log('Form values after setting:', form.getValues());
    }
  }, [form, urlParams.prefilled, urlParams.projectType, urlParams.teamSize, urlParams.timeline]);

  const recommendations = [
    {
      id: '1',
      name: 'MERN Stack',
      description: 'MongoDB, Express.js, React, Node.js - Perfect for modern web applications',
      match: 95,
      reason: 'Ideal for your web application with JavaScript preference and medium budget',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    },
    {
      id: '2', 
      name: 'Next.js + Supabase',
      description: 'Full-stack React framework with backend-as-a-service',
      match: 88,
      reason: 'Great for rapid development with built-in authentication and database',
      tags: ['Next.js', 'Supabase', 'PostgreSQL', 'Vercel'],
    },
    {
      id: '3',
      name: 'Django + React',
      description: 'Python backend with React frontend for robust applications',
      match: 82,
      reason: 'Excellent for scalable applications with strong security requirements',
      tags: ['Django', 'React', 'PostgreSQL', 'Python'],
    }
  ];

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    setShowRecommendations(true);
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    const updatedLanguages = checked 
      ? [...selectedLanguages, language]
      : selectedLanguages.filter(lang => lang !== language);
    
    setSelectedLanguages(updatedLanguages);
    form.setValue('programmingLanguages', updatedLanguages);
  };

  const handlePriorityChange = (priority: string, checked: boolean) => {
    const updatedPriorities = checked 
      ? [...selectedPriorities, priority]
      : selectedPriorities.filter(p => p !== priority);
    
    setSelectedPriorities(updatedPriorities);
    form.setValue('priorities', updatedPriorities);
  };

  const handleViewDetails = (rec: any) => {
    console.log('Viewing details for:', rec.name);
  };

  const handleCompare = (rec: any) => {
    console.log('Comparing:', rec.name);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#1A1A1A] border border-[#333333] px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-[#A259FF]" />
            <span className="text-[#A259FF] font-medium">AI-Powered Recommendations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-4">
            Get Personalized Tech Stack Suggestions
          </h1>
          <p className="text-lg text-[#CCCCCC] max-w-2xl mx-auto">
            Tell us about your project and let our AI recommend the perfect technology stack tailored to your specific needs and constraints.
          </p>
        </div>

        {!showRecommendations ? (
          <div className="max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-3xl opacity-20 blur-lg"></div>
              
              <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-3xl shadow-2xl shadow-purple-500/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl"></div>
                
                <CardContent className="relative z-10 p-8 md:p-12">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 px-6 py-3 rounded-full mb-4">
                        <Sparkles className="w-5 h-5 text-[#A259FF]" />
                        <span className="text-[#A259FF] font-medium">AI Analysis Form</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-2">
                        Tell Us About Your Project
                      </h2>
                      <p className="text-[#CCCCCC] max-w-2xl mx-auto">
                        Fill in the details below to get personalized technology stack recommendations
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 rounded-2xl border border-blue-500/20">
                          <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">1</div>
                            <span>Basic Information</span>
                          </h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="projectName" className="text-[#FFFFFF] font-medium">Project Name</Label>
                              <Input
                                id="projectName"
                                placeholder="My Awesome Project"
                                {...form.register('projectName')}
                                className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF] placeholder:text-[#888888] focus:border-blue-400 focus:ring-blue-400"
                              />
                              {form.formState.errors.projectName && (
                                <p className="text-red-400 text-sm">{form.formState.errors.projectName.message}</p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="projectType" className="text-[#FFFFFF] font-medium">Project Type</Label>
                              <Select 
                                value={form.watch('projectType')} 
                                onValueChange={(value) => form.setValue('projectType', value)}
                              >
                                <SelectTrigger className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF]">
                                  <SelectValue placeholder="Select project type" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1A1A] border-[#333333]">
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

                            <div className="space-y-2">
                              <Label htmlFor="description" className="text-[#FFFFFF] font-medium">Project Description</Label>
                              <Textarea
                                id="description"
                                placeholder="Describe your project in detail..."
                                {...form.register('description')}
                                className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF] placeholder:text-[#888888] focus:border-blue-400 focus:ring-blue-400 min-h-[100px]"
                              />
                              {form.formState.errors.description && (
                                <p className="text-red-400 text-sm">{form.formState.errors.description.message}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-2xl border border-green-500/20">
                          <h3 className="text-xl font-semibold text-green-300 mb-4 flex items-center space-x-2">
                            <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">2</div>
                            <span>Technical Requirements</span>
                          </h3>
                          <div className="space-y-4">
                            <div className="space-y-3">
                              <Label className="text-[#FFFFFF] font-medium">Programming Languages</Label>
                              <div className="grid grid-cols-2 gap-3">
                                {['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP'].map((language) => (
                                  <label key={language} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={selectedLanguages.includes(language)}
                                      onChange={(e) => handleLanguageChange(language, e.target.checked)}
                                      className="w-4 h-4 text-green-500 bg-[#1A1A1A] border-[#333333] rounded focus:ring-green-400"
                                    />
                                    <span className="text-[#CCCCCC]">{language}</span>
                                  </label>
                                ))}
                              </div>
                              {form.formState.errors.programmingLanguages && (
                                <p className="text-red-400 text-sm">{form.formState.errors.programmingLanguages.message}</p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="deploymentEnvironment" className="text-[#FFFFFF] font-medium">Deployment Environment</Label>
                              <Select 
                                value={form.watch('deploymentEnvironment')} 
                                onValueChange={(value) => form.setValue('deploymentEnvironment', value)}
                              >
                                <SelectTrigger className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF]">
                                  <SelectValue placeholder="Select deployment environment" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1A1A] border-[#333333]">
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
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-2xl border border-purple-500/20">
                          <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center space-x-2">
                            <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">3</div>
                            <span>Project Constraints</span>
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="projectSize" className="text-[#FFFFFF] font-medium">Project Size</Label>
                              <Select 
                                value={form.watch('projectSize')} 
                                onValueChange={(value) => form.setValue('projectSize', value)}
                              >
                                <SelectTrigger className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF]">
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1A1A] border-[#333333]">
                                  <SelectItem value="small">Small (MVP)</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="large">Large</SelectItem>
                                  <SelectItem value="enterprise">Enterprise</SelectItem>
                                </SelectContent>
                              </Select>
                              {form.formState.errors.projectSize && (
                                <p className="text-red-400 text-sm">{form.formState.errors.projectSize.message}</p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="budget" className="text-[#FFFFFF] font-medium">Budget Range</Label>
                              <Select 
                                value={form.watch('budget')} 
                                onValueChange={(value) => form.setValue('budget', value)}
                              >
                                <SelectTrigger className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF]">
                                  <SelectValue placeholder="Select budget" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1A1A] border-[#333333]">
                                  <SelectItem value="minimal">$0 - $1k</SelectItem>
                                  <SelectItem value="small">$1k - $10k</SelectItem>
                                  <SelectItem value="medium">$10k - $50k</SelectItem>
                                  <SelectItem value="large">$50k+</SelectItem>
                                </SelectContent>
                              </Select>
                              {form.formState.errors.budget && (
                                <p className="text-red-400 text-sm">{form.formState.errors.budget.message}</p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="timeline" className="text-[#FFFFFF] font-medium">Timeline</Label>
                              <Select 
                                value={form.watch('timeline')} 
                                onValueChange={(value) => form.setValue('timeline', value)}
                              >
                                <SelectTrigger className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF]">
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1A1A] border-[#333333]">
                                  <SelectItem value="urgent">&lt; 1 month</SelectItem>
                                  <SelectItem value="fast">1-3 months</SelectItem>
                                  <SelectItem value="normal">3-6 months</SelectItem>
                                  <SelectItem value="extended">6+ months</SelectItem>
                                </SelectContent>
                              </Select>
                              {form.formState.errors.timeline && (
                                <p className="text-red-400 text-sm">{form.formState.errors.timeline.message}</p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="teamSize" className="text-[#FFFFFF] font-medium">Team Size</Label>
                              <Select 
                                value={form.watch('teamSize')} 
                                onValueChange={(value) => form.setValue('teamSize', value)}
                              >
                                <SelectTrigger className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF]">
                                  <SelectValue placeholder="Select team size" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1A1A] border-[#333333]">
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
                        </div>

                        <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-6 rounded-2xl border border-orange-500/20">
                          <h3 className="text-xl font-semibold text-orange-300 mb-4 flex items-center space-x-2">
                            <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">4</div>
                            <span>Priorities & Goals</span>
                          </h3>
                          <div className="space-y-3">
                            <Label className="text-[#FFFFFF] font-medium">Top Priorities</Label>
                            <div className="grid grid-cols-1 gap-3">
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
                                    checked={selectedPriorities.includes(priority)}
                                    onChange={(e) => handlePriorityChange(priority, e.target.checked)}
                                    className="w-4 h-4 text-orange-500 bg-[#1A1A1A] border-[#333333] rounded focus:ring-orange-400"
                                  />
                                  <span className="text-[#CCCCCC]">{priority}</span>
                                </label>
                              ))}
                            </div>
                            {form.formState.errors.priorities && (
                              <p className="text-red-400 text-sm">{form.formState.errors.priorities.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-8">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-[#A259FF] to-purple-600 hover:from-[#A259FF]/90 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
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
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#FFFFFF] mb-4">AI Recommendations Ready!</h2>
              <p className="text-[#CCCCCC]">Based on your requirements, here are the top tech stacks we recommend:</p>
            </div>

            <div className="grid gap-6 mb-8">
              {recommendations.map((rec, index) => (
                <Card key={rec.id} className="bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#A259FF] to-purple-600 rounded-xl flex items-center justify-center">
                              <span className="text-white font-bold text-lg">#{index + 1}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-2xl font-bold text-[#FFFFFF]">{rec.name}</h3>
                              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                                {rec.match}% Match
                              </Badge>
                            </div>
                            <p className="text-[#CCCCCC] text-lg mb-4">{rec.description}</p>
                            <p className="text-[#A259FF] font-medium mb-4">💡 {rec.reason}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {rec.tags.map((tag: string) => (
                                <Badge key={tag} className="bg-[#A259FF]/20 text-[#A259FF] border-0">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span className="text-[#CCCCCC] text-sm">High Performance</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-blue-500" />
                                <span className="text-[#CCCCCC] text-sm">Strong Community</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-[#CCCCCC] text-sm">Well Established</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-3 lg:flex-shrink-0">
                        <Button 
                          onClick={() => handleViewDetails(rec)}
                          className="bg-[#A259FF] hover:bg-[#A259FF]/90 text-white flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleCompare(rec)}
                          className="border-[#333333] text-[#CCCCCC] hover:text-[#FFFFFF] flex items-center space-x-2"
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
                className="border-[#333333] text-[#CCCCCC] hover:text-[#FFFFFF]"
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