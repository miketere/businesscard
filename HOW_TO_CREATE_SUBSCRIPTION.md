# How to Create a Subscription - Step by Step Guide

Based on the [PayMongo API Reference](https://developers.paymongo.com/reference/create-a-subscription), here's exactly how to create a subscription.

## Method 1: Using Your Application UI (Easiest) ✅

Your application handles everything automatically:

1. **Go to Subscription Page**
   - Visit: http://localhost:3000/settings/subscription

2. **Click "Subscribe"**
   - Click the "Subscribe" button on any plan (Basic or Pro)

3. **Fill Payment Form**
   - Enter card number (e.g., `4111111111111111` for test)
   - Enter expiration (e.g., `12/2025`)
   - Enter CVC (e.g., `123`)
   - Optionally: Enter cardholder name, email, phone

4. **Click "Continue"**
   - Your app will automatically:
     - ✅ Create payment method
     - ✅ Create customer
     - ✅ Create subscription

**That's it!** The subscription is created automatically.

---

## Method 2: Using Your API Endpoints

### Step-by-Step API Flow

#### Step 1: Create Payment Method

```powershell
$paymentMethodBody = @{
    type = "card"
    cardNumber = "4111111111111111"
    expMonth = 12
    expYear = 2025
    cvc = "123"
    billing = @{
        name = "John Doe"
        email = "[email protected]"
    }
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:3000/api/payment-methods" `
    -Method POST `
    -Body $paymentMethodBody `
    -ContentType "application/json" `
    -UseBasicParsing

$paymentMethod = ($response.Content | ConvertFrom-Json).paymentMethod
$paymentMethodId = $paymentMethod.id
Write-Host "Payment Method ID: $paymentMethodId"
```

#### Step 2: Create Subscription

```powershell
$subscriptionBody = @{
    planId = "cmi2pag8a0001ig2l1lji2gie"  # Your database plan ID (Basic)
    paymentMethodId = $paymentMethodId    # From Step 1
    email = "[email protected]"
    firstName = "John"
    lastName = "Doe"
    phone = "09123456789"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:3000/api/subscriptions" `
    -Method POST `
    -Body $subscriptionBody `
    -ContentType "application/json" `
    -UseBasicParsing

$subscription = ($response.Content | ConvertFrom-Json).subscription
Write-Host "Subscription created: $($subscription.id)"
```

**Note**: Your API automatically creates the customer, so you don't need to do that separately!

---

## Method 3: Direct PayMongo API (Advanced)

If you want to call PayMongo directly:

### Request Format

```json
POST https://api.paymongo.com/v1/subscriptions
Authorization: Basic YOUR_SECRET_KEY_BASE64
Content-Type: application/json

{
  "data": {
    "attributes": {
      "customer": "cus_XXXXXXXXXX",
      "plan": "plan_XXXXXXXXXX",
      "default_payment_method": "pm_XXXXXXXXXX"
    }
  }
}
```

### Using cURL

```bash
curl --request POST \
  --url https://api.paymongo.com/v1/subscriptions \
  --header 'accept: application/json' \
  --header 'authorization: Basic YOUR_SECRET_KEY_BASE64' \
  --header 'content-type: application/json' \
  --data '{
    "data": {
      "attributes": {
        "customer": "cus_XXXXXXXXXX",
        "plan": "plan_XXXXXXXXXX",
        "default_payment_method": "pm_XXXXXXXXXX"
      }
    }
  }'
```

### Using PowerShell

```powershell
$secretKey = "YOUR_PAYMONGO_SECRET_KEY"
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${secretKey}:"))

$body = @{
    data = @{
        attributes = @{
            customer = "cus_XXXXXXXXXX"
            plan = "plan_XXXXXXXXXX"
            default_payment_method = "pm_XXXXXXXXXX"
        }
    }
} | ConvertTo-Json -Depth 10

$headers = @{
    "Authorization" = "Basic $auth"
    "Content-Type" = "application/json"
}

Invoke-WebRequest -Uri "https://api.paymongo.com/v1/subscriptions" `
    -Method POST `
    -Headers $headers `
    -Body $body `
    -UseBasicParsing
```

---

## What Your Application Does Automatically

When you use Method 1 (UI), here's what happens behind the scenes:

1. **User clicks "Subscribe"** → Opens payment form
2. **User enters card details** → Creates payment method via `/api/payment-methods`
3. **User clicks "Continue"** → Your app:
   - Creates customer in PayMongo (if needed)
   - Creates subscription with:
     - `customer`: Customer ID
     - `plan`: PayMongo Plan ID
     - `default_payment_method`: Payment Method ID
4. **Subscription created!** → Saved to your database

---

## Prerequisites

Before you can create subscriptions, make sure:

1. ✅ **Subscriptions enabled** in PayMongo (email [email protected])
2. ✅ **Plans configured** with PayMongo Plan IDs
   - Visit: http://localhost:3000/settings/subscription/sync
   - Sync plans or set PayMongo Plan IDs manually

---

## Test Card Numbers

For testing (test mode only):

- **Visa**: `4111111111111111`
- **Mastercard**: `5555555555554444`
- **Any expiry**: Future date (e.g., 12/2025)
- **Any CVC**: 3-4 digits (e.g., 123)

---

## Quick Test

The fastest way to test:

1. Go to: http://localhost:3000/settings/subscription
2. Click "Subscribe" on Basic or Pro plan
3. Enter test card: `4111111111111111`, `12/2025`, `123`
4. Click "Continue"
5. Done! ✅

Your application handles all the API calls automatically!

