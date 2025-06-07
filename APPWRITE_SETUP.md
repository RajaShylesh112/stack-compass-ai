# Appwrite Integration Setup

This application has been integrated with Appwrite to replace the PostgreSQL database setup. Here's how to configure it:

## Option 1: Use Appwrite Cloud (Recommended)

1. **Create an Appwrite Account**
   - Go to [https://cloud.appwrite.io](https://cloud.appwrite.io)
   - Sign up for a free account

2. **Create a New Project**
   - Click "Create Project"
   - Enter project name: "StackBuilder"
   - Note your Project ID

3. **Create Database and Collections**
   - Go to "Databases" in the sidebar
   - Click "Create Database"
   - Name it: "stackbuilder"
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
     - stripeCustomerId (string, optional)
     - stripeSubscriptionId (string, optional)

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
   # Replace these values in your .env file
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=your_actual_project_id
   APPWRITE_DATABASE_ID=stackbuilder
   APPWRITE_API_KEY=your_actual_api_key

   # Frontend configuration
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_actual_project_id
   VITE_APPWRITE_DATABASE_ID=stackbuilder
   ```

## Option 2: Use In-Memory Storage (Development)

If you don't configure Appwrite credentials, the application will automatically fall back to in-memory storage. This is perfect for development and testing.

## Testing the Integration

1. Start the application: `npm run dev`
2. Visit `/appwrite-demo` to test the integration
3. Create users and save stacks to verify functionality

## Migration from PostgreSQL

The application has been updated to use Appwrite instead of PostgreSQL:

- ✅ User management with Appwrite documents
- ✅ Stack saving and retrieval
- ✅ Automatic fallback to in-memory storage
- ✅ Updated API endpoints to work with string IDs
- ✅ Type-safe integration with existing frontend

## Features

- **Authentication**: Ready for Appwrite Auth integration
- **Database**: Document-based storage with JSON support
- **Scalability**: Cloud-hosted with automatic scaling
- **Security**: Built-in permissions and security rules
- **Real-time**: Support for real-time updates (can be added)

## Current Status

The application is now fully integrated with Appwrite and will work with either:
1. Appwrite Cloud (when properly configured)
2. In-memory storage (automatic fallback for development)

Visit `/appwrite-demo` to see the integration in action!