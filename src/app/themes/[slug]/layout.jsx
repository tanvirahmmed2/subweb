import Navbar from '@/components/bars/Navbar'
import Footer from '@/components/bars/Footer'

export default function ThemeDetailLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </>
  )
}
