# Simple Webhook Setup - If Ngrok Web Interface Doesn't Work

## What I've Done
✅ Opened a new PowerShell window running ngrok
✅ Your server is running on port 3000

## Get Your Ngrok URL

**Look at the PowerShell window that just opened** - it should show something like:

```
Session Status                online
Account                       (Plan: Free)
Forwarding                    https://abc123.ngrok-free.app -> http://localhost:3000
```

**Copy the HTTPS URL** (the one starting with `https://`)

Example: `https://abc123-def456.ngrok-free.app`

---

## Alternative: Get URL from JSON API

If you can't see the ngrok window, try this:

1. Open this URL in your browser:
   ```
   http://localhost:4040/api/tunnels
   ```

2. You'll see JSON data. Look for:
   ```json
   "public_url": "https://xxxxx.ngrok-free.app"
   ```

3. Copy that URL

---

## Create Webhook in PayMongo

1. Go to: https://dashboard.paymongo.com/settings/webhooks
2. Click **"Create a new webhook"**
3. **Endpoint URL**: 
   ```
   https://YOUR-NGROK-URL/api/subscriptions/webhook
   ```
   (Replace YOUR-NGROK-URL with the URL you copied)
4. Check Subscription events (see list below)
5. Click **"Create webhook"**
6. **Copy the webhook secret** (starts with `whsec_`)

---

## Events to Check

Under **Subscription** section, check:
- ☑ subscription.activated
- ☑ subscription.updated
- ☑ subscription.past_due
- ☑ subscription.unpaid
- ☑ subscription.invoice.paid
- ☑ subscription.invoice.payment_failed

---

## Give Me the Secret

Once you have the webhook secret, just tell me:
**"My webhook secret is: whsec_xxxxxxxxxxxxx"**

I'll add it to your `.env` file immediately!

---

## Still Having Issues?

If ngrok still doesn't work:
1. Close the ngrok PowerShell window
2. Open a new PowerShell window manually
3. Run: `ngrok http 3000`
4. Copy the HTTPS URL from the output

