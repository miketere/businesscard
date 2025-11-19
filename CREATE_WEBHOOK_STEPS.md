# Step-by-Step: Create PayMongo Webhook (With Screenshots Guide)

## Prerequisites
✅ Ngrok is running
✅ Your server is running on port 3000
✅ You have a PayMongo account

## Step 1: Get Your Ngrok URL

**Open this in your browser:** http://localhost:4040

You'll see a page with:
- **Forwarding** section at the top
- Two URLs: one starting with `http://` and one with `https://`

**Copy the HTTPS URL** (the one starting with `https://`)
Example: `https://abc123-def456.ngrok-free.app`

---

## Step 2: Open PayMongo Dashboard

**Click this link to open PayMongo Webhooks page:**
https://dashboard.paymongo.com/settings/webhooks

Or manually:
1. Go to https://dashboard.paymongo.com
2. Click **Settings** (in the left sidebar)
3. Click **Webhooks**

---

## Step 3: Create New Webhook

1. Click the **"Create a new webhook"** button (usually green or blue, top right)

2. You'll see a form with:
   - **Endpoint URL** field (text input)
   - **Events** section (checkboxes)

---

## Step 4: Enter Endpoint URL

In the **Endpoint URL** field, paste:
```
https://YOUR-NGROK-URL/api/subscriptions/webhook
```

**Replace `YOUR-NGROK-URL`** with the HTTPS URL you copied from Step 1.

**Example:**
If your ngrok URL is `https://abc123-def456.ngrok-free.app`
Then enter: `https://abc123-def456.ngrok-free.app/api/subscriptions/webhook`

---

## Step 5: Select Events

Scroll down to find the **Subscription** section (it's in one of the columns).

**Check these boxes:**
- ✅ `subscription.activated`
- ✅ `subscription.updated`  
- ✅ `subscription.past_due`
- ✅ `subscription.unpaid`
- ✅ `subscription.invoice.paid` (might be under Subscription or Invoice section)
- ✅ `subscription.invoice.payment_failed` (might be under Subscription or Invoice section)

**How to find them:**
- Look for a section labeled **"Subscription"**
- Expand it if it's collapsed
- Check the individual event boxes

---

## Step 6: Create the Webhook

1. Click the **"Create webhook"** or **"Save"** button (usually at the bottom)

2. PayMongo will create the webhook and show you:
   - **Webhook ID**
   - **Webhook Secret** (this is what we need!)

---

## Step 7: Copy the Webhook Secret

**The webhook secret:**
- Starts with `whsec_`
- Is a long string of characters
- Looks like: `whsec_abc123def456ghi789...`

**Copy the entire secret** (click the copy button if available, or select and copy manually)

---

## Step 8: Give Me the Secret

Once you have the webhook secret, just tell me:
**"My webhook secret is: whsec_..."**

And I'll add it to your `.env` file automatically!

---

## Troubleshooting

**Can't see ngrok URL?**
- Make sure ngrok is running
- Try refreshing http://localhost:4040
- Check that your Next.js server is running on port 3000

**Can't find Subscription events?**
- Make sure you've contacted PayMongo support to enable subscriptions
- Subscription events might be under a different name
- Look for any event containing "subscription" or "invoice"

**Webhook creation fails?**
- Check that the ngrok URL is correct
- Make sure ngrok is still running
- Verify the endpoint URL format is exactly: `https://URL/api/subscriptions/webhook`

---

## What Happens Next?

After I add the webhook secret to your `.env` file:
1. I'll restart your server
2. You can test subscriptions at: http://localhost:3000/settings/subscription
3. PayMongo will send webhook events to your server automatically

