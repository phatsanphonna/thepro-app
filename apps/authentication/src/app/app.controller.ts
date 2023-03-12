import { Body, Controller, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('/')
export class AppController {
  RESOURCE_DOMAIN = this.configService.get<string>('FRONTEND_DOMAIN')

  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {
  }

  @Post(['/signin', 'signIn'])
  async signIn(
    @Body() userCredentialDto: UserCredentialDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, ticket } = await this.appService.signIn(userCredentialDto)

    response.cookie('accessToken', token, {
      httpOnly: true,
      domain: this.RESOURCE_DOMAIN,
      // 5 hours
      expires: new Date(new Date().getTime() + 5 * 60 * 60 * 1000),
      sameSite: 'strict',
    })

    return { token, ticket }
  }

  @Post('/register')
  async register(@Body() userCredentialDto: UserCredentialDto) {
    return await this.appService.register(userCredentialDto)
  }

  @Post(['/signout', '/signOut'])
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken', {
      httpOnly: true,
      domain: this.RESOURCE_DOMAIN,
      sameSite: 'strict',
    })

    response.status(200).send({ status: 'Signed out successfully.' }).end()
  }
}
