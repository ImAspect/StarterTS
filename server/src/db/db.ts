import { pool } from './pool'

class DB {
  constructor() {}

  public exec(query: string, values: Array<any> = []): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await pool?.execute(query, values)
        resolve(res?.[0])
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default new DB()
