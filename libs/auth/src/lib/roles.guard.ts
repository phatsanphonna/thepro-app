import { CanActivate, ExecutionContext, ForbiddenException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { AuthService } from './auth.service';

export class RolesGuard implements CanActivate {
  constructor(
    @Inject(Reflector) private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass()
    ])

    const request = context.switchToHttp().getRequest()

    if (!request.cookies.accessToken) {
      throw new ForbiddenException('Invalid accessToken')
    }

    const verify = await this.authService.verifyAccessToken(
      request.cookies.accessToken
    )

    if (!verify) {
      throw new ForbiddenException('Invalid accessToken')
    }

    const authTicket = this.authService.decode(request.cookies.accessToken)

    return requireRoles.some((role) => authTicket.role === role)
  }
}
