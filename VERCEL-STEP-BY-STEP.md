# Step-by-Step Vercel Deployment Guide

## Prerequisites
- Vercel account (free at vercel.com)
- Your project is ready with vercel.json configured

## Method 1: Deploy via Vercel CLI (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
- Follow the prompts to authenticate with your Vercel account

### Step 3: Deploy from Project Directory
```bash
cd your-project-directory
vercel --prod
```

### Step 4: Follow the Prompts
- **"Set up and deploy?"** → Press Enter (Yes)
- **"Which scope?"** → Select your account
- **"Link to existing project?"** → N (No) for first deployment
- **"What's your project's name?"** → Enter "aeonark-labs" or press Enter for auto-name
- **"In which directory is your code located?"** → Press Enter (current directory)

### Step 5: Wait for Deployment
- Vercel will build and deploy your project
- You'll get a URL like: `https://aeonark-labs-xyz.vercel.app`

## Method 2: Deploy via Vercel Dashboard

### Step 1: Go to Vercel Dashboard
- Visit [vercel.com/dashboard](https://vercel.com/dashboard)
- Click "New Project"

### Step 2: Import Git Repository
- Connect your GitHub/GitLab account
- Select your repository
- Click "Import"

### Step 3: Configure Project
- **Framework Preset**: Other
- **Root Directory**: ./
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### Step 4: Deploy
- Click "Deploy"
- Wait for build to complete

## After Deployment

### Test Your Application
1. **Homepage**: `https://your-app.vercel.app/`
2. **API Health**: `https://your-app.vercel.app/api/health`
3. **Authentication**: Try the signup/login flow
4. **Email Test**: Register with your email to test OTP delivery

### Expected Features Working
✅ **Complete website with all pages**
✅ **User authentication with real OTP emails**
✅ **Database storage via Supabase**
✅ **Shopping cart functionality**
✅ **Contact forms**
✅ **Mobile responsive design**

### If Something Doesn't Work
1. Check Vercel function logs in dashboard
2. Verify environment variables are set correctly
3. Test individual API endpoints
4. Check browser console for frontend errors

## Custom Domain (Optional)

### Step 1: Add Domain in Vercel Dashboard
- Go to your project settings
- Click "Domains"
- Add your custom domain

### Step 2: Update DNS
- Add CNAME record: `your-domain.com` → `cname.vercel-dns.com`
- Wait for DNS propagation (up to 24 hours)

## Project URLs After Deployment

**Main Application:**
- Homepage: `/`
- Services: `/services`
- Pricing: `/pricing`
- About: `/about`
- Contact: `/contact`
- Authentication: `/new-auth`

**API Endpoints:**
- Health: `/api/health`
- Contact: `/api/contact`
- Auth signup: `/api/auth/signup`
- Auth verify: `/api/auth/verify-otp`
- User profile: `/api/user`
- Cart: `/api/cart`

Your Aeonark Labs website will be live and fully functional with all features working!