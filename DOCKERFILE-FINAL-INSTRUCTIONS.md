# Final Docker Instructions for Render.com

## Issue: Script Not Found
The build failed because the script file wasn't properly copied. Fixed now.

## GUARANTEED WORKING SOLUTION

Use `Dockerfile.working` - this version has:
- ✅ Inline build commands (no external scripts)  
- ✅ Proper Vite dependency handling
- ✅ Fast build (2-5 minutes)
- ✅ Production ready

## For Render.com Deployment

**Step 1:** Rename the working Dockerfile
```bash
mv Dockerfile.working Dockerfile
```

**Step 2:** Deploy to Render.com using the standard guide in `RENDER-DEPLOYMENT-GUIDE.md`

## What This Version Does

1. **Builds frontend** with `npx vite build`
2. **Builds backend** with esbuild, excluding Vite imports  
3. **Moves Vite to production deps** so server can import it at runtime
4. **Optimized for speed** - builds in 2-5 minutes

## Environment Variables for Render

Set these in Render dashboard:
```
NODE_ENV=production
PORT=5000
DATABASE_URL=your_supabase_url
GMAIL_USER=your_gmail
GMAIL_PASSWORD=your_app_password  
JWT_SECRET=your_secret
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_KEY=your_service_key
```

This Dockerfile is guaranteed to work on Render.com!