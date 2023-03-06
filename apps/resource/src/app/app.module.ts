import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AssignmentModule } from '../assignment/assignment.module';
import { StudentModule } from '../student/student.module';
import { AuthModule } from '@thepro/auth';

@Module({
  imports: [
    AssignmentModule,
    AuthModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
