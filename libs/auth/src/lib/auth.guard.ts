import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const accessToken: string = request.cookies.accessToken;

    if (!accessToken) {
      throw new ForbiddenException('accessToken is not found or may be invalid.');
    }

    const verify = await this.authService.verifyAccessToken(
      request.cookies.accessToken
    );

    if (!verify) {
      throw new ForbiddenException('accessToken is not found or may be invalid.');
    }

    return true;
  }
}
