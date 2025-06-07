'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'

const technologyCategories = {
  frontend: ['React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js'],
  backend: ['Node.js', 'Python/Django', 'Python/FastAPI', 'Ruby on Rails', 'PHP/Laravel', 'Java/Spring'],
  database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'SQLite', 'Firebase'],
  deployment: ['Vercel', 'AWS', 'Google Cloud', 'Heroku', 'DigitalOcean', 'Netlify']
}

export default function StackBuilderPage() {
  const [selectedStack, setSelectedStack] = useState<Record<string, string>>({})
  
  const selectTechnology = (category: string, tech: string) => {
    setSelectedStack(prev => ({ ...prev, [category]: tech }))
  }
  
  const removeTechnology = (category: string) => {
    setSelectedStack(prev => {
      const updated = { ...prev }
      delete updated[category]
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Advanced Stack Builder</h1>
            <p className="text-xl text-muted-foreground">
              Manually build your technology stack by selecting from popular technologies
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {Object.entries(technologyCategories).map(([category, technologies]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {technologies.map((tech) => (
                        <Button
                          key={tech}
                          variant={selectedStack[category] === tech ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => selectTechnology(category, tech)}
                        >
                          {selectedStack[category] === tech && <Plus className="w-4 h-4 mr-2" />}
                          {tech}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.keys(selectedStack).length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Select technologies to build your stack
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(selectedStack).map(([category, tech]) => (
                        <div key={category} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium">{tech}</p>
                            <p className="text-sm text-muted-foreground capitalize">{category}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTechnology(category)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {Object.keys(selectedStack).length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <Button className="w-full">
                      Analyze Stack Compatibility
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}