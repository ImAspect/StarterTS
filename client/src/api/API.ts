import { GetAPI, PostAPI } from '../types/api'
import { JsonResponse } from '../types/misc'

class API {
  constructor() {}

  protected get({ url, signal }: GetAPI): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        signal,
        method: 'get',
        credentials: 'include',
      })
      const data = await response.json()

      resolve(data)
    })
  }

  protected post<T>({ url, signal, data }: PostAPI<T>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        body: JSON.stringify(data),
        signal,
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      })
      const res = await response.json()

      resolve(res)
    })
  }
}

export default API
