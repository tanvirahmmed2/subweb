import pool from '@/lib/db'
import { TETNANT_URL } from '@/lib/secret'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT th.id, th.title, th.slug, th.image, th.link, th.description
       FROM   themes th
       JOIN   tenants t ON t.id = th.tenant_id
       WHERE  t.url = $1
       ORDER  BY th.created_at DESC`,
      [TETNANT_URL]
    )
    return Response.json({ themes: rows })
  } catch (err) {
    console.error('[/api/themes] GET error:', err)
    return Response.json({ error: 'Failed to fetch themes' }, { status: 500 })
  }
}
