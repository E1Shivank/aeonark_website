import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';
import { otpVerificationSchema } from '../../shared/schema';
import { sendAdminNotification } from '../../server/emailService';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// JWT secret - in production, use a proper secret from environment
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, code } = otpVerificationSchema.parse(req.body);
    
    // Development fallback for OTP verification
    if (!process.env.DATABASE_URL) {
      console.log("⚠️ Database not configured - using development fallback");
      
      if (code === "123456") {
        const token = jwt.sign(
          { userId: "dev-user", email: email },
          JWT_SECRET,
          { expiresIn: '7d' }
        );
        
        return res.json({
          success: true,
          token,
          user: {
            id: "dev-user",
            email: email,
            fullName: null,
            company: null,
            primaryGoal: null,
            buildGoal: null,
            isOnboarded: false,
          },
        });
      } else {
        return res.status(400).json({ error: "Invalid OTP code (use 123456 for development)" });
      }
    }
    
    // Verify OTP from our database
    const validOtp = await storage.getValidOtp(email, code);
    
    if (!validOtp) {
      return res.status(400).json({ error: "Invalid or expired OTP code" });
    }

    // Delete the used OTP
    await storage.deleteOtp(email, code);

    // Check if user exists in our database
    let user = await storage.getUserByEmail(email);
    
    if (!user) {
      // Create new user in our database
      user = await storage.createUser({
        email: email,
        isOnboarded: false,
      });

      // Send admin notification for new user
      await sendAdminNotification(email);
    }

    // Generate JWT token for our app
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
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
    console.error("Error verifying OTP:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid OTP format" });
    }
    res.status(500).json({ error: "Failed to verify OTP" });
  }
}