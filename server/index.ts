import express from "express";
import { createServer } from "http";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
import { aiService } from "./ai-integration";
import { z } from "zod";

// Create Express app and HTTP server
const app = express();
const server = createServer(app);

// JSON body parser
app.use(express.json());

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
  lastName: z.string().optional(),
  isPro: z.boolean().optional()
});

// API Routes
// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// User management routes
app.post("/api/users", async (req, res) => {
  try {
    const userData = createUserSchema.parse(req.body);
    const user = await storage.createUser(userData);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
  }
});

app.get("/api/users/:id", async (req, res) => {
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

app.get("/api/users/username/:username", async (req, res) => {
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

app.patch("/api/users/:id", async (req, res) => {
  try {
    const profileData = updateProfileSchema.parse(req.body);
    const user = await storage.updateUserProfile(req.params.id, profileData);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
  }
});

// Stack management routes
app.get("/api/users/:userId/stacks", async (req, res) => {
  try {
    const stacks = await storage.getUserSavedStacks(req.params.userId);
    res.json(stacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stacks' });
  }
});

app.post("/api/users/:userId/stacks", async (req, res) => {
  try {
    const validatedData = saveStackSchema.parse(req.body);
    const stackData = {
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

app.delete("/api/users/:userId/stacks/:stackId", async (req, res) => {
  try {
    await storage.deleteStack(req.params.userId, req.params.stackId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete stack' });
  }
});

// AI endpoints
app.post("/api/ai/recommend-stack", async (req, res) => {
  try {
    const result = await aiService.recommendStack(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get AI recommendations" });
  }
});

app.get("/api/ai/supported-technologies", async (req, res) => {
  try {
    const result = await aiService.getSupportedTechnologies();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get technologies" });
  }
});

app.post("/api/ai/analyze-compatibility", async (req, res) => {
  try {
    const { technologies } = req.body;
    const result = await aiService.analyzeCompatibility(technologies);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to analyze compatibility" });
  }
});

app.get("/api/ai/status", async (req, res) => {
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

// Setup and start server
async function startServer() {
  // Setup Vite for development or static files for production
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || '4000');
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
}

startServer().catch(console.error);