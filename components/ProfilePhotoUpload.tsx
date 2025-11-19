'use client'

import { useState } from 'react'
import { User, Upload } from 'lucide-react'
import FileUpload from './FileUpload'

interface ProfilePhotoUploadProps {
  currentImage?: string | null
  onUpload: (url: string) => void
}

export default function ProfilePhotoUpload({ currentImage, onUpload }: ProfilePhotoUploadProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Profile Photo</h3>
        <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
          PRO
        </span>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden">
          {currentImage ? (
            <img src={currentImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-12 h-12 text-gray-400" />
          )}
        </div>
        
        <FileUpload
          currentImage={currentImage || undefined}
          onUpload={onUpload}
          folder="profiles"
          buttonText="Add Photo or Video"
        />
      </div>
    </div>
  )
}

