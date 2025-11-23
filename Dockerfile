# ============================================
# Base Stage - Common dependencies
# ============================================
FROM node:20-alpine AS base

WORKDIR /app

# Copy package files
COPY package*.json ./

# ============================================
# Build Stage - Create production build
# ============================================
FROM base AS build

# Install all dependencies (needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
# Note: Environment variables must be provided at build time
# Use --build-arg to override default VITE_BACKEND_URL
ARG VITE_BACKEND_URL=http://localhost:8000/api
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

# ============================================
# Production Stage - Serve with nginx
# ============================================
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set default environment variable (can be overridden at runtime)
ENV VITE_BACKEND_URL=http://localhost:8000/api

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Use entrypoint script to generate runtime config
ENTRYPOINT ["/entrypoint.sh"]
