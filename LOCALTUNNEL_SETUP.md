# Using Localtunnel (No Signup Required!)

I've set up **localtunnel** as an alternative to ngrok - it doesn't require any signup!

## Get Your Public URL

**Look at the PowerShell window that just opened** - it will show:
```
your url is: https://xxxxx.loca.lt
```

**Copy that URL** (it will be different each time you start it)

## Create Webhook in PayMongo

1. Go to: https://dashboard.paymongo.com/settings/webhooks
2. Click **"Create a new webhook"**
3. **Endpoint URL**: 
   ```
   https://YOUR-LOCALTUNNEL-URL.loca.lt/api/subscriptions/webhook
   ```
   (Replace `YOUR-LOCALTUNNEL-URL` with the URL from the window)
   
   Example: `https://abc123.loca.lt/api/subscriptions/webhook`

4. **Select Events** (under Subscription):
   - ☑ subscription.activated
   - ☑ subscription.updated
   - ☑ subscription.past_due
   - ☑ subscription.unpaid
   - ☑ subscription.invoice.paid
   - ☑ subscription.invoice.payment_failed

5. Click **"Create webhook"**

6. **Copy the webhook secret** (starts with `whsec_`)

## Give Me the Secret

Once you have the webhook secret, tell me:
**"My webhook secret is: whsec_xxxxxxxxxxxxx"**

I'll add it to your `.env` file immediately!

## Important Notes

- The localtunnel URL changes each time you restart it
- Keep the PowerShell window open while testing
- The URL is valid as long as localtunnel is running

## Troubleshooting

**Can't see the localtunnel window?**
- Check your taskbar for a PowerShell window
- The URL will be displayed in that window

**Webhook not receiving events?**
- Make sure localtunnel is still running
- Verify your Next.js server is running on port 3000
- Check the endpoint URL is correct

