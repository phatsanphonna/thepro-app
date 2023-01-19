import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignmentModule } from '../assignment/assignment.module';
import { AuthModule } from '@thepro/auth';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AssignmentModule,
    AuthModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
