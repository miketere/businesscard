# Script to list all plans and their PayMongo configuration status

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/subscriptions/plans/manual" `
        -UseBasicParsing
    
    $result = $response.Content | ConvertFrom-Json
    
    Write-Host "`n=== Subscription Plans ===" -ForegroundColor Cyan
    Write-Host ""
    
    foreach ($plan in $result.plans) {
        $statusColor = if ($plan.status -eq "configured") { "Green" } else { "Red" }
        $statusIcon = if ($plan.status -eq "configured") { "✅" } else { "❌" }
        
        Write-Host "$statusIcon $($plan.name)" -ForegroundColor $statusColor
        Write-Host "   Price: ₱$([math]::Round($plan.price / 100, 2)) / $($plan.interval)" -ForegroundColor Gray
        Write-Host "   Database ID: $($plan.id)" -ForegroundColor Gray
        
        if ($plan.paymongoPlanId) {
            Write-Host "   PayMongo Plan ID: $($plan.paymongoPlanId)" -ForegroundColor Green
        } else {
            Write-Host "   PayMongo Plan ID: Not configured" -ForegroundColor Yellow
        }
        Write-Host ""
    }
    
    Write-Host "To set a PayMongo Plan ID, use:" -ForegroundColor Cyan
    Write-Host "  .\scripts\set-plan-ids.ps1 -PlanId `"DATABASE_PLAN_ID`" -PayMongoPlanId `"plan_XXXXXXXXXX`"" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

