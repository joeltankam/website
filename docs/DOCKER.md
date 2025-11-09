# Docker Deployment

Docker configuration for easy deployment.

## Local Docker

```bash
docker-compose up -d  # Build and run
# Access at http://localhost:8080
docker-compose down   # Stop
```

## Dockerfile

See [`Dockerfile`](../Dockerfile) for full implementation.

Multi-stage build:
1. Build stage: `npm install` + `npm run build`
2. Production stage: Nginx serves static files from `dist/`

## Configuration Files

- [`Dockerfile`](../Dockerfile) - multi-stage build
- [`docker-compose.yml`](../docker-compose.yml) - local development
- [`nginx.conf`](../nginx.conf) - Nginx config (gzip, cache headers, SPA routing)

## Environment Variables

Optional `VITE_HOSTNAME` for build - see [`docker-compose.yml`](../docker-compose.yml) for example.

## Cloud Deployment

### AWS ECS/Fargate
Push to ECR, deploy with task definition.

### Google Cloud Run
```bash
gcloud run deploy blog --source .
```

### Azure Container Instances
```bash
az container create --resource-group rg --name blog --image <image>
```

### DigitalOcean App Platform
Connect GitHub repo, auto-deploy on push.

## Notes

- Image size: ~25MB (nginx:alpine base)
- No runtime dependencies (static files only)
- Gzip enabled for HTML/CSS/JS
- Cache headers set for assets
- SPA routing configured (try_files)
