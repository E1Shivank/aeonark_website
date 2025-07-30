# Vercel Deployment Guide

## Environment Variables Required

Based on the project analysis, these are the **exact** environment variables used:

### Core Variables (Required for Full Functionality)
- `DATABASE_URL` - PostgreSQL connection string (optional - falls back to in-memory)
- `GMAIL_USER` - Gmail address for sending OTP emails  
- `GMAIL_PASSWORD` - Gmail app password for SMTP
- `JWT_SECRET` - Secret key for JWT token signing

### Optional Variables
- `SUPABASE_URL` - Supabase project URL (used in routes.ts)
- `SUPABASE_ANON_KEY` - Supabase anonymous key (used in routes.ts)
- `NODE_ENV` - Set to "production" (auto-set by Vercel)

## Vercel Secrets Setup

Create these secrets in Vercel dashboard or CLI:

```bash
# Required secrets
vercel secrets add database-url "postgresql://your-connection-string"
vercel secrets add gmail-user "your-email@gmail.com"
vercel secrets add gmail-password "your-16-char-app-password"
vercel secrets add jwt-secret "your-secure-random-string"

# Optional secrets
vercel secrets add supabase-url "https://your-project.supabase.co"
vercel secrets add supabase-anon-key "your-supabase-anon-key"
```

## Project Behavior

### With All Environment Variables
- ✅ Database storage (PostgreSQL)
- ✅ Real OTP emails via Gmail
- ✅ Supabase authentication integration
- ✅ Secure JWT sessions
- ✅ Full production features

### Without DATABASE_URL
- ✅ In-memory storage (works fine for demo)
- ✅ All functionality except data persistence
- ⚠️ Data resets on function restart

### Without Gmail Credentials
- ✅ App works normally
- ⚠️ OTP emails won't send
- ⚠️ Development fallback OTP: "123456"

## Deployment Command

```bash
vercel --prod
```

## Testing After Deployment

1. **Health Check**: `https://your-app.vercel.app/api/health`
2. **Authentication**: Try signup/login flow
3. **Email**: Check if OTP emails arrive
4. **Database**: Test user registration and cart

## Files Analysis Summary

The project uses environment variables in:
- `server/db.ts` - DATABASE_URL for PostgreSQL
- `server/emailService.ts` - GMAIL_USER, GMAIL_PASSWORD for emails
- `server/routes.ts` - SUPABASE_URL, SUPABASE_ANON_KEY for auth
- `api/auth/*.ts` - JWT_SECRET for token signing
- Various files - NODE_ENV for development/production logic

All files have proper fallbacks and graceful degradation when variables are missing.