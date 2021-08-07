import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError, EntityNotFoundError)
export class OrmExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('OrmExceptionFilter');

  catch(
    exception: QueryFailedError | EntityNotFoundError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const msg = exception.message;

    this.logger.error(response);
    this.logger.error(msg);

    response.status(400).json({ msg });
  }
}
