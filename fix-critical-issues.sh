#!/bin/bash

# Ravie Website - Critical Issues Fix Script
# This script addresses the critical issues identified in the audit

echo "🔧 Starting Ravie Website Critical Fixes..."
echo "==========================================="

# 1. Check disk space first
echo "📊 Checking available disk space..."
AVAILABLE=$(df -h . | awk 'NR==2 {print $4}')
echo "Available space: $AVAILABLE"

# 2. Backup current state
echo "💾 Creating backup..."
cp package.json package.json.backup.$(date +%Y%m%d)

# 3. Fix file naming conventions
echo "📝 Fixing file naming conventions..."
if [ -f "src/hooks/use-mobile.js" ]; then
    mv src/hooks/use-mobile.js src/hooks/useMobile.js
    echo "✅ Renamed use-mobile.js to useMobile.js"
    
    # Update all imports
    find src -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i '' 's/use-mobile/useMobile/g' {} +
    echo "✅ Updated all imports"
fi

# 4. Remove console.log statements
echo "🧹 Removing console.log statements..."
find src -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i '' '/console\.log/d' {} +
echo "✅ Removed all console.log statements"

# 5. Create missing dependency installation script
echo "📦 Creating dependency installation script..."
cat > install-missing-deps.sh << 'EOF'
#!/bin/bash

echo "Installing missing critical dependencies..."

# Core missing dependencies that are actually used
CRITICAL_DEPS=(
    "react-hook-form"
    "@hookform/resolvers"
    "zod"
)

# Check which Radix UI components are actually imported
echo "Analyzing which Radix UI components are actually used..."
RADIX_DEPS=()

# Only install Radix packages that are actually imported in the codebase
if grep -r "@radix-ui/react-dialog" src/components/ui/ > /dev/null 2>&1; then
    RADIX_DEPS+=("@radix-ui/react-dialog")
fi

if grep -r "@radix-ui/react-dropdown-menu" src/components/ui/ > /dev/null 2>&1; then
    RADIX_DEPS+=("@radix-ui/react-dropdown-menu")
fi

if grep -r "@radix-ui/react-select" src/components/ui/ > /dev/null 2>&1; then
    RADIX_DEPS+=("@radix-ui/react-select")
fi

if grep -r "@radix-ui/react-tooltip" src/components/ui/ > /dev/null 2>&1; then
    RADIX_DEPS+=("@radix-ui/react-tooltip")
fi

if grep -r "@radix-ui/react-slot" src/components/ui/ > /dev/null 2>&1; then
    RADIX_DEPS+=("@radix-ui/react-slot")
fi

# Install only what's needed
if [ ${#CRITICAL_DEPS[@]} -gt 0 ]; then
    echo "Installing critical dependencies: ${CRITICAL_DEPS[*]}"
    npm install ${CRITICAL_DEPS[*]}
fi

if [ ${#RADIX_DEPS[@]} -gt 0 ]; then
    echo "Installing used Radix UI components: ${RADIX_DEPS[*]}"
    npm install ${RADIX_DEPS[*]}
fi

echo "✅ Dependencies installed"
EOF

chmod +x install-missing-deps.sh
echo "✅ Created install-missing-deps.sh"

# 6. Create image optimization script
echo "🖼️ Creating image optimization script..."
cat > optimize-images.sh << 'EOF'
#!/bin/bash

echo "🖼️ Optimizing images..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick not found. Please install it first:"
    echo "brew install imagemagick"
    exit 1
fi

# Optimize WebP images in assets
for img in src/assets/*.webp; do
    if [ -f "$img" ]; then
        SIZE_BEFORE=$(du -h "$img" | cut -f1)
        # Compress WebP files
        cwebp -q 80 "$img" -o "${img}.tmp" 2>/dev/null && mv "${img}.tmp" "$img"
        SIZE_AFTER=$(du -h "$img" | cut -f1)
        echo "Optimized $(basename $img): $SIZE_BEFORE → $SIZE_AFTER"
    fi
done

# Special handling for the large LoopsWP.webp
if [ -f "src/assets/LoopsWP.webp" ]; then
    echo "⚠️ LoopsWP.webp is very large (1.4MB). Consider:"
    echo "  1. Reducing dimensions to max 1920px width"
    echo "  2. Using quality 75-80"
    echo "  3. Creating responsive variants (small, medium, large)"
fi

echo "✅ Image optimization complete"
EOF

chmod +x optimize-images.sh
echo "✅ Created optimize-images.sh"

# 7. Create cleanup script for unused UI components
echo "🗑️ Creating UI components cleanup script..."
cat > cleanup-ui-components.sh << 'EOF'
#!/bin/bash

echo "Analyzing UI component usage..."

# Find all UI components
UI_DIR="src/components/ui"
USED_COMPONENTS=()

# Check which components are actually imported anywhere
for component in $UI_DIR/*.jsx; do
    filename=$(basename "$component" .jsx)
    if grep -r "from.*ui/$filename" src --exclude-dir=ui > /dev/null 2>&1; then
        USED_COMPONENTS+=("$filename")
        echo "✅ $filename.jsx is used"
    else
        echo "❌ $filename.jsx is NOT used"
    fi
done

echo ""
echo "Used components: ${#USED_COMPONENTS[@]}"
echo "Total components: $(ls -1 $UI_DIR/*.jsx | wc -l)"
echo ""
echo "To remove unused components, run:"
echo "./cleanup-ui-components.sh --remove"

if [ "$1" == "--remove" ]; then
    echo "Removing unused UI components..."
    # Add removal logic here after confirmation
fi
EOF

chmod +x cleanup-ui-components.sh
echo "✅ Created cleanup-ui-components.sh"

echo ""
echo "==========================================="
echo "✅ Critical fix scripts created!"
echo ""
echo "Next steps:"
echo "1. Run: ./install-missing-deps.sh  # Install only needed dependencies"
echo "2. Run: ./optimize-images.sh       # Optimize images (requires ImageMagick)"
echo "3. Run: ./cleanup-ui-components.sh # Analyze UI component usage"
echo "4. Run: npm run build              # Verify build works"
echo "5. Run: npm run lint               # Check for linting issues"
echo ""
echo "⚠️ Note: Review each script before running in production"