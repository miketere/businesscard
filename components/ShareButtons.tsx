'use client'

import { useState } from 'react'
import { Mail, Copy, Check, QrCode } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import toast from 'react-hot-toast'

interface ShareButtonsProps {
  cardUrl: string
  cardName: string
}

export default function ShareButtons({ cardUrl, cardName }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [emailModal, setEmailModal] = useState(false)
  const [emailAddress, setEmailAddress] = useState('')

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cardUrl)
    setCopied(true)
    toast.success('Link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEmailShare = async () => {
    if (!emailAddress) {
      toast.error('Please enter an email address')
      return
    }

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: emailAddress,
          cardUrl,
          cardName,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Card shared via email!')
        setEmailModal(false)
        setEmailAddress('')
      } else {
        throw new Error(data.error || 'Failed to send email')
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to send email')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base flex-1 sm:flex-initial min-w-[120px] sm:min-w-0"
        >
          {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>

        <button
          onClick={() => setShowQR(!showQR)}
          className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm sm:text-base flex-1 sm:flex-initial min-w-[120px] sm:min-w-0"
        >
          <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
          QR Code
        </button>

        <button
          onClick={() => setEmailModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm sm:text-base flex-1 sm:flex-initial min-w-[120px] sm:min-w-0"
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
          Email
        </button>
      </div>

      {showQR && (
        <div className="p-4 sm:p-6 bg-gray-50 rounded-lg text-center">
          <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto">
            <QRCodeSVG value={cardUrl} size={256} className="w-full h-full" />
          </div>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">Scan to view card</p>
        </div>
      )}

      {emailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Share via Email</h3>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Enter email address"
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={handleEmailShare}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Send
              </button>
              <button
                onClick={() => {
                  setEmailModal(false)
                  setEmailAddress('')
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

