/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const logger = new Logger('AuthApplication')

  const app = await NestFactory.create(AppModule, {
    logger
  });

  const port = process.env.PORT || 7801;

  await app.listen(port);
  logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
