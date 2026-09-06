import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getBlog(slug) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res  = await fetch(`${base}/api/blog/${slug}`, { cache: 'no-store' })
    if (res.status === 404) return null
    if (!res.ok) return null
    return (await res.json()).blog || null
  } catch { return null }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const blog = await getBlog(slug)
  return {
    title: blog ? `${blog.title} — Demart Blog` : 'Post Not Found',
    description: blog?.description?.slice(0, 155) || '',
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) notFound()

  const { title, description, image, created_at, author } = blog
  const date = created_at
    ? new Date(created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/blogs" className="inline-flex items-center gap-1.5 text-sm text-primary-dark hover:text-primary no-underline mb-8 transition-colors">
        ← Back to Blogs
      </Link>

      {/* Hero image */}
      {image ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-primary/15 mb-8">
          <Image src={image} alt={title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
        </div>
      ) : (
        <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-secondary/15 to-primary/10 flex items-center justify-center mb-8">
          <span className="text-6xl text-primary/40">✦</span>
        </div>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {author && (
          <span className="text-sm font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full">
            {author}
          </span>
        )}
        {date && (
          <span className="text-sm text-primary-dark">{date}</span>
        )}
      </div>

      <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold tracking-tight leading-tight mb-6" style={{ color: 'var(--foreground)' }}>
        {title}
      </h1>

      {description && (
        <div className="prose max-w-none text-[1.0625rem] text-primary-dark leading-relaxed whitespace-pre-wrap">
          {description}
        </div>
      )}

      {/* Footer CTA */}
      <div className="mt-14 pt-8 border-t border-primary/15 flex flex-wrap items-center justify-between gap-4">
        <Link href="/blogs" className="text-sm font-semibold text-primary hover:text-primary-dark no-underline transition-colors">
          ← More articles
        </Link>
        <a
          href="https://dashboard.disibin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-secondary hover:bg-secondary-dark text-white text-sm font-bold rounded-xl no-underline transition-colors"
        >
          Get Started ↗
        </a>
      </div>
    </article>
  )
}
