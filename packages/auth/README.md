# @alvis/auth

一个可复用的 NestJS 认证包，基于 `@nestjs/passport` + `@nestjs/jwt`，内置：

- `AlvisAuthModule`：动态模块注册（forRoot）
- `AuthService`：登录签发 JWT（accessToken）
- `LocalStrategy`：账号密码登录策略（passport-local）
- `JwtStrategy`：JWT 校验策略（passport-jwt）
- `JwtAuthGuard`：JWT 守卫（支持白名单）
- `RolesGuard`：角色权限守卫
- 装饰器：`@Public()`、`@Roles(...)`、`@CurrentUser()`、`@Auth(...)`

## 安装

```bash
pnpm add @alvis/auth
```

该包将 NestJS 与 Passport 相关依赖声明为 peerDependencies，使用方需要确保项目里存在以下依赖（通常 Nest 项目本身就会有一部分）：

- `@nestjs/jwt`
- `@nestjs/passport`
- `passport`
- `passport-jwt`
- `passport-local`

## 快速上手

### 1) 注册模块

在你的业务模块中注册 `AlvisAuthModule.forRoot(...)`：

```ts
import { Module } from '@nestjs/common'
import { AlvisAuthModule } from '@alvis/auth'

@Module({
  imports: [
    AlvisAuthModule.forRoot({
      jwtSecret: process.env.JWT_SECRET || 'dev-secret',

      validateUser: async (username, password) => {
        // 这里接你的用户校验逻辑（查数据库 / RPC）
        // 返回 user 对象：会被 local strategy 放到 req.user 上
        if (username === 'admin' && password === '123') {
          return { id: 1, username, roles: ['admin'] }
        }
        return null
      },

      // JWT的载体
      payloadFactory: user => ({
        sub: user.id,
        username: user.username,
        roles: user.roles
      }),

      validateJwtPayload: payload => {
        // 这里决定 jwt 校验成功后 req.user 的内容
        // 你也可以在此根据 sub 再查一次用户信息
        return payload
      },

      getUserRoles: user => user?.roles
    })
  ]
})
export class AppModule {}
```

### 2) 登录（LocalStrategy + LocalAuthGuard）

`LocalStrategy` 会调用 `validateUser(username, password)`，成功时把 user 放到 `req.user`。

```ts
import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService, LocalAuthGuard, Public } from '@alvis/auth'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return this.authService.login(req.user)
  }
}
```

### 3) 访问受保护接口（JwtStrategy + JwtAuthGuard）

```ts
import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard, CurrentUser } from '@alvis/auth'

@Controller('me')
export class MeController {
  @UseGuards(JwtAuthGuard)
  @Get()
  me(@CurrentUser() user: any) {
    return user
  }
}
```

## 权限控制（角色）

### 1) @Roles(...)

```ts
import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard, RolesGuard, Roles } from '@alvis/auth'

@Controller('admin')
export class AdminController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  list() {
    return ['ok']
  }
}
```

`RolesGuard` 会从 `req.user` 上读取角色（默认尝试 `user.roles` 或 `user.role`），也可以通过 `getUserRoles(user)` 自定义。

### 2) @Auth(...)

如果你希望一句话完成「鉴权 + 角色」：

```ts
import { Controller, Get } from '@nestjs/common'
import { Auth } from '@alvis/auth'

@Controller('admin')
export class AdminController {
  @Auth('admin')
  @Get()
  list() {
    return ['ok']
  }
}
```

`@Auth(...roles)` 等价于 `@UseGuards(JwtAuthGuard, RolesGuard) + @Roles(...roles)`

## API 速查

### 模块

- `AlvisAuthModule.forRoot(options)`
  - `jwtSecret`：必填
  - `jwtSignOptions`：可选
  - `validateUser(username, password)`：必填（Local 登录用）
  - `payloadFactory(user)`：可选（签发 token 的 payload）
  - `jwtFromRequest(req)`：可选（自定义 token 读取逻辑）
  - `validateJwtPayload(payload)`：可选（JWT 校验成功后返回给 req.user 的对象）
  - `getUserRoles(user)`：可选（RolesGuard 获取角色）

### Guards / Decorators

- Guards：`JwtAuthGuard`、`LocalAuthGuard`、`RolesGuard`
- Decorators：`Public`、`Roles`、`CurrentUser`、`Auth`

## 约定与注意事项

- 默认 token 从请求头 `Authorization: Bearer <token>` 读取；如需从 Cookie 或其他位置读取，请传入 `jwtFromRequest`。
- `RolesGuard` 的角色来源默认从 `req.user.roles` / `req.user.role` 推断；建议统一返回 `roles: string[]`，或通过 `getUserRoles` 明确指定。
- 该包只负责认证与授权基础设施，不包含用户表/密码加密/数据库查询，请在业务层实现。
