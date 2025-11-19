'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { X, CreditCard, Users, Image as ImageIcon, Mail, BarChart3, Settings, HelpCircle, MessageCircle, User, Share2, Download, Crown, Palette, LogOut, ChevronDown, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [settingsExpanded, setSettingsExpanded] = useState(pathname?.startsWith('/settings'))

  const navItems = [
    { href: '/dashboard', label: 'Cards', icon: CreditCard },
    { href: '/contacts', label: 'Contacts', icon: Users },
    { href: '/backgrounds', label: 'Backgrounds', icon: ImageIcon },
    { href: '/email-signatures', label: 'Email Signatures', icon: Mail },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  ]

  const settingsSubItems = [
    { href: '/settings', label: 'Account', icon: User },
    { href: '/settings/contact-exchange', label: 'Contact Exchange', icon: Share2 },
    { href: '/settings/integrations', label: 'Integrations', icon: Settings, isPro: true },
    { href: '/settings/export-contacts', label: 'Export Contacts', icon: Download },
    { href: '/settings/subscription', label: 'Subscription', icon: Crown },
    { href: '/settings/branding', label: 'Branding', icon: Palette },
  ]

  const bottomItems = [
    { href: '/support', label: 'Contact Support', icon: MessageCircle },
    { href: '/help', label: 'Help Center', icon: HelpCircle },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/create' || pathname?.startsWith('/edit')
    }
    if (href === '/settings') {
      return pathname === '/settings' || pathname?.startsWith('/settings')
    }
    return pathname === href || pathname?.startsWith(href)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Logged out successfully')
        onClose()
        router.push('/auth/signin')
        router.refresh()
      } else {
        throw new Error('Failed to logout')
      }
    } catch (error) {
      console.error('Error logging out:', error)
      toast.error('Failed to logout')
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-teal-900 via-teal-800 to-teal-900 flex flex-col z-50 shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="p-6 border-b border-teal-700/50 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3" onClick={onClose}>
            <Image 
              src="/logo-icon.svg" 
              alt="NexCard" 
              width={40} 
              height={40}
              className="rounded-xl"
            />
            <span className="text-2xl font-bold text-white">NexCard</span>
          </Link>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
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

        {/* Settings Section with Sub-menu */}
        <div className="p-4 border-t border-teal-700/50">
          <button
            onClick={() => setSettingsExpanded(!settingsExpanded)}
            className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive('/settings')
                ? 'bg-white/20 backdrop-blur-sm text-white shadow-lg'
                : 'text-teal-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Settings className={`w-5 h-5 ${isActive('/settings') ? 'text-teal-300' : ''}`} />
            <span className="font-medium flex-1 text-left">Settings</span>
            {isActive('/settings') && (
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            )}
            {settingsExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {/* Settings Sub-menu */}
          {settingsExpanded && (
            <div className="mt-2 ml-4 space-y-1 border-l-2 border-teal-700/30 pl-4">
              {settingsSubItems.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      active
                        ? 'bg-white/15 text-white'
                        : 'text-teal-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-teal-300' : ''}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.isPro && (
                      <span className="ml-auto text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-semibold">
                        PRO
                      </span>
                    )}
                    {active && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-teal-700/50 space-y-2">
          {bottomItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
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
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-teal-100 hover:bg-red-500/20 hover:text-red-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

