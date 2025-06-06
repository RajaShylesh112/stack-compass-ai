
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Star, Download, GitBranch, AlertCircle } from 'lucide-react';

interface RecommendationDetailsProps {
  recommendation: {
    name: string;
    description: string;
    pros: string[];
    cons: string[];
    tags: string[];
  };
  onCompare: () => void;
}

const RecommendationDetails: React.FC<RecommendationDetailsProps> = ({ recommendation, onCompare }) => {
  // Mock real-world statistics data
  const usageData = [
    { name: 'Fortune 500', value: 78 },
    { name: 'Startups', value: 92 },
    { name: 'Mid-size', value: 65 },
    { name: 'Enterprise', value: 71 }
  ];

  const performanceMetrics = [
    { metric: 'Speed', score: 85 },
    { metric: 'Scalability', score: 92 },
    { metric: 'Developer Experience', score: 88 },
    { metric: 'Community Support', score: 90 },
    { metric: 'Learning Curve', score: 75 }
  ];

  const marketShare = [
    { name: 'This Stack', value: 35, color: '#6366f1' },
    { name: 'Competitors', value: 65, color: '#e5e7eb' }
  ];

  const stats = {
    githubStars: '47.2k',
    npmDownloads: '2.1M/week',
    contributors: '1,847',
    lastUpdate: '2 days ago',
    communitySize: '156k developers',
    jobMarket: '12,847 open positions'
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header with basic info */}
      <div className="neumorphic-card p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text font-poppins mb-2">{recommendation.name}</h2>
            <p className="text-text-secondary mb-4">{recommendation.description}</p>
            <div className="flex flex-wrap gap-2">
              {recommendation.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-accent/20 text-accent">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <Button onClick={onCompare} className="bg-accent hover:bg-accent/90 text-white">
            Compare with Others
          </Button>
        </div>
      </div>

      {/* Key Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="neumorphic-card border-0">
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-text">{stats.githubStars}</div>
            <div className="text-xs text-text-secondary">GitHub Stars</div>
          </CardContent>
        </Card>
        <Card className="neumorphic-card border-0">
          <CardContent className="p-4 text-center">
            <Download className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-text">{stats.npmDownloads}</div>
            <div className="text-xs text-text-secondary">Weekly Downloads</div>
          </CardContent>
        </Card>
        <Card className="neumorphic-card border-0">
          <CardContent className="p-4 text-center">
            <GitBranch className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-text">{stats.contributors}</div>
            <div className="text-xs text-text-secondary">Contributors</div>
          </CardContent>
        </Card>
        <Card className="neumorphic-card border-0">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-text">{stats.communitySize}</div>
            <div className="text-xs text-text-secondary">Community</div>
          </CardContent>
        </Card>
        <Card className="neumorphic-card border-0">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-lg font-bold text-text">{stats.jobMarket}</div>
            <div className="text-xs text-text-secondary">Job Openings</div>
          </CardContent>
        </Card>
        <Card className="neumorphic-card border-0">
          <CardContent className="p-4 text-center">
            <AlertCircle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-text">{stats.lastUpdate}</div>
            <div className="text-xs text-text-secondary">Last Update</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="neumorphic-card border-0">
          <CardHeader>
            <CardTitle className="text-text font-poppins">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="metric" stroke="#e5e7eb" fontSize={12} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#e5e7eb" />
                <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Market Share */}
        <Card className="neumorphic-card border-0">
          <CardHeader>
            <CardTitle className="text-text font-poppins">Market Adoption</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marketShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {marketShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {marketShare.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-text-secondary text-sm">{entry.name}</span>
                  </div>
                  <span className="text-text font-medium">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage by Company Size */}
      <Card className="neumorphic-card border-0">
        <CardHeader>
          <CardTitle className="text-text font-poppins">Adoption by Company Size</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={usageData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#e5e7eb" />
              <YAxis dataKey="name" type="category" stroke="#e5e7eb" width={80} />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="neumorphic-card border-0">
          <CardHeader>
            <CardTitle className="text-text font-poppins text-green-400">Pros</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendation.pros.map((pro, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-text-secondary">{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="neumorphic-card border-0">
          <CardHeader>
            <CardTitle className="text-text font-poppins text-red-400">Considerations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendation.cons.map((con, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-text-secondary">{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecommendationDetails;
