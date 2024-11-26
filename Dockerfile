# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app


# Copy application files and install dependencies, then build the application
COPY / /app
RUN apk add --no-cache libc6-compat \
  && npm ci \
  && npm run build

  
# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
