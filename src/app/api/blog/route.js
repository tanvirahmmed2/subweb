import pool from '@/lib/db'
import { TETNANT_URL } from '@/lib/secret'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT b.id, b.title, b.slug, b.description, b.image, b.created_at,
              s.name AS author
       FROM   blogs b
       JOIN   tenants t ON t.id = b.tenant_id
       LEFT   JOIN staffs s ON s.id = b.created_by
       WHERE  t.url = $1
       ORDER  BY b.created_at DESC`,
      [TETNANT_URL]
    )
    return Response.json({ blogs: rows })
  } catch (err) {
    console.error('[/api/blog] GET error:', err)
    return Response.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}
