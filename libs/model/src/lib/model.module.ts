import { Module } from '@nestjs/common';
import { DatabaseModule } from '@thepro/database';
import { StudentEntity } from './student.entity';
import { AssignmentEntity } from './assignment.entity';
import { FileEntity } from './file.entity';

const injectableService = [StudentEntity, AssignmentEntity, FileEntity];
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: injectableService,
  exports: injectableService,
})
export class ModelModule {}
