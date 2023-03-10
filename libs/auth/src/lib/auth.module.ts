import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@thepro/database';
import { AuthEntity } from './auth.entity';
import { TheProTutorConfigModule } from '@thepro/config';

@Module({
  imports: [
    TheProTutorConfigModule,
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '5h',
          issuer: 'auth.api.theprotutor.net',
        },
      }),
    }),
  ],
  providers: [AuthService, AuthEntity],
  exports: [JwtModule, AuthService, AuthEntity],
})
export class AuthModule {}
