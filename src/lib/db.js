import { Pool } from 'pg'
import {
  PG_USER,
  PG_PASSWORD,
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
} from './secret'

/** @type {Pool} */
let pool

if (!global._pgPool) {
  global._pgPool = new Pool({
    user: PG_USER,
    password: PG_PASSWORD,
    host: PG_HOST,
    port: Number(PG_PORT),
    database: PG_DATABASE,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  })
}

pool = global._pgPool

export default pool
