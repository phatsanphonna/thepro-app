import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AssignmentModule } from '../assignment/assignment.module';
import { StudentModule } from '../student/student.module';
import { AuthModule, RolesGuard } from '@thepro/auth';
import { FileModule } from '../file/file.module';

@Module({
  imports: [AssignmentModule, AuthModule, StudentModule, FileModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
