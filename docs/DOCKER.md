# Docker Deployment Guide

This guide explains how to build and deploy the blog using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)

## Quick Start

### Using Docker Compose (Recommended)

1. Build and start the container:
```bash
docker-compose up -d
```

2. Access the blog at: http://localhost:8080

3. Stop the container:
```bash
docker-compose down
```

### Using Docker CLI

1. Build the image:
```bash
docker build -t joeltankam-blog .
```

2. Run the container:
```bash
docker run -d -p 8080:80 --name blog joeltankam-blog
```

3. Access the blog at: http://localhost:8080

4. Stop the container:
```bash
docker stop blog
docker rm blog
```

## What's Inside

### Multi-Stage Build

The Dockerfile uses a multi-stage build to create an optimized production image:

1. **Build Stage**: 
   - Uses Node.js 20 Alpine
   - Installs dependencies
   - Builds the Vue.js application with Vite
   - Generates sitemap.xml automatically

2. **Production Stage**:
   - Uses lightweight Nginx Alpine (~25MB)
   - Serves only the built static files
   - No Node.js runtime needed in production

### Nginx Configuration

The included `nginx.conf` provides:

- **Gzip Compression**: Reduces bandwidth and improves load times
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
- **Static Asset Caching**: 1-year cache for images, CSS, JS
- **SPA Routing**: All routes fallback to index.html for Vue Router
- **Proper Content Types**: Correct MIME types for robots.txt and sitemap.xml

## Deployment Options

### 1. Docker Hub

```bash
# Build and tag
docker build -t yourusername/joeltankam-blog:latest .

# Push to Docker Hub
docker push yourusername/joeltankam-blog:latest

# Pull and run on server
docker pull yourusername/joeltankam-blog:latest
docker run -d -p 80:80 yourusername/joeltankam-blog:latest
```

### 2. Cloud Platforms

#### AWS ECS/Fargate
- Push image to Amazon ECR
- Create task definition using the image
- Deploy as ECS service

#### Google Cloud Run
```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/joeltankam-blog
gcloud run deploy --image gcr.io/PROJECT-ID/joeltankam-blog --platform managed
```

#### Azure Container Instances
```bash
az acr build --registry myregistry --image joeltankam-blog .
az container create --resource-group myResourceGroup \
  --name blog --image myregistry.azurecr.io/joeltankam-blog:latest
```

#### DigitalOcean App Platform
- Connect GitHub repository
- App Platform auto-detects Dockerfile
- Deploy with one click

### 3. VPS/Self-Hosted

Using Docker Compose on a VPS:

```bash
# Clone repository
git clone https://github.com/yourusername/blog.git
cd blog

# Build and start
docker-compose up -d

# Use with reverse proxy (nginx/traefik)
```

### 4. Kubernetes

Example deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: blog
spec:
  replicas: 3
  selector:
    matchLabels:
      app: blog
  template:
    metadata:
      labels:
        app: blog
    spec:
      containers:
      - name: blog
        image: yourusername/joeltankam-blog:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: blog
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: blog
```

## Production Configuration

### Environment Variables

The docker-compose.yml sets:
- `NODE_ENV=production` (for build optimizations)

### Port Mapping

Default mapping: `8080:80` (host:container)

To use port 80 on host:
```yaml
ports:
  - "80:80"
```

### HTTPS/SSL

For production, use a reverse proxy like:

#### Nginx Proxy Manager
```yaml
services:
  blog:
    # ... existing config
    networks:
      - proxy

  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    ports:
      - "80:80"
      - "443:443"
      - "81:81"
    networks:
      - proxy
```

#### Traefik
```yaml
services:
  blog:
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.blog.rule=Host(`joeltankam.com`)"
      - "traefik.http.routers.blog.entrypoints=websecure"
      - "traefik.http.routers.blog.tls.certresolver=letsencrypt"
```

## Optimization Tips

### Image Size
The production image is ~50MB (nginx:alpine + static files)

### Build Cache
Docker caches layers. To force rebuild:
```bash
docker-compose build --no-cache
```

### Resource Limits
Add to docker-compose.yml:
```yaml
services:
  blog:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

## Monitoring

### Health Check

Add to Dockerfile:
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
```

### Logs

View container logs:
```bash
docker-compose logs -f
docker logs -f blog
```

## Updating

1. Pull latest code:
```bash
git pull origin main
```

2. Rebuild and restart:
```bash
docker-compose up -d --build
```

## Troubleshooting

### Container won't start
```bash
docker-compose logs blog
```

### Port already in use
Change port in docker-compose.yml:
```yaml
ports:
  - "8081:80"  # Use different host port
```

### Permission issues
Ensure Docker has proper permissions:
```bash
sudo usermod -aG docker $USER
```

### Rebuild from scratch
```bash
docker-compose down
docker system prune -a
docker-compose up -d --build
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          push: true
          tags: yourusername/joeltankam-blog:latest
```

## Security Best Practices

1. **Don't expose unnecessary ports**
2. **Use non-root user** (nginx already does this)
3. **Scan for vulnerabilities**:
   ```bash
   docker scan joeltankam-blog
   ```
4. **Keep base images updated**:
   ```bash
   docker pull node:20-alpine
   docker pull nginx:alpine
   ```
5. **Use secrets management** for sensitive data

## Performance

Expected performance:
- **Image size**: ~50MB
- **Cold start**: <1 second
- **Memory usage**: ~10-20MB (nginx)
- **Concurrent connections**: 1000+ (default nginx)

## Support

For issues or questions:
- Check logs: `docker-compose logs`
- Verify build: `docker-compose build`
- Test locally: http://localhost:8080
