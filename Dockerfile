FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY / /app

RUN npm ci && npm run build;

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
