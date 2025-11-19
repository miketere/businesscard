# Test PayMongo Subscription Creation
# This script helps you test the subscription API with example data

param(
    [string]$CustomerId = "",
    [string]$PlanId = "",
    [string]$PaymentMethodId = ""
)

Write-Host "`n=== PayMongo Subscription API Test ===" -ForegroundColor Cyan
Write-Host ""

if (-not $CustomerId -or -not $PlanId -or -not $PaymentMethodId) {
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\scripts\test-subscription-api.ps1 -CustomerId `"cus_XXXXX`" -PlanId `"plan_XXXXX`" -PaymentMethodId `"pm_XXXXX`"" -ForegroundColor White
    Write-Host ""
    Write-Host "To get these IDs:" -ForegroundColor Yellow
    Write-Host "  1. Customer ID: Create via /api/subscriptions (creates customer automatically)" -ForegroundColor White
    Write-Host "  2. Plan ID: Get from PayMongo dashboard or sync page" -ForegroundColor White
    Write-Host "  3. Payment Method ID: Create via payment form or /api/payment-methods" -ForegroundColor White
    Write-Host ""
    Write-Host "Example Request Body:" -ForegroundColor Cyan
    $exampleBody = @{
        data = @{
            attributes = @{
                customer = "cus_XXXXXXXXXX"
                plan = "plan_XXXXXXXXXX"
                default_payment_method = "pm_XXXXXXXXXX"
            }
        }
    } | ConvertTo-Json -Depth 10
    Write-Host $exampleBody -ForegroundColor Gray
    exit
}

$body = @{
    data = @{
        attributes = @{
            customer = $CustomerId
            plan = $PlanId
            default_payment_method = $PaymentMethodId
        }
    }
} | ConvertTo-Json -Depth 10

Write-Host "Request Body:" -ForegroundColor Yellow
Write-Host $body -ForegroundColor Gray
Write-Host ""

Write-Host "Making request to local API..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/subscriptions" `
        -Method POST `
        -Body $body `
        -ContentType "application/json" `
        -UseBasicParsing
    
    $result = $response.Content | ConvertFrom-Json
    Write-Host "✅ Success!" -ForegroundColor Green
    Write-Host ($result | ConvertTo-Json -Depth 10) -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Yellow
    }
}

