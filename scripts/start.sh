#!/bin/bash
# scripts/start.sh

echo "🚀 Starting website locally..."

# Dừng container cũ nếu có
docker-compose down

# Khởi động mới
docker-compose up -d

# Hiển thị logs
echo "📋 Container status:"
docker-compose ps

echo "📊 Logs:"
docker-compose logs -f website 