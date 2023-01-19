import { Body, Controller, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { ConfigService } from '@nestjs/config';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) { }

  @Post('/signin')
  async signIn(
    @Body() userCredentialDto: UserCredentialDto,
    @Res({ passthrough: true }) response
  ) {
    const RESOURCE_DOMAIN = this.configService.get<string>('FRONTEND_DOMAIN')

    const jwt = await this.appService.signIn(userCredentialDto)
    response.cookie('accessToken', jwt, { httpOnly: true, domain: RESOURCE_DOMAIN })
    return jwt
  }

  @Post('/register')
  async register(@Body() userCredentialDto: UserCredentialDto) {
    return await this.appService.register(userCredentialDto)
  }
}
