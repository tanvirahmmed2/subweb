import Link from 'next/link'
import Image from 'next/image'

export default function BlogCard({ blog }) {
  const { title, slug, description, image, created_at, author } = blog
  const date = created_at
    ? new Date(created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : null

  return (
    <Link
      href={`/blogs/${slug}`}
      className="group flex flex-col h-full rounded-sm overflow-hidden border border-primary/15 bg-tertiary hover:shadow-xl hover:shadow-primary/12 hover:-translate-y-1 transition-all duration-200 no-underline"
    >
      {/* Thumbnail */}
      {image ? (
        <div className="relative w-full aspect-video overflow-hidden bg-primary/5">
          <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 400px" />
        </div>
      ) : (
        <div className="w-full aspect-video bg-gradient-to-br from-primary/10 to-secondary/8 flex items-center justify-center">
          <span className="text-4xl text-primary">✦</span>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {author && (
            <span className="text-[0.75rem] font-semibold text-primary bg-primary/8 px-2.5 py-0.5 rounded-full">
              {author}
            </span>
          )}
          {date && (
            <span className="text-[0.75rem] text-primary-dark">{date}</span>
          )}
        </div>

        <h3 className="text-lg font-bold mb-1.5 line-clamp-2" style={{ color: 'var(--foreground)' }}>
          {title}
        </h3>

        {description && (
          <p className="text-sm text-primary-dark leading-relaxed line-clamp-2 flex-1 mb-4">
            {description}
          </p>
        )}

        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary group-hover:text-secondary-dark transition-colors mt-auto">
          Read more →
        </span>
      </div>
    </Link>
  )
}
