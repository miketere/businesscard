# PayMongo Subscription Integration - Complete Setup Guide

## ✅ Implementation Status

All PayMongo subscription features have been fully implemented and are ready to use.

### What's Implemented

1. ✅ **Payment Method Collection**
   - Secure card input form
   - PayMongo payment method API integration
   - Card validation and formatting

2. ✅ **Customer Creation**
   - Automatic customer creation in PayMongo
   - Supports email, phone, first name, last name

3. ✅ **Subscription Creation**
   - Follows official PayMongo API format
   - Creates subscriptions with customer, plan, and payment method
   - Proper error handling

4. ✅ **Plan Management**
   - Database plans with PayMongo linking
   - Automatic sync functionality
   - Manual plan ID configuration

5. ✅ **Webhook Integration**
   - Webhook endpoint for subscription events
   - Signature verification
   - Event handling (activated, updated, cancelled, invoices)

6. ✅ **UI Components**
   - Subscription plans display
   - Payment form modal
   - Sync/configuration page
   - Error messages with actionable links

## 🚀 Quick Start

### Step 1: Enable PayMongo Subscriptions

**Required**: Email [email protected] to request subscription feature activation.

**What to include in your email:**
- Your PayMongo account email
- Request: "Please enable the Subscriptions API feature for my account"
- Mention you're integrating recurring subscriptions

**Wait for confirmation** that subscriptions are enabled before proceeding.

### Step 2: Configure Your Plans

Once subscriptions are enabled, you have two options:

#### Option A: Automatic Sync (Recommended)

1. Visit: http://localhost:3000/settings/subscription/sync
2. Click **"Sync Plans with PayMongo"** button
3. This will automatically:
   - Create plans in PayMongo
   - Link them to your database plans
   - Set up everything automatically

#### Option B: Manual Configuration

If you've already created plans in PayMongo dashboard:

1. Visit: http://localhost:3000/settings/subscription/sync
2. For each plan showing "Not Configured":
   - Find the PayMongo Plan ID from your dashboard (starts with `plan_`)
   - Enter it in the input field
   - Click "Update"

### Step 3: Test Subscription Flow

1. Go to: http://localhost:3000/settings/subscription
2. Click "Subscribe" on any plan
3. Enter payment details in the form
4. Complete the subscription

## 📋 Current Plan Status

Your database plans:
- **Free Plan** (₱0/month) - No PayMongo plan needed
- **Basic Plan** (₱299/month) - Needs PayMongo Plan ID
- **Pro Plan** (₱799/month) - Needs PayMongo Plan ID

## 🔧 API Endpoints

### Plan Management

- `GET /api/subscriptions/plans` - List all plans
- `POST /api/subscriptions/plans` - Create new plan
- `GET /api/subscriptions/plans/sync` - Check sync status
- `POST /api/subscriptions/plans/sync` - Sync plans with PayMongo
- `GET /api/subscriptions/plans/manual` - List plans for manual config
- `POST /api/subscriptions/plans/manual` - Manually set PayMongo Plan ID

### Subscriptions

- `GET /api/subscriptions` - List subscriptions
- `POST /api/subscriptions` - Create subscription
- `GET /api/subscriptions/current` - Get current user's subscription
- `GET /api/subscriptions/[id]` - Get specific subscription
- `PUT /api/subscriptions/[id]` - Update subscription
- `DELETE /api/subscriptions/[id]` - Cancel subscription

### Payment Methods

- `POST /api/payment-methods` - Create payment method

### Webhooks

- `POST /api/subscriptions/webhook` - PayMongo webhook endpoint

## 🛠️ PowerShell Helper Scripts

Located in `scripts/` directory:

```powershell
# List all plans and their status
.\scripts\list-plans.ps1

# Manually set a PayMongo Plan ID
.\scripts\set-plan-ids.ps1 -PlanId "PLAN_ID" -PayMongoPlanId "plan_XXXXX"
```

## 📝 Environment Variables Required

Make sure your `.env` file has:

```env
PAYMONGO_SECRET_KEY="sk_test_..." or "sk_live_..."
PAYMONGO_PUBLIC_KEY="pk_test_..." or "pk_live_..."
PAYMONGO_WEBHOOK_SECRET="whsec_..."
```

## 🔗 Important Links

- **Sync Page**: http://localhost:3000/settings/subscription/sync
- **Subscription Page**: http://localhost:3000/settings/subscription
- **PayMongo Dashboard**: https://dashboard.paymongo.com/
- **API Reference**: https://developers.paymongo.com/reference/create-a-subscription

## ⚠️ Troubleshooting

### "Plan is not configured with PayMongo"
- **Solution**: Visit the sync page and configure your plans
- **URL**: http://localhost:3000/settings/subscription/sync

### "resource_not_found" error
- **Cause**: Subscriptions not enabled in PayMongo account
- **Solution**: Email [email protected] to enable subscriptions

### "Payment method collection not implemented"
- **Status**: ✅ This is now fully implemented!

### Webhook not receiving events
- Check ngrok is running (for local development)
- Verify webhook URL in PayMongo dashboard
- Check webhook secret in `.env` file

## ✨ Next Steps

1. **Enable subscriptions** in PayMongo (email support)
2. **Sync your plans** using the sync page
3. **Test the subscription flow** end-to-end
4. **Set up webhooks** for production (use your production URL)

## 📚 Code Structure

```
lib/paymongo.ts              - PayMongo API client
app/api/subscriptions/       - Subscription API routes
app/api/payment-methods/     - Payment method API
app/api/subscriptions/webhook/ - Webhook handler
components/PaymentMethodForm.tsx - Payment form UI
components/SubscriptionPlans.tsx - Plans display
app/settings/subscription/   - Subscription pages
```

Everything is ready! Just enable subscriptions in PayMongo and sync your plans. 🎉

