# Fix for Vite Module Not Found Error on Render

## The Problem
The deployment fails with:
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'vite' imported from /app/dist/index.js
```

This happens because the bundled server tries to import Vite in production, but Vite is a dev dependency.

## Quick Fix - Move Vite to Production Dependencies

The fastest solution is to temporarily move Vite and related packages to production dependencies for Docker builds.

### Step 1: Update Dockerfile
Add this step before the production npm install:

```dockerfile
# Temporarily move Vite to production dependencies for build
RUN npm pkg set dependencies.vite="^5.4.9" && \
    npm pkg set dependencies.@vitejs/plugin-react="^4.3.2" && \
    npm pkg set dependencies.@replit/vite-plugin-cartographer="^0.0.11" && \
    npm pkg set dependencies.@replit/vite-plugin-runtime-error-modal="^0.0.3" && \
    npm pkg set dependencies.@replit/vite-plugin-shadcn-theme-json="^0.0.4"
```

### Step 2: Alternative - Use Simple Build Script
Copy the working build script approach from the development environment.

## Why This Happens
- The server imports from `server/vite.ts` 
- `vite.ts` imports Vite packages
- esbuild bundles these imports into the production server
- Production container doesn't have Vite (it's in devDependencies)
- Server crashes on startup

## The Fix Applied
I've created `production-build.sh` that:
1. Builds frontend with Vite
2. Builds backend with esbuild, excluding Vite dependencies
3. Uses `--external:vite` to prevent bundling Vite imports

This should resolve the deployment error and make your app run successfully on Render.com.