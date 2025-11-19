import { prisma } from '@/lib/prisma'

// Force dynamic rendering to avoid build-time database access
export const dynamic = 'force-dynamic'
import { notFound } from 'next/navigation'
import CardEditorNew from '@/components/CardEditorNew'
import Header from '@/components/Header'

export default async function EditCardPage({ params }: { params: { id: string } }) {
  const card = await prisma.card.findUnique({
    where: { id: params.id },
  })

  if (!card) {
    notFound()
  }

  const initialData = {
    name: card.name,
    title: card.title || '',
    company: card.company || '',
    email: card.email,
    phone: card.phone || '',
    website: card.website || '',
    address: card.address || '',
    bio: card.bio || '',
    primaryColor: card.primaryColor,
    secondaryColor: card.secondaryColor,
    template: card.template,
    profileImage: card.profileImage || '',
    logo: card.logo || '',
    socialLinks: card.socialLinks ? JSON.parse(card.socialLinks) : {},
  }

  return (
    <>
      <Header breadcrumbs={[{ label: 'Cards', href: '/dashboard' }, { label: 'Edit Card' }]} />
      <CardEditorNew cardId={params.id} initialData={initialData} />
    </>
  )
}

