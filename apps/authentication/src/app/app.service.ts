import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthEntity, AuthService } from '@thepro/auth';
import { UserCredentialDto } from './dto/user-credential.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly authService: AuthService,
    private readonly authEntity: AuthEntity,
  ) { }

  async signIn(userCredentialDto: UserCredentialDto) {
    const { email, password } = userCredentialDto

    const userAuth = await this.authEntity.findUserAuthByEmail(email)

    if (!userAuth) {
      throw new NotFoundException(`User with email: "${email}" does not exist.`)
    }

    if (!await this.authService.compareHash(password, userAuth.password)) {
      throw new UnauthorizedException(
        `User with email: "${email}" does not exist or password may be incorrect.`
      )
    }

    const token = await this.authService.createAccessToken(userAuth)
    const ticket = {
      id: userAuth.publicId,
      email: userAuth.email,
      roles: userAuth.roles
    }

    return { token, ticket }
  }

  async register(userCredentialDto: UserCredentialDto) {
    const { email, password } = userCredentialDto

    const userAuth = await this.authEntity.findUserAuthByEmail(email)

    if (userAuth) {
      throw new ForbiddenException(`User with email: "${email}" already exist.`)
    }

    const data = await this.authService.createUserAuth({ email, password })

    return {
      status: `Register Successfully with email: "${data.email}"`,
    }
  }
}
