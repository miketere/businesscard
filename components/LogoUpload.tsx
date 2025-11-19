'use client'

import { Image } from 'lucide-react'
import FileUpload from './FileUpload'

interface LogoUploadProps {
  currentLogo?: string | null
  onUpload: (url: string) => void
}

export default function LogoUpload({ currentLogo, onUpload }: LogoUploadProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Logo</h3>
      
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-16 bg-gray-100 border-2 border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
          {currentLogo ? (
            <img src={currentLogo} alt="Logo" className="max-w-full max-h-full object-contain" />
          ) : (
            <Image className="w-8 h-8 text-gray-400" />
          )}
        </div>
        
        <FileUpload
          currentImage={currentLogo || undefined}
          onUpload={onUpload}
          folder="logos"
          buttonText="Add Logo"
        />
      </div>
    </div>
  )
}

