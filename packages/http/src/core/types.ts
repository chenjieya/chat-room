import type { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

export interface HttpResponse<T = any> {
  code: number
  data: T
  message: string
}

export interface HttpRequestConfig extends AxiosRequestConfig {
  retry?: number
  retryDelay?: number
  dedupe?: boolean
}

export interface HttpRequestInternalConfig extends HttpRequestConfig {
  headers: AxiosRequestHeaders
}

export interface HttpPlugin {
  setup(client: any): void
}
