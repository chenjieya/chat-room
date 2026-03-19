import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ALVIS_AUTH_OPTIONS } from './tokens'
import type { AlvisAuthModuleOptions, AuthTokenResult } from './types'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(ALVIS_AUTH_OPTIONS)
    private readonly options: AlvisAuthModuleOptions
  ) {}

  // passport 本地策略  校验用户是否存在
  async validateUser(username: string, password: string) {
    if (!this.options.validateUser) return null
    return this.options.validateUser(username, password)
  }

  async login(user: any): Promise<AuthTokenResult> {
    // 生成jwt载体
    const payloadFactory =
      this.options.payloadFactory ||
      ((u: any) => ({
        sub: u?.id ?? u?.userId,
        username: u?.username
      }))

    const payload = payloadFactory(user)

    if (!payload || payload.sub === undefined || payload.sub === null) {
      throw new UnauthorizedException('jwt载体必须要有sub字段，对应用户id')
    }

    // 账号密码校验通过之后，生成jwt信息
    const accessToken = this.jwtService.sign(
      payload,
      this.options.jwtSignOptions
    )

    return { accessToken }
  }
}
