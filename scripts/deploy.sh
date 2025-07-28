#!/bin/bash
# scripts/deploy.sh

ENV=${1:-production}

echo "🚀 Deploying to $ENV..."

# Build image mới
./scripts/build.sh

# Push to registry (nếu cần)
if [ "$ENV" = "production" ]; then
    echo "📤 Pushing to registry..."
    docker tag bardo:latest your-registry/bardo:latest
    docker push your-registry/bardo:latest
fi

# Deploy
docker-compose -f docker-compose.$ENV.yml up -d

echo "✅ Deployment completed!" 