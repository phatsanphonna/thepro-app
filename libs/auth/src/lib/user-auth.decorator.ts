import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ExtractJwtPipe } from './extract-jwt.pipe';

const Decorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.cookies?.accessToken
  }
);

export const UserAuth = () => Decorator(ExtractJwtPipe)
