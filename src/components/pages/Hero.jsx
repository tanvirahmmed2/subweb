import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-6 py-20" style={{ background: 'var(--background)' }}>

      {/* Subtle background blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 60% 40%, rgba(0,128,128,0.09) 0%, transparent 70%), radial-gradient(ellipse 45% 45% at 25% 70%, rgba(219,54,0,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* Left — text */}
        <div>
          <span className="inline-block px-3.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase mb-5">
            Digital Marketplace
          </span>

          <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight mb-5" style={{ color: 'var(--foreground)' }}>
            Build something{' '}
            <span className="text-primary">remarkable</span>
            {' '}with Demart
          </h1>

          <p className="text-[1.125rem] leading-relaxed text-primary-dark max-w-[480px] mb-9">
            Premium themes, flexible packages, and expert resources — everything you need to launch faster and look better.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/packages"
              className="px-7 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-base rounded-xl transition-colors duration-150 no-underline"
            >
              View Packages →
            </Link>
            <Link
              href="/themes"
              className="px-7 py-3 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold text-base rounded-xl transition-colors duration-150 no-underline"
            >
              Browse Themes
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12">
            {[
              { value: '100+', label: 'Themes' },
              { value: '50+', label: 'Packages' },
              { value: '24/7', label: 'Support' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[1.8rem] font-extrabold text-primary leading-none m-0">{s.value}</p>
                <p className="text-sm text-primary-dark mt-1 m-0">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center">
          <div className="relative w-[380px] h-[380px]">
            <div className="absolute top-8 left-8 right-0 bottom-0 rounded-2xl bg-primary/8 border border-primary/20" />
            <div className="absolute top-4 left-4 right-0 bottom-0 rounded-2xl bg-secondary/6 border border-secondary/15" />
            {/* Front card */}
            <div className="absolute top-0 left-0 right-8 bottom-8 rounded-2xl bg-tertiary border border-primary/25 flex flex-col items-center justify-center gap-4 p-8">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <span className="text-3xl text-white">◈</span>
              </div>
              <p className="font-extrabold text-xl text-primary-dark m-0 text-center">Premium Quality</p>
              <p className="text-sm text-primary m-0 text-center leading-relaxed">
                Every resource is crafted with care and built for production.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
