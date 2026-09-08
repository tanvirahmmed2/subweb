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
    description: blog?.description?.replace(/<[^>]*>/g, '').slice(0, 155) || '',
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) notFound()

  const { title, description, image } = blog

  return (
    <div className="w-full p-4 md:p-10">
      <Link href="/blogs" className="inline-flex items-center gap-1.5 text-sm text-primary-dark hover:text-primary no-underline mb-10 transition-colors">
        ← Back to Blogs
      </Link>

      <div className="w-full flex flex-col gap-6 items-center justify-center text-center">
        <h1 className="text-xl md:text-4xl font-semibold tracking-tight leading-tight">
          {title}
        </h1>

        {/* Hero image */}
        {image ? (
          <div className="relative w-full max-w-6xl mx-auto overflow-hidden border border-primary/15 shadow-lg shadow-primary/8">
            <Image src={image} alt={title} width={1000} height={1000} className="w-full" priority />
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto aspect-video bg-linear-to-br from-secondary/15 to-primary/10 flex items-center justify-center">
            <span className="text-6xl text-primary/40">✦</span>
          </div>
        )}

        {description && (
          <div
            className="prose  w-full max-w-6xl text-left text-[1.0625rem] text-primary-dark leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Footer CTA */}
        <div className="w-full max-w-6xl pt-8 border-t border-primary/15 flex flex-wrap items-center justify-between gap-4">
          <Link href="/blogs" className="text-sm font-semibold text-primary hover:text-primary-dark no-underline transition-colors">
            ← More articles
          </Link>
          <a
            href="https://dashboard.disibin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-primary hover:bg-primary-light text-tertiary-light text-sm font-bold rounded-lg no-underline transition-colors"
          >
            Get Started
          </a>
        </div>

      </div>
    </div>
  )
}
