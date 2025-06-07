import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Crown, 
  Check, 
  X, 
  Star, 
  Zap, 
  Shield, 
  BarChart3, 
  Download,
  FileText,
  Globe,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';
import { useLocation } from 'wouter';

const Pricing = () => {
  const [, setLocation] = useLocation();
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const features = [
    {
      category: "Stack Builder",
      free: "Unlimited",
      pro: "—",
      icon: <Globe className="w-4 h-4" />,
      available: { free: true, pro: true }
    },
    {
      category: "Save Stacks",
      free: "Up to 3",
      pro: "Unlimited",
      icon: <Star className="w-4 h-4" />,
      available: { free: true, pro: true }
    },
    {
      category: "AI Suggestions",
      free: "Static only",
      pro: "Custom GPT-4 + prompt tuning",
      icon: <Zap className="w-4 h-4" />,
      available: { free: true, pro: true }
    },
    {
      category: "Compatibility Explorer",
      free: "Matrix mode only",
      pro: "With Sankey and edge-case explanations",
      icon: <BarChart3 className="w-4 h-4" />,
      available: { free: true, pro: true }
    },
    {
      category: "Analytics",
      free: "Global trends",
      pro: "Personalized insights",
      icon: <BarChart3 className="w-4 h-4" />,
      available: { free: true, pro: true }
    },
    {
      category: "Compare Stacks",
      free: "Pairwise",
      pro: "N-way compare",
      icon: <Shield className="w-4 h-4" />,
      available: { free: true, pro: true }
    },
    {
      category: "Export Stack → Boilerplate",
      free: "Text summary only",
      pro: "GitHub boilerplate + deploy",
      icon: <Download className="w-4 h-4" />,
      available: { free: true, pro: true }
    },
    {
      category: "Stack PDF Reports",
      free: "—",
      pro: "✓",
      icon: <FileText className="w-4 h-4" />,
      available: { free: false, pro: true }
    }
  ];

  const handleUpgrade = () => {
    // This would integrate with Stripe checkout
    console.log("Redirecting to Stripe checkout...");
  };

  const handleGoBack = () => {
    setLocation('/profile');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={handleGoBack}
            variant="outline"
            className="border-[#333333] text-[#CCCCCC] hover:text-[#FFFFFF] mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
          <h1 className="text-4xl font-bold text-[#FFFFFF] mb-4">Upgrade to Pro</h1>
          <p className="text-[#CCCCCC] text-lg">Unlock premium features and supercharge your development workflow</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Free Tier */}
          <Card className="bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-[#CCCCCC]" />
              </div>
              <CardTitle className="text-2xl text-[#FFFFFF]">Free Tier</CardTitle>
              <div className="text-3xl font-bold text-[#FFFFFF] mb-2">$0</div>
              <p className="text-[#CCCCCC]">Perfect for getting started</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-[#CCCCCC]">Unlimited stack building</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-[#CCCCCC]">Save up to 3 stacks</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-[#CCCCCC]">Basic AI suggestions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-[#CCCCCC]">Matrix compatibility view</span>
                </li>
                <li className="flex items-center space-x-3">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="text-[#666666]">PDF reports</span>
                </li>
                <li className="flex items-center space-x-3">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="text-[#666666]">GitHub boilerplate export</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Pro Tier */}
          <Card className="bg-gradient-to-br from-[#A259FF]/20 via-[#1E1E1E] to-[#A259FF]/10 border border-[#A259FF]/50 rounded-2xl relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold">
                Most Popular
              </Badge>
            </div>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#A259FF] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#FFFFFF]">Pro Tier</CardTitle>
              <div className="text-3xl font-bold text-[#FFFFFF] mb-2">
                $9.99
                <span className="text-lg text-[#CCCCCC] font-normal">/month</span>
              </div>
              <p className="text-[#CCCCCC]">For serious developers</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-[#CCCCCC]">Everything in Free +</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-[#CCCCCC]">Unlimited saved stacks</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-[#CCCCCC]">Custom GPT-4 AI suggestions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-[#CCCCCC]">Advanced compatibility analysis</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-[#CCCCCC]">Personalized insights</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-[#CCCCCC]">N-way stack comparison</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-[#CCCCCC]">GitHub boilerplate + deploy</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-[#CCCCCC]">PDF reports</span>
                </li>
              </ul>
              <Button 
                onClick={handleUpgrade}
                className="w-full bg-gradient-to-r from-[#A259FF] to-purple-600 hover:from-[#A259FF]/90 hover:to-purple-700 text-white py-3 text-lg font-semibold"
              >
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Feature Comparison */}
        <Card className="bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl">
          <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
            <CardHeader>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-center space-x-3 hover:opacity-80 transition-opacity">
                  <CardTitle className="text-2xl text-[#FFFFFF]">Detailed Feature Comparison</CardTitle>
                  <ChevronDown 
                    className={`w-6 h-6 text-[#FFFFFF] transition-transform duration-200 ${
                      isComparisonOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#333333]">
                        <th className="text-left py-4 text-[#FFFFFF] font-semibold">Feature</th>
                        <th className="text-center py-4 text-[#FFFFFF] font-semibold">Free Tier</th>
                        <th className="text-center py-4 text-yellow-500 font-semibold">Pro Tier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {features.map((feature, index) => (
                        <tr key={index} className="border-b border-[#333333]/30">
                          <td className="py-4">
                            <div className="flex items-center space-x-3">
                              {feature.icon}
                              <span className="text-[#FFFFFF] font-medium">{feature.category}</span>
                            </div>
                          </td>
                          <td className="text-center py-4">
                            <div className="flex items-center justify-center space-x-2">
                              {feature.available.free ? (
                                <>
                                  <Check className="w-4 h-4 text-green-500" />
                                  <span className="text-[#CCCCCC]">{feature.free}</span>
                                </>
                              ) : (
                                <>
                                  <X className="w-4 h-4 text-red-500" />
                                  <span className="text-[#666666]">Not available</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="text-center py-4">
                            <div className="flex items-center justify-center space-x-2">
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-yellow-500 font-medium">{feature.pro}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-[#A259FF]/20 to-purple-600/20 border border-[#A259FF]/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-[#FFFFFF] mb-4">Ready to Supercharge Your Development?</h3>
            <p className="text-[#CCCCCC] mb-6 max-w-2xl mx-auto">
              Join thousands of developers who have upgraded to Pro and are building better tech stacks faster than ever.
            </p>
            <Button 
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-[#A259FF] to-purple-600 hover:from-[#A259FF]/90 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
            >
              <Crown className="w-5 h-5 mr-2" />
              Start Your Pro Journey - $9.99/month
            </Button>
            <p className="text-[#888888] text-sm mt-4">Cancel anytime. No long-term commitment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;