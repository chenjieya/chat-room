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
  getHello(): string {
    return this.appService.getHello()
  }
}
