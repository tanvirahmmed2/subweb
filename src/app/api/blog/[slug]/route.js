import pool from '@/lib/db'
import { TETNANT_URL } from '@/lib/secret'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  const { slug } = await params
  try {
    const { rows } = await pool.query(
      `SELECT b.id, b.title, b.slug, b.description, b.image, b.created_at,
              s.name AS author
       FROM   blogs b
       JOIN   tenants t ON t.id = b.tenant_id
       LEFT   JOIN staffs s ON s.id = b.created_by
       WHERE  t.url = $1 AND b.slug = $2
       LIMIT  1`,
      [TETNANT_URL, slug]
    )
    if (rows.length === 0) {
      return Response.json({ error: 'Blog not found' }, { status: 404 })
    }
    return Response.json({ blog: rows[0] })
  } catch (err) {
    console.error('[/api/blog/[slug]] GET error:', err)
    return Response.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}
