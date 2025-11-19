# Authentication Setup Guide

This guide will help you set up Google OAuth authentication for your NexCard application.

## Step 1: Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install next-auth@beta @auth/prisma-adapter --legacy-peer-deps
```

## Step 2: Run Database Migration

Update your database schema to include authentication tables:

```bash
npx prisma migrate dev --name add-auth-tables
```

This will create the following tables:
- `Account` - OAuth account information
- `Session` - User sessions
- `VerificationToken` - Email verification tokens
- Updates `User` model to support OAuth (makes password optional, adds image and emailVerified fields)

## Step 3: Set Up Google OAuth

### 3.1 Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - **Development**: `http://localhost:3000/api/auth/callback/google`
     - **Production**: `https://businesscard-brown-phi.vercel.app/api/auth/callback/google`
5. Copy your **Client ID** and **Client Secret**

### 3.2 Add Environment Variables

Add these to your `.env` file:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3.3 Generate NEXTAUTH_SECRET

Generate a secure secret key:

**On Linux/Mac:**
```bash
openssl rand -base64 32
```

**On Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Or use an online generator:**
- Visit: https://generate-secret.vercel.app/32

## Step 4: Update Vercel Environment Variables

For production deployment, add these environment variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add the following:
   - `NEXTAUTH_URL` = `https://businesscard-brown-phi.vercel.app`
   - `NEXTAUTH_SECRET` = (your generated secret)
   - `GOOGLE_CLIENT_ID` = (your Google Client ID)
   - `GOOGLE_CLIENT_SECRET` = (your Google Client Secret)

## Step 5: Test Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Try to access `/dashboard` - you should be redirected to `/auth/signin`

3. Click "Sign in with Google"

4. Complete the Google OAuth flow

5. You should be redirected back to `/dashboard` after successful authentication

## How It Works

### Authentication Flow

1. User tries to access a protected route (e.g., `/dashboard`)
2. Middleware checks if user is authenticated
3. If not authenticated, redirects to `/auth/signin`
4. User clicks "Sign in with Google"
5. Redirected to Google OAuth consent screen
6. After approval, Google redirects back to `/api/auth/callback/google`
7. NextAuth creates/updates user in database
8. Creates a session
9. Redirects user to the original destination (e.g., `/dashboard`)

### Protected Routes

The following routes are protected by middleware:
- `/dashboard`
- `/settings`
- `/analytics`
- `/contacts`
- `/create`
- `/edit`

### API Route Protection

All API routes now check for authentication:

```typescript
const session = await getSession()
if (!session || !session.user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
const userId = session.user.id
```

## Troubleshooting

### "Invalid redirect_uri" Error

- Make sure the redirect URI in Google Console matches exactly:
  - Development: `http://localhost:3000/api/auth/callback/google`
  - Production: `https://businesscard-brown-phi.vercel.app/api/auth/callback/google`
- Check for trailing slashes or typos

### "NEXTAUTH_SECRET is missing" Error

- Make sure `NEXTAUTH_SECRET` is set in your `.env` file
- For Vercel, ensure it's added in Environment Variables
- Regenerate if needed

### "Database error" or "Table doesn't exist"

- Run the migration: `npx prisma migrate dev --name add-auth-tables`
- Make sure Prisma Client is generated: `npx prisma generate`

### Session not persisting

- Check that `NEXTAUTH_URL` matches your actual domain
- Ensure cookies are enabled in your browser
- Check browser console for cookie errors

## Next Steps

After setting up Google authentication:

1. **Add more providers** (Facebook, GitHub, etc.) - see `app/api/auth/[...nextauth]/route.ts`
2. **Add email/password authentication** - use Credentials provider
3. **Implement role-based access control** - add roles to User model
4. **Add email verification** - for email/password signups

## Security Notes

- Never commit `.env` file to Git
- Rotate `NEXTAUTH_SECRET` if compromised
- Use HTTPS in production (Vercel provides this automatically)
- Regularly review OAuth app permissions in Google Console

