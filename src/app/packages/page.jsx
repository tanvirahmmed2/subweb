import PackageCard from '@/components/cards/Package'

async function getPackages() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res  = await fetch(`${base}/api/package`, { cache: 'no-store' })
    if (!res.ok) return []
    return (await res.json()).packages || []
  } catch { return [] }
}

export default async function PackagesPage() {
  const packages = await getPackages()

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Page header */}
      <div className="text-center mb-14">
        <span className="inline-block px-3.5 py-1 bg-primary/10 text-primary rounded-full text-[0.75rem] font-bold tracking-widest uppercase mb-4">
          Pricing
        </span>
        <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
          Choose your <span className="text-primary">Package</span>
        </h1>
        <p className="text-[1.0625rem] text-primary-dark max-w-lg mx-auto leading-relaxed">
          Every package is built to scale. Pick the one that fits your needs.
        </p>
      </div>

      {packages.length === 0 ? (
        <p className="text-center text-primary-dark text-lg py-16">
          No packages available yet. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
        </div>
      )}
    </div>
  )
}
