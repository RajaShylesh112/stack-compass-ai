import { Hono } from "hono";
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

export async function registerRoutes(app: Hono): Promise<Server> {
  // User management routes
  app.post("/api/users", async (c) => {
    try {
      const body = await c.req.json();
      const userData = createUserSchema.parse(body);
      const user = await storage.createUser(userData);
      return c.json(user);
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : 'Invalid data' }, 400);
    }
  });

  app.get("/api/users/:id", async (c) => {
    try {
      const id = c.req.param('id');
      const user = await storage.getUser(id);
      if (!user) {
        return c.json({ error: 'User not found' }, 404);
      }
      return c.json(user);
    } catch (error) {
      return c.json({ error: 'Failed to fetch user' }, 500);
    }
  });

  app.get("/api/users/username/:username", async (c) => {
    try {
      const username = c.req.param('username');
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return c.json({ error: 'User not found' }, 404);
      }
      return c.json(user);
    } catch (error) {
      return c.json({ error: 'Failed to fetch user' }, 500);
    }
  });

  app.patch("/api/users/:id", async (c) => {
    try {
      const id = c.req.param('id');
      const body = await c.req.json();
      const profileData = updateProfileSchema.parse(body);
      const user = await storage.updateUserProfile(id, profileData);
      return c.json(user);
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : 'Invalid data' }, 400);
    }
  });

  // Stack management routes
  app.get("/api/users/:userId/stacks", async (c) => {
    try {
      const userId = c.req.param('userId');
      const stacks = await storage.getUserSavedStacks(userId);
      return c.json(stacks);
    } catch (error) {
      return c.json({ error: 'Failed to fetch stacks' }, 500);
    }
  });

  app.post("/api/users/:userId/stacks", async (c) => {
    try {
      const userId = c.req.param('userId');
      const body = await c.req.json();
      const validatedData = saveStackSchema.parse(body);
      const stackData: InsertSavedStack = {
        name: validatedData.name,
        description: validatedData.description,
        stackData: validatedData.stackData
      };
      const stack = await storage.saveStack(userId, stackData);
      return c.json(stack);
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : 'Invalid data' }, 400);
    }
  });

  app.delete("/api/users/:userId/stacks/:stackId", async (c) => {
    try {
      const userId = c.req.param('userId');
      const stackId = c.req.param('stackId');
      await storage.deleteStack(userId, stackId);
      return c.json({ success: true });
    } catch (error) {
      return c.json({ error: 'Failed to delete stack' }, 500);
    }
  });

  // Health check
  app.get("/api/health", (c) => {
    return c.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer();

  return httpServer;
}
