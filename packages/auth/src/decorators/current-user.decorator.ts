import { createParamDecorator, ExecutionContext } from '@nestjs/common'

//  获取当前用户信息 的 参数装饰器
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request?.user
    return data ? user?.[data] : user
  }
)
