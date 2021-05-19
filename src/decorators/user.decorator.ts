import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface User {
  userId: string;
  username: string;
}

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    const user: User = request.user;
    return user;
  },
);
