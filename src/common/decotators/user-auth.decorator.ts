/** @packages */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserAuth = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.user[key] : request.user;
  },
);
