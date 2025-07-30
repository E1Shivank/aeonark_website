import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';
import { emailCheckSchema } from '../../shared/schema';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = emailCheckSchema.parse(req.body);
    
    // Check if user exists in our database
    const existingUser = await storage.getUserByEmail(email);
    
    res.json({
      success: true,
      exists: !!existingUser,
      isOnboarded: existingUser?.isOnboarded || false,
    });
  } catch (error) {
    console.error("Error checking email:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid email address" });
    }
    res.status(500).json({ error: "Failed to check email" });
  }
}