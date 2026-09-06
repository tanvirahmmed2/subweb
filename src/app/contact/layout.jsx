import Navbar from '@/components/bars/Navbar'
import Footer from '@/components/bars/Footer'
import ContactForm from '@/components/forms/Contact'

export const metadata = {
  title: 'Contact — Demart',
  description: 'Get in touch with the Demart team.',
}

export default function ContactLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </>
  )
}
