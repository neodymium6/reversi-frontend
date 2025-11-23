# Docker Compose Examples

This directory contains example Docker Compose configurations for deployment.

## Production Deployment

Use `docker-compose.yml` for production deployment with pre-built images from GitHub Container Registry.

```bash
cd examples
docker compose up -d
```

This will:
- Pull the latest image from GHCR
- Run the container on port 80
- Restart automatically unless stopped manually

**Configuration:**
Edit the `VITE_BACKEND_URL` environment variable to match your backend API URL.

```yaml
environment:
  - VITE_BACKEND_URL=https://your-backend.com/api
```

The frontend will be accessible at `http://localhost` (or your configured port).

## Stopping Services

```bash
# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v
```

## Notes

- The backend URL is configured at **runtime**, so you can change it without rebuilding the image
- Make sure your backend API is running and accessible from the frontend container
- For HTTPS deployments, consider using a reverse proxy like nginx or Traefik in front of this service
