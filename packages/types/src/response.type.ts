export interface IResponse<T = any> {
  code: number
  data: T
  message: string | null
}
