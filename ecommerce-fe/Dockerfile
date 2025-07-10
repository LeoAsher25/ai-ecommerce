# Sử dụng Node.js 20
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file package.json trước để cache layer
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ code vào container
COPY . .

# Build dự án Next.js
RUN npm run build

# Mở cổng 3000
EXPOSE 3000

# Chạy ứng dụng Next.js ở chế độ production
CMD ["npm", "run", "start"]
