#!/bin/bash

# Netlify Build Script for Bardo Website
echo "🚀 Starting Netlify build for Bardo Website..."

# Create build directory
mkdir -p build

# Copy source files to build directory
echo "📁 Copying source files..."
cp -r src/* build/

# Optimize images (if you have image optimization tools)
echo "🖼️ Optimizing images..."
# Add image optimization commands here if needed

# Create .nojekyll file for GitHub Pages compatibility
touch build/.nojekyll

# Create _redirects file for SPA routing
echo "/* /index.html 200" > build/_redirects

echo "✅ Build completed successfully!"
echo "📂 Build directory: build/"
echo "🌐 Ready for deployment to Netlify!" 