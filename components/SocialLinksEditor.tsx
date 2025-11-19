'use client'

import { Linkedin, Twitter, Github, Instagram, Facebook } from 'lucide-react'

interface SocialLinks {
  linkedin?: string
  twitter?: string
  github?: string
  instagram?: string
  facebook?: string
}

const socialPlatforms = [
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/yourname' },
  { key: 'twitter', label: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/yourname' },
  { key: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/yourname' },
  { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/yourname' },
  { key: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/yourname' },
]

export default function SocialLinksEditor({ links, onChange }: { links: SocialLinks; onChange: (links: SocialLinks) => void }) {
  const updateLink = (key: keyof SocialLinks, value: string) => {
    onChange({ ...links, [key]: value || undefined })
  }

  return (
    <div className="space-y-3">
      {socialPlatforms.map((platform) => {
        const Icon = platform.icon
        return (
          <div key={platform.key} className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={links[platform.key as keyof SocialLinks] || ''}
              onChange={(e) => updateLink(platform.key as keyof SocialLinks, e.target.value)}
              placeholder={platform.placeholder}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        )
      })}
    </div>
  )
}

