# Comprehensive Subscription API Test Script
$baseUrl = "http://localhost:3000"
$results = @()

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Subscription API Test Suite" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Step 1: Check current plans
Write-Host "Step 1: Checking current plans..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/subscriptions/plans" -Method GET -ErrorAction Stop
    $plans = $response.Content | ConvertFrom-Json
    $results += @{
        Step = "1. Check Plans"
        Status = "Success"
        Data = $plans
    }
    Write-Host "✓ Found $($plans.plans.Count) plans" -ForegroundColor Green
    $plans.plans | ForEach-Object {
        Write-Host "  - $($_.displayName): $($_.price/100) $($_.currency) / $($_.interval) (PayMongo ID: $($_.paymongoPlanId))" -ForegroundColor Gray
    }
} catch {
    $results += @{
        Step = "1. Check Plans"
        Status = "Error"
        Error = $_.Exception.Message
    }
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 2: Check sync status
Write-Host "`nStep 2: Checking sync status..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/subscriptions/plans/sync" -Method GET -ErrorAction Stop
    $syncStatus = $response.Content | ConvertFrom-Json
    $results += @{
        Step = "2. Sync Status"
        Status = "Success"
        Data = $syncStatus
    }
    Write-Host "✓ Sync Status:" -ForegroundColor Green
    Write-Host "  - Total: $($syncStatus.total)" -ForegroundColor Gray
    Write-Host "  - Synced: $($syncStatus.synced)" -ForegroundColor Gray
    Write-Host "  - Needs Sync: $($syncStatus.needsSync)" -ForegroundColor Gray
    
    if ($syncStatus.needsSync -gt 0) {
        Write-Host "`n  Plans needing sync:" -ForegroundColor Yellow
        $syncStatus.plans | Where-Object { $_.status -eq 'needs_sync' } | ForEach-Object {
            Write-Host "    - $($_.name): No PayMongo ID" -ForegroundColor Gray
        }
    }
} catch {
    $results += @{
        Step = "2. Sync Status"
        Status = "Error"
        Error = $_.Exception.Message
    }
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 3: Try to sync plans
Write-Host "`nStep 3: Attempting to sync plans with PayMongo..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/subscriptions/plans/sync" -Method POST -ErrorAction Stop
    $syncResult = $response.Content | ConvertFrom-Json
    $results += @{
        Step = "3. Sync Plans"
        Status = "Success"
        Data = $syncResult
    }
    Write-Host "✓ $($syncResult.message)" -ForegroundColor Green
    
    if ($syncResult.synced) {
        Write-Host "  Synced plans:" -ForegroundColor Gray
        $syncResult.synced | ForEach-Object {
            Write-Host "    - $($_.planName): $($_.paymongoPlanId)" -ForegroundColor Gray
        }
    }
    
    if ($syncResult.errors) {
        Write-Host "  Errors:" -ForegroundColor Red
        $syncResult.errors | ForEach-Object {
            Write-Host "    - $($_.planName): $($_.error)" -ForegroundColor Red
        }
    }
} catch {
    $errorContent = $_.Exception.Response | ForEach-Object { $_.GetResponseStream() } | ForEach-Object {
        $reader = New-Object System.IO.StreamReader($_)
        $reader.ReadToEnd()
    }
    $errorObj = $errorContent | ConvertFrom-Json -ErrorAction SilentlyContinue
    
    $results += @{
        Step = "3. Sync Plans"
        Status = "Error"
        Error = if ($errorObj) { $errorObj.error } else { $_.Exception.Message }
        Details = $errorObj
    }
    
    Write-Host "✗ Error: $(if ($errorObj) { $errorObj.error } else { $_.Exception.Message })" -ForegroundColor Red
    if ($errorObj -and $errorObj.message) {
        Write-Host "  Details: $($errorObj.message)" -ForegroundColor Gray
    }
}

