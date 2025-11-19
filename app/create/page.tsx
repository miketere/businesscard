import CardEditorNew from '@/components/CardEditorNew'
import Header from '@/components/Header'

export default function CreateCardPage() {
  return (
    <>
      <Header breadcrumbs={[{ label: 'Cards', href: '/dashboard' }, { label: 'New Card' }]} />
      <CardEditorNew />
    </>
  )
}

