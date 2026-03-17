import { IResponse } from '@alvis/types'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Response } from 'express'

// TODO:// WsException 后续接入ws的时候，检查错误时候继承该类型
// 捕获所有的错误
@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    // 默认错误信息
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR
    let message: string = '程序异常，请联系管理员'
    let code: number = status // 可自定义错误码

    // 处理 NestJS 内置的 HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      // 获取错误消息（可能是字符串或对象）
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        // 如果 exceptionResponse 包含 message 字段，则使用它；否则使用默认消息
        message = (exceptionResponse as any).message || exception.message
        // 如果响应中有自定义错误码，可以提取
        code = (exceptionResponse as any).code || status
      } else {
        console.log(`httpException未处理的错误🙅`)
      }
    } else if (exception instanceof Error) {
      // 处理其他 Error 类型（系统错误、数据库错误等）
      message = exception.message
      // 这里可以记录详细错误日志
      // console.error('Unhandled error:', exception.stack)
    } else {
      // 处理未知类型
      message = '未知错误类型'
      // console.error('Unknown exception:', exception)
    }

    // 构建统一错误响应（与成功响应格式一致，但 code/message 不同）
    const errorResponse: IResponse = {
      code: code,
      message: message,
      data: null
    }

    response.status(status).json(errorResponse)
  }
}
