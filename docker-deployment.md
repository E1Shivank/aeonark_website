# Docker Deployment Guide for Aeonark Labs

This guide explains how to containerize and deploy the Aeonark Labs application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (included with Docker Desktop)
- Your environment variables ready (database, Supabase, Resend API keys)

## Quick Start

### 1. Environment Setup

Copy the environment template and fill in your values:

```bash
cp .env.docker .env
```

Edit `.env` with your actual values:
- `DATABASE_URL`: Your PostgreSQL database connection string
- `SUPABASE_URL` and `SUPABASE_ANON_KEY`: Your Supabase project credentials
- `SUPABASE_SERVICE_KEY`: Your Supabase service role key
- `RESEND_API_KEY`: Your Resend email service API key

### 2. Build and Run

#### Using Docker Compose (Recommended)

```bash
# Build and start the application
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop the application
docker-compose down
```

#### Using Docker directly

```bash
# Build the image
docker build -t aeonark-labs .

# Run the container
docker run -d \
  --name aeonark-labs \
  -p 5000:5000 \
  --env-file .env \
  aeonark-labs
```

### 3. Access the Application

Once running, access the application at:
- **Local**: http://localhost:5000
- **Production**: Use your domain with reverse proxy

## Configuration Details

### Docker Image Features

- **Multi-stage build**: Optimized for production with minimal image size
- **Non-root user**: Runs as user `nextjs` for security
- **Health checks**: Built-in health monitoring
- **Asset handling**: Properly copies static assets and attachments

### Environment Variables

The application requires these environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_KEY` | Supabase service role key | Yes |
| `RESEND_API_KEY` | Resend email service API key | Yes |
| `NODE_ENV` | Environment (production/development) | No |
| `PORT` | Application port (default: 5000) | No |

### Volume Mounts

The application uses these volumes:
- `./attached_assets:/app/attached_assets:ro` - Read-only access to uploaded assets

## Production Deployment

### Using Docker Compose with External Database

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@your-db-host:5432/aeonark
      - SUPABASE_URL=https://your-project.supabase.co
      - SUPABASE_ANON_KEY=your-anon-key
      - SUPABASE_SERVICE_KEY=your-service-key
      - MAILERSEND_API_KEY=your-mailersend-key
    restart: unless-stopped
```

### With Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Monitoring and Maintenance

### Health Checks

The application includes built-in health checks:
- **Endpoint**: `/api/health`
- **Interval**: Every 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3 attempts

### Logs

View application logs:
```bash
# Docker Compose
docker-compose logs -f app

# Docker directly
docker logs -f aeonark-labs
```

### Updates

To update the application:
```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port mapping in docker-compose.yml
2. **Database connection failed**: Verify DATABASE_URL is correct
3. **Assets not loading**: Check volume mounts and file permissions
4. **Memory issues**: Increase Docker memory limit

### Debug Mode

Run with debug output:
```bash
docker-compose up --build
```

### Container Shell Access

```bash
docker exec -it aeonark-labs sh
```

## Security Considerations

- The application runs as a non-root user
- Environment variables are not exposed in the image
- Static assets are mounted read-only
- Health checks prevent unhealthy containers from serving traffic

## Performance Optimization

- Multi-stage build reduces image size
- Node.js production optimizations enabled
- Static assets properly cached
- Database connection pooling configured

For additional support, refer to the main application documentation in `replit.md`.