import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Hello World')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private logger = new Logger('App');

  @Get()
  getHello(): string {
    this.logger.log('Get Hello');

    return this.appService.getHello();
  }
}
