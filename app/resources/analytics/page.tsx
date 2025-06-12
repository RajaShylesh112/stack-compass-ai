'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend } from 'recharts';
import { TrendingUp, Globe, Users, Download, BarChart as BarChartIcon, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AnalyticsPage() {
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stack Analytics</h1>
            <p className="text-muted-foreground">Insights and trends in technology stack adoption</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="na">North America</SelectItem>
                <SelectItem value="eu">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Stacks Tracked</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,458</div>
              <p className="text-xs text-muted-foreground">+12.3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,742</div>
              <p className="text-xs text-muted-foreground">+5.7% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Top Stack</CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MERN</div>
              <p className="text-xs text-muted-foreground">28.4% of all stacks</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Global Coverage</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">countries using tracked stacks</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Stack Popularity</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stackUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#8884d8" radius={[4, 4, 0, 0]}>
                    {stackUsageData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.growth >= 0 ? '#10b981' : '#ef4444'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Technology Categories</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={techCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {techCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Adoption Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="frontend" stroke="#6366f1" strokeWidth={2} />
                  <Line type="monotone" dataKey="backend" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="database" stroke="#06b6d4" strokeWidth={2} />
                  <Line type="monotone" dataKey="auth" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Open Source vs SaaS</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="relative w-64 h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={openSourceVsSaas}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {openSourceVsSaas.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {openSourceVsSaas.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
