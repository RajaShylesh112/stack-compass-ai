import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Database, User, Plus, Trash2, Save } from 'lucide-react';

interface User {
  $id: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isPro: boolean;
  savedStacksCount: number;
  $createdAt: string;
}

interface SavedStack {
  $id: string;
  userId: string;
  name: string;
  description?: string;
  stackData: any;
  $createdAt: string;
}

const AppwriteDemo = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [stacks, setStacks] = useState<SavedStack[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  const [newStack, setNewStack] = useState({
    name: '',
    description: '',
    stackData: { frontend: 'React', backend: 'Node.js', database: 'Appwrite' }
  });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/health');
      if (response.ok) {
        // API is working, try to fetch users (this will work with in-memory storage)
        toast({
          title: "API Connected",
          description: "Backend API is running with in-memory storage",
        });
      }
    } catch (error) {
      toast({
        title: "API Error",
        description: "Could not connect to backend API",
        variant: "destructive"
      });
    }
  };

  // Create a new user
  const createUser = async () => {
    if (!newUser.username) {
      toast({
        title: "Validation Error",
        description: "Username is required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const user = await response.json();
        setUsers(prev => [...prev, user]);
        setCurrentUser(user);
        setNewUser({ username: '', email: '', firstName: '', lastName: '' });
        toast({
          title: "Success",
          description: `User ${user.username} created successfully`,
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to create user",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Could not connect to server",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Save a new stack
  const saveStack = async () => {
    if (!currentUser) {
      toast({
        title: "No User Selected",
        description: "Please create or select a user first",
        variant: "destructive"
      });
      return;
    }

    if (!newStack.name) {
      toast({
        title: "Validation Error",
        description: "Stack name is required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${currentUser.$id}/stacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStack),
      });

      if (response.ok) {
        const stack = await response.json();
        setStacks(prev => [...prev, stack]);
        setNewStack({
          name: '',
          description: '',
          stackData: { frontend: 'React', backend: 'Node.js', database: 'Appwrite' }
        });
        toast({
          title: "Success",
          description: `Stack "${stack.name}" saved successfully`,
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to save stack",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Could not connect to server",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's stacks
  const fetchUserStacks = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/stacks`);
      if (response.ok) {
        const userStacks = await response.json();
        setStacks(userStacks);
      }
    } catch (error) {
      console.error('Failed to fetch stacks:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserStacks(currentUser.$id);
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#FFFFFF] mb-4">Appwrite Integration Demo</h1>
          <p className="text-[#CCCCCC] text-lg">
            This demo shows the Appwrite integration working with fallback to in-memory storage.
          </p>
          <Badge variant="outline" className="mt-2">
            <Database className="w-4 h-4 mr-2" />
            Currently using in-memory storage
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Management */}
          <Card className="bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50">
            <CardHeader>
              <CardTitle className="text-[#FFFFFF] flex items-center">
                <User className="w-5 h-5 mr-2" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Username"
                  value={newUser.username}
                  onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-[#2A2A2A] border-[#333333] text-[#FFFFFF]"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-[#2A2A2A] border-[#333333] text-[#FFFFFF]"
                />
                <Input
                  placeholder="First Name"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser(prev => ({ ...prev, firstName: e.target.value }))}
                  className="bg-[#2A2A2A] border-[#333333] text-[#FFFFFF]"
                />
                <Input
                  placeholder="Last Name"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser(prev => ({ ...prev, lastName: e.target.value }))}
                  className="bg-[#2A2A2A] border-[#333333] text-[#FFFFFF]"
                />
              </div>
              
              <Button 
                onClick={createUser} 
                disabled={loading}
                className="w-full bg-[#A259FF] hover:bg-[#A259FF]/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create User
              </Button>

              {users.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[#FFFFFF] font-medium">Created Users:</h4>
                  {users.map((user) => (
                    <div
                      key={user.$id}
                      className={`p-3 rounded border cursor-pointer transition-colors ${
                        currentUser?.$id === user.$id
                          ? 'border-[#A259FF] bg-[#A259FF]/10'
                          : 'border-[#333333] hover:border-[#555555]'
                      }`}
                      onClick={() => setCurrentUser(user)}
                    >
                      <p className="text-[#FFFFFF] font-medium">{user.username}</p>
                      <p className="text-[#CCCCCC] text-sm">{user.email}</p>
                      <p className="text-[#888888] text-xs">
                        Stacks: {user.savedStacksCount} | Pro: {user.isPro ? 'Yes' : 'No'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stack Management */}
          <Card className="bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] border border-[#333333]/50">
            <CardHeader>
              <CardTitle className="text-[#FFFFFF] flex items-center">
                <Save className="w-5 h-5 mr-2" />
                Stack Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentUser ? (
                <>
                  <div className="p-3 rounded border border-[#333333] bg-[#2A2A2A]">
                    <p className="text-[#FFFFFF] font-medium">Current User: {currentUser.username}</p>
                    <p className="text-[#CCCCCC] text-sm">{currentUser.email}</p>
                  </div>

                  <div className="space-y-2">
                    <Input
                      placeholder="Stack Name"
                      value={newStack.name}
                      onChange={(e) => setNewStack(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-[#2A2A2A] border-[#333333] text-[#FFFFFF]"
                    />
                    <Textarea
                      placeholder="Stack Description"
                      value={newStack.description}
                      onChange={(e) => setNewStack(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-[#2A2A2A] border-[#333333] text-[#FFFFFF]"
                    />
                  </div>

                  <Button 
                    onClick={saveStack} 
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Stack
                  </Button>

                  {stacks.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[#FFFFFF] font-medium">Saved Stacks:</h4>
                      {stacks.map((stack) => (
                        <div
                          key={stack.$id}
                          className="p-3 rounded border border-[#333333] bg-[#2A2A2A]"
                        >
                          <p className="text-[#FFFFFF] font-medium">{stack.name}</p>
                          <p className="text-[#CCCCCC] text-sm">{stack.description}</p>
                          <p className="text-[#888888] text-xs">
                            {JSON.stringify(stack.stackData)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#CCCCCC] mb-4">Please create or select a user to manage stacks</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppwriteDemo;