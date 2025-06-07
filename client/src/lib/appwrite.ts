import { Client, Account, Databases, ID, Query } from 'appwrite';

// Appwrite configuration for client-side
export const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '6843c4b5001f4a0db778');

export const account = new Account(client);
export const databases = new Databases(client);

// Database and Collection IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '6843c9bc00393fb3ff24';
export const USERS_COLLECTION_ID = 'users';
export const SAVED_STACKS_COLLECTION_ID = 'saved_stacks';

// User types for client
export interface User {
  $id: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  isPro: boolean;
  savedStacksCount: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface SavedStack {
  $id: string;
  userId: string;
  name: string;
  description?: string;
  stackData: any;
  $createdAt: string;
  $updatedAt: string;
}

// Auth helper functions
export const authService = {
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  },

  async login(email: string, password: string) {
    return await account.createEmailPasswordSession(email, password);
  },

  async register(email: string, password: string, name: string) {
    return await account.create(ID.unique(), email, password, name);
  },

  async logout() {
    return await account.deleteSession('current');
  }
};

// Database helper functions
export const dbService = {
  async getUser(userId: string): Promise<User | null> {
    try {
      const user = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, userId);
      return user as unknown as User;
    } catch (error) {
      return null;
    }
  },

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal('username', username)]
      );
      return response.documents[0] as unknown as User || null;
    } catch (error) {
      return null;
    }
  },

  async getUserStacks(userId: string): Promise<SavedStack[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        SAVED_STACKS_COLLECTION_ID,
        [Query.equal('userId', userId)]
      );
      return response.documents.map(doc => ({
        ...doc,
        stackData: typeof doc.stackData === 'string' ? JSON.parse(doc.stackData) : doc.stackData
      })) as unknown as SavedStack[];
    } catch (error) {
      return [];
    }
  },

  async saveStack(userId: string, stackData: { name: string; description?: string; stackData: any }): Promise<SavedStack | null> {
    try {
      const data = {
        userId,
        name: stackData.name,
        description: stackData.description || '',
        stackData: JSON.stringify(stackData.stackData)
      };

      const doc = await databases.createDocument(
        DATABASE_ID,
        SAVED_STACKS_COLLECTION_ID,
        ID.unique(),
        data
      );

      return {
        $id: doc.$id,
        userId: doc.userId,
        name: doc.name,
        description: doc.description,
        stackData: JSON.parse(doc.stackData as string),
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt
      } as SavedStack;
    } catch (error) {
      return null;
    }
  },

  async deleteStack(stackId: string): Promise<boolean> {
    try {
      await databases.deleteDocument(DATABASE_ID, SAVED_STACKS_COLLECTION_ID, stackId);
      return true;
    } catch (error) {
      return false;
    }
  }
};

export { ID, Query };