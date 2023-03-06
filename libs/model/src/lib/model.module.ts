import { Module } from '@nestjs/common';
import { DatabaseModule } from '@thepro/database';
import { StudentEntity } from './student.entity';
import { AssignmentEntity } from './assignment.entity';

const injectableService = [
  StudentEntity,
  AssignmentEntity
]
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: injectableService,
  exports: injectableService,
})
export class ModelModule { }
