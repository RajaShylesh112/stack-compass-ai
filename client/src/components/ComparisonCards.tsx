
import React from 'react';
import { Badge } from '@/components/ui/badge';

const ComparisonCards = () => {
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
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Vercel'],
      pros: ['Great DX', 'Built-in SSR', 'Type safety'],
      cons: ['Opinionated', 'Vendor lock-in'],
      performance: 92,
      popularity: 89,
      learning: 70,
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-text font-poppins">
            Popular Stack Comparisons
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Explore detailed comparisons of the most popular technology combinations used by successful teams
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {techStacks.map((stack) => (
            <div key={stack.id} className="neumorphic-card p-8 space-y-6 group cursor-pointer">
              {/* Header */}
              <div className="space-y-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${stack.gradient} rounded-xl flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">{stack.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text font-poppins">{stack.name}</h3>
                  <p className="text-accent text-sm font-medium">{stack.type}</p>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{stack.description}</p>
              </div>

              {/* Technologies */}
              <div className="space-y-3">
                <h4 className="text-text font-medium text-sm uppercase tracking-wide">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {stack.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-text-secondary border border-gray-600">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-4">
                <h4 className="text-text font-medium text-sm uppercase tracking-wide">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Performance</span>
                    <span className="text-text font-medium">{stack.performance}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`h-2 bg-gradient-to-r ${stack.gradient} rounded-full transition-all duration-500 group-hover:animate-pulse`}
                      style={{ width: `${stack.performance}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Popularity</span>
                    <span className="text-text font-medium">{stack.popularity}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`h-2 bg-gradient-to-r ${stack.gradient} rounded-full transition-all duration-500 group-hover:animate-pulse`}
                      style={{ width: `${stack.popularity}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Learning Curve</span>
                    <span className="text-text font-medium">{stack.learning}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`h-2 bg-gradient-to-r ${stack.gradient} rounded-full transition-all duration-500 group-hover:animate-pulse`}
                      style={{ width: `${stack.learning}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="text-green-400 font-medium text-sm uppercase tracking-wide">Pros</h5>
                  <ul className="space-y-1">
                    {stack.pros.map((pro, index) => (
                      <li key={index} className="text-text-secondary text-xs flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="text-red-400 font-medium text-sm uppercase tracking-wide">Cons</h5>
                  <ul className="space-y-1">
                    {stack.cons.map((con, index) => (
                      <li key={index} className="text-text-secondary text-xs flex items-center">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></div>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-gray-700">
                <button className={`w-full bg-gradient-to-r ${stack.gradient} text-white py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105`}>
                  View Detailed Comparison
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonCards;
