import { HttpClient } from '../http-client'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('HttpClient', () => {
  let mockAxiosInstance: any
  let client: HttpClient
  const baseConfig = {
    baseURL: 'http://test'
  }

  beforeEach(() => {
    mockAxiosInstance = {
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      },
      request: jest.fn()
    }

    mockedAxios.create.mockReturnValue(mockAxiosInstance)

    client = new HttpClient(baseConfig)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('应该创建一个axios实例', () => {
    expect(axios.create).toHaveBeenCalledWith(baseConfig)
    expect(client.axios).toEqual(mockAxiosInstance)
  })

  it('应该使用插件', () => {
    const plugin = {
      setup: jest.fn()
    }

    client.use(plugin)
    expect(plugin.setup).toHaveBeenCalledWith(client)
    expect(plugin.setup).toHaveBeenCalled()
  })

  it('应该调用request', async () => {
    const mockRequest = jest.spyOn(require('../request.ts'), 'httpRequest')
    mockRequest.mockResolvedValue('request成功调用')

    const result = await client.request({ url: '/test' })

    expect(mockRequest).toHaveBeenCalled()
    expect(result).toEqual('request成功调用')
  })
})
