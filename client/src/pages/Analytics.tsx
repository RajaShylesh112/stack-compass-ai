
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend } from 'recharts';
import { TrendingUp, Globe, Users, Download, BarChart3, Filter } from 'lucide-react';
import Header from '@/components/Header';

const Analytics = () => {
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  // Mock analytics data
  const stackUsageData = [
    { name: 'MERN', usage: 2840, growth: 12.5 },
    { name: 'Next.js + Supabase', usage: 2350, growth: 28.3 },
    { name: 'Django + React', usage: 1890, growth: -2.1 },
    { name: 'Laravel + Vue', usage: 1420, growth: 5.8 },
    { name: 'MEAN', usage: 1120, growth: -8.4 },
    { name: 'Ruby on Rails', usage: 890, growth: -15.2 }
  ];

  const trendData = [
    { month: 'Jan', frontend: 45, backend: 38, database: 42, auth: 35 },
    { month: 'Feb', frontend: 52, backend: 41, database: 45, auth: 38 },
    { month: 'Mar', frontend: 48, backend: 44, database: 48, auth: 42 },
    { month: 'Apr', frontend: 61, backend: 47, database: 51, auth: 45 },
    { month: 'May', frontend: 55, backend: 50, database: 54, auth: 48 },
    { month: 'Jun', frontend: 67, backend: 53, database: 57, auth: 52 }
  ];

  const techCategoryData = [
    { name: 'Frontend Frameworks', value: 35, color: '#6366f1' },
    { name: 'Backend Services', value: 28, color: '#8b5cf6' },
    { name: 'Databases', value: 22, color: '#06b6d4' },
    { name: 'Authentication', value: 15, color: '#10b981' }
  ];

  const openSourceVsSaas = [
    { name: 'Open Source', value: 68, color: '#059669' },
    { name: 'SaaS/Managed', value: 32, color: '#dc2626' }
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent/20 to-purple-600/20 px-4 py-2 rounded-full mb-4">
            <BarChart3 className="w-5 h-5 text-accent" />
            <span className="text-accent font-medium">Global Analytics</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground  mb-4">
            Tech Stack Analytics Dashboard
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Discover trends, popular combinations, and insights from the global developer community.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-foreground-secondary" />
            <span className="text-foreground-secondary">Filters:</span>
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40 bg-secondary border-gray-600 text-foreground">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent className="bg-secondary border-gray-600">
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="na">North America</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32 bg-secondary border-gray-600 text-foreground">
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent className="bg-secondary border-gray-600">
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
              <SelectItem value="1y">1 year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="neumorphic-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground-secondary text-sm">Total Stacks Analyzed</p>
                  <p className="text-2xl font-bold text-foreground">12,847</p>
                </div>
                <Globe className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          <Card className="neumorphic-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground-secondary text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-foreground">3,429</p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="neumorphic-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground-secondary text-sm">Growth Rate</p>
                  <p className="text-2xl font-bold text-foreground">+23.4%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="neumorphic-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground-secondary text-sm">New This Month</p>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                </div>
                <Download className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Most Popular Stacks */}
          <Card className="neumorphic-card border-0">
            <CardHeader>
              <CardTitle className="text-foreground ">Most Popular Tech Stacks</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stackUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#e5e7eb" fontSize={12} angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#e5e7eb" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#e5e7eb'
                    }} 
                  />
                  <Bar dataKey="usage" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Technology Trends */}
          <Card className="neumorphic-card border-0">
            <CardHeader>
              <CardTitle className="text-foreground ">Technology Adoption Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#e5e7eb" />
                  <YAxis stroke="#e5e7eb" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#e5e7eb'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="frontend" stroke="#6366f1" strokeWidth={2} />
                  <Line type="monotone" dataKey="backend" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="database" stroke="#06b6d4" strokeWidth={2} />
                  <Line type="monotone" dataKey="auth" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Technology Categories */}
          <Card className="neumorphic-card border-0">
            <CardHeader>
              <CardTitle className="text-foreground ">Technology Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={techCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {techCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#e5e7eb'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {techCategoryData.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                      <span className="text-foreground-secondary text-sm">{entry.name}</span>
                    </div>
                    <span className="text-foreground font-medium">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Open Source vs SaaS */}
          <Card className="neumorphic-card border-0">
            <CardHeader>
              <CardTitle className="text-foreground ">Open Source vs SaaS Preference</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={openSourceVsSaas}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {openSourceVsSaas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#e5e7eb'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {openSourceVsSaas.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                      <span className="text-foreground-secondary text-sm">{entry.name}</span>
                    </div>
                    <span className="text-foreground font-medium">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
