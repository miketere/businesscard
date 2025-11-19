# Test Supabase Connection Pooling URLs
$regions = @("ap-southeast-1", "us-east-1", "us-west-1", "eu-west-1", "ap-northeast-1")
$projectRef = "khjajmdnzbwmlxthpany"
$password = "[YOUR_PASSWORD]"

Write-Host "`nTesting Supabase Connection Pooling URLs..." -ForegroundColor Cyan
Write-Host "Project: $projectRef`n" -ForegroundColor Yellow

$success = $false
foreach ($region in $regions) {
    $poolerUrl = "postgresql://postgres.${projectRef}:${password}@aws-0-${region}.pooler.supabase.com:6543/postgres?pgbouncer=true&schema=public"
    
    Write-Host "Testing region: $region" -ForegroundColor Yellow
    
    # Update .env
    $envContent = Get-Content .env -Raw
    $envContent = $envContent -replace 'DATABASE_URL="[^"]*"', "DATABASE_URL=`"$poolerUrl`""
    Set-Content -Path .env -Value $envContent -NoNewline
    
    # Test connection
    $result = npx prisma db push --accept-data-loss 2>&1
    
    if ($result -match "successfully|Pushed|Applied|Your database is now in sync") {
        Write-Host "`n✓ SUCCESS! Region: $region" -ForegroundColor Green
        Write-Host "Connection URL: $poolerUrl" -ForegroundColor Gray
        $success = $true
        break
    } elseif ($result -match "P1001|timeout|connection|Can.*reach") {
        Write-Host "  ✗ Connection failed" -ForegroundColor Red
    } else {
        $resultStr = $result[0..2] -join " "
        Write-Host "  Result: $resultStr" -ForegroundColor Gray
    }
}

if (-not $success) {
    Write-Host "`nNone of the tested regions worked." -ForegroundColor Yellow
    Write-Host "Please check your Supabase dashboard for the correct connection string." -ForegroundColor Cyan
}

