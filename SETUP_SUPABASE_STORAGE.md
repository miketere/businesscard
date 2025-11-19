# Supabase Storage Setup Guide

This guide will help you set up Supabase Storage for file uploads in your application.

## Why Supabase Storage?

- ✅ Works on Vercel (read-only filesystem)
- ✅ Scalable and reliable cloud storage
- ✅ Free tier available (1GB storage, 2GB bandwidth/month)
- ✅ Built-in CDN for fast image delivery
- ✅ Easy to integrate with your existing Supabase project

## Step 1: Get Your Supabase Credentials

1. **Go to your Supabase project**: https://app.supabase.com
2. **Navigate to Settings** → **API**
3. **Copy the following values**:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 2: Create Storage Bucket

1. **Go to Storage** in your Supabase dashboard
2. **Click "New bucket"**
3. **Configure the bucket**:
   - **Name**: `uploads` (must match this exactly)
   - **Public bucket**: ✅ **Enable** (so images can be accessed via URL)
   - **File size limit**: 5 MB (or your preferred limit)
   - **Allowed MIME types**: `image/*` (or leave empty for all types)

4. **Click "Create bucket"**

## Step 3: Set Up Bucket Policies (REQUIRED for uploads to work)

**Important**: Even if the bucket is marked as "Public", you still need RLS policies to allow uploads. Follow these steps:

1. **Go to Storage** in your Supabase dashboard
2. **Click on the `uploads` bucket** to open it
3. **Click the "Policies" tab** (or go to Storage → Policies → uploads bucket)
4. **Click "New Policy"**

### Create Policy 1: Allow Public Uploads (INSERT)

1. **Select "Create a policy from scratch"** (or use template)
2. **Policy name**: `Allow public uploads`
3. **Allowed operation**: Select `INSERT` (for uploading files)
4. **Policy definition**: Leave as default or use:
   ```sql
   (bucket_id = 'uploads'::text)
   ```
5. **Check expression**: Enter `true` (allows anyone to upload)
6. **Click "Review"** then **"Save policy"**

### Create Policy 2: Allow Public Reads (SELECT)

1. **Click "New Policy"** again
2. **Policy name**: `Allow public reads`
3. **Allowed operation**: Select `SELECT` (for reading/viewing files)
4. **Policy definition**: Leave as default or use:
   ```sql
   (bucket_id = 'uploads'::text)
   ```
5. **Check expression**: Enter `true` (allows anyone to read)
6. **Click "Review"** then **"Save policy"**

**Note**: These policies allow anyone (including unauthenticated users) to upload and read files. For production, you may want to add authentication checks later.

## Step 4: Add Environment Variables

### Local Development (.env file)

Add these to your `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoamFqbWRuemJ3bWx4dGhwYW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MDA5NzUsImV4cCI6MjA3OTA3Njk3NX0.MlEMP9oA0oKgSxKQ-i_RO13p2V5LQanMT6JjZcNRszs
```

### Vercel Deployment

1. **Go to your Vercel project** → **Settings** → **Environment Variables**
2. **Add the following variables**:

   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
     - **Value**: `https://xxxxx.supabase.co` (your Supabase project URL)
     - **Environment**: Production, Preview, Development

   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your anon key)
     - **Environment**: Production, Preview, Development

3. **Redeploy** your application

## Step 5: Test File Upload

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Try uploading an image** in your application (profile photo or logo)

3. **Check Supabase Storage**:
   - Go to **Storage** → **uploads** bucket
   - You should see your uploaded files in folders: `profiles/`, `logos/`, etc.

## How It Works

- **Local Development**: If Supabase credentials are not configured, files are saved to `public/` directory (local filesystem)
- **Production (Vercel)**: Files are automatically uploaded to Supabase Storage
- **File Structure**: Files are organized in folders:
  - `profiles/` - Profile photos
  - `logos/` - Company logos
  - `uploads/` - Other uploads

## Troubleshooting

### Error: "Failed to upload to Supabase"

1. **Check your environment variables**:
   - Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly
   - Restart your dev server after adding environment variables

2. **Check bucket name**:
   - The bucket must be named exactly `uploads` (case-sensitive)
   - Make sure the bucket exists in your Supabase project

3. **Check bucket permissions**:
   - Make sure the bucket is set to **Public**
   - Or configure RLS policies if using private buckets

4. **Check file size**:
   - Default limit is 5MB
   - Increase the limit in bucket settings if needed

### Error: "new row violates row-level security policy"

**This is the most common error!** It means RLS policies are blocking your uploads.

**Solution**: You need to create RLS policies for the `uploads` bucket:

1. **Go to Supabase Dashboard** → **Storage** → Click on `uploads` bucket
2. **Click "Policies" tab**
3. **Create two policies**:

   **Policy 1 - Allow Uploads:**
   - Click "New Policy"
   - Name: `Allow public uploads`
   - Operation: `INSERT`
   - Check expression: `true`
   - Save

   **Policy 2 - Allow Reads:**
   - Click "New Policy" again
   - Name: `Allow public reads`
   - Operation: `SELECT`
   - Check expression: `true`
   - Save

4. **Try uploading again** - it should work now!

### Error: "Storage bucket not found"

- Make sure you created the bucket with the exact name `uploads`
- Check that you're using the correct Supabase project

### Files not showing in Supabase Storage

- Check the browser console for errors
- Verify the upload API is being called correctly
- Check Supabase Storage logs in the dashboard

## Storage Limits (Free Tier)

- **Storage**: 1 GB
- **Bandwidth**: 2 GB/month
- **File size limit**: 50 MB per file

For production, consider upgrading to a paid plan if you need more storage/bandwidth.

## Next Steps

- ✅ File uploads now work on Vercel!
- ✅ Images are stored in Supabase Storage
- ✅ Images are served via CDN for fast loading

You can now deploy to Vercel and file uploads will work perfectly!

