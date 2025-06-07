import { 
  type User, 
  type InsertUser, 
  type SavedStack, 
  type InsertSavedStack,
  type UpdateUserProfile,
  databases,
  DATABASE_ID,
  USERS_COLLECTION_ID,
  SAVED_STACKS_COLLECTION_ID,
  ID,
  Query
} from "@shared/appwrite";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(id: string, profile: Partial<User>): Promise<User>;
  getUserSavedStacks(userId: string): Promise<SavedStack[]>;
  saveStack(userId: string, stack: InsertSavedStack): Promise<SavedStack>;
  deleteStack(userId: string, stackId: string): Promise<void>;
}

export class AppwriteStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    try {
      const doc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, id);
      return {
        $id: doc.$id,
        username: doc.username,
        email: doc.email,
        firstName: doc.firstName,
        lastName: doc.lastName,
        profileImageUrl: doc.profileImageUrl,
        isPro: doc.isPro || false,
        savedStacksCount: doc.savedStacksCount || 0,
        stripeCustomerId: doc.stripeCustomerId,
        stripeSubscriptionId: doc.stripeSubscriptionId,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt
      } as User;
    } catch (error) {
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID, 
        USERS_COLLECTION_ID, 
        [Query.equal('username', username)]
      );
      
      if (response.documents.length === 0) return undefined;
      
      const doc = response.documents[0];
      return {
        $id: doc.$id,
        username: doc.username,
        email: doc.email,
        firstName: doc.firstName,
        lastName: doc.lastName,
        profileImageUrl: doc.profileImageUrl,
        isPro: doc.isPro || false,
        savedStacksCount: doc.savedStacksCount || 0,
        stripeCustomerId: doc.stripeCustomerId,
        stripeSubscriptionId: doc.stripeSubscriptionId,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt
      } as User;
    } catch (error) {
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const userData = {
      username: insertUser.username,
      email: insertUser.email || '',
      firstName: insertUser.firstName || '',
      lastName: insertUser.lastName || '',
      profileImageUrl: insertUser.profileImageUrl || '',
      isPro: insertUser.isPro || false,
      savedStacksCount: insertUser.savedStacksCount || 0,
      stripeCustomerId: insertUser.stripeCustomerId || '',
      stripeSubscriptionId: insertUser.stripeSubscriptionId || ''
    };

    const doc = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      userData
    );
    
    return {
      $id: doc.$id,
      username: doc.username,
      email: doc.email,
      firstName: doc.firstName,
      lastName: doc.lastName,
      profileImageUrl: doc.profileImageUrl,
      isPro: doc.isPro || false,
      savedStacksCount: doc.savedStacksCount || 0,
      stripeCustomerId: doc.stripeCustomerId,
      stripeSubscriptionId: doc.stripeSubscriptionId,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt
    } as User;
  }

  async updateUserProfile(id: string, profile: Partial<User>): Promise<User> {
    const doc = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      id,
      profile
    );
    
    return {
      $id: doc.$id,
      username: doc.username,
      email: doc.email,
      firstName: doc.firstName,
      lastName: doc.lastName,
      profileImageUrl: doc.profileImageUrl,
      isPro: doc.isPro || false,
      savedStacksCount: doc.savedStacksCount || 0,
      stripeCustomerId: doc.stripeCustomerId,
      stripeSubscriptionId: doc.stripeSubscriptionId,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt
    } as User;
  }

  async getUserSavedStacks(userId: string): Promise<SavedStack[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        SAVED_STACKS_COLLECTION_ID,
        [Query.equal('userId', userId)]
      );
      
      return response.documents.map(doc => ({
        $id: doc.$id,
        userId: doc.userId,
        name: doc.name,
        description: doc.description,
        stackData: typeof doc.stackData === 'string' ? JSON.parse(doc.stackData) : doc.stackData,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt
      })) as SavedStack[];
    } catch (error) {
      return [];
    }
  }

  async saveStack(userId: string, stack: InsertSavedStack): Promise<SavedStack> {
    const stackData = {
      userId,
      name: stack.name,
      description: stack.description || '',
      stackData: JSON.stringify(stack.stackData)
    };

    const doc = await databases.createDocument(
      DATABASE_ID,
      SAVED_STACKS_COLLECTION_ID,
      ID.unique(),
      stackData
    );

    // Update user's saved stacks count
    try {
      const user = await this.getUser(userId);
      if (user) {
        await this.updateUserProfile(userId, { 
          savedStacksCount: (user.savedStacksCount || 0) + 1 
        });
      }
    } catch (error) {
      console.error('Error updating user stack count:', error);
    }
    
    return {
      $id: doc.$id,
      userId: doc.userId,
      name: doc.name,
      description: doc.description,
      stackData: JSON.parse(doc.stackData as string),
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt
    } as SavedStack;
  }

  async deleteStack(userId: string, stackId: string): Promise<void> {
    try {
      const stack = await databases.getDocument(DATABASE_ID, SAVED_STACKS_COLLECTION_ID, stackId);
      
      if (stack && stack.userId === userId) {
        await databases.deleteDocument(DATABASE_ID, SAVED_STACKS_COLLECTION_ID, stackId);
        
        // Update user's saved stacks count
        const user = await this.getUser(userId);
        if (user && user.savedStacksCount && user.savedStacksCount > 0) {
          await this.updateUserProfile(userId, { 
            savedStacksCount: user.savedStacksCount - 1 
          });
        }
      }
    } catch (error) {
      console.error('Error deleting stack:', error);
    }
  }
}

