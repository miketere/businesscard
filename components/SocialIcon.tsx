'use client'

import { Linkedin, Twitter, Github, Instagram, Facebook } from 'lucide-react'

interface SocialIconProps {
  platform: string
  size?: number
  className?: string
}

export default function SocialIcon({ platform, size = 20, className = '' }: SocialIconProps) {
  if (!platform) {
    return null
  }
  
  const platformLower = platform.toLowerCase().trim()
  
  // Default to white color for icons with explicit display
  const iconClassName = className || 'text-white'

  // Common props for all icons
  const commonProps = {
    size,
    strokeWidth: 2.5,
    className: iconClassName,
    style: { display: 'block' }, // Ensure icon is visible
  }

  switch (platformLower) {
    case 'linkedin':
      return <Linkedin {...commonProps} />
    case 'twitter':
      return <Twitter {...commonProps} />
    case 'github':
      return <Github {...commonProps} />
    case 'instagram':
      return <Instagram {...commonProps} />
    case 'facebook':
      return <Facebook {...commonProps} />
    default:
      // Fallback: show first letter if platform not recognized
      // This helps debug what platform name is being passed
      console.warn(`Unknown social platform: "${platform}" (normalized: "${platformLower}")`)
      return <span className="text-xs font-bold text-white">{platform.charAt(0).toUpperCase()}</span>
  }
}

