import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className='w-full min-h-100 flex items-center justify-center p-6 '>
      <div>
        <p className='text-4xl md:text-6xl'>Let&apos;s take you business sky high</p>
        <p>From Dream to</p>
        <p>Online</p>
        <div>
          <Link href={'/themes'}>Themes</Link>
          <Link href={'/packages'}>Packages</Link>
        </div>
      </div>
    </div>
  )
}

export default Hero