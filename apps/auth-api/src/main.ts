import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as express from 'express';
import type { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { http } from '@google-cloud/functions-framework';

async function createNestServer(expressInstance: Express) {
  const logger = new Logger('AuthApplication');

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    {
      logger,
    }
  );

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  return app.init();
}

const server = express();

createNestServer(server)
  .then(async (app) => {
    const PORT = process.env.PORT || 7801;

    await app.listen(PORT);
    Logger.log(`🚀 Application is running on: http://localhost:${PORT}/`);
  })
  .catch((err) => Logger.error(err));
