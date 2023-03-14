import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@thepro/database';
import { AuthModule } from '@thepro/auth';
import { TheProTutorConfigModule } from '@thepro/config';

@Module({
  imports: [DatabaseModule, AuthModule, TheProTutorConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
