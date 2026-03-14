import type { HttpPlugin, HttpRequestInternalConfig } from '../core/types'
import type { AxiosResponse } from 'axios'

export function loggerPlugin(): HttpPlugin {
  return {
    setup(client) {
      client.interceptors.useRequest((config: HttpRequestInternalConfig) => {
        console.log('[HTTP REQUEST]', config.method, config.url)
        return config
      })

      client.interceptors.useResponse(
        (res: AxiosResponse) => {
          console.log('[HTTP RESPONSE]', res.config.url, res.status)
          return res
        },
        (error: any) => {
          console.error('[HTTP ERROR]', error)
          return Promise.reject(error)
        }
      )
    }
  }
}
