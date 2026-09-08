import Link from 'next/link'
import BlogCard from '@/components/cards/Blog'
import axiosInstance from '@/lib/axios'

async function getBlogs() {
  try {
    const { data } = await axiosInstance.get('/api/blog')
    return data.blogs || []
  } catch {
    return []
  }
}

export default async function Blog({ blogs: initialBlogs }) {
  const blogs = initialBlogs ?? (await getBlogs())

  if (!blogs || blogs.length === 0) {
    return null
  }

  return (
    <section className="py-20 px-6 bg-primary/3">
      <div className="w-full">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-10">
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full text-[0.75rem] font-bold tracking-widest uppercase mb-3 bg-secondary/10 text-secondary">
              Latest
            </span>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold tracking-tight m-0" style={{ color: 'var(--foreground)' }}>
              From the <span className="text-secondary">Blog</span>
            </h2>
          </div>
          <Link href="/blogs" className="font-semibold text-[0.9375rem] no-underline text-primary hover:text-primary-dark">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  )
}
