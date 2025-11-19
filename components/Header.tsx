'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { User, ChevronRight, Menu, LogOut } from 'lucide-react'
import { useDevice } from '@/hooks/useDevice'
import { useState } from 'react'
import MobileMenu from './MobileMenu'
import toast from 'react-hot-toast'

interface HeaderProps {
  breadcrumbs?: { label: string; href?: string }[]
  userEmail?: string
  userName?: string
}

export default function Header({ breadcrumbs, userEmail = 'user@example.com', userName = 'User' }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { isDesktop } = useDevice()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Logged out successfully')
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

  const getBreadcrumbs = (): { label: string; href?: string }[] => {
    if (breadcrumbs) return breadcrumbs

    const pathSegments = pathname?.split('/').filter(Boolean) || []
    const crumbs: { label: string; href?: string }[] = [{ label: 'Home', href: '/' }]

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
      crumbs.push({
        label,
        href: index === pathSegments.length - 1 ? undefined : currentPath,
      })
    })

    return crumbs
  }

  const crumbs = getBreadcrumbs()
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <>
      <header className={`fixed top-0 ${isDesktop ? 'left-72 right-0' : 'left-0 right-0'} h-16 glass-effect border-b border-teal-200/30 flex items-center justify-between px-4 sm:px-6 z-30`}>
        {/* Mobile Menu Button */}
        {!isDesktop && (
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-neutral-600 flex-1 ml-4">
          {crumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-teal-600 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-neutral-900 font-semibold">{crumb.label}</span>
              )}
              {index < crumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              )}
            </div>
          ))}
        </nav>

        {/* User Profile with Dropdown */}
        <div className="relative flex items-center gap-3">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-semibold shadow-md">
              {userInitial}
            </div>
            <div className="hidden md:block">
              <div className="text-neutral-900 font-semibold text-sm">{userName}</div>
              <div className="text-neutral-500 text-xs">{userEmail}</div>
            </div>
          </button>
          
          {/* User Menu Dropdown */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-50">
                <Link
                  href="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-3 px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </Link>
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    handleLogout()
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </header>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