# Step 4: Create a test payment method
Write-Host "`nStep 4: Creating test payment method..." -ForegroundColor Yellow
try {
    $paymentMethodBody = @{
        type = "card"
        cardNumber = "4111111111111111"
        expMonth = 12
        expYear = 2025
        cvc = "123"
        billing = @{
            name = "Test User"
            email = "test@example.com"
        }
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/api/payment-methods" -Method POST `
        -ContentType "application/json" `
        -Body $paymentMethodBody `
        -ErrorAction Stop
    
    $paymentMethod = $response.Content | ConvertFrom-Json
    $paymentMethodId = $paymentMethod.paymentMethod.id
    $results += @{
        Step = "4. Create Payment Method"
        Status = "Success"
        PaymentMethodId = $paymentMethodId
    }
    Write-Host "✓ Payment method created: $paymentMethodId" -ForegroundColor Green
    
    # Step 5: Get a plan ID for subscription
    Write-Host "`nStep 5: Getting plan ID for subscription..." -ForegroundColor Yellow
    $plansResponse = Invoke-WebRequest -Uri "$baseUrl/api/subscriptions/plans" -Method GET
    $allPlans = $plansResponse.Content | ConvertFrom-Json
    $paidPlan = $allPlans.plans | Where-Object { $_.price -gt 0 -and $_.paymongoPlanId } | Select-Object -First 1
    
    if ($paidPlan) {
        Write-Host "✓ Using plan: $($paidPlan.displayName) (ID: $($paidPlan.id), PayMongo: $($paidPlan.paymongoPlanId))" -ForegroundColor Green
        
        # Step 6: Test subscription creation
        Write-Host "`nStep 6: Testing subscription creation..." -ForegroundColor Yellow
        try {
            $subscriptionBody = @{
                planId = $paidPlan.id
                paymentMethodId = $paymentMethodId
                email = "test@example.com"
                firstName = "Test"
                lastName = "User"
                phone = "+639123456789"
            } | ConvertTo-Json
            
            $subResponse = Invoke-WebRequest -Uri "$baseUrl/api/subscriptions" -Method POST `
                -ContentType "application/json" `
                -Body $subscriptionBody `
                -ErrorAction Stop
            
            $subscription = $subResponse.Content | ConvertFrom-Json
            $results += @{
                Step = "6. Create Subscription"
                Status = "Success"
                Data = $subscription
            }
            Write-Host "✓ Subscription created successfully!" -ForegroundColor Green
            Write-Host "  - Subscription ID: $($subscription.subscription.id)" -ForegroundColor Gray
            Write-Host "  - PayMongo Subscription ID: $($subscription.subscription.paymongoSubscriptionId)" -ForegroundColor Gray
            Write-Host "  - Status: $($subscription.subscription.status)" -ForegroundColor Gray
            Write-Host "  - Plan: $($subscription.subscription.plan.displayName)" -ForegroundColor Gray
            
        } catch {
            $errorContent = $_.Exception.Response | ForEach-Object { $_.GetResponseStream() } | ForEach-Object {
                $reader = New-Object System.IO.StreamReader($_)
                $reader.ReadToEnd()
            }
            $errorObj = $errorContent | ConvertFrom-Json -ErrorAction SilentlyContinue
            
            $results += @{
                Step = "6. Create Subscription"
                Status = "Error"
                Error = if ($errorObj) { $errorObj.error } else { $_.Exception.Message }
                Details = $errorObj
            }
            
            Write-Host "✗ Error: $(if ($errorObj) { $errorObj.error } else { $_.Exception.Message })" -ForegroundColor Red
            if ($errorObj -and $errorObj.message) {
                Write-Host "  Details: $($errorObj.message)" -ForegroundColor Gray
            }
        }
        
        # Step 7: Check current subscription
        Write-Host "`nStep 7: Checking current subscription..." -ForegroundColor Yellow
        try {
            $currentResponse = Invoke-WebRequest -Uri "$baseUrl/api/subscriptions/current" -Method GET -ErrorAction Stop
            $currentSub = $currentResponse.Content | ConvertFrom-Json
            $results += @{
                Step = "7. Current Subscription"
                Status = "Success"
                Data = $currentSub
            }
            Write-Host "✓ Current subscription found:" -ForegroundColor Green
            Write-Host "  - Status: $($currentSub.subscription.status)" -ForegroundColor Gray
            Write-Host "  - Plan: $($currentSub.subscription.plan.displayName)" -ForegroundColor Gray
            Write-Host "  - Period: $($currentSub.subscription.currentPeriodStart) to $($currentSub.subscription.currentPeriodEnd)" -ForegroundColor Gray
        } catch {
            $results += @{
                Step = "7. Current Subscription"
                Status = "Error"
                Error = $_.Exception.Message
            }
            Write-Host "✗ No subscription found or error: $($_.Exception.Message)" -ForegroundColor Yellow
        }
        
        # Step 8: Check payment history
        Write-Host "`nStep 8: Checking payment history..." -ForegroundColor Yellow
        try {
            $historyResponse = Invoke-WebRequest -Uri "$baseUrl/api/payments/history" -Method GET -ErrorAction Stop
            $history = $historyResponse.Content | ConvertFrom-Json
            $results += @{
                Step = "8. Payment History"
                Status = "Success"
                Count = $history.payments.Count
            }
            Write-Host "✓ Found $($history.payments.Count) payment(s)" -ForegroundColor Green
            $history.payments | ForEach-Object {
                Write-Host "  - $($_.plan.displayName): $($_.amount/100) $($_.currency) - $($_.status) ($($_.createdAt))" -ForegroundColor Gray
            }
        } catch {
            $results += @{
                Step = "8. Payment History"
                Status = "Error"
                Error = $_.Exception.Message
            }
            Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
        }
        
    } else {
        Write-Host "✗ No paid plan with PayMongo ID found. Cannot test subscription creation." -ForegroundColor Red
        $results += @{
            Step = "5-8. Subscription Test"
            Status = "Skipped"
            Reason = "No synced plan available"
        }
    }
    
} catch {
    # Payment method creation failed
    $errorContent = $_.Exception.Response | ForEach-Object { $_.GetResponseStream() } | ForEach-Object {
        $reader = New-Object System.IO.StreamReader($_)
        $reader.ReadToEnd()
    }
    $errorObj = $errorContent | ConvertFrom-Json -ErrorAction SilentlyContinue
    
    $results += @{
        Step = "4. Create Payment Method"
        Status = "Error"
        Error = if ($errorObj) { $errorObj.error } else { $_.Exception.Message }
    }
    Write-Host "✗ Error creating payment method: $(if ($errorObj) { $errorObj.error } else { $_.Exception.Message })" -ForegroundColor Red
    Write-Host "  Cannot proceed with subscription test." -ForegroundColor Yellow
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
$results | ForEach-Object {
    $color = if ($_.Status -eq "Success") { "Green" } elseif ($_.Status -eq "Error") { "Red" } else { "Yellow" }
    Write-Host "$($_.Step): $($_.Status)" -ForegroundColor $color
    if ($_.Error) {
        Write-Host "  Error: $($_.Error)" -ForegroundColor Gray
    }
}

Write-Host "`nTest completed!`n" -ForegroundColor Cyan

