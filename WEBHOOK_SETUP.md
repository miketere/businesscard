# PayMongo Webhook Setup Guide

## Step 1: Install ngrok (for local testing)

### Option A: Using Chocolatey (if installed)
```powershell
choco install ngrok
```

### Option B: Using Winget (Windows 10/11)
```powershell
winget install ngrok
```

### Option C: Manual Download
1. Go to https://ngrok.com/download
2. Download the Windows version
3. Extract ngrok.exe to a folder in your PATH (or current directory)

## Step 2: Start ngrok

Open a new terminal and run:
```powershell
ngrok http 3000
```

You'll see output like:
```
Forwarding   https://abc123.ngrok.io -> http://localhost:3000
```

**Copy the HTTPS URL** (e.g., `https://abc123.ngrok.io`)

## Step 3: Create Webhook in PayMongo

1. Go to [PayMongo Dashboard](https://dashboard.paymongo.com/)
2. Navigate to **Settings → Webhooks**
3. Click **"Create a new webhook"**
4. Enter the **Endpoint URL**:
   ```
   https://YOUR-NGROK-URL.ngrok.io/api/subscriptions/webhook
   ```
   (Replace `YOUR-NGROK-URL` with your actual ngrok URL)

5. Select these **Subscription events**:
   - ✅ `subscription.activated`
   - ✅ `subscription.updated`
   - ✅ `subscription.past_due`
   - ✅ `subscription.unpaid`
   - ✅ `subscription.invoice.paid` (or `invoice.paid`)
   - ✅ `subscription.invoice.payment_failed` (or `invoice.payment_failed`)

6. Click **"Create webhook"** or **"Save"**

## Step 4: Get Webhook Secret

After creating the webhook:
1. PayMongo will display the **Webhook Secret**
2. It starts with `whsec_`
3. Copy the entire secret

## Step 5: Add to .env file

Add the webhook secret to your `.env` file:
```env
PAYMONGO_WEBHOOK_SECRET="whsec_your_actual_secret_here"
```

## Step 6: Restart Your Server

Restart your Next.js development server to load the new environment variable.

## Step 7: Test the Webhook

1. In PayMongo Dashboard → Webhooks, you can send a test event
2. Check your server logs for: `Received webhook event: ...`
3. Verify the webhook is working correctly

## Important Notes

- **Keep ngrok running** while testing webhooks locally
- The ngrok URL changes each time you restart ngrok (unless you have a paid plan)
- For production, use your actual domain instead of ngrok
- The webhook secret is different for each webhook you create

## Troubleshooting

### Webhook not receiving events
- Ensure ngrok is running and forwarding to port 3000
- Check that your Next.js server is running on port 3000
- Verify the endpoint URL in PayMongo matches your ngrok URL

### Invalid signature errors
- Double-check the webhook secret in your `.env` file
- Ensure you copied the entire secret (including `whsec_` prefix)
- Restart your server after updating `.env`

### 404 errors
- Verify the route is `/api/subscriptions/webhook`
- Check that your Next.js server is running
