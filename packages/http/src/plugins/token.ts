import type { HttpPlugin } from '../core/types'
import type { InternalAxiosRequestConfig } from 'axios'

export function tokenPlugin(getToken: () => string | null): HttpPlugin {
  return {
    setup(client) {
      client.interceptors.useRequest((config: InternalAxiosRequestConfig) => {
        const token = getToken()

        if (token) {
          config.headers = config.headers || {}
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      })
    }
  }
}
