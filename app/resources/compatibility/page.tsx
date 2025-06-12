'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CompatibilityExplorerPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock compatibility data
  const compatibilityMatrix = {
    'Next.js': {
      'Supabase': { status: 'full', notes: 'Perfect integration with built-in auth' },
      'Firebase': { status: 'warning', notes: 'Some SSR limitations' },
      'MongoDB': { status: 'full', notes: 'Works well with Mongoose' },
      'PostgreSQL': { status: 'full', notes: 'Excellent with Prisma ORM' },
      'Vercel': { status: 'full', notes: 'Made by the same team' },
      'AWS': { status: 'warning', notes: 'Requires custom configuration' }
    },
    'React': {
      'Supabase': { status: 'full', notes: 'Great client-side integration' },
      'Firebase': { status: 'full', notes: 'Excellent real-time features' },
      'MongoDB': { status: 'full', notes: 'Works with any backend' },
      'PostgreSQL': { status: 'full', notes: 'Backend-agnostic' },
      'Vercel': { status: 'full', notes: 'Static exports work great' },
      'AWS': { status: 'full', notes: 'S3 + CloudFront deployment' }
    },
    'Django': {
      'Supabase': { status: 'warning', notes: 'Limited to REST API usage' },
      'Firebase': { status: 'not-recommended', notes: 'Conflicting auth systems' },
      'MongoDB': { status: 'warning', notes: 'Use MongoEngine instead of ORM' },
      'PostgreSQL': { status: 'full', notes: 'Default Django database' },
      'Vercel': { status: 'warning', notes: 'Serverless limitations' },
      'AWS': { status: 'full', notes: 'EC2 + RDS recommended' }
    },
    'Express.js': {
      'Supabase': { status: 'full', notes: 'Easy REST API integration' },
      'Firebase': { status: 'full', notes: 'Admin SDK works perfectly' },
      'MongoDB': { status: 'full', notes: 'Classic MEAN/MERN stack' },
      'PostgreSQL': { status: 'full', notes: 'Use with Sequelize or Prisma' },
      'Vercel': { status: 'full', notes: 'Serverless functions' },
      'AWS': { status: 'full', notes: 'Lambda or EC2 deployment' }
    }
  };

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Database' },
    { id: 'deployment', name: 'Deployment' },
  ];

  const technologies = [
    { id: 'nextjs', name: 'Next.js', category: 'frontend' },
    { id: 'react', name: 'React', category: 'frontend' },
    { id: 'django', name: 'Django', category: 'backend' },
    { id: 'express', name: 'Express.js', category: 'backend' },
    { id: 'supabase', name: 'Supabase', category: 'database' },
    { id: 'firebase', name: 'Firebase', category: 'database' },
    { id: 'mongodb', name: 'MongoDB', category: 'database' },
    { id: 'postgresql', name: 'PostgreSQL', category: 'database' },
    { id: 'vercel', name: 'Vercel', category: 'deployment' },
    { id: 'aws', name: 'AWS', category: 'deployment' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'full':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Full Support
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Partial Support
          </Badge>
        );
      case 'not-recommended':
        return (
          <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">
            <XCircle className="h-3 w-3 mr-1" />
            Not Recommended
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Info className="h-3 w-3 mr-1" />
            Unknown
          </Badge>
        );
    }
  };

  const filteredTechnologies = technologies.filter(tech => {
    const matchesCategory = selectedCategory === 'all' || tech.category === selectedCategory;
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Compatibility Explorer</h1>
          <p className="text-muted-foreground">Check compatibility between different technologies in the stack</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search technologies..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Technology Compatibility Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Technology</TableHead>
                    <TableHead>Supabase</TableHead>
                    <TableHead>Firebase</TableHead>
                    <TableHead>MongoDB</TableHead>
                    <TableHead>PostgreSQL</TableHead>
                    <TableHead>Vercel</TableHead>
                    <TableHead>AWS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTechnologies.map((tech) => {
                    const compatibility = compatibilityMatrix[tech.name as keyof typeof compatibilityMatrix] || {};
                    return (
                      <TableRow key={tech.id}>
                        <TableCell className="font-medium">{tech.name}</TableCell>
                        <TableCell>
                          {compatibility.Supabase ? (
                            <div className="flex flex-col">
                              {getStatusBadge(compatibility.Supabase.status)}
                              <p className="text-xs text-muted-foreground mt-1">
                                {compatibility.Supabase.notes}
                              </p>
                            </div>
                          ) : '-'}
                        </TableCell>
                        <TableCell>
                          {compatibility.Firebase ? (
                            <div className="flex flex-col">
                              {getStatusBadge(compatibility.Firebase.status)}
                              <p className="text-xs text-muted-foreground mt-1">
                                {compatibility.Firebase.notes}
                              </p>
                            </div>
                          ) : '-'}
                        </TableCell>
                        <TableCell>
                          {compatibility.MongoDB ? (
                            <div className="flex flex-col">
                              {getStatusBadge(compatibility.MongoDB.status)}
                              <p className="text-xs text-muted-foreground mt-1">
                                {compatibility.MongoDB.notes}
                              </p>
                            </div>
                          ) : '-'}
                        </TableCell>
                        <TableCell>
                          {compatibility.PostgreSQL ? (
                            <div className="flex flex-col">
                              {getStatusBadge(compatibility.PostgreSQL.status)}
                              <p className="text-xs text-muted-foreground mt-1">
                                {compatibility.PostgreSQL.notes}
                              </p>
                            </div>
                          ) : '-'}
                        </TableCell>
                        <TableCell>
                          {compatibility.Vercel ? (
                            <div className="flex flex-col">
                              {getStatusBadge(compatibility.Vercel.status)}
                              <p className="text-xs text-muted-foreground mt-1">
                                {compatibility.Vercel.notes}
                              </p>
                            </div>
                          ) : '-'}
                        </TableCell>
                        <TableCell>
                          {compatibility.AWS ? (
                            <div className="flex flex-col">
                              {getStatusBadge(compatibility.AWS.status)}
                              <p className="text-xs text-muted-foreground mt-1">
                                {compatibility.AWS.notes}
                              </p>
                            </div>
                          ) : '-'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Full Support</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span>Partial Support</span>
              </div>
              <div className="flex items-center gap-3">
                <XCircle className="h-4 w-4 text-red-500" />
                <span>Not Recommended</span>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                This compatibility matrix helps you understand how well different technologies work together in a stack.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Use the search and filter options to find specific technologies</li>
                <li>Check the compatibility status between different components</li>
                <li>Hover over the status badges for more detailed information</li>
                <li>Consider the notes for each integration before making decisions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
