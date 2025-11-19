# Deployment Steps - Follow These Commands

## ✅ Git Repository Initialized!

Your code is now ready to be pushed to GitHub and deployed to Vercel.

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it (e.g., `business-card-app`)
4. **Don't** initialize with README, .gitignore, or license
5. Click **"Create repository"**

## Step 2: Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Use these (replace YOUR_USERNAME and REPO_NAME):

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

Or if you prefer SSH:
```bash
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in (use GitHub to sign in)
2. Click **"Add New Project"**
3. Find and select your repository
4. Vercel will auto-detect Next.js
5. **Add Environment Variables** before deploying:
   - Click **"Environment Variables"**
   - Add: `DATABASE_URL` = `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres?schema=public`
   - Add: `NEXT_PUBLIC_URL` = `https://your-app-name.vercel.app` (update after first deploy)
6. Click **"Deploy"**

## Step 4: After First Deployment

1. Copy your Vercel URL (e.g., `https://your-app-name.vercel.app`)
2. Go to Vercel → Settings → Environment Variables
3. Update `NEXT_PUBLIC_URL` with your actual URL
4. Redeploy

## Troubleshooting Build Error

If you see the Prisma file lock error during build:
- Close any running dev servers
- Close Prisma Studio if open
- Try building again: `npm run build`

The build should work fine on Vercel's servers.

## Your Supabase Connection String

```
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres?schema=public
```

Copy this exactly into Vercel's environment variables.

---

**Ready to deploy?** Follow steps 1-3 above!

