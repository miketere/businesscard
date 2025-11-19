import { prisma } from '@/lib/prisma'
import ContactForm from '@/components/ContactForm'
import ContactList from '@/components/ContactList'
import Header from '@/components/Header'

const TEMP_USER_ID = 'temp-user-id'

// Force dynamic rendering to avoid build-time database access
export const dynamic = 'force-dynamic'

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    where: { userId: TEMP_USER_ID },
    orderBy: { createdAt: 'desc' },
    include: {
      card: {
        select: {
          name: true,
          company: true,
        },
      },
    },
  })

  return (
    <>
      <Header breadcrumbs={[{ label: 'Contacts' }]} />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">My Contacts</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactList contacts={contacts} />
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

