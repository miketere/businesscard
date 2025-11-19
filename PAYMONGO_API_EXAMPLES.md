# PayMongo Subscription API - Request Examples

## Create a Subscription

According to the [PayMongo API Reference](https://developers.paymongo.com/reference/create-a-subscription), here's how to create a subscription:

### API Endpoint
```
POST https://api.paymongo.com/v1/subscriptions
```

### Request Body Format

```json
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

### Complete Flow

#### Step 1: Create a Customer
```bash
POST https://api.paymongo.com/v1/customers
```

**Request:**
```json
{
  "data": {
    "attributes": {
      "email": "[email protected]",
      "phone": "09123456789",
      "first_name": "Juan",
      "last_name": "Dela Cruz"
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "id": "cus_XXXXXXXXXX",
    "type": "customer",
    ...
  }
}
```

#### Step 2: Create a Payment Method
```bash
POST https://api.paymongo.com/v1/payment_methods
```

**Request (using public key):**
```json
{
  "data": {
    "attributes": {
      "type": "card",
      "details": {
        "card_number": "4111111111111111",
        "exp_month": 12,
        "exp_year": 2025,
        "cvc": "123"
      },
      "billing": {
        "name": "Juan Dela Cruz",
        "email": "[email protected]"
      }
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "id": "pm_XXXXXXXXXX",
    "type": "payment_method",
    ...
  }
}
```

#### Step 3: Create a Subscription
```bash
POST https://api.paymongo.com/v1/subscriptions
```

**Request:**
```json
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

**Response:**
```json
{
  "data": {
    "id": "subs_XXXXXXXXXX",
    "type": "subscription",
    "attributes": {
      "status": "active",
      "current_period_start": 1234567890,
      "current_period_end": 1237246290,
      ...
    }
  }
}
```

## Testing with Your Application

### Option 1: Use the UI (Easiest)

1. Go to: http://localhost:3000/settings/subscription
2. Click "Subscribe" on any plan
3. Fill in the payment form
4. The application will automatically:
   - Create customer
   - Create payment method
   - Create subscription

### Option 2: Use Your API Endpoints

#### Create Subscription via Your API
```powershell
$body = @{
    planId = "YOUR_DATABASE_PLAN_ID"
    paymentMethodId = "pm_XXXXXXXXXX"
    email = "[email protected]"
    firstName = "Juan"
    lastName = "Dela Cruz"
    phone = "09123456789"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/subscriptions" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

#### Create Payment Method First
```powershell
$body = @{
    type = "card"
    cardNumber = "4111111111111111"
    expMonth = 12
    expYear = 2025
    cvc = "123"
    billing = @{
        name = "Juan Dela Cruz"
        email = "[email protected]"
    }
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/payment-methods" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Option 3: Test Directly with PayMongo API

Use the test script:
```powershell
.\scripts\test-subscription-api.ps1 -CustomerId "cus_XXXXX" -PlanId "plan_XXXXX" -PaymentMethodId "pm_XXXXX"
```

Or use cURL:
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

## What Your Application Does

When you click "Subscribe" in the UI, your application:

1. ✅ **Collects Payment Method** → Creates payment method via `/api/payment-methods`
2. ✅ **Creates Customer** → Automatically creates customer in PayMongo
3. ✅ **Creates Subscription** → Creates subscription with customer, plan, and payment method

All of this happens automatically! You just need to:
1. Enable subscriptions in PayMongo
2. Sync your plans (or set PayMongo Plan IDs manually)
3. Use the UI to subscribe

## Need Help?

- **Sync Plans**: http://localhost:3000/settings/subscription/sync
- **View Plans**: http://localhost:3000/settings/subscription
- **Full Setup Guide**: See `PAYMONGO_SETUP_COMPLETE.md`

