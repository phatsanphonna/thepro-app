import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { ModelModule } from '@thepro/model';
import { AuthModule } from '@thepro/auth';

@Module({
  imports: [ModelModule, AuthModule],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
