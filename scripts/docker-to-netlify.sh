#!/bin/bash

# Script to extract static files from Docker for Netlify deployment
echo "🐳 Building Docker container..."
docker build -f Dockerfile.netlify -t bardo-website .

echo "📦 Creating container to extract files..."
CONTAINER_ID=$(docker create bardo-website)

echo "📁 Extracting static files..."
docker cp $CONTAINER_ID:/usr/share/nginx/html ./netlify-build

echo "🧹 Cleaning up container..."
docker rm $CONTAINER_ID

echo "✅ Static files extracted to ./netlify-build/"
echo "🚀 Ready to deploy to Netlify!"
echo ""
echo "Next steps:"
echo "1. Upload ./netlify-build/ to Netlify"
echo "2. Or use: netlify deploy --prod --dir=netlify-build" 