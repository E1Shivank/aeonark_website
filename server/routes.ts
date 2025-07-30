import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authSchema, otpVerificationSchema, onboardingSchema, emailCheckSchema, signupSchema, loginSchema } from "@shared/schema";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { createClient } from '@supabase/supabase-js';
import { sendOTPEmail, sendAdminNotification, createGmailTransporter } from './emailService';

// Initialize Supabase client with proper URL format (optional for development)
const rawUrl = process.env.SUPABASE_URL || '';
const supabaseUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
const supabase = (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) 
  ? createClient(supabaseUrl, process.env.SUPABASE_ANON_KEY)
  : null;

// JWT secret - in production, use a proper secret from environment
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Helper function to generate 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', message: 'Aeonark Labs API is up and running!' });
  });

  // Enhanced authentication endpoints
  
  // Check if email exists (determines signup vs login flow)
  app.post('/api/auth/check-email', async (req, res) => {
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
  });

  // Signup endpoint - sends OTP for first-time users using Resend
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const { email } = signupSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists. Please use login instead." });
      }

      // Generate and store OTP
      const otp = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Store OTP in database
      await storage.storeOtp(email, otp, otpExpiry);

      // Send OTP via Gmail
      await sendOTPEmail(email, otp);
      res.json({ 
        success: true, 
        message: "Signup OTP sent successfully",
        mode: "signup"
      });
    } catch (error) {
      console.error("Error in signup:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email address" });
      }
      res.status(500).json({ error: "Failed to send signup OTP" });
    }
  });

  // Login endpoint - sends OTP for existing users using Resend
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email } = loginSchema.parse(req.body);
      
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
      await sendOTPEmail(email, otp);
      res.json({ 
        success: true, 
        message: "Login OTP sent successfully",
        mode: "login",
        isOnboarded: existingUser.isOnboarded
      });
    } catch (error) {
      console.error("Error in login:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email address" });
      }
      res.status(500).json({ error: "Failed to send login OTP" });
    }
  });

  // Custom OTP verification with Resend
  app.post('/api/auth/verify-otp', async (req, res) => {
    try {
      const { email, code } = otpVerificationSchema.parse(req.body);
      
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
  });

  // Onboarding endpoint
  app.post('/api/onboarding', authenticateToken, async (req: any, res) => {
    try {
      const onboardingData = onboardingSchema.parse(req.body);
      
      // Update user with onboarding data
      const user = await storage.updateUser(req.user.userId, {
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
      res.status(500).json({ error: "Failed to complete onboarding" });
    }
  });

  // Get current user endpoint
  app.get('/api/user', authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.userId);
      
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
      res.status(500).json({ error: "Failed to fetch user data" });
    }
  });

  // Cart endpoints
  app.get('/api/cart', authenticateToken, async (req: any, res) => {
    try {
      const cartItem = await storage.getCartByUserId(req.user.userId);
      
      res.json({
        success: true,
        cartItem: cartItem || null,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post('/api/cart', authenticateToken, async (req: any, res) => {
    try {
      const { planType, planName, addOns = [] } = req.body;
      
      if (!planType || !planName) {
        return res.status(400).json({ error: "Plan type and name are required" });
      }

      // Check if user already has a cart item
      const existingCart = await storage.getCartByUserId(req.user.userId);
      
      let cartItem;
      if (existingCart) {
        // Update existing cart
        cartItem = await storage.updateCartItem(existingCart.id, {
          planType,
          planName,
          addOns,
        });
      } else {
        // Create new cart
        cartItem = await storage.createCartItem({
          userId: req.user.userId,
          planType,
          planName,
          addOns,
        });
      }

      // Send admin notification using Gmail
      const user = await storage.getUser(req.user.userId);
      if (user && process.env.GMAIL_USER && process.env.GMAIL_PASSWORD) {
        try {
          const transporter = createGmailTransporter({
            gmail: process.env.GMAIL_USER,
            password: process.env.GMAIL_PASSWORD
          });

          const mailOptions = {
            from: `"Aeonark Labs System" <${process.env.GMAIL_USER}>`,
            to: 'aeonark.lab@gmail.com',
            subject: '🛒 New Cart Item Added - Aeonark Labs',
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <title>New Cart Item</title>
              </head>
              <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <div style="padding: 30px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                      🛒 New Cart Item Added
                    </h1>
                  </div>

                  <div style="padding: 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px;">
                      User & Plan Details
                    </h2>
                    
                    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                      <p style="margin: 0 0 10px 0; color: #374151;"><strong>Name:</strong> ${user.fullName || 'Not provided'}</p>
                      <p style="margin: 0 0 10px 0; color: #374151;"><strong>Email:</strong> ${user.email}</p>
                      <p style="margin: 0 0 10px 0; color: #374151;"><strong>Company:</strong> ${user.company || 'Not provided'}</p>
                      <p style="margin: 0 0 10px 0; color: #374151;"><strong>Selected Plan:</strong> ${planName} (${planType})</p>
                      <p style="margin: 0 0 10px 0; color: #374151;"><strong>Primary Goal:</strong> ${user.primaryGoal || 'Not provided'}</p>
                      <p style="margin: 0 0 10px 0; color: #374151;"><strong>Build Goal:</strong> ${user.buildGoal || 'Not provided'}</p>
                      <p style="margin: 0 0 10px 0; color: #374151;"><strong>Add-ons:</strong> ${addOns.length > 0 ? addOns.map((addon: any) => addon.name).join(', ') : 'None'}</p>
                      <p style="margin: 0; color: #374151;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                  </div>

                  <div style="padding: 20px 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                      Automated notification from Aeonark Labs
                    </p>
                  </div>
                </div>
              </body>
              </html>
            `,
          };

          await transporter.sendMail(mailOptions);
          console.log('Cart notification sent to admin');
        } catch (error) {
          console.error('Failed to send cart notification:', error);
        }
      }

      res.json({
        success: true,
        cartItem,
      });
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Failed to update cart" });
    }
  });

  // Contact form endpoint - now works in development with Gmail
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          error: 'All fields are required'
        });
      }

      if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
        console.log("⚠️ Gmail not configured - contact form disabled");
        return res.status(500).json({
          success: false,
          error: 'Email service not configured'
        });
      }

      const transporter = createGmailTransporter({
        gmail: process.env.GMAIL_USER,
        password: process.env.GMAIL_PASSWORD
      });

      const mailOptions = {
        from: `"Aeonark Labs Contact Form" <${process.env.GMAIL_USER}>`,
        to: 'aeonark.lab@gmail.com',
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <div style="padding: 30px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                  📧 New Contact Form Submission
                </h1>
              </div>

              <div style="padding: 30px;">
                <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px;">
                  Contact Details
                </h2>
                
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                  <p style="margin: 0 0 10px 0; color: #374151;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 0 0 10px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #22c55e;">${email}</a></p>
                  <p style="margin: 0 0 10px 0; color: #374151;"><strong>Subject:</strong> ${subject}</p>
                  <p style="margin: 0; color: #374151;"><strong>Received:</strong> ${new Date().toLocaleString()}</p>
                </div>

                <div style="background: #fff; padding: 20px; border-left: 4px solid #22c55e; margin: 20px 0; border-radius: 0 6px 6px 0;">
                  <h3 style="margin: 0 0 15px 0; color: #1f2937;">Message:</h3>
                  <p style="line-height: 1.6; color: #374151; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="mailto:${email}?subject=Re: ${subject}" style="display: inline-block; padding: 12px 24px; background-color: #22c55e; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
                    Reply to ${name}
                  </a>
                </div>
              </div>

              <div style="padding: 20px 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                  Automated message from Aeonark Labs contact form
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Contact form email sent successfully to aeonark.lab@gmail.com');
      
      return res.status(200).json({
        success: true,
        message: "Your message has been sent successfully! We'll get back to you soon."
      });
    } catch (error) {
      console.error("❌ Contact form error:", error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send message'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}