import type { HttpPlugin, HttpRequestInternalConfig } from '../core/types'
import type { AxiosResponse } from 'axios'

const pending = new Map<string, boolean>()

function getKey(config: any) {
  return (
    config.url + JSON.stringify(config.params) + JSON.stringify(config.data)
  )
}

export function dedupePlugin(): HttpPlugin {
  return {
    setup(client) {
      client.interceptors.useRequest((config: HttpRequestInternalConfig) => {
        if (!config.dedupe) return config

        const key = getKey(config)

        if (pending.has(key)) {
          throw new Error(`${key}: 重复的网络请求`)
        }

        pending.set(key, true)

        return config
      })

      client.interceptors.useResponse(
        (res: AxiosResponse) => {
          const key = getKey(res.config)
          pending.delete(key)
          return res
        },
        (error: { config: any }) => {
          const key = getKey(error.config || {})
          pending.delete(key)
          return Promise.reject(error)
        }
      )
    }
  }
}
