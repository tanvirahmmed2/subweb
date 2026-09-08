import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import axiosInstance from '@/lib/axios'

async function getTheme(slug) {
  try {
    const { data } = await axiosInstance.get(`/api/themes/${slug}`)
    return data.theme || null
  } catch { return null }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const theme = await getTheme(slug)
  return {
    title: theme ? `${theme.title} — Demart Themes` : 'Theme Not Found',
    description: theme?.description?.slice(0, 155) || '',
  }
}

export default async function ThemeDetailPage({ params }) {
  const { slug } = await params
  const theme = await getTheme(slug)
  if (!theme) notFound()

  const { title, description, images = [], link, created_at } = theme
  const date = created_at
    ? new Date(created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : null

  const cover = images[0]?.image || null

  return (
    <div className="w-full p-4 md:p-10">
      <Link
        href="/themes"
        className="inline-flex items-center gap-1.5 text-sm text-primary-dark hover:text-primary no-underline mb-10 transition-colors"
      >
        ← Back to Themes
      </Link>

      <div className="w-full flex flex-col gap-6 items-center justify-center text-center  max-w-6xl mx-auto">

        <h1 className="text-xl md:text-4xl font-semibold tracking-tight leading-tight">
          {title}
        </h1>

        <div className="w-full">
          {cover ? (
            <div className="relative w-full overflow-hidden border border-primary/15 shadow-lg shadow-primary/8 ">
              <Image
                src={cover}
                alt={title}
                width={1000}
                height={1000}
              />
            </div>
          ) : (
            <div className="w-full aspect-video rounded-2xl bg-linear-to-br from-primary to-primary-dark flex items-center justify-center">
              <span className="text-7xl text-white/70">⬢</span>
            </div>
          )}
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-2">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-1 bg-primary text-tertiary-light hover:bg-primary-light cursor-pointer rounded-lg"
            >
              Live Preview
            </a>
          )}
          <a
            href="https://dashboard.disibin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-1 bg-primary text-tertiary-light hover:bg-primary-light cursor-pointer rounded-lg"
          >
            Get Started
          </a>
        </div>

        {description && (
          <div
            className="prose max-w-none text-[1.0625rem] text-primary-dark leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {images.length > 1 && (
          <div className="flex flex-col gap-6 w-full">
            {images.map((img) => (
              <div key={img.id} className='w-full'>
                <Image src={img.image} alt={img.description} width={1000} height={1000} className='w-full' />
                {img.description && (
                  <p className="mt-2 text-sm text-primary-dark">{img.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
