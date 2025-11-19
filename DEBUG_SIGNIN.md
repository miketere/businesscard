# Debug Sign-In Error - Step by Step

## Step 1: Check Vercel Function Logs

**This is the most important step** - it will tell us exactly what's wrong:

1. Go to **Vercel Dashboard** → Your Project
2. Click **"Deployments"** tab
3. Click on the **latest deployment**
4. Click **"Functions"** tab (or look for "View Function Logs" / "Runtime Logs")
5. Look for errors when you try to sign in

**Look for these specific errors:**
- `Table "Account" does not exist` → Database tables missing
- `NEXTAUTH_SECRET is missing` → Environment variable issue
- `Invalid redirect_uri` → Google OAuth configuration issue
- `Can't reach database server` → Database connection issue
- Any other error messages

**Copy the exact error message** and share it.

## Step 2: Verify Database Tables Exist

The migration we ran locally should have created the tables, but let's verify:

### Option A: Check via Supabase Dashboard
1. Go to https://app.supabase.com
2. Select your project
3. Go to **Table Editor**
4. Look for these tables:
   - `Account`
   - `Session`
   - `VerificationToken`
   - `User`

If they don't exist, we need to run the migration again.

### Option B: Check via Prisma Studio
```bash
# Make sure your local .env has the same DATABASE_URL as Vercel
npx prisma studio
```

This will open a browser window showing all your tables.

## Step 3: Verify NEXTAUTH_URL Format

In Vercel, check that `NEXTAUTH_URL` is:
- ✅ `https://businesscard-brown-phi.vercel.app` (correct)
- ❌ `https://businesscard-brown-phi.vercel.app/` (has trailing slash - wrong)
- ❌ `http://businesscard-brown-phi.vercel.app` (http instead of https - wrong)
- ❌ `http://localhost:3000` (localhost - wrong)

## Step 4: Test Database Connection from Vercel

The issue might be that Vercel can't connect to your database. Check:

1. **Supabase IP Restrictions:**
   - Go to Supabase → Settings → Database → Connection Pooling
   - Make sure IP restrictions allow Vercel's IPs (or disable restrictions)

2. **Connection String Format:**
   - Make sure `DATABASE_URL` in Vercel includes `?schema=public` at the end
   - Should be: `postgresql://...?schema=public`

## Step 5: Check Google OAuth Redirect URI

1. Go to https://console.cloud.google.com/
2. APIs & Services → Credentials
3. Click your OAuth client
4. Under "Authorized redirect URIs", verify:
   - `https://businesscard-brown-phi.vercel.app/api/auth/callback/google`
   - No trailing slash
   - Exact match (case-sensitive)

## Most Likely Issues:

1. **Database tables don't exist** - Run migration again
2. **NEXTAUTH_URL has trailing slash** - Remove it
3. **Database connection from Vercel fails** - Check IP restrictions
4. **Google OAuth redirect URI mismatch** - Verify exact match

## Quick Fixes to Try:

### Fix 1: Re-run Database Migration
```bash
# Make sure your local .env DATABASE_URL matches Vercel
npx prisma db push
```

### Fix 2: Remove Trailing Slash from NEXTAUTH_URL
In Vercel → Settings → Environment Variables:
- Edit `NEXTAUTH_URL`
- Make sure it's exactly: `https://businesscard-brown-phi.vercel.app` (no trailing slash)
- Save and redeploy

### Fix 3: Verify Database Connection
```bash
# Test connection
npx prisma db pull
```

If this fails, the DATABASE_URL might be incorrect or IP-restricted.

## What to Share:

1. **Exact error from Vercel logs** (most important!)
2. **Whether database tables exist** (check Supabase Table Editor)
3. **NEXTAUTH_URL value** (copy from Vercel, make sure no trailing slash)

