# Render.com Deployment Guide for Aeonark Labs

This guide will help you deploy your Aeonark Labs website to Render.com using Docker in under an hour.

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Render.com Account**: Sign up at https://render.com
3. **Environment Variables**: Have your `.env` values ready

## Deployment Steps

### 1. Push Code to GitHub

```bash
git add .
git commit -m "Add Docker configuration for Render deployment"
git push origin main
```

### 2. Create Render Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository and branch (`main`)

### 3. Configure Service Settings

**Basic Settings:**
- **Name**: `aeonark-labs`
- **Runtime**: `Docker`
- **Region**: `Oregon (US West)` (recommended)
- **Branch**: `main`
- **Root Directory**: Leave empty
- **Dockerfile Path**: `./Dockerfile`

**Instance Type:**
- **Plan**: `Starter` ($7/month) or `Standard` ($25/month)

### 4. Set Environment Variables

In the Render dashboard, add these environment variables:

```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://postgres.tdxxdpbijynljdqoijtb:Ak8I3KwjC6QQYMT1@aws-0-us-east-2.pooler.supabase.com:6543/postgres
GMAIL_USER=shroudwolfe@gmail.com
GMAIL_PASSWORD=zkgpsdjmcxitylwo
JWT_SECRET=ajin0f%3ivsufeg%^5jn*
SUPABASE_URL=https://tdxxdpbijynljdqoijtb.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeHhkcGJpanlubGpkcW9panRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MjM5NDcsImV4cCI6MjA2OTI5OTk0N30.uazw3xFsuY-EMjmGtX1euPWy-oT0pVO1jF37DbFq46M
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeHhkcGJpanlubGpkcW9panRiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzcyMzk0NywiZXhwIjoyMDY5Mjk5OTQ3fQ.-5r-aE4xdFIyZ-JIFLbPSdXWWYguFhGcQzGb_WeCvkg
```

**Important**: For production, consider using Render's secret storage or rotate these keys.

### 5. Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Build the Docker image
   - Deploy your application
   - Provide a public URL

### 6. Verify Deployment

Once deployed, your application will be available at:
```
https://aeonark-labs.onrender.com
```

**Health Check**: Visit `/api/health` to verify the backend is working.

## Build Process Overview

The Docker build process:

1. **Stage 1 (Builder)**:
   - Installs all dependencies
   - Builds frontend with Vite → `dist/public`
   - Builds backend with esbuild → `dist/index.js`

2. **Stage 2 (Production)**:
   - Only production dependencies
   - Copies built files
   - Runs as non-root user
   - Exposes port 5000

## Troubleshooting

### Build Failures
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Dockerfile syntax

### Runtime Errors
- Check application logs in Render dashboard
- Verify environment variables are set correctly
- Test database connectivity

### Performance Issues
- Consider upgrading to Standard plan
- Monitor resource usage in dashboard
- Optimize Docker image size

## Post-Deployment

1. **Custom Domain**: Configure in Render dashboard
2. **SSL**: Automatically provided by Render
3. **Monitoring**: Use Render's built-in monitoring
4. **Auto-Deploy**: Enabled for `main` branch

## Cost Estimate

- **Starter Plan**: $7/month
- **Standard Plan**: $25/month
- **Pro Plan**: $85/month

## Next Steps

1. Set up custom domain
2. Configure error monitoring (Sentry)
3. Set up database backups
4. Configure CI/CD workflows

Your Aeonark Labs website should now be live on Render.com!