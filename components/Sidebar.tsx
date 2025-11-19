'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { CreditCard, Users, Image as ImageIcon, Mail, BarChart3, Settings, HelpCircle, MessageCircle, LayoutTemplate } from 'lucide-react'
import { useDevice } from '@/hooks/useDevice'

export default function Sidebar() {
  const pathname = usePathname()
  const { isDesktop } = useDevice()

  const navItems = [
    { href: '/dashboard', label: 'Cards', icon: CreditCard },
    { href: '/templates', label: 'Templates', icon: LayoutTemplate },
    { href: '/contacts', label: 'Contacts', icon: Users },
    { href: '/backgrounds', label: 'Backgrounds', icon: ImageIcon },
    { href: '/email-signatures', label: 'Email Signatures', icon: Mail },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  ]

  const bottomItems = [
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/support', label: 'Contact Support', icon: MessageCircle },
    { href: '/help', label: 'Help Center', icon: HelpCircle },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/create' || pathname?.startsWith('/edit')
    }
    if (href === '/templates') {
      return pathname === '/templates'
    }
    return pathname === href || pathname?.startsWith(href)
  }

  // Hide sidebar on mobile/tablet
  if (!isDesktop) {
    return null
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-teal-900 via-teal-800 to-teal-900 flex flex-col z-40 shadow-2xl">
      {/* Logo */}
      <div className="p-6 border-b border-teal-700/50">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image 
            src="/logo-icon.svg" 
            alt="NexCard" 
            width={40} 
            height={40}
            className="rounded-xl"
          />
          <span className="text-2xl font-bold text-white">NexCard</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                active
                  ? 'bg-white/20 backdrop-blur-sm text-white shadow-lg'
                  : 'text-teal-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-teal-300' : ''}`} />
              <span className="font-medium">{item.label}</span>
              {active && (
                <div className="ml-auto w-2 h-2 rounded-full bg-orange-400"></div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-teal-700/50 space-y-2">
        {bottomItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                active
                  ? 'bg-white/20 backdrop-blur-sm text-white shadow-lg'
                  : 'text-teal-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-teal-300' : ''}`} />
              <span className="font-medium">{item.label}</span>
              {active && (
                <div className="ml-auto w-2 h-2 rounded-full bg-orange-400"></div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
