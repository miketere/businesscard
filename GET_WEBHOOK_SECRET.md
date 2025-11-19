# How to Get Your PayMongo Webhook Secret

## Current Status
✅ Ngrok is installed and running
✅ Your Next.js server is running on port 3000
✅ Ngrok should be forwarding to your local server

## Step 1: Get Your Ngrok URL

**Option A: Use the ngrok web interface**
1. Open your browser and go to: **http://localhost:4040**
2. You'll see the ngrok web interface
3. Look for the **"Forwarding"** section
4. Copy the **HTTPS URL** (it will look like: `https://abc123.ngrok.io`)

**Option B: Use the script**
Run this command:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/get-ngrok-url.ps1
```

## Step 2: Create Webhook in PayMongo

1. Go to [PayMongo Dashboard](https://dashboard.paymongo.com/)
2. Navigate to **Settings → Webhooks**
3. Click **"Create a new webhook"**
4. In the **Endpoint URL** field, enter:
   ```
   https://YOUR-NGROK-URL.ngrok.io/api/subscriptions/webhook
   ```
   (Replace `YOUR-NGROK-URL` with the HTTPS URL from Step 1)

5. Under **Events**, check these Subscription events:
   - ✅ `subscription.activated`
   - ✅ `subscription.updated`
   - ✅ `subscription.past_due`
   - ✅ `subscription.unpaid`
   - ✅ `subscription.invoice.paid` (or `invoice.paid`)
   - ✅ `subscription.invoice.payment_failed` (or `invoice.payment_failed`)

6. Click **"Create webhook"** or **"Save"**

## Step 3: Copy the Webhook Secret

After creating the webhook, PayMongo will display:
- The webhook secret (starts with `whsec_`)
- The webhook ID

**Copy the entire webhook secret** - you'll need it for your `.env` file.

## Step 4: Add to .env File

Open your `.env` file and add/update:
```env
PAYMONGO_WEBHOOK_SECRET="whsec_your_actual_secret_here"
```

Replace `whsec_your_actual_secret_here` with the actual secret you copied from PayMongo.

## Step 5: Restart Your Server

After adding the webhook secret to `.env`, restart your Next.js server:
1. Stop the current server (Ctrl+C)
2. Run `npm run dev` again

## Step 6: Test the Webhook

1. In PayMongo Dashboard → Webhooks, you can see your webhook
2. You can send a test event from the dashboard
3. Check your server logs/console for: `Received webhook event: ...`

## Quick Reference

- **Ngrok Web Interface**: http://localhost:4040
- **Webhook Endpoint Format**: `https://YOUR-NGROK-URL.ngrok.io/api/subscriptions/webhook`
- **Webhook Secret Format**: `whsec_xxxxxxxxxxxxxxxxxxxxx`

## Troubleshooting

**Can't see ngrok URL?**
- Make sure ngrok is running: Check http://localhost:4040
- If ngrok isn't running, start it: `ngrok http 3000`

**Webhook not receiving events?**
- Verify the endpoint URL is correct
- Make sure your Next.js server is running
- Check that ngrok is forwarding to port 3000

**Invalid signature errors?**
- Double-check the webhook secret in `.env`
- Make sure you copied the entire secret including `whsec_`
- Restart your server after updating `.env`

