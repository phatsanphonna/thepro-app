import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@thepro/database';

@Injectable()
export class AuthEntity {
  constructor(
    private readonly databaseService: DatabaseService
  ) { }

  async findUserAuthByEmail(email: string) {
    return await this.databaseService.userAuth.findUnique({
      where: {
        email,
      }
    });
  }

  async createUserAuth(email: string, password: string) {
    return await this.databaseService.userAuth.create({
      data: {
        email,
        password
      }
    })
  }
}
