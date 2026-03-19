import { DynamicModule, Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { RolesGuard } from './guards/roles.guard'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { ALVIS_AUTH_OPTIONS } from './tokens'
import type { AlvisAuthModuleOptions } from './types'

@Global()
@Module({})
export class AlvisAuthModule {
  static forRoot(options: AlvisAuthModuleOptions): DynamicModule {
    return {
      // 动态模块
      module: AlvisAuthModule,
      imports: [
        // 将nestjs的passport模块原封不动导出
        PassportModule,
        // 注册jwt模块
        JwtModule.register({
          secret: options.jwtSecret,
          signOptions: options.jwtSignOptions
        })
      ],
      providers: [
        {
          provide: ALVIS_AUTH_OPTIONS,
          useValue: options
        },
        AuthService,
        JwtAuthGuard,
        LocalAuthGuard,
        RolesGuard,
        JwtStrategy,
        LocalStrategy
      ],
      exports: [
        AuthService,
        JwtAuthGuard,
        LocalAuthGuard,
        RolesGuard,
        JwtModule,
        PassportModule
      ]
    }
  }
}
