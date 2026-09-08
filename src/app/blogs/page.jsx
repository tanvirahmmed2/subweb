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
    <div className="w-full p-4 md:p-10">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </div>
      )}
    </div>
  )
}
