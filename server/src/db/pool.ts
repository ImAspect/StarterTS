import { createPool, Pool } from 'mysql2/promise'

const generateConnectionPool = (): Pool | undefined => {
  try {
    return createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT as unknown as number,
      connectTimeout: 60000,
    })
  } catch (e: any) {
    console.error(e)
  }
}

export const pool = generateConnectionPool()
