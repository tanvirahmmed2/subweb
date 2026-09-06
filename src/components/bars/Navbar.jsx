'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { id: 1, label: 'Themes',   href: '/themes' },
  { id: 2, label: 'Packages', href: '/packages' },
  { id: 3, label: 'Blogs',    href: '/blogs' },
  { id: 4, label: 'Contact',  href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-primary/20 shadow-sm shadow-primary/10'
          : 'border-b border-transparent'
      }`}
      style={{ background: 'var(--background)' }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">

        {/* Brand */}
        <Link href="/" className="text-[1.4rem] font-extrabold tracking-tight no-underline" style={{ color: 'var(--foreground)' }}>
          De<span className="text-primary">mart</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg text-[0.9375rem] font-medium no-underline transition-colors duration-150 ${
                  active
                    ? 'text-primary bg-primary/10'
                    : 'hover:bg-primary/7'
                }`}
                style={{ color: active ? undefined : 'var(--foreground)' }}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href="https://dashboard.disibin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2 bg-secondary hover:bg-secondary-dark text-white text-sm font-bold rounded-lg transition-colors duration-150 no-underline"
          >
            Buy Now ↗
          </a>
        </nav>

        {/* Hamburger */}
        <button
          id="mobile-menu-btn"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="flex md:hidden flex-col gap-[5px] cursor-pointer bg-transparent border-0 p-1"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-[22px] h-[2px] rounded-sm transition-all duration-200"
              style={{
                background: 'var(--foreground)',
                transform: open
                  ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-primary/20 ${
          open ? 'max-h-96 border-t' : 'max-h-0'
        }`}
        style={{ background: 'var(--background)' }}
      >
        <nav className="flex flex-col px-6 py-3">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`py-3 text-base font-medium no-underline border-b border-primary/10 ${
                  active ? 'text-primary' : ''
                }`}
                style={{ color: active ? undefined : 'var(--foreground)' }}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href="https://dashboard.disibin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 py-2.5 bg-secondary hover:bg-secondary-dark text-white text-sm font-bold rounded-lg text-center no-underline transition-colors"
          >
            Buy Now ↗
          </a>
        </nav>
      </div>
    </header>
  )
}