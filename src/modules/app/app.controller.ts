import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Hello World')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private logger = new Logger('App');

  @Get()
  @ApiOperation({ summary: 'Hello World!' })
  getHello(): string {
    this.logger.log('Get Hello');

    return this.appService.getHello();
  }
}
