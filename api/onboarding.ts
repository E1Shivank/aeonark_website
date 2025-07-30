import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { onboardingSchema } from '../shared/schema';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.toString().split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const userToken = await authenticateToken(token);
    const onboardingData = onboardingSchema.parse(req.body);
    
    // Development fallback
    if (!process.env.DATABASE_URL) {
      console.log("⚠️ Database not configured - using development fallback");
      return res.json({
        success: true,
        user: {
          id: userToken.userId,
          email: userToken.email,
          fullName: onboardingData.fullName,
          company: onboardingData.company,
          primaryGoal: onboardingData.primaryGoal,
          buildGoal: onboardingData.buildGoal,
          isOnboarded: true,
        },
      });
    }
    
    // Update user with onboarding data
    const user = await storage.updateUser(userToken.userId, {
      ...onboardingData,
      isOnboarded: true,
    });

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
    console.error("Error completing onboarding:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    res.status(500).json({ error: "Failed to complete onboarding" });
  }
}