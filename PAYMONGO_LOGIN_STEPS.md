# PayMongo Login & Webhook Creation Steps

## Step 1: Log In to PayMongo

1. Go to: https://dashboard.paymongo.com/webhooks
2. You'll see the login page
3. Enter your **Email address** and **Password**
4. Click **"Log in"**

**Don't have an account?**
- Click **"Sign up here for free"** on the login page
- Create a free account (takes 2 minutes)
- Verify your email if required

## Step 2: Navigate to Webhooks

After logging in:
1. You'll be in the PayMongo dashboard
2. Go to **Settings** (usually in the left sidebar)
3. Click **Webhooks**
4. Or go directly to: https://dashboard.paymongo.com/settings/webhooks

## Step 3: Get Your Public URL

**While you're logging in, get your public URL:**

Look at the **PowerShell window running localtunnel** - it should show:
```
your url is: https://xxxxx.loca.lt
```

**Copy that URL** (you'll need it for the webhook)

## Step 4: Create the Webhook

Once you're logged in and on the webhooks page:

1. Click **"Create a new webhook"** button

2. **Endpoint URL**: 
   ```
   https://YOUR-LOCALTUNNEL-URL.loca.lt/api/subscriptions/webhook
   ```
   (Replace with your actual localtunnel URL)

3. **Select Events** - Under **Subscription** section, check:
   - ☑ subscription.activated
   - ☑ subscription.updated
   - ☑ subscription.past_due
   - ☑ subscription.unpaid
   - ☑ subscription.invoice.paid
   - ☑ subscription.invoice.payment_failed

4. Click **"Create webhook"** or **"Save"**

## Step 5: Copy Webhook Secret

After creating, PayMongo will display:
- **Webhook ID**
- **Webhook Secret** (starts with `whsec_`)

**Copy the entire webhook secret**

## Step 6: Give Me the Secret

Reply with:
**"My webhook secret is: whsec_xxxxxxxxxxxxx"**

I'll add it to your `.env` file immediately!

---

## Quick Checklist

- [ ] Logged into PayMongo
- [ ] Got localtunnel URL from PowerShell window
- [ ] Created webhook in PayMongo
- [ ] Copied webhook secret
- [ ] Shared secret with me

