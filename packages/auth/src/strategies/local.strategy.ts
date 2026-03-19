import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { ALVIS_AUTH_OPTIONS } from '../tokens'
import type { AlvisAuthModuleOptions } from '../types'

// passport的本地策略
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authService: AuthService,
    @Inject(ALVIS_AUTH_OPTIONS)
    private readonly options: AlvisAuthModuleOptions
  ) {
    super()
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }
}
