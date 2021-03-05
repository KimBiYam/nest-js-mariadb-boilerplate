import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const reqeust = ctx.switchToHttp().getRequest();
    return reqeust.user;
  },
);
