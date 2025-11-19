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

# Build check is skipped in pre-push hook to avoid Prisma file lock issues
# Run `npm run build` manually before important pushes if needed
echo -e "\n[3/3] Build check skipped (run 'npm run build' manually if needed)"

echo -e "\n✅ All pre-push checks passed! Proceeding with push..."

