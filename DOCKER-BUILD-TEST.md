# Docker Build Test Instructions

## Quick Test Before Deploying to Render

### 1. Test Local Docker Build

```bash
# Build the Docker image
docker build -t aeonark-labs .

# Run the container locally
docker run -p 5000:5000 \
  -e NODE_ENV=production \
  -e DATABASE_URL="your_database_url" \
  -e GMAIL_USER="your_gmail" \
  -e GMAIL_PASSWORD="your_gmail_password" \
  -e JWT_SECRET="your_jwt_secret" \
  aeonark-labs
```

### 2. Test with Docker Compose

```bash
# Copy your .env file to .env.docker for testing
cp .env .env.docker

# Run with docker-compose
docker-compose up --build
```

### 3. Verify the Build

Once running, test these endpoints:

- **Frontend**: http://localhost:5000/
- **Health Check**: http://localhost:5000/api/health
- **Authentication**: Try the signup flow

### 4. Build Size Optimization

Current build sizes:
- Frontend: ~791KB (gzipped: ~234KB)
- Backend: ~39KB
- Docker Image: ~150MB (estimated)

### 5. Troubleshooting

**If build fails:**
- Check Docker logs: `docker logs <container_id>`
- Verify all dependencies are in package.json
- Ensure .dockerignore is not excluding necessary files

**If app doesn't start:**
- Check environment variables are set
- Verify database connectivity
- Check port 5000 is not in use

### 6. Performance Notes

- Uses multi-stage build to minimize production image size
- Only includes production dependencies in final image
- Runs as non-root user for security
- Includes health checks for container orchestration