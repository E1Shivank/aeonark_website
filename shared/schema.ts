import { pgTable, text, serial, integer, boolean, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table for authentication and profile - using UUID for Supabase compatibility
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  company: text("company"),
  primaryGoal: text("primary_goal"), // "Website", "AI Agent", "Analytics Platform", "Other"
  buildGoal: text("build_goal"), // What they want to build
  isOnboarded: boolean("is_onboarded").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// OTP codes table for email verification
export const otpCodes = pgTable("otp_codes", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  code: text("code").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  attempts: integer("attempts").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Cart items table - using UUID for user reference
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  planType: text("plan_type").notNull(), // "starter", "growth", "scale"
  planName: text("plan_name").notNull(), // "Starter Site", "Growth Bundle", "Scale Forge"
  addOns: jsonb("add_ons").default([]), // Array of add-on objects
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  cartItems: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, { fields: [cartItems.userId], references: [users.id] }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  fullName: true,
  company: true,
  primaryGoal: true,
  buildGoal: true,
  isOnboarded: true,
});

export const insertOtpSchema = createInsertSchema(otpCodes).pick({
  email: true,
  code: true,
  expiresAt: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).pick({
  userId: true,
  planType: true,
  planName: true,
  addOns: true,
});

// Enhanced auth schemas for Supabase
export const emailCheckSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const onboardingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  company: z.string().optional(),
  primaryGoal: z.enum(["Website", "AI Agent", "Analytics Platform", "Other"]),
  buildGoal: z.string().min(10, "Please describe what you want to build (at least 10 characters)"),
});

export const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const otpVerificationSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, "OTP code must be 6 digits"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertOtp = z.infer<typeof insertOtpSchema>;
export type OtpCode = typeof otpCodes.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type OnboardingData = z.infer<typeof onboardingSchema>;
export type AuthData = z.infer<typeof authSchema>;
export type OtpVerificationData = z.infer<typeof otpVerificationSchema>;
export type EmailCheckData = z.infer<typeof emailCheckSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type LoginData = z.infer<typeof loginSchema>;
