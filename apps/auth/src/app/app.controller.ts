import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserCredentialDto } from './dto/user-credential.dto';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/signin')
  async signIn(@Body() userCredentialDto: UserCredentialDto) {
    return await this.appService.signIn(userCredentialDto)
  }

  @Post('/register')
  async register(@Body() userCredentialDto: UserCredentialDto) {
    return await this.appService.register(userCredentialDto)
  }
}
