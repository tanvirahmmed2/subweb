import BlogCard from '@/components/cards/Blog'
import axiosInstance from '@/lib/axios'

async function getBlogs() {
  try {
    const { data } = await axiosInstance.get('/api/blog')
    return data.blogs || []
  } catch { return [] }
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="inline-block px-3.5 py-1 bg-secondary/10 text-secondary rounded-full text-[0.75rem] font-bold tracking-widest uppercase mb-4">
          Articles
        </span>
        <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
          From the <span className="text-secondary">Blog</span>
        </h1>
        <p className="text-[1.0625rem] text-primary-dark max-w-lg mx-auto leading-relaxed">
          Tips, updates, and stories from the Demart team.
        </p>
      </div>

      {blogs.length === 0 ? (
        <p className="text-center text-primary-dark text-lg py-16">
          No posts yet. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </div>
      )}
    </div>
  )
}
