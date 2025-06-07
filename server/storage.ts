import { users, savedStacks, type User, type InsertUser, type SavedStack, type InsertSavedStack } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(id: number, profile: Partial<User>): Promise<User>;
  getUserSavedStacks(userId: number): Promise<SavedStack[]>;
  saveStack(userId: number, stack: InsertSavedStack): Promise<SavedStack>;
  deleteStack(userId: number, stackId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stacks: Map<number, SavedStack>;
  private currentUserId: number;
  private currentStackId: number;

  constructor() {
    this.users = new Map();
    this.stacks = new Map();
    this.currentUserId = 1;
    this.currentStackId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      email: null,
      firstName: null,
      lastName: null,
      profileImageUrl: null,
      isPro: false,
      savedStacksCount: 0,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      createdAt: now,
      updatedAt: now
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserProfile(id: number, profile: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser: User = {
      ...user,
      ...profile,
      updatedAt: new Date()
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getUserSavedStacks(userId: number): Promise<SavedStack[]> {
    const userStacks: SavedStack[] = [];
    for (const stack of this.stacks.values()) {
      if (stack.userId === userId) {
        userStacks.push(stack);
      }
    }
    return userStacks;
  }

  async saveStack(userId: number, stack: InsertSavedStack): Promise<SavedStack> {
    const id = this.currentStackId++;
    const now = new Date();
    const savedStack: SavedStack = {
      id,
      userId,
      ...stack,
      createdAt: now,
      updatedAt: now
    };
    
    this.stacks.set(id, savedStack);
    
    // Update user's saved stacks count
    const user = this.users.get(userId);
    if (user) {
      const updatedUser = { ...user, savedStacksCount: (user.savedStacksCount || 0) + 1 };
      this.users.set(userId, updatedUser);
    }
    
    return savedStack;
  }

  async deleteStack(userId: number, stackId: number): Promise<void> {
    const stack = this.stacks.get(stackId);
    if (stack && stack.userId === userId) {
      this.stacks.delete(stackId);
      
      // Update user's saved stacks count
      const user = this.users.get(userId);
      if (user && user.savedStacksCount && user.savedStacksCount > 0) {
        const updatedUser = { ...user, savedStacksCount: user.savedStacksCount - 1 };
        this.users.set(userId, updatedUser);
      }
    }
  }
}

export const storage = new MemStorage();
