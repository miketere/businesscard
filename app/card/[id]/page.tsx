import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { CardTemplates } from '@/components/CardTemplates'
import ShareButtons from '@/components/ShareButtons'
import { generateVCard } from '@/lib/utils'
import DownloadButton from './DownloadButton'
import CardViewTracker from '@/components/CardViewTracker'

export default async function CardPage({ 
  params,
  searchParams,
}: { 
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const card = await prisma.card.findUnique({
    where: { id: params.id },
    include: { user: true },
  })

  if (!card) {
    notFound()
  }

  const cardUrl = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/card/${card.id}`
  const TemplateComponent = CardTemplates[card.template as keyof typeof CardTemplates] || CardTemplates.default

  const cardData = {
    name: card.name,
    title: card.title,
    company: card.company,
    email: card.email,
    phone: card.phone,
    website: card.website,
    address: card.address,
    bio: card.bio,
    profileImage: card.profileImage,
    logo: card.logo,
    primaryColor: card.primaryColor,
    secondaryColor: card.secondaryColor,
    socialLinks: card.socialLinks ? JSON.parse(card.socialLinks) : {},
  }

  const vcard = generateVCard(card)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Suspense fallback={null}>
        <CardViewTracker cardId={card.id} />
      </Suspense>
      <div className="max-w-2xl w-full">
        <div className="mb-6">
          <TemplateComponent cardData={cardData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <ShareButtons cardUrl={cardUrl} cardName={card.name} />
          
          <div className="mt-6 pt-6 border-t">
            <DownloadButton vcard={vcard} cardName={card.name} cardId={card.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

