# Base image
FROM node:18-alpine

# Create and use a non-root user, install dependencies, and prepare the environment
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot \
  && apk add --no-cache libc6-compat

# Switch to non-root user
USER nonroot

# Set working directory
WORKDIR /app

# Copy application files and install dependencies, then build the application
COPY ./ /app
RUN npm ci \
  && npm run build

# Set environment variables
ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3000 \
  HOSTNAME="0.0.0.0"

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
