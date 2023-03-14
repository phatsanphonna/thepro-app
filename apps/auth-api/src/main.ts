import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as express from 'express';
import type { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config'
import { TheProTutorConfigModule } from '@thepro/config';
import { ConfigService } from '@nestjs/config';

async function createNestServer(expressInstance: Express) {
  const logger = new Logger('AuthApplication');

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance), {
      logger,
    }
  );

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
    credentials: true,
  })

  return app.init();
}

const server = express();

createNestServer(server)
  .then(async (app) => {
    const configService: ConfigService = app.get(ConfigService);

    const PORT = configService.get('PORT') || 7801;
    const HOSTNAME = configService.get('HOST') || 'localhost';
    const NODE_ENV = configService.get('NODE_ENV');

    await app.listen(PORT, HOSTNAME);
    Logger.log(
      `🚀 Application is running in ${NODE_ENV} mode on: http://${HOSTNAME}:${PORT}/`
    );
  })
  .catch((err) => Logger.error(err));
