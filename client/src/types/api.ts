export interface API {
  url: string
  signal?: AbortSignal
}

export interface GetAPI extends API {}

export interface PostAPI<T> extends API {
  data?: T | any
}
