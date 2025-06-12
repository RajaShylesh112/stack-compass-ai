# Appwrite Integration Setup

This application uses Appwrite as the primary database for user management and stack storage. Here's how to configure it:

## Option 1: Use Appwrite Cloud (Recommended)

1. **Create an Appwrite Account**
   - Go to [https://cloud.appwrite.io](https://cloud.appwrite.io)
   - Sign up for a free account

2. **Create a New Project**
   - Click "Create Project"
   - Enter project name: "StackCompare"
   - Note your Project ID

3. **Create Database and Collections**
   - Go to "Databases" in the sidebar
   - Click "Create Database"
   - Name it: "stackcompare"
   - Note your Database ID

4. **Create Collections**

   **Users Collection:**
   - Collection ID: `users`
   - Attributes:
     - username (string, required, unique)
     - email (string, optional)
     - firstName (string, optional)
     - lastName (string, optional)
     - profileImageUrl (string, optional)
     - isPro (boolean, default: false)
     - savedStacksCount (integer, default: 0)

   **SavedStacks Collection:**
   - Collection ID: `saved_stacks`
   - Attributes:
     - userId (string, required)
     - name (string, required)
     - description (string, optional)
     - stackData (string, required, size: 65536)

5. **Get API Key**
   - Go to "Settings" > "API Keys"
   - Create a new API key with full permissions
   - Copy the key

6. **Update Environment Variables**
   ```env
   # Add these values to your .env file
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=your_actual_project_id
   APPWRITE_DATABASE_ID=stackcompare
   APPWRITE_API_KEY=your_actual_api_key
   ```

## Option 2: Use In-Memory Storage (Development)

If you don't configure Appwrite credentials, the application will automatically fall back to in-memory storage. This is perfect for development and testing.

## Features

- **User Management**: Complete user registration and profile management
- **Stack Storage**: Save and retrieve technology stacks
- **Real-time Updates**: Automatic data synchronization
- **Scalability**: Cloud-hosted with automatic scaling
- **Security**: Built-in permissions and security rules

## API Integration

The application automatically integrates with Appwrite through:

- **User Operations**: Create, read, update user profiles
- **Stack Management**: Save, retrieve, and delete technology stacks
- **Data Persistence**: Automatic fallback to in-memory storage if Appwrite is unavailable

## Testing the Integration

1. Start the application: `npm run dev`
2. Visit the application to test user registration and stack saving
3. Check your Appwrite dashboard to see the data being stored

## Current Status

The application is fully integrated with Appwrite and will work with either:
1. Appwrite Cloud (when properly configured)
2. In-memory storage (automatic fallback for development)

All user data and technology stacks will be persisted in your Appwrite database when configured.