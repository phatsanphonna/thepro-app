import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@thepro/database'
import { AuthEntity } from './auth.entity';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '5h'
        }
      })
    }),
  ],
  controllers: [],
  providers: [AuthService, AuthEntity, JwtService],
  exports: [JwtModule, AuthService, AuthEntity],
})
export class AuthModule {}
