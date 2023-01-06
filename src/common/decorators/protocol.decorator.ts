import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const Protocol = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log('default:', data);
    const req = ctx.switchToHttp().getRequest();
    return req.protocol;
  },
);
