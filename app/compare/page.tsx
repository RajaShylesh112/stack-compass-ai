'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Search,
    BarChart3,
    Layers,
    Zap,
    TrendingUp,
    Users,
    Star,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ComparePage = () => {
    const comparisonOptions = [
        {
            title: 'Compare Technologies',
            description: 'Compare individual tools, frameworks, and libraries side by side',
            icon: Zap,
            href: '/compare/tech',
            features: ['Performance metrics', 'Community stats', 'Feature comparison', 'Radar charts'],
            color: 'from-pink-500 to-purple-600'
        },
        {
            title: 'Compare Stacks',
            description: 'Compare complete technology stacks and architectures',
            icon: Layers,
            href: '/compare/stack',
            features: ['Stack compatibility', 'Performance analysis', 'Cost comparison', 'Scalability metrics'],
            color: 'from-blue-500 to-cyan-600'
        },
        {
            title: 'Compare Tools',
            description: 'Compare development tools, IDEs, and utilities',
            icon: Search,
            href: '/compare/tools',
            features: ['Tool features', 'Integration capabilities', 'Pricing comparison', 'User reviews'],
            color: 'from-green-500 to-emerald-600'
        }
    ];

    const stats = [
        { label: 'Technologies', value: '500+', icon: Zap },
        { label: 'Stacks', value: '100+', icon: Layers },
        { label: 'Tools', value: '200+', icon: Search },
        { label: 'Users', value: '10K+', icon: Users }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] to-[#18181b]">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-[#A26DF8]/10 backdrop-blur-sm border border-[#A26DF8]/20 px-6 py-3 rounded-full mb-6">
                        <Sparkles className="w-5 h-5" style={{ color: '#A26DF8' }} />
                        <span className="font-medium" style={{ color: '#A26DF8' }}>Compare & Analyze</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-gradient">
                        Compare Tech Stacks
                    </h1>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Make informed decisions with our comprehensive comparison tools.
                        Analyze performance, features, and compatibility across technologies.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                        {stats.map((stat, index) => (
                            <div key={stat.label} className="bg-[#A26DF8]/5 backdrop-blur-sm border border-[#A26DF8]/10 rounded-2xl p-6 hover:bg-[#A26DF8]/10 transition-all duration-300">
                                <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: '#A26DF8' }} />
                                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comparison Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {comparisonOptions.map((option, index) => (
                        <Card key={option.title} className="group bg-[#A26DF8]/5 backdrop-blur-sm border border-[#A26DF8]/10 hover:bg-[#A26DF8]/10 transition-all duration-300 hover:scale-105">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ background: '#A26DF8' }}>
                                    <option.icon className="w-8 h-8 text-white" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-white mb-2">{option.title}</CardTitle>
                                <p className="text-gray-400 leading-relaxed">{option.description}</p>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {option.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center space-x-2 text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#A26DF8' }}></div>
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link href={option.href}>
                                    <Button className="w-full" style={{ background: '#A26DF8', color: 'white', border: 0 }}>
                                        <span>Explore {option.title}</span>
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Features Section */}
                <div className="bg-[#A26DF8]/5 backdrop-blur-sm border border-[#A26DF8]/10 rounded-3xl p-8 mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Comparison Tools?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Get comprehensive insights with our AI-powered analysis and real-time data
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-6 rounded-2xl bg-[#A26DF8]/5 hover:bg-[#A26DF8]/10 transition-all duration-300">
                            <BarChart3 className="w-12 h-12 mx-auto mb-4" style={{ color: '#A26DF8' }} />
                            <h3 className="text-lg font-semibold text-white mb-2">Real-time Data</h3>
                            <p className="text-gray-400 text-sm">Up-to-date metrics and performance data</p>
                        </div>

                        <div className="text-center p-6 rounded-2xl bg-[#A26DF8]/5 hover:bg-[#A26DF8]/10 transition-all duration-300">
                            <TrendingUp className="w-12 h-12 mx-auto mb-4" style={{ color: '#A26DF8' }} />
                            <h3 className="text-lg font-semibold text-white mb-2">Trend Analysis</h3>
                            <p className="text-gray-400 text-sm">Track technology trends and adoption rates</p>
                        </div>

                        <div className="text-center p-6 rounded-2xl bg-[#A26DF8]/5 hover:bg-[#A26DF8]/10 transition-all duration-300">
                            <Users className="w-12 h-12 mx-auto mb-4" style={{ color: '#A26DF8' }} />
                            <h3 className="text-lg font-semibold text-white mb-2">Community Insights</h3>
                            <p className="text-gray-400 text-sm">Community feedback and developer opinions</p>
                        </div>

                        <div className="text-center p-6 rounded-2xl bg-[#A26DF8]/5 hover:bg-[#A26DF8]/10 transition-all duration-300">
                            <Star className="w-12 h-12 mx-auto mb-4" style={{ color: '#A26DF8' }} />
                            <h3 className="text-lg font-semibold text-white mb-2">Expert Reviews</h3>
                            <p className="text-gray-400 text-sm">Curated insights from industry experts</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ComparePage; 