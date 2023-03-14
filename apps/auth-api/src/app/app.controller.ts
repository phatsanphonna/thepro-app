import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Cookies } from '@thepro/auth';

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
      secure: this.NODE_ENV === 'production',
      domain: this.RESOURCE_DOMAIN,
      // 5 hours
      expires: new Date(new Date().getTime() + 5 * 60 * 60 * 1000),
      sameSite: 'lax',
    });
    response.setHeader('Access-Control-Allow-Headers', 'Set-Cookie')
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    return { token, ticket };
  }

  @Post('/register')
  async register(@Body() userCredentialDto: UserCredentialDto) {
    return await this.appService.register(userCredentialDto);
  }

  @Get('/verify')
  async verify(@Res() response: Response, @Cookies('accessToken') accessToken: string) {
    const result = await this.appService.verify(accessToken);

    if (result) {
      response.status(HttpStatus.OK).send({ result }).end();
    } else {
      response.status(HttpStatus.FORBIDDEN).send({ result }).end();
    }
  }

  @Post(['/signout', '/signOut'])
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken', {
      httpOnly: true,
      secure: this.NODE_ENV === 'production',
      domain: this.RESOURCE_DOMAIN,
      sameSite: 'lax',
    });

    response.status(HttpStatus.OK).send({ status: 'Signed out successfully.' }).end();
  }
}
