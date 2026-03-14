import { HttpClient } from './core/http-client'
import type { HttpRequestConfig } from './core/types'

export function createHttpClient(config: HttpRequestConfig) {
  return new HttpClient(config)
}
