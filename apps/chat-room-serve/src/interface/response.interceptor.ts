import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { IResponse } from '@alvis/types'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  IResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<IResponse<T>> {
    return next
      .handle()
      .pipe(map(data => ({ code: 200, message: 'success', data })))
  }
}
