import { dedupePlugin } from '../dedupe'
import { HttpClient } from '../../core/http-client'
describe('DedupePlugin', () => {
  let client: HttpClient

  beforeEach(() => {
    client = new HttpClient({ baseURL: 'http://api.com' })
  })

  it('重复的网络请求', async () => {
    // 👇 手动存储拦截器
    let requestInterceptor: any

    jest
      .spyOn(client.interceptors, 'useRequest')
      .mockImplementation((onFulfilled: any) => {
        requestInterceptor = onFulfilled
      })

    client.use(dedupePlugin())

    const config = { url: '/test', dedupe: true }

    // 第一次通过
    requestInterceptor(config)

    // 第二次触发
    expect(() => requestInterceptor(config)).toThrow('重复的网络请求')
  })
})
