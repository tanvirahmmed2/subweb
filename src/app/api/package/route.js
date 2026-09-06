import pool from '@/lib/db'
import { TETNANT_URL } from '@/lib/secret'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Fetch packages
    const { rows: packages } = await pool.query(
      `SELECT p.id, p.name, p.slug, p.description, p.price, p.discount, p.image
       FROM   packages p
       JOIN   tenants t ON t.id = p.tenant_id
       WHERE  t.url = $1
       ORDER  BY p.price ASC`,
      [TETNANT_URL]
    )

    // Fetch features for each package
    const packageIds = packages.map((p) => p.id)
    let features = []
    if (packageIds.length > 0) {
      const { rows } = await pool.query(
        `SELECT pf.package_id, f.name AS feature, pf.value
         FROM   package_features pf
         JOIN   features f ON f.id = pf.feature_id
         WHERE  pf.package_id = ANY($1::int[])`,
        [packageIds]
      )
      features = rows
    }

    // Attach features to packages
    const result = packages.map((pkg) => ({
      ...pkg,
      features: features
        .filter((f) => f.package_id === pkg.id)
        .map((f) => ({ name: f.feature, included: f.value })),
    }))

    return Response.json({ packages: result })
  } catch (err) {
    console.error('[/api/package] GET error:', err)
    return Response.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}
