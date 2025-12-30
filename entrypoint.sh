#!/bin/sh

# The environment variable passed by Cloud Run is API_URL
# The placeholder we need to replace is __API_ENDPOINT_RUNTIME_PLACEHOLDER__

# 1. Substitute the placeholder in the main index.html file
# The 'g' flag ensures all occurrences are replaced.
sed -i "s|__BASE_GEMINI_API_KEY_RUNTIME_PLACEHOLDER__|$BASE_GEMINI_API_KEY|g" /usr/share/nginx/html/index.html
# 2. Substitute the placeholder in the built JavaScript files (*.js)
# This is usually needed if the variable is used directly in a script.
# We look for all .js files in the static folder and sub-directories.
find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|__BASE_GEMINI_API_KEY_RUNTIME_PLACEHOLDER__|$BASE_GEMINI_API_KEY|g" {} +

# 3. Start Nginx in the foreground
# The 'exec' command ensures that Nginx takes over the process ID 1,
# which is crucial for proper signaling (e.g., stopping the container).
exec nginx -g 'daemon off;'