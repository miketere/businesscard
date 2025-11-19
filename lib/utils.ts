import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateVCard(card: {
  name: string
  title?: string | null
  company?: string | null
  email: string
  phone?: string | null
  website?: string | null
  address?: string | null
}) {
  let vcard = 'BEGIN:VCARD\nVERSION:3.0\n'
  vcard += `FN:${card.name}\n`
  if (card.title) vcard += `TITLE:${card.title}\n`
  if (card.company) vcard += `ORG:${card.company}\n`
  if (card.email) vcard += `EMAIL:${card.email}\n`
  if (card.phone) vcard += `TEL:${card.phone}\n`
  if (card.website) vcard += `URL:${card.website}\n`
  if (card.address) vcard += `ADR:;;${card.address};;;\n`
  vcard += 'END:VCARD'
  return vcard
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

