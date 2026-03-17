import { tokenPlugin } from '../token'
import { HttpClient } from '../../core/http-client'

describe('tokenPlugin', () => {
  let client: HttpClient
  let getToken: jest.Mock

  beforeEach(() => {
    client = new HttpClient({ baseURL: 'http://api.com' })
    getToken = jest.fn()
  })

  it('应该有一个token', async () => {
    getToken.mockReturnValue('token')

    const plugin = tokenPlugin(getToken)

    // 模拟useRequest
    let requestInterface: any
    jest
      .spyOn(client.interceptors, 'useRequest')
      .mockImplementation((onFulfilled: any) => {
        requestInterface = onFulfilled
      })

    client.use(plugin)

    const config = { headers: {} } as any
    const result = await requestInterface(config)

    expect(result.headers.Authorization).toBe('Bearer token')
  })

  it('不能添加一个null的token', async () => {
    getToken.mockReturnValue(null)

    const plugin = tokenPlugin(getToken)

    // 模拟useRequest
    let requestInterface: any
    jest
      .spyOn(client.interceptors, 'useRequest')
      .mockImplementation((onFulfilld: any) => {
        requestInterface = onFulfilld
      })

    client.use(plugin)

    const config = { headers: {} } as any
    const result = await requestInterface(config)

    expect(result.headers.Authorization).toBeUndefined()
  })
})
