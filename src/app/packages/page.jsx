import PackageCard from '@/components/cards/Package'
import axiosInstance from '@/lib/axios'

async function getPackages() {
  try {
    const { data } = await axiosInstance.get('/api/package')
    return data.packages || []
  } catch { return [] }
}

export default async function PackagesPage() {
  const packages = await getPackages()

  return (
    <div className="w-full p-4 md:p-10">
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
        </div>
      )}
    </div>
  )
}
