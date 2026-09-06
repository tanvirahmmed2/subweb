import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getPackage(slug) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res  = await fetch(`${base}/api/package/${slug}`, { cache: 'no-store' })
    if (res.status === 404) return null
    if (!res.ok) return null
    return (await res.json()).package || null
  } catch { return null }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const pkg = await getPackage(slug)
  return {
    title: pkg ? `${pkg.name} — Demart` : 'Package Not Found',
    description: pkg?.description || '',
  }
}

export default async function PackageDetailPage({ params }) {
  const { slug } = await params
  const pkg = await getPackage(slug)
  if (!pkg) notFound()

  const { name, description, price, discount, image, features = [] } = pkg
  const finalPrice = discount > 0 ? price - Math.round((price * discount) / 100) : price

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link href="/packages" className="inline-flex items-center gap-1.5 text-sm text-primary-dark hover:text-primary no-underline mb-8 transition-colors">
        ← Back to Packages
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Image */}
        <div>
          {image ? (
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-primary/15">
              <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          ) : (
            <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <span className="text-7xl text-white/70">⬡</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold tracking-tight mb-3" style={{ color: 'var(--foreground)' }}>
            {name}
          </h1>

          {description && (
            <p className="text-[1.0625rem] text-primary-dark leading-relaxed mb-6">{description}</p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-7">
            <span className="text-4xl font-extrabold text-primary">
              {price === 0 ? 'Free' : `$${finalPrice}`}
            </span>
            {discount > 0 && price > 0 && (
              <>
                <span className="text-lg line-through text-primary-dark/60">${price}</span>
                <span className="text-sm font-bold text-white bg-secondary px-2.5 py-0.5 rounded-full">-{discount}%</span>
              </>
            )}
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="mb-8 p-5 rounded-2xl border border-primary/15 bg-tertiary">
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">What&apos;s included</h2>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {features.map((f) => (
                  <li key={f.name} className={`flex items-center gap-2.5 text-sm ${f.included ? '' : 'opacity-40'}`} style={{ color: 'var(--foreground)' }}>
                    <span className={`text-base flex-shrink-0 ${f.included ? 'text-primary' : 'text-primary-dark'}`}>
                      {f.included ? '✓' : '✗'}
                    </span>
                    {f.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href="https://dashboard.disibin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-3.5 bg-primary hover:bg-primary-dark text-white font-bold text-base rounded-xl no-underline transition-colors duration-150"
          >
            Get this Package ↗
          </a>
        </div>
      </div>
    </div>
  )
}
