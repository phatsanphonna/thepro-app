import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuth } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { IUserCredential } from './auth.interface';
import { AuthEntity } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authEntity: AuthEntity
  ) { }

  async createAccessToken(payload: UserAuth) {
    return await this.jwtService.signAsync({
      id: payload.publicId,
      role: payload.role
    })
  }

  async createHash(payload: string) {
    return await bcrypt.hash(payload, 10)
  }

  async compareHash(payload: string, hash: string) {
    return await bcrypt.compare(payload, hash)
  }

  async createUserAuth(credential: IUserCredential) {
    const { email, password } = credential

    const hashedPassword = await this.createHash(password)
    return await this.authEntity.createUserAuth(email, hashedPassword)
  }

  async sendVerificationEmail() {
    return
  }
}
