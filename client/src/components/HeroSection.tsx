
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Search, Layout } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative px-4 py-16 lg:py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-2 shadow-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[#CCCCCC] text-sm font-medium">AI-Powered Stack Intelligence</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-[#FFFFFF] leading-tight">
                Choose the{' '}
                <span className="text-[#A259FF]">
                  Perfect
                </span>{' '}
                Tech Stack
              </h1>
              
              <p className="text-xl text-[#CCCCCC] leading-relaxed max-w-2xl">
                Quickly compare and choose the tech stack that best fits your needs with AI-powered suggestions, visual comparisons, and performance analytics.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-[#FFFFFF] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                <Search className="w-5 h-5 mr-2" />
                Find My Stack
              </Button>
              <Button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-[#FFFFFF] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                <Layout className="w-5 h-5 mr-2" />
                Compare Stacks
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="bg-[#1A1A1A] rounded-xl shadow-lg p-6 text-center border border-[#333333]">
                <div className="text-2xl lg:text-3xl font-bold text-[#FFFFFF]">500+</div>
                <div className="text-[#CCCCCC] text-sm mt-1">Technologies</div>
              </div>
              <div className="bg-[#1A1A1A] rounded-xl shadow-lg p-6 text-center border border-[#333333]">
                <div className="text-2xl lg:text-3xl font-bold text-[#FFFFFF]">50K+</div>
                <div className="text-[#CCCCCC] text-sm mt-1">Comparisons</div>
              </div>
              <div className="bg-[#1A1A1A] rounded-xl shadow-lg p-6 text-center border border-[#333333]">
                <div className="text-2xl lg:text-3xl font-bold text-[#FFFFFF]">99%</div>
                <div className="text-[#CCCCCC] text-sm mt-1">Accuracy</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="lg:col-span-1">
            <div className="bg-[#1A1A1A] rounded-xl shadow-lg p-8 space-y-6 border border-[#333333]">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#A259FF] to-purple-600 rounded-2xl flex items-center justify-center">
                  <Layout className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#FFFFFF]">AI Stack Builder</h3>
                <p className="text-[#CCCCCC] text-sm">Answer a few questions and get personalized recommendations</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[#CCCCCC] text-sm font-medium">Project Type</label>
                  <select className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-3 text-[#FFFFFF] focus:border-[#A259FF] focus:ring-1 focus:ring-[#A259FF] shadow-md">
                    <option>Web Application</option>
                    <option>Mobile App</option>
                    <option>Desktop App</option>
                    <option>API Service</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[#CCCCCC] text-sm font-medium">Team Size</label>
                  <select className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-3 text-[#FFFFFF] focus:border-[#A259FF] focus:ring-1 focus:ring-[#A259FF] shadow-md">
                    <option>Solo Developer</option>
                    <option>Small Team (2-5)</option>
                    <option>Medium Team (6-15)</option>
                    <option>Large Team (15+)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[#CCCCCC] text-sm font-medium">Timeline</label>
                  <select className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-3 text-[#FFFFFF] focus:border-[#A259FF] focus:ring-1 focus:ring-[#A259FF] shadow-md">
                    <option>MVP (1-3 months)</option>
                    <option>Standard (3-6 months)</option>
                    <option>Complex (6+ months)</option>
                  </select>
                </div>

                <Button className="w-full bg-[#1F1F1F] hover:bg-[#2A2A2A] text-[#FFFFFF] py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                  Get AI Recommendations
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-[#CCCCCC]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
