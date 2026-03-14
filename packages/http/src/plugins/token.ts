import type { HttpPlugin, HttpRequestInternalConfig } from '../core/types'

export function tokenPlugin(getToken: () => string | null): HttpPlugin {
  return {
    setup(client) {
      client.interceptors.useRequest((config: HttpRequestInternalConfig) => {
        const token = getToken()

        if (token) {
          config.headers = config.headers
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      })
    }
  }
}
