# Giai đoạn 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Giai đoạn 2: Run (Chỉ lấy phần đã build)
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
# Chỉ copy folder dist từ giai đoạn builder sang
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
