#!/bin/bash

# Linkre Chrome Extension Build Script
# Creates a zip file ready for Chrome Web Store submission

set -e

VERSION="1.0.0"
OUTPUT_FILE="linkre-v${VERSION}.zip"

echo "🔨 Building Linkre Chrome Extension v${VERSION}"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -f *.zip
rm -rf dist/

# Create distribution directory
echo "📁 Creating distribution directory..."
mkdir -p dist

# Copy required files for Chrome Web Store
echo "📋 Copying extension files..."
cp manifest.json dist/
cp popup.html dist/
cp popup.js dist/
cp content.js dist/
cp content.css dist/
cp background.js dist/

# Copy directories
echo "📂 Copying directories..."
mkdir dist/icons
cp icons/*.png dist/icons
cp -r _locales dist/

# Create zip file
echo "📦 Creating zip file..."
cd dist
zip -r "../${OUTPUT_FILE}" . -x "*.DS_Store" "*.git*"
cd ..

# Cleanup
echo "🧹 Cleaning up..."
rm -rf dist/

echo "✅ Build complete!"
echo "📦 Output: ${OUTPUT_FILE}"
echo "📊 File size: $(du -h ${OUTPUT_FILE} | cut -f1)"

# Verify contents
echo "📋 Zip contents:"
unzip -l "${OUTPUT_FILE}"

echo ""
echo "🚀 Ready for Chrome Web Store upload!"
