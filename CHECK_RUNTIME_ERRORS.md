# How to Check Runtime Errors (Not Build Logs)

## ✅ Build Completed Successfully

Your build logs show the deployment was successful. However, the HTTP 500 error happens at **runtime** (when the app is running), not during build.

## 🔍 Check Runtime/Function Logs

The error happens when you click "Sign in", so we need to see the **runtime logs**:

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com
2. Go to your project: **businesscard**

### Step 2: Open Function Logs
1. Click **"Deployments"** tab
2. Click on the **latest deployment** (the one that just completed)
3. Look for one of these options:
   - **"Functions"** tab
   - **"Runtime Logs"** button
   - **"View Function Logs"** link
   - **"Logs"** tab

### Step 3: Trigger the Error
1. Open your app: `https://businesscard-brown-phi.vercel.app`
2. Click **"Sign in"** or try to access `/dashboard`
3. **Watch the logs in real-time** in Vercel

### Step 4: Look for Errors
You should see error messages like:
- `❌ GOOGLE_CLIENT_ID is missing`
- `❌ GOOGLE_CLIENT_SECRET is missing`
- `❌ NEXTAUTH_SECRET is missing`
- `Table "Account" does not exist`
- `Can't reach database server`
- `Invalid redirect_uri`
- Any other error messages

## 📸 Alternative: Check in Real-Time

If you can't find the logs tab:

1. **Vercel Dashboard** → Your Project
2. Click **"Logs"** in the left sidebar (if available)
3. Or go to **"Deployments"** → Latest → Click the deployment
4. Look for **"View Logs"** or **"Runtime Logs"**

## 🎯 What We're Looking For

The exact error message will tell us:
- If environment variables are missing
- If database tables don't exist
- If there's a database connection issue
- If Google OAuth is misconfigured

## 💡 Quick Test

Try this:
1. Open: `https://businesscard-brown-phi.vercel.app/auth/signin`
2. Click "Sign in with Google"
3. **Immediately** check Vercel logs
4. Copy the error message you see

The error should appear in the logs within seconds of clicking the button.
