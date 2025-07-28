#!/bin/bash
# scripts/build.sh

echo "🚀 Building Docker image..."

# Build image
docker build -t bardo:latest .

# Tag với timestamp
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
docker tag bardo:latest bardo:$TIMESTAMP

echo "✅ Build completed!"
echo "Images created:"
docker images | grep bardo 