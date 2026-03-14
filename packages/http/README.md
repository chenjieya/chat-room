# @alvis/http

一个基于 axios 的轻量 HTTP 客户端封装，提供：

- 简洁的请求方法（get/post/put/delete/patch）
- 插件机制（Token 注入、失败重试、请求去重、日志）
- 简单的拦截器封装，易于扩展

## 安装

```bash
pnpm add @alvis/http axios
# 或
npm i @alvis/http axios
```

@alvis/http 将 axios 声明为 peerDependency，请确保你的项目已安装 axios。

## 快速上手

```ts
import { createHttpClient } from '@alvis/http'

const http = createHttpClient({
  baseURL: '/api',
  timeout: 10000
})

// GET
const user = await http.get<{ id: number; name: string }>('/user/1')

// POST
await http.post('/user', { name: 'Alice' })
```

默认返回 axios 的 `response.data`。

## 请求配置

所有方法均接受 `HttpRequestConfig`（扩展自 AxiosRequestConfig），支持：

- retry: 请求失败自动重试的次数
- retryDelay: 每次重试的间隔毫秒数
- dedupe: 开启请求去重（对同 URL+params+data 的并发请求进行去重）

示例：

```ts
await http.get('/list', { retry: 3, retryDelay: 800, dedupe: true })
```

## 插件机制

在客户端上通过 `use(plugin)` 启用插件。

### 内置插件

- Token 注入：

```ts
import { tokenPlugin } from '@alvis/http'

http.use(tokenPlugin(() => localStorage.getItem('token')))
```

- 失败重试：

```ts
import { retryPlugin } from '@alvis/http'
http.use(retryPlugin())
// 按请求开关
await http.get('/list', { retry: 2, retryDelay: 500 })
```

- 请求去重：

```ts
import { dedupePlugin } from '@alvis/http'
http.use(dedupePlugin())
await Promise.all([
  http.get('/list', { dedupe: true }),
  http.get('/list', { dedupe: true }) // 将抛错：重复的网络请求
])
```

- 日志输出：

```ts
import { loggerPlugin } from '@alvis/http'
http.use(loggerPlugin())
```

## 拦截器

你可以直接在客户端上注册请求/响应拦截器：

```ts
http.interceptors.useRequest(config => {
  // 自定义请求配置
  return config
})

http.interceptors.useResponse(
  res => {
    // 统一处理响应
    return res
  },
  error => {
    // 统一处理错误
    return Promise.reject(error)
  }
)
```

## 响应数据约定（可选）

如果你的后端采用统一响应格式：

```ts
interface HttpResponse<T = any> {
  code: number
  data: T
  message: string
}
```

则可以在调用处通过泛型声明 `data` 的具体类型：

```ts
const res =
  await http.get<HttpResponse<{ id: number; name: string }>>('/user/1')
// res.data 即为 { id, name }
```

## API 参考

- `createHttpClient(config: HttpRequestConfig): HttpClient`
- `HttpClient#request<T>(config): Promise<T>`
- `HttpClient#get/post/put/delete/patch<T>(...): Promise<T>`
- `HttpClient#use(plugin: HttpPlugin): void`
- `HttpClient#interceptors.useRequest(onFulfilled, onRejected?)`
- `HttpClient#interceptors.useResponse(onFulfilled, onRejected?)`

## 版本与发布

本包默认导出 ESM/CJS 构建与 d.ts 类型：

- `exports["."]`: import/require/types
- peerDependencies: axios >= 1.0.0

## 常见问题

- 请求不返回数据？本库默认返回 axios `response.data`，如需返回完整响应，请直接使用 `http.axios(config)`。
- 相同请求抛出“重复的网络请求”？检查是否启用了 `dedupePlugin` 且设置了 `dedupe: true`。
- 重试不生效？检查请求是否配置了 `retry` 和 `retryDelay`，以及服务端是否返回非 2xx 导致进入响应错误分支。
