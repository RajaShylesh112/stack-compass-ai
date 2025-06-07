import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Settings, 
  Crown, 
  Star, 
  Shield, 
  Zap, 
  BarChart3, 
  Download,
  FileText,
  Globe,
  Palette,
  Bell,
  Lock,
  CreditCard,
  Check,
  X
} from 'lucide-react';

const UserProfile = () => {
  const [user] = useState({
    id: 1,
    username: "john_dev",
    email: "john@example.com",
    firstName: "John",
    lastName: "Developer",
    isPro: false,
    savedStacksCount: 2,
    profileImageUrl: null,
    createdAt: new Date(),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const pricingFeatures = [
    {
      category: "Stack Builder",
      free: "Unlimited",
      pro: "—",
      icon: <Globe className="w-4 h-4" />
    },
    {
      category: "Save Stacks",
      free: "Up to 3",
      pro: "Unlimited",
      icon: <Star className="w-4 h-4" />
    },
    {
      category: "AI Suggestions",
      free: "Static only",
      pro: "Custom GPT-4 + prompt tuning",
      icon: <Zap className="w-4 h-4" />
    },
    {
      category: "Compatibility Explorer",
      free: "Matrix mode only",
      pro: "With Sankey and edge-case explanations",
      icon: <BarChart3 className="w-4 h-4" />
    },
    {
      category: "Analytics",
      free: "Global trends",
      pro: "Personalized insights",
      icon: <BarChart3 className="w-4 h-4" />
    },
    {
      category: "Compare Stacks",
      free: "Pairwise",
      pro: "N-way compare",
      icon: <Shield className="w-4 h-4" />
    },
    {
      category: "Export Stack → Boilerplate",
      free: "Text summary only",
      pro: "GitHub boilerplate + deploy",
      icon: <Download className="w-4 h-4" />
    },
    {
      category: "Stack PDF Reports",
      free: "—",
      pro: "✓",
      icon: <FileText className="w-4 h-4" />
    }
  ];

  const handleSaveProfile = () => {
    // Save profile logic would go here
    setIsEditing(false);
  };

  const handleUpgradeToPro = () => {
    // Navigate to checkout or handle subscription
    console.log("Upgrading to Pro...");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#FFFFFF] mb-2">User Profile</h1>
          <p className="text-[#CCCCCC]">Manage your account settings and subscription</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-1">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-[#A259FF] data-[state=active]:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="subscription" 
              className="data-[state=active]:bg-[#A259FF] data-[state=active]:text-white"
            >
              <Crown className="w-4 h-4 mr-2" />
              Subscription
            </TabsTrigger>
            <TabsTrigger 
              value="preferences" 
              className="data-[state=active]:bg-[#A259FF] data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Info Card */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-[#FFFFFF] flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Profile Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#A259FF] to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#FFFFFF]">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-[#CCCCCC]">@{user.username}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {user.isPro ? (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black">
                              <Crown className="w-3 h-3 mr-1" />
                              Pro Member
                            </Badge>
                          ) : (
                            <Badge className="bg-[#333333] text-[#CCCCCC]">
                              Free Tier
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-[#FFFFFF]">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                            disabled={!isEditing}
                            className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-[#FFFFFF]">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                            disabled={!isEditing}
                            className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#FFFFFF]">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          disabled={!isEditing}
                          className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF]"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      {isEditing ? (
                        <>
                          <Button 
                            onClick={handleSaveProfile}
                            className="bg-[#A259FF] hover:bg-[#A259FF]/90 text-white"
                          >
                            Save Changes
                          </Button>
                          <Button 
                            onClick={() => setIsEditing(false)}
                            variant="outline"
                            className="border-[#333333] text-[#CCCCCC] hover:text-[#FFFFFF]"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button 
                          onClick={() => setIsEditing(true)}
                          className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-[#FFFFFF]"
                        >
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Usage Stats Card */}
              <div>
                <Card className="bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-[#FFFFFF] flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>Usage Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[#CCCCCC]">Saved Stacks</span>
                        <span className="text-[#FFFFFF] font-semibold">
                          {user.savedStacksCount}/{user.isPro ? '∞' : '3'}
                        </span>
                      </div>
                      <Progress 
                        value={user.isPro ? 100 : (user.savedStacksCount / 3) * 100} 
                        className="h-2"
                      />
                      {!user.isPro && user.savedStacksCount >= 3 && (
                        <p className="text-yellow-500 text-sm">
                          ⚠ Limit reached. Upgrade to Pro for unlimited saves.
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#333333]">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[#CCCCCC]">Member since</span>
                          <span className="text-[#FFFFFF]">
                            {user.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#CCCCCC]">Account status</span>
                          <span className={user.isPro ? "text-yellow-500" : "text-[#FFFFFF]"}>
                            {user.isPro ? "Pro" : "Free"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            {/* Current Plan Card */}
            <Card className="bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-[#FFFFFF] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-5 h-5" />
                    <span>Current Plan</span>
                  </div>
                  {user.isPro && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black">
                      Pro Active
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.isPro ? (
                  <div className="text-center py-8">
                    <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#FFFFFF] mb-2">Pro Member</h3>
                    <p className="text-[#CCCCCC] mb-6">You have access to all premium features</p>
                    <Button 
                      variant="outline"
                      className="border-[#333333] text-[#CCCCCC] hover:text-[#FFFFFF]"
                    >
                      Manage Subscription
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-[#CCCCCC]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#FFFFFF] mb-2">Free Tier</h3>
                    <p className="text-[#CCCCCC] mb-6">Upgrade to unlock premium features</p>
                    <Button 
                      onClick={handleUpgradeToPro}
                      className="bg-gradient-to-r from-[#A259FF] to-purple-600 hover:from-[#A259FF]/90 hover:to-purple-700 text-white"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Pro
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Feature Comparison */}
            <Card className="bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-[#FFFFFF]">Feature Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center border-b border-[#333333] pb-4">
                    <div>
                      <h4 className="font-semibold text-[#FFFFFF]">Feature</h4>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#FFFFFF]">Free Tier</h4>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-500">Paid Tier</h4>
                    </div>
                  </div>

                  {pricingFeatures.map((feature, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 items-center py-3 border-b border-[#333333]/30">
                      <div className="flex items-center space-x-2">
                        {feature.icon}
                        <span className="text-[#FFFFFF] font-medium">{feature.category}</span>
                      </div>
                      <div className="text-center">
                        <span className={feature.free === "—" ? "text-[#666666]" : "text-[#CCCCCC]"}>
                          {feature.free}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className={feature.pro === "—" ? "text-[#666666]" : "text-yellow-500 font-medium"}>
                          {feature.pro}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {!user.isPro && (
                  <div className="mt-6 text-center">
                    <Button 
                      onClick={handleUpgradeToPro}
                      className="bg-gradient-to-r from-[#A259FF] to-purple-600 hover:from-[#A259FF]/90 hover:to-purple-700 text-white px-8 py-3"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade Now - $9.99/month
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* General Preferences */}
              <Card className="bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-[#FFFFFF] flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>General</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[#FFFFFF]">Theme</Label>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="border-[#A259FF] text-[#A259FF]">
                        <Palette className="w-4 h-4 mr-2" />
                        Dark
                      </Button>
                      <Button variant="outline" className="border-[#333333] text-[#CCCCCC]">
                        Light
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-[#FFFFFF] flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#CCCCCC]">New features</span>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#CCCCCC]">Marketing emails</span>
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#CCCCCC]">Security alerts</span>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;