import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import jwt from 'jsonwebtoken';

// JWT secret - in production, use a proper secret from environment
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Middleware to verify JWT token
const authenticateToken = (token: string): any => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.toString().split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const userToken = await authenticateToken(token);
    
    // Development fallback
    if (!process.env.DATABASE_URL) {
      console.log("⚠️ Database not configured - using development fallback");
      return res.json({
        success: true,
        user: {
          id: userToken.userId,
          email: userToken.email,
          fullName: null,
          company: null,
          primaryGoal: null,
          buildGoal: null,
          isOnboarded: false,
        },
      });
    }
    
    const user = await storage.getUser(userToken.userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        company: user.company,
        primaryGoal: user.primaryGoal,
        buildGoal: user.buildGoal,
        isOnboarded: user.isOnboarded,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    res.status(500).json({ error: "Failed to fetch user data" });
  }
}