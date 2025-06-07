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

  // Health check
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
