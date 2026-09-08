import Navbar from '@/components/bars/Navbar'
import Footer from '@/components/bars/Footer'
import Hero from '@/components/pages/Hero'
import Packages from '@/components/pages/Packages'
import Blog from '@/components/pages/Blog'
import Services from '@/components/pages/Services'
import Cta from '@/components/pages/Cta'
import axiosInstance from '@/lib/axios'

async function getPackages() {
  try {
    const { data } = await axiosInstance.get('/api/package')
    return data.packages || []
  } catch { return [] }
}

async function getBlogs() {
  try {
    const { data } = await axiosInstance.get('/api/blog')
    return data.blogs || []
  } catch { return [] }
}

export default async function HomePage() {
  const [packages, blogs] = await Promise.all([getPackages(), getBlogs()])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Packages packages={packages} />
        <Blog blogs={blogs} />
        <Services />
        <Cta />
      </main>
      <Footer />
    </>
  )
}