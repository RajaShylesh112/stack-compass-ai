'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Sparkles,
  Wand2,
  Eye,
  BarChart3,
  TrendingUp,
  Users,
  Star,
  ArrowLeft,
  CheckCircle,
  Clock,
  Zap,
  Code,
  Database,
  Cloud,
  Shield,
  DollarSign
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Form schema for validation
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

// Mock recommendations data
const mockRecommendations = [
  {
    id: 'nextjs-node-mongodb',
    name: 'Next.js + Node.js + MongoDB',
    description: 'Full-stack JavaScript solution with server-side rendering and flexible NoSQL database',
    compatibility: 95,
    technologies: [
      { name: 'Next.js', type: 'Frontend', icon: <Code className="h-4 w-4" /> },
      { name: 'Node.js', type: 'Backend', icon: <Code className="h-4 w-4" /> },
      { name: 'MongoDB', type: 'Database', icon: <Database className="h-4 w-4" /> },
      { name: 'Vercel', type: 'Hosting', icon: <Cloud className="h-4 w-4" /> },
      { name: 'NextAuth.js', type: 'Auth', icon: <Shield className="h-4 w-4" /> },
    ],
    pros: [
      'Fast development with JavaScript/TypeScript',
      'Great for real-time applications',
      'Scalable architecture',
      'Strong community support'
    ],
    cons: [
      'MongoDB might not be suitable for complex transactions',
      'Learning curve for beginners'
    ],
    estimatedCost: '$$',
    timeToMarket: '2-4 weeks',
    popularity: 'High',
    maintenance: 'Medium',
  },
  // Add more mock recommendations as needed
];

function AIRecommendationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  // Form setup with react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: searchParams.get('projectType') || '',
      teamSize: searchParams.get('teamSize') || '',
      timeline: searchParams.get('timeline') || '',
      projectName: '',
      description: '',
      programmingLanguages: [],
      deploymentEnvironment: '',
      projectSize: '',
      budget: '',
      priorities: [],
    },
  });

  // Update progress based on form completion
  useEffect(() => {
    const subscription = watch((value) => {
      const totalFields = 10; // Total number of fields in the form
      const filledFields = Object.values(value).filter(v => v && (Array.isArray(v) ? v.length > 0 : v !== '')).length;
      setProgress(Math.round((filledFields / totalFields) * 100));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setShowRecommendations(true);
    setIsLoading(false);

    // Scroll to recommendations
    document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle language selection
  const toggleLanguage = (language: string) => {
    const newLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter(lang => lang !== language)
      : [...selectedLanguages, language];

    setSelectedLanguages(newLanguages);
    setValue('programmingLanguages', newLanguages, { shouldValidate: true });
  };

  // Toggle priority selection
  const togglePriority = (priorityId: string) => {
    const newPriorities = selectedPriorities.includes(priorityId)
      ? selectedPriorities.filter(p => p !== priorityId)
      : [...selectedPriorities, priorityId];

    setSelectedPriorities(newPriorities);
    setValue('priorities', newPriorities, { shouldValidate: true });
  };

  // Navigation between form steps
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Available options for form fields
  const projectTypes = [
    'Web Application',
    'Mobile App',
    'API Service',
    'E-commerce',
    'SaaS Platform',
    'Dashboard',
    'Blog/Content Site',
    'Social Network',
  ];

  const programmingLanguageOptions = [
    'JavaScript/TypeScript',
    'Python',
    'Java',
    'C#',
    'PHP',
    'Ruby',
    'Go',
    'Rust',
  ];

  const deploymentEnvironments = [
    'Cloud (AWS/GCP/Azure)',
    'Shared Hosting',
    'VPS',
    'On-premises',
    'Hybrid',
  ];

  const projectSizes = [
    'Small (1-5 pages/screens)',
    'Medium (5-20 pages/screens)',
    'Large (20+ pages/screens)',
    'Enterprise',
  ];

  const budgetRanges = [
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $20,000',
    '$20,000 - $100,000',
    '$100,000+',
  ];

  const timelineOptions = [
    '1-2 weeks',
    '2-4 weeks',
    '1-3 months',
    '3-6 months',
    '6+ months',
  ];

  const teamSizes = [
    'Solo developer',
    '2-5 people',
    '5-10 people',
    '10-20 people',
    '20+ people',
  ];

  const priorityOptions = [
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'scalability', label: 'Scalability', icon: TrendingUp },
    { id: 'team_experience', label: 'Team Experience', icon: Users },
    { id: 'time_to_market', label: 'Fast Development', icon: Sparkles },
    { id: 'cost', label: 'Cost Efficiency', icon: DollarSign },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  // Render the recommendations view
  if (showRecommendations) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Button
            variant="outline"
            className="mb-6 bg-background hover:bg-accent/50 transition-colors"
            onClick={() => setShowRecommendations(false)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to form
          </Button>

          <div id="recommendations" className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                <Sparkles className="inline-block w-8 h-8 mr-2 text-yellow-500" />
                Recommended Stacks
              </h1>
              <p className="text-muted-foreground">
                Based on your project requirements, here are our top recommendations
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockRecommendations.map((rec) => (
                <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{rec.name}</CardTitle>
                        <CardDescription className="mt-1">{rec.description}</CardDescription>
                      </div>
                      <Badge className="flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" />
                        {rec.compatibility}% Match
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {rec.technologies.map((tech, i) => (
                            <Badge key={i} variant="outline" className="flex items-center gap-1">
                              {tech.icon}
                              <span>{tech.name}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Pros</h3>
                          <ul className="space-y-1 text-sm">
                            {rec.pros.map((pro, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-2">Cons</h3>
                          <ul className="space-y-1 text-sm">
                            {rec.cons.map((con, i) => (
                              <li key={i} className="flex items-start">
                                <svg className="h-4 w-4 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Estimated Cost</p>
                          <p className="font-medium">{rec.estimatedCost}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time to Market</p>
                          <p className="font-medium">{rec.timeToMarket}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Popularity</p>
                          <p className="font-medium">{rec.popularity}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Maintenance</p>
                          <p className="font-medium">{rec.maintenance}</p>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-primary hover:bg-primary/90 transition-colors"
                        onClick={() => router.push(`/stack-builder?template=${rec.id}`)}
                      >
                        <Wand2 className="mr-2 h-4 w-4" />
                        Use This Stack
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Render the form view
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              <Sparkles className="inline-block w-8 h-8 mr-2 text-yellow-500" />
              AI-Powered Stack Recommendations
            </h1>
            <p className="text-muted-foreground">
              Answer a few questions about your project and we'll recommend the perfect tech stack
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Step 1: Project Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                  <CardDescription>
                    Tell us about your project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      placeholder="My Awesome Project"
                      {...register('projectName')}
                    />
                    {errors.projectName && (
                      <p className="text-sm text-red-500">{errors.projectName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select
                      onValueChange={(value) => setValue('projectType', value, { shouldValidate: true })}
                      defaultValue={watch('projectType')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.projectType && (
                      <p className="text-sm text-red-500">{errors.projectType.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project in detail..."
                      rows={4}
                      {...register('description')}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Technical Requirements */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Technical Requirements</CardTitle>
                  <CardDescription>
                    Define your technical stack preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Preferred Programming Languages</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select all that apply (select at least one)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {programmingLanguageOptions.map((lang) => (
                        <Button
                          key={lang}
                          type="button"
                          variant={selectedLanguages.includes(lang) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => toggleLanguage(lang)}
                        >
                          {lang}
                        </Button>
                      ))}
                    </div>
                    <input type="hidden" {...register('programmingLanguages')} />
                    {errors.programmingLanguages && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.programmingLanguages.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deploymentEnvironment">Deployment Environment</Label>
                    <Select
                      onValueChange={(value) => setValue('deploymentEnvironment', value, { shouldValidate: true })}
                      defaultValue={watch('deploymentEnvironment')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select deployment environment" />
                      </SelectTrigger>
                      <SelectContent>
                        {deploymentEnvironments.map((env) => (
                          <SelectItem key={env} value={env}>{env}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.deploymentEnvironment && (
                      <p className="text-sm text-red-500">{errors.deploymentEnvironment.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectSize">Project Size</Label>
                    <Select
                      onValueChange={(value) => setValue('projectSize', value, { shouldValidate: true })}
                      defaultValue={watch('projectSize')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project size" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectSizes.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.projectSize && (
                      <p className="text-sm text-red-500">{errors.projectSize.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Project Constraints */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Project Constraints</CardTitle>
                  <CardDescription>
                    Define your project's constraints and priorities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select
                      onValueChange={(value) => setValue('budget', value, { shouldValidate: true })}
                      defaultValue={watch('budget')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.budget && (
                      <p className="text-sm text-red-500">{errors.budget.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Select
                      onValueChange={(value) => setValue('timeline', value, { shouldValidate: true })}
                      defaultValue={watch('timeline')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelineOptions.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.timeline && (
                      <p className="text-sm text-red-500">{errors.timeline.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Select
                      onValueChange={(value) => setValue('teamSize', value, { shouldValidate: true })}
                      defaultValue={watch('teamSize')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamSizes.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.teamSize && (
                      <p className="text-sm text-red-500">{errors.teamSize.message}</p>
                    )}
                  </div>

                  <div>
                    <Label>Project Priorities</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select your top priorities (select at least one)
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {priorityOptions.map((priority) => {
                        const isSelected = selectedPriorities.includes(priority.id);
                        const Icon = priority.icon;
                        return (
                          <div
                            key={priority.id}
                            onClick={() => togglePriority(priority.id)}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${isSelected
                                ? 'border-primary bg-primary/10'
                                : 'border-muted hover:border-primary/50'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full ${isSelected ? 'bg-primary/10 text-primary' : 'bg-muted'
                                  }`}
                              >
                                {typeof Icon === 'string' ? (
                                  <span className="text-lg">{Icon}</span>
                                ) : (
                                  <Icon className="h-5 w-5" />
                                )}
                              </div>
                              <span className="font-medium">{priority.label}</span>
                              {isSelected && (
                                <CheckCircle className="ml-auto h-5 w-5 text-primary" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <input type="hidden" {...register('priorities')} />
                    {errors.priorities && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.priorities.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={currentStep === 1 ? undefined : () => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1}
                className={`bg-background hover:bg-accent/50 transition-colors ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Previous
              </Button>
              <Button
                type={currentStep < 3 ? 'button' : 'submit'}
                className="bg-primary hover:bg-primary/90 transition-colors flex items-center"
                disabled={isLoading}
                onClick={currentStep < 3 ? () => setCurrentStep(prev => prev + 1) : undefined}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    {currentStep === 3 ? 'Get Recommendations' : 'Next'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function AIRecommendationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AIRecommendationsContent />
    </Suspense>
  );
}
