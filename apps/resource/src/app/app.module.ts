import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignmentModule } from '../assignment/assignment.module';
import { AuthModule } from '@thepro/auth';

@Module({
  imports: [
    AssignmentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
