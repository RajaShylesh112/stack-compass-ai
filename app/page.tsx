'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, Target, Users, Clock, Sparkles, Code2, Database, Globe } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const quickStartOptions = [
  {
    id: 'web-app',
    title: 'Web Application',
    description: 'Full-stack web applications with modern frameworks',
    icon: Globe,
    color: 'bg-blue-500',
    examples: ['E-commerce', 'SaaS Platform', 'Social Media']
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    description: 'Native and cross-platform mobile applications',
    icon: Code2,
    color: 'bg-green-500',
    examples: ['iOS/Android', 'React Native', 'Flutter']
  },
  {
    id: 'api-service',
    title: 'API Service',
    description: 'Backend APIs and microservices',
    icon: Database,
    color: 'bg-purple-500',
    examples: ['REST API', 'GraphQL', 'Microservices']
  }
]

const teamSizes = [
  { id: 'solo', label: 'Solo Developer', icon: '👤' },
  { id: 'small', label: 'Small Team (2-5)', icon: '👥' },
  { id: 'medium', label: 'Medium Team (6-15)', icon: '👨‍👩‍👧‍👦' },
  { id: 'large', label: 'Large Team (15+)', icon: '🏢' }
]

const timelines = [
  { id: 'fast', label: 'Fast (1-3 months)', icon: '⚡' },
  { id: 'medium', label: 'Medium (3-6 months)', icon: '🎯' },
  { id: 'long', label: 'Long term (6+ months)', icon: '🚀' }
]

export default function HomePage() {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedTeamSize, setSelectedTeamSize] = useState('')
  const [selectedTimeline, setSelectedTimeline] = useState('')

  const handleQuickStart = () => {
    if (selectedProject && selectedTeamSize && selectedTimeline) {
      const params = new URLSearchParams({
        projectType: selectedProject,
        teamSize: selectedTeamSize,
        timeline: selectedTimeline,
        prefilled: 'true'
      })
      router.push(`/ai-recommendations?${params.toString()}`)
    }
  }

  const isQuickStartReady = selectedProject && selectedTeamSize && selectedTimeline

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-4 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Mistral AI
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Smart Technology
              <br />
              Stack Recommendations
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Get AI-powered recommendations for your next project. Compare technologies, 
              explore compatibility, and make informed decisions with intelligent insights.
            </p>
          </div>

          {/* Quick Start Section */}
          <div className="animate-fade-in-up animate-delay-200">
            <Card className="max-w-4xl mx-auto mb-12 shadow-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  Quick Start Recommendation
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  Answer a few questions to get instant AI recommendations
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Project Type Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    What type of project are you building?
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {quickStartOptions.map((option) => {
                      const IconComponent = option.icon
                      return (
                        <Button
                          key={option.id}
                          variant={selectedProject === option.id ? "default" : "outline"}
                          className="h-auto p-4 flex flex-col items-start gap-2 text-left"
                          onClick={() => setSelectedProject(option.id)}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <div className={`w-8 h-8 rounded-lg ${option.color} flex items-center justify-center`}>
                              <IconComponent className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold">{option.title}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {option.examples.map((example) => (
                              <Badge key={example} variant="secondary" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {/* Team Size Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    What's your team size?
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {teamSizes.map((size) => (
                      <Button
                        key={size.id}
                        variant={selectedTeamSize === size.id ? "default" : "outline"}
                        className="h-auto p-3 flex flex-col items-center gap-2"
                        onClick={() => setSelectedTeamSize(size.id)}
                      >
                        <span className="text-2xl">{size.icon}</span>
                        <span className="text-sm font-medium text-center">{size.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Timeline Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    What's your timeline?
                  </h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    {timelines.map((timeline) => (
                      <Button
                        key={timeline.id}
                        variant={selectedTimeline === timeline.id ? "default" : "outline"}
                        className="h-auto p-3 flex items-center gap-3"
                        onClick={() => setSelectedTimeline(timeline.id)}
                      >
                        <span className="text-xl">{timeline.icon}</span>
                        <span className="font-medium">{timeline.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Quick Start Button */}
                <div className="text-center pt-4">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4"
                    disabled={!isQuickStartReady}
                    onClick={handleQuickStart}
                  >
                    Get AI Recommendations
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  {!isQuickStartReady && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Please select all options above to continue
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alternative Actions */}
          <div className="animate-fade-in-up animate-delay-300 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Button
              variant="outline"
              size="lg"
              className="h-16 text-lg"
              onClick={() => router.push('/stack-builder')}
            >
              <Code2 className="w-6 h-6 mr-3" />
              Advanced Stack Builder
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-16 text-lg"
              onClick={() => router.push('/compare-stacks')}
            >
              <Target className="w-6 h-6 mr-3" />
              Compare Technologies
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}