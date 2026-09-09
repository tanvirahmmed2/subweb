import Link from 'next/link'
import PackageCard from '@/components/cards/Package'
import axiosInstance from '@/lib/axios'

async function getPackages() {
  try {
    const { data } = await axiosInstance.get('/api/package')
    return data.packages || []
  } catch {
    return []
  }
}

export default async function Packages({ packages: initialPackages }) {
  const packages = initialPackages ?? (await getPackages())

  if (!packages || packages.length === 0) {
    return null
  }

  return (
    <section className="py-20 px-6" style={{ background: 'var(--background)' }}>
      <div className="w-full">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-10">
          <div>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-tight m-0" style={{ color: 'var(--foreground)' }}>
              Choose your <span className="text-primary">Package</span>
            </h2>
          </div>
          <Link href="/packages" className="font-semibold text-[0.9375rem] no-underline text-secondary hover:text-secondary-dark">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.slice(0, 3).map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  )
}
