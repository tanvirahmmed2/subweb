import Navbar from '@/components/bars/Navbar'
import Footer from '@/components/bars/Footer'

export const metadata = {
  title: 'Blogs — Demart',
  description: 'Read the latest articles and updates from Demart.',
}

export default function BlogsLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </>
  )
}
