import Navbar from '@/components/bars/Navbar'
import Footer from '@/components/bars/Footer'

export const metadata = {
  title: 'Packages — Demart',
  description: 'Explore flexible pricing packages offered by Demart.',
}

export default function PackagesLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>{children}</main>
      <Footer />
    </>
  )
}
