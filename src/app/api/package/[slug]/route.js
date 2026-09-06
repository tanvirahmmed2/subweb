import pool from '@/lib/db'
import { TETNANT_URL } from '@/lib/secret'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  const { slug } = await params
  try {
    const { rows: packages } = await pool.query(
      `SELECT p.id, p.name, p.slug, p.description, p.price, p.discount, p.image
       FROM   packages p
       JOIN   tenants t ON t.id = p.tenant_id
       WHERE  t.url = $1 AND p.slug = $2
       LIMIT  1`,
      [TETNANT_URL, slug]
    )
    if (packages.length === 0) {
      return Response.json({ error: 'Package not found' }, { status: 404 })
    }
    const pkg = packages[0]

    const { rows: features } = await pool.query(
      `SELECT f.name AS feature, pf.value
       FROM   package_features pf
       JOIN   features f ON f.id = pf.feature_id
       WHERE  pf.package_id = $1`,
      [pkg.id]
    )

    return Response.json({
      package: {
        ...pkg,
        features: features.map((f) => ({ name: f.feature, included: f.value })),
      },
    })
  } catch (err) {
    console.error('[/api/package/[slug]] GET error:', err)
    return Response.json({ error: 'Failed to fetch package' }, { status: 500 })
  }
}
