import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@thepro/database';
import { AuthService } from './auth.service';

export class RolesGuard implements CanActivate {
  constructor(
    @Inject(Reflector) private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest();

    if (!request.cookies.accessToken) {
      throw new ForbiddenException('accessToken is not found or may be invalid.');
    }

    const verify = await this.authService.verifyAccessToken(
      request.cookies.accessToken
    );

    if (!verify) {
      throw new ForbiddenException('accessToken is not found or may be invalid.');
    }

    const authTicket = this.authService.decode(request.cookies.accessToken);

    return requireRoles.some((role) => authTicket.roles.includes(role));
  }
}
