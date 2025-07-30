# 🚀 Aeonark Labs - Vercel Deployment Guide

## Step-by-Step Vercel Deployment

### 1. Prerequisites
- GitHub/GitLab account with your project
- Vercel account (free at [vercel.com](https://vercel.com))

### 2. Deploy to Vercel

#### Option A: One-Click Deploy
1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel auto-detects the configuration
5. Click "Deploy"

#### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

### 3. Environment Variables Setup

Go to your Vercel project dashboard → Settings → Environment Variables

Add these variables (all optional - app works without them):

```bash
# Gmail SMTP for OTP Emails (Recommended)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-16-character-app-password

# JWT Secret (Recommended for security)
JWT_SECRET=your-super-secure-random-string

# Database (Optional)
DATABASE_URL=postgresql://username:password@host:port/database
```

### 📧 Gmail Setup (Recommended)
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: [Google Account Security](https://myaccount.google.com/security) → App passwords
3. Use your Gmail address and the app password in environment variables
4. See `GMAIL-SETUP-GUIDE.md` for detailed instructions

### 4. Build Configuration

Vercel automatically uses these settings from `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/public"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 5. File Structure After Deployment

```
your-project/
├── api/                    # Serverless API endpoints
│   ├── health.ts          # GET /api/health
│   ├── contact.ts         # POST /api/contact
│   ├── user.ts            # GET /api/user
│   ├── cart.ts            # GET/POST /api/cart
│   ├── onboarding.ts      # POST /api/onboarding
│   └── auth/
│       ├── check-email.ts # POST /api/auth/check-email
│       ├── signup.ts      # POST /api/auth/signup
│       └── verify-otp.ts  # POST /api/auth/verify-otp
├── client/                # React frontend (builds to dist/public)
├── dist/public/           # Built frontend (auto-generated)
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies & scripts
```

### 6. API Endpoints (Live After Deploy)

```bash
# Your domain will be: https://your-project.vercel.app

# Health Check
GET /api/health

# Contact Form
POST /api/contact

# Authentication
POST /api/auth/check-email
POST /api/auth/signup  
POST /api/auth/verify-otp

# User Management
GET /api/user
POST /api/onboarding

# Shopping Cart
GET /api/cart
POST /api/cart
```

### 7. Development vs Production

**Development (Replit)**
- Uses in-memory storage
- Mock authentication
- Console logging
- Development fallbacks

**Production (Vercel)**
- Real database (if configured)
- Supabase authentication (if configured)
- Email services (if configured)
- Same fallbacks if services not configured

### 8. Testing Your Deployment

After deployment, test these URLs:

```bash
# Replace YOUR_DOMAIN with your Vercel domain
https://YOUR_DOMAIN.vercel.app/              # Home page
https://YOUR_DOMAIN.vercel.app/api/health    # Should return {"status":"ok"}
https://YOUR_DOMAIN.vercel.app/pricing       # Pricing page
https://YOUR_DOMAIN.vercel.app/contact       # Contact page
```

### 9. Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Vercel automatically handles SSL certificates

### 10. Monitoring & Logs

- **Real-time Logs**: Vercel Dashboard → Functions → View Function Logs
- **Analytics**: Vercel Dashboard → Analytics
- **Performance**: Vercel Dashboard → Speed Insights

## 🔧 Troubleshooting

### Build Fails
```bash
# Check these in order:
1. Verify package.json has all dependencies
2. Check TypeScript errors in Vercel build logs
3. Ensure environment variables are set correctly
```

### API Not Working
```bash
# Common issues:
1. Check Vercel function logs for errors
2. Verify environment variables are set
3. Test API endpoints directly: /api/health
```

### Frontend Issues
```bash
# Debug steps:
1. Check browser console for errors
2. Verify API calls in Network tab
3. Check if base path is correct
```

## 📋 Required Files for Vercel

Make sure these files exist in your repository:

- ✅ `vercel.json` - Vercel configuration
- ✅ `package.json` - Dependencies and build scripts  
- ✅ `api/` directory with TypeScript files
- ✅ `client/` directory with React app
- ✅ `tsconfig.json` - TypeScript configuration

## 🎯 Features Included

- ✅ **Responsive Design** - Mobile, tablet, desktop
- ✅ **Dark/Light Theme** - Toggle between themes
- ✅ **Authentication** - OTP-based signup/login
- ✅ **User Onboarding** - Profile completion flow
- ✅ **Shopping Cart** - Plan selection with add-ons
- ✅ **Contact Form** - Contact form with validation
- ✅ **SEO Optimized** - Meta tags and Open Graph
- ✅ **Serverless APIs** - All backend functionality

## 🌟 Live Demo

After deployment, your site will be live at:
`https://your-project-name.vercel.app`

## 📞 Support

For deployment issues:
- Vercel Discord: [discord.gg/vercel](https://discord.gg/vercel)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)

For project issues:
- Email: aeonark.lab@gmail.com

---

**Ready to deploy? Just push to GitHub and connect to Vercel!** 🚀