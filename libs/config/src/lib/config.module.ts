import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env' : '.env.production'
    }),
  ],
  exports: [ConfigModule],
})
export class TheProTutorConfigModule {}
