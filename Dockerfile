# Multi-stage Docker build for Aeonark Labs website
# Optimized for Render.com deployment - Fast build (2-5 minutes)

# Stage 1: Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies (only what's needed for build)
RUN apk add --no-cache python3 make g++

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies with optimizations
RUN npm ci --include=dev --prefer-offline --no-audit --no-fund --cache /tmp/.npm && \
    rm -rf /tmp/.npm

# Copy only necessary source files (not everything)
COPY client ./client
COPY server ./server
COPY shared ./shared
COPY attached_assets ./attached_assets
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY drizzle.config.ts ./
COPY production-build.sh ./

# Build the application with production build script
RUN ./production-build.sh

# Stage 2: Production stage
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Install wget for health checks
RUN apk add --no-cache wget

# Install production dependencies only (with optimizations)
COPY package*.json ./
RUN npm ci --omit=dev --prefer-offline --no-audit --no-fund --cache /tmp/.npm && \
    rm -rf /tmp/.npm ~/.npm

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy necessary configuration files
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/attached_assets ./attached_assets

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start the application
CMD ["node", "dist/index.js"]