'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface FileUploadProps {
  currentImage?: string | null
  onUpload: (url: string) => void
  folder: string
  buttonText?: string
}

export default function FileUpload({ currentImage, onUpload, folder, buttonText }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        onUpload(data.url)
        toast.success('Image uploaded!')
      } else {
        // Show detailed error message
        const errorMessage = data.error || 'Upload failed'
        const errorCode = data.code || ''
        
        if (errorCode === 'VERCEL_FILESYSTEM_READONLY' || errorCode === 'SUPABASE_NOT_CONFIGURED') {
          toast.error('File uploads require Supabase Storage configuration. Please check your environment variables.', {
            duration: 6000,
          })
        } else {
          toast.error(errorMessage, {
            duration: 5000,
          })
        }
        throw new Error(errorMessage)
      }
    } catch (error: any) {
      // Only show toast if it's not already shown above
      if (!error.message || !error.message.includes('Upload failed')) {
        toast.error(error.message || 'Upload failed. Please try again.', {
          duration: 5000,
        })
      }
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {currentImage && (
        <div className="relative inline-block">
          <img src={currentImage} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
          <button
            type="button"
            onClick={() => onUpload('')}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
        <Upload className="w-5 h-5 text-gray-400" />
        <span className="text-sm text-gray-600">
          {uploading ? 'Uploading...' : buttonText || (currentImage ? 'Change image' : 'Upload image')}
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  )
}

