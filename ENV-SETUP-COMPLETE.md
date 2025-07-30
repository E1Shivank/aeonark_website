# 🔧 Complete Environment Variables Setup Guide

## Overview
Your Aeonark Labs project now uses **`.env` file configuration** for all environment variables. All code has been updated to properly load from `.env` file using dotenv.

## ✅ What's Been Fixed
- ✅ Added `dotenv.config()` to all API endpoints and server files
- ✅ Updated all hardcoded fallback values to use environment variables
- ✅ Created comprehensive `.env.example` template
- ✅ Fixed Gmail integration to use proper environment configuration
- ✅ Updated all JWT secrets to use environment variables

## 📄 .env File Setup

### 1. Create Your .env File
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 2. Configure Your Variables
Edit `.env` file with your actual values:

```env
# Gmail SMTP Configuration (for OTP emails)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-16-character-app-password

# JWT Secret (for secure authentication)
JWT_SECRET=your-super-secure-random-string-here

# Database Configuration (optional)
DATABASE_URL=postgresql://username:password@host:port/database

# Development/Production Environment
NODE_ENV=development

# Port Configuration (optional)
PORT=5000
```

## 🔑 Required Environment Variables

### Gmail Configuration (Recommended)
```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=abcdefghijklmnop
```

**To Get Gmail App Password**:
1. Enable 2-Factor Authentication: [myaccount.google.com/security](https://myaccount.google.com/security)
2. Generate App Password: App passwords → Mail → Other → "Aeonark Labs"
3. Copy the 16-character password (remove spaces)

### JWT Secret (Recommended)
```env
JWT_SECRET=my-super-secure-random-string-123
```
Generate a secure random string for production use.

### Database (Optional)
```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```
For PostgreSQL database connection.

## 🚀 How It Works

### Development Mode (No .env)
- Uses mock OTP: `123456`
- Logs emails to console
- In-memory storage
- Development fallbacks

### With Gmail Setup
- Professional OTP emails from your Gmail
- Admin notifications to `aeonark.lab@gmail.com`
- Beautiful branded email templates
- Secure app password authentication

### With Database
- Real user data storage
- Persistent cart and onboarding data
- Secure JWT authentication

## 📱 Testing Your Setup

### 1. Local Testing (Replit)
```bash
# Create .env file with your values
cp .env.example .env
# Edit .env with your Gmail credentials

# Start the application
npm run dev

# Test signup with any email
# Check if OTP email arrives
```

### 2. Vercel Deployment
1. **Add to Vercel Dashboard**:
   - Go to Vercel project → Settings → Environment Variables
   - Add `GMAIL_USER`, `GMAIL_PASSWORD`, `JWT_SECRET`

2. **Deploy and Test**:
   - Push code to GitHub
   - Vercel auto-deploys with new environment variables
   - Test signup/login on deployed site

## 🔍 Verification Checklist

- [ ] `.env` file created with your Gmail credentials
- [ ] Gmail 2FA enabled and app password generated
- [ ] JWT secret added (secure random string)
- [ ] Local testing: OTP emails arrive in inbox
- [ ] Admin notifications arrive at `aeonark.lab@gmail.com`
- [ ] Vercel environment variables configured
- [ ] Deployed site sends professional OTP emails

## 🛠️ Files Updated

All these files now properly load `.env` configuration:
- `server/index.ts` - Main server with dotenv config
- `server/emailService.ts` - Gmail integration
- `api/auth/signup.ts` - Signup with OTP
- `api/auth/login.ts` - Login with OTP  
- `api/auth/verify-otp.ts` - OTP verification
- `api/auth/check-email.ts` - Email checking
- `api/cart.ts` - Shopping cart API
- `api/contact.ts` - Contact form API
- `api/health.ts` - Health check API
- `api/onboarding.ts` - User onboarding API
- `api/user.ts` - User management API

## 📧 Email Templates

Your OTP emails include:
- Professional Aeonark Labs branding
- Dark theme design with green accents
- Large, easy-to-read 6-digit codes
- Security warnings and expiry information
- Call-to-action for consultations
- Mobile-responsive layout

## 🔒 Security Features

- Gmail app passwords (more secure than regular passwords)
- JWT tokens with configurable expiry
- OTP codes expire in 10 minutes
- Brute-force protection built-in
- Secure environment variable handling

## 🎯 Next Steps

1. **Set up your .env file** with Gmail credentials
2. **Test locally** to ensure OTP emails work
3. **Configure Vercel** environment variables
4. **Deploy** and test on production
5. **Monitor** Vercel function logs for any issues

Your Aeonark Labs website now has complete environment variable configuration using `.env` file!