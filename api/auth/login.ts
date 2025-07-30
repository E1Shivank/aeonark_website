import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { loginSchema } from '../../shared/schema';
import { storage } from '../../server/storage';
import { sendOTPEmail } from '../../server/emailService';
import { z } from 'zod';

// Helper function to generate 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = loginSchema.parse(req.body);

    // Development fallback
    if (!process.env.DATABASE_URL) {
      console.log("⚠️ Database not configured - using development fallback");
      return res.json({
        success: true,
        message: "OTP sent successfully (development mode)",
        mode: "login",
        isOnboarded: false,
        devOtp: "123456"
      });
    }

    // Check if user exists
    const existingUser = await storage.getUserByEmail(email);
    if (!existingUser) {
      return res.status(400).json({ error: "User not found. Please sign up first." });
    }

    // Generate and store OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in database
    await storage.storeOtp(email, otp, otpExpiry);

    // Send OTP via Gmail
    const emailSent = await sendOTPEmail(email, otp);
    
    if (!emailSent) {
      console.log("⚠️ Email not configured - OTP generated but not sent");
    }

    res.json({
      success: true,
      message: "Login OTP sent successfully",
      mode: "login",
      isOnboarded: existingUser.isOnboarded,
      ...(process.env.NODE_ENV === 'development' && !emailSent ? { devOtp: otp } : {})
    });

  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: "Invalid email address",
        details: error.errors 
      });
    }
    res.status(500).json({ error: "Failed to send login OTP" });
  }
}