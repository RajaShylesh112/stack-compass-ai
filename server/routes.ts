import { Hono } from "hono";
import { storage } from "./storage.js";
import { aiService } from "./ai-integration.js";
import { z } from "zod";

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
  stackData: z.any()
});

const updateProfileSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional()
});

export function registerRoutes(app: Hono): void {
  // Root route - redirect to Next.js frontend
  app.get("/", (c) => {
    return c.redirect("http://localhost:3000");
  });

  // Health check
  app.get("/api/health", (c) => {
    return c.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Stack Recommendations
  app.post("/api/ai/recommend-stack", async (c) => {
    try {
      const body = await c.req.json();
      const recommendations = await aiService.recommendStack(body);
      return c.json(recommendations);
    } catch (error) {
      console.error('AI recommendation error:', error);
      return c.json({ 
        error: 'Failed to generate recommendations',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 500);
    }
  });

  // Get supported technologies
  app.get("/api/ai/supported-technologies", async (c) => {
    try {
      const technologies = await aiService.getSupportedTechnologies();
      return c.json(technologies);
    } catch (error) {
      console.error('Technologies fetch error:', error);
      return c.json({ 
        error: 'Failed to fetch technologies',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 500);
    }
  });

  // Analyze compatibility
  app.post("/api/ai/analyze-compatibility", async (c) => {
    try {
      const body = await c.req.json();
      const analysis = await aiService.analyzeCompatibility(body);
      return c.json(analysis);
    } catch (error) {
      console.error('Compatibility analysis error:', error);
      return c.json({ 
        error: 'Failed to analyze compatibility',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 500);
    }
  });

  // AI service status
  app.get("/api/ai/status", async (c) => {
    try {
      const status = await aiService.checkStatus();
      return c.json(status);
    } catch (error) {
      return c.json({ 
        ai_service_available: false,
        python_api_status: "error"
      });
    }
  });

  // User management
  app.post("/api/users", async (c) => {
    try {
      const body = await c.req.json();
      const userData = createUserSchema.parse(body);
      const user = await storage.createUser(userData);
      return c.json(user, 201);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ error: 'Invalid user data', details: error.errors }, 400);
      } else {
        console.error('User creation error:', error);
        return c.json({ error: 'Failed to create user' }, 500);
      }
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
      console.error('User fetch error:', error);
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
      console.error('User fetch error:', error);
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
      if (error instanceof z.ZodError) {
        return c.json({ error: 'Invalid profile data', details: error.errors }, 400);
      } else {
        console.error('User update error:', error);
        return c.json({ error: 'Failed to update user' }, 500);
      }
    }
  });

  // Stack management
  app.get("/api/users/:userId/stacks", async (c) => {
    try {
      const userId = c.req.param('userId');
      const stacks = await storage.getUserSavedStacks(userId);
      return c.json(stacks);
    } catch (error) {
      console.error('Stacks fetch error:', error);
      return c.json({ error: 'Failed to fetch stacks' }, 500);
    }
  });

  app.post("/api/users/:userId/stacks", async (c) => {
    try {
      const userId = c.req.param('userId');
      const body = await c.req.json();
      const stackData = saveStackSchema.parse(body);
      const stack = await storage.saveStack(userId, stackData);
      return c.json(stack, 201);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ error: 'Invalid stack data', details: error.errors }, 400);
      } else {
        console.error('Stack save error:', error);
        return c.json({ error: 'Failed to save stack' }, 500);
      }
    }
  });

  app.delete("/api/users/:userId/stacks/:stackId", async (c) => {
    try {
      const userId = c.req.param('userId');
      const stackId = c.req.param('stackId');
      await storage.deleteStack(userId, stackId);
      return c.body(null, 204);
    } catch (error) {
      console.error('Stack delete error:', error);
      return c.json({ error: 'Failed to delete stack' }, 500);
    }
  });
}