# Quick Start - Local Development with Supabase

## 🎯 Goal
Run the application on **localhost** while using **Supabase** for database and storage.

## ✅ What You Need

1. **Supabase Database** - Already have ✅
2. **Supabase Storage** - Already have ✅  
3. **Environment Variables** - Need to configure

## 📝 Step 1: Get Your Supabase Credentials

### Database Connection String

1. Go to https://app.supabase.com
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll to **Connection string** section
5. Select **"URI"** tab (NOT "Connection pooling")
6. Copy the connection string

**It should look like:**
```
postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

**Important:** 
- Replace `[YOUR_PASSWORD]` with your actual database password
- Add `?schema=public` at the end if not present
- Use port **5432** (direct connection) for migrations

### Supabase Storage Credentials

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## 📝 Step 2: Create/Update .env File

Create `.env` in the root directory with:

```env
# Supabase Database (REQUIRED)
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?schema=public"

# App URL
NEXT_PUBLIC_URL="http://localhost:3000"

# NextAuth (REQUIRED for authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="q3jqgisW96wUO+fhU7eL8wKHHNNNF16Ftbna6chzHLw="

# Google OAuth (REQUIRED for login)
# Get from https://console.cloud.google.com/
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Supabase Storage (REQUIRED for file uploads)
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 🔧 Step 3: Test Database Connection

```bash
npx prisma db pull
```

If successful, you'll see your database schema.

**If it fails:**
- Check your `DATABASE_URL` format
- Verify password is correct
- Try direct connection (not pooler)
- Check Supabase → Settings → Database → Connection Pooling → IP restrictions

## 🚀 Step 4: Run Migration

Once connection works:

```bash
npx prisma migrate dev --name add-auth-tables
```

This creates the authentication tables.

## ▶️ Step 5: Start Dev Server

```bash
npm run dev
```

Open http://localhost:3000

## 🔍 Troubleshooting

### Database Connection Fails

**Error:** `Can't reach database server`

**Try these:**

1. **Use direct connection** (not pooler):
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres?schema=public
   ```

2. **Check IP restrictions:**
   - Supabase → Settings → Database → Connection Pooling
   - Make sure your IP is allowed (or disable restrictions for testing)

3. **Verify connection string format:**
   - Must start with `postgresql://`
   - Must include `?schema=public` at the end
   - Password should be URL-encoded if it has special characters

4. **Test with Prisma Studio:**
   ```bash
   npx prisma studio
   ```
   If this works, your connection is fine.

### Migration Fails

If migration fails because tables exist:
```bash
npx prisma db push
```

This pushes the schema directly without creating migration files.

## ✅ Verification

- [ ] `.env` file created with all variables
- [ ] `npx prisma db pull` works
- [ ] `npx prisma migrate dev` works
- [ ] `npm run dev` starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:3000/auth/signin

## 🎯 After Setup

1. **Set up Google OAuth:**
   - Go to https://console.cloud.google.com/
   - Create OAuth 2.0 credentials
   - Add redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Add credentials to `.env`

2. **Test the app:**
   - Open http://localhost:3000
   - Try `/dashboard` - should redirect to login
   - After Google OAuth setup, you can log in

## 📚 More Help

- **Database setup:** See [SETUP_SUPABASE.md](./SETUP_SUPABASE.md)
- **Storage setup:** See [SETUP_SUPABASE_STORAGE.md](./SETUP_SUPABASE_STORAGE.md)
- **Full setup guide:** See [LOCAL_SUPABASE_SETUP.md](./LOCAL_SUPABASE_SETUP.md)

