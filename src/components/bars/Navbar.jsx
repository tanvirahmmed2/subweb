'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { id: 1, label: 'Themes', href: '/themes' },
  { id: 2, label: 'Packages', href: '/packages' },
  { id: 3, label: 'Blogs', href: '/blogs' },
  { id: 4, label: 'Contact', href: '/contact' },
  { id: 5, label: 'Buy', href: 'https://dashboard.disibin.com' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header
    >
      <div className="w-full flex items-center justify-between px-6 h-16">

        <Link href="/" className="text-xl font-semibold text-primary tracking-tight no-underline" >
          Demart
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.id}
                href={link.href}
                className={` px-2 md:px-3.5 py-1.5 text-sm md:text-base no-underline transition-colors duration-150 ${active && 'text-primary '
                  }`}
              >
                {link.label}
              </Link>
            )
          })}

        </nav>

      </div>

    </header>
  )
}