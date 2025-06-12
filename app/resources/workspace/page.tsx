'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Plus,
  Search,
  Filter as FilterIcon,
  Heart,
  Edit,
  Copy,
  BarChart as BarChartIcon,
  Calendar,
  Code,
  Database,
  Server,
  Cloud,
  Trash2,
  Star
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface TechStack {
  id: string;
  name: string;
  description: string;
  frontend: string;
  backend: string;
  database: string;
  hosting: string;
  tags: string[];
  isFavorite: boolean;
  lastModified: string;
}

export default function WorkspacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [stacks, setStacks] = useState<TechStack[]>([
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with modern technologies',
      frontend: 'React',
      backend: 'Node.js',
      database: 'PostgreSQL',
      hosting: 'Vercel',
      tags: ['ecommerce', 'fullstack', 'react'],
      isFavorite: true,
      lastModified: '2023-05-15'
    },
    {
      id: '2',
      name: 'Content Management System',
      description: 'Headless CMS with Next.js and Strapi',
      frontend: 'Next.js',
      backend: 'Strapi',
      database: 'MongoDB',
      hosting: 'AWS',
      tags: ['cms', 'headless', 'nextjs'],
      isFavorite: false,
      lastModified: '2023-06-10'
    },
    {
      id: '3',
      name: 'Mobile App Backend',
      description: 'Scalable backend for mobile applications',
      frontend: 'React Native',
      backend: 'NestJS',
      database: 'PostgreSQL',
      hosting: 'Google Cloud',
      tags: ['mobile', 'backend', 'nodejs'],
      isFavorite: true,
      lastModified: '2023-06-20'
    },
    {
      id: '4',
      name: 'Data Dashboard',
      description: 'Real-time analytics dashboard',
      frontend: 'Vue.js',
      backend: 'FastAPI',
      database: 'TimescaleDB',
      hosting: 'DigitalOcean',
      tags: ['analytics', 'dashboard', 'vue'],
      isFavorite: false,
      lastModified: '2023-04-28'
    },
    {
      id: '5',
      name: 'Social Media App',
      description: 'Full-featured social platform',
      frontend: 'React',
      backend: 'Node.js',
      database: 'MongoDB',
      hosting: 'AWS',
      tags: ['social', 'fullstack', 'react'],
      isFavorite: false,
      lastModified: '2023-06-01'
    },
    {
      id: '6',
      name: 'Portfolio Website',
      description: 'Personal portfolio with blog',
      frontend: 'Next.js',
      backend: 'None',
      database: 'None',
      hosting: 'Vercel',
      tags: ['portfolio', 'static', 'nextjs'],
      isFavorite: true,
      lastModified: '2023-05-22'
    }
  ]);

  const filteredStacks = useMemo(() => {
    return stacks.filter(stack => {
      const matchesSearch = stack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stack.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stack.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter = filterBy === 'all' ||
        (filterBy === 'favorites' && stack.isFavorite) ||
        (filterBy === 'frontend' && stack.frontend) ||
        (filterBy === 'backend' && stack.backend) ||
        (filterBy === 'database' && stack.database) ||
        (filterBy === 'hosting' && stack.hosting);

      return matchesSearch && matchesFilter;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'date') {
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      } else if (sortBy === 'favorite') {
        return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
      }
      return 0;
    });
  }, [stacks, searchTerm, filterBy, sortBy]);

  const toggleFavorite = (id: string) => {
    setStacks(stacks.map(stack =>
      stack.id === id ? { ...stack, isFavorite: !stack.isFavorite } : stack
    ));
  };

  const duplicateStack = (stack: TechStack) => {
    const newStack = {
      ...stack,
      id: Math.random().toString(36).substr(2, 9),
      name: `${stack.name} (Copy)`,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setStacks([...stacks, newStack]);
  };

  const deleteStack = (id: string) => {
    setStacks(stacks.filter(stack => stack.id !== id));
  };

  const getTechIcon = (tech: string) => {
    if (!tech || tech === 'None') return null;

    const techLower = tech.toLowerCase();
    if (techLower.includes('react') || techLower.includes('vue') || techLower.includes('angular') || techLower.includes('svelte')) {
      return <Code className="h-4 w-4 text-blue-500 mr-1" />;
    } else if (techLower.includes('node') || techLower.includes('express') || techLower.includes('django') || techLower.includes('laravel')) {
      return <Server className="h-4 w-4 text-green-500 mr-1" />;
    } else if (techLower.includes('mongo') || techLower.includes('postgres') || techLower.includes('mysql') || techLower.includes('sqlite')) {
      return <Database className="h-4 w-4 text-yellow-500 mr-1" />;
    } else if (techLower.includes('vercel') || techLower.includes('netlify') || techLower.includes('aws') || techLower.includes('heroku') || techLower.includes('digitalocean')) {
      return <Cloud className="h-4 w-4 text-purple-500 mr-1" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Stacks</h1>
            <p className="text-muted-foreground">Manage and organize your technology stacks</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Stack
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stacks..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <FilterIcon className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stacks</SelectItem>
              <SelectItem value="favorites">Favorites</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="database">Database</SelectItem>
              <SelectItem value="hosting">Hosting</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <BarChartIcon className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="date">Last Modified</SelectItem>
              <SelectItem value="favorite">Favorites First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredStacks.length === 0 ? (
          <Card className="text-center p-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No stacks found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchTerm ? 'Try adjusting your search or filter' : 'Create a new stack to get started'}
            </p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              New Stack
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStacks.map((stack) => (
              <Card key={stack.id} className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{stack.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => toggleFavorite(stack.id)}
                    >
                      {stack.isFavorite ? (
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ) : (
                        <Star className="h-5 w-5 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {stack.description}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-2 mb-4">
                    {stack.frontend && stack.frontend !== 'None' && (
                      <div className="flex items-center text-sm">
                        <span className="font-medium w-24">Frontend</span>
                        <span className="flex items-center">
                          {getTechIcon(stack.frontend)}
                          {stack.frontend}
                        </span>
                      </div>
                    )}
                    {stack.backend && stack.backend !== 'None' && (
                      <div className="flex items-center text-sm">
                        <span className="font-medium w-24">Backend</span>
                        <span className="flex items-center">
                          {getTechIcon(stack.backend)}
                          {stack.backend}
                        </span>
                      </div>
                    )}
                    {stack.database && stack.database !== 'None' && (
                      <div className="flex items-center text-sm">
                        <span className="font-medium w-24">Database</span>
                        <span className="flex items-center">
                          {getTechIcon(stack.database)}
                          {stack.database}
                        </span>
                      </div>
                    )}
                    {stack.hosting && stack.hosting !== 'None' && (
                      <div className="flex items-center text-sm">
                        <span className="font-medium w-24">Hosting</span>
                        <span className="flex items-center">
                          {getTechIcon(stack.hosting)}
                          {stack.hosting}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        Modified {stack.lastModified}
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => duplicateStack(stack)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => deleteStack(stack.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {stack.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {stack.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
