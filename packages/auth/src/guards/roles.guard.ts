import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Inject
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../metadata'
import type { AlvisRole, AlvisAuthModuleOptions } from '../types'
import { ALVIS_AUTH_OPTIONS } from '../tokens'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(ALVIS_AUTH_OPTIONS)
    private readonly options: AlvisAuthModuleOptions
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AlvisRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    )

    // 如果装饰器没有参数，则直接放行
    if (!requiredRoles || requiredRoles.length === 0) return true

    const request = context.switchToHttp().getRequest()
    const user = request?.user
    const userRoles =
      this.options.getUserRoles?.(user) || user?.roles || user?.role || []

    const normalizedUserRoles = Array.isArray(userRoles)
      ? userRoles
      : [userRoles]

    const allowed = requiredRoles.some((role: AlvisRole) =>
      normalizedUserRoles.includes(role)
    )
    if (!allowed) {
      // 该接口，对于当前角色没有访问权限
      throw new ForbiddenException('Forbidden')
    }

    return true
  }
}
