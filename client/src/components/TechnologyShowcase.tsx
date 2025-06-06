
import React from 'react';

const TechnologyShowcase = () => {
  const categories = [
    {
      name: 'Frontend',
      technologies: [
        { name: 'React', logo: '⚛️', popularity: 95, color: 'from-blue-400 to-blue-600' },
        { name: 'Vue.js', logo: '💚', popularity: 78, color: 'from-green-400 to-green-600' },
        { name: 'Angular', logo: '🅰️', popularity: 72, color: 'from-red-400 to-red-600' },
        { name: 'Svelte', logo: '🔥', popularity: 68, color: 'from-orange-400 to-orange-600' },
      ]
    },
    {
      name: 'Backend',
      technologies: [
        { name: 'Node.js', logo: '💚', popularity: 89, color: 'from-green-400 to-green-600' },
        { name: 'Python', logo: '🐍', popularity: 92, color: 'from-yellow-400 to-yellow-600' },
        { name: 'Go', logo: '🐹', popularity: 75, color: 'from-cyan-400 to-cyan-600' },
        { name: 'Rust', logo: '🦀', popularity: 71, color: 'from-orange-400 to-red-600' },
      ]
    },
    {
      name: 'Database',
      technologies: [
        { name: 'PostgreSQL', logo: '🐘', popularity: 88, color: 'from-blue-400 to-indigo-600' },
        { name: 'MongoDB', logo: '🍃', popularity: 82, color: 'from-green-400 to-green-600' },
        { name: 'Redis', logo: '🔴', popularity: 76, color: 'from-red-400 to-red-600' },
        { name: 'MySQL', logo: '🐬', popularity: 79, color: 'from-blue-400 to-blue-600' },
      ]
    },
    {
      name: 'Cloud & DevOps',
      technologies: [
        { name: 'AWS', logo: '☁️', popularity: 94, color: 'from-orange-400 to-orange-600' },
        { name: 'Docker', logo: '🐳', popularity: 91, color: 'from-blue-400 to-blue-600' },
        { name: 'Kubernetes', logo: '☸️', popularity: 78, color: 'from-blue-400 to-indigo-600' },
        { name: 'Vercel', logo: '▲', popularity: 73, color: 'from-black to-gray-600' },
      ]
    }
  ];

  return (
    <section className="px-4 py-16 bg-gradient-to-br from-secondary via-primary to-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground ">
            Technology Ecosystem
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Explore our comprehensive database of technologies, frameworks, and tools with real-time popularity metrics
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="neumorphic-card p-6 space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground  mb-2">{category.name}</h3>
                <div className="w-12 h-1 bg-gradient-to-r from-accent to-purple-500 rounded-full mx-auto"></div>
              </div>

              <div className="space-y-4">
                {category.technologies.map((tech) => (
                  <div key={tech.name} className="group cursor-pointer">
                    <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-secondary/50 transition-all duration-200">
                      <div className={`w-10 h-10 bg-gradient-to-br ${tech.color} rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200`}>
                        {tech.logo}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-foreground font-medium">{tech.name}</span>
                          <span className="text-foreground-secondary text-sm">{tech.popularity}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-1.5">
                          <div 
                            className={`h-1.5 bg-gradient-to-r ${tech.color} rounded-full transition-all duration-500 group-hover:animate-pulse`}
                            style={{ width: `${tech.popularity}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full text-accent hover:text-accent/80 text-sm font-medium py-2 border border-accent/20 rounded-xl hover:bg-accent/5 transition-all duration-200">
                View All {category.name} Technologies
              </button>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="neumorphic-card p-6 text-center">
            <div className="text-3xl font-bold text-foreground  mb-2">500+</div>
            <div className="text-foreground-secondary text-sm">Technologies Tracked</div>
          </div>
          <div className="neumorphic-card p-6 text-center">
            <div className="text-3xl font-bold text-foreground  mb-2">50+</div>
            <div className="text-foreground-secondary text-sm">Categories</div>
          </div>
          <div className="neumorphic-card p-6 text-center">
            <div className="text-3xl font-bold text-foreground  mb-2">24/7</div>
            <div className="text-foreground-secondary text-sm">Data Updates</div>
          </div>
          <div className="neumorphic-card p-6 text-center">
            <div className="text-3xl font-bold text-foreground  mb-2">99%</div>
            <div className="text-foreground-secondary text-sm">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
