import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ALVIS_AUTH_OPTIONS } from '../tokens'
import type { AlvisAuthModuleOptions, JwtPayload } from '../types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(ALVIS_AUTH_OPTIONS)
    private readonly options: AlvisAuthModuleOptions
  ) {
    super({
      jwtFromRequest:
        options.jwtFromRequest || ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 如果提供了过期的jwt，则该策略会返回401； true即使token过期了也就成功
      ignoreExpiration: false,
      secretOrKey: options.jwtSecret
    })
  }

  async validate(payload: JwtPayload) {
    if (this.options.validateJwtPayload) {
      return this.options.validateJwtPayload(payload)
    }
    return payload
  }
}
