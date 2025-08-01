#!/bin/bash

# Production build script for Docker that handles Vite dependency issues
set -e

echo "🏗️  Building Aeonark Labs for production..."

# Build frontend with Vite
echo "📦 Building frontend..."
npx vite build

# Build backend with esbuild, excluding problematic dependencies
echo "🚀 Building backend..."
npx esbuild server/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outdir=dist \
  --external:vite \
  --external:@vitejs/plugin-react \
  --external:@replit/vite-plugin-cartographer \
  --external:@replit/vite-plugin-runtime-error-modal \
  --external:@replit/vite-plugin-shadcn-theme-json

echo "✅ Build completed successfully!"