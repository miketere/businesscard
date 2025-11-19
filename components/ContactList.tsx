'use client'

import { Mail, Phone, Building, Calendar, MapPin } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Contact {
  id: string
  name: string
  email?: string | null
  phone?: string | null
  company?: string | null
  title?: string | null
  notes?: string | null
  location?: string | null
  metAt?: Date | null
  createdAt: Date
  card?: {
    name: string
    company?: string | null
  } | null
}

export default function ContactList({ contacts }: { contacts: Contact[] }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">All Contacts ({contacts.length})</h2>
      
      {contacts.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No contacts yet. Start adding some!</p>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{contact.name}</h3>
                  {contact.title && <p className="text-gray-600">{contact.title}</p>}
                </div>
                {contact.metAt && (
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(contact.metAt)}
                  </span>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-2 mt-3 text-sm">
                {contact.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    {contact.email}
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    {contact.phone}
                  </div>
                )}
                {contact.company && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building className="w-4 h-4" />
                    {contact.company}
                  </div>
                )}
                {contact.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {contact.location}
                  </div>
                )}
              </div>

              {contact.notes && (
                <p className="mt-3 text-sm text-gray-600">{contact.notes}</p>
              )}

              {contact.card && (
                <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                  Met via: {contact.card.name}&apos;s card
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

