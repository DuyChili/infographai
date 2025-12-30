# Giai đoạn 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Giai đoạn 2: Run
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve

# Copy folder dist
COPY --from=builder /app/dist ./dist

EXPOSE 8080

# --- THAY ĐỔI Ở ĐÂY ---
# Logic: 
# 1. Lấy giá trị $VITE_API_KEY từ Cloud Run.
# 2. Ghi nó vào file ./dist/env-config.js dưới dạng window.env = {...}
# 3. Sau đó mới khởi động server
CMD ["/bin/sh", "-c", "echo \"window.env = { VITE_API_KEY: '$VITE_API_KEY' };\" > ./dist/env-config.js && serve -s dist -l 8080"]