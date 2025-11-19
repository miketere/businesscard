# Test Supabase Connection for Local Development
# This script helps verify your Supabase setup

Write-Host "`n🔍 Testing Supabase Configuration...`n" -ForegroundColor Cyan

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "   Create a .env file in the root directory.`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ .env file found`n" -ForegroundColor Green

# Load environment variables
$envContent = Get-Content ".env" -Raw
$envVars = @{}

# Parse .env file (simple parsing)
$envContent -split "`n" | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith("#") -and $line -match '^([^=]+)=(.*)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim().Trim('"').Trim("'")
        $envVars[$key] = $value
    }
}

# Check required variables
$required = @(
    "DATABASE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXTAUTH_URL",
    "NEXTAUTH_SECRET"
)

$missing = @()
foreach ($var in $required) {
    if (-not $envVars.ContainsKey($var) -or [string]::IsNullOrWhiteSpace($envVars[$var])) {
        $missing += $var
        Write-Host "❌ $var is missing or empty" -ForegroundColor Red
    } else {
        Write-Host "✅ $var is set" -ForegroundColor Green
    }
}

if ($missing.Count -gt 0) {
    Write-Host "`n⚠️  Missing required environment variables!`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n📋 Configuration Summary:`n" -ForegroundColor Cyan

# Check DATABASE_URL format
$dbUrl = $envVars["DATABASE_URL"]
if ($dbUrl -match "postgresql://") {
    Write-Host "✅ DATABASE_URL format looks correct" -ForegroundColor Green
    if ($dbUrl -match "schema=public") {
        Write-Host "✅ Schema parameter found" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Warning: schema=public not found in DATABASE_URL" -ForegroundColor Yellow
        Write-Host "   Add ?schema=public at the end of your connection string" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ DATABASE_URL format incorrect" -ForegroundColor Red
}

# Check Supabase URL format
$supabaseUrl = $envVars["NEXT_PUBLIC_SUPABASE_URL"]
if ($supabaseUrl -match "https://.*\.supabase\.co") {
    Write-Host "✅ NEXT_PUBLIC_SUPABASE_URL format looks correct" -ForegroundColor Green
} else {
    Write-Host "⚠️  NEXT_PUBLIC_SUPABASE_URL format might be incorrect" -ForegroundColor Yellow
    Write-Host "   Should be: https://xxxxx.supabase.co" -ForegroundColor Gray
}

# Check Supabase key format
$supabaseKey = $envVars["NEXT_PUBLIC_SUPABASE_ANON_KEY"]
if ($supabaseKey -match "^eyJ") {
    Write-Host "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY format looks correct" -ForegroundColor Green
} else {
    Write-Host "⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY format might be incorrect" -ForegroundColor Yellow
    Write-Host "   Should start with 'eyJ'" -ForegroundColor Gray
}

Write-Host "`n🧪 Testing Database Connection...`n" -ForegroundColor Cyan

# Test Prisma connection
try {
    $result = npx prisma db pull --schema=prisma/schema.prisma 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database connection successful!`n" -ForegroundColor Green
    } else {
        Write-Host "❌ Database connection failed`n" -ForegroundColor Red
        Write-Host "Error output:" -ForegroundColor Yellow
        Write-Host $result -ForegroundColor Gray
        Write-Host "`n💡 Tips:" -ForegroundColor Cyan
        Write-Host "   1. Check your DATABASE_URL in .env" -ForegroundColor White
        Write-Host "   2. Verify your Supabase database is running" -ForegroundColor White
        Write-Host "   3. Check if your IP is allowed in Supabase settings" -ForegroundColor White
        Write-Host "   4. Try using direct connection (port 5432) instead of pooler" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Error testing connection: $_`n" -ForegroundColor Red
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. If database connection works, run:" -ForegroundColor White
Write-Host "   npx prisma migrate dev --name add-auth-tables" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Then start the dev server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Open http://localhost:3000 in your browser" -ForegroundColor Gray
Write-Host ""

