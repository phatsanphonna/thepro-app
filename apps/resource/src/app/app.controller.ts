import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { UserAuth } from '@thepro/auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@UserAuth() userAuth: string) {
    return this.appService.getData(userAuth);
  }
}
