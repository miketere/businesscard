# Local Development with Supabase

This guide helps you run the application locally while using Supabase for database and storage.

## ✅ What You Need

1. **Supabase Database** - Already set up ✅
2. **Supabase Storage** - Already set up ✅
3. **Local Environment Variables** - Need to configure

## 📋 Step 1: Get Your Supabase Credentials

### Database Connection String

1. Go to https://app.supabase.com
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll to **Connection string** section
5. Select **"URI"** tab (NOT Connection pooling)
6. Copy the connection string

**Format should be:**
```
postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

**Important:** 
- Replace `[YOUR_PASSWORD]` with your actual database password
- Add `?schema=public` at the end if not present
- Use port **5432** (direct connection) for migrations, not 6543

### Supabase Storage Credentials

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## 📝 Step 2: Update Your .env File

Create or update `.env` in the root directory:

```env
# Supabase Database (REQUIRED)
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?schema=public"

# App URL (for localhost)
NEXT_PUBLIC_URL="http://localhost:3000"

# NextAuth Configuration (REQUIRED for authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="q3jqgisW96wUO+fhU7eL8wKHHNNNF16Ftbna6chzHLw="

# Google OAuth (REQUIRED for authentication)
# Get from https://console.cloud.google.com/
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Supabase Storage (REQUIRED for file uploads)
# Get from Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Optional: Email (for email sharing)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Optional: PayMongo (for subscriptions)
PAYMONGO_SECRET_KEY="sk_test_xxxxxxxxxxxxx"
PAYMONGO_PUBLIC_KEY="pk_test_xxxxxxxxxxxxx"
PAYMONGO_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
```

## 🔧 Step 3: Test Database Connection

Run this to test your connection:

```bash
npx prisma db pull
```

If successful, you'll see your database schema.

## 🚀 Step 4: Run Database Migration

Once connection works, create the auth tables:

```bash
npx prisma migrate dev --name add-auth-tables
```

This will:
- Create `Account`, `Session`, and `VerificationToken` tables
- Update the `User` table if needed

## ▶️ Step 5: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 🔍 Troubleshooting

### Database Connection Fails

**Error:** `Can't reach database server`

**Solutions:**
1. **Check connection string format** - Make sure it's exactly:
   ```
   postgresql://postgres.[PROJECT_REF]:[PASSWORD]@[HOST]:5432/postgres?schema=public
   ```

2. **Try direct connection** - Use the "URI" connection string, not "Connection pooling"

3. **Check password** - Make sure password is URL-encoded if it contains special characters

4. **Check IP restrictions** - In Supabase → Settings → Database → Connection Pooling, make sure your IP is allowed (or disable IP restrictions for testing)

5. **Try without pooler** - Use direct connection:
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres?schema=public
   ```

### Supabase Storage Not Working

**Error:** `Failed to upload file`

**Solutions:**
1. **Verify credentials** - Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env`

2. **Check bucket exists** - Go to Supabase → Storage → Make sure `uploads` bucket exists

3. **Check RLS policies** - See [SETUP_SUPABASE_STORAGE.md](./SETUP_SUPABASE_STORAGE.md) for RLS policy setup

### Migration Fails

**Error:** `Migration failed`

**Solutions:**
1. **Check database connection** - Run `npx prisma db pull` first
2. **Check if tables exist** - Some tables might already exist
3. **Try `npx prisma db push`** instead of migrate (for development)

## ✅ Verification Checklist

- [ ] DATABASE_URL is set correctly in `.env`
- [ ] NEXT_PUBLIC_SUPABASE_URL is set in `.env`
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY is set in `.env`
- [ ] Database connection test passes (`npx prisma db pull`)
- [ ] Migration runs successfully (`npx prisma migrate dev`)
- [ ] Dev server starts without errors (`npm run dev`)
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:3000/auth/signin

## 🎯 Next Steps After Setup

1. **Set up Google OAuth** - Required for login
   - Go to https://console.cloud.google.com/
   - Create OAuth 2.0 credentials
   - Add redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Add credentials to `.env`

2. **Test the app**
   - Open http://localhost:3000
   - Try to access `/dashboard` - should redirect to login
   - After Google OAuth setup, you can log in

