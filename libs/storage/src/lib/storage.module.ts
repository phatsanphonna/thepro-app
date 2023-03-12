import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';

const injectableService = [
  StorageService,
]

@Module({
  controllers: [],
  providers: injectableService,
  exports: injectableService,
})
export class StorageModule {}
