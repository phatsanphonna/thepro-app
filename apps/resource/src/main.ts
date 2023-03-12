import { Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';
import { AuthEntity, AuthService, RolesGuard } from '@thepro/auth';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '@thepro/database';

async function bootstrap() {
  const logger = new Logger('ResourceApplication')

  const app = await NestFactory.create(AppModule, {
    logger
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 7802;

  app.use(cookieParser());

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
