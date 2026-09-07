import Navbar from '@/components/bars/Navbar'
import Footer from '@/components/bars/Footer'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from '@/lib/axios'

export const metadata = {
  title: 'Themes — Demart',
  description: 'Browse our collection of premium themes.',
}

async function getThemes() {
  try {
    const { data } = await axiosInstance.get('/api/themes')
    return data.themes || []
  } catch { return [] }
}

function ThemeCard({ theme }) {
  const { title, slug, image, description, link } = theme
  const href = link || '#'

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden border border-primary/15 bg-tertiary hover:shadow-xl hover:shadow-primary/12 hover:-translate-y-1 transition-all duration-200">
      {image ? (
        <div className="relative w-full aspect-video overflow-hidden bg-primary/5">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
          />
        </div>
      ) : (
        <div className="w-full aspect-video bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
          <span className="text-4xl text-white/70">⬢</span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-1.5" style={{ color: 'var(--foreground)' }}>{title}</h3>
        {description && (
          <p className="text-sm text-primary-dark leading-relaxed line-clamp-2 flex-1 mb-4">{description}</p>
        )}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark no-underline transition-colors mt-auto"
        >
          Preview →
        </a>
      </div>
    </div>
  )
}

export default async function ThemesPage() {
  const themes = await getThemes()

  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block px-3.5 py-1 bg-primary/10 text-primary rounded-full text-[0.75rem] font-bold tracking-widest uppercase mb-4">
              Gallery
            </span>
            <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
              Premium <span className="text-primary">Themes</span>
            </h1>
            <p className="text-[1.0625rem] text-primary-dark max-w-lg mx-auto leading-relaxed">
              Handcrafted themes for every kind of project — fast, modern, and production-ready.
            </p>
          </div>

          {themes.length === 0 ? (
            <p className="text-center text-primary-dark text-lg py-16">
              No themes available yet. Check back soon!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {themes.map((theme) => <ThemeCard key={theme.id} theme={theme} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
