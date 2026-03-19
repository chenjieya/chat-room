import { SetMetadata } from '@nestjs/common'
import { ROLES_KEY } from '../metadata'
import type { AlvisRole } from '../types'

export const Roles = (...roles: AlvisRole[]) => SetMetadata(ROLES_KEY, roles)
