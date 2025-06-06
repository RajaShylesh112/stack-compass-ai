
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ComparisonCards from '@/components/ComparisonCards';
import TechnologyShowcase from '@/components/TechnologyShowcase';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] to-[#E6E6E6]">
      <Header />
      <main>
        <HeroSection />
        <ComparisonCards />
        <TechnologyShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
