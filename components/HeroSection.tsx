'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Search, Layout } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    projectType: 'web-app',
    teamSize: 'solo',
    timeline: 'fast'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGetRecommendations = () => {
    // Navigate to AI recommendations page with query parameters
    const params = new URLSearchParams({
      projectType: formData.projectType,
      teamSize: formData.teamSize,
      timeline: formData.timeline,
      prefilled: 'true'
    });
    
    router.push(`/ai-recommendations?${params.toString()}`);
  };

  return (
    <section className="relative px-4 py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-muted border border-border rounded-xl px-4 py-2 shadow-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground text-sm font-medium">AI-Powered Stack Intelligence</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Choose the{' '}
                <span className="text-primary">
                  Perfect Tech Stack
                </span>{' '}
                for Your Next Project
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                Get personalized technology recommendations based on your project requirements, 
                team size, and timeline. Compare frameworks, tools, and services side by side.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="text-base bg-primary hover:bg-primary/90"
                  onClick={handleGetRecommendations}
                >
                  Get AI Recommendations
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-base"
                  onClick={() => router.push('/compare')}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Compare Stacks
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              {[
                { label: 'Web Apps', value: '10,000+' },
                { label: 'Technologies', value: '500+' },
                { label: 'Developers', value: '1M+' }
              ].map((stat, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 w-full h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-border p-6">
              <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">stack-compare.js</span>
                </div>
                
                <div className="flex-1 bg-background/80 border border-border rounded-lg p-4 overflow-hidden">
                  <div className="space-y-3">
                    {Array(8).fill(0).map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-3/4 h-3 bg-muted rounded animate-pulse" style={{
                          opacity: 0.2 + (i * 0.1),
                          animationDelay: `${i * 0.1}s`
                        }}></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Analyzing your project requirements...
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