// Fallback in-memory storage for development
export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private stacks: Map<string, SavedStack> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = ID.unique();
    const now = new Date().toISOString();
    const user: User = {
      $id: id,
      username: insertUser.username,
      email: insertUser.email || '',
      firstName: insertUser.firstName || '',
      lastName: insertUser.lastName || '',
      profileImageUrl: insertUser.profileImageUrl || '',
      isPro: insertUser.isPro || false,
      savedStacksCount: insertUser.savedStacksCount || 0,
      stripeCustomerId: insertUser.stripeCustomerId || '',
      stripeSubscriptionId: insertUser.stripeSubscriptionId || '',
      $createdAt: now,
      $updatedAt: now
    };
    
    this.users.set(id, user);
    return user;
  }

  async updateUserProfile(id: string, profile: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error('User not found');
    
    const updatedUser: User = {
      ...user,
      ...profile,
      $updatedAt: new Date().toISOString()
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getUserSavedStacks(userId: string): Promise<SavedStack[]> {
    return Array.from(this.stacks.values()).filter(stack => stack.userId === userId);
  }

  async saveStack(userId: string, stack: InsertSavedStack): Promise<SavedStack> {
    const id = ID.unique();
    const now = new Date().toISOString();
    const savedStack: SavedStack = {
      $id: id,
      userId,
      name: stack.name,
      description: stack.description || '',
      stackData: stack.stackData,
      $createdAt: now,
      $updatedAt: now
    };
    
    this.stacks.set(id, savedStack);
    
    // Update user's saved stacks count
    const user = this.users.get(userId);
    if (user) {
      await this.updateUserProfile(userId, { 
        savedStacksCount: (user.savedStacksCount || 0) + 1 
      });
    }
    
    return savedStack;
  }

  async deleteStack(userId: string, stackId: string): Promise<void> {
    const stack = this.stacks.get(stackId);
    if (stack && stack.userId === userId) {
      this.stacks.delete(stackId);
      
      // Update user's saved stacks count
      const user = this.users.get(userId);
      if (user && user.savedStacksCount > 0) {
        await this.updateUserProfile(userId, { 
          savedStacksCount: user.savedStacksCount - 1 
        });
      }
    }
  }
}

// Initialize storage based on environment
const isAppwriteConfigured = process.env.APPWRITE_PROJECT_ID && process.env.APPWRITE_PROJECT_ID !== 'your_project_id_here';

export const storage: IStorage = isAppwriteConfigured 
  ? new AppwriteStorage() 
  : new MemStorage();
