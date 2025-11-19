# Step-by-Step Vercel Deployment Guide

## ✅ Your Code is Ready!

Your code has been pushed to GitHub: `https://github.com/miketere/businesscard`

> **📖 For complete deployment guide with all environment variables, see [VERCEL_DEPLOY_COMPLETE.md](./VERCEL_DEPLOY_COMPLETE.md)**

## 🚀 Deploy to Vercel - Follow These Steps

### Step 1: Go to Vercel
1. Open your browser and go to **[vercel.com](https://vercel.com)**
2. **Sign in** (use "Continue with GitHub" to connect your GitHub account)

### Step 2: Import Your Project
1. Click the **"Add New..."** button (top right)
2. Select **"Project"**
3. You'll see your GitHub repositories
4. Find and click on **"miketere/businesscard"**
5. Click **"Import"**

### Step 3: Configure Project Settings
Vercel will auto-detect Next.js. You should see:
- **Framework Preset:** Next.js ✅
- **Root Directory:** `./` ✅
- **Build Command:** `npm run build` ✅
- **Output Directory:** `.next` ✅

**Don't change these** - they're correct!

### Step 4: Add Environment Variables (IMPORTANT!)
**Before clicking Deploy**, add your environment variables:

1. Scroll down to **"Environment Variables"** section
2. Click **"+ Add"** or the input field
3. Add these two variables:

   **Variable 1:**
   - **Key:** `DATABASE_URL`
   - **Value:** `postgresql://postgres.khjajmdnzbwmlxthpany:Akopogi123@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres?schema=public`
   - **Environments:** Check all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 2:**
   - **Key:** `NEXT_PUBLIC_URL`
   - **Value:** `https://your-app-name.vercel.app` (we'll update this after first deploy)
   - **Environments:** Check all (Production, Preview, Development)
   - Click **"Save"**

### Step 5: Deploy!
1. Scroll to the bottom
2. Click the big **"Deploy"** button
3. Wait for the build to complete (2-5 minutes)

### Step 6: After First Deployment
1. Once deployed, Vercel will show you your app URL (e.g., `https://businesscard-xyz.vercel.app`)
2. Copy that URL
3. Go to **Settings** → **Environment Variables**
4. Update `NEXT_PUBLIC_URL` with your actual URL
5. Go to **Deployments** tab
6. Click the **"..."** menu on the latest deployment
7. Click **"Redeploy"**

## 🎉 You're Done!

Your app will be live at: `https://your-app-name.vercel.app`

## 📝 Optional: Add More Environment Variables

If you use these features, add them too:

- `SMTP_HOST` = `smtp.gmail.com`
- `SMTP_PORT` = `587`
- `SMTP_USER` = `your-email@gmail.com`
- `SMTP_PASS` = `your-app-password`
- `PAYMONGO_SECRET_KEY` = `sk_test_xxxxx`
- `PAYMONGO_PUBLIC_KEY` = `pk_test_xxxxx`
- `PAYMONGO_WEBHOOK_SECRET` = `whsec_xxxxx`

## 🔍 Troubleshooting

### Build Fails?
- Check the build logs in Vercel
- Make sure `DATABASE_URL` is set correctly
- Verify your Supabase database is accessible

### Database Connection Issues?
- Double-check your `DATABASE_URL` connection string
- Make sure Supabase allows connections from Vercel's IPs
- Try using the Session Pooler URL (which you already have)

### Need Help?
- Check Vercel logs: Go to your project → Deployments → Click on a deployment → View logs
- Check Supabase logs: Go to Supabase dashboard → Logs

---

**Ready?** Follow steps 1-5 above to deploy! 🚀

