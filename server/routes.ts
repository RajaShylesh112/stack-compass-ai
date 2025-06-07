import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  type InsertUser, 
  type InsertSavedStack, 
  type UpdateUserProfile 
} from "@shared/appwrite";

// Validation schemas
const createUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional()
});

const saveStackSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  stackData: z.any().refine(val => val !== undefined, {
    message: "stackData is required"
  })
});

const updateProfileSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  isPro: z.boolean().optional()
});

export async function registerRoutes(app: Express): Promise<Server> {
  // User management routes
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = createUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
    }
  });

  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  app.get("/api/users/username/:username", async (req: Request, res: Response) => {
    try {
      const user = await storage.getUserByUsername(req.params.username);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  app.patch("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const profileData = updateProfileSchema.parse(req.body);
      const user = await storage.updateUserProfile(req.params.id, profileData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
    }
  });

  // Stack management routes
  app.get("/api/users/:userId/stacks", async (req: Request, res: Response) => {
    try {
      const stacks = await storage.getUserSavedStacks(req.params.userId);
      res.json(stacks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stacks' });
    }
  });

  app.post("/api/users/:userId/stacks", async (req: Request, res: Response) => {
    try {
      const validatedData = saveStackSchema.parse(req.body);
      const stackData: InsertSavedStack = {
        name: validatedData.name,
        description: validatedData.description,
        stackData: validatedData.stackData
      };
      const stack = await storage.saveStack(req.params.userId, stackData);
      res.json(stack);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
    }
  });

  app.delete("/api/users/:userId/stacks/:stackId", async (req: Request, res: Response) => {
    try {
      await storage.deleteStack(req.params.userId, req.params.stackId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete stack' });
    }
  });

  // Appwrite connection test
  app.get("/api/appwrite/ping", async (req: Request, res: Response) => {
    try {
      const projectId = process.env.APPWRITE_PROJECT_ID;
      const endpoint = process.env.APPWRITE_ENDPOINT;
      const databaseId = process.env.APPWRITE_DATABASE_ID;
      const apiKey = process.env.APPWRITE_API_KEY;
      
      // Check configuration completeness
      const configStatus = {
        projectId: projectId && projectId !== 'your_project_id_here' ? 'configured' : 'missing',
        endpoint: endpoint ? 'configured' : 'missing',
        databaseId: databaseId ? 'configured' : 'missing',
        apiKey: apiKey && apiKey !== 'your_api_key_here' ? 'configured' : 'missing'
      };

      if (!projectId || projectId === 'your_project_id_here') {
        return res.status(200).json({
          status: 'fallback',
          message: 'Using in-memory storage (Appwrite project not configured)',
          storage: 'memory',
          config: configStatus,
          instructions: 'Set APPWRITE_PROJECT_ID in your .env file'
        });
      }

      if (!apiKey || apiKey === 'your_api_key_here') {
        return res.status(200).json({
          status: 'fallback',
          message: 'Using in-memory storage (Appwrite API key missing)',
          storage: 'memory',
          config: configStatus,
          instructions: [
            '1. Go to https://cloud.appwrite.io',
            '2. Select your project',
            '3. Go to Settings > API Keys',
            '4. Create a new API key with database permissions',
            '5. Set APPWRITE_API_KEY in your .env file'
          ]
        });
      }

      // Test Appwrite connection
      try {
        const { databases, client } = await import("@shared/appwrite");
        
        // First test basic connection
        try {
          await databases.list();
        } catch (listError: any) {
          throw new Error(`Database access failed: ${listError.message}`);
        }

        // Try to access our specific database
        try {
          await databases.get(databaseId!);
        } catch (dbError: any) {
          if (dbError.code === 404) {
            return res.status(200).json({
              status: 'database_missing',
              message: 'Connected to Appwrite but database not found',
              storage: 'memory',
              config: configStatus,
              instructions: [
                '1. Create a database named "stackbuilder" in your Appwrite console',
                '2. Create collections: "users" and "saved_stacks"',
                '3. Set up the required attributes as shown in APPWRITE_SETUP.md'
              ]
            });
          }
          throw dbError;
        }

        // Test collections exist
        try {
          const collections = await databases.listCollections(databaseId!);
          const hasUsers = collections.collections.some(c => c.$id === 'users');
          const hasStacks = collections.collections.some(c => c.$id === 'saved_stacks');

          if (!hasUsers || !hasStacks) {
            return res.status(200).json({
              status: 'collections_missing',
              message: 'Database exists but collections are missing',
              storage: 'memory',
              config: configStatus,
              collections: {
                users: hasUsers ? 'found' : 'missing',
                saved_stacks: hasStacks ? 'found' : 'missing'
              },
              instructions: [
                'Create missing collections in your Appwrite console:',
                hasUsers ? '' : '- Create "users" collection',
                hasStacks ? '' : '- Create "saved_stacks" collection'
              ].filter(Boolean)
            });
          }

          // Everything is set up correctly
          res.json({
            status: 'connected',
            message: 'Successfully connected to Appwrite with all collections',
            storage: 'appwrite',
            config: configStatus,
            collections: {
              users: 'found',
              saved_stacks: 'found'
            },
            timestamp: new Date().toISOString()
          });

        } catch (collectionError: any) {
          throw new Error(`Collection check failed: ${collectionError.message}`);
        }

      } catch (appwriteError: any) {
        res.status(500).json({
          status: 'connection_error',
          error: 'Appwrite connection failed',
          details: appwriteError.message || 'Unknown error',
          storage: 'memory',
          config: configStatus,
          instructions: [
            'Check your Appwrite configuration:',
            '1. Verify your project ID is correct',
            '2. Ensure your API key has proper permissions',
            '3. Check if your endpoint URL is accessible'
          ]
        });
      }
    } catch (error: any) {
      res.status(500).json({
        status: 'server_error',
        error: 'Server error during ping test',
        details: error.message
      });
    }
  });

  // Health check
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
