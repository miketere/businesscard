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

## Step 3: Set Up Bucket Policies (Optional but Recommended)

For better security, you can set up Row Level Security (RLS) policies:

1. **Go to Storage** → **Policies** → **uploads bucket**
2. **Click "New Policy"**
3. **Create a policy for uploads**:
   - **Policy name**: `Allow authenticated uploads`
   - **Allowed operation**: `INSERT`
   - **Policy definition**: 
     ```sql
     (bucket_id = 'uploads'::text)
     ```
   - **Check expression**: `true` (or add your authentication check)

4. **Create a policy for public reads**:
   - **Policy name**: `Allow public reads`
   - **Allowed operation**: `SELECT`
   - **Policy definition**: 
     ```sql
     (bucket_id = 'uploads'::text)
     ```
   - **Check expression**: `true`

**Note**: For simplicity, you can make the bucket public (which we did in Step 2), and these policies are optional.

## Step 4: Add Environment Variables

### Local Development (.env file)

Add these to your `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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

