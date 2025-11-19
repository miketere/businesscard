# Complete Vercel Deployment Guide with Supabase

## ✅ Your Code is Ready!

Your code is already on GitHub: `https://github.com/miketere/businesscard`

## 🚀 Deploy to Vercel - Complete Steps

### Step 1: Go to Vercel
1. Open https://vercel.com
2. **Sign in** (use "Continue with GitHub" to connect your GitHub account)

### Step 2: Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Find and click on **"miketere/businesscard"**
3. Click **"Import"**

### Step 3: Configure Project Settings
Vercel will auto-detect Next.js. Verify:
- **Framework Preset:** Next.js ✅
- **Root Directory:** `./` ✅
- **Build Command:** `npm run build` ✅
- **Output Directory:** `.next` ✅

**Don't change these** - they're correct!

### Step 4: Add Environment Variables (REQUIRED!)

**Before clicking Deploy**, add ALL these environment variables:

#### Required Variables:

1. **DATABASE_URL**
   - **Key:** `DATABASE_URL`
   - **Value:** `postgresql://postgres.khjajmdnzbwmlxthpany:Akopogi123@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres?schema=public`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

2. **NEXT_PUBLIC_URL**
   - **Key:** `NEXT_PUBLIC_URL`
   - **Value:** `https://your-app-name.vercel.app` (update after first deploy)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

3. **NEXTAUTH_URL**
   - **Key:** `NEXTAUTH_URL`
   - **Value:** `https://your-app-name.vercel.app` (update after first deploy)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

4. **NEXTAUTH_SECRET**
   - **Key:** `NEXTAUTH_SECRET`
   - **Value:** `q3jqgisW96wUO+fhU7eL8wKHHNNNF16Ftbna6chzHLw=` (or generate new one)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

5. **GOOGLE_CLIENT_ID**
   - **Key:** `GOOGLE_CLIENT_ID`
   - **Value:** Your Google OAuth Client ID (get from https://console.cloud.google.com/)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

6. **GOOGLE_CLIENT_SECRET**
   - **Key:** `GOOGLE_CLIENT_SECRET`
   - **Value:** Your Google OAuth Client Secret
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

7. **NEXT_PUBLIC_SUPABASE_URL**
   - **Key:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** Your Supabase Project URL (e.g., `https://xxxxx.supabase.co`)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

8. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Your Supabase anon/public key (starts with `eyJ...`)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

#### Optional Variables (if you use these features):

- `SMTP_HOST` = `smtp.gmail.com`
- `SMTP_PORT` = `587`
- `SMTP_USER` = `your-email@gmail.com`
- `SMTP_PASS` = `your-app-password`
- `PAYMONGO_SECRET_KEY` = `sk_test_xxxxx`
- `PAYMONGO_PUBLIC_KEY` = `pk_test_xxxxx`
- `PAYMONGO_WEBHOOK_SECRET` = `whsec_xxxxx`

### Step 5: Deploy!
1. Scroll to the bottom
2. Click the big **"Deploy"** button
3. Wait for the build to complete (2-5 minutes)

### Step 6: After First Deployment

1. **Copy your Vercel URL** (e.g., `https://businesscard-xyz.vercel.app`)

2. **Update Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Update `NEXT_PUBLIC_URL` with your actual URL
   - Update `NEXTAUTH_URL` with your actual URL
   - Click **"Save"** for each

3. **Set up Google OAuth Redirect URI:**
   - Go to https://console.cloud.google.com/
   - Open your OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-app-name.vercel.app/api/auth/callback/google`
   - Save

4. **Redeploy:**
   - Go to **Deployments** tab
   - Click **"..."** menu on latest deployment
   - Click **"Redeploy"**

5. **Run Database Migration:**
   ```bash
   npx prisma migrate deploy
   ```
   Or use Vercel CLI:
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

## ✅ Verification Checklist

- [ ] All environment variables added to Vercel
- [ ] Build completed successfully
- [ ] App URL accessible
- [ ] `NEXT_PUBLIC_URL` and `NEXTAUTH_URL` updated with actual URL
- [ ] Google OAuth redirect URI configured
- [ ] Database migration run (`npx prisma migrate deploy`)
- [ ] Can access login page: `https://your-app.vercel.app/auth/signin`
- [ ] Can log in with Google

## 🔍 Troubleshooting

### Build Fails?
- Check build logs in Vercel dashboard
- Verify all required environment variables are set
- Make sure `DATABASE_URL` is correct

### Database Connection Issues?
- Verify `DATABASE_URL` connection string
- Check Supabase → Settings → Database → Connection Pooling
- Ensure Supabase allows connections from Vercel IPs

### Authentication Not Working?
- Verify `NEXTAUTH_URL` matches your Vercel domain
- Check `NEXTAUTH_SECRET` is set
- Verify Google OAuth credentials are correct
- Ensure redirect URI is configured in Google Console

### File Uploads Not Working?
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Check Supabase Storage bucket `uploads` exists
- Verify RLS policies are set (see SETUP_SUPABASE_STORAGE.md)

## 🎉 You're Done!

Your app is live at: `https://your-app-name.vercel.app`

## 📚 Additional Resources

- **Supabase Storage Setup:** See [SETUP_SUPABASE_STORAGE.md](./SETUP_SUPABASE_STORAGE.md)
- **Google OAuth Setup:** See [AUTH_SETUP.md](./AUTH_SETUP.md)
- **Database Setup:** See [SETUP_SUPABASE.md](./SETUP_SUPABASE.md)

