# Troubleshooting Sign-In Error (HTTP 500)

## Common Causes

The HTTP 500 error when clicking "Sign In" is usually caused by one of these issues:

### 1. Missing Environment Variables in Vercel

**Check these in Vercel Dashboard → Settings → Environment Variables:**

- ✅ `NEXTAUTH_SECRET` - Must be set
- ✅ `NEXTAUTH_URL` - Must match your Vercel domain (e.g., `https://businesscard-brown-phi.vercel.app`)
- ✅ `GOOGLE_CLIENT_ID` - Must be set
- ✅ `GOOGLE_CLIENT_SECRET` - Must be set
- ✅ `DATABASE_URL` - Must be set

**Fix:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify all required variables are set
3. Make sure `NEXTAUTH_URL` matches your actual Vercel domain (not `localhost:3000`)
4. Redeploy after adding/updating variables

### 2. Database Tables Not Created

The authentication tables (`Account`, `Session`, `VerificationToken`) might not exist in your database.

**Fix:**
Run the database migration:

```bash
# Option 1: Using Vercel CLI (recommended)
vercel env pull .env.local
npx prisma migrate deploy

# Option 2: Direct connection
# Set DATABASE_URL in your local .env
npx prisma migrate deploy
```

**Or push schema directly:**
```bash
npx prisma db push
```

### 3. Incorrect NEXTAUTH_URL

`NEXTAUTH_URL` must match your actual Vercel domain.

**Fix:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Update `NEXTAUTH_URL` to: `https://businesscard-brown-phi.vercel.app`
3. Update `NEXT_PUBLIC_URL` to: `https://businesscard-brown-phi.vercel.app`
4. Redeploy

### 4. Google OAuth Not Configured

Google OAuth credentials might be missing or incorrect.

**Fix:**
1. Go to https://console.cloud.google.com/
2. Check your OAuth 2.0 credentials
3. Verify redirect URI is set: `https://businesscard-brown-phi.vercel.app/api/auth/callback/google`
4. Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in Vercel match your Google Console

### 5. Database Connection Issues

The database might not be accessible from Vercel.

**Fix:**
1. Check `DATABASE_URL` in Vercel environment variables
2. Verify Supabase database is running
3. Check Supabase → Settings → Database → Connection Pooling for IP restrictions

## Quick Checklist

- [ ] `NEXTAUTH_SECRET` is set in Vercel
- [ ] `NEXTAUTH_URL` matches your Vercel domain (not localhost)
- [ ] `GOOGLE_CLIENT_ID` is set in Vercel
- [ ] `GOOGLE_CLIENT_SECRET` is set in Vercel
- [ ] `DATABASE_URL` is set in Vercel
- [ ] Database migration has been run (`npx prisma migrate deploy`)
- [ ] Google OAuth redirect URI is configured
- [ ] All environment variables are set for Production, Preview, and Development

## How to Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Click "View Function Logs" or check the build logs
4. Look for error messages related to:
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - Database connection
   - Missing tables

## Step-by-Step Fix

1. **Verify Environment Variables:**
   ```
   Vercel Dashboard → Settings → Environment Variables
   ```
   Make sure all 8 required variables are set (see VERCEL_DEPLOY_COMPLETE.md)

2. **Update NEXTAUTH_URL:**
   - Current value might be `http://localhost:3000`
   - Change to: `https://businesscard-brown-phi.vercel.app`

3. **Run Database Migration:**
   ```bash
   npx prisma migrate deploy
   ```

4. **Redeploy:**
   - Vercel Dashboard → Deployments → Latest → "..." → Redeploy

5. **Test Again:**
   - Try signing in again
   - Check Vercel logs if it still fails

## Still Not Working?

Check the Vercel function logs for the exact error message. Common errors:

- `NEXTAUTH_SECRET is missing` → Add NEXTAUTH_SECRET
- `GOOGLE_CLIENT_ID is missing` → Add Google OAuth credentials
- `Table "Account" does not exist` → Run database migration
- `Can't reach database server` → Check DATABASE_URL

