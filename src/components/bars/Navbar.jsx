'use client'

import { TENANT_NAME } from '@/lib/secret'
import Link from 'next/link'

export default function Navbar() {

  return (
    <header
    >
      <div className="w-full flex items-center justify-between px-6 h-16 shadow-sm">

        <Link href="/" className="text-xl font-bold text-primary tracking-tight no-underline" >
          {TENANT_NAME}
        </Link>

        <nav className="flex items-center gap-1">
          
          <Link href={'/themes'} className={` px-2 md:px-3.5 py-1.5 text-sm md:text-base no-underline transition-colors duration-150 hover:text-primary`}>Themes</Link>
          <Link href={'/packages'} className={` px-2 md:px-3.5 py-1.5 text-sm md:text-base no-underline transition-colors duration-150 hover:text-primary`}>Packages</Link>
          <Link href={'/blogs'} className={` px-2 md:px-3.5 py-1.5 text-sm md:text-base no-underline transition-colors duration-150 hover:text-primary`}>Blogs</Link>
          <Link href={'/contact'} className={`hidden md:block px-2 md:px-3.5 py-1.5 text-sm md:text-base no-underline transition-colors duration-150 hover:text-primary`}>Contact</Link>

          <Link
            href={'https://dash.disibin.com'}
            className={` px-2 md:px-3.5 py-1 rounded-full text-sm md:text-base no-underline transition-colors duration-150 text-tertiary-light bg-primary`}
          >
            Dashboard
          </Link>
        </nav>

      </div>

    </header>
  )
}