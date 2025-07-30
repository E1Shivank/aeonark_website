# Multi-stage build for Aeonark Labs application
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Build the application
FROM base AS builder
WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/dist ./dist # Server build files
COPY --from=builder /app/client/dist ./client/dist # Client build files
COPY --from=builder /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules

# Copy additional necessary files
# COPY --from=builder /app/client/src/assets ./client/src/assets # Assuming these are bundled into client/dist
COPY --from=builder /app/attached_assets ./attached_assets # These seem like separate, needed assets

# Set correct permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV HOST=0.0.0.0

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${PORT}/api/health || exit 1

# Start the application
CMD ["npm", "start"]