import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { StorageModule } from '@thepro/storage';
import { FileService } from './file.service';
import { ModelModule } from '@thepro/model';
import { AuthModule } from '@thepro/auth';

@Module({
  imports: [StorageModule, ModelModule, AuthModule],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
