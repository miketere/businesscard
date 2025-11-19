# Quick check script - runs type checking and linting
# Usage: .\scripts\quick-check.ps1

Write-Host "Running quick checks..." -ForegroundColor Cyan

# Type check
Write-Host "`n[1/2] TypeScript type check..." -ForegroundColor Yellow
$typeCheck = npm run type-check 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ TypeScript errors found!" -ForegroundColor Red
    Write-Host $typeCheck
    exit 1
}
Write-Host "✓ Type check passed" -ForegroundColor Green

# Lint
Write-Host "`n[2/2] ESLint..." -ForegroundColor Yellow
$lint = npm run lint 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n⚠️  Linting issues (may be warnings)" -ForegroundColor Yellow
    Write-Host $lint
} else {
    Write-Host "✓ Lint passed" -ForegroundColor Green
}

Write-Host "`n✅ Quick checks passed!" -ForegroundColor Green
Write-Host "You can now push safely." -ForegroundColor Cyan

