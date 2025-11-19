'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import { useDevice } from '@/hooks/useDevice'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isDesktop } = useDevice()
  
  // Don't show sidebar on homepage or public card pages
  const showSidebar = pathname !== '/' && !pathname?.startsWith('/card/')

  if (!showSidebar) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className={`flex-1 ${isDesktop ? 'ml-72' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  )
}
