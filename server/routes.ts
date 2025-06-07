import express, { type Express, type Request, type Response } from "express";
import { storage } from "./storage.js";
import { aiService } from "./ai-integration.js";
import { z } from "zod";
import { 
  type InsertUser, 
  type InsertSavedStack, 
  type UpdateUserProfile 
} from "../shared/appwrite.js";

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

export function registerRoutes(app: Express): void {
  // Middleware for JSON parsing
  app.use(express.json());
  
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
      const { id } = req.params;
      const user = await storage.getUser(id);
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
      const { username } = req.params;
      const user = await storage.getUserByUsername(username);
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
      const { id } = req.params;
      const profileData = updateProfileSchema.parse(req.body);
      const user = await storage.updateUserProfile(id, profileData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
    }
  });

  // Stack management routes
  app.get("/api/users/:userId/stacks", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const stacks = await storage.getUserSavedStacks(userId);
      res.json(stacks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stacks' });
    }
  });

  app.post("/api/users/:userId/stacks", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const validatedData = saveStackSchema.parse(req.body);
      const stackData: InsertSavedStack = {
        name: validatedData.name,
        description: validatedData.description,
        stackData: validatedData.stackData
      };
      const stack = await storage.saveStack(userId, stackData);
      res.json(stack);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
    }
  });

  app.delete("/api/users/:userId/stacks/:stackId", async (req: Request, res: Response) => {
    try {
      const { userId, stackId } = req.params;
      await storage.deleteStack(userId, stackId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete stack' });
    }
  });

  // AI-powered stack recommendations using embedded AI engine
  app.post("/api/ai/recommend-stack", async (req: Request, res: Response) => {
    try {
      const result = await aiService.recommendStack(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to get AI recommendations" });
    }
  });

  app.get("/api/ai/supported-technologies", async (req: Request, res: Response) => {
    try {
      const result = await aiService.getSupportedTechnologies();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to get technologies" });
    }
  });

  app.post("/api/ai/analyze-compatibility", async (req: Request, res: Response) => {
    try {
      const { technologies } = req.body;
      const result = await aiService.analyzeCompatibility(technologies);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to analyze compatibility" });
    }
  });

  app.get("/api/ai/status", async (req: Request, res: Response) => {
    try {
      const status = await aiService.checkStatus();
      res.json(status);
    } catch (error) {
      res.json({ 
        ai_service_available: false,
        python_api_status: "error"
      });
    }
  });

  // Health check
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
}
