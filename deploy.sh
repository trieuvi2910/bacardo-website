#!/bin/bash

# Deployment script for Next.js application
echo "🚀 Starting deployment..."

# Stop existing containers
echo "📦 Stopping existing containers..."
docker-compose down

# Chỉ xóa containers, networks, và images không được sử dụng (không xóa images đang được sử dụng)
echo "🧹 Cleaning up unused resources..."
# Xóa containers đã stop
docker container prune -f
# Xóa networks không được sử dụng
docker network prune -f
# Xóa images không được sử dụng (không xóa images đang được sử dụng bởi containers)
docker image prune -f

# Build and start the application
echo "🔨 Building and starting the application..."
docker-compose up --build -d

# Check if the application is running
echo "✅ Checking application status..."
sleep 10
if docker-compose ps | grep -q "Up"; then
    echo "🎉 Deployment successful! Application is running on port 3000"
    echo "🌐 You can access your application at: http://your-vps-ip:3000"
else
    echo "❌ Deployment failed. Check the logs with: docker-compose logs"
    exit 1
fi
