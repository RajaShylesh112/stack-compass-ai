import { Client, Databases, Account, ID, Query } from 'appwrite';

// Create separate clients for server and client operations
export const serverClient = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID || 'default-project');

// For client-side operations (without API key)
export const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID || 'default-project');

export const databases = new Databases(serverClient);
export const account = new Account(client);

// Database and Collection IDs
export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || 'default-database';
export const USERS_COLLECTION_ID = 'users';
export const SAVED_STACKS_COLLECTION_ID = 'saved_stacks';

// User types
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

export interface InsertUser {
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  isPro?: boolean;
  savedStacksCount?: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

// SavedStack types
export interface SavedStack {
  $id: string;
  userId: string;
  name: string;
  description?: string;
  stackData: any;
  $createdAt: string;
  $updatedAt: string;
}

export interface InsertSavedStack {
  name: string;
  description?: string;
  stackData: any;
}

export interface UpdateUserProfile {
  email?: string;
  firstName?: string;
  lastName?: string;
}

// Note: Collections and attributes should be created via Appwrite Console
// This is just for reference of the expected structure:
/*
Users Collection:
- username (string, required, unique)
- email (string, optional)
- firstName (string, optional)
- lastName (string, optional)
- profileImageUrl (string, optional)
- isPro (boolean, default: false)
- savedStacksCount (integer, default: 0)
- stripeCustomerId (string, optional)
- stripeSubscriptionId (string, optional)

SavedStacks Collection:
- userId (string, required)
- name (string, required)
- description (string, optional)
- stackData (string, required) // JSON stringified
*/

export { ID, Query };