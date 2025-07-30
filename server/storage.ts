import { users, otpCodes, cartItems, type User, type InsertUser, type OtpCode, type InsertOtp, type CartItem, type InsertCartItem } from "@shared/schema";
import { db } from "./db";
import { eq, and, gt, sql } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  
  // OTP management
  createOtp(insertOtp: InsertOtp): Promise<OtpCode>;
  storeOtp(email: string, code: string, expiresAt: Date): Promise<OtpCode>;
  getValidOtp(email: string, code: string): Promise<OtpCode | undefined>;
  incrementOtpAttempts(email: string, code: string): Promise<void>;
  deleteOtp(email: string, code: string): Promise<void>;
  cleanupExpiredOtps(): Promise<void>;
  
  // Cart management
  getCartByUserId(userId: string): Promise<CartItem | undefined>;
  createCartItem(insertCartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, updates: Partial<CartItem>): Promise<CartItem>;
  deleteCartItem(id: number): Promise<void>;
  createOrUpdateCartItem(userId: string, cartData: any): Promise<CartItem>;
}

export class DatabaseStorage implements IStorage {
  // User management
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // OTP management
  async createOtp(insertOtp: InsertOtp): Promise<OtpCode> {
    // Delete any existing OTP for this email first
    await db.delete(otpCodes).where(eq(otpCodes.email, insertOtp.email));
    
    const [otp] = await db
      .insert(otpCodes)
      .values({
        ...insertOtp,
        attempts: 0,
        createdAt: new Date(),
      })
      .returning();
    return otp;
  }

  async storeOtp(email: string, code: string, expiresAt: Date): Promise<OtpCode> {
    return this.createOtp({
      email,
      code,
      expiresAt,
    });
  }

  async getValidOtp(email: string, code: string): Promise<OtpCode | undefined> {
    const [otp] = await db
      .select()
      .from(otpCodes)
      .where(
        and(
          eq(otpCodes.email, email),
          eq(otpCodes.code, code),
          gt(otpCodes.expiresAt, new Date())
        )
      );
    return otp || undefined;
  }

  async incrementOtpAttempts(email: string, code: string): Promise<void> {
    await db
      .update(otpCodes)
      .set({
        attempts: sql`${otpCodes.attempts} + 1`,
      })
      .where(
        and(
          eq(otpCodes.email, email),
          eq(otpCodes.code, code)
        )
      );
  }

  async deleteOtp(email: string, code: string): Promise<void> {
    await db
      .delete(otpCodes)
      .where(
        and(
          eq(otpCodes.email, email),
          eq(otpCodes.code, code)
        )
      );
  }

  async cleanupExpiredOtps(): Promise<void> {
    await db.delete(otpCodes).where(gt(sql`now()`, otpCodes.expiresAt));
  }

  // Cart management
  async getCartByUserId(userId: string): Promise<CartItem | undefined> {
    const [cartItem] = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.userId, userId));
    return cartItem || undefined;
  }

  async createCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const [cartItem] = await db
      .insert(cartItems)
      .values({
        ...insertCartItem,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return cartItem;
  }

  async updateCartItem(id: number, updates: Partial<CartItem>): Promise<CartItem> {
    const [cartItem] = await db
      .update(cartItems)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(cartItems.id, id))
      .returning();
    return cartItem;
  }

  async deleteCartItem(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async createOrUpdateCartItem(userId: string, cartData: any): Promise<CartItem> {
    // Check if cart exists
    const existingCart = await this.getCartByUserId(userId);
    
    if (existingCart) {
      // Update existing cart
      return this.updateCartItem(existingCart.id, cartData);
    } else {
      // Create new cart
      return this.createCartItem({
        userId,
        ...cartData,
      });
    }
  }
}

// In-memory storage implementation for development/migration
export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private usersByEmail: Map<string, User> = new Map();
  private otps: Map<string, OtpCode> = new Map();
  private carts: Map<string, CartItem> = new Map();
  private cartIdCounter = 1;
  
  // User management
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.usersByEmail.get(email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      email: insertUser.email,
      fullName: insertUser.fullName || null,
      company: insertUser.company || null,
      primaryGoal: insertUser.primaryGoal || null,
      buildGoal: insertUser.buildGoal || null,
      isOnboarded: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    this.usersByEmail.set(user.email, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const existing = this.users.get(id);
    if (!existing) throw new Error("User not found");
    
    const user: User = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    this.usersByEmail.set(user.email, user);
    return user;
  }

  // OTP management
  async createOtp(insertOtp: InsertOtp): Promise<OtpCode> {
    const otp: OtpCode = {
      id: this.cartIdCounter++,
      ...insertOtp,
      attempts: 0,
      createdAt: new Date(),
    };
    this.otps.set(`${insertOtp.email}:${insertOtp.code}`, otp);
    return otp;
  }

  async storeOtp(email: string, code: string, expiresAt: Date): Promise<OtpCode> {
    // Delete existing OTP for email
    for (const [key, otp] of this.otps) {
      if (otp.email === email) {
        this.otps.delete(key);
      }
    }
    
    return this.createOtp({ email, code, expiresAt });
  }

  async getValidOtp(email: string, code: string): Promise<OtpCode | undefined> {
    const otp = this.otps.get(`${email}:${code}`);
    if (!otp || otp.expiresAt < new Date()) return undefined;
    return otp;
  }

  async incrementOtpAttempts(email: string, code: string): Promise<void> {
    const otp = this.otps.get(`${email}:${code}`);
    if (otp) {
      otp.attempts = (otp.attempts || 0) + 1;
    }
  }

  async deleteOtp(email: string, code: string): Promise<void> {
    this.otps.delete(`${email}:${code}`);
  }

  async cleanupExpiredOtps(): Promise<void> {
    const now = new Date();
    for (const [key, otp] of this.otps) {
      if (otp.expiresAt < now) {
        this.otps.delete(key);
      }
    }
  }

  // Cart management
  async getCartByUserId(userId: string): Promise<CartItem | undefined> {
    for (const cart of this.carts.values()) {
      if (cart.userId === userId) return cart;
    }
    return undefined;
  }

  async createCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const cartItem: CartItem = {
      id: this.cartIdCounter++,
      userId: insertCartItem.userId,
      planType: insertCartItem.planType,
      planName: insertCartItem.planName,
      addOns: insertCartItem.addOns || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.carts.set(cartItem.id.toString(), cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, updates: Partial<CartItem>): Promise<CartItem> {
    const existing = this.carts.get(id.toString());
    if (!existing) throw new Error("Cart item not found");
    
    const cartItem: CartItem = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.carts.set(id.toString(), cartItem);
    return cartItem;
  }

  async deleteCartItem(id: number): Promise<void> {
    this.carts.delete(id.toString());
  }

  async createOrUpdateCartItem(userId: string, cartData: any): Promise<CartItem> {
    // Check if cart exists for user
    const existingCartEntry = Array.from(this.carts.values()).find(cart => cart.userId === userId);
    
    if (existingCartEntry) {
      // Update existing cart
      const updatedCart = { ...existingCartEntry, ...cartData, updatedAt: new Date() };
      this.carts.set(existingCartEntry.id.toString(), updatedCart);
      return updatedCart;
    } else {
      // Create new cart
      const newCart: CartItem = {
        id: this.cartIdCounter++,
        userId,
        ...cartData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.carts.set(newCart.id.toString(), newCart);
      return newCart;
    }
  }
}

// Use in-memory storage for development/migration, DatabaseStorage for production
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
