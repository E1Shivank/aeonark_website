# Your Complete .env File Configuration

## Current Setup Status

Your Gmail secrets are already working through Replit Secrets. I can see from the logs:
- ✅ OTP emails sending successfully
- ✅ Admin notifications working  
- ✅ Gmail credentials active in environment

## Complete .env File Template

Copy this content to your `.env` file:

```env
# Aeonark Labs Environment Variables

# Gmail SMTP Configuration (for OTP emails)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-16-character-app-password

# JWT Secret (for secure authentication)
JWT_SECRET=aeonark-labs-super-secure-jwt-key-2025

# Database Configuration (optional)
# DATABASE_URL=postgresql://username:password@host:port/database

# Development/Production Environment
NODE_ENV=development

# Port Configuration (optional)
PORT=5000
```

## To Set Up Your .env File

### Option 1: Manual Creation
1. Create a new file called `.env` in your project root
2. Copy the template above
3. Replace `your-email@gmail.com` with your actual Gmail address
4. Replace `your-16-character-app-password` with your Gmail app password

### Option 2: Copy from Example
```bash
cp .env.example .env
# Then edit .env with your actual values
```

## Your Current Working Configuration

Since Replit Secrets are active, your environment already has:
- `GMAIL_USER` = (your Gmail address)
- `GMAIL_PASSWORD` = (your app password)
- `JWT_SECRET` = (from .env.example)

## Verification

You can verify your setup is working by checking the console logs:
- "OTP email sent successfully" = Gmail working ✅
- "Admin notification sent successfully" = Full email system active ✅

## For Vercel Deployment

Add these same variables to Vercel Dashboard:
1. Go to Vercel project → Settings → Environment Variables
2. Add `GMAIL_USER`, `GMAIL_PASSWORD`, `JWT_SECRET`
3. Deploy and test

Your email system is currently working perfectly through Replit Secrets!