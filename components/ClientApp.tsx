'use client';

import { QueryProvider } from '@/components/query-provider';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ComparisonCards from '@/components/ComparisonCards';
import TechnologyShowcase from '@/components/TechnologyShowcase';
import Footer from '@/components/Footer';

export default function ClientApp() {
    return (
        <QueryProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <Header />
                <main>
                    <HeroSection />
                    <ComparisonCards />
                    <TechnologyShowcase />
                </main>
                <Footer />
            </div>
        </QueryProvider>
    );
} 