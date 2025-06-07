import { Client, Databases, Account, ID, Query } from 'appwrite';

// Appwrite configuration
export const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID || '');

// Set API key for server-side operations
if (process.env.APPWRITE_API_KEY && process.env.APPWRITE_API_KEY !== 'your_api_key_here') {
  client.setKey(process.env.APPWRITE_API_KEY);
}

export const databases = new Databases(client);
export const account = new Account(client);

// Database and Collection IDs
export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || 'stackbuilder';
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