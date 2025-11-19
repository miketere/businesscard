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

# Run build (optional, can be slow)
Write-Host "`n[3/3] Running build check..." -ForegroundColor Yellow
Write-Host "Note: This may take a while. You can skip this with --no-verify if needed." -ForegroundColor Gray
$buildResult = npm run build 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Build failed!" -ForegroundColor Red
    Write-Host $buildResult
    Write-Host "`nPlease fix build errors before pushing." -ForegroundColor Red
    exit 1
}
Write-Host "✓ Build check passed" -ForegroundColor Green

Write-Host "`n✅ All pre-push checks passed! Proceeding with push..." -ForegroundColor Green

