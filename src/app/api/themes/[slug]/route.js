import pool from '@/lib/db'
import { TETNANT_URL } from '@/lib/secret'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  const { slug } = await params
  try {
    const { rows } = await pool.query(
      `SELECT th.id, th.title, th.slug, th.link, th.description,
              th.created_at,
              COALESCE(
                json_agg(
                  json_build_object(
                    'id',          ti.id,
                    'image',       ti.image,
                    'image_id',    ti.image_id,
                    'description', ti.description
                  ) ORDER BY ti.id
                ) FILTER (WHERE ti.id IS NOT NULL),
                '[]'
              ) AS images
       FROM   themes th
       JOIN   tenants t ON t.id = th.tenant_id
       LEFT JOIN themes_images ti ON ti.theme_id = th.id
       WHERE  t.url = $1 AND th.slug = $2
       GROUP  BY th.id
       LIMIT  1`,
      [TETNANT_URL, slug]
    )
    if (rows.length === 0) {
      return Response.json({ error: 'Theme not found' }, { status: 404 })
    }
    return Response.json({ theme: rows[0] })
  } catch (err) {
    console.error('[/api/themes/[slug]] GET error:', err)
    return Response.json({ error: 'Failed to fetch theme' }, { status: 500 })
  }
}
