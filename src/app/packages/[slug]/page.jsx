import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import axiosInstance from '@/lib/axios'

async function getPackage(slug) {
  try {
    const { data } = await axiosInstance.get(`/api/package/${slug}`)
    return data.package || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const pkg = await getPackage(slug)
  const cleanDescription = pkg?.description
    ? pkg.description.replace(/<[^>]*>/g, '').trim().slice(0, 160)
    : ''

  return {
    title: pkg ? `${pkg.name} — Demart Packages` : 'Package Not Found',
    description: cleanDescription || 'Explore flexible pricing packages offered by Demart.',
  }
}

export default async function PackageDetailPage({ params }) {
  const { slug } = await params
  const pkg = await getPackage(slug)
  if (!pkg) notFound()

  const { name, description, price = 0, discount = 0, image, features = [] } = pkg
  const numPrice = Number(price) || 0
  const numDiscount = Number(discount) || 0
  const finalPrice = numDiscount > 0 ? numPrice - numDiscount : numPrice
  const includedFeatures = features.filter((f) => f.included)

  return (
    <div className="w-full p-4 md:p-10 max-w-7xl mx-auto">
      <Link
        href="/packages"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-dark hover:text-primary no-underline mb-8 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span>Back to Packages</span>
      </Link>

      <div className="w-full flex flex-col gap-8 items-center justify-center text-center">
        <h1
          className="text-xl md:text-3xl font-semibold tracking-tight leading-tight"
          style={{ color: 'var(--foreground)' }}
        >
          {name}
        </h1>

        <div className="w-full max-w-7xl mx-auto">
          {image ? (
            <div className="relative w-full  overflow-hidden  h-full bg-tertiary">
              <Image
                src={image}
                alt={name}
                width={1000}
                height={1000}
                className="object-cover w-full"
              />
            </div>
          ) : (
            <div className="w-full aspect-video rounded-2xl bg-linear-to-br from-primary via-primary-dark to-[#003838] flex flex-col items-center justify-center text-center shadow-xl shadow-primary/8">
              <span className="text-7xl text-white/80 mb-2">⬡</span>
              <span className="text-xl font-semibold text-white/95">{name}</span>
            </div>
          )}
        </div>

        <div className="flex flex-row justify-between items-center gap-1.5">
          <div className="flex flex-row items-center justify-center gap-3">
            <span className="text-3xl font-semibold text-primary tracking-tight">
              {finalPrice <= 0 ? 'Free' : `$${finalPrice}`}
            </span>
            {numDiscount > 0 && numPrice > 0 && (
              <>
                <span className="text-xl line-through text-primary-dark/60 font-semibold">${numPrice}</span>
                <span className="text-xs font-semibold text-white bg-secondary px-2.5 py-1 rounded-full shadow-xs">
                  Save ${numDiscount}
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-primary-dark/80">
            {finalPrice <= 0 ? 'Free access' : 'One-time payment • Instant access'}
          </p>
        </div>

     
        {description && (
          <div
            className="prose w-full text-left text-base md:text-[1.0625rem] leading-relaxed [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_p]:mb-3.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3.5 [&_a]:text-primary [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {features.length > 0 && (
          <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl border border-primary/15 bg-tertiary text-left shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                What&apos;s included
              </h2>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                {includedFeatures.length} of {features.length} features
              </span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
              {features.map((f) => (
                <li
                  key={f.name}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                    f.included
                      ? 'border-primary/15 bg-primary/5 text-primary'
                      : 'border-primary/10 bg-transparent opacity-45'
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold shrink-0 mt-0.5 ${
                      f.included ? 'bg-primary text-white shadow-xs' : 'bg-primary/20 text-primary-dark'
                    }`}
                  >
                    {f.included ? '✓' : '✕'}
                  </span>
                  <span
                    className={`text-sm leading-snug font-medium ${f.included ? '' : 'line-through'}`}
                    style={{ color: 'var(--foreground)' }}
                  >
                    {f.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="w-full pt-8 border-t border-primary/15 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors no-underline"
          >
            ← More packages
          </Link>
          <a
            href="https://dash.disibin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl no-underline transition-colors shadow-sm"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  )
}
