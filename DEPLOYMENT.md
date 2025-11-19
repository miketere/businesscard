# Deployment Guide - Vercel + Supabase

This guide will help you deploy your Next.js application to Vercel while using Supabase for your PostgreSQL database.

## Prerequisites

1. **GitHub Account** - Your code needs to be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free tier available)
3. **Supabase Project** - Already set up with your database

## Step 1: Push Your Code to GitHub

If you haven't already, create a GitHub repository and push your code:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Add your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "Add New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow the prompts)
vercel

# For production deployment
vercel --prod
```

## Step 3: Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

### Required Variables:

```
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres?schema=public
```

```
NEXT_PUBLIC_URL=https://your-app-name.vercel.app
```

### Optional Variables (if you use these features):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

```
PAYMONGO_SECRET_KEY=sk_test_xxxxxxxxxxxxx
PAYMONGO_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
PAYMONGO_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

**Important:** 
- Replace `your-app-name.vercel.app` with your actual Vercel deployment URL
- Make sure to add these for **Production**, **Preview**, and **Development** environments

## Step 4: Configure Build Settings

Vercel needs to generate Prisma Client during build. Add this to your build settings:

1. Go to **Settings** → **General**
2. Under **Build & Development Settings**, ensure:
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: `.next`

## Step 5: Run Database Migrations

After deployment, you need to run Prisma migrations on your Supabase database:

### Option A: Run migrations locally (recommended)

```bash
# Make sure your local .env points to Supabase
npx prisma migrate deploy
```

### Option B: Use Vercel CLI

```bash
# Set environment variables locally
export DATABASE_URL="your-supabase-connection-string"

# Run migrations
npx prisma migrate deploy
```

## Step 6: Update Supabase Settings

1. **Update your Supabase project URL** in your application
2. **Configure CORS** if needed (usually not required for Vercel)
3. **Update Webhook URLs** if you're using PayMongo webhooks:
   - Go to PayMongo dashboard
   - Update webhook URL to: `https://your-app-name.vercel.app/api/subscriptions/webhook`

## Step 7: Verify Deployment

1. Visit your Vercel deployment URL: `https://your-app-name.vercel.app`
2. Test the application:
   - Create an account
   - Create a card
   - Test database connections
   - Verify all features work

## Troubleshooting

### Build Fails with Prisma Errors

If you get Prisma-related build errors:

1. Make sure `DATABASE_URL` is set in Vercel environment variables
2. Add a build script that generates Prisma Client:

```json
"scripts": {
  "postinstall": "prisma generate",
  "build": "prisma generate && next build"
}
```

### Database Connection Issues

- Verify your Supabase connection string is correct
- Check that your IP is allowed in Supabase (or use connection pooling)
- Ensure the database is accessible from Vercel's servers

### Environment Variables Not Working

- Make sure variables are added for the correct environment (Production/Preview/Development)
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)

## Continuous Deployment

Vercel automatically deploys when you push to your main branch:
- **Production**: Deploys from `main` branch
- **Preview**: Deploys from other branches and pull requests

## Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_URL` environment variable

## Monitoring

- **Vercel Dashboard**: View deployments, logs, and analytics
- **Supabase Dashboard**: Monitor database performance and usage
- **Error Tracking**: Consider adding Sentry or similar for production

## Next Steps

- Set up monitoring and error tracking
- Configure custom domain
- Set up staging environment
- Enable Vercel Analytics
- Configure automatic backups for Supabase

---

**Need Help?**
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

