# Quick Setup Guide

Follow these steps to get your Digital Business Card application running:

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the root directory with the following:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/business_card?schema=public"
NEXT_PUBLIC_URL="http://localhost:3000"

# NextAuth Configuration (Required for authentication)
# Generate NEXTAUTH_SECRET with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-key-here"

# Google OAuth (Required for authentication)
# Get these from https://console.cloud.google.com/
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Supabase Storage (Required for file uploads on Vercel, optional for local development)
# Get these from https://app.supabase.com → Settings → API
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# PayMongo API Keys (Required for subscriptions)
# Get these from https://dashboard.paymongo.com/
PAYMONGO_SECRET_KEY="sk_test_xxxxxxxxxxxxx"
PAYMONGO_PUBLIC_KEY="pk_test_xxxxxxxxxxxxx"
PAYMONGO_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
```

**Notes**: 
- **Supabase Storage**: Required for file uploads on Vercel. For local development, files are saved to `public/` directory if not configured. See [SETUP_SUPABASE_STORAGE.md](./SETUP_SUPABASE_STORAGE.md) for setup instructions.
- Email configuration is optional. The app will work without it, but email sharing won't function.
- PayMongo keys are required for subscription functionality. Get them from [PayMongo Dashboard](https://dashboard.paymongo.com/).
- For subscriptions to work, you need to contact PayMongo support to enable subscription features on your account.

## Step 3: Initialize Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

This will:
- Generate the Prisma client
- Create the SQLite database file
- Run the initial migration

## Step 4: Start Development Server

```bash
npm run dev
```

## Step 5: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Creating Your First Card

1. Click "Create my card" on the homepage
2. Fill in your information
3. Customize your card design
4. Click "Create Card"
5. Share your card using the QR code or link!

## Troubleshooting

### Database Issues
- Make sure you've run `npx prisma generate` and `npx prisma migrate dev`
- Check that the `.env` file has `DATABASE_URL` set correctly

### Image Upload Issues
- **Local Development**: Ensure the `public/uploads`, `public/profiles`, and `public/logos` directories exist
- **Vercel/Production**: Configure Supabase Storage (see [SETUP_SUPABASE_STORAGE.md](./SETUP_SUPABASE_STORAGE.md))
- Check file permissions (local only)
- Verify Supabase Storage bucket is created and public (for production)

### Email Not Working
- Verify SMTP credentials in `.env`
- For Gmail, you may need to use an "App Password" instead of your regular password
- Email functionality is optional - the app works without it

## Next Steps

- Customize templates in `components/CardTemplates/`
- Add authentication (currently uses temporary user ID)
- **Set up Supabase Storage** for file uploads (see [SETUP_SUPABASE_STORAGE.md](./SETUP_SUPABASE_STORAGE.md))
- Deploy to production (Vercel, Netlify, etc.)

