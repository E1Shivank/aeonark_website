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
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.toString().split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const userToken = await authenticateToken(token);

    if (req.method === 'GET') {
      // Development fallback
      if (!process.env.DATABASE_URL) {
        console.log("⚠️ Database not configured - using development fallback");
        return res.json({
          success: true,
          cartItem: null,
        });
      }
      
      const cartItem = await storage.getCartByUserId(userToken.userId);
      
      res.json({
        success: true,
        cartItem: cartItem || null,
      });
    } else if (req.method === 'POST') {
      // Development fallback
      if (!process.env.DATABASE_URL) {
        console.log("⚠️ Database not configured - using development fallback");
        return res.json({
          success: true,
          cartItem: {
            id: "dev-cart",
            userId: userToken.userId,
            planType: req.body.planType,
            addOns: req.body.addOns || [],
            totalAmount: req.body.totalAmount,
            ...req.body
          },
        });
      }
      
      const cartData = req.body;
      const cartItem = await storage.createOrUpdateCartItem(userToken.userId, cartData);
      
      res.json({
        success: true,
        cartItem,
      });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error("Cart operation error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    res.status(500).json({ error: "Cart operation failed" });
  }
}