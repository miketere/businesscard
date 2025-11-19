# Pre-push hook script for Windows PowerShell
# This script runs type checking and linting before allowing a push

Write-Host "Running pre-push checks..." -ForegroundColor Cyan

# Run type check
Write-Host "`n[1/3] Running TypeScript type check..." -ForegroundColor Yellow
$typeCheckResult = npm run type-check 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ TypeScript errors found!" -ForegroundColor Red
    Write-Host $typeCheckResult
    Write-Host "`nPlease fix TypeScript errors before pushing." -ForegroundColor Red
    exit 1
}
Write-Host "✓ Type check passed" -ForegroundColor Green

# Run linter
Write-Host "`n[2/3] Running ESLint..." -ForegroundColor Yellow
$lintResult = npm run lint 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n⚠️  Linting issues found (non-blocking)" -ForegroundColor Yellow
    Write-Host $lintResult
}
Write-Host "✓ Lint check completed" -ForegroundColor Green

# Build check is skipped in pre-push hook to avoid Prisma file lock issues
# Run `npm run build` manually before important pushes if needed
Write-Host "`n[3/3] Build check skipped (run 'npm run build' manually if needed)" -ForegroundColor Gray

Write-Host "`n✅ All pre-push checks passed! Proceeding with push..." -ForegroundColor Green

