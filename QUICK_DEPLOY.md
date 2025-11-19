# Quick Deployment Guide - Vercel + Supabase

## ✅ Setup Complete!

Your project is now ready to deploy to Vercel with Supabase as your database.

## 🚀 Quick Start (3 Steps)

### Step 1: Push to GitHub

```bash
# If not already a git repo
git init
git add .
git commit -m "Ready for deployment"

# Add your GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in
2. Click **"Add New Project"**
3. **Import your GitHub repository**
4. Vercel will auto-detect Next.js - click **"Deploy"**

### Step 3: Add Environment Variables

In Vercel Dashboard → **Settings** → **Environment Variables**, add:

```
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres?schema=public
```

```
NEXT_PUBLIC_URL=https://your-app-name.vercel.app
```

(Replace `your-app-name.vercel.app` with your actual Vercel URL after first deployment)

**Then redeploy** - Vercel will automatically redeploy when you add environment variables.

## ✅ What's Already Configured

- ✅ `vercel.json` - Vercel configuration file
- ✅ `package.json` - Build scripts include Prisma generation
- ✅ `.gitignore` - Properly configured
- ✅ Database connection to Supabase

## 📝 Additional Environment Variables (Optional)

If you use these features, add them too:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

PAYMONGO_SECRET_KEY=sk_test_xxxxx
PAYMONGO_PUBLIC_KEY=pk_test_xxxxx
PAYMONGO_WEBHOOK_SECRET=whsec_xxxxx
```

## 🔄 After Deployment

1. **Update NEXT_PUBLIC_URL** with your actual Vercel URL
2. **Run database migrations** (if needed):
   ```bash
   npx prisma migrate deploy
   ```
3. **Update PayMongo webhook URL** (if using):
   - Go to PayMongo dashboard
   - Update webhook to: `https://your-app.vercel.app/api/subscriptions/webhook`

## 🎉 That's It!

Your app will be live at: `https://your-app-name.vercel.app`

---

**Need more details?** See `DEPLOYMENT.md` for the complete guide.

