export type AlvisRole = string

export type JwtFromRequestFunction = (req: any) => string | null

export type JwtSignOptions = Record<string, any>

export interface JwtPayload {
  sub: string | number
  username?: string
  roles?: AlvisRole[]
  [key: string]: any
}

export interface AlvisAuthModuleOptions {
  // jwt模块注册相关
  jwtSecret: string
  jwtSignOptions?: JwtSignOptions

  // 校验用户 账号密码是否正确
  validateUser: (
    username: string,
    password: string
  ) => Promise<any | null> | any

  // 生成jwt的载体
  payloadFactory?: (user: any) => JwtPayload

  // jwt策略参数-默认是 fromAuthHeaderAsBearerToken从header获取bearertoken
  jwtFromRequest?: JwtFromRequestFunction

  // 校验jwt返回的载体
  validateJwtPayload?: (payload: JwtPayload) => Promise<any> | any

  // 获取用户角色
  getUserRoles?: (user: any) => AlvisRole[] | undefined
}

export interface AuthTokenResult {
  accessToken: string
}
