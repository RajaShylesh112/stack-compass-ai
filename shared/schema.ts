import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  isPro: boolean("is_pro").default(false),
  savedStacksCount: integer("saved_stacks_count").default(0),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const savedStacks = pgTable("saved_stacks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  stackData: jsonb("stack_data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSavedStackSchema = createInsertSchema(savedStacks).pick({
  name: true,
  description: true,
  stackData: true,
});

export const updateUserProfileSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SavedStack = typeof savedStacks.$inferSelect;
export type InsertSavedStack = z.infer<typeof insertSavedStackSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
