# Final working Docker build for Render.com - NO VITE IMPORTS
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies with optimizations
RUN npm ci --include=dev --prefer-offline --no-audit --no-fund --cache /tmp/.npm && \
    rm -rf /tmp/.npm

# Copy only necessary source files
COPY client ./client
COPY server ./server
COPY shared ./shared
COPY attached_assets ./attached_assets
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY drizzle.config.ts ./

# Build frontend to dist/public
RUN npx vite build

# Build backend using production entry point with NO Vite imports
RUN npx esbuild server/index-production.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outdir=dist

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install wget for health checks
RUN apk add --no-cache wget

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm ci --omit=dev --prefer-offline --no-audit --no-fund --cache /tmp/.npm && \
    rm -rf /tmp/.npm ~/.npm

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/attached_assets ./attached_assets

# Set NODE_ENV to production
ENV NODE_ENV=production

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

# Start the application using the production build
CMD ["node", "dist/index-production.js"]