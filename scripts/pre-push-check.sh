#!/bin/bash
# Pre-push hook script for Unix/Linux/Mac
# This script runs type checking and linting before allowing a push

echo "Running pre-push checks..."

# Run type check
echo -e "\n[1/3] Running TypeScript type check..."
if ! npm run type-check; then
    echo -e "\n❌ TypeScript errors found!"
    echo "Please fix TypeScript errors before pushing."
    exit 1
fi
echo "✓ Type check passed"

# Run linter
echo -e "\n[2/3] Running ESLint..."
npm run lint || echo "⚠️  Linting issues found (non-blocking)"
echo "✓ Lint check completed"

# Run build (optional, can be slow)
echo -e "\n[3/3] Running build check..."
echo "Note: This may take a while. You can skip this with --no-verify if needed."
if ! npm run build; then
    echo -e "\n❌ Build failed!"
    echo "Please fix build errors before pushing."
    exit 1
fi
echo "✓ Build check passed"

echo -e "\n✅ All pre-push checks passed! Proceeding with push..."

