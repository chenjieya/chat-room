import type { HttpPlugin } from '../core/types'
import type { AxiosResponse } from 'axios'

export function retryPlugin(): HttpPlugin {
  return {
    setup(client) {
      client.interceptors.useResponse(
        (res: AxiosResponse) => res,
        async (error: { config: any }) => {
          const config = error.config

          if (!config || !config.retry) {
            return Promise.reject(error)
          }

          config.__retryCount = config.__retryCount || 0

          if (config.__retryCount >= config.retry) {
            return Promise.reject(error)
          }

          config.__retryCount++

          const delay = config.retryDelay || 1000

          await new Promise(resolve => setTimeout(resolve, delay))

          return client.axios(config)
        }
      )
    }
  }
}
