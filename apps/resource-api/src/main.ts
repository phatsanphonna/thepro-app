import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import type { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const GLOBAL_PREFIX = 'api';

export async function createNestServer(expressInstance: Express) {
  const logger = new Logger('ResourceApplication');

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    {
      logger,
    }
  );

  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  return app.init();
}

const server = express();

createNestServer(server)
  .then(async (app) => {
    const PORT = process.env.PORT || 7802;

    await app.listen(PORT);
    Logger.log(
      `🚀 Application is running on: http://localhost:${PORT}/${GLOBAL_PREFIX}`
    );
  })
  .catch((err) => Logger.error(err));
