import { SetMetadata } from '@nestjs/common'
import { IS_PUBLIC_KEY } from '../metadata'

// 装饰器 - 放行白名单接口（作用于函数和类身上）
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
