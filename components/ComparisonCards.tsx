'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ComparisonCards = () => {
  const router = useRouter();

  const techStacks = [
    {
      id: 1,
      name: 'React + Node.js',
      type: 'Full Stack JavaScript',
      description: 'Popular choice for rapid development with unified language',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      pros: ['Fast development', 'Large community', 'Single language'],
      cons: ['Can be heavy', 'SEO challenges'],
      performance: 85,
      popularity: 92,
      learning: 75,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Vue + Laravel',
      type: 'Progressive Framework',
      description: 'Balanced approach with elegant syntax and powerful backend',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
      pros: ['Clean syntax', 'Great docs', 'Stable ecosystem'],
      cons: ['Smaller community', 'Learning curve'],
      performance: 88,
      popularity: 78,
      learning: 82,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      name: 'Next.js + Prisma',
      type: 'Modern React Framework',
      description: 'Full-stack React with excellent developer experience',
      technologies: ['Next.js', 'Prisma', 'Appwrite', 'Vercel'],
      pros: ['Great DX', 'Built-in SSR', 'Type safety'],
      cons: ['Opinionated', 'Vendor lock-in'],
      performance: 92,
      popularity: 89,
      learning: 70,
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section className="px-4 py-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Compare Popular Tech Stacks
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how different technology combinations stack up against each other
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStacks.map((stack) => (
            <div
              key={stack.id}
              className={`bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300`}
            >
              <div className={`h-2 bg-gradient-to-r ${stack.gradient}`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{stack.name}</h3>
                    <p className="text-sm text-muted-foreground">{stack.type}</p>
                  </div>
                  <Badge variant="outline" className="border-muted-foreground/30">
                    {stack.performance}% Score
                  </Badge>
                </div>

                <p className="text-foreground/90 mb-4">{stack.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Pros</h4>
                    <ul className="space-y-1">
                      {stack.pros.map((pro, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-4 w-4 text-green-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-foreground/90">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Cons</h4>
                    <ul className="space-y-1">
                      {stack.cons.map((con, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-4 w-4 text-red-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-sm text-foreground/90">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Performance</span>
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${stack.performance}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Popularity</span>
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${stack.popularity}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Learning Curve</span>
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${stack.learning}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-muted/50 border-t border-border">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="text-base"
            onClick={() => router.push('/compare')}
          >
            Compare All Stacks
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonCards;
