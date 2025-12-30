# === Stage 1: Build the React/Vite Application ===
FROM node:lts-alpine as builder
# DEFINE the build argument that will be passed in Cloud Build
ARG BASE_GEMINI_API_KEY

# Set it as a container Environment Variable (optional, but good practice)
#    This makes it accessible to the shell running 'npm run build'
ENV GEMINI_API_KEY=$BASE_GEMINI_API_KEY
# Set the working directory inside the container
WORKDIR /app

# Copy package files (for caching)
COPY package*.json ./

# Install dependencies
# Using 'npm ci' is often faster and more reliable in CI/CD environments
RUN npm ci 

# Copy the rest of the application code
COPY . .

# Run the Vite build command (creates the 'dist' folder)
RUN npm run build


# === Stage 2: Serve the Static Files with Nginx ===
FROM nginx:alpine

# Cloud Run expects the app to listen on the port specified by the PORT env var.
# Nginx's default config listens on port 80. Cloud Run handles the routing.
EXPOSE 80 

# CRITICAL CHANGE: Copy the 'dist' folder from the builder stage
# /app/dist is the default output directory for Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Copy a custom Nginx configuration file (recommended for React Router)
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# 1. Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# 2. Make the script executable
RUN chmod +x /entrypoint.sh

# 3. Set the script as the container's entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Command to start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]