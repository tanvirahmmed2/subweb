import pool from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const { name, email, subject, description } = await request.json()

    if (!name || !email || !subject || !description) {
      return Response.json({ error: 'All fields are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const { rows } = await pool.query(
      `INSERT INTO supports (name, email, subject, description)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`,
      [name.trim(), email.trim().toLowerCase(), subject.trim(), description.trim()]
    )

    return Response.json(
      { message: 'Support ticket created successfully', id: rows[0].id },
      { status: 201 }
    )
  } catch (err) {
    console.error('[/api/contact] POST error:', err)
    return Response.json({ error: 'Failed to submit contact form' }, { status: 500 })
  }
}
