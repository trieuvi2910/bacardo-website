#!/bin/bash

# Bardo Website - cPanel Deployment Script
# Author: 9FSTUDIO
# Usage: ./deploy-cpanel.sh

set -e

echo "🚀 Starting Bardo Website deployment to cPanel..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="bardo-website"
BUILD_DIR="out"
DEPLOY_DIR="public_html"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ is required. Current version: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --production=false

# Build the project
echo -e "${YELLOW}🔨 Building project...${NC}"
npm run build

# Check if build was successful
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}❌ Build failed. '$BUILD_DIR' directory not found.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully!${NC}"

# Create deployment package
echo -e "${YELLOW}📦 Creating deployment package...${NC}"
DEPLOY_PACKAGE="${PROJECT_NAME}-deploy-$(date +%Y%m%d-%H%M%S).zip"

# Create zip file with build output
if command -v zip &> /dev/null; then
    cd "$BUILD_DIR"
    zip -r "../$DEPLOY_PACKAGE" .
    cd ..
    echo -e "${GREEN}✅ Deployment package created: $DEPLOY_PACKAGE${NC}"
else
    echo -e "${YELLOW}⚠️  zip command not found. Please manually create zip from '$BUILD_DIR' directory.${NC}"
    echo -e "${YELLOW}📁 Build files are ready in: $BUILD_DIR${NC}"
fi

# Display deployment instructions
echo ""
echo -e "${GREEN}🎉 Build completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps for cPanel deployment:${NC}"
echo "1. Upload the '$DEPLOY_PACKAGE' file to your cPanel File Manager"
echo "2. Extract the zip file in your 'public_html' directory"
echo "3. Ensure the .htaccess file is in the root directory"
echo "4. Set proper permissions (755 for directories, 644 for files)"
echo ""
echo -e "${YELLOW}🔧 Manual deployment steps:${NC}"
echo "1. Go to cPanel → File Manager"
echo "2. Navigate to public_html directory"
echo "3. Upload all files from '$BUILD_DIR' directory"
echo "4. Ensure .htaccess file is in root directory"
echo "5. Set permissions: directories (755), files (644)"
echo ""
echo -e "${GREEN}✅ Your Bardo Website is ready for deployment!${NC}"
