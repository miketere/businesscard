# Deployment Verification Checklist

## ✅ Completed

1. **Database Schema Synced** ✅
   - Ran `npx prisma db push`
   - Auth tables (Account, Session, VerificationToken) are now in the database
   - Prisma Client regenerated

## 🔍 Verify in Vercel Dashboard

### 1. Environment Variables (Settings → Environment Variables)

Verify these are ALL set and correct:

- [ ] `DATABASE_URL` = Your Supabase connection string
- [ ] `NEXTAUTH_URL` = `https://businesscard-brown-phi.vercel.app` (NOT localhost)
- [ ] `NEXTAUTH_SECRET` = `q3jqgisW96wUO+fhU7eL8wKHHNNNF16Ftbna6chzHLw=`
- [ ] `GOOGLE_CLIENT_ID` = `318896382220-klmtp3s8svqvmeobsfg4h7o6asim3ouj.apps.googleusercontent.com`
- [ ] `GOOGLE_CLIENT_SECRET` = Your Client Secret (starts with `GOCSPX-`)
- [ ] `NEXT_PUBLIC_URL` = `https://businesscard-brown-phi.vercel.app`
- [ ] `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key

**Important:** Make sure `NEXTAUTH_URL` is set to your Vercel domain, NOT `http://localhost:3000`

### 2. Google OAuth Configuration

Verify in Google Cloud Console:
- [ ] Redirect URI is set: `https://businesscard-brown-phi.vercel.app/api/auth/callback/google`
- [ ] OAuth consent screen is configured
- [ ] Client ID and Secret match what's in Vercel

### 3. Redeploy

After verifying environment variables:
1. Go to Vercel Dashboard → Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait for deployment to complete

## 🧪 Test

1. Go to: `https://businesscard-brown-phi.vercel.app`
2. Try to access `/dashboard` - should redirect to `/auth/signin`
3. Click "Sign in with Google"
4. Complete Google OAuth flow
5. Should redirect back to `/dashboard` after successful login

## 🔍 If Still Getting Errors

### Check Vercel Logs:
1. Vercel Dashboard → Deployments → Latest
2. Click "View Function Logs" or "Runtime Logs"
3. Look for error messages

### Common Issues:

**Error: "Table Account does not exist"**
- ✅ Fixed - Database schema was pushed

**Error: "NEXTAUTH_SECRET is missing"**
- Check Vercel environment variables
- Make sure it's set for Production, Preview, and Development

**Error: "Invalid redirect_uri"**
- Check Google Console → Credentials → OAuth client
- Verify redirect URI matches exactly: `https://businesscard-brown-phi.vercel.app/api/auth/callback/google`

**Error: "NEXTAUTH_URL mismatch"**
- Make sure `NEXTAUTH_URL` in Vercel = `https://businesscard-brown-phi.vercel.app`
- NOT `http://localhost:3000`

## 📝 Next Steps

If everything is verified and still not working:
1. Check Vercel function logs for specific error
2. Verify all environment variables are saved (not just typed)
3. Make sure you clicked "Save" for each variable
4. Redeploy after adding/updating variables

