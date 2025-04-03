
FROM node:18-alpine AS builder

WORKDIR /app


COPY package.json package-lock.json ./


RUN npm install


RUN npm install -g typescript ts-node


COPY . .


RUN npm run build  # Ensure "build": "tsc" exists in package.json


FROM node:18-alpine

WORKDIR /app


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./


EXPOSE   8085


CMD ["node", "dist/index.js"]
