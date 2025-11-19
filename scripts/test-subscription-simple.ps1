$baseUrl = "http://localhost:3000"

Write-Host "`n=== Subscription API Test Results ===`n" -ForegroundColor Cyan

# Step 1: Check plans
Write-Host "1. Checking plans..." -ForegroundColor Yellow
$plans = Invoke-WebRequest -Uri "$baseUrl/api/subscriptions/plans" | ConvertFrom-Json
Write-Host "   Found $($plans.plans.Count) plans" -ForegroundColor Green
foreach ($plan in $plans.plans) {
    $status = if ($plan.paymongoPlanId) { "[OK] Synced" } else { "[X] Not synced" }
    Write-Host "   $($plan.displayName): $status" -ForegroundColor $(if ($plan.paymongoPlanId) { "Green" } else { "Yellow" })
}

# Step 2: Try sync
Write-Host "`n2. Syncing plans..." -ForegroundColor Yellow
try {
    $sync = Invoke-WebRequest -Uri "$baseUrl/api/subscriptions/plans/sync" -Method POST | ConvertFrom-Json
    Write-Host "   $($sync.message)" -ForegroundColor Green
    if ($sync.errors) {
        foreach ($err in $sync.errors) {
            Write-Host "   Error: $($err.planName) - $($err.error)" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 3: Create payment method
Write-Host "`n3. Creating payment method..." -ForegroundColor Yellow
$pmBody = '{"type":"card","cardNumber":"4242424242424242","expMonth":12,"expYear":2025,"cvc":"123","billing":{"name":"Test User","email":"test@example.com"}}'
try {
    $pm = Invoke-WebRequest -Uri "$baseUrl/api/payment-methods" -Method POST -ContentType "application/json" -Body $pmBody | ConvertFrom-Json
    $pmId = $pm.paymentMethod.id
    Write-Host "   [OK] Payment method created: $pmId" -ForegroundColor Green
    
    # Step 4: Check if we can create subscription
    $paidPlan = $plans.plans | Where-Object { $_.price -gt 0 -and $_.paymongoPlanId } | Select-Object -First 1
    if ($paidPlan) {
        Write-Host "`n4. Testing subscription creation..." -ForegroundColor Yellow
        $subBody = "{`"planId`":`"$($paidPlan.id)`",`"paymentMethodId`":`"$pmId`",`"email`":`"test@example.com`"}" | ConvertFrom-Json | ConvertTo-Json
        try {
            $sub = Invoke-WebRequest -Uri "$baseUrl/api/subscriptions" -Method POST -ContentType "application/json" -Body $subBody | ConvertFrom-Json
            Write-Host "   [OK] Subscription created!" -ForegroundColor Green
            Write-Host "   Status: $($sub.subscription.status)" -ForegroundColor Gray
        } catch {
            $error = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($error)
            $errorContent = $reader.ReadToEnd() | ConvertFrom-Json
            Write-Host "   [ERROR] $($errorContent.error)" -ForegroundColor Red
        }
    } else {
        Write-Host "`n4. Cannot test subscription - no synced plan available" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   [ERROR] Failed to create payment method" -ForegroundColor Red
}

Write-Host "`n=== Test Complete ===`n" -ForegroundColor Cyan

