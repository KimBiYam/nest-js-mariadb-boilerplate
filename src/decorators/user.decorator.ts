import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { RequestUserDto } from 'src/modules/auth';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestUserDto => {
    const request = ctx.switchToHttp().getRequest();
    const { userId, username } = request.user;
    const user: RequestUserDto = { userId, name: username };
    new Logger().debug(user);
    return user;
  },
);
