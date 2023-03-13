import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('ok');

    if (!request.cookies.accessToken) {
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
