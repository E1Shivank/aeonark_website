#!/bin/bash

# Production startup script for Aeonark Labs
# This script ensures the application starts correctly in production

set -e

echo "🚀 Starting Aeonark Labs in production mode..."

# Set production environment
export NODE_ENV=production

# Verify required environment variables
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not set. Using in-memory storage."
fi

if [ -z "$GMAIL_USER" ] || [ -z "$GMAIL_PASSWORD" ]; then
    echo "⚠️  Gmail credentials not set. Email features may not work."
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ JWT_SECRET is required for production!"
    exit 1
fi

# Check if build exists
if [ ! -f "dist/index.js" ]; then
    echo "❌ Build not found! Run 'npm run build' first."
    exit 1
fi

if [ ! -d "dist/public" ]; then
    echo "❌ Frontend build not found! Run 'npm run build' first."
    exit 1
fi

echo "✅ All checks passed. Starting server on port ${PORT:-5000}..."

# Start the application
exec node dist/index.js