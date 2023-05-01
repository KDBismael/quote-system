import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as U } from '@prisma/client';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
