import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import axiosInstance from '@/lib/axios'

async function getBlog(slug) {
  try {
    const { data } = await axiosInstance.get(`/api/blog/${slug}`)
    return data.blog || null
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
    <div className="w-full p-4 md:p-10">
      <Link href="/blogs" className="inline-flex items-center gap-1.5 text-sm text-primary-dark hover:text-primary no-underline mb-10 transition-colors">
        ← Back to Blogs
      </Link>

      <div className="w-full flex flex-col gap-6 items-center justify-center text-center">

        {/* Meta */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {author && (
            <span className="text-sm font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full">
              {author}
            </span>
          )}
          {date && (
            <span className="text-sm text-primary-dark">{date}</span>
          )}
        </div>

        <h1 className="text-xl md:text-4xl font-semibold tracking-tight leading-tight">
          {title}
        </h1>

        {/* Hero image */}
        {image ? (
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden border border-primary/15 shadow-lg shadow-primary/8">
            <Image src={image} alt={title} width={1000} height={1000} className="w-full" priority />
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto aspect-video bg-gradient-to-br from-secondary/15 to-primary/10 flex items-center justify-center">
            <span className="text-6xl text-primary/40">✦</span>
          </div>
        )}

        {description && (
          <div className="prose max-w-none w-full max-w-4xl text-left text-[1.0625rem] text-primary-dark leading-relaxed whitespace-pre-wrap">
            {description}
          </div>
        )}

        {/* Footer CTA */}
        <div className="w-full max-w-4xl pt-8 border-t border-primary/15 flex flex-wrap items-center justify-between gap-4">
          <Link href="/blogs" className="text-sm font-semibold text-primary hover:text-primary-dark no-underline transition-colors">
            ← More articles
          </Link>
          <a
            href="https://dashboard.disibin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-primary hover:bg-primary-light text-tertiary-light text-sm font-bold rounded-lg no-underline transition-colors"
          >
            Get Started ↗
          </a>
        </div>

      </div>
    </div>
  )
}
