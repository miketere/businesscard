# PostgreSQL Setup Script for Business Card App
# This script will help you set up PostgreSQL for the project

Write-Host "=== PostgreSQL Setup for Business Card App ===" -ForegroundColor Cyan
Write-Host ""

# Get PostgreSQL credentials
$pgUser = Read-Host "Enter PostgreSQL username (default: postgres)"
if ([string]::IsNullOrWhiteSpace($pgUser)) {
    $pgUser = "postgres"
}

$pgPassword = Read-Host "Enter PostgreSQL password" -AsSecureString
$pgPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($pgPassword)
)

$pgHost = Read-Host "Enter PostgreSQL host (default: localhost)"
if ([string]::IsNullOrWhiteSpace($pgHost)) {
    $pgHost = "localhost"
}

$pgPort = Read-Host "Enter PostgreSQL port (default: 5432)"
if ([string]::IsNullOrWhiteSpace($pgPort)) {
    $pgPort = "5432"
}

$dbName = Read-Host "Enter database name (default: business_card)"
if ([string]::IsNullOrWhiteSpace($dbName)) {
    $dbName = "business_card"
}

Write-Host ""
Write-Host "Creating database '$dbName'..." -ForegroundColor Yellow

# Set password for psql
$env:PGPASSWORD = $pgPasswordPlain

# Create database
$psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"
if (-not (Test-Path $psqlPath)) {
    # Try to find psql in common locations
    $psqlPath = Get-Command psql -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source
    if (-not $psqlPath) {
        Write-Host "Error: psql not found. Please ensure PostgreSQL is installed and in your PATH." -ForegroundColor Red
        exit 1
    }
}

try {
    # Check if database exists
    $dbExists = & $psqlPath -U $pgUser -h $pgHost -p $pgPort -lqt | Select-String -Pattern "^\s*$dbName\s"
    
    if ($dbExists) {
        Write-Host "Database '$dbName' already exists." -ForegroundColor Green
    } else {
        $createDbResult = & $psqlPath -U $pgUser -h $pgHost -p $pgPort -c "CREATE DATABASE $dbName;" 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Database '$dbName' created successfully!" -ForegroundColor Green
        } else {
            Write-Host "Error creating database: $createDbResult" -ForegroundColor Red
            exit 1
        }
    }
    
    # Update .env file
    Write-Host ""
    Write-Host "Updating .env file..." -ForegroundColor Yellow
    
    $envContent = Get-Content .env -Raw
    $newDbUrl = "postgresql://${pgUser}:${pgPasswordPlain}@${pgHost}:${pgPort}/${dbName}?schema=public"
    
    if ($envContent -match 'DATABASE_URL="[^"]*"') {
        $envContent = $envContent -replace 'DATABASE_URL="[^"]*"', "DATABASE_URL=`"$newDbUrl`""
    } else {
        # Add DATABASE_URL if it doesn't exist
        if (-not ($envContent -match "DATABASE_URL")) {
            $envContent += "`nDATABASE_URL=`"$newDbUrl`""
        }
    }
    
    Set-Content -Path .env -Value $envContent -NoNewline
    Write-Host ".env file updated!" -ForegroundColor Green
    
    # Run Prisma migration
    Write-Host ""
    Write-Host "Running Prisma migration..." -ForegroundColor Yellow
    npx prisma migrate dev --name init_postgresql
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "=== Setup Complete! ===" -ForegroundColor Green
        Write-Host "Your database is now configured and ready to use." -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "Migration completed with warnings. Please check the output above." -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
} finally {
    # Clear password from environment
    Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
    $pgPasswordPlain = $null
}

