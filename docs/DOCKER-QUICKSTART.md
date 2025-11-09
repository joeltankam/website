# Quick Start Guide - Docker Deployment

## Prerequisites
- Docker installed and running
- Docker Compose (comes with Docker Desktop)

## Fastest Method - Docker Compose

1. **Start the blog**:
   ```bash
   npm run docker:up
   ```
   
2. **Open your browser**: http://localhost:8080

3. **View logs** (optional):
   ```bash
   npm run docker:logs
   ```

4. **Stop the blog**:
   ```bash
   npm run docker:down
   ```

That's it! 🎉

## Alternative - Docker CLI

If you prefer using Docker directly:

1. **Build the image**:
   ```bash
   npm run docker:build
   ```

2. **Run the container**:
   ```bash
   npm run docker:run
   ```

3. **Open your browser**: http://localhost:8080

4. **Stop the container**:
   ```bash
   npm run docker:stop
   ```

## What's Happening?

When you run `npm run docker:up`:

1. **Build Stage**:
   - Installs Node.js dependencies
   - Builds the Vue.js application with Vite
   - Generates optimized production files
   - Creates sitemap.xml automatically

2. **Production Stage**:
   - Uses lightweight Nginx Alpine (~25MB)
   - Copies built files to web server
   - Configures routing for Vue Router
   - Enables gzip compression
   - Adds security headers

3. **Result**:
   - Production-ready blog running on port 8080
   - Fast loading times
   - SEO optimized
   - Mobile responsive

## Accessing Different Environments

| Environment | URL | Command |
|------------|-----|---------|
| Development | http://localhost:5173 | `npm run dev` |
| Preview Build | http://localhost:4173 | `npm run preview` |
| Docker | http://localhost:8080 | `npm run docker:up` |

## Useful Commands

| Task | Command |
|------|---------|
| Start blog | `npm run docker:up` |
| Stop blog | `npm run docker:down` |
| View logs | `npm run docker:logs` |
| Rebuild | `npm run docker:up --build` |
| Build only | `npm run docker:build` |

## Troubleshooting

### Port 8080 already in use?

Edit `docker-compose.yml` and change the port:
```yaml
ports:
  - "8081:80"  # Change 8080 to 8081
```

### Container won't start?

Check the logs:
```bash
npm run docker:logs
```

### Need to rebuild after code changes?

```bash
npm run docker:down
npm run docker:up --build
```

### Want to use port 80 (no :8080)?

Requires admin/sudo privileges:
```bash
# Edit docker-compose.yml
ports:
  - "80:80"
```

## Production Deployment

For deploying to cloud platforms, see:
- [docs/DOCKER.md](DOCKER.md) - Comprehensive deployment guide
- Includes AWS, Google Cloud, Azure, Kubernetes examples
- SSL/HTTPS setup with Traefik or Nginx Proxy Manager
- CI/CD with GitHub Actions
- Monitoring and logging

## File Size

The Docker image is very efficient:
- **Development**: ~500MB (includes Node.js)
- **Production**: ~50MB (nginx + static files only)

## Security

The production container:
- ✅ Runs as non-root user
- ✅ Only exposes port 80
- ✅ Includes security headers
- ✅ No sensitive data included
- ✅ Minimal attack surface (Alpine Linux)

## Next Steps

1. **Customize**: Edit files in `src/` and rebuild
2. **Add posts**: Create `.md` files in `src/posts/`
3. **Deploy**: Push to Docker Hub or cloud platform
4. **Monitor**: Set up logging and analytics

Happy blogging! 🚀
