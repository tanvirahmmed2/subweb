import Link from 'next/link'

const footerLinks = [
  {
    heading: 'Product',
    links: [
      { label: 'Themes', href: '/themes' },
      { label: 'Packages', href: '/packages' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Blogs', href: '/blogs' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Buy',
    links: [
      { label: 'Dashboard ↗', href: 'https://dashboard.disibin.com/', external: true },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-auto border-t border-primary/20" style={{ background: 'var(--background)' }}>
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="text-[1.3rem] font-extrabold tracking-tight no-underline" style={{ color: 'var(--foreground)' }}>
              De<span className="text-primary">mart</span>
            </Link>
            <p className="mt-3 text-sm text-primary-dark leading-relaxed max-w-[220px]">
              Premium digital resources crafted for modern developers and designers.
            </p>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h4 className="text-[0.72rem] font-bold uppercase tracking-widest text-primary mb-4">
                {group.heading}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-[0.9375rem] no-underline hover:text-primary transition-colors duration-150"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary/15 pt-6 flex flex-wrap justify-between gap-2">
          <p className="text-sm text-primary-dark m-0">
            © {year} Demart. All rights reserved.
          </p>
          <p className="text-sm text-primary-dark m-0">
            Powered by{' '}
            <a
              href="https://disibin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary no-underline hover:underline"
            >
              Disibin
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
