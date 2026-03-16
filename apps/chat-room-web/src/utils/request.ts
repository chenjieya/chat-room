import {
  createHttpClient,
  loggerPlugin,
  dedupePlugin,
  retryPlugin,
  tokenPlugin
} from '@alvis/http'
import type { AxiosResponse } from 'axios'

const http = createHttpClient({
  baseURL: '/api',
  retry: 3,
  dedupe: true
})

// token
http.use(tokenPlugin(() => 'token'))

// 日志打印
http.use(loggerPlugin())

// 取消重复的网络请求
http.use(dedupePlugin())

// 重试
http.use(retryPlugin())

// 响应拦截
http.interceptors.useResponse(
  (response: AxiosResponse) => {
    // console.log(response, 'console.log(response)')
    // 需要通过code来判断一下，是否正常
    return response
  },
  error => {
    // 处理网络/HTTP 错误
    if (!error.response) {
      // 请求超时或网络错误
      if (error.message.includes('timeout')) {
        // 请求超时，请检查网络
      } else {
        // 网络异常，请稍后重试
      }
      return Promise.reject(error)
    }

    // HTTP 状态码错误
    const { status } = error.response
    switch (status) {
      case 401:
        // 未授权，跳转登录
        // localStorage.removeItem('token');
        // 请先登录
        break
      case 403:
        // 您没有权限访问
        break
      case 404:
        //  请求资源不存在
        break
      case 500:
        // 服务器内部错误，一般都是后端的代码出现了错误
        break
      default:
      // `请求错误 (${status})`
    }
    return Promise.reject(error)
  }
)

export { http }
