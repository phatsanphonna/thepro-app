import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { ModelModule } from '@thepro/model';
import { AuthModule } from '@thepro/auth';

@Module({
  imports: [ModelModule, AuthModule],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule { }
