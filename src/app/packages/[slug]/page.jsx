import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import axiosInstance from '@/lib/axios'

async function getPackage(slug) {
  try {
    const { data } = await axiosInstance.get(`/api/package/${slug}`)
    return data.package || null
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
    <div className="w-full p-4 md:p-10">
      <Link href="/packages" className="inline-flex items-center gap-1.5 text-sm text-primary-dark hover:text-primary no-underline mb-10 transition-colors">
        ← Back to Packages
      </Link>

      <div className="w-full flex flex-col gap-6 items-center justify-center text-center">

        <h1 className="text-xl md:text-4xl font-semibold tracking-tight leading-tight">
          {name}
        </h1>

        {/* Image */}
        <div className="w-full max-w-4xl mx-auto">
          {image ? (
            <div className="relative w-full overflow-hidden border border-primary/15 shadow-lg shadow-primary/8">
              <Image src={image} alt={name} width={1000} height={1000} className="w-full" />
            </div>
          ) : (
            <div className="w-full aspect-video bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <span className="text-7xl text-white/70">⬡</span>
            </div>
          )}
        </div>

        {/* CTA buttons */}
        <div className="flex w-full flex-row items-center justify-center gap-2 max-w-4xl mx-auto">
          <a
            href="https://dashboard.disibin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-1 bg-primary text-tertiary-light hover:bg-primary-light cursor-pointer rounded-lg"
          >
            Get this Package ↗
          </a>
        </div>

        {description && (
          <p className="text-[1.0625rem] text-primary-dark leading-relaxed max-w-4xl">
            {description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline justify-center gap-3">
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
          <div className="w-full max-w-4xl mx-auto p-5 border border-primary/15 bg-tertiary text-left">
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

      </div>
    </div>
  )
}
