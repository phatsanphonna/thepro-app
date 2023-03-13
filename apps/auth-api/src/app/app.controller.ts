import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('/')
export class AppController {
  readonly RESOURCE_DOMAIN = this.configService.get<string>('FRONTEND_DOMAIN');
  readonly NODE_ENV = this.configService.get<string>('NODE_ENV')
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  getHello() {
    return { message: 'Hello World' };
  }

  @Post(['/signin', 'signIn'])
  async signIn(
    @Body() userCredentialDto: UserCredentialDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { token, ticket } = await this.appService.signIn(userCredentialDto);

    response.cookie('accessToken', token, {
      httpOnly: true,
      domain: this.RESOURCE_DOMAIN,
      secure: this.NODE_ENV === 'production',
      // 5 hours
      expires: new Date(new Date().getTime() + 5 * 60 * 60 * 1000),
      sameSite: 'lax',
    });

    return { token, ticket };
  }

  @Post('/register')
  async register(@Body() userCredentialDto: UserCredentialDto) {
    return await this.appService.register(userCredentialDto);
  }

  @Post(['/signout', '/signOut'])
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken', {
      httpOnly: true,
      domain: this.RESOURCE_DOMAIN,
      secure: this.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    response.status(200).send({ status: 'Signed out successfully.' }).end();
  }
}
