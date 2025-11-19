import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'uploads'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseAnonKey && supabase) {
      // Use Supabase Storage (recommended for production)
      try {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Sanitize filename
        const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const filename = `${Date.now()}-${sanitizedFilename}`
        const filePath = `${folder}/${filename}`

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('uploads')
          .upload(filePath, buffer, {
            contentType: file.type,
            upsert: false,
          })

        if (error) {
          console.error('Supabase upload error:', error)
          return NextResponse.json(
            { error: `Failed to upload to Supabase: ${error.message}` },
            { status: 500 }
          )
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('uploads')
          .getPublicUrl(filePath)

        return NextResponse.json({
          url: urlData.publicUrl,
          success: true,
        })
      } catch (supabaseError: any) {
        console.error('Supabase upload error:', supabaseError)
        return NextResponse.json(
          { error: `Failed to upload to Supabase: ${supabaseError.message}` },
          { status: 500 }
        )
      }
    } else {
      // Fallback to local filesystem (for local development only)
      // Check if we're on Vercel (read-only filesystem)
      if (process.env.VERCEL) {
        return NextResponse.json(
          {
            error:
              'File uploads require Supabase Storage. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.',
            code: 'SUPABASE_NOT_CONFIGURED',
          },
          { status: 503 }
        )
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadDir = join(process.cwd(), 'public', folder)

      try {
        if (!existsSync(uploadDir)) {
          await mkdir(uploadDir, { recursive: true })
        }
      } catch (dirError: any) {
        console.error('Error creating directory:', dirError)
        return NextResponse.json(
          { error: `Failed to create upload directory: ${dirError.message}` },
          { status: 500 }
        )
      }

      // Sanitize filename
      const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const filename = `${Date.now()}-${sanitizedFilename}`
      const filepath = join(uploadDir, filename)

      try {
        await writeFile(filepath, buffer)
      } catch (writeError: any) {
        console.error('Error writing file:', writeError)
        return NextResponse.json(
          { error: `Failed to save file: ${writeError.message}` },
          { status: 500 }
        )
      }

      const url = `/${folder}/${filename}`

      return NextResponse.json({ url, success: true })
    }
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      {
        error: error.message || 'Failed to upload file',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

