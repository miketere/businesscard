'use client'

export default function DownloadButton({ vcard, cardName, cardId }: { vcard: string; cardName: string; cardId: string }) {
  
  const handleDownload = async () => {
    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${cardName.replace(/\s+/g, '_')}.vcf`
    a.click()
    URL.revokeObjectURL(url)

    // Track save
    try {
      await fetch('/api/analytics/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId, method: 'vcard' }),
      })
    } catch (error) {
      console.error('Failed to track save:', error)
    }
  }

  return (
    <button
      onClick={handleDownload}
      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
    >
      Save Contact (vCard)
    </button>
  )
}

