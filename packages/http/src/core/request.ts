import type { AxiosInstance } from 'axios'
import type { HttpRequestConfig } from './types'

export async function httpRequest<T = any>(
  instance: AxiosInstance,
  config: HttpRequestConfig
): Promise<T> {
  const response = await instance.request(config)

  return response.data
}
