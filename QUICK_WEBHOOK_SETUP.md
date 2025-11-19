# Quick Webhook Secret Setup

## Current Status
✅ PayMongo API keys added to .env
✅ Ngrok is running
⏳ Need webhook secret from PayMongo

## Get Your Webhook Secret (5 minutes)

### Step 1: Get Ngrok URL
Open in browser: **http://localhost:4040**

Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)

### Step 2: Create Webhook in PayMongo
1. Go to: https://dashboard.paymongo.com/settings/webhooks
2. Click **"Create a new webhook"**
3. **Endpoint URL**: `https://YOUR-NGROK-URL.ngrok.io/api/subscriptions/webhook`
   - Replace `YOUR-NGROK-URL` with your actual ngrok URL
4. **Select Events** (under Subscription):
   - ✅ `subscription.activated`
   - ✅ `subscription.updated`
   - ✅ `subscription.past_due`
   - ✅ `subscription.unpaid`
   - ✅ `subscription.invoice.paid`
   - ✅ `subscription.invoice.payment_failed`
5. Click **"Create webhook"**

### Step 3: Copy Webhook Secret
After creating, PayMongo shows the **Webhook Secret** (starts with `whsec_`)

### Step 4: Update .env File
Replace this line in your `.env` file:
```env
PAYMONGO_WEBHOOK_SECRET="whsec_PLACEHOLDER_REPLACE_WITH_ACTUAL_SECRET"
```

With your actual secret:
```env
PAYMONGO_WEBHOOK_SECRET="whsec_your_actual_secret_from_paymongo"
```

### Step 5: Restart Server
Restart your Next.js server to load the new secret.

## Test Subscription
After setup, you can test subscriptions at:
- http://localhost:3000/settings/subscription

