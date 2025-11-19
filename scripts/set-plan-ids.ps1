# Script to manually set PayMongo Plan IDs for subscription plans
# Usage: .\scripts\set-plan-ids.ps1 -PlanId "YOUR_DATABASE_PLAN_ID" -PayMongoPlanId "plan_XXXXXXXXXX"

param(
    [Parameter(Mandatory=$true)]
    [string]$PlanId,
    
    [Parameter(Mandatory=$true)]
    [string]$PayMongoPlanId
)

$body = @{
    planId = $PlanId
    paymongoPlanId = $PayMongoPlanId
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/subscriptions/plans/manual" `
        -Method POST `
        -Body $body `
        -ContentType "application/json" `
        -UseBasicParsing
    
    $result = $response.Content | ConvertFrom-Json
    Write-Host "✅ Success!" -ForegroundColor Green
    Write-Host "Plan: $($result.plan.name)" -ForegroundColor Cyan
    Write-Host "PayMongo Plan ID: $($result.plan.paymongoPlanId)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Yellow
    }
}

