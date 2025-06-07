'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/lib/use-toast'
import { apiRequest } from '@/components/query-provider'
import { ArrowLeft, Sparkles, Code, Database, Cloud, Zap, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface TechnologyRecommendation {
  name: string
  category: string
  reason: string
  pros: string[]
  cons: string[]
  learning_curve: string
  score: number
}

interface StackRecommendationResponse {
  recommended_stack: Record<string, TechnologyRecommendation>
  reasoning: string
  alternatives: string[]
}

const projectTypeOptions = [
  { value: 'web-app', label: 'Web Application' },
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'api-service', label: 'API Service' },
  { value: 'desktop-app', label: 'Desktop Application' },
  { value: 'microservice', label: 'Microservice' }
]

const experienceLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
]

const commonRequirements = [
  'Real-time features',
  'High performance',
  'Scalability',
  'Security',
  'Mobile-friendly',
  'SEO optimization',
  'Offline support',
  'Third-party integrations',
  'Analytics',
  'Payment processing'
]

export default function AIRecommendationsPage() {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '',
    description: '',
    requirements: [] as string[],
    experienceLevel: 'intermediate',
    teamSize: '',
    budget: '',
    timeline: ''
  })

  // Pre-fill form from URL params
  useEffect(() => {
    const projectType = searchParams.get('projectType')
    const teamSize = searchParams.get('teamSize')
    const timeline = searchParams.get('timeline')
    const prefilled = searchParams.get('prefilled')

    if (prefilled === 'true') {
      setFormData(prev => ({
        ...prev,
        projectType: projectType || '',
        teamSize: teamSize || '',
        timeline: timeline || '',
        projectName: 'My Project',
        description: 'A modern application built with the latest technologies',
        requirements: ['High performance', 'Scalability']
      }))
    }
  }, [searchParams])

  const generateRecommendations = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest('/api/ai/recommend-stack', {
        method: 'POST',
        body: JSON.stringify({
          project_type: data.projectType,
          requirements: data.requirements,
          experience_level: data.experienceLevel,
          team_size: data.teamSize,
          budget: data.budget,
          timeline: data.timeline
        })
      })
    },
    onSuccess: () => {
      toast({
        title: 'Recommendations Generated',
        description: 'Your AI-powered technology stack recommendations are ready!'
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate recommendations',
        variant: 'destructive'
      })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.projectType) {
      toast({
        title: 'Missing Information',
        description: 'Please select a project type',
        variant: 'destructive'
      })
      return
    }
    generateRecommendations.mutate(formData)
  }

  const handleRequirementToggle = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.includes(requirement)
        ? prev.requirements.filter(r => r !== requirement)
        : [...prev.requirements, requirement]
    }))
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend': return <Code className="w-5 h-5" />
      case 'backend': return <Database className="w-5 h-5" />
      case 'database': return <Database className="w-5 h-5" />
      case 'deployment': return <Cloud className="w-5 h-5" />
      default: return <Zap className="w-5 h-5" />
    }
  }

  const recommendations = generateRecommendations.data as StackRecommendationResponse | undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                    placeholder="Enter your project name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type *</Label>
                  <Select 
                    value={formData.projectType} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your project goals and features"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project Requirements</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {commonRequirements.map((requirement) => (
                      <div key={requirement} className="flex items-center space-x-2">
                        <Checkbox
                          id={requirement}
                          checked={formData.requirements.includes(requirement)}
                          onCheckedChange={() => handleRequirementToggle(requirement)}
                        />
                        <Label htmlFor={requirement} className="text-sm">
                          {requirement}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select 
                    value={formData.experienceLevel} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={generateRecommendations.isPending}
                >
                  {generateRecommendations.isPending ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating Recommendations...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get AI Recommendations
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {generateRecommendations.isPending && (
              <Card>
                <CardHeader>
                  <CardTitle>Generating Recommendations...</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            )}

            {recommendations && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      AI-Powered Recommendations
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {recommendations.reasoning}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(recommendations.recommended_stack).map(([category, tech]) => (
                      <Card key={category} className="border-l-4 border-l-purple-500">
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                              {getCategoryIcon(category)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{tech.name}</h3>
                                <Badge variant="secondary" className="capitalize">
                                  {category}
                                </Badge>
                                <Badge variant="outline">
                                  Score: {tech.score}/10
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {tech.reason}
                              </p>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-green-600 mb-1">Pros</h4>
                                  <ul className="text-sm space-y-1">
                                    {tech.pros.map((pro, index) => (
                                      <li key={index} className="flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3 text-green-500" />
                                        {pro}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-medium text-orange-600 mb-1">Considerations</h4>
                                  <ul className="text-sm space-y-1">
                                    {tech.cons.map((con, index) => (
                                      <li key={index} className="text-muted-foreground">
                                        • {con}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="mt-3 pt-3 border-t">
                                <span className="text-sm font-medium">Learning Curve: </span>
                                <Badge variant="outline" className="capitalize">
                                  {tech.learning_curve}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}

            {generateRecommendations.isError && (
              <Card className="border-red-200 dark:border-red-800">
                <CardContent className="pt-6">
                  <div className="text-center text-red-600 dark:text-red-400">
                    <p className="font-medium">Failed to generate recommendations</p>
                    <p className="text-sm mt-1">Please check your API configuration and try again</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}