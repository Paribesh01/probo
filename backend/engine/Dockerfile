FROM node:19.5.0-alpine AS builder

WORKDIR /app


COPY package*.json ./


RUN npm install


RUN npm install -g typescript ts-node


COPY . .
RUN npm run build  


FROM node:19.5.0-alpine 
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Start the service
CMD ["node", "dist/index.js"]
