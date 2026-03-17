import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
  UseInterceptors
} from '@nestjs/common'
import { AppService } from './app.service'
import { ResponseInterceptor } from './interface/response.interceptor'
import { ErrorFilter } from './filter/error.filter'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(ResponseInterceptor)
  @UseFilters(ErrorFilter)
  getHello(): any {
    // return this.appService.getHello()
    // return ['asda', 'dasdad', 'das']
    const abc = undefined as any

    abc.test = 12

    // throw new HttpException(
    //   { code: 500, message: '发生错误了' },
    //   HttpStatus.INTERNAL_SERVER_ERROR
    // )
    return abc
  }
}
