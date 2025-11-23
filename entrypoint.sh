#!/bin/sh
set -e

# Generate runtime configuration
echo "Generating runtime configuration..."
cat > /usr/share/nginx/html/config.js <<EOF
window.env = {
  VITE_BACKEND_URL: "${VITE_BACKEND_URL:-http://localhost:8000/api}"
};
EOF

echo "Runtime configuration generated:"
cat /usr/share/nginx/html/config.js

# Start nginx
exec nginx -g "daemon off;"
