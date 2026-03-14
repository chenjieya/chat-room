import axios, { AxiosInstance } from 'axios'
import { InterceptorManager } from './interceptor'
import { httpRequest } from './request'
import type { HttpPlugin, HttpRequestConfig } from './types'

export class HttpClient {
  // axios实例对象
  private instance: AxiosInstance
  // 自定义插件 多个插件的存储队列
  private plugins: HttpPlugin[] = []

  // 拦截器类
  public interceptors: InterceptorManager

  constructor(config: HttpRequestConfig) {
    this.instance = axios.create(config)

    this.interceptors = new InterceptorManager(this.instance)
  }

  // 通过实例对象，获取到该axios的实例
  get axios() {
    return this.instance
  }

  // 使用插件
  use(plugin: HttpPlugin) {
    plugin.setup(this)
    this.plugins.push(plugin)
  }

  // 网络请求
  request<T = any>(config: HttpRequestConfig): Promise<T> {
    return httpRequest<T>(this.instance, config)
  }

  get<T = any>(url: string, config?: HttpRequestConfig) {
    return this.request<T>({
      ...config,
      method: 'GET',
      url
    })
  }

  post<T = any>(url: string, data?: any, config?: HttpRequestConfig) {
    return this.request<T>({
      ...config,
      method: 'POST',
      url,
      data
    })
  }

  put<T = any>(url: string, data?: any, config?: HttpRequestConfig) {
    return this.request<T>({
      ...config,
      method: 'PUT',
      url,
      data
    })
  }

  delete<T = any>(url: string, config?: HttpRequestConfig) {
    return this.request<T>({
      ...config,
      method: 'DELETE',
      url
    })
  }

  patch<T = any>(url: string, data?: any, config?: HttpRequestConfig) {
    return this.request<T>({
      ...config,
      method: 'PATCH',
      url,
      data
    })
  }
}
