import type { AxiosInstance, AxiosResponse } from 'axios'
import type { HttpRequestInternalConfig } from './types'

/**
 * 拦截器类
 */
export class InterceptorManager {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  // 请求拦截
  useRequest(
    onFulfilled: (
      config: HttpRequestInternalConfig
    ) => HttpRequestInternalConfig | Promise<HttpRequestInternalConfig>,
    onRejected?: (error: any) => any
  ) {
    this.instance.interceptors.request.use(onFulfilled, onRejected)
  }

  // 响应拦截
  useResponse(
    onFulfilled: (
      response: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: any) => any
  ) {
    this.instance.interceptors.response.use(onFulfilled, onRejected)
  }
}
