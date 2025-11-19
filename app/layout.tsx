import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import ConditionalLayout from '@/components/ConditionalLayout'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NexCard - Digital Business Card Platform',
  description: 'Create and share stunning digital business cards with NexCard. Share instantly, track engagement, and grow your network effortlessly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  )
}

