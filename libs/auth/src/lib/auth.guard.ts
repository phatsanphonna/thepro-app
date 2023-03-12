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

    if (!request.cookies.accessToken) {
      throw new ForbiddenException('Invalid accessToken');
    }

    const verify = await this.authService.verifyAccessToken(
      request.cookies.accessToken
    );

    if (!verify) {
      throw new ForbiddenException('Invalid accessToken');
    }

    return true;
  }
}
