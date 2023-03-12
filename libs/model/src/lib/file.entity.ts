import { Injectable } from '@nestjs/common';
import { File } from '@prisma/client';
import { DatabaseService } from '@thepro/database';
import { ICreateFile } from './file.interface';

@Injectable()
export class FileEntity {
  constructor(private readonly databaseService: DatabaseService) {}

  async getFileById(id: string) {
    return await this.databaseService.file.findUnique({
      where: {
        id,
      },
    });
  }

  async createFile(data: ICreateFile) {
    return await this.databaseService.file.create({
      data,
    });
  }
}
