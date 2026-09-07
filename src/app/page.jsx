import Navbar from '@/components/bars/Navbar'
import Footer from '@/components/bars/Footer'
import Hero from '@/components/pages/Hero'
import PackageCard from '@/components/cards/Package'
import BlogCard from '@/components/cards/Blog'
import Link from 'next/link'
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

function SectionHeader({ badge, badgeColor, title, highlight, highlightColor, viewAllHref, viewAllColor }) {
  return (
    <div className="flex items-end justify-between flex-wrap gap-3 mb-10">
      <div>
        <span className={`inline-block px-3 py-0.5 rounded-full text-[0.75rem] font-bold tracking-widest uppercase mb-3 ${badgeColor}`}>
          {badge}
        </span>
        <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold tracking-tight m-0" style={{ color: 'var(--foreground)' }}>
          {title} <span className={highlightColor}>{highlight}</span>
        </h2>
      </div>
      {viewAllHref && (
        <Link href={viewAllHref} className={`font-semibold text-[0.9375rem] no-underline ${viewAllColor}`}>
          View all →
        </Link>
      )}
    </div>
  )
}

export default async function HomePage() {
  const [packages, blogs] = await Promise.all([getPackages(), getBlogs()])

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Packages preview */}
        {packages.length > 0 && (
          <section className="py-20 px-6" style={{ background: 'var(--background)' }}>
            <div className="max-w-6xl mx-auto">
              <SectionHeader
                badge="Pricing"
                badgeColor="bg-primary/10 text-primary"
                title="Choose your"
                highlight="Package"
                highlightColor="text-primary"
                viewAllHref="/packages"
                viewAllColor="text-secondary hover:text-secondary-dark"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.slice(0, 3).map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
              </div>
            </div>
          </section>
        )}

        {/* Blogs preview */}
        {blogs.length > 0 && (
          <section className="py-20 px-6 bg-primary/3">
            <div className="max-w-6xl mx-auto">
              <SectionHeader
                badge="Latest"
                badgeColor="bg-secondary/10 text-secondary"
                title="From the"
                highlight="Blog"
                highlightColor="text-secondary"
                viewAllHref="/blogs"
                viewAllColor="text-primary hover:text-primary-dark"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.slice(0, 3).map((blog) => <BlogCard key={blog.id} blog={blog} />)}
              </div>
            </div>
          </section>
        )}

        {/* CTA banner */}
        <section className="py-20 px-6 bg-primary">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-extrabold text-white tracking-tight mb-4">
              Ready to get started?
            </h2>
            <p className="text-[1.0625rem] text-white/80 mb-8 leading-relaxed">
              Browse our premium resources and launch your next project today.
            </p>
            <a
              href="https://dashboard.disibin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 bg-secondary hover:bg-secondary-dark text-white font-bold text-base rounded-xl no-underline transition-colors duration-150"
            >
              Go to Dashboard ↗
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}